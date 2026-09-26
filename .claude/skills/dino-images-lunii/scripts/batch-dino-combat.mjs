// Scènes de COMBAT paléoart (demande Papa Yann 2026-09-25) : par animal, 2 scènes
// (son pire ennemi + sa meilleure proie, ou un rival pour un herbivore), dans le projet
// ChatGPT « Dinosaure » (Brave debug 9222), plan très large, habitat et proportions vrais.
//
// La vérité (qui affronte qui, où, à quelle taille, quelle livrée) vit dans
// studio/dino/content/sources/combats/combats.json, préparée et fact-checkée par
// dino-conseiller. Ce script ne fait que l'assembler en prompt, avec les mêmes
// signatures morphologiques que la série 5 scènes (dino-morpho.mjs).
//
// Une image par appel, dans un chat neuf du projet (pas de recopie d'une image précédente).
// Sortie brute : site/img/dinos/_new-combats/<Nom>_<type>.png (staging gitignoré). Chaque
// image est vérifiée avant d'être rangée dans paleoart/ (voir range-combat.py).
//
// Usage : node batch-dino-combat.mjs <id> <ennemi|proie|rival> [--fix "<correction>"] [--try <n>] [--preview]
// Codes de sortie : ceux de gpt-gen-dino.mjs (3 timeout · 4 modération · 5 limite = ARRÊT).
import { readFileSync, mkdirSync, appendFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { MORPHO, getFields, ficheSignature, cleanPuce, descPhysique, mesuresGlobales, terme } from './dino-morpho.mjs';

const ROOT = 'c:/ProjetsPerso/Claude_Projects/MaxPlay';
const GEN = ROOT + '/.claude/skills/dino-images-lunii/scripts/gpt-gen-dino.mjs';
const PROJET = 'https://chatgpt.com/g/g-p-6a2c67ebc22c8191971eecf695ec5fec-dinosaure/project';
const COMBATS = ROOT + '/studio/dino/content/sources/combats/combats.json';
const OUTD = ROOT + '/site/img/dinos/_new-combats';
const PROGRESS = OUTD + '/_PROGRESS.tsv';

const argv = process.argv.slice(2);
const opt = name => { const i = argv.indexOf(name); return i > -1 ? argv[i + 1] : null; };
const [id, type] = argv.filter((a, i) => !a.startsWith('--') && !['--fix', '--try'].includes(argv[i - 1]));
const FIX = opt('--fix');
const ESSAI = opt('--try') || '1';
const PREVIEW = argv.includes('--preview');

const table = JSON.parse(readFileSync(COMBATS, 'utf8'));
const entree = table[id];
if (!entree) { console.log('✗ id absent de combats.json : ' + id); process.exit(1); }
const scene = entree.scenes.find(s => s.type === type);
if (!scene) { console.log(`✗ scène « ${type} » absente pour ${id} (dispo : ${entree.scenes.map(s => s.type).join(', ')})`); process.exit(1); }

// Portrait d'un animal de l'encyclopédie : identité, mesures, signature, puces de la fiche.
function portraitEncyclo(adId) {
  const d = getFields(adId);
  const l = [`${d.name}${d.full && d.full !== d.name ? ` (${d.full})` : ''}, ${terme(d)}.`];
  const mg = mesuresGlobales(d);
  if (mg) l.push(`Taille réelle : ${mg}.`);
  if (MORPHO[adId]) l.push(`Silhouette (RESPECTER SCRUPULEUSEMENT, c'est LE bon animal) : ${MORPHO[adId]}.`);
  descPhysique(d).forEach(p => l.push(p + '.'));
  const sig = ficheSignature(d);
  if (sig) l.push(`Détail le plus reconnaissable : ${cleanPuce('**Signature** : ' + sig)}.`);
  return { d, lignes: l };
}

const sujet = portraitEncyclo(id);
const adv = scene.adversaire_id && scene.adversaire_id !== id ? portraitEncyclo(scene.adversaire_id) : null;
const memeEspece = scene.adversaire_id === id;

const blocSujet = [...sujet.lignes, `LIVRÉE de cet individu : ${entree.livree.replace(/[.\s]+$/, "")}.`].map(x => '- ' + x).join('\n');
const blocAdv = memeEspece
  ? `- Un second ${sujet.d.name}, même espèce, même anatomie exacte.\n- LIVRÉE de ce second individu, bien distincte du premier : ${scene.adversaire_livree.replace(/[.\s]+$/, "")}.`
  : [...(adv ? adv.lignes : [`${scene.adversaire}${scene.adversaire_latin ? ` (${scene.adversaire_latin})` : ''}.`,
      `Taille réelle : ${scene.adversaire_mesures}.`,
      `Silhouette (RESPECTER SCRUPULEUSEMENT, c'est LE bon animal) : ${scene.adversaire_morpho}.`]),
    ...(adv ? [`Précision : ${scene.adversaire_morpho}.`] : []),
    `LIVRÉE de cet individu : ${scene.adversaire_livree.replace(/[.\s]+$/, "")}.`].map(x => '- ' + x).join('\n');

const nomAdv = memeEspece ? `deux ${sujet.d.name}` : `${sujet.d.name} et ${scene.adversaire}`;
const objectif = {
  ennemi: `une scène de combat réaliste et saisissante : ${nomAdv}, face à face. ${scene.action}`,
  proie: `une scène de chasse réaliste et saisissante : ${sujet.d.name} contre ${scene.adversaire}, sa proie. ${scene.action}`,
  rival: `une scène d'affrontement réaliste et saisissante : ${nomAdv}. ${scene.action}`,
}[type];

const prompt = [
  `CONTEXTE : illustration pour une encyclopédie de dinosaures et d'animaux préhistoriques destinée à un enfant de 4 ans. Tout doit être scientifiquement juste.
RÔLE : illustrateur de paléoart documentaire réaliste, rigoureux sur l'anatomie et les proportions.`,
  `OBJECTIF : ${objectif} On montre l'instant de tension du combat, plein d'énergie : les deux animaux sont intacts, leur peau, leurs plumes ou leur fourrure restent propres.`,
  `CAMÉRA (règle n° 1, prioritaire sur tout le reste) : très grand plan d'ensemble, photographié depuis 150 à 300 mètres de distance, format paysage. Les animaux paraissent PETITS dans l'immensité du paysage : CHACUN occupe au plus un tiers de la largeur de l'image (et au plus un tiers de sa hauteur s'il est plus haut que long), entièrement visible, avec une large marge de décor tout autour. Le décor (ciel, relief, végétation, eau) remplit la majeure partie de l'image.`,
  `ANIMAL 1 — ${sujet.d.name.toUpperCase()} :\n${blocSujet}`,
  `ANIMAL 2 — ${(memeEspece ? sujet.d.name : scene.adversaire).toUpperCase()} :\n${blocAdv}`,
  `PROPORTIONS ENTRE LES DEUX (capital, à respecter exactement) : ${scene.rapport_taille} Les deux animaux se tiennent sur la même ligne de sol, à la même distance de l'objectif, pour que ce rapport de taille se lise juste : chacun est dessiné à sa taille réelle, le petit reste petit et le grand reste grand.`,
  `COULEURS : chaque animal porte la livrée indiquée, une vraie personnalité colorée et naturelle, crédible pour un animal sauvage, et les deux se distinguent au premier coup d'œil.`,
  `DÉCOR (son vrai milieu de vie, très soigné) : ${entree.habitat} Uniquement des animaux préhistoriques de ce lieu et de cette époque, dans une nature sauvage intacte.`,
  `STYLE : paléoart documentaire réaliste, lumière naturelle, image spectaculaire et lisible. Pas de texte ni de chiffre dans l'image.`,
  ...(FIX ? [`CORRECTION PRIORITAIRE (l'essai précédent était faux sur ce point, c'est le plus important) : ${FIX}`] : []),
].join('\n\n');

if (PREVIEW) { console.log(prompt); process.exit(0); }

mkdirSync(OUTD, { recursive: true });
const baseName = sujet.d.png.replace(/^grok\//, '').replace(/\.(jpg|png|webp)$/i, '');
const out = `${OUTD}/${baseName}_${type}${ESSAI === '1' ? '' : '_v' + ESSAI}.png`;
const log = s => appendFileSync(PROGRESS, `${new Date().toISOString()}\t${id}\t${type}\t${ESSAI}\t${s}\n`);
log('start');
try {
  process.stdout.write(execFileSync('node', [GEN, prompt, out, '--url', PROJET],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }));
  log('ok\t' + out);
} catch (e) {
  log('code=' + (e.status || 1));
  process.stdout.write(e.stdout || '');
  process.exit(e.status || 1);
}
