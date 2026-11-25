// nid-v5.spec.mjs — ÉCRAN DU NID v5 (HO-MJ-25, D-041). Remplace nid-e2e.spec.mjs
// (qui pilotait l'ancienne chambre des œufs). Playwright + Chromium réel, VRAI moteur
// (collection-tirage.js + collection.js), vrai localStorage ; l'état de départ de chaque
// étape est posé en stockage (même fixture que collection.spec.mjs), jamais de mock.
//
// Scénario : scène vide → cailloux posés un par un → nid fermé → œuf teinté famille →
// lit glissé → 2 habits (toucher + glisser) → éclosion (théâtre) ; refus du 3e habit
// du même type (l'objet reste au sac, aucun message) ; sac plein ; caresse (cœurs).
// Captures 360×740, 320×568, 740×360 dans docs/handoffs/rapports/captures/nid-v5/ et
// contrôle par script : aucune largeur de page ne dépasse le viewport, cibles ≥ 80 px.
//
// Usage : cd studio/minijeux/tests && node nid-v5.spec.mjs
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '..', '..', '..', 'site');
const INDEX = pathToFileURL(resolve(SITE, 'index.html')).href;
const CAPT = resolve(__dir, '..', 'docs', 'handoffs', 'rapports', 'captures', 'nid-v5');
mkdirSync(CAPT, { recursive: true });

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m';
let fail = 0;
const checks = [];
const ok = (name, cond, detail = '') => { checks.push([cond, name, detail]); if (!cond) fail++; };
const errors = [];

const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: 360, height: 740 } });
page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
page.on('console', m => { if (m.type() === 'error') errors.push(`console.error: ${m.text()}`); });

// ── helpers ───────────────────────────────────────────────────────────────
const vide = () => ({ cailloux: 0, lit: [], peints: [], oeuf: null });
const ferme = (extra = {}) => Object.assign({ cailloux: 6, lit: [], peints: [], oeuf: null }, extra);
const habit = (id, variante = 'rouge') => ({ id, variante, rare: false });
const itemHab = (id, variante) => ({ type: 'habit', id, variante, rare: false });
const itemLit = (variante = 'fougere') => ({ type: 'lit', id: 'lit', variante, rare: false });

// Écrit un état v3 puis (ré)ouvre l'écran du nid.
async function ouvrir(etat) {
  await page.evaluate((p) => {
    if (window.NidV5) NidV5.fermer();
    const fam = (typeof DINO_FAMILLES !== 'undefined' && DINO_FAMILLES[0]) ? DINO_FAMILLES[0].id : null;
    const mkOeuf = (o) => o && Object.assign({ famille: fam, golden: false, at: 0, naissance: null, caresses: 0, habits: [] }, o);
    const nids = (p.nids || [{}, {}, {}]).map(n => Object.assign({ cailloux: 0, lit: [], peints: [], oeuf: null }, n, { oeuf: mkOeuf(n.oeuf) }));
    localStorage.setItem('maxplay_collection_v1', JSON.stringify(Object.assign({
      version: 3, owned: [], sac: [], lastGrantAt: null, streakCount: 0, hatchCount: 1, dry: 0, lastDouble: false, lastGift: null,
    }, p, { nids })));
    NidUI.openChambre();
  }, etat);
  await page.waitForSelector('#chambre-ov.n5 .n5-nid', { timeout: 4000 });
  await page.waitForTimeout(900); // fin des animations d'arrivée des cailloux
}

const nb = (sel) => page.locator(sel).count();
const centre = async (sel) => { const b = await page.locator(sel).first().boundingBox(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; };

async function glisser(selDepart, selArrivee) {
  const a = await centre(selDepart), b = await centre(selArrivee);
  await page.mouse.move(a.x, a.y);
  await page.mouse.down();
  await page.mouse.move((a.x + b.x) / 2, (a.y + b.y) / 2, { steps: 6 });
  await page.mouse.move(b.x, b.y, { steps: 6 });
  await page.mouse.up();
}

// Aucune largeur de page ne dépasse le viewport ; cibles ≥ 80 px ; retour ≥ 48 px.
async function mesurer(label) {
  const m = await page.evaluate(() => {
    const vw = window.innerWidth, out = { vw, debord: [], petits: [] };
    const de = document.documentElement;
    if (de.scrollWidth > vw) out.debord.push('page ' + de.scrollWidth);
    const ov = document.getElementById('chambre-ov');
    if (ov.scrollWidth > ov.clientWidth) out.debord.push('overlay ' + ov.scrollWidth + '>' + ov.clientWidth);
    if (ov.scrollHeight > ov.clientHeight + 1) out.debord.push('ascenseur vertical ' + ov.scrollHeight + '>' + ov.clientHeight);
    const sacR = ov.querySelector('.n5-sac').getBoundingClientRect(), hdrR = ov.querySelector('.n5-hdr').getBoundingClientRect();
    const nr = [...ov.querySelectorAll('.n5-nid')].map(n => n.getBoundingClientRect());
    nr.forEach((r, i) => {
      if (r.right > sacR.left && r.left < sacR.right && r.bottom > sacR.top && r.top < sacR.bottom) out.debord.push('nid ' + (i + 1) + ' sous le sac');
      if (r.top < hdrR.bottom - 1 && r.left < hdrR.right && r.right > hdrR.left) out.debord.push('nid ' + (i + 1) + ' sous le titre');
    });
    ov.querySelectorAll('.n5-nid, .n5-sac, .n5-case, .n5-hdr').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.left < -1 || r.right > vw + 1) out.debord.push(el.className + ' [' + Math.round(r.left) + ',' + Math.round(r.right) + ']');
    });
    ov.querySelectorAll('.n5-nid, .n5-case[data-i]').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width < 80 || r.height < 80) out.petits.push(el.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
    });
    const b = ov.querySelector('.ch-back').getBoundingClientRect();
    if (b.width < 48 || b.height < 48) out.petits.push('retour ' + Math.round(b.width) + 'x' + Math.round(b.height));
    return out;
  });
  ok(`${label} : aucune largeur ne dépasse le viewport (${m.vw}px)`, m.debord.length === 0, m.debord.join(' | '));
  ok(`${label} : nids et objets ≥ 80 px, retour ≥ 48 px`, m.petits.length === 0, m.petits.join(' | '));
}

try {
  await page.goto(INDEX, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.NidV5 && window.Collection && Collection.nids && typeof DINO_FAMILLES !== 'undefined', null, { timeout: 8000 });
  await page.evaluate(() => { localStorage.clear(); localStorage.setItem('maxplay_nid_intro', '1'); }); // pas de théâtre du 1er œuf (one-shot)

  // ═══ 1. SCÈNE VIDE : 3 cercles pointillés, rien d'autre ════════════════
  await ouvrir({ hatchCount: 0 });
  ok('overlay #chambre-ov (deep-link ?open=nid) + 3 nids', (await nb('#chambre-ov.n5')) === 1 && (await nb('.n5-nid')) === 3);
  ok('scène vide : 3 cercles pointillés, aucun caillou, aucun œuf', (await nb('.n5-vide')) === 3 && (await nb('.n5-cail')) === 0 && (await nb('.n5-oeuf')) === 0);
  ok('scène : fond sol.webp', await page.evaluate(() => /sol\.webp/.test(getComputedStyle(document.getElementById('chambre-ov')).backgroundImage)));
  await page.screenshot({ path: resolve(CAPT, 'vide-360x740.png') });
  await mesurer('scène vide 360');

  // ═══ 2. CAILLOUX posés un par un sur l'ovale, 6 = fermé ═══════════════
  await ouvrir({ hatchCount: 0, nids: [{ cailloux: 2 }, {}, {}] });
  ok('2 cailloux posés : 2 sprites, le nid reste pointillé', (await nb('.n5-nid:nth-child(1) .n5-cail')) === 2 && (await nb('.n5-nid:nth-child(1) .n5-vide')) === 1);
  await ouvrir({ hatchCount: 0, nids: [{ cailloux: 4 }, { cailloux: 6 }, {}] });
  await page.screenshot({ path: resolve(CAPT, 'cailloux-360x740.png') });
  ok('6 cailloux = nid fermé (plus de pointillé), 6 sprites', (await nb('.n5-nid:nth-child(2) .n5-cail')) === 6 && (await nb('.n5-nid:nth-child(2) .n5-vide')) === 0);

  // ═══ 3. ŒUF teinté famille, dans un nid fermé ═════════════════════════
  await ouvrir({ nids: [ferme({ oeuf: {} }), ferme(), vide()] });
  const teinte = await page.evaluate(() => getComputedStyle(document.querySelector('.n5-oeuf')).getPropertyValue('--oeuf-c').trim());
  ok('œuf dans le nid 1, teinté de la couleur de sa famille', (await nb('.n5-oeuf')) === 1 && /^#|rgb/.test(teinte), teinte);

  // ═══ 4. LIT glissé dans le nid → sous l'œuf, reste au nid ═════════════
  await ouvrir({ nids: [ferme({ oeuf: {} }), vide(), vide()], sac: [itemLit('mousse')] });
  ok('sac : 1 lit, 2 cases vides', (await nb('.n5-case[data-i]')) === 1 && (await nb('.n5-case.vide')) === 2);
  await glisser('.n5-case[data-i="0"]', '.n5-nid:nth-child(1)');
  await page.waitForSelector('.n5-lit', { timeout: 2000 });
  ok('lit glissé sur le nid → posé sous l\'œuf, sac vidé', (await nb('.n5-nid:nth-child(1) .n5-lit')) === 1 && (await nb('.n5-case[data-i]')) === 0);

  // ═══ 5. HABITS : toucher (va seul) + glisser, puis ÉCLOSION ═══════════
  await ouvrir({ owned: [], hatchCount: 1, nids: [ferme({ oeuf: {}, lit: [{ variante: 'fougere', rare: false }] }), vide(), vide()],
    sac: [itemHab('bonnet', 'rouge'), itemHab('echarpe', 'rayee')] });
  await page.click('.n5-case[data-i="0"]'); // toucher : l'objet va tout seul au bon nid
  await page.waitForSelector('.n5-hab.h-bonnet', { timeout: 2000 });
  ok('toucher un bonnet → il se pose seul sur l\'œuf du nid 1', (await nb('.n5-nid:nth-child(1) .n5-hab.h-bonnet')) === 1);
  const ownedAvant = await page.evaluate(() => Collection.owned().length);
  await glisser('.n5-case[data-i="0"]', '.n5-oeuf');
  await page.waitForSelector('.n5-hab.h-echarpe', { timeout: 2000 });
  ok('glisser une écharpe sur l\'œuf → posée', (await nb('.n5-hab.h-echarpe')) === 1);
  await page.screenshot({ path: resolve(CAPT, 'oeuf-habille-360x740.png') });
  ok('œuf prêt : le théâtre d\'éclosion démarre (transporteur en scène)', await page.waitForSelector('.th-carry', { timeout: 9000 }).then(() => true).catch(() => false));
  const apres = await page.evaluate(() => ({ owned: Collection.owned().length, n: Collection.nids()[0] }));
  ok('éclosion : un dino de plus, l\'œuf parti, le nid et son lit RESTENT', apres.owned === ownedAvant + 1 && apres.n.oeuf === null && apres.n.lit.length === 1 && apres.n.ferme, JSON.stringify(apres));
  await page.waitForFunction(() => document.querySelector('.th-fiche') || (document.querySelector('#padidi-ov') && !document.querySelector('.th-carry')), null, { timeout: 25000 }).catch(() => {});
  // on repart d'une page propre : le théâtre (transporteur, album Padidi) ne doit pas polluer la suite
  await page.goto(INDEX, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.setItem('maxplay_nid_intro', '1'));
  await page.waitForFunction(() => window.NidV5 && window.Collection && Collection.nids && typeof DINO_FAMILLES !== 'undefined', null, { timeout: 8000 });

  // ═══ 6. REFUS : 3e habit du même type → revient au sac, aucun message ═
  await ouvrir({ nids: [ferme({ oeuf: { habits: [habit('bonnet', 'rouge'), habit('bonnet', 'bleu')] } }), vide(), vide()], sac: [itemHab('bonnet', 'loup')] });
  const texteAvant = await page.evaluate(() => document.getElementById('chambre-ov').innerText);
  await page.click('.n5-case[data-i="0"]');
  await page.waitForTimeout(700);
  ok('3e bonnet refusé : toujours 2 bonnets sur l\'œuf, l\'objet est resté au sac', (await nb('.n5-hab.h-bonnet')) === 2 && (await nb('.n5-case[data-i]')) === 1);
  ok('refus silencieux : aucun texte ni alerte ajouté à l\'écran', (await page.evaluate(() => document.getElementById('chambre-ov').innerText)) === texteAvant && (await nb('#chambre-ov [role="alert"], #chambre-ov .toast')) === 0);
  await glisser('.n5-case[data-i="0"]', '.n5-oeuf'); // même refus en glissant
  await page.waitForTimeout(800);
  ok('glissé refusé : l\'objet est revenu au sac, plus de fantôme à l\'écran', (await nb('.n5-case[data-i]')) === 1 && (await nb('.n5-fantome')) === 0);
  await glisser('.n5-case[data-i="0"]', '.n5-nid:nth-child(3)'); // nid ouvert/vide : refus aussi
  await page.waitForTimeout(800);
  ok('lâché hors d\'un nid valable : retour au sac', (await nb('.n5-case[data-i]')) === 1 && (await nb('.n5-fantome')) === 0);

  // ═══ 7. SAC PLEIN : 3 cases occupées ═══════════════════════════════════
  await ouvrir({ nids: [ferme({ oeuf: {} }), vide(), vide()], sac: [itemHab('cape', 'nuage'), itemHab('echarpe', 'pois'), itemLit('mousse')] });
  ok('sac plein : 3 objets, plus aucune case vide', (await nb('.n5-case[data-i]')) === 3 && (await nb('.n5-case.vide')) === 0);

  // ═══ 8. CARESSE : cœurs + voisins qui se penchent, jamais d'éclosion ═══
  await ouvrir({ nids: [ferme({ oeuf: {} }), ferme({ oeuf: {} }), ferme()] });
  await page.click('.n5-nid:nth-child(1) .n5-oeuf');
  ok('caresse : un cœur apparaît', (await nb('.n5-coeur')) === 1);
  ok('caresse : l\'œuf voisin se penche vers lui', (await nb('.n5-nid:nth-child(2) .n5-oeuf.penche-g')) === 1);
  ok('caresse : le moteur a compté une caresse, aucun œuf n\'éclot', await page.evaluate(() => Collection.nids()[0].oeuf.caresses === 1 && Collection.eggs().length === 2));

  // ═══ 9. CAPTURES : scène « bien remplie » aux 3 tailles ═════════════════
  const plein = {
    nids: [
      ferme({ oeuf: { habits: [habit('bonnet', 'rouge'), habit('bonnet', 'bleu'), habit('echarpe', 'rayee'), habit('echarpe', 'pois')] },
        peints: [{ variante: 'etoile' }, { variante: 'coeur' }, { variante: 'arcenciel' }, { variante: 'pois' }] }),
      ferme({ lit: [{ variante: 'brindilles', rare: false }], oeuf: { habits: [habit('bonnet', 'bus')] }, peints: [{ variante: 'raye' }] }),
      { cailloux: 4 },
    ],
    sac: [itemHab('bonnet', 'loup'), itemLit('mousse'), itemHab('cape', 'etoiles')],
  };
  for (const [nom, w, h] of [['360x740', 360, 740], ['320x568', 320, 568], ['740x360', 740, 360]]) {
    await page.setViewportSize({ width: w, height: h });
    await ouvrir(plein);
    await page.screenshot({ path: resolve(CAPT, `scene-${nom}.png`) });
    await mesurer(`scène remplie ${nom}`);
  }
  await page.setViewportSize({ width: 360, height: 740 });
  await ouvrir({ nids: [ferme({ oeuf: {}, lit: [{ variante: 'plume-doree', rare: true }] }), ferme({ oeuf: { golden: true, habits: [habit('cape', 'empreintes')] } }), ferme()],
    sac: [] });
  await page.screenshot({ path: resolve(CAPT, 'sac-vide-360x740.png') });

  // 4 habits (2 bonnets + 2 écharpes) : l'œuf doit rester visible
  await ouvrir({ nids: [ferme({ oeuf: { habits: [habit('bonnet', 'rouge'), habit('bonnet', 'bleu'), habit('echarpe', 'rayee'), habit('echarpe', 'pois')] } }), ferme(), vide()] });
  await page.screenshot({ path: resolve(CAPT, 'oeuf-habille-4habits-360x740.png') });
  // 3 nids pleins aux 3 tailles
  const trois = { nids: [0, 1, 2].map(k => ferme({ lit: [{ variante: ['fougere', 'mousse', 'plumes'][k], rare: false }],
    oeuf: { habits: [[habit('bonnet', 'rouge')], [habit('echarpe', 'pois')], [habit('cape', 'nuage')]][k] }, peints: [{ variante: 'etoile' }, { variante: 'coeur' }] })),
    sac: [itemHab('bonnet', 'loup'), itemLit('mousse'), itemHab('cape', 'etoiles')] };
  for (const [nom, w, h] of [['360x740', 360, 740], ['320x568', 320, 568], ['740x360', 740, 360]]) {
    await page.setViewportSize({ width: w, height: h });
    await ouvrir(trois);
    await page.screenshot({ path: resolve(CAPT, `trois-nids-pleins-${nom}.png`) });
    await mesurer(`3 nids pleins ${nom}`);
    if (w > h) {
      const ecart = await page.evaluate(() => { const r = [...document.querySelectorAll('.n5-nid')].map(n => n.getBoundingClientRect()); return Math.min(r[1].left - r[0].right, r[2].left - r[1].right); });
      ok('paysage : les 3 nids côte à côte sans se toucher', ecart >= 0, 'ecart=' + ecart);
    }
  }
  await page.setViewportSize({ width: 360, height: 740 });

  // ═══ 10. ÉCRAN DE FIN (mj-golden showEnd, mj-cadeau.js) ═══════════════
  // Sur mj-24 : on appelle Golden.showEnd() directement (le chemin gagnant complet est
  // joué par mj-golden-nid / mj-49-nid) avec un état et un hasard contrôlés.
  const MJ24 = pathToFileURL(resolve(SITE, 'mj-24.html')).href;
  await page.goto(MJ24, { waitUntil: 'networkidle' });
  await page.evaluate(() => { localStorage.clear(); localStorage.setItem('maxplay_nid_intro', '1'); });
  await page.reload({ waitUntil: 'networkidle' });
  const ri = page.locator('#ri-panneau.on');
  if (await ri.count()) { await page.click('#ri-ok'); await page.waitForTimeout(200); }
  await page.waitForFunction(() => window.Golden && window.Collection && window.GoldenCadeau, null, { timeout: 8000 });
  await page.evaluate(() => Golden.showEnd({ replayUrl: 'mj-24.html' }));
  await page.waitForSelector('.mjc-ov .mjc-phrase', { timeout: 4000 });
  const carte1 = await page.evaluate(() => ({
    phrase: document.querySelector('.mjc-phrase').textContent,
    imgs: [...document.querySelectorAll('.mjc-visuel img')].map(i => ({ src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0 })),
  }));
  ok('fin : 1er cadeau = carte « cailloux » avec ses images (chargées)', /caillou/i.test(carte1.phrase) && carte1.imgs.length === 3 && carte1.imgs.every(i => i.ok), JSON.stringify(carte1));
  await page.waitForTimeout(800); // fin du pop d'apparition de la carte
  await page.screenshot({ path: resolve(CAPT, 'fin-cadeau-360x740.png') });
  await page.waitForSelector('.end-btns[style*="animation-delay"] [data-act="replay"]', { state: 'attached' });
  await page.waitForFunction(() => !document.querySelector('.mjc-ov'), null, { timeout: 6000 });
  await page.waitForTimeout(1500);
  ok('fin : après la carte, les boutons sont là, « Au nid » présent', (await nb('[data-act="replay"]')) === 1 && (await nb('[data-act="nid"]')) === 1);
  await page.screenshot({ path: resolve(CAPT, 'fin-apres-cadeau-360x740.png') });

  // Pas de cadeau : on n'en parle pas (ni carte, ni message « déjà toutes les étoiles »)
  await page.evaluate(() => {
    localStorage.setItem('maxplay_collection_v1', JSON.stringify({ version: 3, owned: [], sac: [], hatchCount: 1, dry: 0, lastDouble: false, lastGift: null, streakCount: 0, lastGrantAt: null,
      nids: [{ cailloux: 6, lit: [], peints: [], oeuf: null }, { cailloux: 0, lit: [], peints: [], oeuf: null }, { cailloux: 0, lit: [], peints: [], oeuf: null }] }));
    Collection.configure({ rng: () => 0.99 });
    window.Stars = { get: () => 3 }; // même un jeu à 3 étoiles : plus d'anti-farm, et plus de message
    Golden.showEnd({ replayUrl: 'mj-24.html' });
  });
  await page.waitForTimeout(600);
  const rien = await page.evaluate(() => ({ cartes: document.querySelectorAll('.mjc-ov').length, txt: document.querySelector('.end-wrap').innerText, nid: document.querySelectorAll('[data-act="nid"]').length }));
  ok('fin sans cadeau : aucune carte, aucun message sur les étoiles/œufs, pas de bouton « Au nid »',
     rien.cartes === 0 && !/déjà|toutes les étoiles|cadeau/i.test(rien.txt) && rien.nid === 0, JSON.stringify(rien));

  // Œuf prêt au nid : « Au nid » est là et PULSE (animation Web Animations en boucle)
  await page.evaluate(() => {
    const fam = DINO_FAMILLES[0].id;
    localStorage.setItem('maxplay_collection_v1', JSON.stringify({ version: 3, owned: [], sac: [{ type: 'lit', id: 'lit', variante: 'mousse', rare: false }], hatchCount: 1, dry: 0, lastDouble: false, lastGift: null, streakCount: 0, lastGrantAt: null,
      nids: [{ cailloux: 6, lit: [], peints: [], oeuf: { famille: fam, golden: false, at: 0, naissance: null, caresses: 0, habits: [] } }, { cailloux: 0, lit: [], peints: [], oeuf: null }, { cailloux: 0, lit: [], peints: [], oeuf: null }] }));
    Collection.configure({ rng: () => 0.99 });
    Golden.showEnd({ replayUrl: 'mj-24.html' });
  });
  await page.waitForTimeout(500);
  const pulse = await page.evaluate(() => { const b = document.querySelector('[data-act="nid"]'); return !!b && b.getAnimations().some(a => a.effect.getTiming().iterations === Infinity); });
  ok('fin : un objet attend au sac → « Au nid » est présent et pulse', pulse);

  // Double cadeau : 2 cartes l'une après l'autre, puis la fête
  const dbl = await page.evaluate(async () => {
    const vus = []; let fete = 0;
    const obs = new MutationObserver(() => { const p = document.querySelector('.mjc-phrase'); if (p && vus[vus.length - 1] !== p.textContent) vus.push(p.textContent); });
    obs.observe(document.body, { childList: true, subtree: true });
    await GoldenCadeau.jouer([{ type: 'lit', id: 'lit', variante: 'mousse', texte: 'Un lit pour ton œuf !' }, { type: 'habit', id: 'bonnet', variante: 'rouge', texte: 'Un bonnet !' }], { fete: () => { fete++; } });
    obs.disconnect();
    return { vus, fete, reste: document.querySelectorAll('.mjc-ov').length };
  });
  ok('double cadeau : 2 cartes successives, la fête jouée, rien ne reste à l’écran', dbl.vus.length === 2 && dbl.fete === 1 && dbl.reste === 0, JSON.stringify(dbl));
  await page.waitForTimeout(100);

  ok('aucune erreur JS / console', errors.length === 0, errors.join(' | '));
} catch (e) {
  ok('exécution sans exception', false, e.stack || e.message);
}

await browser.close();

console.log('\n── nid-v5.spec.mjs (écran du nid v5) ──');
for (const [cond, name, detail] of checks)
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
console.log(fail === 0 ? `\n\x1b[32m✓ nid-v5 OK (${checks.length} contrôles)\x1b[0m\n` : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail === 0 ? 0 : 1);
