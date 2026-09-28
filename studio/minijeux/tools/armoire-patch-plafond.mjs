// armoire-patch-plafond.mjs — découpe UN petit calque de plafond bois PLAIN
// dans img/armoire/v8/shell.webp lui-même (jamais une autre image, L-145),
// pour recouvrir les 2 douilles + ampoule PEINTES dans la carcasse (retour
// Papa Yann passe 3, HO-MJ-23, 2026-09-28) : notre propre ampoule CSS
// (.casier::before) faisait double emploi avec elles à la rangée du haut.
//
// Les 2 douilles sont à x=32.38 % / 66.99 %, y=11.19 % du repère 911×1480
// (mesuré par analyse de pixels : luminance > 235 dans le bandeau du haut
// de shell.webp, clustering des points brillants). La zone x 44-56 %,
// y 7,5-15,5 % est plate — même bandeau, même hauteur, aucun halo — donc
// posée à l'identique sur une douille, la ligne de jonction du plafond
// s'aligne automatiquement (feature horizontale, indépendante du x source).
//
// Lancer depuis la racine du repo : node studio/minijeux/tools/armoire-patch-plafond.mjs
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..', '..'); // tools -> minijeux -> studio -> racine
const SITE = path.join(ROOT, 'site');
const SHELL = path.join(SITE, 'img', 'armoire', 'v8', 'shell.webp');
const OUT = path.join(SITE, 'img', 'armoire', 'patch-plafond.webp');
// n'importe quelle page du site suffit pour avoir un document file:// dans
// lequel dessiner sur un <canvas> (pas de fetch : chargement <img> direct).
const ANY_PAGE = path.join(SITE, 'index.html');

const SRC_BOX = { x: 0.44, y: 0.075, w: 0.12, h: 0.08 }; // fraction du repère 911x1480

const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });
const page = await browser.newPage();
await page.goto(pathToFileURL(ANY_PAGE).href);
const dataUrl = await page.evaluate(async ({ src, box }) => {
  const img = new Image();
  img.src = src;
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
  const W = img.naturalWidth, H = img.naturalHeight;
  const sx = box.x * W, sy = box.y * H, sw = box.w * W, sh = box.h * H;
  const c = document.createElement('canvas');
  c.width = Math.round(sw); c.height = Math.round(sh);
  const ctx = c.getContext('2d');
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
  return c.toDataURL('image/webp', 0.92);
}, { src: pathToFileURL(SHELL).href, box: SRC_BOX });
const buf = Buffer.from(dataUrl.split(',')[1], 'base64');
writeFileSync(OUT, buf);
console.log(`armoire-patch-plafond : ${path.relative(ROOT, OUT)} (${buf.length} octets)`);
await browser.close();
