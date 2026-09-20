// armoire-meuble.spec.mjs — le MEUBLE « L'Armoire » v8 (HO-MJ-20). Spec
// AUTONOME : node studio/minijeux/tests/armoire-meuble.spec.mjs
//
// Ce qu'il garde, viewport par viewport :
//   · jamais d'ascenseur, rien de rogné par la zone .piece ;
//   · toutes les images chargées et versionnées (?v=empreinte, anti-cache) ;
//   · les pièces : 1 carcasse, 5 planches, 2 montants, 2 tiroirs, 4 vantaux
//     fermés (boutons), 4 vantaux ouverts ;
//   · FIDÉLITÉ : chaque pièce est rendue dans la boîte que le kit lui donne
//     (js/gen/armoire-kit.js, mesurée sur la référence), à 0,3 % du repère ;
//   · arrive fermé (ouverts à opacité 0, fermés à 1) ; ?etat=ouvert inverse ;
//   · tap sur un vantail fermé ouvre, tap sur le vantail ouvert referme ;
//   · zone tactile ≥ 48 × 48 sur chaque bouton ;
//   · proportions identiques entre 320 px et 1280 px ;
//   · poids images ≤ 250 Ko ; aucune erreur JS.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const DEV = resolve(__dir, '..', '..', '..', 'site', 'dev-armoire.html');

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m';
let fail = 0;
const checks = [];
const ok = (name, cond, detail = '') => { checks.push([cond, name, detail]); if (!cond) fail++; };

const VIEWPORTS = [
  { w: 360, h: 740 }, { w: 320, h: 568 }, { w: 360, h: 640 },
  { w: 412, h: 915 }, { w: 800, h: 600 }, { w: 1280, h: 720 }
];
let empreinte = null;

const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  const errors = [];
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`console.error: ${m.text()}`); });
  let imgBytes = 0;
  page.on('response', async (res) => {
    try { if (/\/img\//.test(res.url())) imgBytes += (await res.body()).length; } catch (e) {}
  });
  const tag = `${vp.w}x${vp.h}`;
  try {
    await page.goto(pathToFileURL(DEV).href, { waitUntil: 'networkidle' });
    await page.waitForSelector('.am-shell', { state: 'attached', timeout: 5000 });
    await page.waitForTimeout(150);

    const m = await page.evaluate(() => {
      const de = document.documentElement;
      const cab = document.getElementById('armoire');
      const R = cab.getBoundingClientRect();
      const piece = document.querySelector('.piece').getBoundingClientRect();
      const kit = window.ARMOIRE_KIT.pieces;
      const pct = (r) => ({
        x: (r.left - R.left) / R.width * 100, y: (r.top - R.top) / R.height * 100,
        w: r.width / R.width * 100, h: r.height / R.height * 100
      });
      // fidélité : chaque élément contre sa boîte du kit
      const ecarts = [];
      const cmp = (el, b, label) => {
        const p = pct(el.getBoundingClientRect());
        const d = Math.max(Math.abs(p.x - b.x), Math.abs(p.y - b.y), Math.abs(p.w - b.w), Math.abs(p.h - b.h));
        ecarts.push([label, d]);
      };
      cab.querySelectorAll('img.am-shell, img.am-planche, img.am-montant').forEach(el => cmp(el, kit[el.dataset.piece].box, el.dataset.piece));
      cmp(cab.querySelector('.am-tiroir.tiroir-g'), kit.tiroir.box, 'tiroir-g');
      cmp(cab.querySelector('.am-tiroir.tiroir-d'), kit.tiroir.box_droite, 'tiroir-d');
      for (const z of ['haut', 'bas']) {
        cmp(cab.querySelector(`.am-ouverte.am-g[data-zone="${z}"]`), kit['porte-ouverte-' + z].box, 'ouverte-g-' + z);
        cmp(cab.querySelector(`.am-ouverte.am-d[data-zone="${z}"]`), kit['porte-ouverte-' + z].box_droite, 'ouverte-d-' + z);
        cmp(cab.querySelector(`.am-porte.am-porte-${z}.am-g`), kit['porte-' + z].box, 'porte-g-' + z);
        cmp(cab.querySelector(`.am-porte.am-porte-${z}.am-d`), kit['porte-' + z].box_droite, 'porte-d-' + z);
      }
      const pire = ecarts.reduce((a, e) => e[1] > a[1] ? e : a, ['', 0]);

      // bornes visibles (opacité > 0) contre .piece
      const vis = [...cab.querySelectorAll('.am')].filter(e => +getComputedStyle(e).opacity > 0);
      const all = vis.map(e => e.getBoundingClientRect());
      const bornes = {
        l: Math.min(...all.map(r => r.left)), r: Math.max(...all.map(r => r.right)),
        t: Math.min(...all.map(r => r.top)), b: Math.max(...all.map(r => r.bottom))
      };
      const taps = [...cab.querySelectorAll('button.am .am-tap')].map(t => t.getBoundingClientRect());
      const fonds = [];
      const versionnees = [...cab.querySelectorAll('img')].every(i => /\?v=[0-9a-f]{8}$/.test(i.getAttribute('src')));
      const emp = {};
      ecarts.forEach(([label]) => { });
      cab.querySelectorAll('.am').forEach((e, i) => {
        const p = pct(e.getBoundingClientRect());
        emp[(e.dataset.piece || e.className) + '#' + i] = [p.x + p.w / 2, p.y + p.h / 2];
      });
      return {
        scrollH: de.scrollHeight, innerH: innerHeight, scrollW: de.scrollWidth, innerW: innerWidth,
        piece: { l: piece.left, r: piece.right, t: piece.top, b: piece.bottom },
        bornes,
        n: {
          shell: cab.querySelectorAll('.am-shell').length, planches: cab.querySelectorAll('.am-planche').length,
          montants: cab.querySelectorAll('.am-montant').length, tiroirs: cab.querySelectorAll('.am-tiroir').length,
          portes: cab.querySelectorAll('.am-porte').length, ouvertes: cab.querySelectorAll('.am-ouverte').length
        },
        imgsOk: [...cab.querySelectorAll('img')].every(i => i.complete && i.naturalWidth > 0),
        fonds, versionnees, pire, emp,
        minTap: Math.min(...taps.map(r => Math.min(r.width, r.height))),
        ferme: [...cab.querySelectorAll('.am-ouverte')].every(e => +getComputedStyle(e).opacity === 0) &&
               [...cab.querySelectorAll('.am-porte')].every(e => +getComputedStyle(e).opacity === 1)
      };
    });

    ok(`[${tag}] jamais d'ascenseur`, m.scrollH <= m.innerH + 1 && m.scrollW <= m.innerW + 1, `${m.scrollW}x${m.scrollH} vs ${m.innerW}x${m.innerH}`);
    ok(`[${tag}] rien de rogné par .piece`,
      m.bornes.l >= m.piece.l - 0.5 && m.bornes.t >= m.piece.t - 0.5 && m.bornes.r <= m.piece.r + 0.5 && m.bornes.b <= m.piece.b + 0.5,
      `L${m.bornes.l.toFixed(1)} R${m.bornes.r.toFixed(1)} T${m.bornes.t.toFixed(1)} B${m.bornes.b.toFixed(1)} / piece ${JSON.stringify(m.piece)}`);
    ok(`[${tag}] pièces : 1 carcasse, 5 planches, 2 montants, 2 tiroirs, 4 vantaux fermés, 4 ouverts`,
      m.n.shell === 1 && m.n.planches === 5 && m.n.montants === 2 && m.n.tiroirs === 2 && m.n.portes === 4 && m.n.ouvertes === 4, JSON.stringify(m.n));
    ok(`[${tag}] toutes les <img> chargées`, m.imgsOk);
    ok(`[${tag}] chaque pièce rendue dans sa boîte du kit (± 0,3 % du repère)`, m.pire[1] <= 0.3,
      `pire : ${m.pire[0]} écart ${m.pire[1].toFixed(3)} %`);
    ok(`[${tag}] arrive fermé`, m.ferme);
    ok(`[${tag}] zone tactile ≥ 48 px sur chaque bouton`, m.minTap >= 48, `min ${m.minTap.toFixed(1)}`);

    ok(`[${tag}] toutes les images portent ?v=<empreinte> (anti-cache)`, m.versionnees);

    if (!empreinte) {
      empreinte = m.emp;
    } else {
      let pire = 0, quoi = '';
      for (const k of Object.keys(empreinte)) {
        if (!m.emp[k]) { pire = 100; quoi = 'absent ' + k; break; }
        for (let i = 0; i < 2; i++) {
          const d = Math.abs(empreinte[k][i] - m.emp[k][i]);
          if (d > pire) { pire = d; quoi = k; }
        }
      }
      ok(`[${tag}] proportions identiques au viewport de référence`, pire <= 0.3, `écart max ${pire.toFixed(3)} % (${quoi})`);
    }

    // ouverture par tap sur un vantail fermé, fermeture par tap sur le vantail ouvert
    await page.click('.am-porte-haut.am-g');
    await page.click('.am-porte-bas.am-d');
    await page.waitForTimeout(900);
    const ouvert = await page.evaluate(() => {
      const cab = document.getElementById('armoire');
      return cab.classList.contains('am-ouvert-haut') && cab.classList.contains('am-ouvert-bas') &&
        [...cab.querySelectorAll('.am-ouverte')].every(e => +getComputedStyle(e).opacity === 1) &&
        [...cab.querySelectorAll('.am-porte')].every(e => +getComputedStyle(e).opacity === 0) &&
        [...cab.querySelectorAll('.am-tiroir')].every(e => !e.classList.contains('am-cache'));
    });
    ok(`[${tag}] tap sur un vantail fermé ouvre sa zone (ouverts visibles, fermés effacés, tiroirs actifs)`, ouvert);
    await page.click('.am-ouverte.am-g[data-zone="haut"]');
    await page.waitForTimeout(900);
    const referme = await page.evaluate(() => {
      const cab = document.getElementById('armoire');
      return !cab.classList.contains('am-ouvert-haut') && cab.classList.contains('am-ouvert-bas') &&
        [...cab.querySelectorAll('.am-ouverte[data-zone="haut"]')].every(e => +getComputedStyle(e).opacity === 0);
    });
    ok(`[${tag}] tap sur le vantail ouvert referme sa zone (l'autre reste ouverte)`, referme);

    await page.goto(pathToFileURL(DEV).href + '?etat=ouvert', { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);
    const etatOuvert = await page.evaluate(() =>
      [...document.querySelectorAll('.am-ouverte')].every(e => +getComputedStyle(e).opacity === 1));
    ok(`[${tag}] ?etat=ouvert : les 4 vantaux ouverts visibles`, etatOuvert);

    if (vp.w === 360 && vp.h === 740) ok('[360x740] poids images ≤ 250 Ko', imgBytes <= 250 * 1024, `${(imgBytes / 1024).toFixed(0)} Ko`);
    ok(`[${tag}] aucune erreur JS / console`, errors.length === 0, errors.join(' | '));
  } catch (e) {
    ok(`[${tag}] exécution sans exception`, false, e.message);
  }
  await page.close();
}
await browser.close();

console.log('\n── armoire-meuble.spec.mjs (meuble v8, HO-MJ-20) ──');
for (const [cond, name, detail] of checks) {
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
}
console.log(fail === 0 ? '\n\x1b[32m✓ armoire-meuble OK\x1b[0m\n' : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail === 0 ? 0 : 1);
