// ─────────────────────────────────────────────────────────────────────────
//  catalog.js — Source de vérité UNIQUE du contenu MaxPlay
//  Stockage : window.MAXPLAY_CATALOG (pas de fetch — règle HTML local)
//  Usage    : <script src="js/catalog.js"></script> AVANT stars.js / unlock.js / coque
//
//  Remplace les <a href> hardcodés de index.html + le GAME_META de tracker.js.
//  Ajouter un contenu = 1 ligne ici.
//
//  Champs :
//    id          identifiant stable (= nom de fichier sans .html quand applicable)
//    pilier      'jeux' | 'dinos' | 'monde' | 'histoires'   (monde/histoires = post-V0)
//    titre/emoji/desc   affichage
//    url         page cible
//    type        'html' | 'phaser' | 'encyclo'
//    orientation 'any' | 'landscape'   ('landscape' → overlay "tourne ta tablette")
//    access      'sequence' | 'free' | 'code'
//                  · sequence = chaîne de mini-jeux. 1er ouvert ; chacun débloque le
//                    suivant dès ~1★ (option B). L'ORDRE du tableau = ordre de déblocage.
//                  · free = toujours accessible (bacs à sable, exploration).
//                  · code = déverrouillé par mot-clé (V0 local ; V-final serveur).
//    maxStars    nb d'étoiles atteignables = nb de paliers de difficulté (0 si pas d'étoiles).
//                1★ = un palier validé à 100% → le jeu monte d'un cran. maxStars = trophée "MAXIMUM".
//    unlock      { code, bundle } si access==='code' (null sinon)
//    tag         'tts' | null
//    status      'live' | 'wip' | 'dev'
//
//  ⚠️ L'ordre de la séquence + les valeurs maxStars sont PROVISOIRES (catalogue à
//     resserrer pour le grand public : cf. project_maxplay_v0_grand_public).
// ─────────────────────────────────────────────────────────────────────────

window.MAXPLAY_CATALOG = [

  // ─── PILIER JEUX — séquence de mini-jeux (chaîne de déblocage) ───
  { id:'mj-01',  pilier:'jeux', titre:'Quiz Bus',           emoji:'🚌', desc:'Couleur, numéro et écoute mélangés !',     url:'mj-01.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-04',  pilier:'jeux', titre:'Compte les passagers', emoji:'👥', desc:'Combien de passagers en tout ?',         url:'mj-04.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-05',  pilier:'jeux', titre:'La bonne place',      emoji:'🪑', desc:'Combien peuvent encore monter ?',          url:'mj-05.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-06',  pilier:'jeux', titre:'Lis la phrase',       emoji:'📖', desc:'Quel mot manque dans la phrase ?',         url:'mj-06.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-08',  pilier:'jeux', titre:'Au centre bus',       emoji:'🅿️', desc:'Range les bus pour la nuit !',             url:'mj-08.html',  type:'html', orientation:'landscape', access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-09',  pilier:'jeux', titre:'Trie les bus !',      emoji:'🗂️', desc:'Range-les dans leur famille de couleur !', url:'mj-09.html',  type:'html', orientation:'landscape', access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-11',  pilier:'jeux', titre:'Quel pays ?',         emoji:'🌍', desc:'Trouve le pays du drapeau !',              url:'mj-11.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-13a', pilier:'jeux', titre:'Le premier bus',      emoji:'🥇', desc:'Quel bus arrive en premier ?',             url:'mj-13a.html', type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-13b', pilier:'jeux', titre:'Monte dans le bus !', emoji:'🚌', desc:'Trouve et appuie sur le bon bus !',        url:'mj-13b.html', type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-13c', pilier:'jeux', titre:'Combien avant ?',     emoji:'🔢', desc:'Compte les bus avant celui demandé !',     url:'mj-13c.html', type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-14',  pilier:'jeux', titre:'La grille des bus',   emoji:'🔲', desc:'Quel bus manque dans la grille ?',         url:'mj-14.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-15',  pilier:'jeux', titre:'L\'intrus',           emoji:'🔍', desc:'Lequel est l\'intrus ?',                   url:'mj-15.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-16',  pilier:'jeux', titre:'Complète la suite',   emoji:'📈', desc:'Qu\'est-ce qui vient ensuite ?',           url:'mj-16.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-17',  pilier:'jeux', titre:'Le garage',           emoji:'🔧', desc:'Essence, lavage, pneus — répare les bus !',url:'mj-17.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-18',  pilier:'jeux', titre:'Tubes de couleurs',   emoji:'🧪', desc:'Verse les couleurs pour trier les tubes !',url:'mj-18.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-19',  pilier:'jeux', titre:'Trouve le bus !',     emoji:'🎯', desc:'Repère le bon bus qui bouge !',            url:'mj-19.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-20',  pilier:'jeux', titre:'Compte en 8 langues', emoji:'🔢', desc:'Compter de 1 à 20 dans toutes les langues !',url:'mj-20.html', type:'html', orientation:'any',      access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-21',  pilier:'jeux', titre:'Peins les bus !',     emoji:'🎨', desc:'Mélange rouge, jaune et bleu !',           url:'mj-21.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-22',  pilier:'jeux', titre:'Trouve le pays !',    emoji:'🗺️', desc:'Localise les 25 pays d\'Europe !',         url:'mj-22.html',  type:'html', orientation:'landscape', access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },

  // Exploration / bacs à sable : toujours accessibles, hors chaîne d'étoiles
  { id:'mj-12',         pilier:'jeux', titre:'Nouveaux sons', emoji:'🎵', desc:'Bus, Mario, Pokémon et sons secrets !',  url:'mj-12.html',         type:'html',   orientation:'any',       access:'free', maxStars:0, unlock:null, tag:null, status:'live' },
  { id:'max-adventure', pilier:'jeux', titre:'Max Adventure', emoji:'🎮', desc:'Conduis ton bus dans Villejuif !',       url:'max-adventure.html', type:'phaser', orientation:'landscape', access:'free', maxStars:0, unlock:null, tag:null, status:'live' },
  { id:'mj-pose-tiles', pilier:'jeux', titre:'Pose-tes-tiles', emoji:'🚧', desc:'Petit ouvrier ! Construis ta ville.',   url:'mj-pose-tiles.html', type:'html',   orientation:'landscape', access:'free', maxStars:0, unlock:null, tag:null, status:'live' },

  // ─── PILIER DINOS — déverrouillage par CODE (pré-câblage vente, swap serveur V-final) ───
  // TODO Sprint 2 : renommer dev-dinos.html → dinos.html (NE PAS faire tant que Papa Yann bosse dessus)
  { id:'dinos', pilier:'dinos', titre:'Encyclopédie Dinos', emoji:'🦕', desc:'50 dinos · 6 familles · fiches riches · audio', url:'dev-dinos.html?v=7', type:'encyclo', orientation:'any', access:'code', maxStars:0, unlock:{ code:'TRITRI', bundle:'dinos' }, tag:'tts', status:'wip' },

  // ─── PILIERS POST-V0 (placeholders, mêmes rails) ───
  // { id:'monde', pilier:'monde', titre:'Le monde de Max', access:'free', ... }   ← playground tiles
  // { id:'histoire-1', pilier:'histoires', ... }                                  ← histoires Wex
];
