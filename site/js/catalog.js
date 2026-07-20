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

// ── MENU v2 (validé Papa Yann 2026-07-16, figée docs/jeux/figees/menu.md) ──
// Rangée « ⭐ Tes jeux » persistante (pins + jeu du jour) rendue par index.html, PAS un tiroir.
// 5 tiroirs accordéon ci-dessous, dans cet ordre. Section 🆕 « nouveaux » supprimée :
// chaque jeu retourne dans sa catégorie de fond (voir champ category des entrées).
window.MAXPLAY_CATEGORIES = [
  { id: 'dinos',    emoji: '🦕', label: 'Les dinos' },
  { id: 'couleurs', emoji: '🎨', label: 'Les couleurs' },
  { id: 'compter',  emoji: '🔢', label: 'Compter & lire' },
  { id: 'casse',    emoji: '🧩', label: 'Casse-têtes' },
  { id: 'monde',    emoji: '🌍', label: 'Le monde & en libre' },
];

window.MAXPLAY_CATALOG = [

  // ─── 🦕 Les dinos ───
  { id:'dinos', category:'dinos', titre:'Encyclopédie Dinos', emoji:'🦕', desc:'50 dinos · 6 familles · fiches riches · audio', url:'dev-dinos.html?v=7', type:'encyclo', orientation:'any', access:'code', maxStars:0, unlock:{ code:'TRITRI', bundle:'dinos' }, tag:'tts', status:'wip' },
  { id:'mj-24', category:'dinos', titre:'Trouve le dino',     emoji:'🦕', desc:'Trouve le bon dino par son nom !',       url:'mj-24.html', type:'html', orientation:'any', access:'sequence', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-25', category:'dinos', titre:'Pareil pas pareil',  emoji:'🔍', desc:'Trouve le dino identique !',             url:'mj-25.html', type:'html', orientation:'any', access:'sequence', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-26', category:'dinos', titre:'Compte les dinos',   emoji:'🔢', desc:'Combien de dinos ? Compte-les !',        url:'mj-26.html', type:'html', orientation:'any', access:'sequence', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-27', category:'dinos', titre:'Lis le nom du dino', emoji:'📖', desc:'Lis le nom, trouve le bon dino !',       url:'mj-27.html', type:'html', orientation:'any', access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-28', category:'dinos', titre:'La lampe du paléontologue', emoji:'🔦', desc:'Fouille le noir, devine le dino caché !', url:'mj-28.html', type:'html', orientation:'any', access:'sequence', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-29', category:'dinos', titre:'La fabrique de noms', emoji:'🧩', desc:'Tri + cérat + ops : construis les noms !',    url:'mj-29.html', type:'html', orientation:'any', access:'sequence', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-30', category:'dinos', titre:'Range-les par taille', emoji:'📏', desc:'Du plus petit au plus grand, en vrais mètres !', url:'mj-30.html', type:'html', orientation:'any', access:'sequence', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-31', category:'dinos', titre:'Le grand voyage du temps', emoji:'🌋', desc:'Trias, Jurassique, Crétacé… et la météorite !', url:'mj-31.html', type:'html', orientation:'any', access:'sequence', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-33', category:'dinos', titre:'Memory des ombres', emoji:'🃏', desc:'Associe chaque ombre à son dino !',        url:'mj-33.html', type:'html', orientation:'any', access:'sequence', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-40', category:'dinos', titre:'Tangram des dinos', emoji:'🔺', desc:'7 pièces pour former la silhouette !',     url:'mj-40.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-41', category:'dinos', titre:'Les tuiles dinos',  emoji:'🀄', desc:'Trouve les paires de dinos libres !',      url:'mj-41.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-32', category:'dinos', titre:'L\'atelier coloriage', emoji:'🖍️', desc:'Colorie les 60 dinos, garde tes œuvres !', url:'mj-32.html', type:'html', orientation:'any', access:'free', maxStars:0, unlock:null, tag:'tts', status:'live' },

  // ─── 🎨 Les couleurs ───
  { id:'mj-09',  category:'couleurs', titre:'Trie les bus !',       emoji:'🗂️', desc:'Range-les dans leur famille de couleur !',url:'mj-09.html',type:'html', orientation:'landscape', access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-21',  category:'couleurs', titre:'Peins les bus !',      emoji:'🎨', desc:'Mélange rouge, jaune et bleu !',      url:'mj-21.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-18',  category:'couleurs', titre:'Tubes de couleurs',    emoji:'🧪', desc:'Verse les couleurs pour trier les tubes !',url:'mj-18.html',type:'html',orientation:'any',      access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },

  // ─── 🔢 Compter & lire (fusion compter + lire) ───
  { id:'mj-04',  category:'compter',  titre:'Compte les passagers', emoji:'👥', desc:'Combien de passagers en tout ?',      url:'mj-04.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-13c', category:'compter',  titre:'Combien avant ?',      emoji:'🔢', desc:'Compte les bus avant celui demandé !',url:'mj-13c.html', type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-05',  category:'compter',  titre:'La bonne place',       emoji:'🪑', desc:'Combien peuvent encore monter ?',     url:'mj-05.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-35',  category:'compter',  titre:'Le jeu des graines',   emoji:'🌱', desc:'Sème les graines, compte-les au grenier !', url:'mj-35.html', type:'html', orientation:'any',   access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-43',  category:'compter',  titre:'Remplis les caisses',  emoji:'📦', desc:'Range les dés et les dominos jusqu\'au bon compte !', url:'mj-43.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-46',  category:'compter',  titre:'Les œufs surprises',   emoji:'🥚', desc:'Compte les œufs du nid… ils éclosent !', url:'mj-46.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-47',  category:'compter',  titre:'Les constellations',   emoji:'✨', desc:'Combien de dinos dans le ciel ? Regarde d\'un coup d\'œil !', url:'mj-47.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-49',  category:'compter',  titre:'Les barquettes de 10',  emoji:'🔟', desc:'La boîte pleine fait 10 : lis les grands nombres d\'un coup !', url:'mj-49.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-48',  category:'compter',  titre:'Tout le monde monte !',  emoji:'🚌', desc:'Montées, descentes, file d\'attente : compte les passagers !', url:'mj-48.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-45',  category:'compter',  titre:'Le bus qui se remplit', emoji:'🚌', desc:'Fais monter et descendre les passagers, pile au bon compte !', url:'mj-45.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-50',  category:'compter',  titre:'Trouve la lettre',  emoji:'👂', desc:'Écoute le son (« mmm »), touche la lettre qui le fait !', url:'mj-50.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-06',  category:'compter',  titre:'Lis la phrase',        emoji:'📖', desc:'Quel mot manque dans la phrase ?',    url:'mj-06.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-23',  category:'compter',  titre:'Lis le mot',           emoji:'🔤', desc:'Lis le mot, trouve la bonne image !',url:'mj-23.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-44',  category:'compter',  titre:'La boîte à sons',      emoji:'🔤', desc:'Range chaque mot dans la boîte du bon son !', url:'mj-44.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },

  // ─── 🧩 Casse-têtes (fusion logique + observer + bricoler) ───
  { id:'mj-13a', category:'casse',    titre:'Le premier bus',       emoji:'🥇', desc:'Quel bus arrive en premier ?',       url:'mj-13a.html', type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-15',  category:'casse',    titre:'L\'intrus',            emoji:'🔍', desc:'Lequel est l\'intrus ?',              url:'mj-15.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-16',  category:'casse',    titre:'Complète la suite',    emoji:'📈', desc:'Qu\'est-ce qui vient ensuite ?',      url:'mj-16.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-34',  category:'casse',    titre:'Le dépôt bloqué',      emoji:'🚧', desc:'Fais glisser les bus, libère le tien !', url:'mj-34.html', type:'html', orientation:'any',   access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-37',  category:'casse',    titre:'Croque-échecs !',      emoji:'♟️', desc:'Fou, Tour, Cavalier… croque tous les goûters !', url:'mj-37.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-38',  category:'casse',    titre:'Saute-mouton !',       emoji:'🐑', desc:'Saute par-dessus les pions dodo !',   url:'mj-38.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-39',  category:'casse',    titre:'Blocs magiques',       emoji:'🟪', desc:'Pose les blocs, fais des lignes !',   url:'mj-39.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-19',  category:'casse',    titre:'Trouve le bus !',      emoji:'🎯', desc:'Repère le bon bus qui bouge !',       url:'mj-19.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-36',  category:'casse',    titre:'Le bon bus !',         emoji:'🚏', desc:'Envoie le bus de la bonne couleur !', url:'mj-36.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-08',  category:'casse',    titre:'Le grand rangement',   emoji:'🧸', desc:'Range le bazar dans les bons bacs !', url:'mj-08.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-17',  category:'casse',    titre:'Le garage',            emoji:'🔧', desc:'Essence, lavage, pneus — répare les bus !',url:'mj-17.html',type:'html',orientation:'any',      access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },

  // ─── 🌍 Le monde & en libre (fusion monde + langues + bacs à sable) ───
  { id:'mj-11',  category:'monde',    titre:'Quel pays ?',          emoji:'🌍', desc:'Trouve le pays du drapeau !',         url:'mj-11.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-22',  category:'monde',    titre:'Trouve le pays !',     emoji:'🗺️', desc:'Localise les 25 pays d\'Europe !',    url:'mj-22.html',  type:'html', orientation:'landscape', access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-20',  category:'monde',    titre:'Compte en 8 langues',  emoji:'🌐', desc:'Compter dans toutes les langues !',   url:'mj-20.html',  type:'html', orientation:'any',       access:'sequence', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-42',  category:'monde',    titre:'Shisima !',            emoji:'🇰🇪', desc:'Le jeu du point d\'eau, venu du Kenya !', url:'mj-42.html', type:'html', orientation:'any',      access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-12',         category:'monde', titre:'Nouveaux sons', emoji:'🎵', desc:'Bus, Mario, Pokémon et sons secrets !', url:'mj-12.html',         type:'html',   orientation:'any',       access:'free', maxStars:0, unlock:null, tag:null, status:'live' },
  { id:'max-adventure', category:'monde', titre:'Max Adventure', emoji:'🎮', desc:'Conduis ton bus dans Villejuif !',      url:'max-adventure.html', type:'phaser', orientation:'landscape', access:'free', maxStars:0, unlock:null, tag:null, status:'live' },
  { id:'mj-pose-tiles', category:'monde', titre:'Pose-tes-tiles', emoji:'🚧', desc:'Petit ouvrier ! Construis ta ville.',  url:'mj-pose-tiles.html', type:'html',   orientation:'landscape', access:'free', maxStars:0, unlock:null, tag:null, status:'live' },
];
