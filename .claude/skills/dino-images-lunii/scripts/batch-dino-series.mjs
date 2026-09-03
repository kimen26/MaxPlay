// Batch SÉRIE 5 scènes par dino, via le GPTs Dinosaure XXL (Brave debug 9222).
// - Lit les champs du dino dans dinos-data.js (name, png, regime, proies, fait, region, epoque).
// - Injecte la fiche Grokipedia (bloc CONTEXTE) si elle existe, pour forcer l'anatomie réelle ;
//   sinon demande au GPTs de vérifier l'anatomie avant de générer.
// - 1 chat neuf par dino (--url sur la 1re scène), scènes suivantes dans le même chat.
// - Garde-fous : enfant habillé + terre ferme (#1) ; aucun enfant + non gore (#2..#5).
// - Écrit l'avancement dans _PROGRESS.tsv (reprise). S'arrête net si crédits/limite (exit 5).
//
// Usage: node batch-dino-series.mjs <id1> [id2] [id3] ...
//        node batch-dino-series.mjs --marin <id>   (variante eau : enfant sur ponton, "port moderne" au lieu de Paris)
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

const OUTD = ROOT + '/site/img/dinos/_new-xxl';
const PROGRESS = OUTD + '/_PROGRESS.tsv';
mkdirSync(OUTD, { recursive: true });

const MARIN_FLAG = process.argv.includes('--marin');
// --only <liste> : ne régénère QUE certaines scènes (hero,manger,ecosysteme,paris,funfact).
// Ex: --only funfact,paris. Défaut = toutes. Permet une reprise ciblée sans gâcher le quota.
const onlyIdx = process.argv.indexOf('--only');
const ONLY = onlyIdx > -1 ? process.argv[onlyIdx + 1].split(',').map(s => s.trim()) : null;
// `i` est l'index dans le tableau tronqué, `onlyIdx` celui dans argv complet : sans le +2 la
// valeur de --only n'était jamais exclue et le script la traitait comme un id de dino
// (« id introuvable: funfact », exit 1 après coup). Corrigé 2026-07-20.
// Même piège pour --ref <chemin> : sa valeur ne commence pas par -- et serait prise pour un id.
const refValIdx = process.argv.indexOf('--ref');
const ids = process.argv.slice(2).filter((a, i) => !a.startsWith('--')
  && (onlyIdx === -1 || i + 2 !== onlyIdx + 1)
  && (refValIdx === -1 || i + 2 !== refValIdx + 1));

const fichesTxt = existsSync(FICHES) ? readFileSync(FICHES, 'utf8') : '';

// Signatures morphologiques MANUELLES pour les dinos sans fiche Grokipedia (marins + ajouts récents).
// Silhouette/proportions RECONNAISSABLES — c'est ce qui doit absolument apparaître.
const MORPHO = {
  // Formulé en POSITIF uniquement (jamais "pas / sans"). Chiffres quand connus.
  // Théropodes/ornithischiens SANS fiche Grokipedia captée (2026-07-05) : ajoutés suite audit visuel
  // (silhouettes génériques → mauvaise espèce). Le trait UNIQUE est martelé en tête.
  ceratosaurus: "grand théropode carnivore bipède d'environ 6 m marchant sur 2 pattes arrière, UNE corne osseuse dressée sur le museau au-dessus des narines (son trait unique), deux petites crêtes au-dessus des yeux, rangée d'ostéodermes le long du dos, longue queue épaisse, petits bras à quatre doigts, gueule garnie de dents de carnivore",
  gallimimus: "dinosaure coureur qui ressemble à une grande AUTRUCHE (un ornithomimosaure), environ 6 m de long, corps élancé et léger. TÊTE (crucial) : TRÈS PETITE tête au bout d'un très long cou mince, avec un BEC corné pointu SANS AUCUNE DENT, comme un bec d'oiseau ou d'autruche. CE N'EST PAS un carnivore : PAS de grosse tête, PAS de gueule pleine de dents, PAS de crête. Longues pattes fines de coureur bipède, petites mains à 3 doigts fins, longue queue raide tenue à l'horizontale pour l'équilibre, corps couvert d'un duvet de plumes léger",
  amargasaurus: "petit sauropode quadrupède d'environ 10 m au long cou horizontal, avec sur le COU une double rangée de TRÈS LONGUES épines dressées, son trait unique et spectaculaire. TAILLE DES ÉPINES (crucial) : les plus longues atteignent 60 cm, soit environ le tiers à la moitié de la hauteur du cou — ce sont de grandes lances dressées bien visibles, PAS de petites pointes ; comme une haute double crinière de piques. À chaque vertèbre l'épine est fourchue en DEUX pointes appariées de MÊME hauteur formant un V serré ; les DEUX rangées sont très RAPPROCHÉES, presque collées (surtout pas une longue rangée et une courte écartées). Les épines sont LES PLUS HAUTES au MILIEU DU COU, puis décroissent vers les épaules et s'arrêtent au début du dos ; tout le reste du dos, les hanches et la longue queue effilée sont LISSES, sans aucune épine. Structure gainée de peau à la base avec les longues pointes cornées qui dépassent (ni os nu isolé, ni voile molle). Petite tête, corps porté par 4 pattes-colonnes",
  pachycephalosaurus: "dinosaure herbivore bipède d'environ 4,5 m marchant sur 2 pattes arrière, ÉNORME dôme osseux bombé et lisse au sommet du crâne (jusqu'à 22 cm d'os épais, son trait unique, comme un casque), museau court bordé de petits noeuds et pointes osseuses, longue queue raide tenue à l'horizontale, petits bras",
  carcharodontosaurus: "gigantesque théropode carnivore bipède d'environ 13 m marchant sur 2 pattes arrière, immense crâne allongé garni de longues dents plates tranchantes en lame de couteau (comme un requin), museau puissant, petits bras à trois doigts, longue queue musclée pour l'équilibre, silhouette de super-prédateur massif",
  quetzalcoatlus: "immense reptile volant (ptérosaure) haut comme une girafe (~5 m debout), très long cou, longue tête étroite avec un grand bec pointu sans dents, petite crête basse. Au sol il marche à QUATRE PATTES comme une chauve-souris géante repliée : les ailes se plient et les grands doigts servent d'appui devant, les deux pattes arrière sont de vraies pattes solides. Les ailes sont de grandes membranes de peau tendues entre le corps et un unique 4e doigt très allongé, repliées le long du corps quand il marche. Le dos est lisse et musclé (une simple échine), sans aucune nageoire ni voile. Corps couvert d'un duvet fin (pycnofibres)",
  hatzegopteryx: "grand reptile volant (ptérosaure azhdarchidé) d'environ 3 m debout, 10 m d'envergure ailes déployées. Sa signature : un cou COURT, ÉPAIS et très musclé (tout le contraire du cou fin et allongé du Quetzalcoatlus) et une tête énorme et massive au grand bec pointu sans dents. Au sol il marche à QUATRE PATTES : les ailes se replient et les grands doigts servent d'appui devant, les deux pattes arrière sont de vraies pattes solides. Les ailes sont de grandes membranes de peau tendues entre le corps et un unique 4e doigt très allongé. Queue très courte. Corps couvert d'un duvet fin (pycnofibres)",
  saurolophus: "hadrosaure (dinosaure à bec de canard) d'environ 9 m de long et 3 m de haut, herbivore, quadrupède au repos et bipède quand il se dresse. SA SIGNATURE, LE PROFIL DU CRÂNE (le point le plus important de l'image, à rendre net et lisible) : vu de profil, la ligne du dessus de la tête forme UNE SEULE PENTE DROITE ET CONTINUE qui part du bout du bec, remonte tout le long du museau et se PROLONGE au-delà de l'arrière du crâne en une POINTE d'OS PLEIN dirigée vers l'ARRIÈRE ET VERS LE HAUT, inclinée à environ 45 degrés vers le ciel. Cette pointe fait partie du crâne lui-même, taillée dans la même masse d'os que le museau : sa base est LARGE et SOUDÉE au crâne juste derrière l'œil, dans la continuité directe de la pente du front, et elle s'affine régulièrement jusqu'à son extrémité. Elle est TRIANGULAIRE, ÉTROITE, pleine et solide. LONGUEUR (à respecter précisément) : elle est COURTE — nettement plus courte que le museau, environ le tiers de la longueur museau-plus-crâne ; de profil, son extrémité arrive à peine plus haut que le sommet du dos, et le museau reste de loin la partie la plus longue de la tête. La tête entière ressemble ainsi à un coin, une pointe de flèche trapue qui monte vers l'arrière. Le sommet du crâne reste LISSE et OSSEUX, de la même couleur que la tête. Museau long et large terminé par un bec plat de canard pour brouter, batterie de dents en rangées à l'arrière des joues, corps robuste, dos porté par une échine haute, longue queue épaisse et musclée tenue à l'horizontale, pattes arrière puissantes à 3 doigts à sabots, mains à sabots pour l'appui au sol, peau couverte d'écailles fines en galets",
  utahraptor: "grand droméosaure (raptor) bipède d'environ 6 m couvert de PLUMES sur tout le corps, longues plumes formant des ailes aux bras et un panache à la queue, une immense griffe recourbée en faucille rétractée sur chaque pied (son arme), tête d'oiseau de proie garnie de dents, cou souple, corps agile et athlétique",
  ophthalmosaurus: "corps fuselé de dauphin d'environ 6 m, yeux énormes d'environ 23 cm (les plus grands proportionnellement du règne animal), museau court et fin, grande nageoire dorsale triangulaire, queue verticale en croissant",
  liopleurodon: "pliosaure trapu et massif d'environ 6-7 m, tête énorme représentant près d'un cinquième du corps avec de longues mâchoires puissantes, cou court et épais, 4 grandes nageoires propulsives",
  archelon: "tortue marine géante d'environ 4 m de long et 4,9 m d'envergure de nageoires, large carapace bombée recouverte de peau coriace, immenses nageoires antérieures en forme d'aile, tête puissante à bec crochu",
  shonisaurus: "ichtyosaure géant d'environ 15 m au corps massif et allongé de baleine, long museau étroit, 4 longues nageoires fines, silhouette élancée",
  patagotitan: "titanosaure colossal d'environ 37 m, très long cou et très longue queue, corps massif porté par 4 pattes-piliers énormes, petite tête, l'un des plus gros animaux terrestres de tous les temps",
  centrosaurus: "cératopsien trapu d'environ 5,5 m à une seule grande corne nasale recourbée, collerette osseuse bordée de crochets recourbés, bec de perroquet, 4 pattes robustes",
  ichthyosaurus: "reptile marin en forme de dauphin d'environ 2 à 4 m, museau long et fin garni de petites dents, grands yeux, nageoire dorsale triangulaire, queue verticale en croissant",
  // Mégafaune Cénozoïque (2026-07-04) : pas de fiche Grokipedia dédiée, signatures manuelles fact-checkées.
  mammuthus: "mammouth laineux massif d'environ 5,5 m, 2 longues défenses très recourbées vers le haut et se croisant, corps entièrement couvert d'une épaisse fourrure brune-rousse hirsute, grosse bosse de graisse au sommet du crâne et entre les épaules, petites oreilles",
  smilodon: "félin trapu et musclé d'environ 1,75 m de long et 1 m au garrot (un enfant d'1 m lui arrive au sommet du dos), 2 immenses canines supérieures recourbées en forme de sabre dépassant largement de la mâchoire même fermée (bien visibles), pattes avant très puissantes, queue courte, silhouette basse et massive. ROBE : fauve uni ou légèrement tachetée (comme un lion ou un puma), surtout PAS de rayures de tigre — ce n'était pas un tigre",
  megatherium: "paresseux terrestre géant d'environ 6 m capable de se dresser debout sur ses pattes arrière en s'appuyant sur sa queue épaisse, immenses griffes recourbées aux pattes avant, corps massif couvert de poils rêches, petite tête allongée",
  paraceratherium: "rhinocéros géant SANS corne d'environ 7-8 m, très long cou vertical rappelant une girafe, tête allongée et fine, pattes-piliers très hautes et massives, peau épaisse sans poil dense",
  glyptodon: "carapace osseuse arrondie massive couvrant tout le dos (comme un dôme rigide), tête basse casquée d'os, pattes courtes et trapues, chez certains une queue en massue à la toute fin",
  aenocyon: "loup robuste et trapu d'environ 1,7 m, tête large et massive avec mâchoires puissantes, pattes plus courtes et épaisses qu'un loup moderne, épaisse fourrure",
  coelodonta: "rhinocéros massif d'environ 3,5 m entièrement couvert d'une épaisse fourrure brune-rousse, longue corne frontale aplatie et recourbée vers l'arrière (comme un sabre), corne nasale secondaire plus petite, corps trapu",
  titanis: "grand oiseau coureur d'environ 1,9 m de haut, ailes minuscules inutilisables réduites à des moignons, bec massif et crochu très haut, très longues pattes musclées de coureur, plumage dense",
  edmontonia: "corps bas et trapu d'environ 6,6 m couvert de plaques osseuses ovales sur le dos, grandes épines pointues recourbées vers l'avant sur les épaules et les côtés du cou, tête triangulaire basse, queue FINE et effilée qui se termine en pointe SANS aucune boule ni massue au bout (contrairement à l'Ankylosaure)",
  pentaceratops: "grand cératopsien quadrupède d'environ 6 m avec une TÊTE ÉNORME (crâne jusqu'à 2,3 m, parmi les plus grandes têtes de tous les animaux terrestres). CINQ cornes, son trait unique (d'où son nom) : DEUX grandes cornes frontales longues recourbées vers l'avant au-dessus des yeux (plus d'1 m) + UNE corne nasale courte sur le museau + DEUX petites cornes pointues sur les JOUES (une de chaque côté, sous les yeux, à bien montrer). Immense collerette osseuse rectangulaire dressée derrière le crâne avec deux grandes fenêtres et des pointes triangulaires sur tout le bord. Bec crochu de perroquet, corps trapu, 4 pattes robustes",
  // Vague 2026-07-25 : 3 dinosaures + 4 synapsides du Permien (famille « Avant les dinosaures »).
  // Pas de fiche Grokipedia captée → signatures manuelles fact-checkées (Grokipedia + Wikipedia).
  minmi: "petit dinosaure herbivore BLINDÉ quadrupède d'environ 3 m, corps bas et large porté près du sol, dos couvert d'un pavage de plaques osseuses (ostéodermes) et VENTRE également protégé par de petites plaques osseuses (son trait unique), pattes nettement plus LONGUES et élancées que celles des autres dinosaures à armure, ce qui lui donne une allure de coureur, queue longue et souple se terminant en pointe fine. Tête petite tenue basse, montrée sobrement et de loin",
  scutellosaurus: "tout petit dinosaure herbivore BIPÈDE d'environ 1,2 m, à peine plus gros qu'un gros chat, silhouette légère et agile courant sur deux pattes arrière fines, plus de 300 minuscules plaques osseuses en mosaïque parsemant le dos, les flancs et la queue (une armure très légère), TRÈS LONGUE queue fine tenue à l'horizontale servant de balancier et représentant plus de la moitié de la longueur totale, petite tête basse à museau court, bras courts",
  // Ajouté 2026-09-03 (71e dino). Anatomie vérifiée : Norman 2020, Zoological Journal
  // of the Linnean Society, « the dermal skeleton » — 3 rangées d'ostéodermes de chaque
  // côté du torse, AUCUNE rangée médiane sur le dos (c'est ce qui le distingue du
  // Stégosaure), 4 rangées autour de la queue, mosaïque de petits ostéodermes entre les
  // gros, et deux petites cornes à l'arrière du crâne.
  scelidosaurus: "dinosaure herbivore BLINDÉ quadrupède d'environ 4 m de long et 1,2 m de haut, corps bas et trapu porté par quatre pattes solides, les pattes arrière un peu plus longues que celles de devant. SON ARMURE (le trait à rendre le plus lisible) : des centaines de petites plaques osseuses (ostéodermes) plantées dans la peau et alignées en RANGÉES HORIZONTALES régulières qui courent du cou jusqu'au bout de la queue, trois rangées de chaque côté du torse le long du dos et des flancs, quatre rangées autour de la queue, et entre les grosses plaques une mosaïque de plaques minuscules qui rend la peau épaisse et souple comme un cuir clouté. Le dessus du dos reste ARRONDI et régulier, l'armure est faite de petits boutons osseux alignés à plat sur la peau. Deux petites cornes osseuses pointent à l'arrière du crâne, derrière les yeux. Tête petite et allongée tenue BASSE près du sol, museau étroit terminé par un bec corné pour brouter les plantes basses, petites dents en feuille. Longue queue épaisse à la base qui s'effile en pointe, tenue au-dessus du sol. Pattes courtes à quatre doigts à sabots",
  maiasaura: "grand dinosaure herbivore à BEC DE CANARD (hadrosaure) d'environ 9 m, large bec plat et corné à l'avant du museau, petite crête osseuse basse et solide en forme de barre juste devant les yeux (une simple bosse compacte), corps massif au dos arqué, marchant à quatre pattes et capable de se redresser sur les deux pattes arrière, longue queue épaisse tenue à l'horizontale",
  edaphosaurus: "reptile-mammalien herbivore quadrupède d'environ 3 m, GRANDE VOILE dressée sur tout le dos tendue entre de longues épines verticales, et sur ces épines de petites BARRES TRANSVERSALES en travers, comme les traverses d'une échelle (son trait unique, qui le distingue du Dimétrodon), tête PETITE et courte, disproportionnée par rapport au corps, corps trapu en tonneau, pattes écartées sur les côtés à la façon d'un lézard, queue épaisse",
  gorgonops: "prédateur préhistorique quadrupède d'environ 1,8 m à l'allure de gros chien massif, deux immenses CANINES supérieures recourbées en sabre dépassant de la mâchoire même fermée (son arme), crâne long et massif à museau puissant, pattes tenues plus DROITES SOUS le corps que celles d'un lézard (posture redressée, presque mammalienne), peau nue et lisse, queue courte et fine",
  lystrosaurus: "petit animal préhistorique herbivore quadrupède trapu d'environ 70 cm, allure de gros cochon râblé, museau LARGE et APLATI terminé par un BEC CORNÉ sans dents comme celui d'une tortue, deux petites DÉFENSES pointant vers le bas de part et d'autre du bec (son trait unique), corps en tonneau, pattes courtes et robustes écartées, queue très courte",
  moschops: "gros herbivore préhistorique quadrupède trapu d'environ 2,7 m, corps massif en tonneau au dos qui monte haut sur les épaules puis descend vers l'arrière, tête LARGE et courte à museau arrondi rappelant celle d'un veau, sommet du crâne très ÉPAISSI et bombé formant un casque osseux (son trait unique), pattes avant écartées et pattes arrière plus droites, queue courte, peau nue",
};

function getFields(id) {
  return JSON.parse(execFileSync('node', [FIELDS, id], { encoding: 'utf8' }));
}
// extrait le bloc CONTEXTE d'un dino dans la fiche Grokipedia (heuristique sur le nom)
// ⚠️ Le nom doit être ancré par \b : sans ça, un dino SANS fiche attrape la fiche d'un
// autre dont le nom le contient (Saurolophus → fiche Parasaurolophus, incident 2026-07-30 :
// crête « tubulaire creuse » injectée alors que Saurolophus a une crête d'os PLEIN).
function ficheBlock(d) {
  const keys = [d.full, d.name].filter(Boolean);
  for (const k of keys) {
    const base = k.split(/[ (]/)[0]; // 1er mot
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
// --ref <image> : référence visuelle jointe à chaque scène générée (ChatGPT seulement).
const refIdxB = process.argv.indexOf('--ref');
const REF = refIdxB > -1 ? process.argv[refIdxB + 1] : null;
// mappe un outName (baseName[_suffixe].png) vers le nom de scène canonique pour le filtre --only.
function sceneOf(outName, baseName) {
  const rest = outName.replace(baseName, '').replace(/^_/, '').replace(/\.(png|jpg)$/i, '');
  return rest || 'hero';
}
let firstGenDone = false; // pour --only : forcer un nouveau chat sur la 1re scène RÉELLEMENT générée
function gen(prompt, outName, firstOfDino, baseName) {
  // --only : sauter les scènes non demandées
  if (ONLY && baseName && !ONLY.includes(sceneOf(outName, baseName))) return 0;
  if (PREVIEW) { console.log(`\n--- [${outName}] ---\n${prompt}`); return 0; }
  const args = [GEN, prompt, OUTD + '/' + outName];
  // 1re scène d'un dino = nouveau chat dans le projet. En mode --only, la 1re scène réellement
  // générée doit ouvrir un nouveau chat même si ce n'est pas le hero.
  const openNew = ONLY ? !firstGenDone : firstOfDino;
  if (openNew) args.push(...(USE_GROK ? ['--new'] : ['--url', GPTS]));
  // --ref : image de référence morphologique jointe à CHAQUE scène (leçon L-D-59).
  // Typiquement le hero validé, pour que les scènes secondaires gardent la même bête.
  if (REF && !USE_GROK) args.push('--ref', REF);
  firstGenDone = true;
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

function logProgress(id, scene, status) {
  appendFileSync(PROGRESS, `${new Date().toISOString()}\t${id}\t${scene}\t${status}\n`);
}

// ÉCHELLE : on donne les MESURES RÉELLES brutes + l'enfant fait 1 m. Le modèle cale le ratio lui-même.
// (Ne pas sur-instruire « il arrive au genou / ×fois » : ça embrouille et introduit des erreurs.)
function scaleSentence(d) {
  const m = [];
  if (parseFloat(d.taille_m)) m.push(`longueur ${d.taille_m} m`);
  if (parseFloat(d.hauteur_m)) m.push(`hauteur au garrot ${d.hauteur_m} m`);
  if (parseFloat(d.poids_t)) m.push(`poids ${d.poids_t} t`);
  return m.length
    ? `Il mesure ${m.join(', ')} en vrai ; un enfant d'1 m est tout petit à côté.`
    : '';
}
// formate les mesures en prose naturelle : "26 m de long, 4,5 m au garrot, 12 t"
function mesuresProse(d) {
  const p = [];
  if (parseFloat(d.taille_m)) p.push(`${String(d.taille_m).replace('.', ',')} m de long`);
  if (parseFloat(d.hauteur_m)) p.push(`${String(d.hauteur_m).replace('.', ',')} m de haut`);
  if (parseFloat(d.poids_t)) p.push(`${String(d.poids_t).replace('.', ',')} tonnes`);
  return p.length ? `Il fait ${p.join(', ')} en vrai — un enfant d'1 m lui arrive tout en bas.` : '';
}

// Mesures globales en prose (toujours présentes). Hauteur : la fiche prime sur la data si dispo.
function mesuresGlobales(d) {
  const p = [];
  // Chez les volants (taille_vol), taille_m est l'ENVERGURE, pas la longueur du corps.
  // Le dire "de long" faisait dessiner un corps de 10 m (2026-07-20, ajout Hatzegopteryx).
  if (parseFloat(d.taille_m)) {
    const v = String(d.taille_m).replace('.', ',');
    p.push(d.taille_vol ? `${v} m d'envergure, ailes déployées` : `${v} m de long`);
  }
  const hf = hauteurFiche(d);
  const h = hf || (parseFloat(d.hauteur_m) ? String(d.hauteur_m).replace('.', ',') : '');
  if (h) p.push(`${h} m de hauteur`);
  if (parseFloat(d.poids_t)) p.push(`${String(d.poids_t).replace('.', ',')} tonnes`);
  return p.join(', ');
}

// Construit la SECTION "LE DINOSAURE" : identité + mesures + specs morpho chiffrées (fiche) ou MORPHO manuel.
function sectionDino(d, id) {
  const regimeMot = d.regime ? d.regime.replace(/[^\p{L}\s]/gu, '').trim().toLowerCase() : '';
  const epoqueMot = d.epoque ? d.epoque.split('·')[0].trim() : '';
  const ligneId = `${d.name}${d.full && d.full !== d.name ? ` (${d.full})` : ''}, ${[regimeMot, epoqueMot && 'du ' + epoqueMot].filter(Boolean).join(' ')}.`;
  const lignes = [`- ${ligneId}`];
  // Une image jointe ne sert à rien si on ne dit pas au modèle de s'y conformer :
  // sans cette ligne il la traite comme une simple inspiration et garde son a priori.
  if (REF) lignes.push(`- RÉFÉRENCE VISUELLE — ANATOMIE SEULEMENT : l'image jointe fixe la FORME de l'animal (crâne, crête, proportions, livrée). Reproduis fidèlement la forme, la longueur et l'inclinaison de sa crête. En cas de doute entre le texte et l'image, l'IMAGE fait foi POUR L'ANATOMIE. En revanche NE COPIE PAS la mise en scène de la référence : cette nouvelle image doit montrer l'animal sous un ANGLE DIFFÉRENT et dans une POSTURE DIFFÉRENTE — change le sens dans lequel il regarde, l'orientation du corps (vue de trois quarts avant ou arrière plutôt que profil strict), la position de la tête et du cou (baissée pour brouter ou boire, relevée en alerte, tournée vers le spectateur), la position des pattes (en marche, une patte levée, au repos) et la hauteur de la caméra. C'est le même animal photographié à un autre moment, pas la même image redécorée.`);
  const mg = mesuresGlobales(d);
  if (mg) lignes.push(`- Taille réelle : ${mg}.`);
  // SILHOUETTE MAÎTRESSE martelée en tête (leçon 2026-06-19 : sans ça, silhouette passe-partout → mauvaise
  // espèce). Si une signature MORPHO manuelle existe, elle prime et vient EN PREMIER, même quand la fiche
  // fournit des puces (2026-07-05 : les puces seules ne suffisaient pas — Ceratosaurus/Pachy rendus faux).
  const puces = descPhysique(d);
  if (MORPHO[id]) lignes.push(`- Silhouette générale (RESPECTER SCRUPULEUSEMENT, c'est LE bon animal) : ${MORPHO[id]}.`);
  if (puces.length) puces.forEach(p => lignes.push(`- ${p}.`));
  const sig = ficheSignature(d);
  const sigClean = sig ? cleanPuce('**Signature** : ' + sig) : (MORPHO[id] ? '' : '');
  if (sigClean) lignes.push(`- Détail le plus reconnaissable : ${sigClean}.`);
  // COULEUR : on ne connaît pas la vraie couleur → liberté totale, on liste juste les possibilités.
  lignes.push(`- Couleur : à toi de choisir librement la livrée, comme un vrai animal sauvage. Tu peux jouer avec des teintes variées (gris-bleu, vert-olive, brun-sable, ocre, ardoise, roux, tons plus clairs sur le ventre…) et des motifs (rayures, bandes, taches, points, ocelles, dégradés, marques autour des yeux ou sur la crête). Surprends-moi avec une livrée vivante et crédible qui lui va bien.`);
  return lignes.join('\n');
}

// DÉCOR riche (2-3 lignes) : végétation ET CLIMAT de l'époque à la bonne hauteur (selon le régime/la nourriture),
// nature du sol, petite faune (insectes, libellules...). Pioche la flore mangée dans la fiche.
// ⚠️ Le climat DOIT suivre l'époque réelle : le décor Mésozoïque par défaut (fougères/flaques/mousse tempéré)
// est FAUX pour la mégafaune du Cénozoïque glaciaire (mammouth, smilodon, rhino laineux...) — corrigé 2026-07-04
// suite REX Papa Yann (pelouse verte + flaques vues sur une scène âge de glace = incohérent).
function sectionDecor(d, epoqueMot, lieu) {
  const mange = ficheMange(d);
  const flore = mange && /herbivore|fougère|conifère|palmier|cycad|feuille|plante|végétation|prêle/i.test(mange)
    ? mange.replace(/^[^:]*:?\s*/, '').replace(/\s*;.*$/, '')
    : '';
  const lignes = [`DÉCOR (très important, soigne-le) :`];
  lignes.push(`- ${lieu} du ${epoqueMot}, ambiance naturelle vivante et profonde.`);

  if (d.periode === 'cenozoique') {
    // Mégafaune de l'âge de glace (Pléistocène) : steppe froide, PAS de prairie verte ni flaques d'été.
    lignes.push(`- Climat glaciaire : steppe froide et sèche, herbes rases jaunâtres/brunes, touffes de graminées et d'armoise éparses, plaques de neige et de glace au sol, ciel froid gris-bleu ou lumière rasante d'hiver. Reliefs vallonnés dénudés, quelques rochers gelés.`);
    lignes.push(`- Sol détaillé (terre gelée, neige tassée, givre, cailloux) et petite faune discrète adaptée au froid (traces de pas dans la neige, oiseaux nordiques au loin) pour rendre la scène vivante. Pas de végétation verte luxuriante ni de flaques d'eau tiède.`);
  } else if (flore) {
    lignes.push(`- Végétation de l'époque : ${flore} ; fougères, cycadées et conifères de différentes hauteurs, certaines plus hautes que l'animal, d'autres au sol.`);
    lignes.push(`- Sol détaillé (terre, herbe, mousse, rochers, flaques ou cours d'eau selon le lieu) et petite faune discrète (insectes, libellules, petits reptiles) pour rendre la scène vivante.`);
  } else {
    lignes.push(`- Végétation préhistorique variée : fougères, cycadées, prêles et conifères de différentes hauteurs, du sol jusqu'au-dessus de l'animal.`);
    lignes.push(`- Sol détaillé (terre, herbe, mousse, rochers, flaques ou cours d'eau selon le lieu) et petite faune discrète (insectes, libellules, petits reptiles) pour rendre la scène vivante.`);
  }
  return lignes.join('\n');
}
// CAMÉRA : formulation de Papa Yann (validée 2026-06-19, meilleur résultat) — garde la queue ENTIÈRE sur les longs dinos.
// Clés : "voir l'animal en ENTIER (même si très grand)" anticipe le réflexe du modèle de zoomer ; "encore de la largeur (nature sur les bords)" = marge.
// Les volants n'ont pas de longue queue : leur extension, c'est l'envergure des ailes.
// Avec --ref, « de profil » se cumule à la référence et le modèle recopie la pose du hero :
// les scènes deviennent la même image redécorée (constat PY 2026-07-30, « on ne fait pas du
// calque »). On garde alors le plan large — indispensable pour voir l'animal en entier — mais
// on laisse l'angle libre en demandant explicitement de VARIER par rapport à la référence.
// `urbain` : en scène de ville, « de la nature sur les bords » tirait le modèle vers la forêt
// et faisait PERDRE le décor parisien (Saurolophus_paris rendu en sous-bois, 2026-07-30 ; même
// famille de defaut que Apatosaurus_paris/Dilophosaurus_paris de l'audit du 25/07). On demande
// donc de la marge « sur les bords » sans nommer la nature quand le lieu est urbain.
const camLarge = (d, urbain) => `CAMÉRA : comme une photo prise de loin, ${REF ? `sous un angle DIFFÉRENT de l'image de référence (trois quarts avant, trois quarts arrière ou profil inversé — pas le même profil)` : `de profil`}. Il est impératif de voir l'animal en ENTIER (même s'il est très grand), ${d && d.taille_vol ? `d'un bout d'aile à l'autre` : `du museau au bout de la queue`}, et d'avoir encore de la largeur sur les bords${urbain ? ` (la rue et les immeubles autour de lui)` : ` (de la nature sur les bords)`}.`;

// En-tête commun (contexte + rôle) — identique pour les 5 scènes.
const ENTETE = `CONTEXTE : illustration pour une encyclopédie de dinosaures destinée à un enfant de 4 ans.
RÔLE : illustrateur de paléoart documentaire réaliste, rigoureux sur l'anatomie et les proportions.`;
const STYLE = `STYLE : paléoart documentaire réaliste, lumière naturelle, image belle, lisible et paisible. Pas de texte ni de chiffre dans l'image.`;
// L'enfant n'appartient qu'à la scène d'échelle. Les scènes 2, 3 et 5 partagent le chat de la
// scène 1 : sans cette ligne le modèle recopiait sa première image, enfant compris (2026-07-20,
// Hatzegopteryx). Formulé en positif — dire « aucun humain » le ferait apparaître.
const SCENE_ANIMAUX_SEULS = `PEUPLEMENT : scène calme et paisible, uniquement des animaux préhistoriques, dans une nature sauvage intacte.`;

// Toutes les bêtes de l'encyclopédie ne sont PAS des dinosaures (synapsides du Permien de la
// famille « Avant les dinosaures », reptiles marins, ptérosaures). Les appeler « dinosaure » dans
// le prompt pousse le modèle vers une silhouette de dinosaure — donc le mauvais animal.
// On emploie un terme juste selon la famille (2026-07-25, vague Permien).
const NON_DINO = { volant: 'animal préhistorique', enaliosaures: 'reptile marin', pterosaures: 'reptile volant', mammiferes: 'animal préhistorique', oiseaux: 'oiseau préhistorique' };
const terme = d => (d && NON_DINO[d.famille]) || 'dinosaure';
// « LE » s'élide devant une voyelle : L'ANIMAL PRÉHISTORIQUE, mais LE DINOSAURE.
const TERME = d => { const t = terme(d).toUpperCase(); return /^[AEIOUY]/.test(t) ? `L'${t}` : `LE ${t}`; };

// Assemble un prompt en sections. `obj` = objectif, `scene` = bloc scène (enfant/décor/caméra).
function buildPrompt(d, id, obj, scene) {
  return [
    `CONTEXTE : illustration pour une encyclopédie de dinosaures et d'animaux préhistoriques destinée à un enfant de 4 ans.
RÔLE : illustrateur de paléoart documentaire réaliste, rigoureux sur l'anatomie et les proportions.`,
    `OBJECTIF : ${obj}`,
    `${TERME(d)} :\n${sectionDino(d, id)}`,
    scene,
    STYLE,
  ].join('\n\n');
}

for (const id of ids) {
  const d = getFields(id);
  const baseName = d.png.replace(/^grok\//, '').replace(/\.(jpg|png)$/i, ''); // ex: Tyrannosaurus
  const marin = MARIN_FLAG;
  const epoqueMot = d.epoque ? d.epoque.split('·')[0].trim() : 'son époque';
  console.log(`\n========== ${id} (${d.name}) ${marin ? '[MARIN]' : ''} ==========`);

  const habitat = marin ? `au bord de la mer` : `dans la nature`;

  // #1 ÉCHELLE — enfant repère, intégré naturellement.
  const posEnfant = marin
    ? `au bord de l'eau, sur une avancée rocheuse ou un ponton de bois`
    : `au premier plan, posé dans le décor`;
  // Phrase d'échelle relative VRAIE : ne jamais dire "l'enfant minuscule" si l'animal n'est pas
  // significativement plus grand que l'enfant (1 m) — corrigé 2026-07-04 suite REX loup terrible
  // (0,85 m de haut, à peine plus qu'un grand chien) rendu à tort plus haut que l'enfant.
  const hAnimal = parseFloat(d.hauteur_m) || parseFloat(d.taille_m) || 0;
  // Ratio chiffré pour les colosses : le modèle sous-dimensionne les géants (T-Rex/sauropodes rendus
  // à ~5-6 m au lieu de 12) → on lui donne le facteur explicite (2026-07-05, REX audit visuel).
  const ratio = hAnimal >= 1 ? Math.round(hAnimal) : 0;
  const phraseEchelle = hAnimal >= 6
    ? `ÉCHELLE CAPITALE : cet animal fait ${String(d.hauteur_m).replace('.', ',')} m de haut, soit ${ratio} FOIS la hauteur de l'enfant d'1 m. L'enfant doit paraître TOUT PETIT, lui arrivant à peine en haut de la patte ou au bas du ventre — comme un enfant au pied d'un immeuble. Reculer BEAUCOUP la caméra pour que l'animal ENTIER tienne quand même dans le cadre malgré sa taille écrasante.`
    : hAnimal >= 3
    ? `ÉCHELLE : cet animal fait ${String(d.hauteur_m).replace('.', ',')} m de haut, soit environ ${ratio} fois la hauteur de l'enfant d'1 m — il le domine nettement, l'enfant lui arrive au niveau des pattes. Rendre ce rapport de taille clairement.`
    : hAnimal >= 1.5
    ? `L'enfant minuscule à côté, dans le décor, donne l'échelle réelle.`
    : hAnimal >= 0.9
    ? `L'animal est à peu près à la même hauteur que l'enfant, ou légèrement plus grand — respecter STRICTEMENT ce rapport de taille proche, ne pas exagérer.`
    : `L'animal est PLUS PETIT que l'enfant en hauteur (comme un grand chien ou plus petit) — respecter STRICTEMENT cette taille réduite, l'enfant ne doit pas paraître minuscule à côté.`;
  logProgress(id, '1-echelle', 'start');
  gen(buildPrompt(d, id,
    `montrer la taille réelle de l'animal en le comparant à un enfant.`,
    `L'ENFANT :\n- un petit garçon de 4 ans, 1 m de haut, t-shirt et short, ${posEnfant}, calme, en train d'observer l'animal.\n\n${sectionDecor(d, epoqueMot, habitat)}\n\n${camLarge(d)} ${phraseEchelle}`),
    `${baseName}.png`, true, baseName);
  logProgress(id, '1-echelle', 'done');

  // #2 ALIMENTATION
  logProgress(id, '2-manger', 'start');
  gen(buildPrompt(d, id,
    `montrer l'animal en train de se nourrir, tranquillement.`,
    `SCÈNE : un ou quelques individus se nourrissent paisiblement (un herbivore broute la végétation à sa hauteur ; un chasseur cherche sa nourriture ou pêche, le repas seulement suggéré). Postures naturelles.\n\n${SCENE_ANIMAUX_SEULS}\n\n${sectionDecor(d, epoqueMot, habitat)}\n\n${camLarge(d)}`),
    `${baseName}_manger.png`, false, baseName);
  logProgress(id, '2-manger', 'done');

  // #3 INTERACTION ÉCOLOGIQUE
  logProgress(id, '3-ecosysteme', 'start');
  const voisins = ficheVitAvec(d);
  gen(buildPrompt(d, id,
    `montrer l'animal dans son écosystème, au milieu des autres animaux de son temps.`,
    `SCÈNE : l'animal (en groupe si c'est plausible) cohabite paisiblement avec d'autres animaux de la même époque et région${voisins ? ` (par exemple : ${voisins})` : ''}, autour d'un point d'eau. Vie quotidienne sereine.\n\n${SCENE_ANIMAUX_SEULS}\n\n${sectionDecor(d, epoqueMot, `dans ${d.region || 'sa région'}`)}\n\nCAMÉRA : grande scène d'ambiance, caméra très reculée, vue large et profonde ; l'animal principal bien visible mais le paysage et les autres animaux remplissent la scène.`),
    `${baseName}_ecosysteme.png`, false, baseName);
  logProgress(id, '3-ecosysteme', 'done');

  // #4 PARIS (ou aquarium pour marin)
  logProgress(id, '4-paris', 'start');
  const sceneUrbain = marin
    ? `SCÈNE : l'animal dans un grand bassin d'un aquarium public moderne, des visiteurs adultes l'observant, ce qui donne son échelle réelle.\n\nDÉCOR : aquarium public moderne, grandes vitres, éclairage bleuté, plantes aquatiques, public adulte autour.\n\n${camLarge(d, true)}`
    : `SCÈNE : l'animal, paisible, dans une grande avenue de Paris aujourd'hui, à côté d'un bus de ville parisien, de voitures et de passants adultes, ce qui donne son échelle réelle ; la ville est calme.\n\nLE BUS (important, à respecter) : un bus urbain moderne aux couleurs de la RATP, c'est-à-dire une carrosserie BLANCHE avec un large bandeau VERT JADE qui court le long des vitres, et le toit blanc. C'est un bus BLANC ET VERT, la livrée des bus de Paris.\n\nDÉCOR OBLIGATOIRE — LA SCÈNE SE PASSE EN PLEINE VILLE : grande avenue parisienne moderne, immeubles haussmanniens en pierre claire avec balcons en fer forgé, chaussée goudronnée et passage piéton, trottoirs, ce bus blanc et vert, voitures, passants adultes, mobilier urbain, lumière de jour. L'animal est AU MILIEU DE LA RUE, entouré de bâtiments : c'est une scène urbaine, pas une scène de nature.\n\n${camLarge(d, true)}`;
  gen(buildPrompt(d, id, `montrer la taille de l'animal dans une ville moderne familière.`, sceneUrbain),
    `${baseName}_paris.png`, false, baseName);
  logProgress(id, '4-paris', 'done');

  // #5 CONTEXTUELLE (funfact)
  logProgress(id, '5-funfact', 'start');
  gen(buildPrompt(d, id,
    `mettre en valeur ce qui rend cet animal remarquable.`,
    `SCÈNE : illustrer joliment cette particularité — « ${d.fait} » — dans une belle scène, de façon impressionnante et douce pour un enfant.\n\n${SCENE_ANIMAUX_SEULS}\n\n${sectionDecor(d, epoqueMot, habitat)}\n\nCAMÉRA : cadrage qui met bien en valeur la particularité, caméra reculée, sujet entier visible avec de l'air autour.`),
    `${baseName}_funfact.png`, false, baseName);
  logProgress(id, '5-funfact', 'done');

  console.log(`---------- ${id} terminé (5 scènes) ----------`);
}
console.log('\n✅ Batch terminé pour:', ids.join(', '));
