// Génère une image dans ChatGPT (Brave debug 9222) et récupère SEULEMENT la nouvelle image.
// Usage: node gpt-gen.mjs "<prompt>" <out.png> [--new] [--url <chatgpt-url>]
//   --new       = ouvre un nouveau chat (sinon reste dans le chat courant → série cohérente)
//   --url <u>   = navigue d'abord vers cette URL (ex. un GPTs custom) puis envoie le prompt.
//                 Démarre une conversation fraîche avec ce GPTs. Supplante --new.
//                 GPTs « Dinosaure XXL » (pour les fiches app) :
//                 https://chatgpt.com/g/g-6a2f05b2de7881919e856111c53cece2-dinosaure-xxl-encyclopedie-illustree
// Prérequis: Brave lancé via launch-brave.ps1, et logué à ChatGPT.
import pw from 'file:///C:/ProjetsPerso/Claude_Projects/MaxPlay/studio/minijeux/tests/node_modules/playwright/index.js';
import { writeFileSync } from 'node:fs';
const { chromium } = pw;

const PROMPT = process.argv[2];
const OUT = process.argv[3];
const NEW = process.argv.includes('--new');
const urlIdx = process.argv.indexOf('--url');
const URL = urlIdx > -1 ? process.argv[urlIdx + 1] : null;
if (!PROMPT || !OUT) {
  console.log('usage: node gpt-gen.mjs "<prompt>" <out.png> [--new] [--url <chatgpt-url>]');
  process.exit(1);
}

const CDP = 'http://127.0.0.1:9222';
const ESTUARY = 'img[src*="backend-api/estuary/content"]';

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0];
let page = ctx.pages().find(p => p.url().includes('chatgpt.com'));
if (!page) { page = await ctx.newPage(); await page.goto('https://chatgpt.com/'); }
await page.bringToFront();

if (await page.getByRole('button', { name: /se connecter|log in/i }).count() > 0) {
  console.log('✗ PAS LOGUÉ — logue-toi dans la fenêtre Brave puis relance.');
  await browser.close(); process.exit(2);
}

// Bannière cookies éventuelle
try { await page.getByRole('button', { name: /tout accepter|accept all|refuser/i }).first().click({ timeout: 1500 }); } catch {}

if (URL) {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500); // laisser charger le GPTs
  console.log('✓ GPTs ciblé :', URL.slice(0, 70));
} else if (NEW) {
  await page.keyboard.press('Control+Shift+O'); // nouveau chat (raccourci natif)
  await page.waitForTimeout(1500);
  console.log('✓ nouveau chat');
}

const before = await page.locator(ESTUARY).count();

const box = page.locator('#prompt-textarea, div[contenteditable="true"]').first();
await box.click();
await box.fill(PROMPT);
await page.waitForTimeout(400);
await page.keyboard.press('Enter');
console.log('✓ prompt envoyé, attente image…');

const start = Date.now();
let url = null;
while (Date.now() - start < 200000) {
  if (await page.locator(ESTUARY).count() > before) {
    await page.waitForTimeout(3000); // laisser finir le rendu HD
    url = await page.locator(ESTUARY).last().getAttribute('src');
    if (url) break;
  }
  await page.waitForTimeout(2000);
  process.stdout.write('.');
}
console.log('');
if (!url) {
  console.log('✗ timeout (200s sans nouvelle image)');
  await page.screenshot({ path: OUT.replace(/\.png$/, '-timeout.png') });
  await browser.close(); process.exit(3);
}

const buf = await page.evaluate(async (u) =>
  Array.from(new Uint8Array(await (await fetch(u)).arrayBuffer())), url);
writeFileSync(OUT, Buffer.from(buf));
console.log('✓ →', OUT, `(${buf.length} o)`);
await browser.close(); // ne ferme PAS Brave, juste la connexion CDP
