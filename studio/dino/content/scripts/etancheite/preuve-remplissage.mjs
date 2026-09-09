// Preuve VISUELLE de l'etancheite : simule le seau de mj-32. On remplit en couleur
// toutes les zones blanches ENFERMEES (interieur du dino) et on laisse le fond blanc.
// Si la couleur reste dans le dino, l'image est etanche : c'est exactement ce que
// l'enfant verra. Sortie PNG a ouvrir a l'oeil, jamais un simple log.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const LUM_TRAIT = 200, ALPHA_VIDE = 32;
const src = process.argv[2], dst = process.argv[3];
if (!src || !dst) { console.error('Usage: node preuve-remplissage.mjs <src.webp> <sortie.png>'); process.exit(2); }

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'preuve-'));
const dim = execFileSync('ffprobe', ['-v','error','-select_streams','v:0','-show_entries','stream=width,height','-of','csv=p=0:s=x', src]).toString().trim();
const [w, h] = dim.split('x').map(Number);
const raw = path.join(TMP, 'i.rgba');
execFileSync('ffmpeg', ['-y','-loglevel','error','-i',src,'-pix_fmt','rgba','-f','rawvideo',raw]);
const d = fs.readFileSync(raw);
const trait = i => d[i*4+3] >= ALPHA_VIDE && (0.299*d[i*4]+0.587*d[i*4+1]+0.114*d[i*4+2]) < LUM_TRAIT;

const label = new Int32Array(w*h).fill(-1);
const infos = [];
const pile = new Int32Array(w*h);
for (let s0 = 0; s0 < w*h; s0++) {
  if (label[s0] !== -1 || trait(s0)) continue;
  const id = infos.length; let taille = 0, bord = false, n = 0;
  pile[n++] = s0; label[s0] = id;
  while (n) {
    const p = pile[--n]; taille++;
    const x = p % w, y = (p - x) / w;
    if (x === 0 || y === 0 || x === w-1 || y === h-1) bord = true;
    if (x > 0)     { const q = p-1; if (label[q] === -1 && !trait(q)) { label[q] = id; pile[n++] = q; } }
    if (x < w-1)   { const q = p+1; if (label[q] === -1 && !trait(q)) { label[q] = id; pile[n++] = q; } }
    if (y > 0)     { const q = p-w; if (label[q] === -1 && !trait(q)) { label[q] = id; pile[n++] = q; } }
    if (y < h-1)   { const q = p+w; if (label[q] === -1 && !trait(q)) { label[q] = id; pile[n++] = q; } }
  }
  infos.push({ id, taille, bord });
}
// Couleurs vives distinctes par poche interieure
const PAL = [[255,90,90],[90,170,255],[255,205,80],[130,220,140],[210,140,255],[255,150,60],[120,230,225],[250,120,190]];
const out = Buffer.alloc(w*h*4);
let peintes = 0;
for (let i = 0; i < w*h; i++) {
  const o = i*4;
  if (trait(i)) { out[o]=20; out[o+1]=20; out[o+2]=20; out[o+3]=255; continue; }
  const z = infos[label[i]];
  if (z && !z.bord && z.taille > 500) {
    const c = PAL[z.id % PAL.length];
    out[o]=c[0]; out[o+1]=c[1]; out[o+2]=c[2]; out[o+3]=255;
    peintes++;
  } else { out[o]=255; out[o+1]=255; out[o+2]=255; out[o+3]=255; }
}
const rawOut = path.join(TMP, 'o.rgba');
fs.writeFileSync(rawOut, out);
execFileSync('ffmpeg', ['-y','-loglevel','error','-f','rawvideo','-pix_fmt','rgba','-s',w+'x'+h,'-i',rawOut,'-vf','scale=620:-1',dst]);
fs.rmSync(TMP, { recursive: true, force: true });
console.log('pixels peints (interieur) :', peintes, '/', w*h, '->', dst);
