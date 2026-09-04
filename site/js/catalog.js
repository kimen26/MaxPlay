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
//  3 champs de gouvernance (décision Papa Yann 2026-07-28, C0 tri qualité) :
//    retire (bool)   — SORT du menu enfant (filtré par catalogVisible(), voir
//                       plus bas).
//    parental (bool) — jeu retiré du menu ENFANT mais toujours accessible
//                       depuis l'écran parental (compte.html), pour les
//                       bacs à sable qui n'ont pas leur place dans le Mur
//                       gamifié.
//    refonte (bool)  — informatif seulement, ne filtre RIEN. Marque un jeu
//                       qui RESTE affiché mais dont le contenu/design est
//                       identifié comme à refondre (suivi PMO, chantier C2-C4
//                       du plan studio/minijeux/docs/2026-07-28-plan-remise-au-propre.md).
//
//  PURGE 2026-08-10 (décision PY) : fini les entrées « trace » — un jeu retiré
//  est SUPPRIMÉ de ce fichier ET son code est effacé de site/. La trace (raison
//  + date de chaque retrait) vit dans studio/minijeux/pmo/backlog.md, pas ici.
//  Jeux supprimés ce jour : mj-01, mj-04, mj-05, mj-08, mj-11, mj-12, mj-13b,
//  mj-16, mj-17, mj-23, mj-25, mj-26, mj-27, mj-29, mj-33, mj-36, mj-41, mj-43,
//  mj-44, mj-45, mj-58, mj-gold-a, mj-gold-b. Leçon 2026-07-19 maintenue : la
//  conformité technique n'est PAS un argument de republication — ne jamais
//  ressusciter un jeu sans décision PY explicite et datée.
//
//  Filtrage : TOUJOURS passer par window.catalogVisible() (fonction unique
//  définie plus bas) pour tout rendu de menu — ne jamais refiltrer
//  MAXPLAY_CATALOG à la main dans un autre fichier. Le lookup par id (un jeu
//  qu'on lance, qu'on référence depuis un repaire/portail) continue lui à
//  chercher dans MAXPLAY_CATALOG brut (un jeu parental doit rester atteignable
//  par lien direct depuis l'écran parental).
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
  { id:'mj-24', category:'dinos', titre:'Trouve le dino',     emoji:'🦕', desc:'Trouve le bon dino par son nom !',       url:'mj-24.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  // ── Pack DinoJeux (spec PY 2026-07-31) ──
  { id:'mj-57', category:'dinos', titre:'Œufs Surprise',      emoji:'🎨', desc:'Tape les œufs de même couleur, les bébés éclosent !', url:'mj-57.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null, status:'live' },
  { id:'mj-28', category:'dinos', titre:'La lampe du dino', emoji:'🔦', desc:'Fouille le noir, devine le dino caché !', url:'mj-28.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-30', category:'dinos', titre:'Range-les par taille', emoji:'📏', desc:'Du plus petit au plus grand, en vrais mètres !', url:'mj-30.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-31', category:'dinos', titre:'Le voyage du temps', emoji:'🌋', desc:'Trias, Jurassique, Crétacé… et la météorite !', url:'mj-31.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-40', category:'dinos', titre:'Tangram des dinos', emoji:'🔺', desc:'7 pièces pour former la silhouette !',     url:'mj-40.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  { id:'mj-32', category:'dinos', titre:'L\'atelier coloriage', emoji:'🖍️', desc:'Colorie les 60 dinos, garde tes œuvres !', url:'mj-32.html', type:'html', orientation:'any', access:'free', maxStars:0, unlock:null, tag:'tts', status:'live' },

  // ─── 🎨 Les couleurs ───
  { id:'mj-09',  category:'couleurs', titre:'Trie les bus !',       emoji:'🗂️', desc:'Range-les dans leur famille de couleur !',url:'mj-09.html',type:'html', orientation:'landscape', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-21',  category:'couleurs', titre:'Peins les bus !',      emoji:'🎨', desc:'Mélange rouge, jaune et bleu !',      url:'mj-21.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-18',  category:'couleurs', titre:'Tubes de couleurs',    emoji:'🧪', desc:'Verse les couleurs pour trier les tubes !',url:'mj-18.html',type:'html',orientation:'any',      access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },

  // ─── 🔢 Compter & lire (fusion compter + lire) ───
  { id:'mj-13c', category:'compter',  titre:'Combien avant ?',      emoji:'🔢', desc:'Compte les bus avant celui demandé !',url:'mj-13c.html', type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-35',  category:'compter',  titre:'Le jeu des graines',   emoji:'🌱', desc:'Sème les graines, compte-les au grenier !', url:'mj-35.html', type:'html', orientation:'any',   access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  { id:'mj-46',  category:'compter',  titre:'Les œufs surprises',   emoji:'🥚', desc:'Compte les œufs du nid… ils éclosent !', url:'mj-46.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-47',  category:'compter',  titre:'Les constellations',   emoji:'✨', desc:'Combien de dinos dans le ciel ? Regarde d\'un coup d\'œil !', url:'mj-47.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-49',  category:'compter',  titre:'Les barquettes de 10',  emoji:'🔟', desc:'La boîte pleine fait 10 : lis les grands nombres d\'un coup !', url:'mj-49.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-48',  category:'compter',  titre:'Tout le monde monte',  emoji:'🚌', desc:'Montées, descentes, file d\'attente : compte les passagers !', url:'mj-48.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-53',  category:'compter',  titre:'Lis et fais',  emoji:'📖', desc:'Lis le mot, la syllabe, la consigne… et agis !', url:'mj-53.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-52',  category:'compter',  titre:'La boîte à mots',  emoji:'📮', desc:'Écoute le mot, construis-le avec les lettres mobiles !', url:'mj-52.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-51',  category:'compter',  titre:'Le tri des lettres',  emoji:'🔠', desc:'a attaché, a détaché, A MAJUSCULE : range chaque costume !', url:'mj-51.html', type:'html', orientation:'landscape', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-50',  category:'compter',  titre:'Trouve la lettre',  emoji:'👂', desc:'Écoute le son (« mmm »), touche la lettre qui le fait !', url:'mj-50.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-06',  category:'compter',  titre:'Lis la phrase',        emoji:'📖', desc:'Quel mot manque dans la phrase ?',    url:'mj-06.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },

  // ─── 🧩 Casse-têtes (fusion logique + observer + bricoler) ───
  // ── Pack DinoJeux logique (spec PY 2026-07-31, docs/specs/2026-07-31-dinojeux-pack-logique.md) ──
  { id:'mj-54',  category:'casse',    titre:'Sudoku Dino',          emoji:'🥚', desc:'Un de chaque partout : remplis la grille de dinos !', url:'mj-54.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-55',  category:'casse',    titre:'Équilibre',            emoji:'⚖️', desc:'Jamais 3 pareils qui se suivent : dinos et œufs à égalité !', url:'mj-55.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-56',  category:'casse',    titre:'Les Enclos',           emoji:'🦕', desc:'Un dino par enclos, et ils ne se touchent jamais !', url:'mj-56.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-59',  category:'casse',    titre:'Territoires',          emoji:'🟦', desc:'Découpe la vallée en territoires, un par pierre !', url:'mj-59.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-13a', category:'casse',    titre:'Le premier bus',       emoji:'🥇', desc:'Quel bus arrive en premier ?',       url:'mj-13a.html', type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-14',  category:'casse',    titre:'Les cases mystères',   emoji:'🔮', desc:'Devine la case qui manque dans la grille magique !', url:'mj-14.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  { id:'mj-15',  category:'casse',    titre:'L\'intrus',            emoji:'🔍', desc:'Lequel est l\'intrus ?',              url:'mj-15.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-34',  category:'casse',    titre:'Le dépôt bloqué',      emoji:'🚧', desc:'Fais glisser les bus, libère le tien !', url:'mj-34.html', type:'html', orientation:'any',   access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  { id:'mj-37',  category:'casse',    titre:'Croque-échecs !',      emoji:'♟️', desc:'Fou, Tour, Cavalier… croque tous les goûters !', url:'mj-37.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  { id:'mj-38',  category:'casse',    titre:'Saute-mouton !',       emoji:'🐑', desc:'Saute par-dessus les pions dodo !',   url:'mj-38.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  // mj-39 « Blocs magiques » — 🔒 voir docs/jeux/figees/mj-39.md : jamais de chrono/vitesse de chute (refus PY du Tetris 2026-07-28).
  { id:'mj-39',  category:'casse',    titre:'Blocs magiques',       emoji:'🟪', desc:'Pose les blocs, fais des lignes !',   url:'mj-39.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  { id:'mj-19',  category:'casse',    titre:'Trouve le bus !',      emoji:'🎯', desc:'Repère le bon bus qui bouge !',       url:'mj-19.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },

  // ─── 🌍 Le monde & en libre (fusion monde + langues + bacs à sable) ───
  { id:'mj-22',  category:'monde',    titre:'Trouve le pays !',     emoji:'🗺️', desc:'Localise les 25 pays d\'Europe !',    url:'mj-22.html',  type:'html', orientation:'landscape', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  { id:'mj-20',  category:'monde',    titre:'Compte en 8 langues',  emoji:'🌐', desc:'Compter dans toutes les langues !',   url:'mj-20.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  { id:'mj-42',  category:'monde',    titre:'Shisima !',            emoji:'🇰🇪', desc:'Le jeu du point d\'eau, venu du Kenya !', url:'mj-42.html', type:'html', orientation:'any',      access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  // DÉPLACÉS vers l'écran parental 2026-07-28 (C0) : bacs à sable libres, pas
  // d'étoiles/pédagogie évaluable → hors du Mur gamifié enfant, accessibles
  // depuis compte.html (lien discret). GARDÉS sous la main (PY 2026-08-10).
];

// ─────────────────────────────────────────────────────────────────────────
//  catalogVisible() — FONCTION UNIQUE DE FILTRAGE menu enfant (2026-07-28)
//  Filtre les entrées retire:true. TOUT rendu de menu enfant (Mur, tiroirs
//  catégorie, total étoiles, jeu du jour, chaînage suivant/précédent) DOIT
//  passer par cette fonction — jamais un `.filter(e => !e.retire)` recopié
//  ailleurs (une seule règle, un seul endroit à faire évoluer).
//  Le lookup par id (lancer un jeu, résoudre un repaire/portail depuis mur.js)
//  continue lui à lire MAXPLAY_CATALOG brut : un jeu parental doit rester
//  atteignable par lien direct (écran parental).
// ─────────────────────────────────────────────────────────────────────────
window.catalogVisible = function () {
  return (window.MAXPLAY_CATALOG || []).filter(function (e) { return !e.retire; });
};
