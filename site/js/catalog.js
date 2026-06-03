// ─────────────────────────────────────────────────────────────────────────
//  catalog.js — Source de vérité UNIQUE du contenu MaxPlay
//  Stockage : window.MAXPLAY_CATALOG + window.MAXPLAY_CATEGORIES (pas de fetch)
//  Usage    : <script src="js/catalog.js"></script> AVANT stars.js / unlock.js / coque
//
//  Le menu est organisé par CATÉGORIE. Dans chaque catégorie, les jeux 'sequence'
//  forment une petite chaîne : le 1ᵉʳ est ouvert, les suivants se débloquent à 2★
//  sur le précédent (déblocage PAR catégorie → plusieurs portes d'entrée).
//
//  Champs entrée :
//    id · category · titre · emoji · desc · url · type('html'|'phaser'|'encyclo')
//    orientation('any'|'landscape') · access('sequence'|'free'|'code')
//    maxStars (nb de paliers, 0 si pas d'étoiles) · unlock({code,bundle} si 'code')
//    tag('tts'|null) · status('live'|'wip')
//
//  Paliers de difficulté par jeu : voir docs/jeux/_PALIERS-DIFFICULTE.md
// ─────────────────────────────────────────────────────────────────────────

window.MAXPLAY_CATEGORIES = [
  { id: 'compter',  emoji: '🔢', label: 'Compter' },
  { id: 'couleurs', emoji: '🎨', label: 'Couleurs' },
  { id: 'lire',     emoji: '🔤', label: 'Lire' },
  { id: 'logique',  emoji: '🧩', label: 'Logique' },
  { id: 'bricoler', emoji: '🔧', label: 'Bricoler' },
  { id: 'observer', emoji: '👀', label: 'Observer & vite' },
  { id: 'monde',    emoji: '🌍', label: 'Le monde & langues' },
  { id: 'libre',    emoji: '🎮', label: 'En libre' },
  { id: 'dinos',    emoji: '🦕', label: 'Les dinos' },
];

window.MAXPLAY_CATALOG = [

  // ─── 🔢 Compter ───
  { id:'mj-04',  category:'compter',  titre:'Compte les passagers', emoji:'👥', desc:'Combien de passagers en tout ?',      url:'mj-04.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-13c', category:'compter',  titre:'Combien avant ?',      emoji:'🔢', desc:'Compte les bus avant celui demandé !',url:'mj-13c.html', type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-05',  category:'compter',  titre:'La bonne place',       emoji:'🪑', desc:'Combien peuvent encore monter ?',     url:'mj-05.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },

  // ─── 🎨 Couleurs ───
  { id:'mj-01',  category:'couleurs', titre:'Quiz Bus',             emoji:'🚌', desc:'Couleur, numéro et écoute mélangés !',url:'mj-01.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:'tts', status:'live' },
  { id:'mj-09',  category:'couleurs', titre:'Trie les bus !',       emoji:'🗂️', desc:'Range-les dans leur famille de couleur !',url:'mj-09.html',type:'html', orientation:'landscape', access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-21',  category:'couleurs', titre:'Peins les bus !',      emoji:'🎨', desc:'Mélange rouge, jaune et bleu !',      url:'mj-21.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-18',  category:'couleurs', titre:'Tubes de couleurs',    emoji:'🧪', desc:'Verse les couleurs pour trier les tubes !',url:'mj-18.html',type:'html',orientation:'any',      access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },

  // ─── 🔤 Lire ───
  { id:'mj-06',  category:'lire',     titre:'Lis la phrase',        emoji:'📖', desc:'Quel mot manque dans la phrase ?',    url:'mj-06.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-13b', category:'lire',     titre:'Monte dans le bus !',  emoji:'🚌', desc:'Trouve et appuie sur le bon bus !',   url:'mj-13b.html', type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-23',  category:'lire',     titre:'Lis le mot',           emoji:'🔤', desc:'Lis le mot, trouve la bonne image !',url:'mj-23.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },

  // ─── 🧩 Logique ───
  { id:'mj-13a', category:'logique',  titre:'Le premier bus',       emoji:'🥇', desc:'Quel bus arrive en premier ?',       url:'mj-13a.html', type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-15',  category:'logique',  titre:'L\'intrus',            emoji:'🔍', desc:'Lequel est l\'intrus ?',              url:'mj-15.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-16',  category:'logique',  titre:'Complète la suite',    emoji:'📈', desc:'Qu\'est-ce qui vient ensuite ?',      url:'mj-16.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-14',  category:'logique',  titre:'La grille des bus',    emoji:'🔲', desc:'Quel bus manque dans la grille ?',    url:'mj-14.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },

  // ─── 🔧 Bricoler (ranger & réparer) ───
  { id:'mj-08',  category:'bricoler', titre:'Au centre bus',        emoji:'🅿️', desc:'Range les bus pour la nuit !',        url:'mj-08.html',  type:'html', orientation:'landscape', access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-17',  category:'bricoler', titre:'Le garage',            emoji:'🔧', desc:'Essence, lavage, pneus — répare les bus !',url:'mj-17.html',type:'html',orientation:'any',      access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },

  // ─── 👀 Observer & vite ───
  { id:'mj-19',  category:'observer', titre:'Trouve le bus !',      emoji:'🎯', desc:'Repère le bon bus qui bouge !',       url:'mj-19.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },

  // ─── 🌍 Le monde & langues ───
  { id:'mj-11',  category:'monde',    titre:'Quel pays ?',          emoji:'🌍', desc:'Trouve le pays du drapeau !',         url:'mj-11.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:'tts', status:'live' },
  { id:'mj-22',  category:'monde',    titre:'Trouve le pays !',     emoji:'🗺️', desc:'Localise les 25 pays d\'Europe !',    url:'mj-22.html',  type:'html', orientation:'landscape', access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },
  { id:'mj-20',  category:'monde',    titre:'Compte en 8 langues',  emoji:'🌐', desc:'Compter dans toutes les langues !',   url:'mj-20.html',  type:'html', orientation:'any',       access:'sequence', maxStars:5, unlock:null, tag:null,  status:'live' },

  // ─── 🎮 En libre (bacs à sable, hors étoiles) ───
  { id:'mj-12',         category:'libre', titre:'Nouveaux sons', emoji:'🎵', desc:'Bus, Mario, Pokémon et sons secrets !', url:'mj-12.html',         type:'html',   orientation:'any',       access:'free', maxStars:0, unlock:null, tag:null, status:'live' },
  { id:'max-adventure', category:'libre', titre:'Max Adventure', emoji:'🎮', desc:'Conduis ton bus dans Villejuif !',      url:'max-adventure.html', type:'phaser', orientation:'landscape', access:'free', maxStars:0, unlock:null, tag:null, status:'live' },
  { id:'mj-pose-tiles', category:'libre', titre:'Pose-tes-tiles', emoji:'🚧', desc:'Petit ouvrier ! Construis ta ville.',  url:'mj-pose-tiles.html', type:'html',   orientation:'landscape', access:'free', maxStars:0, unlock:null, tag:null, status:'live' },

  // ─── 🦕 Dinos (déverrouillage par code) ───
  // TODO Sprint 2 : renommer dev-dinos.html → dinos.html (PAS tant que Papa Yann bosse dessus)
  { id:'dinos', category:'dinos', titre:'Encyclopédie Dinos', emoji:'🦕', desc:'50 dinos · 6 familles · fiches riches · audio', url:'dev-dinos.html?v=7', type:'encyclo', orientation:'any', access:'code', maxStars:0, unlock:{ code:'TRITRI', bundle:'dinos' }, tag:'tts', status:'wip' },
];
