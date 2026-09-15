// armoire.spec.mjs — L'Armoire v2, trois zones (HO-MJ-14, remplace la v1
// à zone unique de HO-MJ-13). Spec AUTONOME (comme mur-nid.spec.mjs) : pas de
// site/armoire.html, donc pas de `npm run mj:test armoire` (run.mjs cherche
// site/<mj>.html) — lancer directement :
//   node studio/minijeux/tests/armoire.spec.mjs
//
// Vérifie, pour CHAQUE viewport du brief : jamais d'ascenseur, boutons
// vitrine+casiers ≥ 80×80, portes ouvertes entièrement à l'écran, avatar
// visible ≥ 60 %, marges armoire 2-8 % (gauche/droite/bas), images
// chargées, poids ≤ 260 Ko au premier affichage 360×740.
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

// Viewports du brief : portrait/paysage, 320 → 1280, + 390×844 (iPhone, HO-MJ-14).
const VIEWPORTS = [
  { w: 360, h: 740 }, { w: 360, h: 640 }, { w: 320, h: 568 }, { w: 390, h: 844 },
  { w: 412, h: 915 }, { w: 800, h: 600 }, { w: 1024, h: 768 }, { w: 1280, h: 720 }
];
const EXPECTED_COLS = { 360: 3, 320: 3, 390: 3, 412: 3, 800: 4, 1024: 5, 1280: 6 };

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
      const btnRects = [...document.querySelectorAll('.casier, .objet')].map(c => c.getBoundingClientRect());
      const imgsOk = [...document.querySelectorAll('.casier .obj, .objet .obj')].every(i => i.complete && i.naturalWidth > 0);

      const armoireR = document.querySelector('.armoire').getBoundingClientRect();
      const avatarR = document.getElementById('profil-avatar').getBoundingClientRect();
      const frontonR = document.querySelector('.ar-fronton').getBoundingClientRect();
      // fraction de l'avatar NON recouverte par le fronton (intersection verticale, même x)
      const interTop = Math.max(avatarR.top, frontonR.top);
      const interBottom = Math.min(avatarR.bottom, frontonR.bottom);
      const interH = Math.max(0, interBottom - interTop);
      const avatarVisibleFrac = avatarR.height > 0 ? 1 - (interH / avatarR.height) : 0;

      const portes = [...document.querySelectorAll('.ar-porte')].map(p => p.getBoundingClientRect());

      return {
        scrollH: de.scrollHeight, innerH: innerHeight,
        scrollW: de.scrollWidth, innerW: innerWidth,
        cols, count: btnRects.length,
        minW: Math.min(...btnRects.map(r => r.width)), minH: Math.min(...btnRects.map(r => r.height)),
        imgsOk,
        armoireLeft: armoireR.left, armoireRight: innerWidth - armoireR.right, armoireBottom: innerHeight - armoireR.bottom,
        avatarVisibleFrac,
        portes: portes.map(p => ({ left: p.left, right: p.right, top: p.top, bottom: p.bottom }))
      };
    });

    ok(`[${tag}] jamais d'ascenseur vertical`, metrics.scrollH <= metrics.innerH + 1, `scrollH=${metrics.scrollH} innerH=${metrics.innerH}`);
    ok(`[${tag}] jamais d'ascenseur horizontal`, metrics.scrollW <= metrics.innerW + 1, `scrollW=${metrics.scrollW} innerW=${metrics.innerW}`);
    ok(`[${tag}] au moins 1 casier visible`, metrics.count > 0);
    ok(`[${tag}] chaque bouton vitrine+casier ≥ 80×80`, metrics.minW >= 80 && metrics.minH >= 80, `minW=${metrics.minW.toFixed(1)} minH=${metrics.minH.toFixed(1)}`);
    if (EXPECTED_COLS[vp.w] != null) {
      ok(`[${tag}] --cols = ${EXPECTED_COLS[vp.w]}`, metrics.cols === String(EXPECTED_COLS[vp.w]), `cols=${metrics.cols}`);
    }
    ok(`[${tag}] toutes les images de casier/vitrine chargées (naturalWidth>0)`, metrics.imgsOk);

    // marges armoire (gauche/droite/bas) : 2-8 % de la largeur (brief HO-MJ-14)
    const wl = metrics.armoireLeft / vp.w * 100, wr = metrics.armoireRight / vp.w * 100, wb = metrics.armoireBottom / vp.w * 100;
    ok(`[${tag}] marge gauche 2-8 %`, wl >= 2 && wl <= 8, `${wl.toFixed(1)}%`);
    ok(`[${tag}] marge droite 2-8 %`, wr >= 2 && wr <= 8, `${wr.toFixed(1)}%`);
    ok(`[${tag}] marge bas 2-8 %`, wb >= 2 && wb <= 8, `${wb.toFixed(1)}%`);

    // avatar mordu ~15 % par le fronton, visible ≥ 60 %
    ok(`[${tag}] avatar visible ≥ 60 %`, metrics.avatarVisibleFrac >= 0.6, `${(metrics.avatarVisibleFrac * 100).toFixed(0)}%`);

    // portes ouvertes entièrement dans l'écran
    ok(`[${tag}] 4 portes ouvertes présentes`, metrics.portes.length === 4, `n=${metrics.portes.length}`);
    const portesInScreen = metrics.portes.every(p => p.left >= -0.5 && p.right <= vp.w + 0.5 && p.top >= -0.5 && p.bottom <= vp.h + 0.5);
    ok(`[${tag}] portes ouvertes entièrement à l'écran`, portesInScreen, JSON.stringify(metrics.portes.map(p => ({ l: +p.left.toFixed(1), r: +p.right.toFixed(1) }))));

    await page.screenshot({ path: resolve(CAPTURES, `HO-MJ-14-${tag}.png`) });

    if (vp.w === 360 && vp.h === 740) {
      // Poids réseau du 1er affichage — porte #4 du brief : ≤ 260 Ko d'images.
      ok('[360x740] poids images 1er affichage ≤ 260 Ko', imgBytes <= 260 * 1024, `${(imgBytes / 1024).toFixed(0)} Ko`);
    }

    ok(`[${tag}] aucune erreur JS / console (smoke)`, errors.length === 0, errors.join(' | '));
  } catch (e) {
    ok(`[${tag}] exécution sans exception`, false, e.message);
  }
  await page.close();
}

await browser.close();

console.log('\n── armoire.spec.mjs (L\'Armoire v2, HO-MJ-14) ──');
for (const [cond, name, detail] of checks)
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
console.log(fail === 0 ? `\n\x1b[32m✓ armoire OK\x1b[0m\n` : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail === 0 ? 0 : 1);
