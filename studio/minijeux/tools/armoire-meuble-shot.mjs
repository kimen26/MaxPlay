// armoire-meuble-shot.mjs — captures de recette du MEUBLE v8 (HO-MJ-20).
//   node studio/minijeux/tools/armoire-meuble-shot.mjs [dossier-de-sortie]
// Pour chaque viewport : capture ferme + ouvert dans
// docs/handoffs/rapports/captures/HO-MJ-20-<tag>-<etat>.png.
// Et deux planches de comparaison en 360x740 : HO-MJ-20-cmp-ferme.png /
// HO-MJ-20-cmp-ouvert.png = [ref redimensionnee | capture] cote a cote —
// c'est ce que Fable regarde pour juger (brief § 5).
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const __dir = dirname(fileURLToPath(import.meta.url));
const DEV = resolve(__dir, '..', '..', '..', 'site', 'dev-armoire.html');
const REFS = resolve(__dir, '..', 'docs', 'refs', 'armoire');
const OUT = process.argv[2] || resolve(__dir, '..', 'docs', 'handoffs', 'rapports', 'captures');
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { w: 320, h: 568 }, { w: 360, h: 640 }, { w: 360, h: 740 },
  { w: 412, h: 915 }, { w: 800, h: 600 }, { w: 1280, h: 720 }
];

const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  const tag = `${vp.w}x${vp.h}`;

  await page.goto(pathToFileURL(DEV).href + '?etat=ferme', { waitUntil: 'networkidle' });
  await page.screenshot({ path: resolve(OUT, `HO-MJ-20-${tag}-ferme.png`) });

  await page.goto(pathToFileURL(DEV).href + '?etat=ouvert', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await page.screenshot({ path: resolve(OUT, `HO-MJ-20-${tag}-ouvert.png`) });

  console.log(`${tag}` + (errors.length ? `  ERREURS: ${errors.join(' | ')}` : '  ok'));
  await page.close();
}

// ── Planches de comparaison en 360x740 : [ref redimensionnee | capture] ──
// Pas de dépendance npm image dispo (sharp absent) : composition via PIL
// (Python, confirmé disponible dans l'environnement), un script partagé.
const PY = resolve(__dir, 'armoire-meuble-cmp.py');
function planche(refName, capName, outName) {
  execFileSync('python', [PY, resolve(REFS, refName), resolve(OUT, capName), resolve(OUT, outName)], { stdio: 'inherit' });
  console.log('planche →', outName);
}

planche('ref-fermee.png', 'HO-MJ-20-360x740-ferme.png', 'HO-MJ-20-cmp-ferme.png');
planche('ref-ouverte.png', 'HO-MJ-20-360x740-ouvert.png', 'HO-MJ-20-cmp-ouvert.png');

await browser.close();
console.log('captures →', OUT);
