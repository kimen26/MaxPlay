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
// --grok bascule sur le projet Grok "Dinosaures" (plan B quand ChatGPT limite la cadence).
const USE_GROK = process.argv.includes('--grok');
const GEN = ROOT + '/.claude/skills/dino-images-lunii/scripts/'
  + (USE_GROK ? 'grok-gen-dino.mjs' : 'gpt-gen-dino.mjs');
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
// Port du navigateur a piloter (9222 par defaut, 9223 pour la seconde instance).
const PORT = arg('--port', '9222');
// --ref-auto <Fichier.jpg> : joint cette image de la collection prod comme reference
// visuelle a CHAQUE generation du lot (lecon L-D-59). A n utiliser que sur un lot
// homogene — typiquement toutes les scenes d un meme sujet.
const REF_AUTO = arg('--ref-auto');
// Une cadence trop rapide declenche le rate limit : on espace explicitement les generations.
// 90 s par defaut : a 25 s, ChatGPT a repondu 'demandes trop rapidement' et restreint
// l acces (2026-09-06). La generation prend deja ~90 s, la pause double l intervalle.
const PAUSE = parseInt(arg('--pause', '90'), 10) * 1000;
const dors = ms => new Promise(r => setTimeout(r, ms));

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

// Les coloriages ne sont pas du paleoart : page blanche, trait noir, deux valeurs.
// Style repris de batch-dino-coloriage.mjs (formule en positif, cf. L-D24).
const CADRE_COLORIAGE = [
  '',
  '---',
  "STYLE : dessin au trait pour livre de coloriage, style cartoon mignon. L'image est une PAGE",
  "ENTIEREMENT BLANCHE sur laquelle l'animal est dessine uniquement avec des CONTOURS NOIRS EPAIS",
  "ET NETS, comme au feutre noir. L'interieur de l'animal reste BLANC, vide, pret a etre colorie",
  "aux crayons ; le fond autour de lui est BLANC PUR lui aussi, du blanc de la page. Seulement deux",
  "valeurs dans toute l'image : le blanc de la page et le noir du trait. Grandes zones blanches",
  "simples et bien fermees. Formes arrondies et douces, yeux grands et expressifs. Tres simple,",
  "tres lisible, parfait pour qu'un enfant de 4 ans colorie. Pas de texte ni de chiffre dans l'image.",
].join('\n');

// 1 chat neuf par IMAGE. Le partage de contexte entre scenes d un meme sujet devait
// aider a varier la pose ; il fait l inverse — sur un sujet ou il n a pas d idee neuve,
// le modele resert l image precedente (Liopleurodon _funfact rendu clone pixel de son
// _manger, 2026-09-06). La differenciation passe par le prompt, qui nomme deja les
// scenes dont il faut se demarquer, pas par la memoire du chat.
let sujetCourant = null;
let ok = 0, ko = 0;

for (const e of cible) {
  const out = sortie(e);
  const neuf = true; // toujours un chat neuf : voir le commentaire ci-dessus
  const args = [GEN, e.prompt + (e.fichier.endsWith('.webp') ? CADRE_COLORIAGE : CADRE), out];
  // Grok gere son projet lui-meme via --new ; ChatGPT a besoin de l'URL du projet.
  if (neuf) args.push(...(USE_GROK ? ['--new'] : ['--url', GPTS]));
  // grok-gen-dino.mjs ne gere pas --ref : la reference visuelle est ChatGPT seulement.
  if (REF_AUTO && !USE_GROK) args.push('--ref', ROOT + '/site/img/dinos/paleoart/' + REF_AUTO);
  sujetCourant = e.id;

  console.log(`\n─── ${e.fichier}  [${e.motif}]${neuf ? '  (chat neuf)' : ''}`);
  try {
    execFileSync('node', args, { stdio: 'inherit', cwd: ROOT, env: { ...process.env, CDP_PORT: PORT } });
    appendFileSync(JOURNAL, `${new Date().toISOString()}\t${e.fichier}\t${e.motif}\tGENERE\n`);
    ok++;
    if (PAUSE) await dors(PAUSE);
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
