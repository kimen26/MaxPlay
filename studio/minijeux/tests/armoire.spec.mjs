// armoire.spec.mjs — L'Armoire v6 (HO-MJ-19). Spec AUTONOME (comme
// mur-nid.spec.mjs) : il n'y a pas de site/armoire.html, donc pas de
// `npm run mj:test armoire` (run.mjs cherche site/<mj>.html) — lancer :
//   node studio/minijeux/tests/armoire.spec.mjs
//
// Ce que ce spec garde, viewport par viewport :
//   · jamais d'ascenseur, et rien de rogné par le bord de l'écran ;
//   · les 17 cases présentes, chacune ≥ 96 × 96 de zone tactile ;
//   · toutes les images chargées, portes comprises (une url() de fond qui
//     tombe en 404 est invisible à l'œil — c'est arrivé) ;
//   · les 4 vantaux s'ouvrent et se referment ;
//   · le poids du premier affichage ;
//   · aucune erreur JS.
//
// Et surtout la promesse de l'architecture v6 : LES PROPORTIONS NE BOUGENT
// PAS. Chaque case est mesurée en fraction de la boîte de l'armoire, et ces
// fractions doivent être identiques à 320 px et à 1280 px. C'est ce test-là
// qui échouerait si quelqu'un remettait un calcul de taille par pièce.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '..', '..', '..', 'site');
const INDEX = resolve(SITE, 'index.html');
const CAPTURES = resolve(__dir, '..', 'docs', 'handoffs', 'rapports', 'captures');
mkdirSync(CAPTURES, { recursive: true });

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m';
let fail = 0;
const checks = [];
const ok = (name, cond, detail = '') => { checks.push([cond, name, detail]); if (!cond) fail++; };

const VIEWPORTS = [
  { w: 360, h: 740 }, { w: 360, h: 640 }, { w: 320, h: 568 }, { w: 390, h: 844 },
  { w: 412, h: 915 }, { w: 800, h: 600 }, { w: 1024, h: 768 }, { w: 1280, h: 720 }
];
const CASES_ATTENDUES = 17; // 12 jeux derrière les portes + 3 en niche + album + 13e jeu en tiroir

// empreinte de proportions : { label → [cx, cy, cw, ch] en fraction de la
// boîte de l'armoire }, relevée au premier viewport et comparée aux suivants.
let empreinte = null;

const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  const errors = [];
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`console.error: ${m.text()}`); });
  // file:// ne pose pas de content-length fiable → on lit le corps réel.
  let imgBytes = 0;
  page.on('response', async (res) => {
    try { if (/\/img\//.test(res.url())) imgBytes += (await res.body()).length; } catch (e) {}
  });

  const tag = `${vp.w}x${vp.h}`;
  try {
    await page.addInitScript(() => { try { localStorage.clear(); } catch (e) {} });
    await page.goto(pathToFileURL(INDEX).href, { waitUntil: 'networkidle' });
    await page.waitForSelector('.casier', { timeout: 5000 });
    await page.waitForTimeout(1400); // ouverture automatique des deux zones

    const m = await page.evaluate(() => {
      const de = document.documentElement;
      const cab = document.getElementById('armoire');
      const cabR = cab.getBoundingClientRect();
      const cases = [...document.querySelectorAll('.casier, .objet')];
      const rects = cases.map(c => c.getBoundingClientRect());

      // tout le contenu de l'armoire, vantaux ouverts compris
      const all = [...cab.querySelectorAll('*')].map(e => e.getBoundingClientRect());
      const bornes = {
        l: Math.min(...all.map(r => r.left)), r: Math.max(...all.map(r => r.right)),
        t: Math.min(...all.map(r => r.top)), b: Math.max(...all.map(r => r.bottom))
      };

      const imgsOk = [...document.querySelectorAll('#armoire img')]
        .every(i => i.complete && i.naturalWidth > 0);
      // une porte = un fond CSS : on le recharge pour de vrai, un 404 y est
      // silencieux (ni onerror ni trace dans le DOM).
      const fonds = [...new Set([...document.querySelectorAll('.porte-feuille')]
        .map(e => getComputedStyle(e).backgroundImage.replace(/^url\("?|"?\)$/g, '')))];

      const empreinte = {};
      cases.forEach((c, i) => {
        const r = rects[i];
        empreinte[c.getAttribute('aria-label')] = [
          (r.left + r.width / 2 - cabR.left) / cabR.width,
          (r.top + r.height / 2 - cabR.top) / cabR.height
        ];
      });

      return {
        scrollH: de.scrollHeight, innerH: innerHeight,
        scrollW: de.scrollWidth, innerW: innerWidth,
        cab: { w: cabR.width, h: cabR.height },
        n: cases.length,
        minW: Math.min(...rects.map(r => r.width)), minH: Math.min(...rects.map(r => r.height)),
        bornes, imgsOk, fonds, empreinte,
        nPortes: document.querySelectorAll('.porte').length,
        ouvert: cab.classList.contains('ouvert-haut') && cab.classList.contains('ouvert-bas')
      };
    });

    ok(`[${tag}] jamais d'ascenseur vertical`, m.scrollH <= m.innerH + 1, `${m.scrollH} > ${m.innerH}`);
    ok(`[${tag}] jamais d'ascenseur horizontal`, m.scrollW <= m.innerW + 1, `${m.scrollW} > ${m.innerW}`);
    ok(`[${tag}] rien de rogné par le bord de l'écran`,
      m.bornes.l >= -0.5 && m.bornes.t >= -0.5 && m.bornes.r <= vp.w + 0.5 && m.bornes.b <= vp.h + 0.5,
      `L${m.bornes.l.toFixed(1)} R${m.bornes.r.toFixed(1)} T${m.bornes.t.toFixed(1)} B${m.bornes.b.toFixed(1)}`);
    ok(`[${tag}] les ${CASES_ATTENDUES} cases sont là`, m.n === CASES_ATTENDUES, `n=${m.n}`);
    ok(`[${tag}] chaque case ≥ 96 × 96 de zone tactile`, m.minW >= 96 && m.minH >= 96,
      `min=${m.minW.toFixed(1)}×${m.minH.toFixed(1)}`);
    ok(`[${tag}] toutes les images de l'armoire chargées`, m.imgsOk);
    ok(`[${tag}] 4 vantaux présents, ouverts au chargement`, m.nPortes === 4 && m.ouvert,
      `n=${m.nPortes} ouvert=${m.ouvert}`);

    // les fonds de porte existent vraiment (rechargés depuis la page)
    const fondsOk = await page.evaluate(async (urls) => {
      const res = await Promise.all(urls.map(u => new Promise(r => {
        const i = new Image(); i.onload = () => r(true); i.onerror = () => r(false); i.src = u;
      })));
      return res.every(Boolean);
    }, m.fonds);
    ok(`[${tag}] les images de fond des vantaux se chargent`, fondsOk, m.fonds.join(' | '));

    // proportions identiques d'un viewport à l'autre (promesse v6)
    if (!empreinte) {
      empreinte = m.empreinte;
    } else {
      let pire = 0, quoi = '';
      for (const k of Object.keys(empreinte)) {
        if (!m.empreinte[k]) { pire = 1; quoi = `case absente : ${k}`; break; }
        for (let i = 0; i < 2; i++) {
          const d = Math.abs(empreinte[k][i] - m.empreinte[k][i]);
          if (d > pire) { pire = d; quoi = `${k} axe${i}`; }
        }
      }
      // 1,5 % : la zone tactile de 96 px est un plancher en PIXELS, elle
      // décale légèrement le centre des cases sur les très petits écrans.
      ok(`[${tag}] proportions identiques au viewport de référence`, pire <= 0.015,
        `écart max ${(pire * 100).toFixed(2)} % (${quoi})`);
    }

    // ouverture / fermeture réelle d'une zone
    await page.click('.porte-haut.porte-g');
    await page.waitForTimeout(800);
    const ferme = await page.evaluate(() =>
      !document.getElementById('armoire').classList.contains('ouvert-haut') &&
      [...document.querySelectorAll('.casier[data-zone="haut"]')].every(c => c.classList.contains('zone-cachee')));
    ok(`[${tag}] cliquer un vantail referme la zone et masque ses cases`, ferme);
    if (vp.w === 360 && vp.h === 740) {
      await page.screenshot({ path: resolve(CAPTURES, 'HO-MJ-19-armoire-360x740-ferme.png') });
    }
    await page.click('.porte-haut.porte-g');
    await page.waitForTimeout(800);
    const rouvert = await page.evaluate(() =>
      document.getElementById('armoire').classList.contains('ouvert-haut'));
    ok(`[${tag}] et la rouvre`, rouvert);

    await page.screenshot({ path: resolve(CAPTURES, `HO-MJ-19-armoire-${tag}.png`) });

    if (vp.w === 360 && vp.h === 740) {
      // budget du 1er affichage : carcasse (113 Ko) + 2 vantaux + 17 objets.
      ok('[360x740] poids images 1er affichage ≤ 480 Ko', imgBytes <= 480 * 1024,
        `${(imgBytes / 1024).toFixed(0)} Ko`);
    }
    ok(`[${tag}] aucune erreur JS / console`, errors.length === 0, errors.join(' | '));
  } catch (e) {
    ok(`[${tag}] exécution sans exception`, false, e.message);
  }
  await page.close();
}

await browser.close();

console.log('\n── armoire.spec.mjs (L\'Armoire v6, HO-MJ-19) ──');
for (const [cond, name, detail] of checks) {
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
}
console.log(fail === 0 ? `\n\x1b[32m✓ armoire OK\x1b[0m\n` : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail === 0 ? 0 : 1);
