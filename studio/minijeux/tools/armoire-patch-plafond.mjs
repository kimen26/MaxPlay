// armoire-patch-plafond.mjs — découpe dans img/armoire/v8/shell.webp lui-même
// (jamais une autre image, L-145) le FOND de la case du milieu de la rangée
// du haut : plafond, sous-plafond et fond, sans douille ni cône de lumière.
// armoire.js le pose sur le fond des cases Dessin et Chiffres (Chiffres en
// miroir) pour couvrir les 2 douilles PEINTES dans la carcasse (x 32,38 % et
// 66,99 %) et leur cône : notre spot CSS par case (.casier::before) faisait
// double emploi avec elles (retour Papa Yann passe 3, HO-MJ-23, 2026-09-28).
//
// 2026-11-01 (retour PY sur P30, « ronds de zone plus sombre ») : l'ancien
// patch (12 × 8 %, masque radial) ne couvrait que la douille ; le cône
// éclairé restait autour et le patch y faisait une tache ronde plus sombre.
// La boîte source est maintenant centrée sur l'axe du meuble (49,84 %), de
// la même largeur que la cible (PATCH.w d'armoire.js, pas d'étirement) et à
// la même hauteur (y 9,6 → 24 %) : posé à côté, le raccord horizontal du
// plafond s'aligne tout seul.
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

const SRC_BOX = { x: 0.41366, y: 0.096, w: 0.1694, h: 0.144 }; // fraction du repère 911x1480

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
