// gen-sw-version.mjs — calcule un hash de version du service worker et l'écrit
// dans site/js/gen/sw-version.js (HO-R11). Le hash change dès qu'un fichier de
// la coquille précachée change de contenu (voir PRECACHE_LIST dans site/sw.js) :
// sw.js compare cette version à celle enregistrée dans le cache pour décider
// s'il doit reconstruire le precache. Jamais de version en dur.
//
// Lancer depuis la racine du repo : node studio/minijeux/scripts/gen-sw-version.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../../../'); // studio/minijeux/scripts -> racine repo
const SITE = path.join(ROOT, 'site');
const SW_JS = path.join(SITE, 'sw.js');
const OUT = path.join(SITE, 'js', 'gen', 'sw-version.js');

// Liste précachée extraite de sw.js lui-même (bloc PRECACHE_LIST) : une seule
// source de vérité, ce script ne maintient pas sa propre copie de la liste.
const swSource = readFileSync(SW_JS, 'utf8');
const match = swSource.match(/const PRECACHE_LIST = \[([\s\S]*?)\];/);
if (!match) {
  console.error('gen-sw-version : PRECACHE_LIST introuvable dans site/sw.js — abandon.');
  process.exit(1);
}
const files = [...match[1].matchAll(/'([^']+)'/g)].map(m => m[1]);

const hash = createHash('sha256');
hash.update(swSource); // la stratégie de cache elle-même fait partie de la version
for (const rel of files) {
  if (rel === './' || rel.endsWith('/')) continue; // entrées de dossier (ex. './'), pas de contenu à hasher
  if (rel === 'js/gen/sw-version.js') continue; // s'auto-référencerait sinon (le hash ne convergerait jamais)
  const abs = path.join(SITE, rel);
  if (!existsSync(abs)) {
    console.error(`gen-sw-version : fichier précaché manquant sur disque : ${rel}`);
    process.exit(1);
  }
  hash.update(rel);
  hash.update(readFileSync(abs));
}
const version = hash.digest('hex').slice(0, 12);

const out = `// GÉNÉRÉ par studio/minijeux/scripts/gen-sw-version.mjs — ne pas éditer.
// Recalculé par \`npm run build\` à partir du contenu des fichiers précachés
// (voir PRECACHE_LIST dans site/sw.js) : change dès qu'un seul octet change.
// Chargé par sw.js via importScripts (service worker classique, pas de module) :
// une simple affectation globale, pas d'export ESM.
self.SW_VERSION = '${version}';
`;
writeFileSync(OUT, out);
console.log(`gen-sw-version : SW_VERSION = ${version} (${files.length} fichiers précachés) → ${path.relative(ROOT, OUT)}`);
