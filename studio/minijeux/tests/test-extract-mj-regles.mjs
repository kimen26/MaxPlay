// Test de non-régression du correctif R20 (2026-09-28) : _extract-mj-regles.mjs doit FUSIONNER,
// jamais écraser. Filtré sur un seul id, toutes les autres clés du fichier cible doivent rester
// identiques OCTET POUR OCTET. Travaille sur une COPIE temporaire — le vrai strings.json n'est
// jamais touché (--out pointe vers _scratch/, déjà ignoré par git, patron **/_scratch/).
//
// Lance : node studio/minijeux/tests/test-extract-mj-regles.mjs
// Vert = exit 0.

import { readFileSync, copyFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const SCRIPT = join(ROOT, 'studio/minijeux/scripts/_extract-mj-regles.mjs');
const SOURCE = join(ROOT, 'studio/minijeux/i18n/fr/strings.json');
const SCRATCH = join(__dirname, '_scratch');
const COPY = join(SCRATCH, 'strings.test.json');

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; console.log('  \x1b[32mPASS\x1b[0m  ' + name); }
  else { fail++; console.log('  \x1b[31mFAIL\x1b[0m  ' + name + (detail ? '\n        → ' + detail : '')); }
}

mkdirSync(SCRATCH, { recursive: true });
// Copie fraîche : la fusion part de cette copie, jamais du vrai fichier.
copyFileSync(SOURCE, COPY);
const avant = JSON.parse(readFileSync(COPY, 'utf8'));

const ids = Object.keys(avant).filter(k => k !== '_commun');
console.log(`\nFichier cible : ${ids.length} jeux + _commun.`);

// ID réel présent dans le fichier — condition testable sur ce fichier même s'il évolue.
const idCible = ids.includes('mj-14') ? 'mj-14' : ids[0];
console.log(`── Extraction filtrée sur ${idCible} seul, vers une copie temporaire ──`);

let exitCode = 0;
try {
  execFileSync('node', [SCRIPT, idCible, '--out', COPY], { cwd: ROOT, stdio: 'pipe' });
} catch (e) {
  // exit 1 = "manquant" possible (jeu sans RegleInfo.init) : pas un échec du test de fusion,
  // seul un exit ≠ 0/1 (crash) serait anormal ici. On log la sortie pour diagnostic.
  exitCode = e.status ?? 1;
  if (exitCode > 1) {
    console.log(e.stdout?.toString() || '');
    console.log(e.stderr?.toString() || '');
  }
}
check('le script se termine proprement (exit 0 ou 1, pas un crash)', exitCode === 0 || exitCode === 1, `exit=${exitCode}`);

check('la copie temporaire existe toujours après extraction', existsSync(COPY));
const apres = JSON.parse(readFileSync(COPY, 'utf8'));

check('_commun identique octet pour octet', JSON.stringify(apres._commun) === JSON.stringify(avant._commun));

let autresIdentiques = true;
let premierEcart = null;
for (const id of ids) {
  if (id === idCible) continue;
  const a = JSON.stringify(avant[id]);
  const b = JSON.stringify(apres[id]);
  if (a !== b) { autresIdentiques = false; premierEcart = id; break; }
}
check(`les ${ids.length - 1} autres jeux sont identiques octet pour octet`, autresIdentiques, premierEcart ? `écart détecté sur ${premierEcart}` : undefined);

check('aucun jeu perdu (même liste de clés)', JSON.stringify(Object.keys(apres).sort()) === JSON.stringify(Object.keys(avant).sort()));

// Nettoyage : la copie et son backup restent dans _scratch/ (gitignoré) mais on les retire
// pour ne pas accumuler d'octets à chaque lancement.
try {
  rmSync(COPY, { force: true });
  rmSync(join(SCRATCH, '_scratch'), { recursive: true, force: true }); // backup écrit à côté de COPY
} catch { /* best effort, _scratch est gitignoré de toute façon */ }

console.log('\n' + (fail === 0 ? '\x1b[32m✓ ' + pass + ' PASS' : '\x1b[31m✗ ' + fail + ' FAIL / ' + pass + ' PASS') + '\x1b[0m\n');
process.exit(fail === 0 ? 0 : 1);
