// Batch COLORIAGE DE PLANTES — linearts pour le mini-jeu de coloriage (mj-32).
// Calque de batch-fond-coloriage.mjs, lui-meme calque de batch-dino-coloriage.mjs :
// meme entete, meme charte STYLE_COLORIAGE, meme tuyau gpt-gen-dino.mjs.
//
// Demande Papa Yann 2026-09-08 : « on pourrait ajouter les plantes aussi dans le dessin ??
// en respectant bien les infos ». D'ou la regle centrale de ce script : la description
// morphologique n'est PAS inventee, elle est LUE dans les fiches de `site/js/dinos-plantes.js`
// (champ `feuille`, `type`, `hauteur_m`, `nom_etym`), qui sont la verite du pole dino.
// Les 19 plantes des fiches ont deja une image PHOTO (site/img/dinos/plantes/) mais AUCUN
// lineart : c'est ce que ce script produit.
//
// Usage: node batch-plante-coloriage.mjs --preview          (affiche les prompts, 0 credit)
//        node batch-plante-coloriage.mjs                    (genere la selection par defaut)
//        node batch-plante-coloriage.mjs araucaria ginkgo   (genere ces plantes-la)
//        node batch-plante-coloriage.mjs --toutes           (les 19 des fiches)
//
// Prerequis (cf. SKILL.md) : un navigateur en mode debug avec session ChatGPT loguee.
//   powershell -File .claude/skills/dino-images-lunii/scripts/launch-brave.ps1
//   (ou launch-chromium.ps1 + CDP_PORT=9225 si Brave tourne deja — cf. lecon L-114)

import { readFileSync, appendFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const ROOT = 'c:/ProjetsPerso/Claude_Projects/MaxPlay';
const SKILL = '.claude/skills/dino-images-lunii/scripts';
const PLANTES_JS = ROOT + '/site/js/dinos-plantes.js';

const USE_GROK = process.argv.includes('--grok');
const PREVIEW = process.argv.includes('--preview');
const TOUTES = process.argv.includes('--toutes');
const GEN = USE_GROK ? SKILL + '/grok-gen-dino.mjs' : SKILL + '/gpt-gen-dino.mjs';
const GPTS = 'https://chatgpt.com/g/g-p-6a2c67ebc22c8191971eecf695ec5fec-dinosaure/project';

const OUTD = ROOT + '/site/img/dinos/_new-plantes-coloriage';
const PROGRESS = OUTD + '/_PROGRESS.tsv';
mkdirSync(OUTD, { recursive: true });

// Selection par defaut : les plantes les plus RECONNAISSABLES pour un enfant, et les plus
// differentes les unes des autres (une fougere et une prele ne se confondent pas). Araucaria
// en fait partie : Papa Yann a demande explicitement s'il etait bien dans les fiches (il y est).
const SELECTION_DEFAUT = ['araucaria', 'fougere_arborescente', 'prele_geante', 'ginkgo', 'cycas', 'palmier'];

// Entete et charte : COPIE CONFORME de batch-dino-coloriage.mjs (cf. son commentaire d'origine,
// qui documente deux pieges payes le 2026-07-30 : « fond transparent » rendait un gris
// incoloriable, et les tournures negatives produisaient l'effet Streisand).
const ENTETE = `CONTEXTE : illustration pour un mini-jeu de coloriage pour enfant de 4 ans.
RÔLE : illustrateur de stickers et coloriages, style cartoon mignon et très lisible.`;

const STYLE_COLORIAGE = `STYLE : dessin au trait pour livre de coloriage, style cartoon mignon. L'image est une PAGE ENTIÈREMENT BLANCHE sur laquelle la plante est dessinée uniquement avec des CONTOURS NOIRS ÉPAIS ET NETS, comme au feutre noir. L'intérieur de la plante reste BLANC, vide, prêt à être colorié aux crayons ; le fond autour d'elle est BLANC PUR lui aussi, du blanc de la page. Seulement deux valeurs dans toute l'image : le blanc de la page et le noir du trait. Grandes zones blanches simples et bien fermées. Formes arrondies et douces. Très simple, très lisible, parfait pour qu'un enfant de 4 ans colorie. Pas de texte ni de chiffre dans l'image.`;

const CADRAGE = `CAMÉRA : la plante ENTIÈRE, vue de côté, bien centrée, avec de l'espace blanc autour. Peu de détails, des formes larges et bien fermées : un enfant doit pouvoir remplir chaque partie d'une seule couleur. Pas de décor autour, pas de sol dessiné, juste la plante seule sur la page blanche.`;

// ── Lecture des fiches (la VÉRITÉ, jamais réinventée) ────────────────────────
// dinos-plantes.js est un fichier JS généré qui déclare `const DINO_PLANTES = [ ... ];`.
// On isole le tableau et on le lit en JSON : les fiches restent la source unique.
function chargerPlantes() {
  const src = readFileSync(PLANTES_JS, 'utf8');
  const debut = src.indexOf('[');
  const fin = src.lastIndexOf(']');
  if (debut < 0 || fin < 0) {
    throw new Error('Structure inattendue dans ' + PLANTES_JS + ' : tableau DINO_PLANTES introuvable.');
  }
  return JSON.parse(src.slice(debut, fin + 1));
}

// Le champ `feuille` des fiches est écrit POUR UN ENFANT, avec des comparaisons parlantes
// (« comme une plume géante », « en éventail »). C'est exactement ce qu'il faut donner au
// générateur d'images : on le reprend tel quel plutôt que de le paraphraser.
function buildPlantePrompt(p) {
  const lignes = [
    ENTETE,
    `OBJECTIF : dessiner une ${p.name} en entier, très reconnaissable et mignonne, pour un mini-jeu de coloriage.`,
    `LA PLANTE : ${p.name}${p.full && p.full !== p.name ? ` (${p.full})` : ''}, une plante de l'époque des dinosaures.`,
  ];
  if (p.feuille) lignes.push(`SES FEUILLES, le détail le plus reconnaissable : ${p.feuille}`);
  if (p.tronc) lignes.push(`SON TRONC : ${p.tronc}`);
  if (p.graines) lignes.push(`CE QU'ELLE PORTE : ${p.graines}`);
  if (parseFloat(p.hauteur_m)) {
    lignes.push(`Hauteur réelle : ${String(p.hauteur_m).replace('.', ',')} mètres — la silhouette doit rendre cette allure (un arbre haut se dessine élancé, une plante basse se dessine trapue).`);
  }
  lignes.push(CADRAGE);
  lignes.push(STYLE_COLORIAGE);
  return lignes.join('\n');
}

function logProgress(id, status) {
  appendFileSync(PROGRESS, `${new Date().toISOString()}\t${id}\tplante-coloriage\t${status}\n`);
}

function sleepRandom() {
  const ms = Math.floor(Math.random() * 5000) + 5000;
  execFileSync('node', ['-e', `setTimeout(()=>{}, ${ms})`]);
}

function gen(prompt, outName, firstCall) {
  const args = [GEN, prompt, OUTD + '/' + outName];
  if (firstCall) args.push(...(USE_GROK ? ['--new'] : ['--url', GPTS]));
  try {
    const out = execFileSync('node', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
    process.stdout.write(out);
    return 0;
  } catch (e) {
    const code = e.status || 1;
    if (code === 5) { console.log('ARRET : limite/credits atteinte. Reprendre plus tard.'); process.exit(5); }
    console.log(`(echoue code=${code} pour ${outName})`);
    return code;
  }
}

const plantes = chargerPlantes();
const demandes = process.argv.slice(2).filter(a => !a.startsWith('--'));
const voulus = TOUTES ? plantes.map(p => p.id) : (demandes.length ? demandes : SELECTION_DEFAUT);

const inconnus = voulus.filter(id => !plantes.some(p => p.id === id));
if (inconnus.length) {
  console.log('Ids absents des fiches :', inconnus.join(', '));
  console.log('Ids disponibles :', plantes.map(p => p.id).join(', '));
  process.exit(1);
}

const aFaire = plantes.filter(p => voulus.includes(p.id));
let premier = true;
for (const p of aFaire) {
  const base = (p.png || (p.name + '.jpg')).replace(/\.(jpg|jpeg|png|webp)$/i, '');
  const outName = `${base}_coloriage.png`;
  const prompt = buildPlantePrompt(p);
  console.log(`\n========== ${p.id} (${p.name}) — COLORIAGE PLANTE ==========`);
  if (PREVIEW) { console.log(`\n--- [${outName}] ---\n${prompt}`); continue; }
  logProgress(p.id, 'start');
  gen(prompt, outName, premier);
  premier = false;
  logProgress(p.id, 'done');
  sleepRandom();
}

if (PREVIEW) {
  console.log(`\n(preview : aucun credit consomme, aucune image ecrite)`);
} else {
  console.log(`\nTermine. Images dans ${OUTD}`);
  console.log(`Etape suivante : REGARDER chaque image, puis convertir en .webp vers site/img/dinos/paleoart/ (meme convention que les coloriages de dinos et les fonds).`);
}
