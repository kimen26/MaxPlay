// collection.spec.mjs — Moteur de collection v2 (NID v4, 2026-07-30, site/js/collection.js)
// Playwright + Chromium réel (pas jsdom) : charge une page minimale qui inclut
// collection.js, pilote l'API via page.evaluate(). Les points RANDOM du contrat
// (1-2 œufs → pile ou face, caresse-amour 1 chance/3) sont rendus DÉTERMINISTES
// en stubant Math.random dans la page. Lance :
//   node studio/minijeux/tests/collection.spec.mjs
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';

const __dir = dirname(fileURLToPath(import.meta.url));
const COLLECTION_JS = resolve(__dir, '..', '..', '..', 'site', 'js', 'collection.js');
const scratch = resolve(__dir, '_scratch');
mkdirSync(scratch, { recursive: true });
const htmlPath = resolve(scratch, 'collection-harness.html');

writeFileSync(htmlPath, `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>
<script src="${pathToFileURL(COLLECTION_JS).href}"></script>
</body></html>`);

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m';
let fail = 0;
const checks = [];
const ok = (name, cond, detail = '') => { checks.push([cond, name, detail]); if (!cond) fail++; };

// Petit catalogue de test : 10 items, 2 familles (A = 8 items dont 1 star, B = 2 items).
// a1 = "très connu" (star) pour le contrat de l'œuf doré (PY 2026-07-30).
function seedItems(page) {
  return page.evaluate(() => {
    const items = [];
    for (let i = 1; i <= 8; i++) items.push({ id: 'a' + i, nom: 'Item A' + i, famille: 'A', star: i === 1 });
    for (let i = 1; i <= 2; i++) items.push({ id: 'b' + i, nom: 'Item B' + i, famille: 'B' });
    window.Collection.configure({
      items,
      familles: [{ id: 'A', label: 'Famille A', emoji: '🅰️', color: '#c0392b' },
                 { id: 'B', label: 'Famille B', emoji: '🅱️', color: '#27ae60' }],
    });
  });
}
const rnd = (page, v) => page.evaluate(x => { Math.random = () => x; }, v);
const reset = async (page) => { await page.evaluate(() => localStorage.clear()); await seedItems(page); };

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));

try {
  await page.goto(pathToFileURL(htmlPath).href);
  await seedItems(page);

  // ── règle de drop PY 2026-07-30 : nid vide → ŒUF obligatoire ──────────
  await rnd(page, 0.9); // même avec un random "accessoire", le nid vide force l'œuf
  let g = await page.evaluate(() => Collection.grantReward({}));
  ok('nid vide → gain = ŒUF obligatoire (même random défavorable)', g.type === 'oeuf' && g.granted === true, JSON.stringify(g));
  ok('l\'œuf a une FAMILLE dès le gain (couleur connue, espèce surprise)',
     !!g.famille && !!(g.familleMeta && g.familleMeta.color), JSON.stringify(g));

  // ── 1-2 œufs → random complet (0.4 → œuf, 0.9 → accessoire) ────────────
  await rnd(page, 0.4);
  g = await page.evaluate(() => Collection.grantReward({}));
  ok('1 œuf au nid + random < .5 → ŒUF', g.type === 'oeuf', JSON.stringify(g));
  await rnd(page, 0.9);
  g = await page.evaluate(() => Collection.grantReward({}));
  ok('2 œufs au nid + random > .5 → ACCESSOIRE', g.type === 'accessoire' && !!g.accessoire, JSON.stringify(g));
  ok('l\'accessoire du tirage n\'est JAMAIS l\'étoile (source unique = maîtrise)',
     g.accessoire && g.accessoire.id !== 'etoile', JSON.stringify(g.accessoire));

  // ── nid plein (3) → accessoire obligatoire ──────────────────────────────
  await rnd(page, 0.1); // random "œuf" mais il faut d'abord remplir le nid
  await page.evaluate(() => Collection.grantReward({})); // 3e œuf
  g = await page.evaluate(() => Collection.grantReward({}));
  ok('nid plein → gain = ACCESSOIRE obligatoire (même random œuf)', g.type === 'accessoire', JSON.stringify(g));
  let st = await page.evaluate(() => Collection.state());
  ok('état : 3 œufs + 2 accessoires au sac', st.eggs.length === 3 && st.sac.reduce((n, a) => n + a.count, 0) === 2, JSON.stringify({ eggs: st.eggs.length, sac: st.sac }));

  // ── soin : warmEgg consomme le sac, la chaleur ne fait que monter ──────
  // 1er œuf de l'histoire (hatchCount=0) → seuil 1 accessoire (théâtre rapide)
  let th = await page.evaluate(() => Collection.hatchThreshold());
  ok('tout premier œuf de l\'histoire : seuil d\'éclosion = 1', th === 1, 'seuil=' + th);
  const accId = st.sac[0].id;
  let w = await page.evaluate(id => Collection.warmEgg(0, id), accId);
  ok('warmEgg pose l\'accessoire et rend l\'œuf PRÊT (seuil 1)', w.ok === true && w.ready === true, JSON.stringify(w));
  st = await page.evaluate(() => Collection.state());
  ok('l\'accessoire a quitté le sac', st.sac.reduce((n, a) => n + a.count, 0) === 1, JSON.stringify(st.sac));

  // ── éclosion INDIVIDUELLE : cet œuf éclot, les 2 autres RESTENT ────────
  const hatched = await page.evaluate(() => Collection.hatchEgg(0));
  st = await page.evaluate(() => Collection.state());
  ok('hatchEgg retourne un item complet {id,nom,famille}', !!(hatched && hatched.id && hatched.famille), JSON.stringify(hatched));
  ok('les 2 autres œufs SONT TOUJOURS LÀ (plus jamais de disparition)', st.eggs.length === 2, 'eggs=' + st.eggs.length);
  ok('item possédé', st.owned.indexOf(hatched.id) !== -1);
  // (l'appartenance espèce↔famille de l'œuf est couverte par le test doré ci-dessous)
  th = await page.evaluate(() => Collection.hatchThreshold());
  ok('après la 1re éclosion : seuil = 3 accessoires', th === 3, 'seuil=' + th);

  // ── caresse : jamais d'éclosion seule, mais à seuil-1 accessoires + 2e
  //    caresse l'amour PEUT finir le travail (random stubé) ────────────────
  await rnd(page, 0.9); // caresses "malchanceuses"
  let c = await page.evaluate(() => Collection.caress(0));
  ok('caresse sur œuf sans accessoire : stade visuel monte, jamais ready', c.stage === 1 && c.ready === false, JSON.stringify(c));
  // équipe l'œuf 0 à seuil-1 (2 accessoires) : random .9 → les 2 grants donnent des accessoires
  await rnd(page, 0.9);
  await page.evaluate(() => { Collection.grantReward({}); Collection.grantReward({}); }); // 2 accessoires (2 œufs + random .9)
  st = await page.evaluate(() => Collection.state());
  const ids = [];
  st.sac.forEach(a => { for (let i = 0; i < a.count; i++) ids.push(a.id); });
  w = await page.evaluate(id => Collection.warmEgg(0, id), ids[0]);
  const w2 = await page.evaluate(id => Collection.warmEgg(0, id), ids[1]);
  ok('2 accessoires posés (seuil 3) → pas encore prêt', w.ok && w2.ok && w2.ready === false, JSON.stringify({ w, w2 }));
  c = await page.evaluate(() => Collection.caress(0)); // 2e caresse de cet œuf, random .9 → rien
  ok('2 acc + caresse malchanceuse → toujours pas prêt', c.ready === false, JSON.stringify(c));
  await rnd(page, 0.1); // l'amour gagne (< 1/3)
  c = await page.evaluate(() => Collection.caress(0));
  ok('2 acc + caresse chanceuse (≥2e) → l\'amour finit le travail (ready)', c.ready === true && c.loveJustWarmed === true, JSON.stringify(c));
  const loveHatch = await page.evaluate(() => Collection.hatchEgg(0));
  ok('l\'œuf réchauffé par l\'amour éclot bien', !!(loveHatch && loveHatch.id), JSON.stringify(loveHatch));

  // ── œuf DORÉ = dino TRÈS CONNU (star), n'importe quelle famille ────────
  await reset(page);
  await rnd(page, 0.1);
  const goldenGrant = await page.evaluate(() => {
    Collection.grantReward({}); Collection.grantReward({});
    return Collection.grantReward({}); // 3e enchaîné (< 30 min) → doré auto
  });
  ok('3e gain enchaîné → œuf DORÉ (justGolden)', goldenGrant.type === 'oeuf' && goldenGrant.justGolden === true, JSON.stringify(goldenGrant));
  ok('famille de l\'œuf doré = famille d\'un très connu (A, star a1)', goldenGrant.famille === 'A', JSON.stringify(goldenGrant));
  // le doré éclot sur la star : seuil 1 (aucune éclosion encore sur ce profil)
  const starHatch = await page.evaluate(() => {
    const st2 = Collection.state();
    const gIdx = st2.eggs.findIndex(e => e.golden);
    // pas d'accessoire au sac sur ce profil neuf → on en gagne un (nid plein)
    Math.random = () => 0.9;
    const acc = Collection.grantReward({});
    Collection.warmEgg(gIdx, acc.accessoire.id);
    return Collection.hatchEgg(gIdx);
  });
  ok('éclosion de l\'œuf doré → dino TRÈS CONNU (star a1)', starHatch && starHatch.id === 'a1', JSON.stringify(starHatch));

  // ── accessoire ÉTOILE (3e étoile d'un jeu) : permanent, max 1/œuf ──────
  await reset(page);
  const mast = await page.evaluate(() => Collection.grantReward({ mastered: true }));
  ok('mastered:true → accessoire ÉTOILE spécial (remplace le gain)', mast.type === 'accessoire' && mast.accessoire.id === 'etoile' && mast.special === true, JSON.stringify(mast));
  const etoileFlow = await page.evaluate(() => {
    Math.random = () => 0.1;
    Collection.grantReward({}); // œuf (nid vide)
    const w1 = Collection.warmEgg(0, 'etoile');
    // 2e étoile sur le MÊME œuf : refusée (il faudrait en re-gagner une de toute façon)
    Collection.grantReward({ mastered: true });
    const w2 = Collection.warmEgg(0, 'etoile');
    const hatchedE = Collection.hatchEgg(0); // seuil 1 (1re éclosion du profil)
    const after = Collection.state();
    return { w1, w2, hatchedE, sacAfter: after.sac };
  });
  ok('étoile posée sur un œuf', etoileFlow.w1.ok === true, JSON.stringify(etoileFlow.w1));
  ok('2e étoile sur le MÊME œuf refusée (max 1/œuf)', etoileFlow.w2.ok === false, JSON.stringify(etoileFlow.w2));
  ok('à l\'éclosion, l\'étoile REVIENT au sac (permanente)',
     etoileFlow.sacAfter.some(a => a.id === 'etoile' && a.count === 2), JSON.stringify(etoileFlow.sacAfter));

  // ── tout possédé → doublon ────────────────────────────────────────────
  await reset(page);
  const doublon = await page.evaluate(() => {
    ['a1','a2','a3','a4','a5','a6','a7','a8','b1','b2'].forEach(id => Collection.own(id));
    Math.random = () => 0.1;
    Collection.grantReward({});
    Math.random = () => 0.9;
    const acc = Collection.grantReward({});
    Collection.warmEgg(0, acc.accessoire.id);
    return Collection.hatchEgg(0);
  });
  ok('collection complète → hatchEgg() retourne {type:"doublon", item}',
     doublon && doublon.type === 'doublon' && !!doublon.item, JSON.stringify(doublon));

  // ── migration v1 → v2 : les capsules deviennent des œufs à famille ─────
  await page.evaluate(() => { localStorage.clear(); });
  await page.evaluate(() => {
    localStorage.setItem('maxplay_collection_v1', JSON.stringify({
      version: 1, owned: ['a2'], pending: [{ golden: false, at: 1 }, { golden: true, at: 2 }],
      lastGrantAt: 2, streakCount: 2,
    }));
  });
  await seedItems(page);
  const migrated = await page.evaluate(() => Collection.state());
  ok('migration v1 : 2 capsules → 2 œufs individuels', migrated.eggs.length === 2, JSON.stringify(migrated.eggs));
  ok('migration v1 : chaque œuf migré a une famille', migrated.eggs.every(e => !!e.famille), JSON.stringify(migrated.eggs));
  ok('migration v1 : le doré reste doré', migrated.eggs.some(e => e.golden), JSON.stringify(migrated.eggs));
  ok('migration v1 : owned conservé + seuil normal (a déjà des dinos)',
     migrated.owned.indexOf('a2') !== -1 && migrated.hatchCount === 1, JSON.stringify({ owned: migrated.owned, hatchCount: migrated.hatchCount }));

  // ── persistance après reload ──────────────────────────────────────────
  await page.evaluate(() => { localStorage.clear(); });
  await seedItems(page);
  await page.evaluate(() => { Math.random = () => 0.1; Collection.grantReward({}); Collection.own('a1'); });
  await page.reload();
  await seedItems(page);
  const afterReload = await page.evaluate(() => Collection.state());
  ok('persistance après reload : œuf survit', afterReload.eggs.length === 1, JSON.stringify(afterReload.eggs));
  ok('persistance après reload : owned survit', afterReload.owned.indexOf('a1') !== -1);

  // ── multi-profil isolé (maxplay_active_child) ─────────────────────────
  await page.evaluate(() => { localStorage.clear(); });
  await seedItems(page);
  const multiProfile = await page.evaluate(() => {
    Math.random = () => 0.1;
    localStorage.setItem('maxplay_active_child', JSON.stringify({ id: 'child-1', nickname: 'Max' }));
    Collection.own('a1');
    Collection.grantReward({});
    const child1State = Collection.state();
    localStorage.setItem('maxplay_active_child', JSON.stringify({ id: 'child-2', nickname: 'Lea' }));
    const child2State = Collection.state();
    localStorage.setItem('maxplay_active_child', JSON.stringify({ id: 'child-1', nickname: 'Max' }));
    const child1Again = Collection.state();
    localStorage.removeItem('maxplay_active_child');
    return { child1State, child2State, child1Again };
  });
  ok('profil 2 démarre vide (pas de fuite depuis profil 1)',
     multiProfile.child2State.owned.length === 0 && multiProfile.child2State.eggs.length === 0,
     JSON.stringify(multiProfile.child2State));
  ok('retour profil 1 : état intact', multiProfile.child1Again.owned.indexOf('a1') !== -1 && multiProfile.child1Again.eggs.length === 1);

  // ── anti-farm 3★ étendu : NI œuf NI accessoire sur un jeu maîtrisé ─────
  await page.evaluate(() => { localStorage.clear(); });
  await seedItems(page);
  const antiFarm = await page.evaluate(() => {
    window.Stars = { get: function (id) { return id === 'mj-99' ? 3 : 0; } };
    Math.random = () => 0.9;
    const capped = Collection.grantReward({ gameId: 'mj-99' });
    const stateAfterCapped = Collection.state();
    Math.random = () => 0.1;
    const normal = Collection.grantReward({ gameId: 'mj-01' });
    delete window.Stars;
    return { capped, stateAfterCapped, normal };
  });
  ok('jeu à 3 étoiles → grantReward refuse (granted:false)', antiFarm.capped.granted === false, JSON.stringify(antiFarm.capped));
  ok('jeu à 3 étoiles → ni œuf ni accessoire poussé',
     antiFarm.stateAfterCapped.eggs.length === 0 && antiFarm.stateAfterCapped.sac.length === 0,
     JSON.stringify({ eggs: antiFarm.stateAfterCapped.eggs.length, sac: antiFarm.stateAfterCapped.sac }));
  ok('jeu à 0 étoile → gain accordé normalement', antiFarm.normal.granted === true, JSON.stringify(antiFarm.normal));

  const antiFarmDefensive = await page.evaluate(() => Collection.grantCapsule({}));
  ok('compat v1 : grantCapsule (défensif, sans Stars) → toujours accordé', antiFarmDefensive.granted !== false, JSON.stringify(antiFarmDefensive));

  ok('Aucune erreur JS (smoke)', errors.length === 0, errors.join(' | '));
} catch (e) {
  ok('exécution sans exception', false, e.message);
}

await browser.close();
// _scratch/ est un dossier PARTAGÉ entre specs — supprimer seulement notre fichier, jamais le dossier entier.
if (existsSync(htmlPath)) rmSync(htmlPath, { force: true });

console.log('\n── collection.spec.mjs ──');
for (const [cond, name, detail] of checks)
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
console.log(fail === 0 ? `\n\x1b[32m✓ collection.js OK\x1b[0m\n` : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail === 0 ? 0 : 1);
