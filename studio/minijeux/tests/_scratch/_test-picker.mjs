// Test rapide picker v2 : grille triée, panneau couleurs, preset, validation, celebrate.
import { chromium } from 'playwright';
const PORT = 8137;
const b = await chromium.launch();
const p = await b.newPage();
const errs = [];
p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
p.on('pageerror', e => errs.push(String(e)));

await p.goto(`http://127.0.0.1:${PORT}/index3.html`, { waitUntil: 'load' });
await p.waitForTimeout(1500);

// 1. badge présent
const badge = p.locator('#av-badge');
if (!await badge.count()) { console.log('FAIL: pas de badge'); process.exit(1); }

// 2. ouvrir modale, vérifier tri par nom
await badge.click();
await p.waitForTimeout(300);
const names = await p.$$eval('#av-grid .av-cell .an', els => els.map(e => e.textContent));
const sorted = names.slice().sort((a, b) => a.localeCompare(b, 'fr'));
console.log('tri par nom:', JSON.stringify(names) === JSON.stringify(sorted) ? 'OK' : 'KO ' + names.join(','));

// 3. choisir une créature -> panneau couleurs
await p.locator('#av-grid .av-cell').first().click();
await p.waitForTimeout(1200);
const colVisible = await p.locator('#av-col.show').count();
const swCount = await p.locator('#av-sw .av-chip').count();
console.log('panneau couleurs:', colVisible ? 'OK' : 'KO', '| pastilles:', swCount);

// 4. preset bleu puis valider
await p.locator('.av-p').first().click();
await p.waitForTimeout(300);
await p.locator('#av-ok').click();
await p.waitForTimeout(1500);

// 5. badge recoloré = dataURL + cfg stockée
const src = await p.$eval('#av-badge img', i => i.src.slice(0, 30)).catch(() => null);
const cfg = await p.evaluate(() => localStorage.getItem('maxplay_avatar_cfg'));
const id = await p.evaluate(() => localStorage.getItem('maxplay_avatar'));
console.log('badge src:', src, '| id:', id, '| cfg:', cfg ? cfg.slice(0, 80) : null);

// 6. particules celebrate déclenchées à la validation ? re-test via event
await p.evaluate(() => window.dispatchEvent(new CustomEvent('maxplay:win', { detail: { kind: 'coeur' } })));
await p.waitForTimeout(400);
const parts = await p.locator('.av-part').count();
console.log('particules celebrate:', parts > 0 ? 'OK (' + parts + ')' : 'KO');

// 7. reload -> badge toujours recoloré (persistance)
await p.reload({ waitUntil: 'load' });
await p.waitForTimeout(2000);
const src2 = await p.$eval('#av-badge img', i => i.src.slice(0, 30)).catch(() => null);
console.log('persistance après reload:', src2 && src2.startsWith('data:') ? 'OK' : 'KO (' + src2 + ')');

console.log('erreurs console:', errs.length ? errs.join(' | ') : 'aucune');
await b.close();
