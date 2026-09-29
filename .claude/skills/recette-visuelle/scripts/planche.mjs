#!/usr/bin/env node
// planche.mjs — assemble 2 ou 3 images côte à côte (référence | avant | après,
// ou avant | après seul) en un seul PNG, pour la relecture "ce qui DIFFÈRE"
// (L-145). Utilise sharp si résolu dans le repo, sinon fallback Playwright
// (page HTML statique composée puis capturée) — testé réellement le
// 2026-09-30 : sharp absent ici, le fallback est le chemin normalement
// emprunté.
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

function parseArgs(argv) {
  const out = { images: [], out: 'c:/tmp/recette-visuelle/planche.png', labels: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out') out.out = argv[++i];
    else if (a === '--label') out.labels.push(argv[++i]);
    else if (!a.startsWith('--')) out.images.push(resolve(a));
  }
  return out;
}

async function withSharp(images, labels, outPath) {
  const sharp = (await import('sharp')).default;
  const metas = await Promise.all(images.map((p) => sharp(p).metadata()));
  const targetH = Math.max(...metas.map((m) => m.height));
  const labelH = 28;
  const gap = 8;

  const resized = await Promise.all(images.map(async (p, i) => {
    const m = metas[i];
    const scale = targetH / m.height;
    return sharp(p).resize({ height: targetH, width: Math.round(m.width * scale) }).toBuffer();
  }));
  const widths = await Promise.all(resized.map((buf) => sharp(buf).metadata().then((m) => m.width)));
  const totalW = widths.reduce((a, b) => a + b, 0) + gap * (images.length - 1);

  const canvas = sharp({ create: { width: totalW, height: targetH + labelH, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } } });
  let x = 0;
  const composites = [];
  for (let i = 0; i < resized.length; i++) {
    composites.push({ input: resized[i], left: x, top: labelH });
    if (labels[i]) {
      const svgLabel = Buffer.from(`<svg width="${widths[i]}" height="${labelH}"><text x="4" y="20" font-size="16" font-family="sans-serif" fill="black">${labels[i]}</text></svg>`);
      composites.push({ input: svgLabel, left: x, top: 0 });
    }
    x += widths[i] + gap;
  }
  await canvas.composite(composites).png().toFile(outPath);
}

async function withPlaywright(images, labels, outPath) {
  // Chromium refuse de charger une ressource file:// depuis une page chargée
  // via setContent/about:blank ("Not allowed to load local resource" —
  // constaté le 2026-09-30). On embarque donc chaque image en data URI base64
  // plutôt que de naviguer vers un fichier HTML temporaire.
  const { chromium } = await import('playwright');
  const dataUris = images.map((p) => {
    const buf = readFileSync(p);
    const ext = p.toLowerCase().endsWith('.jpg') || p.toLowerCase().endsWith('.jpeg') ? 'jpeg' : 'png';
    return `data:image/${ext};base64,${buf.toString('base64')}`;
  });
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    body{margin:0;background:#fff;display:flex;align-items:flex-start;font-family:sans-serif}
    figure{margin:0;padding:0 4px}
    figcaption{font-size:14px;padding:4px 0}
    img{display:block;height:600px;width:auto}
  </style></head><body>
    ${dataUris.map((uri, i) => `<figure><figcaption>${labels[i] || ''}</figcaption><img src="${uri}"></figure>`).join('\n')}
  </body></html>`;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.waitForFunction(() => Array.from(document.images).every((img) => img.complete && img.naturalWidth > 0));
  const body = await page.$('body');
  await body.screenshot({ path: outPath });
  await browser.close();
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  if (args.images.length < 2) {
    console.error('Usage: node planche.mjs <img1> <img2> [<img3>] [--label "Référence"] [--label "Avant"] [--label "Après"] [--out <fichier.png>]');
    process.exit(2);
  }
  mkdirSync(dirname(args.out), { recursive: true });

  let mode = 'playwright';
  try {
    await import('sharp');
    mode = 'sharp';
    await withSharp(args.images, args.labels, args.out);
  } catch {
    await withPlaywright(args.images, args.labels, args.out);
  }

  console.log(`Planche (${mode}) écrite : ${args.out}`);
}

run().catch((err) => { console.error(err); process.exit(1); });
