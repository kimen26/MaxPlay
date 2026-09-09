// Verifie la VRAIE question de l'etancheite : depuis un point interieur du dino,
// le remplissage s'echappe-t-il jusqu'au bord de l'image ?
//
// Pourquoi ce second script : audit-etancheite.mjs demande "le fond atteint-il le
// centre geometrique ?". Sur un dino aux membres ecartes (Microraptor : le centre
// tombe entre l'aile et le corps), le centre EST du fond legitimement, et l'audit
// crie a la fuite sans qu'aucun trait ne soit ouvert. Faux positif.
// Ici on part de l'interieur reel (germes cherches dans les zones blanches ENTOUREES
// de trait) et on regarde si la couleur sort de l'image. C'est exactement ce que
// fait le seau de mj-32 quand l'enfant clique dans le ventre du dino.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const LUM_TRAIT = 200, ALPHA_VIDE = 32;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'fuite-'));

function decode(src) {
  const dim = execFileSync('ffprobe', ['-v','error','-select_streams','v:0','-show_entries','stream=width,height','-of','csv=p=0:s=x', src]).toString().trim();
  const [width, height] = dim.split('x').map(Number);
  const dst = path.join(TMP, 'f.rgba');
  execFileSync('ffmpeg', ['-y','-loglevel','error','-i',src,'-pix_fmt','rgba','-f','rawvideo',dst]);
  const data = fs.readFileSync(dst);
  fs.rmSync(dst, { force: true });
  return { data, width, height };
}
const trait = (d,i) => d[i*4+3] >= ALPHA_VIDE && (0.299*d[i*4]+0.587*d[i*4+1]+0.114*d[i*4+2]) < LUM_TRAIT;

// Un SEUL parcours : on etiquette toutes les zones blanches d'un coup (labels),
// en retenant pour chacune sa taille et si elle touche le bord de l'image. Version
// precedente relancait un flood par germe et re-remplissait les memes poches --
// quadratique sur du 1254x1254, donc interminable.
function zones(d, w, h) {
  const label = new Int32Array(w * h).fill(-1);
  const infos = [];
  const pile = new Int32Array(w * h);
  for (let s0 = 0; s0 < w * h; s0++) {
    if (label[s0] !== -1 || trait(d, s0)) continue;
    const id = infos.length;
    let taille = 0, bord = false;
    let n = 0;
    pile[n++] = s0; label[s0] = id;
    while (n) {
      const p = pile[--n]; taille++;
      const x = p % w, y = (p - x) / w;
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) bord = true;
      if (x > 0)     { const q = p - 1; if (label[q] === -1 && !trait(d, q)) { label[q] = id; pile[n++] = q; } }
      if (x < w - 1) { const q = p + 1; if (label[q] === -1 && !trait(d, q)) { label[q] = id; pile[n++] = q; } }
      if (y > 0)     { const q = p - w; if (label[q] === -1 && !trait(d, q)) { label[q] = id; pile[n++] = q; } }
      if (y < h - 1) { const q = p + w; if (label[q] === -1 && !trait(d, q)) { label[q] = id; pile[n++] = q; } }
    }
    infos.push({ id, taille, bord, germe: { x: s0 % w, y: (s0 - (s0 % w)) / w } });
  }
  return { label, infos };
}

const files = process.argv.slice(2);
if (!files.length) { console.error('Usage: node verifie-fuite-reelle.mjs <img.webp> [...]'); process.exit(2); }

let fuites = 0;
for (const f of files) {
  const { data, width: w, height: h } = decode(f);
  const { infos } = zones(data, w, h);
  // L'exterieur = la zone touchant le bord la plus grande. Toute AUTRE zone qui
  // touche le bord est une poche interieure qui communique avec le dehors : c'est
  // la fuite. Seuil de taille : on ignore le bruit de compression webp (< 500 px).
  const bordantes = infos.filter(z => z.bord && z.taille > 500).sort((a, b) => b.taille - a.taille);
  const nom = path.basename(f);
  if (bordantes.length > 1) {
    fuites++;
    const p = bordantes[1];
    console.log('FUITE   ' + nom + '  ' + (bordantes.length - 1) + ' zone(s) reliee(s) au fond, la plus grande = ' + p.taille + ' px, germe x=' + p.germe.x + ' y=' + p.germe.y);
  } else {
    const interieures = infos.filter(z => !z.bord && z.taille > 500);
    console.log('ETANCHE ' + nom + '  poches interieures fermees=' + interieures.length);
  }
}
fs.rmSync(TMP, { recursive: true, force: true });
process.exit(fuites ? 1 : 0);
