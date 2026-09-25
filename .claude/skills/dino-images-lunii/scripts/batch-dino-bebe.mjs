// Batch BÉBÉ DANS L'ŒUF — 1 image par dino : le bébé qui vient d'éclore, chibi mais réaliste,
// avec la signature de son espèce en version juvénile. Affiché à l'éclosion du Nid (nid-ui.js).
// Demande Papa Yann 2026-09-25 : « l'œuf éclos et on voit CET animal, ce qui le rend unique, en juvénile ».
//
// Chat ChatGPT LIBRE (pas le projet Dinosaure : son prompt système impose l'enfant d'1 m et le décor).
// Style validé sur la brique Tricératops 2026-09-25.
//
// Usage: node batch-dino-bebe.mjs <id1> [id2] ...     (ids de dino-fields.mjs --list)
//        node batch-dino-bebe.mjs --preview <id>        (affiche le prompt sans générer)
// Sortie brute : site/img/dinos/_new-bebes/<Nom>_bebe_<n>.png (staging gitignoré, jamais écrasé)
// Livrable     : site/img/dinos/bebes/<Nom>_bebe.webp (détouré rembg) — seulement si absent.
import { existsSync, mkdirSync, appendFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const ROOT = 'c:/ProjetsPerso/Claude_Projects/MaxPlay';
const SKILL = ROOT + '/.claude/skills/dino-images-lunii/scripts';
const DETOURE = ROOT + '/studio/dino/content/scripts/images-grok/bebe_detoure.py';
const STAGING = ROOT + '/site/img/dinos/_new-bebes';
const PROD = ROOT + '/site/img/dinos/bebes';
const PROGRESS = STAGING + '/_PROGRESS.tsv';
mkdirSync(STAGING, { recursive: true });
mkdirSync(PROD, { recursive: true });

// Signature JUVÉNILE : ce qui fait reconnaître l'espèce au premier coup d'œil, en petit.
// Formulé en POSITIF (zéro Streisand). Les vivipares sont dans VIVIPARE plus bas :
// ils ne sortent pas d'un œuf (encyclopédie = VRAI).
const BEBE = {
  tyrannosaurus: "énorme tête massive pour son petit corps, minuscules bras à deux doigts, fin duvet de plumes sur le dos, grandes pattes arrière puissantes",
  spinosaurus: "petite voile dorsale déjà dressée sur le dos, long museau étroit de crocodile, petites pattes avant griffues",
  giganotosaurus: "grande tête allongée aux petites dents, petites crêtes rugueuses au-dessus des yeux, bras courts à trois doigts",
  carcharodontosaurus: "longue tête étroite aux petites dents plates, bras courts à trois doigts, peau écailleuse",
  allosaurus: "deux petites cornes rugueuses devant les yeux, crête basse sur le museau, bras à trois doigts griffus",
  tarbosaurus: "grosse tête profonde, bras minuscules à deux doigts, fin duvet sur le dos",
  albertosaurus: "tête fine allongée, petites bosses au-dessus des yeux, bras minuscules à deux doigts, corps élancé",
  ceratosaurus: "petite corne naissante sur le museau, deux petites bosses au-dessus des yeux, rangée de petites plaques osseuses le long du dos",
  dilophosaurus: "deux fines crêtes arrondies parallèles sur le dessus de la tête, museau fin avec une encoche",
  carnotaurus: "deux petites cornes de taureau au-dessus des yeux, museau court et haut, bras minuscules",
  cryolophosaurus: "petite crête transversale ondulée sur le front, comme une banane posée en travers de la tête",
  brachiosaurus: "cou long dressé vers le haut, petite bosse sur le front au-dessus des narines, pattes avant plus longues que les pattes arrière",
  diplodocus: "long cou fin, queue très longue et fine en fouet enroulée autour de l'œuf, petite tête allongée",
  apatosaurus: "cou épais et long, corps massif, longue queue enroulée autour de l'œuf, petite tête",
  camarasaurus: "tête courte et haute en boîte, cou moyen, corps trapu",
  amargasaurus: "deux rangées de petites épines dressées le long du cou",
  plateosaurus: "long cou, petite tête, mains à grand pouce griffu, pose à demi dressée",
  ankylosaurus: "dos couvert de petites plaques osseuses, petite massue ronde au bout de la queue, petites cornes à l'arrière de la tête",
  euoplocephalus: "dos couvert de petites plaques osseuses, paupières osseuses, petite massue au bout de la queue",
  edmontonia: "dos couvert de plaques osseuses, petites pointes sur les épaules",
  minmi: "tout petit dos couvert de petites plaques osseuses, museau court",
  scutellosaurus: "dos couvert de petits boucliers osseux alignés, longue queue fine, marche sur deux pattes",
  scelidosaurus: "rangées de petites bosses osseuses sur le dos et les flancs, marche à quatre pattes",
  stegosaurus: "double rangée de petites plaques en losange sur le dos, quatre petites pointes au bout de la queue, toute petite tête",
  kentrosaurus: "petites plaques sur le cou et l'avant du dos, puis longues épines pointues sur l'arrière et la queue",
  triceratops: "collerette osseuse déjà bien visible avec son bord festonné, trois petites cornes naissantes (deux au-dessus des yeux, une sur le nez), bec de perroquet",
  torosaurus: "très grande collerette percée de deux trous ronds, deux cornes naissantes au-dessus des yeux, bec de perroquet",
  protoceratops: "petite collerette arrondie, bec de perroquet, museau court, pas de corne",
  pentaceratops: "très haute collerette pointue, petite corne sur le nez, deux cornes au-dessus des yeux, petites cornes sur les joues",
  parasaurolophus: "petite bosse de crête qui commence à pousser vers l'arrière du crâne, bec de canard",
  corythosaurus: "petite crête arrondie en demi-assiette sur le dessus de la tête, bec de canard",
  maiasaura: "petit bec de canard, petite bosse au-dessus des yeux, attitude de bébé bien nourri",
  saurolophus: "bec de canard plat, la ligne du museau se prolonge derrière le crâne en une petite pointe osseuse DROITE et courte, dirigée vers l'arrière et vers le haut",
  edmontosaurus: "large bec de canard plat, tête allongée, petite crête de peau sur le dessus de la tête",
  iguanodon: "pouce en forme de petite pointe conique sur chaque main, bec, tête de cheval allongée",
  pachycephalosaurus: "petit dôme bombé sur le dessus du crâne entouré de petites bosses et picots",
  velociraptor: "couvert de plumes duveteuses, grande griffe recourbée relevée sur chaque pied, museau fin, bras emplumés",
  deinonychus: "couvert de plumes, grande griffe en faucille relevée sur chaque pied, longue queue raide",
  utahraptor: "couvert de plumes, énorme griffe recourbée relevée sur chaque pied, tête d'oiseau de proie",
  microraptor: "plumes noires irisées, petites ailes aux bras ET aux pattes arrière, longue queue en éventail",
  troodon: "grands yeux énormes tournés vers l'avant, couvert de plumes, griffe relevée sur chaque pied",
  gallimimus: "silhouette d'autruche, long cou fin, petit bec sans dents, longues pattes, plumes",
  oviraptor: "bec court sans dents de perroquet, petite crête arrondie sur la tête, plumes",
  pteranodon: "longue crête pointue vers l'arrière de la tête, long bec pointu sans dents, ailes de peau repliées",
  quetzalcoatlus: "très long bec pointu sans dents, long cou raide, ailes de peau repliées, fin duvet",
  hatzegopteryx: "bébé reptile volant à la tête ÉNORME et massive, bec épais et large à la base, sans dents, cou COURT et très épais, ailes de peau repliées, fin duvet ras",
  archaeopteryx: "vraies plumes d'oiseau, ailes avec trois doigts griffus, longue queue osseuse emplumée, petites dents dans le bec",
  baryonyx: "long museau de crocodile, grande griffe recourbée sur chaque pouce, petite crête sur le nez",
  therizinosaurus: "très longues griffes en forme de faux aux mains, petite tête, ventre rond, duvet de plumes",
  dimetrodon: "grande voile sur le dos, grosse tête aux dents de tailles différentes, pattes écartées de lézard",
  edaphosaurus: "TOUTE PETITE tête courte et étroite (minuscule par rapport au corps), corps large en tonneau, voile sur le dos dont chaque épine porte de nombreuses petites barres transversales comme des branches, pattes écartées de lézard",
  gorgonops: "tête allongée de chien-lézard, deux longues canines qui dépassent, pattes sous le corps",
  lystrosaurus: "deux petites défenses qui descendent, bec corné, corps trapu comme un petit cochon",
  moschops: "crâne épais et bombé, corps massif en tonneau, pattes avant écartées",
  archelon: "bébé tortue marine, carapace aplatie, grandes nageoires avant, bec crochu",
  patagotitan: "cou long, corps massif, pattes piliers, petite tête, longue queue enroulée autour de l'œuf",
  centrosaurus: "une petite corne naissante sur le nez, collerette bordée de petits crochets, bec de perroquet",
  titanis: "oiseau terreur : grand bec crochu énorme, plumes, longues pattes, petites ailes",
};

// Vivipares (GO PY 2026-09-25) : pas d'œuf. Les marins naissent dans l'eau (aquarium du
// Nid), on les dessine en train de nager ; les mammifères naissent dans une tanière de
// paille, on les dessine couchés dans leur petit nid de paille.
const VIVIPARE = {
  mosasaurus: ['eau', "tête de varan au long museau garni de petites dents, corps allongé, quatre nageoires en pagaie, queue terminée par une petite nageoire en croissant"],
  elasmosaurus: ['eau', "cou très long, plus long que le corps, toute petite tête, corps en tonneau, quatre grandes nageoires en pagaie"],
  ophthalmosaurus: ['eau', "yeux ÉNORMES, corps de petit dauphin, museau fin, nageoire dorsale triangulaire, queue verticale en croissant"],
  liopleurodon: ['eau', "grosse tête aux longues mâchoires, cou court, corps trapu, quatre grandes nageoires"],
  shonisaurus: ['eau', "long corps de petite baleine, long museau étroit, quatre longues nageoires fines"],
  ichthyosaurus: ['eau', "corps de petit dauphin, long museau fin garni de petites dents, grands yeux, nageoire dorsale triangulaire, queue en croissant"],
  mammuthus: ['paille', "fourrure brun-roux hirsute, petite trompe, toutes petites défenses naissantes, petites oreilles rondes"],
  smilodon: ['paille', "bébé félin au pelage tacheté de lionceau, deux petites canines en sabre qui commencent à dépasser de la lèvre, grosses pattes"],
  megatherium: ['paille', "bébé paresseux géant aux poils rêches, grandes griffes recourbées aux mains, museau allongé"],
  paraceratherium: ['paille', "bébé rhinocéros sans corne, très long cou, longues pattes fines, tête allongée"],
  glyptodon: ['paille', "petite carapace ronde en dôme faite de plaques hexagonales, petit casque osseux sur le dessus de la tête, queue annelée"],
  aenocyon: ['paille', "louveteau au pelage gris-brun, grosse tête aux mâchoires puissantes, oreilles dressées"],
  coelodonta: ['paille', "bébé rhinocéros laineux à la fourrure épaisse, petite corne naissante sur le nez"],
};

function promptVivipare(name, lieu, sig) {
  const scene = lieu === 'eau'
    ? `un bébé ${name} qui vient de naître, en train de nager, vu de profil trois quarts, l'animal entier dans le cadre`
    : `un bébé ${name} qui vient de naître, couché dans un petit nid de paille tout rond, l'animal entier et le nid dans le cadre`;
  return `Illustration : ${scene}. `
    + "Style réaliste et mignon, façon film d'animation haut de gamme : vraie texture de peau ou de fourrure, lumière douce. "
    + "Proportions de nouveau-né : grosse tête, grands yeux brillants, corps dodu. "
    + `On le reconnaît au premier coup d'œil : ${sig}. `
    + "Couleurs naturelles. Centré, fond gris clair uni. Pas de texte.";
}

function nomFichier(id) {
  const line = execFileSync('node', [SKILL + '/dino-fields.mjs', id], { encoding: 'utf8' });
  const d = JSON.parse(line);
  return { nom: d.png.replace(/\.[a-z]+$/i, ''), name: d.name };
}

function prompt(name, sig) {
  return `Illustration : un bébé ${name} qui vient tout juste d'éclore, assis dans sa coquille d'œuf fendue. `
    + "Style réaliste et mignon, façon film d'animation haut de gamme : vraie texture de peau (écailles fines, ou plumes/duvet si l'espèce en a), lumière douce. "
    + "Proportions de nouveau-né : grosse tête, grands yeux brillants, corps dodu, petites pattes. "
    + `On le reconnaît au premier coup d'œil : ${sig}. `
    + "Couleurs naturelles vives. Vue de trois quarts face, l'animal entier et la coquille dans le cadre, centré, fond gris clair uni. Pas de texte.";
}

function nextFree(nom) {
  let n = 1;
  while (existsSync(`${STAGING}/${nom}_bebe_${n}.png`)) n++;
  return `${STAGING}/${nom}_bebe_${n}.png`;
}

const PREVIEW = process.argv.includes('--preview');
const ids = process.argv.slice(2).filter(a => !a.startsWith('--'));
if (!ids.length) { console.log('usage: node batch-dino-bebe.mjs [--preview] <id1> [id2] ...'); process.exit(1); }

for (const id of ids) {
  const viv = VIVIPARE[id];
  const sig = BEBE[id];
  if (!sig && !viv) { console.log(`⏭  ${id} : id sans signature bébé — ignoré`); continue; }
  const { nom, name } = nomFichier(id);
  const p = viv ? promptVivipare(name, viv[0], viv[1]) : prompt(name, sig);
  if (PREVIEW) { console.log(p); continue; }
  const out = nextFree(nom);
  console.log(`\n🥚 ${name} → ${out}`);
  try {
    execFileSync('node', [SKILL + '/gpt-gen.mjs', p, out, '--new'], { stdio: 'inherit' });
  } catch (e) {
    appendFileSync(PROGRESS, `${id}\techec_gen\t${e.status}\n`);
    if (e.status === 2) { console.log('✗ pas logué — arrêt'); process.exit(2); }
    console.log(`✗ ${id} : génération échouée (exit ${e.status}) — on passe au suivant`);
    continue;
  }
  const prod = `${PROD}/${nom}_bebe.webp`;
  if (existsSync(prod)) {
    console.log(`ℹ ${prod} existe déjà — variante gardée en staging, choisir à l'œil`);
    appendFileSync(PROGRESS, `${id}\tvariante\t${out}\n`);
    continue;
  }
  execFileSync('python', [DETOURE, out, prod], { stdio: 'inherit' });
  appendFileSync(PROGRESS, `${id}\tok\t${prod}\n`);
}
