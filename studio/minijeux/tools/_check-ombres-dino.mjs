// _check-ombres-dino.mjs — porte : la liste SANS_OMBRE dit-elle encore la verite ?
//
// `site/js/dinos-ombres.js` exclut du tirage les dinos dont l'ombre n'existe pas
// encore sur disque (sinon l'enfant tire une carte VIDE et le harnais rougit au
// hasard). Une liste en dur ment des que la situation change, dans les deux sens :
//
//   - une ombre est generee mais l'id reste dans la liste -> le dino est exclu
//     des jeux pour rien, en silence ;
//   - un dino entre dans l'encyclopedie sans son ombre -> carte vide en jeu.
//
// Cette porte compare la liste aux fichiers reels et signale les deux cas.
//
// Usage : node studio/minijeux/tools/_check-ombres-dino.mjs

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '../../../site');
const OMBRES = resolve(SITE, 'img/dinos/ombres');

const srcOmbres = readFileSync(resolve(SITE, 'js/dinos-ombres.js'), 'utf8');
const mListe = srcOmbres.match(/const SANS_OMBRE = \[([^\]]*)\]/);
if (!mListe) {
  console.error("✗ SANS_OMBRE introuvable dans dinos-ombres.js — la porte ne sait plus quoi verifier.");
  process.exit(1);
}
const declares = [...mListe[1].matchAll(/'([^']+)'/g)].map(m => m[1]);

// Les dinos du pool : meme filtre que pool() — un png sans sous-dossier.
const srcData = readFileSync(resolve(SITE, 'js/dinos-data.js'), 'utf8');
const dinos = [];
for (const bloc of srcData.split(/\n\s*\{\s*\n/)) {
  const id = (bloc.match(/id:\s*'([^']+)'/) || [])[1];
  const png = (bloc.match(/png:\s*'([^']+)'/) || [])[1];
  const name = (bloc.match(/name:\s*'([^']*)'/) || [])[1];
  if (id && png && name && !png.includes('/')) dinos.push({ id, png });
}

const ombreDe = png => resolve(OMBRES, png.replace(/\.(jpg|jpeg|png)$/i, '') + '_ombre.png');

const manquants = dinos.filter(d => !existsSync(ombreDe(d.png)));
const idsManquants = manquants.map(d => d.id);

const aRetirer = declares.filter(id => !idsManquants.includes(id));
const aAjouter = idsManquants.filter(id => !declares.includes(id));

console.log(`${dinos.length} dinos dans le pool · ${readdirSync(OMBRES).filter(f => /_ombre\.png$/.test(f)).length} ombres sur disque`);
console.log(`SANS_OMBRE declare : ${declares.join(', ') || '(vide)'}`);

if (aRetirer.length) {
  console.log("\n✗ Ombre desormais PRESENTE, mais l'id reste exclu du tirage — a retirer de SANS_OMBRE :");
  aRetirer.forEach(id => console.log('   ' + id));
}
if (aAjouter.length) {
  console.log("\n✗ Ombre ABSENTE et le dino n'est pas exclu — carte vide possible en jeu, a ajouter a SANS_OMBRE :");
  aAjouter.forEach(id => console.log('   ' + id));
}

if (!aRetirer.length && !aAjouter.length) {
  console.log('\n✓ SANS_OMBRE est a jour — aucun dino ne tire une ombre absente, aucun n\'est exclu pour rien');
  process.exit(0);
}
process.exit(1);
