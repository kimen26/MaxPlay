// Screenshot utilitaire (jetable) : node _shot.mjs <fichier.html> <out.png>
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const file = process.argv[2];
const out = process.argv[3] || 'shot.png';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 430, height: 900 } });
const errs = [];
p.on('pageerror', e => errs.push(e.message));
p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await p.goto(pathToFileURL(resolve(file)).href, { waitUntil: 'networkidle' });
await p.waitForTimeout(900);
await p.screenshot({ path: resolve(out), fullPage: true });
await b.close();
console.log('errs:', errs.length ? errs.join(' | ') : 'none');
console.log('saved', resolve(out));
