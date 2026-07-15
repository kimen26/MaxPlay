import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const PROMPT = process.argv[2], OUT = process.argv[3];
const IMG_SEL = 'img[src*="assets.grok.com"][src*="/generated/"]';
const LIMIT_RE = /plus de crédit|réessayez plus tard|try again later|rate limit|usage limit|reached your limit/i;
const b = await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx = b.contexts()[0];
let page = ctx.pages().find(p => p.url().includes('grok.com'));
if (!page) page = await ctx.newPage();
await page.goto('https://grok.com/', { waitUntil:'domcontentloaded' });
await page.waitForTimeout(2500);
await page.bringToFront();
if (await page.getByRole('button', { name:/sign in|se connecter|log in/i }).count() > 0) {
  console.log('✗ PAS LOGUÉ à Grok'); await b.close(); process.exit(2);
}
const before = await page.locator(IMG_SEL).evaluateAll(e=>e.map(x=>x.getAttribute('src')));
const box = page.locator('textarea, div[contenteditable="true"]').first();
await box.click(); await box.fill(PROMPT); await page.waitForTimeout(400);
await page.keyboard.press('Enter');
console.log('✓ prompt envoyé à Grok, attente image…');
const start = Date.now(); let url=null;
while (Date.now()-start < 175000) {
  const t = await page.evaluate(()=>document.body.innerText).catch(()=> '');
  if (LIMIT_RE.test(t)) { console.log('\n⛔ LIMITE Grok'); await b.close(); process.exit(5); }
  const cur = await page.locator(IMG_SEL).evaluateAll(e=>e.map(x=>x.getAttribute('src')));
  const fresh = cur.find(u=>u && !before.includes(u));
  if (fresh) { await page.waitForTimeout(3000); url=fresh; break; }
  process.stdout.write('.'); await page.waitForTimeout(2500);
}
console.log('');
if (!url) { console.log('✗ timeout Grok'); await b.close(); process.exit(3); }
const r = await page.request.get(url);
writeFileSync(OUT, await r.body());
console.log('✓ →', OUT);
await b.close();
