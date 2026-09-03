// Génère une image dino dans le PROJET Grok "Dinosaures" (Brave debug 9222) et récupère la nouvelle image.
// Plan B quand ChatGPT est en limite de génération.
// Usage: node grok-gen-dino.mjs "<prompt>" <out.png> [--new]
//   --new = ouvre un nouveau chat dans le projet (sinon reste dans le chat courant Grok).
//
// Détecte : pas logué (exit 2), limite/crédits (exit 5), timeout (exit 3).
import pw from 'file:///C:/ProjetsPerso/Claude_Projects/MaxPlay/studio/minijeux/tests/node_modules/playwright/index.js';
import { writeFileSync } from 'node:fs';
const { chromium } = pw;

const PROMPT = process.argv[2];
const OUT = process.argv[3];
const NEW = process.argv.includes('--new');
if (!PROMPT || !OUT) { console.log('usage: node grok-gen-dino.mjs "<prompt>" <out.png> [--new]'); process.exit(1); }

const CDP = 'http://127.0.0.1:9222';
const PROJECT = 'https://grok.com/project/89187fb9-a866-4373-82c4-cd136bb6905c?tab=conversations';
// Grok sert les images GÉNÉRÉES sur assets.grok.com/users/.../generated/... (≠ profile-picture).
const IMG_SEL = 'img[src*="assets.grok.com"][src*="/generated/"]';
const LIMIT_RE = /limite|plus de crédit|réessayez plus tard|try again later|rate limit|usage limit|reached your limit/i;

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0];
let page = ctx.pages().find(p => p.url().includes('grok.com'));
if (!page) { page = await ctx.newPage(); await page.goto(PROJECT, { waitUntil: 'domcontentloaded' }); }
await page.bringToFront();

if (await page.getByRole('button', { name: /sign in|se connecter|log in/i }).count() > 0) {
  console.log('✗ PAS LOGUÉ à Grok — logue-toi dans Brave puis relance.');
  await browser.close(); process.exit(2);
}

if (NEW || !page.url().includes('/project/')) {
  await page.goto(PROJECT, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  console.log('✓ projet Grok ciblé (nouveau chat)');
}

const beforeUrls = await page.locator(IMG_SEL).evaluateAll(els => els.map(e => e.getAttribute('src')));

const box = page.locator('textarea, div[contenteditable="true"]').first();
await box.click();
await box.fill(PROMPT);
await page.waitForTimeout(400);
await page.keyboard.press('Enter');
console.log('✓ prompt envoyé à Grok, attente image…');

const start = Date.now();
let url = null;
while (Date.now() - start < 240000) {
  const bodyTxt = await page.evaluate(() => document.body.innerText).catch(() => '');
  if (LIMIT_RE.test(bodyTxt)) { console.log('\n⛔ LIMITE/CRÉDITS Grok. ARRÊT.'); await browser.close(); process.exit(5); }
  const cur = await page.locator(IMG_SEL).evaluateAll(els => els.map(e => e.getAttribute('src')));
  const fresh = cur.find(u => u && !beforeUrls.includes(u));
  if (fresh) { await page.waitForTimeout(3000); const c2 = await page.locator(IMG_SEL).evaluateAll(els => els.map(e => e.getAttribute('src'))); url = c2.find(u => u && !beforeUrls.includes(u)) || fresh; break; }
  await page.waitForTimeout(2000); process.stdout.write('.');
}
console.log('');
if (!url) { console.log('✗ timeout (240s sans nouvelle image Grok)'); await page.screenshot({ path: OUT.replace(/\.png$/, '-timeout.png') }); await browser.close(); process.exit(3); }

// assets.grok.com renvoie 403 sur un fetch() page (CORS) → utiliser page.request.get (porte les cookies).
const resp = await page.request.get(url);
if (resp.status() !== 200) { console.log('✗ téléchargement image échec status', resp.status()); await browser.close(); process.exit(3); }
const body = await resp.body();
writeFileSync(OUT, body);
console.log('✓ →', OUT, `(${body.length} o)`);
await browser.close();
