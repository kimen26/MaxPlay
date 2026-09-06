// Régénère les images recalées par l'audit 2026-09 (_FILE-REGEN.json), via le projet
// ChatGPT "Dinosaure" en Brave debug 9222. Ne touche JAMAIS l'image de production :
// le résultat part en staging, la substitution se fait après validation visuelle.
//
// Usage : node regen-audit.mjs [--n <nb>] [--only <Fichier.jpg,...>] [--dino <id,...>] [--retry]
//   --n      nombre max d'images à générer dans cette passe (défaut 6, ménage le quota)
//   --only   cible des fichiers précis
//   --dino   cible des sujets précis
//   --retry  régénère même ce qui est déjà en staging (2e tentative après refus visuel)
import { readFileSync, writeFileSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const ROOT = 'c:/ProjetsPerso/Claude_Projects/MaxPlay';
const GEN = ROOT + '/.claude/skills/dino-images-lunii/scripts/gpt-gen-dino.mjs';
const GPTS = 'https://chatgpt.com/g/g-p-6a2c67ebc22c8191971eecf695ec5fec-dinosaure/project';
const FILE = ROOT + '/studio/dino/content/sources/_audit-images-2026-09/_FILE-REGEN.json';
const OUTD = ROOT + '/site/img/dinos/_new-audit';
const JOURNAL = OUTD + '/_JOURNAL.tsv';
mkdirSync(OUTD, { recursive: true });

const arg = (n, d) => { const i = process.argv.indexOf(n); return i > -1 ? process.argv[i + 1] : d; };
const N = parseInt(arg('--n', '6'), 10);
const ONLY = arg('--only') ? arg('--only').split(',').map(s => s.trim()) : null;
const DINOS = arg('--dino') ? arg('--dino').split(',').map(s => s.trim()) : null;
const RETRY = process.argv.includes('--retry');

const file = JSON.parse(readFileSync(FILE, 'utf8'));
let cible = file;
if (ONLY) cible = cible.filter(e => ONLY.includes(e.fichier));
if (DINOS) cible = cible.filter(e => DINOS.includes(e.id));

const sortie = e => OUTD + '/' + e.fichier.replace(/\.(jpg|webp)$/, '.png');
if (!RETRY) cible = cible.filter(e => !existsSync(sortie(e)));
cible = cible.slice(0, N);

if (!cible.length) { console.log('rien à générer (tout est déjà en staging ?)'); process.exit(0); }
console.log(`${cible.length} image(s) à générer :\n  ` + cible.map(e => e.fichier).join('\n  ') + '\n');

// Le bloc de prompt est du markdown de travail : on le transmet tel quel, il porte
// MORPHO / ACTION / DÉCOR / INTERDITS et nomme les scènes dont il faut se démarquer.
// On ajoute seulement la consigne de format, invariante.
const CADRE = [
  '',
  '---',
  'Consignes de rendu (invariantes) : une seule image, paysage 3:2, paléoart réaliste',
  'documenté, lumière naturelle de jour, palette douce lisible par un enfant de 4 ans.',
  'AUCUN texte, chiffre, légende, flèche, watermark ou signature dans l\'image.',
  'Aucun sang, aucune plaie, aucune agonie. Génère l\'image directement, sans commentaire.',
].join('\n');

// 1 chat neuf par sujet : les scènes d'un même dino partagent le contexte, ce qui aide
// le modèle à VARIER la pose (il voit ce qu'il vient de produire) — le défaut CLONE
// vient justement de scènes générées en vase clos.
let sujetCourant = null;
let ok = 0, ko = 0;

for (const e of cible) {
  const out = sortie(e);
  const neuf = e.id !== sujetCourant;
  const args = [GEN, e.prompt + CADRE, out];
  if (neuf) args.push('--url', GPTS);
  sujetCourant = e.id;

  console.log(`\n─── ${e.fichier}  [${e.motif}]${neuf ? '  (chat neuf)' : ''}`);
  try {
    execFileSync('node', args, { stdio: 'inherit', cwd: ROOT });
    appendFileSync(JOURNAL, `${new Date().toISOString()}\t${e.fichier}\t${e.motif}\tGENERE\n`);
    ok++;
  } catch (err) {
    const code = err.status;
    appendFileSync(JOURNAL, `${new Date().toISOString()}\t${e.fichier}\t${e.motif}\tECHEC-${code}\n`);
    ko++;
    if (code === 5) {
      console.log('\n⛔ QUOTA/LIMITE ChatGPT atteint — arrêt propre. Relancer plus tard.');
      break;
    }
    console.log(`⚠️  échec (code ${code}) sur ${e.fichier} — on continue.`);
    sujetCourant = null; // repartir sur un chat neuf après un échec
  }
}
console.log(`\n=== ${ok} générée(s), ${ko} échec(s). Staging : ${OUTD}`);
console.log('Prochaine étape : validation visuelle, PUIS substitution.');
