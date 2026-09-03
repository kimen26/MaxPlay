// Batch GROS PLAN TETE — 1 image par dino, zoom detaille sur la tete/crane.
// Base sur batch-dino-series.mjs (memes fonctions fiche, champs, etc.)
//
// Usage: node batch-dino-headshot.mjs <id1> [id2] [id3] ...
//        node batch-dino-headshot.mjs --grok <id1> [id2] ...
import { readFileSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const ROOT = 'c:/ProjetsPerso/Claude_Projects/MaxPlay';
const SKILL = '.claude/skills/dino-images-lunii/scripts';
const FIELDS = SKILL + '/dino-fields.mjs';
const FICHES = ROOT + '/studio/dino/content/sources/fiches/_FICHES-DINOS-GROKIPEDIA.md';

// CHOIX DU CANAL : --grok bascule sur le projet Grok ; sinon ChatGPT (défaut).
//  - ChatGPT : PROJET "Dinosaure" g-p-6a2c67eb… (PAS le GPTs custom g-6a2f05b2…) — porte le prompt système paléoart.
//  - Grok    : PROJET "Dinosaures" 89187fb9… (URL gérée dans grok-gen-dino.mjs).
const USE_GROK = process.argv.includes('--grok');
const GEN = USE_GROK ? SKILL + '/grok-gen-dino.mjs' : SKILL + '/gpt-gen-dino.mjs';
const GPTS = 'https://chatgpt.com/g/g-p-6a2c67ebc22c8191971eecf695ec5fec-dinosaure/project'; // cible ChatGPT (ignoré si --grok)

const OUTD = ROOT + '/site/img/dinos/_new-headshots';
const PROGRESS = OUTD + '/_PROGRESS.tsv';
mkdirSync(OUTD, { recursive: true });

const MARIN_FLAG = process.argv.includes('--marin');
// --ref <image> : référence visuelle jointe (leçon L-D-59). Le headshot est le plan le plus
// exigeant sur la tête : sans référence, un trait où le modèle a un a priori ressort faux.
// Déclaré ici (et pas plus bas) car le filtre des ids en dépend.
const refIdxH = process.argv.indexOf('--ref');
const REF = refIdxH > -1 ? process.argv[refIdxH + 1] : null;
// La valeur de --ref ne commence pas par -- : sans ce filtre elle serait prise pour un id de dino.
const ids = process.argv.slice(2).filter((a, i) => !a.startsWith('--')
  && (refIdxH === -1 || i + 2 !== refIdxH + 1));

const fichesTxt = existsSync(FICHES) ? readFileSync(FICHES, 'utf8') : '';

// Signatures morphologiques MANUELLES pour les dinos sans fiche Grokipedia (marins + ajouts récents).
// Silhouette/proportions RECONNAISSABLES — c'est ce qui doit absolument apparaître.
const MORPHO = {
  // Formulé en POSITIF uniquement (jamais "pas / sans"). Chiffres quand connus.
  elasmosaurus: "cou immense d'environ 7 m (plus de la moitié des 12 m du corps, ~70 vertèbres), petite tête, corps en tonneau, 4 grandes nageoires en pagaie, longue queue effilée",
  ophthalmosaurus: "corps fuselé de dauphin d'environ 6 m, yeux énormes d'environ 23 cm (les plus grands proportionnellement du règne animal), museau court et fin, grande nageoire dorsale triangulaire, queue verticale en croissant",
  liopleurodon: "pliosaure trapu et massif d'environ 6-7 m, tête énorme représentant près d'un cinquième du corps avec de longues mâchoires puissantes, cou court et épais, 4 grandes nageoires propulsives",
  archelon: "tortue marine géante d'environ 4 m de long et 4,9 m d'envergure de nageoires, large carapace bombée recouverte de peau coriace, immenses nageoires antérieures en forme d'aile, tête puissante à bec crochu",
  shonisaurus: "ichtyosaure géant d'environ 15 m au corps massif et allongé de baleine, long museau étroit, 4 longues nageoires fines, silhouette élancée",
  patagotitan: "titanosaure colossal d'environ 37 m, très long cou et très longue queue, corps massif porté par 4 pattes-piliers énormes, petite tête, l'un des plus gros animaux terrestres de tous les temps",
  centrosaurus: "cératopsien trapu d'environ 5,5 m à une seule grande corne nasale recourbée, collerette osseuse bordée de crochets recourbés, bec de perroquet, 4 pattes robustes",
  ichthyosaurus: "reptile marin en forme de dauphin d'environ 2 à 4 m, museau long et fin garni de petites dents, grands yeux, nageoire dorsale triangulaire, queue verticale en croissant",
  // Synchro 2026-07-05 avec batch-dino-series.mjs (théropodes/ornithischiens sans fiche captée + mégafaune).
  ceratosaurus: "grand théropode carnivore, UNE corne osseuse dressée sur le museau au-dessus des narines (son trait unique), deux petites crêtes au-dessus des yeux, gueule garnie de dents de carnivore",
  amargasaurus: "petit sauropode au long cou, DEUX rangées parallèles de très hautes épines osseuses dressées le long du cou (son trait unique, comme une double crinière de piques), petite tête",
  pachycephalosaurus: "dinosaure herbivore bipède, ÉNORME dôme osseux bombé et lisse au sommet du crâne (jusqu'à 22 cm d'os épais, son trait unique, comme un casque), museau court bordé de petits noeuds et pointes osseuses",
  carcharodontosaurus: "gigantesque théropode carnivore, immense crâne allongé garni de longues dents plates tranchantes en lame de couteau (comme un requin), museau puissant",
  utahraptor: "grand droméosaure (raptor) couvert de PLUMES, tête d'oiseau de proie garnie de dents, longues plumes au cou, museau étroit",
  hatzegopteryx: "REPTILE VOLANT géant (ptérosaure azhdarchidé) du Crétacé, PAS un oiseau. Sa tête est un CRÂNE DE REPTILE de plus d'2,5 m : un long museau OSSEUX massif, droit et pointu, TRIANGULAIRE en coupe et très haut à sa base, prolongé par des mâchoires SANS AUCUNE DENT aux bords coupants nets ; une grande ouverture nasale allongée est visible dans l'os du museau, et le crâne porte une crête basse et lisse sur le dessus. Le COU est COURT, ÉPAIS et très musclé, plus large que la tête à sa base (c'est son trait unique). La peau est nue et coriace comme celle d'un reptile, tendue sur l'os, avec par endroits un DUVET RAS de fibres fines (pycnofibres) collé au corps — une fourrure courte, jamais un plumage. L'œil est petit, rond, cerclé d'un anneau osseux. Sur les épaules on devine l'attache des ailes de PEAU (membranes tendues sur un doigt très allongé). Aspect général : reptile préhistorique puissant, sec et osseux",
  saurolophus: "hadrosaure à bec de canard. LE CRÂNE (l'essentiel de ce portrait) : vu de profil, la ligne du dessus de la tête forme UNE SEULE PENTE DROITE ET CONTINUE qui part du bout du bec, remonte le long du museau et se PROLONGE au-delà de l'arrière du crâne en une POINTE d'OS PLEIN dirigée vers l'ARRIÈRE ET VERS LE HAUT, inclinée à environ 45 degrés vers le ciel. Cette pointe est taillée dans la même masse d'os que le museau, sa base est LARGE et SOUDÉE au crâne juste derrière l'œil, et elle s'affine jusqu'à son extrémité : TRIANGULAIRE, ÉTROITE, pleine et solide, COURTE (nettement plus courte que le museau). La tête entière ressemble à un coin, une pointe de flèche trapue qui monte vers l'arrière. Museau long et large terminé par un bec plat de canard, joues pleines, œil rond de côté, peau à fines écailles en galets",
  mammuthus: "mammouth laineux, 2 longues défenses très recourbées vers le haut et se croisant, trompe, épaisse fourrure brune-rousse hirsute, grosse bosse de graisse au sommet du crâne, petites oreilles",
  smilodon: "félin trapu, 2 immenses canines supérieures recourbées en forme de sabre dépassant largement de la mâchoire fermée, tête massive et puissante",
  megatherium: "paresseux terrestre géant, petite tête allongée, museau tubulaire, corps massif couvert de poils rêches, grandes griffes visibles aux pattes",
  paraceratherium: "rhinocéros géant SANS corne, très long cou vertical rappelant une girafe, tête allongée et fine, lèvre supérieure préhensile",
  glyptodon: "tête basse casquée d'os sous une carapace osseuse arrondie massive, museau court, allure de tatou géant",
  aenocyon: "loup robuste et trapu, tête large et massive avec mâchoires puissantes, épaisse fourrure, oreilles dressées",
  coelodonta: "rhinocéros laineux entièrement couvert d'une épaisse fourrure brune-rousse, longue corne frontale aplatie et recourbée vers l'arrière (comme un sabre), corne nasale secondaire plus petite",
  titanis: "grand oiseau coureur, bec massif et crochu très haut (comme un aigle géant), grands yeux, plumage dense sur la tête et le cou, ailes réduites à des moignons",
  edmontonia: "tête triangulaire basse couverte de plaques osseuses, museau étroit, grandes épines pointues recourbées vers l'avant sur les épaules et les côtés du cou",
};

function getFields(id) {
  return JSON.parse(execFileSync('node', [FIELDS, id], { encoding: 'utf8' }));
}
// extrait le bloc CONTEXTE d'un dino dans la fiche Grokipedia (heuristique sur le nom)
function ficheBlock(d) {
  const keys = [d.full, d.name].filter(Boolean);
  for (const k of keys) {
    const base = k.split(/[ (]/)[0]; // 1er mot
    // \b obligatoire : sinon Saurolophus attrape la fiche Parasaurolophus (incident 2026-07-30).
    const re = new RegExp('## .*\\b' + base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?### ❓', 'i');
    const m = fichesTxt.match(re);
    if (m) return m[0].replace(/### ❓[\s\S]*$/, '').trim();
  }
  return null;
}
function ficheContext(d) { const b = ficheBlock(d); return b ? b.slice(0, 1400) : null; }
// isole la 1re ligne ⭐ Signature (silhouette/proportions reconnaissables).
function ficheSignature(d) {
  const b = ficheBlock(d);
  if (!b) return '';
  const lines = b.split('\n').filter(l => /⭐\s*\*\*Signature/i.test(l));
  if (!lines.length) return '';
  return lines[0].replace(/^[-\s]*⭐\s*\*\*Signature\*\*\s*:?\s*/i, '').replace(/\*\*/g, '').trim();
}
// nettoie une puce markdown : enlève "- **Label** :", markdown, ⚠️ probable, parenthèses d'échelle/probable,
// segments négatifs (Streisand : "pas", "ne ... pas", "uniquement", "plutôt que", "—...").
function cleanPuce(line) {
  let s = line
    .replace(/^[-\s]*\*\*[^*]+\*\*\s*:?\s*/i, '')      // enlève "- **Tête** :"
    .replace(/`⚠️[^`]*`/g, '')                          // enlève `⚠️ probable`
    .replace(/\*\([^)]*\)\*/g, '')                       // enlève *(... )* (parenthèse d'échelle en italique)
    .replace(/\([^)]*(?:pas|probable|hypoth|⚠)[^)]*\)/gi, '') // parenthèses négatives/probables
    .replace(/\*\*/g, '')
    .replace(/\s*—.*$/, '')                              // coupe à partir du 1er tiret cadratin (étymo/négation/aparté)
    .replace(/[^.;,]*\b(?:pas|uniquement|plutôt|probables?|possibles?|ne\s)\b[^.;,]*/gi, '') // segments Streisand/incertitude
    .replace(/\.\s+[a-zàâ][^.]*\.$/i, '.')              // enlève un fragment de phrase orphelin en fin (ex ". pour les épines.")
    .replace(/\s*[;,]\s*/g, ', ')
    .replace(/[,.]\s*[,.]/g, ',')                        // fusionne ponctuations doublées
    .replace(/,\s*,/g, ',')
    .replace(/\s+/g, ' ').trim()
    .replace(/^[,.\s]+/, '')
    .replace(/[,.;\s]+$/, '');
  return s;
}
// extrait une puce de la fiche par son label. '' si absent.
function fichePuce(d, label) {
  const b = ficheBlock(d);
  if (!b) return '';
  const line = b.split('\n').find(l => new RegExp('\\*\\*' + label + '\\*\\*', 'i').test(l));
  return line ? cleanPuce(line) : '';
}
// description physique structurée du dino : puces utiles de la fiche, dédupliquées.
function descPhysique(d) {
  const out = [];
  const seen = new Set();
  for (const label of ['Silhouette', 'Tête', 'Dents', 'Peau', 'Pieds', 'Bras']) {
    const p = fichePuce(d, label);
    if (p && !seen.has(p)) { seen.add(p); out.push(p); }
  }
  return out;
}
// hauteur préférée : la fiche ("~3 m à l'épaule/au bassin") prime sur la data si présente.
function hauteurFiche(d) {
  const m = (ficheBlock(d) || '').match(/(\d+(?:[.,]\d+)?)\s*m\*?\*?\s*(?:à l['’]épaule|au bassin|au garrot|de haut)/i);
  return m ? m[1].replace('.', ',') : '';
}
// ce que le dino mangeait (flore/proies) et avec qui il vivait — pour étoffer le DÉCOR.
function ficheMange(d) { return fichePuce(d, 'Mange \\(précis\\)') || fichePuce(d, 'Mange'); }
function ficheVitAvec(d) { return fichePuce(d, 'Vit avec'); }
function ficheHabitat(d) {
  const m = (ficheBlock(d) || '').match(/\*\*[^*]*\*\*[^,]*,[^.]*\b(plaine|forêt|marécage|désert|côti|fluvial|boisé|rivière|littoral|humide|aride|lagune)[^.]*\./i);
  return m ? m[0].replace(/\*\*/g, '').trim() : '';
}

const PREVIEW = process.argv.includes('--preview'); // imprime les prompts sans générer (vérif à sec)
function gen(prompt, outName, firstOfDino) {
  if (PREVIEW) { console.log(`\n--- [${outName}] ---\n${prompt}`); return 0; }
  const args = [GEN, prompt, OUTD + '/' + outName];
  // 1re scène d'un dino = nouveau chat dans le projet. ChatGPT prend --url <projet> ; Grok prend --new.
  if (firstOfDino) args.push(...(USE_GROK ? ['--new'] : ['--url', GPTS]));
  if (REF && !USE_GROK) args.push('--ref', REF);
  try {
    const out = execFileSync('node', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
    process.stdout.write(out);
    return 0;
  } catch (e) {
    const code = e.status || 1;
    if (code === 5) { console.log('⛔ ARRÊT : limite/crédits. Reprends plus tard.'); process.exit(5); }
    console.log(`(scène échouée code=${code} pour ${outName})`);
    return code;
  }
}

// Pause aléatoire entre 2 et 7 secondes pour éviter le rate limit de ChatGPT
function sleepRandom() {
  const ms = Math.floor(Math.random() * 5000) + 2000; // 2000-7000ms
  console.log(`  (pause ${(ms/1000).toFixed(1)}s avant prochaine image...)`);
  const start = Date.now();
  while (Date.now() - start < ms) {
    // spinlock synchrone (pas de setTimeout en ESM simple)
  }
}

function logProgress(id, scene, status) {
  appendFileSync(PROGRESS, `${new Date().toISOString()}\t${id}\t${scene}\t${status}\n`);
}

// En-tête et style specifiques headshot
const ENTETE = `CONTEXTE : illustration pour une encyclopédie de dinosaures destinée à un enfant de 4 ans.
RÔLE : illustrateur de paléoart documentaire réaliste, expert en anatomie crânienne et faciale des vertébrés.`;

const STYLE_HEAD = `STYLE : paléoart documentaire réaliste, lumière naturelle douce venant de côté pour sculpter les volumes, image très détaillée, belle et lisible. Pas de texte ni de chiffre dans l'image.`;

// CAMÉRA headshot : gros plan très serré sur la tête
const CAM_HEADSHOT = `CAMÉRA : gros plan très serré sur la tête et le cou (de la base du cou jusqu'au bout du museau), cadrage portrait, angle légèrement de 3/4 pour voir la profondeur du crâne. La tête doit occuper 70-80% de l'image. Focus extrême sur les textures (écailles, plumes, peau, kératine, etc.) et les détails anatomiques (dents, bec, cornes, crête, yeux, narines, joues). Arrière-plan flou très léger (bokeh naturel) avec un aperçu de l'habitat.`;

// Extrait les infos de tête précises de la fiche (puces Tête, Dents, Crâne, Bec, Cornes, Crête, Yeux, Peau)
function teteDetails(d) {
  const details = [];
  for (const label of ['Tête', 'Dents', 'Crâne', 'Bec', 'Cornes', 'Crête', 'Yeux', 'Peau']) {
    const p = fichePuce(d, label);
    if (p) details.push(p);
  }
  return details;
}

// Mesures du crâne quand connues (cherche "X cm de long/du crâne/de la tête")
function mesuresCrane(d) {
  const b = ficheBlock(d) || '';
  const m = b.match(/(\d+(?:[.,]\d+)?)\s*cm\s*(?:de long|de large|de haut|du crâne|de la tête)/gi);
  return m || [];
}

// Assemble le prompt headshot
function buildHeadshotPrompt(d, id) {
  const regimeMot = d.regime ? d.regime.replace(/[^\p{L}\s]/gu, '').trim().toLowerCase() : '';
  const epoqueMot = d.epoque ? d.epoque.split('·')[0].trim() : 'son époque';
  
  const details = teteDetails(d);
  const mesures = mesuresCrane(d);
  
  const lignes = [
    ENTETE,
    `OBJECTIF : réaliser un gros plan très détaillé sur la tête et le crâne du ${d.name}, mettant en valeur chaque caractéristique anatomique avec précision scientifique et beauté artistique.`,
    `LE DINOSAURE : ${d.name}${d.full && d.full !== d.name ? ` (${d.full})` : ''}, ${regimeMot} du ${epoqueMot}.`,
  ];

  // SILHOUETTE MAÎTRESSE de la tête (leçon 2026-07-05) : sans elle, le modèle fait une tête générique
  // pour les espèces sans fiche Grokipedia captée (mégafaune, théropodes récents) → mauvaise espèce.
  if (MORPHO[id]) lignes.push(`TÊTE À REPRÉSENTER (RESPECTER SCRUPULEUSEMENT, c'est LE bon animal) : ${MORPHO[id]}.`);
  // Référence visuelle : ici on veut la FORME du crâne, mais le cadrage doit rester un
  // gros plan portrait (contrairement aux scènes, où l'on exige un angle différent).
  if (REF) lignes.push(`RÉFÉRENCE VISUELLE : l'image jointe montre CE dinosaure. Reproduis fidèlement la forme de son crâne et de sa crête (longueur, épaisseur, inclinaison, point d'attache) ainsi que sa livrée. En cas de doute entre le texte et l'image, l'IMAGE fait foi pour l'anatomie. Le cadrage, lui, reste le gros plan portrait décrit ci-dessous.`);

  if (details.length) {
    lignes.push(`ANATOMIE DÉTAILLÉE DE LA TÊTE (à représenter avec précision) :`);
    details.forEach(detail => lignes.push(`- ${detail}.`));
  }
  
  if (mesures.length) {
    lignes.push(`MESURES DU CRÂNE : ${mesures.join(', ')}.`);
  }
  
  const mg = [];
  if (parseFloat(d.taille_m)) mg.push(`${String(d.taille_m).replace('.', ',')} m de long`);
  if (parseFloat(d.hauteur_m)) mg.push(`${String(d.hauteur_m).replace('.', ',')} m de haut`);
  if (mg.length) lignes.push(`Taille globale : ${mg.join(', ')}.`);
  
  lignes.push(`COULEUR : à toi de choisir librement la livrée, comme un vrai animal sauvage. Tu peux jouer avec des teintes variées (gris-bleu, vert-olive, brun-sable, ocre, ardoise, roux, tons plus clairs sur le ventre…) et des motifs (rayures, bandes, taches, points, ocelles, dégradés, marques autour des yeux ou sur la crête). Surprends-moi avec une livrée vivante et crédible qui lui va bien.`);
  
  lignes.push(CAM_HEADSHOT);
  lignes.push(STYLE_HEAD);
  
  return lignes.join('\n');
}

for (const id of ids) {
  const d = getFields(id);
  const baseName = d.png.replace(/^grok\//, '').replace(/\.(jpg|png)$/i, '');
  console.log(`\n========== ${id} (${d.name}) — HEADSHOT ==========`);
  
  logProgress(id, 'headshot', 'start');
  const prompt = buildHeadshotPrompt(d, id);
  
  if (PREVIEW) {
    console.log(`\n--- [${baseName}_headshot.png] ---\n${prompt}`);
  } else {
    gen(prompt, `${baseName}_headshot.png`, true);
    sleepRandom(); // pause 2-7s entre chaque image pour éviter le rate limit
  }
  
  logProgress(id, 'headshot', 'done');
  console.log(`---------- ${id} headshot terminé ----------`);
}
console.log('\n✅ Batch headshot terminé pour:', ids.join(', '));
