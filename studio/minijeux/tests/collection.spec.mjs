// collection.spec.mjs — Moteur de collection v3 (NID v5, HO-MJ-25, D-041)
// site/js/collection.js + collection-tirage.js. Spec AUTONOME : Chromium réel (pas
// jsdom), page minimale, pilotage via page.evaluate(). Le hasard est injecté par
// Collection.configure({rng}) (générateur à graine) : les tests sont déterministes.
//   node studio/minijeux/tests/collection.spec.mjs
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';

const __dir = dirname(fileURLToPath(import.meta.url));
const JS = resolve(__dir, '..', '..', '..', 'site', 'js');
const scratch = resolve(__dir, '_scratch');
mkdirSync(scratch, { recursive: true });
const htmlPath = resolve(scratch, 'collection-harness.html');
writeFileSync(htmlPath, `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>
<script src="${pathToFileURL(resolve(JS, 'collection-tirage.js')).href}"></script>
<script src="${pathToFileURL(resolve(JS, 'collection.js')).href}"></script>
</body></html>`);

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m';
let fail = 0;
const checks = [];
const ok = (name, cond, detail = '') => { checks.push([cond, name, detail]); if (!cond) fail++; };

// Catalogue de test : 10 items, 2 familles (A = 8 dont 1 star, B = 2).
const seed = (page) => page.evaluate(() => {
  const items = [];
  for (let i = 1; i <= 8; i++) items.push({ id: 'a' + i, nom: 'A' + i, famille: 'A', star: i === 1 });
  for (let i = 1; i <= 2; i++) items.push({ id: 'b' + i, nom: 'B' + i, famille: 'B' });
  window.mulberry = (a) => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  window.Collection.configure({
    items, rng: window.mulberry(1),
    familles: [{ id: 'A', label: 'A', emoji: '🅰️', color: '#c0392b' }, { id: 'B', label: 'B', emoji: '🅱️', color: '#27ae60' }],
  });
});
const reset = async (page, graine = 1) => {
  await page.evaluate(() => { localStorage.clear(); });
  await seed(page);
  await page.evaluate(g => Collection.configure({ rng: mulberry(g) }), graine);
};
// Écrit un état v3 (fusionné sur un état vide) directement en stockage.
const setV3 = (page, p) => page.evaluate((p) => {
  const vide = () => ({ cailloux: 0, lit: [], peints: [], oeuf: null });
  const s = Object.assign({ version: 3, owned: [], nids: [vide(), vide(), vide()], sac: [], lastGrantAt: null,
    streakCount: 0, hatchCount: 0, dry: 0, lastDouble: false, lastGift: null }, p);
  localStorage.setItem('maxplay_collection_v1', JSON.stringify(s));
}, p);
const oeuf = (extra = {}) => Object.assign({ famille: 'A', golden: false, at: 1, naissance: 'oeuf', caresses: 0, habits: [] }, extra);
const lit = { variante: 'fougere', rare: false };
const hab = (id, variante = 'rouge') => ({ id, variante, rare: false });
const itemHab = (id, variante = 'rouge') => ({ type: 'habit', id, variante, rare: false });

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));

try {
  await page.goto(pathToFileURL(htmlPath).href);
  await reset(page);

  // ── 1. premier cadeau = 6 cailloux sur le nid 1 (rng défavorable ou non) ──
  await page.evaluate(() => Collection.configure({ rng: () => 0.99 }));
  let g = await page.evaluate(() => Collection.grantReward({}));
  ok('premier cadeau : granted, type cailloux, n=6, nid 1', g.granted && g.type === 'cailloux' && g.gifts[0].n === 6 && g.gifts[0].nid === 0, JSON.stringify(g));
  ok('premier cadeau : jamais un double', g.double === false);
  let nd = await page.evaluate(() => Collection.nids());
  ok('après le 1er cadeau : nid 1 fermé (6 cailloux), nids 2 et 3 vides', nd[0].ferme && nd[0].cailloux === 6 && nd[1].cailloux === 0 && nd[2].cailloux === 0, JSON.stringify(nd));
  ok('3 nids exposés, aucun œuf', nd.length === 3 && nd.every(n => n.oeuf === null));

  // ── 2. sécheresse : 2 parties sans rien → la 3e est forcée ───────────────
  let r = [];
  for (let i = 0; i < 3; i++) r.push(await page.evaluate(() => Collection.grantReward({})));
  ok('rng défavorable : 2 parties sans cadeau puis la 3e FORCÉE', !r[0].granted && !r[1].granted && r[2].granted, JSON.stringify(r.map(x => x.granted)));
  const m = await page.evaluate(() => Collection.grantReward({ mastered: true }));
  ok('mastered : cadeau forcé, variante rare quand elle existe', m.granted && (m.gifts[0].type === 'cailloux' || m.gifts[0].type === 'oeuf' || m.gifts[0].rare), JSON.stringify(m));

  // ── 3. simulation : 200 parties × 5 graines, joueur qui range tout ───────
  const sim = await page.evaluate(() => {
    const viol = [];
    let maxDry = 0, maxSacSeen = 0, nbDoubles = 0, nbGifts = 0, nbOeufs = 0;
    for (const graine of [1, 2, 3, 4, 5]) {
      localStorage.clear();
      Collection.configure({ rng: mulberry(graine * 7919) });
      let dry = 0, lastDouble = false, lastCle = null;
      for (let p = 0; p < 200; p++) {
        const avantNids = Collection.nids(), avantSac = Collection.sac();
        const res = Collection.grantReward({ perfect: (p % 3) === 0 });
        const cle = (x) => x.type + '|' + x.id + '|' + x.variante;
        if (!res.granted) { dry++; lastDouble = false; maxDry = Math.max(maxDry, dry); }
        else {
          dry = 0; nbGifts += res.gifts.length;
          if (res.double) { nbDoubles++; if (lastDouble) viol.push('2 doubles de suite g' + graine + ' p' + p); }
          lastDouble = res.double;
          res.gifts.forEach((x, k) => {
            if (cle(x) === lastCle) viol.push('même cadeau 2 fois de suite : ' + lastCle + ' g' + graine + ' p' + p);
            lastCle = cle(x);
            if (x.type === 'oeuf') {
              nbOeufs++;
              const libre = avantNids.some(n => n.ferme && !n.oeuf);
              if (!libre) viol.push('œuf sans nid fermé libre g' + graine + ' p' + p);
            }
            // D-041 recette 2026-11-25 : un nid fermé libre attend son œuf, on n'agrandit pas le terrain avant
            if (x.type === 'cailloux' && k === 0 && avantNids.some(n => n.ferme && !n.oeuf) && avantNids.some(n => n.cailloux > 0)) {
              viol.push('cailloux alors qu\'un nid fermé attend son œuf g' + graine + ' p' + p);
            }
            if (x.type === 'habit') {
              const lit0 = avantNids.some(n => n.oeuf && n.lit.length) || avantSac.some(a => a.type === 'lit') || (k === 1 && res.gifts[0].type === 'lit') || (k === 1 && res.gifts[0].type === 'oeuf' && avantNids[res.gifts[0].nid].lit.length > 0);
              if (!lit0) viol.push('habit avant le lit g' + graine + ' p' + p);
            }
          });
        }
        // le joueur range tout, puis fait éclore ce qui est prêt
        for (let guard = 0; guard < 6; guard++) {
          const sac = Collection.sac(); if (!sac.length) break;
          const it = sac[0], nids = Collection.nids();
          let cible = -1;
          if (it.type === 'lit') cible = nids.findIndex(n => n.ferme && !n.lit.length && n.oeuf);
          else { const c = nids.filter(n => n.oeuf).sort((a, b) => a.oeuf.habits.length - b.oeuf.habits.length)[0]; cible = c ? c.index : -1; }
          if (cible === -1 || !Collection.poser(cible, it.index).ok) break;
        }
        maxSacSeen = Math.max(maxSacSeen, Collection.sac().length);
        while (Collection.readyNidIndex() !== -1) { if (!Collection.eclore(Collection.readyNidIndex())) break; }
      }
    }
    return { viol, maxDry, maxSacSeen, nbDoubles, nbGifts, nbOeufs };
  });
  ok('200 parties × 5 graines : jamais 3 parties de suite sans rien', sim.maxDry <= 2, 'maxDry=' + sim.maxDry);
  ok('simulation : aucun cadeau en double de suite, aucun œuf sans nid libre, aucun habit avant le lit', sim.viol.length === 0, sim.viol.slice(0, 5).join(' | '));
  ok('simulation : jamais 2 doubles de suite mais il y en a (sinon le test ne prouve rien)', sim.nbDoubles > 0, JSON.stringify(sim));
  ok('simulation : des œufs sont bien arrivés', sim.nbOeufs > 5, JSON.stringify(sim));
  ok('simulation : le sac ne dépasse jamais 3 places', sim.maxSacSeen <= 3, 'sac max=' + sim.maxSacSeen);

  // ── 4. doubles : jamais deux de suite, même avec un rng qui en veut toujours ──
  await reset(page);
  const dbl = await page.evaluate(() => {
    Collection.configure({ rng: () => 0 });
    const flags = [];
    for (let i = 0; i < 12; i++) flags.push(Collection.grantReward({ perfect: true }).double);
    return flags;
  });
  ok('rng qui veut toujours un double : jamais deux de suite', dbl.every((d, i) => !(d && dbl[i + 1])) && dbl.some(Boolean), JSON.stringify(dbl));

  // ── 5. sac plein → ni lit ni habit, et on ne jette rien ───────────────────
  await reset(page);
  await setV3(page, { owned: ['a2'], hatchCount: 1,
    nids: [{ cailloux: 6, lit: [], peints: [], oeuf: oeuf() }, { cailloux: 6, lit: [lit], peints: [], oeuf: oeuf() }, { cailloux: 6, lit: [], peints: [], oeuf: oeuf() }],
    sac: [itemHab('cape', 'nuage'), itemHab('echarpe', 'pois'), { type: 'lit', id: 'lit', variante: 'mousse', rare: false }] });
  const plein = await page.evaluate(() => {
    const types = new Set(); let n = 0;
    for (let i = 0; i < 60; i++) { const r = Collection.grantReward({ perfect: i % 2 === 0 }); (r.gifts || []).forEach(x => { types.add(x.type); n++; }); }
    return { types: [...types], sac: Collection.sac().length };
  });
  ok('sac plein : aucun lit ni habit tiré en 60 parties', !plein.types.includes('lit') && !plein.types.includes('habit'), JSON.stringify(plein));
  ok('sac plein : le contenu reste intact (rien jeté)', plein.sac === 3, JSON.stringify(plein));

  // ── 6. ordre : le lit avant les habits ────────────────────────────────────
  const ordre = await page.evaluate(() => {
    const premiers = new Set();
    for (let g = 1; g <= 40; g++) {
      localStorage.setItem('maxplay_collection_v1', JSON.stringify({ version: 3, owned: ['a2'], hatchCount: 1, sac: [], lastGrantAt: null, streakCount: 0, dry: 2, lastDouble: false, lastGift: null,
        nids: [0, 1, 2].map(() => ({ cailloux: 6, lit: [], peints: [], oeuf: { famille: 'A', golden: false, at: 1, naissance: 'oeuf', caresses: 0, habits: [] } })) }));
      Collection.configure({ rng: mulberry(g) });
      const r = Collection.grantReward({ perfect: g % 2 === 0 });
      if (r.gifts[0]) premiers.add(r.gifts[0].type);
    }
    return [...premiers];
  });
  ok('3 œufs sans lit : le 1er cadeau est toujours un lit (jamais un habit)', ordre.length === 1 && ordre[0] === 'lit', JSON.stringify(ordre));

  // ── 7. 3e habit du même type refusé, l'objet revient au sac ───────────────
  await reset(page);
  await setV3(page, { owned: ['a2'], hatchCount: 1,
    nids: [{ cailloux: 6, lit: [lit], peints: [], oeuf: oeuf() }, _n(), _n()],
    sac: [itemHab('bonnet', 'rouge'), itemHab('bonnet', 'bleu'), itemHab('bonnet', 'loup')] });
  function _n() { return { cailloux: 0, lit: [], peints: [], oeuf: null }; }
  const p1 = await page.evaluate(() => Collection.poser(0, 0));
  const p2 = await page.evaluate(() => Collection.poser(0, 0));
  const p3 = await page.evaluate(() => Collection.poser(0, 0));
  const apres = await page.evaluate(() => ({ sac: Collection.sac().length, h: Collection.nids()[0].oeuf.habits.length }));
  ok('2 bonnets sur le même œuf : acceptés (tour de bonnets)', p1.ok && p2.ok, JSON.stringify({ p1, p2 }));
  ok('3e bonnet refusé (refus:type), il reste au sac, aucune erreur', p3.ok === false && p3.refus === 'type' && apres.sac === 1 && apres.h === 2, JSON.stringify({ p3, apres }));

  // ── 8. poser : lit dans un nid fermé seulement, une seule fois ────────────
  await reset(page);
  await setV3(page, { hatchCount: 1, nids: [{ cailloux: 4, lit: [], peints: [], oeuf: null }, { cailloux: 6, lit: [], peints: [], oeuf: oeuf() }, _n()],
    sac: [{ type: 'lit', id: 'lit', variante: 'mousse', rare: false }, { type: 'lit', id: 'lit', variante: 'plumes', rare: false }] });
  const l0 = await page.evaluate(() => Collection.poser(0, 0));
  const l1 = await page.evaluate(() => Collection.poser(1, 0));
  const l2 = await page.evaluate(() => Collection.poser(1, 0));
  ok('lit refusé sur un nid pas fermé, accepté sur un nid fermé, refusé en double',
     !l0.ok && l1.ok && !l2.ok && l2.refus === 'lit', JSON.stringify({ l0, l1, l2 }));

  // ── 9. éclosion : lit + 2 habits ; nid et lit restent ─────────────────────
  await reset(page);
  await setV3(page, { owned: ['a2'], hatchCount: 1,
    nids: [{ cailloux: 6, lit: [lit], peints: [], oeuf: oeuf({ habits: [hab('bonnet'), hab('echarpe', 'rayee')] }) },
           { cailloux: 6, lit: [lit], peints: [], oeuf: oeuf({ habits: [hab('cape')] }) },
           { cailloux: 6, lit: [], peints: [], oeuf: oeuf({ habits: [hab('cape'), hab('bonnet')] }) }] });
  const ready = await page.evaluate(() => ({ idx: Collection.readyNidIndex(), th: Collection.hatchThreshold(), nids: Collection.nids().map(n => n.ready) }));
  ok('prêt = lit + 2 habits (1 habit : pas prêt ; pas de lit : pas prêt)', ready.idx === 0 && ready.th === 2 && JSON.stringify(ready.nids) === '[true,false,false]', JSON.stringify(ready));
  const bebe = await page.evaluate(() => Collection.eclore(0));
  const apresE = await page.evaluate(() => ({ n: Collection.nids()[0], owned: Collection.owned(), hc: Collection.state().hatchCount, froid: Collection.eclore(1) }));
  ok('éclosion : une espèce de la famille A, possédée', !!bebe && bebe.famille === 'A' && apresE.owned.includes(bebe.id), JSON.stringify(bebe));
  ok('éclosion : le nid fermé et son lit RESTENT, l\'œuf et ses habits sont partis', apresE.n.ferme && apresE.n.lit.length === 1 && apresE.n.oeuf === null, JSON.stringify(apresE.n));
  ok('éclosion refusée si pas prêt (null), compteur d\'éclosions à 2', apresE.froid === null && apresE.hc === 2, JSON.stringify({ froid: apresE.froid, hc: apresE.hc }));
  // tout premier œuf : lit + 1 habit suffit
  await setV3(page, { hatchCount: 0, nids: [{ cailloux: 6, lit: [lit], peints: [], oeuf: oeuf({ habits: [hab('bonnet')] }) }, _n(), _n()] });
  ok('tout premier œuf de l\'histoire : lit + 1 habit suffisent', await page.evaluate(() => Collection.hatchThreshold() === 1 && Collection.readyNidIndex() === 0));
  // doré : très connu (star a1)
  await setV3(page, { hatchCount: 0, nids: [{ cailloux: 6, lit: [lit], peints: [], oeuf: oeuf({ golden: true, habits: [hab('bonnet')] }) }, _n(), _n()] });
  const dore = await page.evaluate(() => Collection.eclore(0));
  ok('œuf doré : éclot sur un dino TRÈS CONNU (star a1)', dore && dore.id === 'a1', JSON.stringify(dore));
  // collection complète → doublon
  await setV3(page, { owned: ['a1','a2','a3','a4','a5','a6','a7','a8','b1','b2'], hatchCount: 1, nids: [{ cailloux: 6, lit: [lit], peints: [], oeuf: oeuf({ habits: [hab('bonnet'), hab('cape')] }) }, _n(), _n()] });
  const dbl2 = await page.evaluate(() => Collection.eclore(0));
  ok('collection complète : éclosion → {type:"doublon", item}', dbl2 && dbl2.type === 'doublon' && !!dbl2.item, JSON.stringify(dbl2));
  // catalogue absent : on ne détruit pas l'œuf (HO-MJ-21)
  await setV3(page, { hatchCount: 1, nids: [{ cailloux: 6, lit: [lit], peints: [], oeuf: oeuf({ habits: [hab('bonnet'), hab('cape')] }) }, _n(), _n()] });
  const vide = await page.evaluate(() => { Collection.configure({ items: [] }); const r = Collection.eclore(0); const n = Collection.nids()[0].oeuf; return { r, gardé: !!n }; });
  ok('catalogue absent : éclosion null et l\'œuf reste intact', vide.r === null && vide.gardé, JSON.stringify(vide));

  // ── 10. caresse : cœurs seulement, ne fait jamais éclore ──────────────────
  await reset(page);
  await setV3(page, { hatchCount: 1, nids: [{ cailloux: 6, lit: [], peints: [], oeuf: oeuf() }, _n(), _n()] });
  const car = await page.evaluate(() => { let c; for (let i = 0; i < 10; i++) c = Collection.caresser(0); return { c, ready: Collection.readyNidIndex() }; });
  ok('10 caresses : stade 3, jamais prêt, jamais d\'éclosion', car.c.stage === 3 && car.c.ready === false && car.ready === -1, JSON.stringify(car));

  // ── 11. migration v2 → v3 sans perte ──────────────────────────────────────
  await reset(page);
  await page.evaluate(() => {
    localStorage.setItem('maxplay_collection_v1', JSON.stringify({
      version: 2, owned: ['a2', 'b1'], hatchCount: 1, lastGrantAt: 5, streakCount: 2,
      eggs: [
        { famille: 'A', golden: false, at: 1, acc: ['paille', 'bonnet', 'echarpe', 'couverture'], caresses: 2, loveWarm: false, naissance: 'oeuf' },
        { famille: 'B', golden: true, at: 2, acc: ['etoile'], caresses: 0, loveWarm: false },
        { famille: 'A', golden: false, at: 3, acc: [], caresses: 1, loveWarm: true },
      ],
      sac: ['paille', 'bonnet', 'bonnet', 'etoile2'],
    }));
  });
  const mig = await page.evaluate(() => Collection.nids());
  const migSac = await page.evaluate(() => Collection.sac());
  const raw = await page.evaluate(() => JSON.parse(localStorage.getItem('maxplay_collection_v1')));
  const migSt = await page.evaluate(() => Collection.state());
  ok('migration : écrite une fois en version 3, owned et compteur d\'éclosions conservés', raw.version === 3 && JSON.stringify(migSt.owned) === '["a2","b1"]' && migSt.hatchCount === 1, JSON.stringify(raw).slice(0, 200));
  ok('migration : chaque œuf v2 a un nid fermé (6 cailloux) et sa famille, doré conservé', mig.every(n => n.ferme && n.oeuf) && mig[0].oeuf.famille === 'A' && mig[1].oeuf.golden === true && mig[1].oeuf.famille === 'B', JSON.stringify(mig.map(n => n.oeuf && n.oeuf.famille)));
  ok('migration : paille → lit fougere ; bonnet → rouge ; écharpe → rayee', mig[0].lit[0].variante === 'fougere' && mig[0].oeuf.habits.map(h => h.id + ':' + h.variante).join() === 'bonnet:rouge,echarpe:rayee', JSON.stringify(mig[0]));
  ok('migration : étoile → cape etoiles (rare)', mig[1].oeuf.habits[0].id === 'cape' && mig[1].oeuf.habits[0].variante === 'etoiles' && mig[1].oeuf.habits[0].rare === true, JSON.stringify(mig[1].oeuf.habits));
  ok('migration : le 3e accessoire de l\'œuf 1 (couverture → cape ecossaise) passe au sac, rien de perdu',
     migSac.some(a => a.id === 'cape' && a.variante === 'ecossaise') && migSac.length === 5, JSON.stringify(migSac.map(a => a.key)));
  ok('migration : œuf réchauffé par l\'amour reste prêt à éclore', mig[2].ready === true && mig[2].oeuf.caresses === 1, JSON.stringify(mig[2]));
  ok('migration : les 3 nids existent, le sac migré peut dépasser 3 sans rien jeter', mig.length === 3 && migSac.length > 3);
  // nid v2 vide mais dinos déjà possédés → nid 1 fermé d'office
  await page.evaluate(() => localStorage.setItem('maxplay_collection_v1', JSON.stringify({ version: 2, owned: ['a3'], eggs: [], sac: [], hatchCount: 1 })));
  const migVide = await page.evaluate(() => Collection.nids());
  ok('migration : nid v2 vide avec dinos possédés → nid 1 fermé d\'office', migVide[0].ferme && !migVide[1].ferme, JSON.stringify(migVide.map(n => n.cailloux)));
  // v1 (capsules)
  await page.evaluate(() => localStorage.setItem('maxplay_collection_v1', JSON.stringify({ version: 1, owned: ['a2'], pending: [{ golden: false, at: 1 }, { golden: true, at: 2 }], lastGrantAt: 2, streakCount: 2 })));
  const mig1 = await page.evaluate(() => Collection.state());
  ok('migration v1 : 2 capsules → 2 œufs en nids fermés, doré conservé', mig1.eggs.length === 2 && mig1.nids[0].ferme && mig1.eggs.some(e => e.golden) && mig1.hatchCount === 1, JSON.stringify(mig1.eggs));

  // ── 12. échec d'écriture → jamais granted:true (HO-MJ-21) ─────────────────
  await reset(page);
  const sf = await page.evaluate(() => {
    const orig = Storage.prototype.setItem;
    Storage.prototype.setItem = function () { throw new Error('quota'); };
    let r; try { r = Collection.grantReward({}); } finally { Storage.prototype.setItem = orig; }
    return { r, apres: Collection.nids()[0].cailloux };
  });
  ok('save() en échec : granted:false + saveFailed, rien n\'est annoncé ni écrit', sf.r.granted === false && sf.r.saveFailed === true && sf.apres === 0, JSON.stringify(sf));
  const sf2 = await page.evaluate(() => {
    Collection.grantReward({}); // 1er cadeau écrit
    const orig = Storage.prototype.setItem;
    Storage.prototype.setItem = function () { throw new Error('quota'); };
    let r; try { r = Collection.grantReward({ mastered: true }); } finally { Storage.prototype.setItem = orig; }
    return r;
  });
  ok('save() en échec sur un cadeau forcé : toujours granted:false', sf2.granted === false && sf2.saveFailed === true, JSON.stringify(sf2));

  // ── 13. plus d'anti-farm : un jeu à 3 étoiles suit la même règle ──────────
  await reset(page);
  const af = await page.evaluate(() => { window.Stars = { get: () => 3 }; const r = Collection.grantReward({ gameId: 'mj-99' }); delete window.Stars; return r; });
  ok('jeu à 3 étoiles : cadeau normal (premier cadeau = cailloux)', af.granted === true && af.type === 'cailloux', JSON.stringify(af));

  // ── 14. rare : sans-faute / mastered → variante rare ──────────────────────
  await reset(page);
  await setV3(page, { owned: ['a2'], hatchCount: 1, dry: 2, nids: [{ cailloux: 6, lit: [], peints: [], oeuf: oeuf() }, { cailloux: 6, lit: [], peints: [], oeuf: oeuf() }, { cailloux: 6, lit: [], peints: [], oeuf: oeuf() }] });
  // rng figé à 0 : le tirage « une fois sur deux » tombe du côté rare
  const rareLit = await page.evaluate(() => { Collection.configure({ rng: () => 0 }); return Collection.grantReward({ perfect: true }).gifts[0]; });
  ok('sans-faute (rng bas) : lit tiré dans la liste rare (plume-doree)', rareLit.type === 'lit' && rareLit.rare === true && rareLit.variante === 'plume-doree', JSON.stringify(rareLit));
  // rng figé à 0,99 : l'autre côté, sans-faute mais variante commune
  await setV3(page, { owned: ['a2'], hatchCount: 1, dry: 2, nids: [0, 1, 2].map(() => ({ cailloux: 6, lit: [], peints: [], oeuf: oeuf() })) });
  const sfCom = await page.evaluate(() => { Collection.configure({ rng: () => 0.99 }); return Collection.grantReward({ perfect: true }).gifts[0]; });
  ok('sans-faute (rng haut) : variante COMMUNE (pas toujours rare)', sfCom.type === 'lit' && sfCom.rare === false && sfCom.variante !== 'plume-doree', JSON.stringify(sfCom));
  // statistique : sur 200 sans-faute, ni jamais ni toujours rare
  const stat = await page.evaluate(() => {
    Collection.configure({ rng: mulberry(7) }); let rares = 0, n = 0;
    for (let i = 0; i < 200; i++) {
      localStorage.clear();
      localStorage.setItem('maxplay_collection_v1', JSON.stringify({ version: 3, owned: ['a2'], hatchCount: 1, dry: 2, lastDouble: true, lastGift: null, sac: [], lastGrantAt: null, streakCount: 0,
        nids: [0, 1, 2].map(() => ({ cailloux: 6, lit: [], peints: [], oeuf: { famille: 'A', golden: false, at: 0, naissance: null, caresses: 0, habits: [] } })) }));
      const g = Collection.grantReward({ perfect: true }).gifts[0]; n++; if (g.rare) rares++;
    }
    return { rares, n };
  });
  ok('sans-faute : environ une variante rare sur deux (60 à 140 sur 200)', stat.rares >= 60 && stat.rares <= 140, JSON.stringify(stat));
  await page.evaluate(() => Collection.configure({ rng: mulberry(1) }));
  await setV3(page, { owned: ['a2'], hatchCount: 1, dry: 2, nids: [0, 1, 2].map(() => ({ cailloux: 6, lit: [], peints: [], oeuf: oeuf() })) });
  const mastRare = await page.evaluate(() => { Collection.configure({ rng: () => 0.99 }); return Collection.grantReward({ mastered: true }).gifts[0]; });
  ok('mastered : toujours rare, même avec un rng défavorable', mastRare.rare === true && mastRare.variante === 'plume-doree', JSON.stringify(mastRare));
  await page.evaluate(() => Collection.configure({ rng: mulberry(1) }));
  await setV3(page, { owned: ['a2'], hatchCount: 1, dry: 2, nids: [0, 1, 2].map(() => ({ cailloux: 6, lit: [], peints: [], oeuf: oeuf() })) });
  const comLit = await page.evaluate(() => Collection.grantReward({}).gifts[0]);
  ok('partie ordinaire : variante commune', comLit.rare === false && comLit.variante !== 'plume-doree', JSON.stringify(comLit));

  // ── 15. catalogue configurable ────────────────────────────────────────────
  await setV3(page, { owned: ['a2'], hatchCount: 1, dry: 2, nids: [0, 1, 2].map(() => ({ cailloux: 6, lit: [], peints: [], oeuf: oeuf() })) });
  const conf = await page.evaluate(() => { Collection.configure({ nid: { lits: { commun: ['x1'], rare: ['x2'] } } }); return Collection.grantReward({}).gifts[0]; });
  ok('configure({nid:{lits}}) : le moteur pioche dans le catalogue fourni', conf.type === 'lit' && conf.variante === 'x1', JSON.stringify(conf));
  await page.evaluate(() => Collection.configure({ nid: {} })); // retour au catalogue par défaut

  // ── 16. cailloux peints : seulement quand tout est fini, 4 par nid max ────
  await reset(page);
  await setV3(page, { owned: ['a2'], hatchCount: 1, dry: 2,
    nids: [0, 1, 2].map(() => ({ cailloux: 6, lit: [lit], peints: [], oeuf: oeuf({ habits: [hab('bonnet'), hab('cape')] }) })) });
  const pt = await page.evaluate(() => {
    const types = new Set(); let n = 0;
    for (let i = 0; i < 80; i++) { const r = Collection.grantReward({ perfect: true }); (r.gifts || []).forEach(x => { types.add(x.type); if (x.type === 'peint') n++; }); }
    return { types: [...types], n, peints: Collection.nids().map(x => x.peints.length) };
  });
  ok('tout fini : seuls des cailloux peints, 4 par nid maximum, rien au-delà', pt.types.length === 1 && pt.types[0] === 'peint' && pt.peints.every(p => p === 4) && pt.n === 12, JSON.stringify(pt));

  // ── 17. compat v2 (armoire.js, nid-ui.js) ─────────────────────────────────
  await reset(page);
  await setV3(page, { hatchCount: 1, nids: [{ cailloux: 6, lit: [], peints: [], oeuf: oeuf() }, _n(), { cailloux: 6, lit: [], peints: [], oeuf: oeuf({ famille: 'B' }) }],
    sac: [{ type: 'lit', id: 'lit', variante: 'mousse', rare: false }] });
  const cp = await page.evaluate(() => {
    const e = Collection.eggs(), s = Collection.sac(), w = Collection.warmEgg(2, s[0].id);
    return { n: e.length, idx: e.map(x => x.index), famMeta: !!e[0].familleMeta, sacKeys: s.map(a => !!(a.id && a.emoji && a.count)), w, pend: Collection.pending(), st: Object.keys(Collection.state()).sort() };
  });
  ok('compat : eggs().length = œufs des nids, index = index du nid, sac() exploitable, warmEgg pose le lit', cp.n === 2 && cp.idx.join() === '0,2' && cp.famMeta && cp.sacKeys[0] && cp.w.ok && cp.pend.count === 2, JSON.stringify(cp));
  ok('compat : state() porte nids, eggs, sac, owned, pending', ['eggs', 'nids', 'owned', 'pending', 'sac'].every(k => cp.st.includes(k)), cp.st.join());

  // ── 18. multi-profil isolé + persistance ──────────────────────────────────
  await reset(page);
  const mp = await page.evaluate(() => {
    localStorage.setItem('maxplay_active_child', JSON.stringify({ id: 'c1' }));
    Collection.own('a1'); Collection.grantReward({});
    const c1 = Collection.state();
    localStorage.setItem('maxplay_active_child', JSON.stringify({ id: 'c2' }));
    const c2 = Collection.state();
    localStorage.setItem('maxplay_active_child', JSON.stringify({ id: 'c1' }));
    const c1b = Collection.state();
    localStorage.removeItem('maxplay_active_child');
    return { c1: c1.nids[0].cailloux, c2: c2.nids[0].cailloux, c2o: c2.owned.length, c1b: c1b.nids[0].cailloux, o: c1b.owned };
  });
  ok('profils isolés : le 2e démarre vide, le 1er retrouve son nid', mp.c1 === 6 && mp.c2 === 0 && mp.c2o === 0 && mp.c1b === 6 && mp.o.includes('a1'), JSON.stringify(mp));
  await page.evaluate(() => { localStorage.clear(); Collection.grantReward({}); });
  await page.reload(); await seed(page);
  ok('persistance après rechargement', (await page.evaluate(() => Collection.nids()[0].cailloux)) === 6);

  ok('Aucune erreur JS (smoke)', errors.length === 0, errors.join(' | '));
} catch (e) {
  ok('exécution sans exception', false, e.stack || e.message);
}

await browser.close();
// _scratch/ est PARTAGÉ entre specs : ne supprimer que notre fichier.
if (existsSync(htmlPath)) rmSync(htmlPath, { force: true });

console.log('\n── collection.spec.mjs ──');
for (const [cond, name, detail] of checks)
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
console.log(fail === 0 ? `\n\x1b[32m✓ collection.js OK (${checks.length} contrôles)\x1b[0m\n` : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail === 0 ? 0 : 1);
