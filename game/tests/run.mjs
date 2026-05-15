// Harnais de test headless mini-jeux MaxPlay — EP-038
// Usage : npm run mj:test mj-21            (teste game/web/mj-21.html)
//         npm run mj:test mj-21 <fichier>  (teste un fichier précis, ex: preuve rétro)
// But : sortir Papa Yann du rôle de débogueur. Vert = OK, Rouge = bug avant push.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dir = dirname(fileURLToPath(import.meta.url));
const mj = process.argv[2];
if (!mj) { console.error('Usage: npm run mj:test <mj-XX> [fichier.html]'); process.exit(2); }

const htmlPath = process.argv[3]
  ? resolve(process.argv[3])
  : resolve(__dir, '..', 'web', `${mj}.html`);

const artifacts = resolve(__dir, '.artifacts');
mkdirSync(artifacts, { recursive: true });

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m';
const errors = [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 480, height: 900 } });

// Smoke : toute erreur JS / console.error = échec immédiat (aurait tué la saga "Object.entries")
page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
page.on('console', m => { if (m.type() === 'error') errors.push(`console.error: ${m.text()}`); });

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
