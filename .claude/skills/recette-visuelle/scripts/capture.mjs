#!/usr/bin/env node
// capture.mjs — capture une page (locale ou en ligne) à plusieurs largeurs,
// exécute des clics dans l'ordre, vérifie l'absence de débordement horizontal/
// vertical, remonte erreurs console et réponses HTTP >= 400.
//
// Usage :
//   node capture.mjs <page> [--width 360x740,320x568] [--dpr 3]
//                     [--click "<sélecteur>"]... [--lang en] [--out <dossier>]
//
// <page> : chemin local (ex. site/index.html) ou URL http(s)://...
//
// Résolution Playwright : ce script vit sous .claude/skills/recette-visuelle/
// et importe 'playwright' — Node remonte l'arbre de node_modules jusqu'à la
// racine du repo (HO-R08 : playwright est une devDependency racine, hoistée),
// aucun chemin relatif à écrire.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { serveLocal } from './lib/serve-local.mjs';

function parseArgs(argv) {
  const out = { clicks: [], widths: [{ w: 360, h: 740 }, { w: 320, h: 568 }], dpr: 1, outDir: 'c:/tmp/recette-visuelle', lang: null, page: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--width') { out.widths = argv[++i].split(',').map((pair) => { const [w, h] = pair.split('x').map(Number); return { w, h }; }); }
    else if (a === '--dpr') { out.dpr = Number(argv[++i]); }
    else if (a === '--click') { out.clicks.push(argv[++i]); }
    else if (a === '--lang') { out.lang = argv[++i]; }
    else if (a === '--out') { out.outDir = argv[++i]; }
    else if (!a.startsWith('--') && !out.page) { out.page = a; }
  }
  return out;
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.page) {
    console.error('Usage: node capture.mjs <page locale ou URL> [--width 360x740,320x568] [--dpr 3] [--click <sel>]... [--lang en] [--out <dossier>]');
    process.exit(2);
  }

  const isRemote = /^https?:\/\//.test(args.page);
  let baseUrl = args.page;
  let closeServer = null;

  if (!isRemote) {
    const local = resolve(args.page);
    const served = await serveLocal(local);
    baseUrl = served.url;
    closeServer = served.close;
  }
  if (args.lang) {
    const sep = baseUrl.includes('?') ? '&' : '?';
    baseUrl = `${baseUrl}${sep}lang=${encodeURIComponent(args.lang)}`;
  }

  mkdirSync(args.outDir, { recursive: true });

  const browser = await chromium.launch();
  const results = [];

  try {
    for (const { w, h } of args.widths) {
      const context = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: args.dpr });
      const page = await context.newPage();

      const consoleErrors = [];
      const badResponses = [];
      page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
      page.on('response', (resp) => { if (resp.status() >= 400) badResponses.push(`${resp.status()} ${resp.url()}`); });
      page.on('pageerror', (err) => consoleErrors.push(`pageerror: ${err.message}`));

      await page.goto(baseUrl, { waitUntil: 'networkidle' });

      for (const selector of args.clicks) {
        await page.click(selector, { timeout: 5000 }).catch((err) => {
          consoleErrors.push(`clic échoué sur "${selector}": ${err.message.split('\n')[0]}`);
        });
        await page.waitForTimeout(150); // laisser une transition CSS courte se jouer
      }

      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        scrollHeight: document.documentElement.scrollHeight,
        innerHeight: window.innerHeight,
      }));

      const fileName = `capture-${w}x${h}${args.dpr > 1 ? `@${args.dpr}x` : ''}${args.lang ? `-${args.lang}` : ''}.png`;
      const filePath = join(args.outDir, fileName);
      await page.screenshot({ path: filePath, fullPage: false });

      const overflowX = overflow.scrollWidth > overflow.innerWidth;
      const overflowY = overflow.scrollHeight > overflow.innerHeight;

      results.push({ w, h, filePath, overflowX, overflowY, overflow, consoleErrors, badResponses });

      await context.close();
    }
  } finally {
    await browser.close();
    if (closeServer) await closeServer();
  }

  console.log(`\nCaptures écrites dans ${args.outDir} :\n`);
  let anyProblem = false;
  for (const r of results) {
    const status = r.overflowX || r.overflowY || r.consoleErrors.length || r.badResponses.length ? 'PROBLEME' : 'OK';
    if (status === 'PROBLEME') anyProblem = true;
    console.log(`[${status}] ${r.w}x${r.h} -> ${r.filePath}`);
    if (r.overflowX) console.log(`  débordement horizontal : scrollWidth=${r.overflow.scrollWidth} > innerWidth=${r.overflow.innerWidth}`);
    if (r.overflowY) console.log(`  débordement vertical   : scrollHeight=${r.overflow.scrollHeight} > innerHeight=${r.overflow.innerHeight}`);
    for (const e of r.consoleErrors) console.log(`  console error: ${e}`);
    for (const b of r.badResponses) console.log(`  réponse >= 400: ${b}`);
  }

  writeFileSync(join(args.outDir, 'capture-report.json'), JSON.stringify(results, null, 2));
  process.exit(anyProblem ? 1 : 0);
}

run().catch((err) => { console.error(err); process.exit(1); });
