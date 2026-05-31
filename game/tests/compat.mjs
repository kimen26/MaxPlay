// compat.mjs — Matrice de compatibilité d'affichage MaxPlay (extension EP-038)
// But : détecter SEUL les bugs d'affichage AVANT Papa Yann, sur plusieurs
//       moteurs (Chromium=Chrome/Edge, WebKit=Safari/iPhone, Firefox) et
//       plusieurs tailles d'écran (petit Android → desktop).
//
// Usage : node compat.mjs                → toutes les cibles, tous moteurs dispo
//         node compat.mjs mj-06 index    → seulement ces cibles
//
// Lit game/web/js/catalog.js (source de vérité). Un moteur non installé est
// sauté proprement → `npx playwright install webkit firefox` pour l'ajouter.
//
// Détection : erreurs JS/console · débordement horizontal (scroll OU élément
// hors écran, même clippé par overflow:hidden) · screenshot de chaque combo.
// Un jeu `orientation:'landscape'` testé en viewport portrait n'est PAS compté
// comme bug (c'est l'overlay "tourne ta tablette" — brique D — qui gérera).

import { chromium, firefox, webkit } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const WEB = resolve(__dir, '..', 'web');

// ── Charger le catalogue sans navigateur (sandbox) ────────────────────────
function loadCatalog() {
  const src = readFileSync(resolve(WEB, 'js', 'catalog.js'), 'utf8');
  const win = {};
  new Function('window', src)(win);
  return win.MAXPLAY_CATALOG || [];
}

const filters = process.argv.slice(2);
const catalog = loadCatalog();
let targets = [
  { id: 'index', url: 'index.html', orientation: 'any' }, // la coque
  ...catalog.map(c => ({ id: c.id, url: c.url, orientation: c.orientation })),
];
if (filters.length) targets = targets.filter(t => filters.includes(t.id));

// ── Parc d'appareils représentatif (moteur + viewport) ────────────────────
const ENGINES = { chromium, firefox, webkit };
const DEVICES = [
  { engine: 'chromium', name: 'Android-petit',   w: 360,  h: 640  },
  { engine: 'chromium', name: 'Android',         w: 412,  h: 915  },
  { engine: 'chromium', name: 'Desktop-Chrome',  w: 1280, h: 800  },
  { engine: 'webkit',   name: 'iPhone-SE',       w: 375,  h: 667  },
  { engine: 'webkit',   name: 'iPhone-14',       w: 390,  h: 844  },
  { engine: 'webkit',   name: 'iPad-portrait',   w: 768,  h: 1024 },
  { engine: 'webkit',   name: 'iPad-paysage',    w: 1024, h: 768  },
  { engine: 'firefox',  name: 'Desktop-Firefox', w: 1280, h: 800  },
];

const artifacts = resolve(__dir, '.artifacts', 'compat');
mkdirSync(artifacts, { recursive: true });
const C = { g: '\x1b[32m', r: '\x1b[31m', y: '\x1b[33m', d: '\x1b[2m', x: '\x1b[0m' };

// ── Détection des débordements sur une page chargée ───────────────────────
async function inspect(page) {
  return page.evaluate(() => {
    const vw = window.innerWidth, vh = window.innerHeight;
    const hoverflow = document.documentElement.scrollWidth - vw; // >0 = scroll horizontal
    let worst = null, worstX = 0;
    for (const el of document.body.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const over = r.right - vw;                                  // hors écran à droite (même clippé)
      if (over > worstX) {
        worstX = over;
        const cls = (typeof el.className === 'string' && el.className) ? '.' + el.className.split(' ')[0] : '';
        worst = el.tagName.toLowerCase() + cls;
      }
    }
    return { vw, vh, hoverflow, worst, worstX: Math.round(worstX) };
  });
}

// ── Run ───────────────────────────────────────────────────────────────────
const results = [];
let hardFail = 0;

for (const [engineName, launcher] of Object.entries(ENGINES)) {
  const devices = DEVICES.filter(d => d.engine === engineName);
  if (!devices.length) continue;
  let browser;
  try { browser = await launcher.launch(); }
  catch {
    console.log(`${C.y}⚠ moteur ${engineName} non installé — sauté${C.x} ${C.d}(npx playwright install ${engineName})${C.x}`);
    continue;
  }
  for (const dev of devices) {
    const ctx = await browser.newContext({ viewport: { width: dev.w, height: dev.h } });
    const page = await ctx.newPage();
    for (const t of targets) {
      const errors = [];
      page.removeAllListeners('pageerror'); page.removeAllListeners('console');
      page.on('pageerror', e => errors.push(`JS:${e.message}`));
      page.on('console', m => { if (m.type() === 'error') errors.push(`console:${m.text()}`); });

      const file = pathToFileURL(resolve(WEB, t.url.split('?')[0])).href;
      let info = null, navErr = null;
      try {
        await page.goto(file, { waitUntil: 'domcontentloaded', timeout: 12000 });
        await page.waitForTimeout(500);
        info = await inspect(page);
      } catch (e) { navErr = e.message; }
      await page.screenshot({ path: resolve(artifacts, `${t.id}__${dev.name}.png`) }).catch(() => {});

      const portraitMode = info && info.vh > info.vw;
      const landscapeInPortrait = t.orientation === 'landscape' && portraitMode; // attendu → overlay D
      const overflow = !!info && (info.hoverflow > 2 || info.worstX > 4);
      const problem = errors.length > 0 || !!navErr || (overflow && !landscapeInPortrait);
      if (problem) hardFail++;
      results.push({ engine: engineName, dev: dev.name, id: t.id, overflow, landscapeInPortrait, errors, navErr, info });
    }
    await ctx.close();
  }
  await browser.close();
}

// ── Rapport ─────────────────────────────────────────────────────────────
console.log(`\n══ Matrice compatibilité MaxPlay — ${targets.length} cible(s) ══\n`);
for (const r of results) {
  let tag, note = '';
  if (r.navErr) { tag = 'NAV ✗'; note = r.navErr; }
  else if (r.errors.length) { tag = 'JS ✗'; note = r.errors.join(' | '); }
  else if (r.overflow && !r.landscapeInPortrait) { tag = 'DÉBORD'; note = `+${r.info.worstX}px ${r.info.worst || ''}`; }
  else if (r.landscapeInPortrait) { tag = 'rotate?'; note = 'jeu paysage en portrait (overlay D à venir)'; }
  else { tag = 'OK'; }
  const color = tag === 'OK' ? C.g : tag === 'rotate?' ? C.y : C.r;
  console.log(`  ${color}${tag.padEnd(8)}${C.x} ${r.id.padEnd(14)} ${(r.engine + '/' + r.dev).padEnd(22)} ${C.d}${note}${C.x}`);
}
console.log(`\n  screenshots → ${artifacts}`);
console.log(hardFail === 0
  ? `\n${C.g}✓ aucun problème d'affichage détecté${C.x}\n`
  : `\n${C.r}✗ ${hardFail} combo(s) à corriger${C.x}\n`);
process.exit(hardFail === 0 ? 0 : 1);
