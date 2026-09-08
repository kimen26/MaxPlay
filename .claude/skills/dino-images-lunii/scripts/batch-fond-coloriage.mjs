// Batch FONDS DE COLORIAGE — 5 paysages au trait pour le sous-menu Décors de mj-32.
// Calque exact de batch-dino-coloriage.mjs (meme entete, meme charte STYLE_COLORIAGE,
// meme tuyau gpt-gen-dino.mjs / grok-gen-dino.mjs), pour que les fonds soient dans le
// MEME style que les 70 coloriages de dinos deja produits.
//
// Decision Papa Yann 2026-09-08 : voie 3 retenue — de VRAIS fonds au trait, pas les PNG
// couleur de site/img/decor/ (qui restent en reserve pour un autre usage). Tous les fonds
// sont proposes pour TOUS les dinos, aucun filtre par biome.
//
// Usage: node batch-fond-coloriage.mjs --preview            (affiche les prompts, 0 credit)
//        node batch-fond-coloriage.mjs                      (genere les 5 via ChatGPT)
//        node batch-fond-coloriage.mjs desert montagne      (genere seulement ceux-la)
//        node batch-fond-coloriage.mjs --grok               (plan B, cf. SKILL.md : 8/10 sur
//                                                            un prompt simple, moins bon que GPT)
//
// Prerequis (cf. SKILL.md) : Brave lance en mode debug et session ChatGPT loguee —
//   powershell -File .claude/skills/dino-images-lunii/scripts/launch-brave.ps1

import { appendFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const ROOT = 'c:/ProjetsPerso/Claude_Projects/MaxPlay';
const SKILL = '.claude/skills/dino-images-lunii/scripts';

const USE_GROK = process.argv.includes('--grok');
const PREVIEW = process.argv.includes('--preview');
const GEN = USE_GROK ? SKILL + '/grok-gen-dino.mjs' : SKILL + '/gpt-gen-dino.mjs';
const GPTS = 'https://chatgpt.com/g/g-p-6a2c67ebc22c8191971eecf695ec5fec-dinosaure/project';

const OUTD = ROOT + '/site/img/dinos/_new-fonds';
const PROGRESS = OUTD + '/_PROGRESS.tsv';
mkdirSync(OUTD, { recursive: true });

// Entete et charte de style : COPIE CONFORME de batch-dino-coloriage.mjs.
// Ne pas les reformuler — le commentaire d'origine documente deux pieges deja payes
// (2026-07-30) : « fond transparent » faisait rendre un gris fonce incoloriable, et les
// tournures negatives (« pas de couleur ») produisaient l'effet Streisand.
const ENTETE = `CONTEXTE : illustration pour un mini-jeu de coloriage pour enfant de 4 ans.
RÔLE : illustrateur de stickers et coloriages, style cartoon mignon et très lisible.`;

const STYLE_COLORIAGE = `STYLE : dessin au trait pour livre de coloriage, style cartoon mignon. L'image est une PAGE ENTIÈREMENT BLANCHE sur laquelle le paysage est dessiné uniquement avec des CONTOURS NOIRS ÉPAIS ET NETS, comme au feutre noir. L'intérieur de chaque forme reste BLANC, vide, prêt à être colorié aux crayons ; le ciel et le sol sont BLANCS eux aussi, du blanc de la page. Seulement deux valeurs dans toute l'image : le blanc de la page et le noir du trait. Grandes zones blanches simples et bien fermées. Formes arrondies et douces. Très simple, très lisible, parfait pour qu'un enfant de 4 ans colorie. Pas de texte ni de chiffre dans l'image.`;

// Cadrage commun a tous les fonds. Deux exigences propres au decor, absentes du coloriage
// de dino : le CENTRE doit rester vide (le dino vient s'y poser par-dessus), et le paysage
// doit se lire meme quand le dino en cache le milieu.
const CADRAGE = `CAMÉRA : paysage vu de loin, format PAYSAGE (plus large que haut), horizon bas. Le CENTRE de l'image reste VIDE et blanc : un dinosaure viendra s'y poser par-dessus, il ne faut donc rien dessiner d'important au milieu. Les éléments du décor sont répartis sur les CÔTÉS et vers le HAUT. Peu d'éléments, très espacés, chacun bien fermé par son trait : un enfant doit pouvoir remplir chaque forme d'une seule couleur.`;

const FONDS = [
  {
    id: 'desert',
    sujet: `un paysage de DÉSERT chaud : deux ou trois grandes dunes de sable aux courbes douces, un gros soleil rond dans le ciel, deux cactus arrondis sur les côtés, quelques rochers lisses posés au sol.`,
  },
  {
    id: 'foret',
    sujet: `un paysage de FORÊT de la préhistoire : de grandes fougères arrondies et quelques hauts arbres à long tronc et large houppier, répartis sur les côtés, quelques buissons ronds au sol, deux nuages simples dans le ciel.`,
  },
  {
    id: 'montagne',
    sujet: `un paysage de MONTAGNE : deux ou trois sommets pointus aux flancs larges et bien fermés, une rivière qui descend en serpentant vers le bas de l'image, quelques rochers arrondis, deux nuages simples dans le ciel.`,
  },
  {
    id: 'neige',
    sujet: `un paysage de NEIGE : des collines enneigées aux courbes douces, deux ou trois sapins triangulaires sur les côtés, de gros flocons ronds bien espacés dans le ciel, un petit lac gelé aux bords arrondis.`,
  },
  {
    id: 'volcan',
    sujet: `un paysage de VOLCAN : un grand volcan au sommet ouvert sur un côté de l'image, un panache de fumée aux formes rondes qui monte dans le ciel, quelques gros rochers arrondis au sol, une coulée qui descend du cratère en formes larges et bien fermées.`,
  },
];

function buildFondPrompt(f) {
  return [
    ENTETE,
    `OBJECTIF : dessiner un FOND DE PAYSAGE pour un mini-jeu de coloriage. Ce décor sera placé DERRIÈRE un dinosaure que l'enfant colorie.`,
    `LE PAYSAGE : ${f.sujet}`,
    CADRAGE,
    STYLE_COLORIAGE,
  ].join('\n');
}

function logProgress(id, status) {
  appendFileSync(PROGRESS, `${new Date().toISOString()}\t${id}\tfond\t${status}\n`);
}

// Pause aleatoire 5-10 s entre deux images, comme le batch dino : evite le rate limit.
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

const demandes = process.argv.slice(2).filter(a => !a.startsWith('--'));
const aFaire = demandes.length ? FONDS.filter(f => demandes.includes(f.id)) : FONDS;

if (!aFaire.length) {
  console.log('Aucun fond reconnu. Ids disponibles :', FONDS.map(f => f.id).join(', '));
  process.exit(1);
}

// Serie coherente : on reste dans le MEME chat apres la premiere image (cf. SKILL.md),
// ChatGPT memorise alors le style d'un fond a l'autre.
let premier = true;
for (const f of aFaire) {
  const outName = `fond_${f.id}_coloriage.png`;
  const prompt = buildFondPrompt(f);
  console.log(`\n========== ${f.id} — FOND COLORIAGE ==========`);
  if (PREVIEW) {
    console.log(`\n--- [${outName}] ---\n${prompt}`);
    continue;
  }
  logProgress(f.id, 'start');
  gen(prompt, outName, premier);
  premier = false;
  logProgress(f.id, 'done');
  sleepRandom();
}

if (PREVIEW) {
  console.log(`\n(preview : aucun credit consomme, aucune image ecrite)`);
} else {
  console.log(`\nTermine. Images dans ${OUTD}`);
  console.log(`Etape suivante : regarder CHAQUE image, puis convertir en .webp vers site/img/dinos/paleoart/ (meme convention que les coloriages de dinos).`);
}
