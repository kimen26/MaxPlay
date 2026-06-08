// Génère _PROMPTS-GROK.txt — prompts Grok pour les vues manquantes des dinos.
// v2 (2026-05-22) : durci selon retours Papa Yann —
//   1. PROPORTIONS/RATIOS RÉELS imposés (échelle correcte dino vs enfant/environnement)
//   2. Scènes "qui le chasse" = BATAILLES ÉPIQUES À PLUSIEURS dans forêt/jungle, contexte complet
//   3. Les DEUX noms de dinos dans le titre des combats
//   4. Têtes/mouvements VARIÉS dans les groupes (jamais le même dino copié-collé)
const fs=require('fs');
const ROOT='c:/ProjetsPerso/Claude_Projects/MaxPlay/';
const D=new Function(fs.readFileSync(ROOT+'site/js/dinos-data.js','utf8')+'; return DINOS;')();
const G=new Function(fs.readFileSync(ROOT+'site/js/dinos-images-grok.js','utf8')+'; return DINO_GROK;')();

// Style de base imposé à TOUTES les images
const STYLE="realistic illustrative children's-book style, soft natural lighting, child-friendly, NO gore NO blood, "
  + "ANATOMICALLY ACCURATE PROPORTIONS AND SIZE RATIOS (this is critical — the dinosaur must be the correct real-world size relative to the child, the trees, and other animals), "
  + "signature features clearly and correctly visible, full body in frame, high detail";

// Consigne spéciale pour les scènes de groupe (anti copier-coller)
const GROUP_RULE="If several individuals are shown, EACH must have a DIFFERENT head pose, body posture and movement — never copy-paste the same dinosaur; vary ages (adults and juveniles), angles and actions for a lively natural scene.";

// Consigne spéciale combat (qui_le_chasse)
const BATTLE_RULE="EPIC dynamic battle scene with MULTIPLE dinosaurs in a lush forest or jungle with full environmental context (trees, ferns, ground, mist, depth). "
  + "Show the confrontation with realistic size ratio between predator and prey. Tense and dramatic but NON-GORY, no blood, no wounds — child-friendly adventure mood. Each animal in a distinct dynamic pose.";

const PREDATOR = {
  triceratops:'Tyrannosaurus rex', torosaurus:'Tyrannosaurus rex',
  styracosaurus:'Gorgosaurus', protoceratops:'Velociraptor',
  ankylosaurus:'Tyrannosaurus rex', euoplocephalus:'Gorgosaurus',
  stegosaurus:'Allosaurus', kentrosaurus:'Allosaurus',
  brachiosaurus:'Allosaurus', diplodocus:'Allosaurus',
  apatosaurus:'Allosaurus', camarasaurus:'Allosaurus',
  amargasaurus:'Giganotosaurus',
  parasaurolophus:'Tyrannosaurus rex', corythosaurus:'Gorgosaurus',
  edmontosaurus:'Tyrannosaurus rex', maiasaura:'Troodon',
  iguanodon:'Neovenator', pachycephalosaurus:'Tyrannosaurus rex',
  therizinosaurus:'Tarbosaurus', psittacosaurus:'small dromaeosaurid',
  troodon:'Tyrannosaurus rex', gallimimus:'Tarbosaurus', oviraptor:'Velociraptor',
  // nouveaux cératopsiens
  centrosaurus:'Gorgosaurus', chasmosaurus:'Gorgosaurus',
  kosmoceratops:'Teratophoneus', utahceratops:'Teratophoneus',
  pachyrhinosaurus:'Albertosaurus', anchiceratops:'Albertosaurus',
  einiosaurus:'Albertosaurus', pentaceratops:'Bistahieversor',
  diabloceratops:'Lythronax',
};
const SIG = {
  tyrannosaurus:'massive head, tiny 2-fingered arms, banana-shaped teeth',
  giganotosaurus:'huge head, blade-like teeth, 3-fingered hands',
  carcharodontosaurus:'shark-like serrated teeth, 3 fingered hands, NO sail on back',
  acrocanthosaurus:'tall neural spines along the back forming a thick muscular ridge (NOT a sail)',
  allosaurus:'small horns above eyes, 3 fingered clawed hands, long jaw with sharp teeth',
  tarbosaurus:'massive skull, tiny 2-fingered arms, robust tyrannosaurid build',
  albertosaurus:'slender tyrannosaurid, large head with sharp teeth, tiny arms',
  gorgosaurus:'slender tyrannosaurid, sharp teeth, tiny 2-fingered arms',
  ceratosaurus:'BIPEDAL theropod with single nasal horn and row of osteoderms along the back, 4-fingered hands',
  dilophosaurus:'two thin parallel crests on top of the head (NOT a neck frill, NOT venom-spitting)',
  carnotaurus:'two short horns above the eyes, very small arms, long muscular tail',
  cryolophosaurus:'transverse pompadour-shaped crest on top of the head',
  velociraptor:'turkey-sized feathered raptor, sickle claw on each foot, long stiff tail',
  deinonychus:'medium feathered raptor, large sickle claw on second toe',
  utahraptor:'large feathered raptor, very big sickle claws',
  coelophysis:'slender small theropod, long neck, narrow head',
  compsognathus:'TINY chicken-sized theropod (must look small!), thin long tail',
  spinosaurus:'large sail on the back, crocodile-like long jaw, semi-aquatic',
  suchomimus:'crocodile-like long jaw, low sail on the back, 3 large hand claws',
  baryonyx:'crocodile-like long jaw, large curved thumb claw, fish-eater',
  brachiosaurus:'front legs LONGER than back legs (giraffe-like inclined back), long neck held high',
  diplodocus:'extremely long horizontal body and tail (whip-like), long horizontal neck, small head',
  apatosaurus:'very massive body, thick neck, column-like legs',
  camarasaurus:'boxy short head with high nostrils and large eyes, shorter neck than diplodocus',
  amargasaurus:'TWO PARALLEL ROWS of LONG sharp spines along the NECK (signature MANDATORY)',
  plateosaurus:'primitive sauropodomorph, semi-bipedal posture, small head',
  ankylosaurus:'low quadrupedal armored body, bony plates on back, bony club FIRMLY ATTACHED at end of tail',
  euoplocephalus:'low armored ankylosaurid, bony plates on back, bony club attached to tail, short blunt herbivore head (NO predator teeth)',
  stegosaurus:'two rows of large flat bony plates along the back, 4 sharp tail spikes (thagomizer)',
  kentrosaurus:'small bony plates on shoulders, PAIRS OF LONG SHARP SPIKES on hips and tail, one shoulder spike, quadrupedal, smaller than Stegosaurus',
  triceratops:'three horns on face, large SOLID frill (no holes), parrot-like beak',
  torosaurus:'QUADRUPEDAL massive body (NOT bipedal), three horns on face, EXTREMELY LARGE FRILL with two big oval holes',
  styracosaurus:'frill with 6 very long straight spikes radiating out, single large nose horn',
  protoceratops:'SMALL sheep-sized ceratopsian, NO horns at all, modest frill, parrot beak (must look small!)',
  psittacosaurus:'small stocky bipedal ceratopsian, parrot beak, no horns, bristles on tail',
  parasaurolophus:'long curved tube crest on the back of the head',
  corythosaurus:'tall rounded helmet-shaped crest on top of the head',
  edmontosaurus:'large duck-billed hadrosaur, no crest',
  maiasaura:'duck-billed hadrosaur, small crest between eyes',
  iguanodon:'large iguanodontid, thumb spike on each hand, can walk on 2 or 4 legs',
  pachycephalosaurus:'BIPEDAL, thick smooth rounded bone dome on top of skull (smooth, NOT textured like turtle shell), small bony knobs around rim, long horizontal tail',
  therizinosaurus:'very tall theropod with huge curved hand claws, pot belly, small head, herbivore',
  troodon:'small slender feathered theropod, large eyes, sickle claw',
  gallimimus:'ostrich-like ornithomimid, long legs, small head, toothless beak',
  oviraptor:'feathered theropod with crested skull, toothless beak',
  microraptor:'small four-winged feathered theropod, gliding',
  pteranodon:'large flying pterosaur, toothless beak, long pointed head crest',
  quetzalcoatlus:'gigantic pterosaur, walks on all fours on ground, very long neck',
  archaeopteryx:'crow-sized feathered bird-dinosaur, teeth, long bony feathered tail',
  mosasaurus:'huge marine reptile, paddle limbs, shark-like tail fin, NOT a dinosaur',
  dimetrodon:'large sail on the back, sprawling lizard-like posture, NOT A DINOSAUR (ancestor of mammals)',
  // nouveaux cératopsiens
  centrosaurus:'single large nasal horn curved like a crescent, short frill with two small forward-curling hooks',
  chasmosaurus:'huge nearly-rectangular frill with TWO GIANT triangular openings, three horns',
  kosmoceratops:'most ornate skull ever: 15 horns total, row of 10 hooks curling DOWNWARD along the frill rim',
  pachyrhinosaurus:'NO nasal horn — instead a big flat bony BOSS (bump) on the nose, frill with spikes',
  pentaceratops:'enormous frill, 3 true horns plus 2 sideways cheek points, one of the largest skulls of any land animal',
  anchiceratops:'rectangular-shaped frill bordered with big rounded bony bumps (epoccipitals)',
  diabloceratops:'two tall straight horns at the top of the frill like devil horns, plus a nasal horn',
  einiosaurus:'nasal horn curved strongly FORWARD like a bottle-opener / hook, two spikes on the frill',
  utahceratops:'short robust eye-horns pointing SIDEWAYS (laterally) like a cow, short nasal horn',
};
const VUE_KEY = { 'Sa taille':'taille','Son environnement':'environnement','Sa vie':'sa_vie','Qui le chasse':'qui_le_chasse' };

function dataOf(id){return D.find(x=>x.id===id);}
function full(id){const d=dataOf(id);return d?d.full:id;}
function nameFr(id){const d=dataOf(id);return d?d.name:id;}
function herb(id){const d=dataOf(id);return d&&(d.cat==='herbivores'||d.cat==='omnivores');}
function sizes(id){const d=dataOf(id);return d?'real size approx '+d.taille_m+'m long, '+(d.hauteur_m||'?')+'m tall, '+d.poids_t+' tonnes':'';}
function have(id){return G[id]?[...new Set(G[id].map(x=>x.label))]:[];}

function promptFor(id, vueFr){
  const v=VUE_KEY[vueFr], sig=SIG[id]||'', sz=sizes(id), fl=full(id), fr=nameFr(id);
  if(v==='taille')
    return '['+fr+' . taille] Show one '+fl+' ('+sz+') standing next to a 4-year-old child (~1m tall) for scale. '
      +'The size ratio between the dinosaur and the child MUST be realistic and to scale. Side view, clear size comparison, child fully clothed (t-shirt, trousers, shoes — NEVER bare-skinned). '
      +'Anatomy: '+sig+'. '+STYLE+'.';
  if(v==='environnement')
    return '['+fr+' . environnement] One '+fl+' ('+sz+') in its natural habitat, full body visible, realistic proportions in a detailed forest/plain background. '
      +'Anatomy: '+sig+'. '+STYLE+'.';
  if(v==='sa_vie'){
    if(herb(id))
      return '['+fr+' . sa_vie] A small herd of '+fl+' ('+sz+') in daily life: browsing vegetation, walking together, adults caring for juveniles, in a forest or plain. ABSOLUTELY NO PREDATOR visible. '
        +GROUP_RULE+' Anatomy: '+sig+'. '+STYLE+'.';
    return '['+fr+' . sa_vie] One '+fl+' ('+sz+') running or hunting, dynamic action pose in a natural setting, realistic proportions, no blood. '
      +'Anatomy: '+sig+'. '+STYLE+'.';
  }
  if(v==='qui_le_chasse'){
    const pid = PREDATOR[id]; const pred = pid || 'a large predator';
    const predFr = (dataOf(pid)? nameFr(pid) : pred);
    const predSig = SIG[pid] ? (' The predator ('+pred+') anatomy: '+SIG[pid]+'.') : '';
    return '['+fr+' vs '+predFr+' . qui_le_chasse] '+BATTLE_RULE+' '
      +'The herd of '+fl+' ('+sz+') defends itself against attacking '+pred+'(s) in a lush forest/jungle. '
      +'Realistic size ratio between '+fr+' and '+predFr+'. '
      +GROUP_RULE+' '+fr+' anatomy: '+sig+'.'+predSig+' '+STYLE+'.';
  }
  return '';
}

const lines=[];
lines.push('# PROMPTS GROK — vues manquantes (généré '+new Date().toISOString().slice(0,10)+')');
lines.push('#');
lines.push('# CONSIGNES GLOBALES (Papa Yann) — valent pour TOUTES les images :');
lines.push('#  1. PROPORTIONS & RATIOS RÉELS : le dino doit avoir la bonne taille par rapport à l\'enfant,');
lines.push('#     aux arbres, aux autres animaux. Pas de dino mal dessiné, pas d\'échelle fantaisiste.');
lines.push('#  2. Vue "qui_le_chasse" = BATAILLE ÉPIQUE à plusieurs dans une FORÊT ou JUNGLE, tout le');
lines.push('#     contexte (arbres, fougères, sol, brume, profondeur). Tendu mais JAMAIS gore/sang.');
lines.push('#  3. Le TITRE [Dino1 vs Dino2 . qui_le_chasse] contient les DEUX noms de dinos.');
lines.push('#  4. Groupes/troupeaux : têtes, poses et mouvements DIFFÉRENTS pour chaque individu');
lines.push('#     (adultes + petits), JAMAIS le même dino copié-collé.');
lines.push('#  5. Enfant TOUJOURS habillé (jamais nu, jamais pieds/jambes nus).');
lines.push('#');
lines.push('# Renomme le fichier de sortie : <id>_<vue>.jpg (ex: centrosaurus_qui_le_chasse.jpg)');
lines.push('');

lines.push('=========================================================');
lines.push('=== SECTION 1 : DINOS SANS AUCUNE IMAGE ===');
lines.push('=========================================================');
lines.push('');
for(const d of D){
  if(have(d.id).length>0) continue;
  const want = herb(d.id)?['Sa taille','Son environnement','Sa vie','Qui le chasse']:['Sa taille','Son environnement','Sa vie'];
  lines.push('## '+d.name+' ('+d.full+')');
  for(const w of want){ if(w==='Qui le chasse' && !PREDATOR[d.id]) continue; lines.push(promptFor(d.id,w)); }
  lines.push('');
}

lines.push('=========================================================');
lines.push('=== SECTION 2 : DINOS À COMPLÉTER (vues manquantes) ===');
lines.push('=========================================================');
lines.push('');
for(const d of D){
  const h=have(d.id); if(h.length===0) continue;
  const want = herb(d.id)?['Sa taille','Son environnement','Sa vie','Qui le chasse']:['Sa taille','Son environnement','Sa vie'];
  const miss = want.filter(w=> !h.includes(w) && !(w==='Qui le chasse' && !PREDATOR[d.id]));
  if(!miss.length) continue;
  lines.push('## '+d.name+' — manque: '+miss.join(', '));
  for(const w of miss) lines.push(promptFor(d.id,w));
  lines.push('');
}

fs.writeFileSync(ROOT+'studio/dino/content/scripts/images-grok/_PROMPTS-GROK.txt', lines.join('\n'), 'utf8');
console.log('Prompts générés:', lines.filter(l=>l.startsWith('[')).length);
