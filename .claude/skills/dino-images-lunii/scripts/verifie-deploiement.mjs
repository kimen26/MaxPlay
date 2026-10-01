// Verifie que les images paleoart servies par GitHub Pages sont bien celles du disque.
//
// POURQUOI : un `git push` reussi prouve que les fichiers sont partis, jamais que la page
// affiche la bonne image. Pages sert parfois une version en cache, et une substitution ratee
// (fichier reste en staging, conversion echouee) ne se voit qu a l ecran. Ce script compare
// le poids distant au poids local : un ecart = ancienne version encore servie.
//
// Usage :
//   node verifie-deploiement.mjs                     toutes les images du dossier paleoart
//   node verifie-deploiement.mjs <Fichier.jpg> [...]  seulement celles-la
//   node verifie-deploiement.mjs --audit             celles de _FILE-REGEN.json
import { readFileSync, statSync, existsSync, readdirSync } from 'node:fs';

const ROOT = 'c:/ProjetsPerso/Claude_Projects/MaxPlay';
const PALEO = ROOT + '/site/img/dinos/paleoart';
const BASE = 'https://kimen26.github.io/MaxPlay/img/dinos/paleoart/';
const FILE = ROOT + '/studio/dino/content/sources/_audit-images-2026-09/_FILE-REGEN.json';

// Tolerance : GitHub Pages peut recompresser a la marge, 1 Ko d ecart n est pas un probleme.
const MARGE = 1024;

const args = process.argv.slice(2);
const AUDIT = args.includes('--audit');
const nommes = args.filter(a => !a.startsWith('--'));

let cibles;
if (nommes.length) cibles = nommes;
else if (AUDIT) {
  if (!existsSync(FILE)) { console.log('✗ _FILE-REGEN.json absent'); process.exit(1); }
  cibles = JSON.parse(readFileSync(FILE, 'utf8')).map(e => e.fichier);
} else {
  cibles = readdirSync(PALEO).filter(f => /\.(jpg|webp|png)$/i.test(f));
}

let ok = 0;
const pb = [];
for (const f of cibles) {
  const local = PALEO + '/' + f;
  if (!existsSync(local)) { pb.push(`${f} : absent en local`); continue; }
  const poids = statSync(local).size;
  let r;
  try {
    r = await fetch(BASE + encodeURIComponent(f), { method: 'HEAD' });
  } catch (e) {
    pb.push(`${f} : requete impossible (${e.message.split('\n')[0]})`);
    continue;
  }
  if (r.status !== 200) { pb.push(`${f} : HTTP ${r.status}`); continue; }
  const dist = Number(r.headers.get('content-length') || 0);
  if (Math.abs(dist - poids) > MARGE) {
    pb.push(`${f} : servi ${(dist / 1024).toFixed(0)} Ko, local ${(poids / 1024).toFixed(0)} Ko — ancienne version ?`);
    continue;
  }
  ok++;
}

console.log(`servies et conformes : ${ok} / ${cibles.length}`);
if (pb.length) {
  console.log('\nPROBLEMES :');
  pb.forEach(x => console.log('  ' + x));
}
process.exit(pb.length ? 1 : 0);
