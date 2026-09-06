// Batch images FLORE (HO-022) — 2 scènes par plante, pilote gpt-gen-dino.mjs / grok-gen-dino.mjs.
//   #1 <Id>.jpg        : la plante ENTIÈRE dans son décor d'époque + enfant d'1 m comme mètre-étalon
//   #2 <Id>_detail.jpg : gros plan feuille / cône / fleur / graines (le "format" demandé par PY)
// Source : studio/dino/content/sources/flore/plantes.json (produit par HO-020).
// Méthode = skill dino-paleoart : prompt en SECTIONS, mesures brutes, zéro Streisand, pas de texte dans l'image.
//
// Usage :
//   node batch-plante-series.mjs <ids...> [--grok] [--only echelle|detail] [--preview]
//   node batch-plante-series.mjs --all
import { readFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const ROOT = 'c:/ProjetsPerso/Claude_Projects/MaxPlay';
const SKILL = '.claude/skills/dino-images-lunii/scripts';
const PLANTES = ROOT + '/studio/dino/content/sources/flore/plantes.json';
const DINOS = ROOT + '/site/js/dinos-data.js';

const USE_GROK = process.argv.includes('--grok');
const GEN = USE_GROK ? SKILL + '/grok-gen-dino.mjs' : SKILL + '/gpt-gen-dino.mjs';
const GPTS = 'https://chatgpt.com/g/g-p-6a2c67ebc22c8191971eecf695ec5fec-dinosaure/project';
const PREVIEW = process.argv.includes('--preview');
const ALL = process.argv.includes('--all');
const onlyIdx = process.argv.indexOf('--only');
const ONLY = onlyIdx > -1 ? process.argv[onlyIdx + 1].split(',').map(s => s.trim()) : null;

const OUTD = ROOT + '/site/img/dinos/_new-plantes';
const PROGRESS = OUTD + '/_PROGRESS.tsv';
if (!PREVIEW && !existsSync(OUTD)) mkdirSync(OUTD, { recursive: true });

if (!existsSync(PLANTES)) { console.error('✗ plantes.json absent : ' + PLANTES + ' (HO-020 pas encore livré)'); process.exit(1); }
const PLANTS = JSON.parse(readFileSync(PLANTES, 'utf8'));

const ids = ALL ? PLANTS.map(p => p.id)
  : process.argv.slice(2).filter(a => !a.startsWith('--') && PLANTS.some(p => p.id === a));
if (!ids.length) { console.error('usage: node batch-plante-series.mjs <ids...> | --all  [--grok] [--only echelle,detail] [--preview]'); process.exit(1); }

// Noms FR des dinos, pour nommer le mangeur en arrière-plan sans le décrire (le modèle connaît).
const dinosTxt = existsSync(DINOS) ? readFileSync(DINOS, 'utf8') : '';
function dinoName(id) {
  const re = new RegExp(`id: '${id}'[\\s\\S]{0,400}?name: '([^']+)'`);
  const m = dinosTxt.match(re);
  return m ? m[1] : null;
}

const PERIODE_MOT = { trias: 'Trias', jurassique: 'Jurassique', cretace: 'Crétacé' };
const ENTETE = `CONTEXTE : illustration pour une encyclopédie de dinosaures et de plantes préhistoriques destinée à un enfant de 4 ans.
RÔLE : illustrateur de paléobotanique documentaire réaliste, rigoureux sur la forme des feuilles, des cônes et des fleurs.`;
const STYLE = `STYLE : illustration documentaire réaliste, lumière naturelle, image belle, lisible et paisible. Pas de texte ni de chiffre dans l'image.`;

function nf(x) { return String(x).replace('.', ','); }

// ZÉRO STREISAND (règle d'or du skill dino-paleoart) : les fiches sont écrites pour l'oreille d'un
// enfant et contiennent des tournures négatives (« Pas d'aiguilles fines : des écailles… »,
// « ce n'en est pas une »). Envoyées telles quelles au modèle d'image, elles PLANTENT ce qu'elles
// nient. On coupe donc la phrase négative et on ne garde que ce qui est affirmé.
function cleanNeg(txt) {
  if (!txt) return '';
  return String(txt)
    // « Pas d'aiguilles fines : des écailles… » → « des écailles… »
    .replace(/(^|\.\s+)(Pas|Aucune?|Ni)\b[^.:]*:\s*/gi, '$1')
    // phrases entièrement négatives ou méta (« Attention : ça ressemble…, mais ce n'en est pas une. »)
    .split(/(?<=\.)\s+/)
    .filter(ph => !/\b(pas|jamais|aucun|n'en est|n'existai|attention)\b/i.test(ph))
    .join(' ')
    .trim();
}

// SECTION PLANTE : identité + mesure réelle + forme des feuilles + reproduction. Chiffres toujours donnés.
function sectionPlante(p) {
  const l = [];
  const per = (p.periodes || []).map(x => PERIODE_MOT[x] || x).join(' et ');
  l.push(`- ${p.name}${p.full && p.full !== p.name ? ` (${p.full})` : ''}, plante du ${per}.`);
  if (parseFloat(p.hauteur_m)) l.push(`- Taille réelle : ${nf(p.hauteur_m)} m de haut à l'âge adulte.`);
  if (cleanNeg(p.feuille)) l.push(`- Feuillage : ${cleanNeg(p.feuille)}`);
  if (cleanNeg(p.graines)) l.push(`- Reproduction : ${cleanNeg(p.graines)}`);
  l.push(`- Couleur : choisis librement des verts crédibles de plante vivante (vert profond, vert-bleuté, vert-olive, jeunes pousses plus claires), avec l'écorce et les tiges dans des bruns naturels. Rends-la belle et vivante comme une plante photographiée en pleine lumière.`);
  return l.join('\n');
}

function sectionDecor(p) {
  const per = (p.periodes || []).map(x => PERIODE_MOT[x] || x).join(' ou ');
  const l = [`DÉCOR (très important, soigne-le) :`];
  l.push(`- ${cleanNeg(p.environnement) || `paysage naturel du ${per}`}`);
  l.push(`- Autour d'elle, la végétation de son époque à différentes hauteurs (fougères, prêles, cycadées, conifères), un sol détaillé (terre, mousse, cailloux, feuilles tombées) et une petite faune discrète (insectes, libellules) pour rendre la scène vivante.`);
  return l.join('\n');
}

// Échelle : l'enfant d'1 m est le mètre-étalon. Phrase adaptée au rapport réel (leçon paleoart 2026-07-04).
function phraseEchelle(p) {
  const h = parseFloat(p.hauteur_m) || 0;
  const ratio = Math.round(h);
  if (h >= 6) return `ÉCHELLE CAPITALE : cette plante fait ${nf(p.hauteur_m)} m de haut, soit ${ratio} FOIS la hauteur de l'enfant d'1 m. L'enfant doit paraître TOUT PETIT à son pied, comme au pied d'un grand arbre. Recule BEAUCOUP la caméra pour que la plante ENTIÈRE, de la base à la cime, tienne quand même dans le cadre.`;
  if (h >= 2.5) return `ÉCHELLE : cette plante fait ${nf(p.hauteur_m)} m de haut, soit environ ${ratio} fois la hauteur de l'enfant d'1 m — elle le domine nettement. Rends ce rapport de taille clairement, plante entière visible.`;
  if (h >= 1.2) return `ÉCHELLE : cette plante fait ${nf(p.hauteur_m)} m de haut, un peu plus haute que l'enfant d'1 m. Respecte strictement ce rapport de taille proche.`;
  if (h >= 0.6) return `ÉCHELLE : cette plante fait ${nf(p.hauteur_m)} m de haut, elle arrive à peu près à la poitrine de l'enfant d'1 m. Respecte strictement cette taille.`;
  return `ÉCHELLE : cette plante est BASSE, ${nf(p.hauteur_m)} m de haut, elle arrive sous le genou de l'enfant d'1 m qui est accroupi près d'elle pour la regarder. Respecte strictement cette petite taille.`;
}

// Un herbivore mangeur, nommé, en arrière-plan : lie la plante à l'encyclopédie sans scène de prédation.
// L-D28 : le NOM seul ne suffit pas. Sur les 4 plantes du Trias, « un Plateosaure broute »
// a donné 4 sauropodes au long cou (le cliché du dino herbivore). Comme pour les fiches dino
// (signature morphologique martelée), il faut DÉCRIRE la silhouette des espèces que le modèle
// rate. Table volontairement courte : seulement les mangeurs non-sauropodes qui risquent le
// cliché — un sauropode nommé n'a pas besoin d'entrée, le cliché EST sa vraie silhouette.
const SILHOUETTE_MANGEUR = {
  'Plateosaure': "un Plateosaure, dinosaure de 8 m de long et 2,8 m de haut au cou MOYEN et épais, à la tête petite et étroite, dressé sur ses deux puissantes pattes arrière, le corps à l'horizontale équilibré par une longue queue, ses petites pattes avant à pouce griffu tenant une branche qu'il tire vers sa bouche",
  'Stegosaure': "un Stégosaure, reconnaissable à la double rangée de grandes plaques osseuses en losange dressées le long de son dos et aux quatre longues pointes de sa queue, la tête très basse près du sol",
  'Minmi': "un Minmi, petit dinosaure cuirassé trapu de moins d'un mètre de haut, le dos couvert de plaques osseuses, qui broute au ras du sol sur ses quatre pattes courtes",
  'Gallimimus': "un Gallimimus, dinosaure élancé sans dents au bec corné, silhouette d'autruche sur deux longues pattes fines, petite tête au bout d'un cou souple",
  'Triceratops': "un Tricératops, avec sa grande collerette osseuse derrière le crâne, ses deux longues cornes au-dessus des yeux et sa corne nasale, son bec de perroquet au ras de la végétation",
  'Edmontosaure': "un Edmontosaure, dinosaure à bec de canard sans crête, large museau plat, qui broute sur ses quatre pattes",
};
const sansAccent = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
function ligneMangeur(p) {
  const n = (p.mangee_par || []).map(dinoName).filter(Boolean)[0];
  if (!n) return `\n\nPEUPLEMENT : scène calme et paisible, nature préhistorique intacte.`;
  const cle = Object.keys(SILHOUETTE_MANGEUR).find(k => sansAccent(k) === sansAccent(n));
  const desc = cle ? SILHOUETTE_MANGEUR[cle] : `un ${n}`;
  return `\n\nPEUPLEMENT : au second plan, à bonne distance, ${desc}, broute paisiblement. Scène calme, animaux herbivores uniquement.`;
}

function buildEchelle(p) {
  return [ENTETE,
    `OBJECTIF : montrer cette plante préhistorique en entier et faire sentir sa taille réelle en la comparant à un enfant.`,
    `LA PLANTE :\n${sectionPlante(p)}`,
    `L'ENFANT :\n- un petit garçon de 4 ans, 1 m de haut, t-shirt et short, debout au pied de la plante, calme, en train de la regarder.`,
    sectionDecor(p) + ligneMangeur(p),
    `CAMÉRA : comme une photo prise de loin, de côté. Il est impératif de voir la plante en ENTIER (même si elle est très haute), de la base des racines jusqu'à la cime, et d'avoir encore de la largeur sur les bords (de la nature autour). ${phraseEchelle(p)}`,
    STYLE].join('\n\n');
}

function buildDetail(p) {
  return [ENTETE,
    `OBJECTIF : montrer de tout près à quoi ressemblent la feuille et la partie qui fait les graines de cette plante, pour qu'un enfant reconnaisse sa forme.`,
    `LA PLANTE :\n${sectionPlante(p)}`,
    `SCÈNE : gros plan botanique sur un rameau vivant de la plante, tenu dans la lumière : on voit nettement la forme et la nervure des feuilles, et sur le même rameau la structure qui porte les graines (${cleanNeg(p.graines) || 'cône, spore ou fleur selon la plante'}). Quelques gouttes de rosée, un insecte discret posé à côté.`,
    `CAMÉRA : très gros plan net, faible profondeur de champ, arrière-plan de forêt préhistorique flou et doux.`,
    STYLE].join('\n\n');
}

let firstGenDone = false;
function logProgress(id, scene, status) {
  if (PREVIEW) return;
  appendFileSync(PROGRESS, `${new Date().toISOString()}\t${id}\t${scene}\t${status}\n`);
}

function gen(prompt, outName, firstOfPlante, scene) {
  if (ONLY && !ONLY.includes(scene)) return 0;
  if (PREVIEW) { console.log(`\n--- [${outName}] ---\n${prompt}`); return 0; }
  const args = [GEN, prompt, OUTD + '/' + outName];
  const openNew = ONLY ? !firstGenDone : firstOfPlante;
  if (openNew) args.push(...(USE_GROK ? ['--new'] : ['--url', GPTS]));
  firstGenDone = true;
  try {
    const out = execFileSync('node', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
    process.stdout.write(out);
    return 0;
  } catch (e) {
    const code = e.status || 1;
    if (code === 5) { console.log('⛔ ARRÊT : limite/crédits épuisés. Reprends plus tard ou bascule de canal.'); process.exit(5); }
    console.log(`(scène échouée code=${code} pour ${outName})`);
    return code;
  }
}

for (const id of ids) {
  const p = PLANTS.find(x => x.id === id);
  const base = (p.png || (id[0].toUpperCase() + id.slice(1) + '.jpg')).replace(/\.(jpg|png)$/i, '');
  console.log(`\n========== ${id} (${p.name}) ==========`);
  logProgress(id, '1-echelle', 'start');
  gen(buildEchelle(p), `${base}.png`, true, 'echelle');
  logProgress(id, '1-echelle', 'done');
  logProgress(id, '2-detail', 'start');
  gen(buildDetail(p), `${base}_detail.png`, false, 'detail');
  logProgress(id, '2-detail', 'done');
  console.log(`---------- ${id} terminé ----------`);
}
console.log('\n✅ Batch flore terminé pour :', ids.join(', '));
