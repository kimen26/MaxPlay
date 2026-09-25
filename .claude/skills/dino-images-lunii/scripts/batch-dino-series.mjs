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
import { MORPHO, getFields, ficheBlock, ficheSignature, cleanPuce, descPhysique, ficheMange, ficheVitAvec, mesuresGlobales, TERME } from './dino-morpho.mjs';

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
