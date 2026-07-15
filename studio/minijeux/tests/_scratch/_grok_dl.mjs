import { chromium } from 'playwright';
const b = await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx = b.contexts()[0];
const p = ctx.pages().find(pg => pg.url().includes('grok.com'));
await p.bringToFront();
// survoler l'image generee pour reveler la barre d'actions
const img = p.locator('img[src*="/generated/"]').first();
await img.scrollIntoViewIfNeeded();
await img.hover();
await p.waitForTimeout(600);
const btn = p.getByRole('button', { name: /télécharger|download/i }).first();
const [dl] = await Promise.all([
  p.waitForEvent('download', { timeout: 20000 }),
  btn.click({ force:true }),
]);
await dl.saveAs('C:/tmp/tritri_joyeux_full.png');
console.log('DL ->', await dl.suggestedFilename());
await b.close();
