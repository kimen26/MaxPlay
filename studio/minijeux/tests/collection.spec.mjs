// collection.spec.mjs — Chantier NID P1 : moteur de collection (site/js/collection.js)
// Playwright + Chromium réel (pas jsdom) : charge une page minimale qui inclut
// collection.js, pilote l'API via page.evaluate(). Lance :
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

// Petit catalogue de test : 10 items, 2 familles (A = 8 items, B = 2 items).
// B est donc la famille "rare" (20% la moins représentée).
function seedItems(page) {
  return page.evaluate(() => {
    const items = [];
    for (let i = 1; i <= 8; i++) items.push({ id: 'a' + i, nom: 'Item A' + i, famille: 'A' });
    for (let i = 1; i <= 2; i++) items.push({ id: 'b' + i, nom: 'Item B' + i, famille: 'B' });
    window.Collection.configure({ items });
  });
}

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));

try {
  await page.goto(pathToFileURL(htmlPath).href);
  await seedItems(page);

  // ── grant → pending ──────────────────────────────────────────────────
  let p = await page.evaluate(() => { Collection.grantCapsule({}); return Collection.pending(); });
  ok('1 grant → pending.count === 1', p.count === 1, JSON.stringify(p));

  // ── 3 grants → readyToHatch ──────────────────────────────────────────
  await page.evaluate(() => { Collection.grantCapsule({}); Collection.grantCapsule({}); });
  const ready = await page.evaluate(() => { const r = Collection.readyToHatch(); return r; });
  ok('3 grants → readyToHatch() === true', ready === true);

  // ── hatch consomme et donne un non-possédé ───────────────────────────
  const afterHatch = await page.evaluate(() => {
    const item = Collection.hatch();
    return { item, pending: Collection.pending(), owned: Collection.owned() };
  });
  ok('hatch() consomme les 3 capsules (pending revient à 0)', afterHatch.pending.count === 0, JSON.stringify(afterHatch.pending));
  ok('hatch() retourne un item complet {id,nom,famille}',
     !!(afterHatch.item && afterHatch.item.id && afterHatch.item.nom && afterHatch.item.famille),
     JSON.stringify(afterHatch.item));
  ok('item tiré est maintenant dans owned()', afterHatch.owned.indexOf(afterHatch.item.id) !== -1);

  // ── reset propre pour la suite (nouveau profil de test) ───────────────
  await page.evaluate(() => { localStorage.clear(); });
  await seedItems(page);

  // ── série 30 min → dorée (3 grants rapprochés dans le temps réel) ─────
  const streakRes = await page.evaluate(() => {
    Collection.grantCapsule({});
    Collection.grantCapsule({});
    return Collection.grantCapsule({}); // 3e appel : streakCount%3===0 → doré auto
  });
  ok('3e grant enchaîné (< 30 min) → doré automatique', streakRes.golden === 1, JSON.stringify(streakRes));

  // ── doré → pioche rare (famille B, 2 items sur 10 = 20% les moins représentés) ──
  const hatchGolden = await page.evaluate(() => Collection.hatch());
  ok('capsule dorée consommée → item tiré appartient à la famille rare (B)',
     hatchGolden && hatchGolden.famille === 'B', JSON.stringify(hatchGolden));

  // ── tout possédé → doublon ────────────────────────────────────────────
  await page.evaluate(() => { localStorage.clear(); });
  await seedItems(page);
  const doublon = await page.evaluate(() => {
    // possède tout d'un coup (own() idempotent)
    ['a1','a2','a3','a4','a5','a6','a7','a8','b1','b2'].forEach(id => Collection.own(id));
    Collection.grantCapsule({}); Collection.grantCapsule({}); Collection.grantCapsule({});
    return Collection.hatch();
  });
  ok('collection complète → hatch() retourne {type:"doublon", item}',
     doublon && doublon.type === 'doublon' && !!doublon.item, JSON.stringify(doublon));

  // ── persistance après reload ──────────────────────────────────────────
  await page.evaluate(() => { localStorage.clear(); });
  await seedItems(page);
  await page.evaluate(() => { Collection.grantCapsule({}); Collection.own('a1'); });
  await page.reload();
  await seedItems(page); // re-configure le catalogue (configure() n'est pas persisté, c'est voulu — thème-neutre)
  const afterReload = await page.evaluate(() => Collection.state());
  ok('persistance après reload : pending survit', afterReload.pending.count === 1, JSON.stringify(afterReload));
  ok('persistance après reload : owned survit', afterReload.owned.indexOf('a1') !== -1, JSON.stringify(afterReload));

  // ── multi-profil isolé (maxplay_active_child) ─────────────────────────
  await page.evaluate(() => { localStorage.clear(); });
  await seedItems(page);
  const multiProfile = await page.evaluate(() => {
    localStorage.setItem('maxplay_active_child', JSON.stringify({ id: 'child-1', nickname: 'Max' }));
    Collection.own('a1');
    Collection.grantCapsule({});
    const child1State = Collection.state();

    localStorage.setItem('maxplay_active_child', JSON.stringify({ id: 'child-2', nickname: 'Lea' }));
    const child2State = Collection.state();
    Collection.own('a2');
    const child2After = Collection.state();

    localStorage.setItem('maxplay_active_child', JSON.stringify({ id: 'child-1', nickname: 'Max' }));
    const child1Again = Collection.state();

    return { child1State, child2State, child2After, child1Again };
  });
  ok('profil 2 démarre vide (pas de fuite depuis profil 1)',
     multiProfile.child2State.owned.length === 0 && multiProfile.child2State.pending.count === 0,
     JSON.stringify(multiProfile.child2State));
  ok('profil 2 possède a2, pas a1', multiProfile.child2After.owned.indexOf('a2') !== -1 && multiProfile.child2After.owned.indexOf('a1') === -1);
  ok('retour profil 1 : état intact (a1 possédé, a2 absent)',
     multiProfile.child1Again.owned.indexOf('a1') !== -1 && multiProfile.child1Again.owned.indexOf('a2') === -1,
     JSON.stringify(multiProfile.child1Again));

  // ── Bug 2 (arbitrage PY 2026-07-28) : plus d'œuf sur un jeu à 3 étoiles ──
  // grantCapsule({gameId}) doit consulter window.Stars.get(gameId) et refuser
  // (granted:false, aucune capsule poussée) si >= 3. Défensif : sans gameId
  // ni Stars, comportement inchangé (grant normal).
  await page.evaluate(() => { localStorage.clear(); });
  await seedItems(page);
  const antiFarm = await page.evaluate(() => {
    window.Stars = { get: function (id) { return id === 'mj-99' ? 3 : 0; } };
    const capped = Collection.grantCapsule({ gameId: 'mj-99' });
    const pendingAfterCapped = Collection.pending();
    const normal = Collection.grantCapsule({ gameId: 'mj-01' }); // 0 étoile → accordé
    const pendingAfterNormal = Collection.pending();
    delete window.Stars;
    return { capped, pendingAfterCapped, normal, pendingAfterNormal };
  });
  ok('gameId à 3 étoiles → grantCapsule() refuse (granted:false)', antiFarm.capped.granted === false, JSON.stringify(antiFarm.capped));
  ok('gameId à 3 étoiles → aucune capsule poussée (pending toujours 0)', antiFarm.pendingAfterCapped.count === 0, JSON.stringify(antiFarm.pendingAfterCapped));
  ok('gameId à 0 étoile → grantCapsule() accorde normalement', antiFarm.normal.granted === true, JSON.stringify(antiFarm.normal));
  ok('gameId à 0 étoile → capsule bien poussée (pending === 1)', antiFarm.pendingAfterNormal.count === 1, JSON.stringify(antiFarm.pendingAfterNormal));

  const antiFarmDefensive = await page.evaluate(() => {
    // pas de window.Stars du tout, ni de gameId : comportement historique préservé
    return Collection.grantCapsule({});
  });
  ok('sans Stars ni gameId (défensif) → grant toujours accordé (pas de régression silencieuse)', antiFarmDefensive.granted !== false, JSON.stringify(antiFarmDefensive));

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
