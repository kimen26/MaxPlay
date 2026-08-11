// Harnais de test headless mini-jeux MaxPlay — EP-038
// Usage : npm run mj:test mj-21            (teste site/mj-21.html)
//         npm run mj:test mj-21 <fichier>  (teste un fichier précis, ex: preuve rétro)
// But : sortir Papa Yann du rôle de débogueur. Vert = OK, Rouge = bug avant push.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync, existsSync } from 'node:fs';

const __dir = dirname(fileURLToPath(import.meta.url));
const mj = process.argv[2];
if (!mj) { console.error('Usage: npm run mj:test <mj-XX> [fichier.html]'); process.exit(2); }

const htmlPath = process.argv[3]
  ? resolve(process.argv[3])
  : resolve(__dir, '..', '..', '..', 'site', `${mj}.html`);

// Certaines specs sont AUTONOMES (collection, mur-nid, cloud-merge…) : elles
// bâtissent leur propre harnais et n'ont pas de page site/<nom>.html. Les
// passer à ce runner produisait un rouge trompeur (ERR_FILE_NOT_FOUND lu
// comme "jeu cassé"). On oriente au lieu de mentir.
if (!existsSync(htmlPath)) {
  const ownSpec = resolve(__dir, `${mj}.spec.mjs`);
  if (existsSync(ownSpec)) {
    console.error(`\x1b[33m${mj} n'a pas de page site/${mj}.html : c'est une spec AUTONOME.\x1b[0m`);
    console.error(`Lance-la directement :  node studio/minijeux/tests/${mj}.spec.mjs`);
  } else {
    console.error(`\x1b[31mIntrouvable : ${htmlPath}\x1b[0m`);
  }
  process.exit(2);
}

const artifacts = resolve(__dir, '.artifacts');
mkdirSync(artifacts, { recursive: true });

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m';
const errors = [];

// --allow-file-access-from-files + --disable-web-security : en prod (GitHub Pages https),
// HTML + assets sont same-origin donc jamais de canvas taint. En file:// local, Chromium
// traite chaque fichier comme une origine opaque distincte (canvas tainted dès drawImage()
// d'une <img> même voisine) — ces flags répliquent fidèlement le comportement prod pour les
// MJ qui font du canvas+image (ex: mj-32 flood fill coloriage).
const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });
const page = await browser.newPage({ viewport: { width: 480, height: 900 } });

// Smoke : toute erreur JS / console.error = échec immédiat (aurait tué la saga "Object.entries")
// EXCEPTION calibrée 2026-08-10 : les consignes MP3 sounds/voix/phrases/<slug>.mp3
// sont OPTIONNELLES par design (mj-shell.direConsigne retombe sur le TTS navigateur
// si le fichier est absent — comportement voulu, cf. backlog 2026-08-10). Le 404
// navigateur d'une consigne pas encore générée n'est donc PAS un crash : on l'ignore,
// tout le reste (JS, images, css) continue de bloquer.
page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
page.on('console', m => {
  if (m.type() !== 'error') return;
  const loc = m.location();
  if (/Failed to load resource/.test(m.text()) && loc && /sounds\/voix\/phrases\//.test(loc.url || '')) return;
  errors.push(`console.error: ${m.text()}`);
});

let verdict = 0;
const checks = [];
const ok = (name, cond, detail = '') => { checks.push([cond, name, detail]); if (!cond) verdict = 1; };

try {
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
  const spec = await import(pathToFileURL(resolve(__dir, `${mj}.spec.mjs`)).href);
  await spec.run({ page, ok });
} catch (e) {
  errors.push(`exception: ${e.message}`);
  verdict = 1;
}

ok('Aucune erreur JS / console (smoke)', errors.length === 0, errors.join(' | '));

const shot = resolve(artifacts, `${mj}.png`);
await page.screenshot({ path: shot }).catch(() => {});
await browser.close();

console.log(`\n── ${mj} ──`);
for (const [cond, name, detail] of checks)
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
console.log(`  screenshot: ${shot}`);
console.log(verdict === 0 ? `\n\x1b[32m✓ ${mj} OK — push autorisé\x1b[0m\n`
                          : `\n\x1b[31m✗ ${mj} CASSÉ — ne pas pusher, corriger\x1b[0m\n`);
process.exit(verdict);
