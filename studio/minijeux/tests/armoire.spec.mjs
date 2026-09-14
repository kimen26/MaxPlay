// armoire.spec.mjs — L'Armoire, nouvel accueil enfant (HO-MJ-13, remplace
// La Vallée). Spec AUTONOME (comme mur-nid.spec.mjs) : pas de site/armoire.html,
// donc pas de `npm run mj:test armoire` (run.mjs cherche site/<mj>.html) —
// lancer directement :
//   node studio/minijeux/tests/armoire.spec.mjs
//
// Vérifie, pour CHAQUE viewport du brief : jamais d'ascenseur, casiers
// ≥ 96×96, --cols attendu, images chargées, poids réseau ≤ 600 Ko, capture.
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

// Viewports du brief : portrait/paysage, 320 → 1280.
const VIEWPORTS = [
  { w: 360, h: 740 }, { w: 360, h: 640 }, { w: 320, h: 568 },
  { w: 412, h: 915 }, { w: 800, h: 600 }, { w: 1024, h: 768 }, { w: 1280, h: 720 }
];
const EXPECTED_COLS = { 360: 3, 320: 3, 412: 3, 800: 4, 1024: 5, 1280: 6 };

const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  const errors = [];
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`console.error: ${m.text()}`); });

  // file:// ne pose pas de content-length fiable → on lit le corps réel de
  // la réponse (fonctionne aussi bien en local qu'en prod https).
  let imgBytes = 0;
  page.on('response', async (res) => {
    try {
      const url = res.url();
      if (!/\/img\//.test(url)) return;
      const buf = await res.body();
      imgBytes += buf.length;
    } catch (e) {}
  });

  const tag = `${vp.w}x${vp.h}`;
  try {
    await page.addInitScript(() => { try { localStorage.clear(); } catch (e) {} });
    await page.goto(pathToFileURL(INDEX).href, { waitUntil: 'networkidle' });
    await page.waitForSelector('.casier', { timeout: 5000 });

    const metrics = await page.evaluate(() => {
      const de = document.documentElement;
      const cols = getComputedStyle(document.getElementById('casiers')).getPropertyValue('--cols').trim();
      const rects = [...document.querySelectorAll('.casier')].map(c => c.getBoundingClientRect());
      const imgsOk = [...document.querySelectorAll('.casier .obj')].every(i => i.complete && i.naturalWidth > 0);
      return {
        scrollH: de.scrollHeight, innerH: innerHeight,
        scrollW: de.scrollWidth, innerW: innerWidth,
        cols, count: rects.length,
        minW: Math.min(...rects.map(r => r.width)), minH: Math.min(...rects.map(r => r.height)),
        imgsOk
      };
    });

    ok(`[${tag}] jamais d'ascenseur vertical`, metrics.scrollH <= metrics.innerH + 1, `scrollH=${metrics.scrollH} innerH=${metrics.innerH}`);
    ok(`[${tag}] jamais d'ascenseur horizontal`, metrics.scrollW <= metrics.innerW + 1, `scrollW=${metrics.scrollW} innerW=${metrics.innerW}`);
    ok(`[${tag}] au moins 1 casier visible`, metrics.count > 0);
    ok(`[${tag}] chaque casier ≥ 96×96`, metrics.minW >= 96 && metrics.minH >= 96, `minW=${metrics.minW.toFixed(1)} minH=${metrics.minH.toFixed(1)}`);
    if (EXPECTED_COLS[vp.w] != null) {
      ok(`[${tag}] --cols = ${EXPECTED_COLS[vp.w]}`, metrics.cols === String(EXPECTED_COLS[vp.w]), `cols=${metrics.cols}`);
    }
    ok(`[${tag}] toutes les images de casier chargées (naturalWidth>0)`, metrics.imgsOk);

    await page.screenshot({ path: resolve(CAPTURES, `HO-MJ-13-${tag}.png`) });

    if (vp.w === 360 && vp.h === 740) {
      // Poids réseau du 1er affichage — porte #5 du brief : ≤ 600 Ko d'images.
      ok('[360x740] poids images 1er affichage ≤ 600 Ko', imgBytes <= 600 * 1024, `${(imgBytes / 1024).toFixed(0)} Ko`);
    }

    ok(`[${tag}] aucune erreur JS / console (smoke)`, errors.length === 0, errors.join(' | '));
  } catch (e) {
    ok(`[${tag}] exécution sans exception`, false, e.message);
  }
  await page.close();
}

await browser.close();

console.log('\n── armoire.spec.mjs (L\'Armoire, HO-MJ-13) ──');
for (const [cond, name, detail] of checks)
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
console.log(fail === 0 ? `\n\x1b[32m✓ armoire OK\x1b[0m\n` : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail === 0 ? 0 : 1);
