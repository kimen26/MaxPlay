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
//                       plus bas). L'entrée est GARDÉE dans ce fichier (jamais
//                       supprimée) pour qu'aucun audit futur ne re-propose un
//                       jeu déjà écarté à raison (leçon 2026-07-19 : la
//                       conformité technique n'est pas un argument de
//                       republication). Toujours accompagné d'un commentaire
//                       inline citant la raison + la date de la décision.
//    parental (bool) — jeu retiré du menu ENFANT mais toujours accessible
//                       depuis l'écran parental (compte.html), pour les
//                       bacs à sable qui n'ont pas leur place dans le Mur
//                       gamifié (max-adventure, mj-pose-tiles).
//    refonte (bool)  — informatif seulement, ne filtre RIEN. Marque un jeu
//                       qui RESTE affiché mais dont le contenu/design est
//                       identifié comme à refondre (suivi PMO, chantier C2-C4
//                       du plan studio/minijeux/docs/2026-07-28-plan-remise-au-propre.md).
//
//  Verdict C0 appliqué ici (2026-07-28, conseiller game-conseiller + arbitrages
//  PY, voir studio/minijeux/pmo/backlog.md entrées du 2026-07-28) : 45 entrées
//  catalogue → 30 visibles au menu enfant. RETIRER 13 (dont mj-25/29/33/41
//  déjà écartés le 2026-07-21, re-tracés ici pour mémoire) · DÉPLACER 2 vers
//  écran parental (max-adventure, mj-pose-tiles) · FUSIONNER 5 (absorbées par
//  un jeu survivant, retire:true + note pointant l'absorbant) · REFONTE 11
//  (restent visibles, refonte:true informatif) · GARDER 19 tel quel.
//
//  Filtrage : TOUJOURS passer par window.catalogVisible() (fonction unique
//  définie plus bas) pour tout rendu de menu — ne jamais refiltrer
//  MAXPLAY_CATALOG à la main dans un autre fichier. Le lookup par id (un jeu
//  qu'on lance, qu'on référence depuis un repaire/portail) continue lui à
//  chercher dans MAXPLAY_CATALOG brut (un jeu retire:true doit rester
//  atteignable par lien direct pour l'écran parental / historique).
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
  // RETIRÉ 2026-07-28 (C0) : redondant avec mj-46 « il y en a combien » (même peau, mêmes moteurs de dénombrement).
  { id:'mj-26', category:'dinos', titre:'Compte les dinos',   emoji:'🔢', desc:'Combien de dinos ? Compte-les !',        url:'mj-26.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live', retire:true },
  // FUSIONNÉ 2026-07-28 (C0) : absorbé par mj-53 « Lis et fais » (même mécanique lecture+choix).
  { id:'mj-27', category:'dinos', titre:'Lis le nom du dino', emoji:'📖', desc:'Lis le nom, trouve le bon dino !',       url:'mj-27.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', retire:true },
  { id:'mj-28', category:'dinos', titre:'La lampe du paléontologue', emoji:'🔦', desc:'Fouille le noir, devine le dino caché !', url:'mj-28.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-30', category:'dinos', titre:'Range-les par taille', emoji:'📏', desc:'Du plus petit au plus grand, en vrais mètres !', url:'mj-30.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-31', category:'dinos', titre:'Le grand voyage du temps', emoji:'🌋', desc:'Trias, Jurassique, Crétacé… et la météorite !', url:'mj-31.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-40', category:'dinos', titre:'Tangram des dinos', emoji:'🔺', desc:'7 pièces pour former la silhouette !',     url:'mj-40.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  { id:'mj-32', category:'dinos', titre:'L\'atelier coloriage', emoji:'🖍️', desc:'Colorie les 60 dinos, garde tes œuvres !', url:'mj-32.html', type:'html', orientation:'any', access:'free', maxStars:0, unlock:null, tag:'tts', status:'live' },

  // ─── 🎨 Les couleurs ───
  { id:'mj-09',  category:'couleurs', titre:'Trie les bus !',       emoji:'🗂️', desc:'Range-les dans leur famille de couleur !',url:'mj-09.html',type:'html', orientation:'landscape', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-21',  category:'couleurs', titre:'Peins les bus !',      emoji:'🎨', desc:'Mélange rouge, jaune et bleu !',      url:'mj-21.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-18',  category:'couleurs', titre:'Tubes de couleurs',    emoji:'🧪', desc:'Verse les couleurs pour trier les tubes !',url:'mj-18.html',type:'html',orientation:'any',      access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },

  // ─── 🔢 Compter & lire (fusion compter + lire) ───
  // RETIRÉ 2026-07-28 (C0) : redondant avec mj-46 « il y en a combien » (mj-04 = mj-46 en peau passagers).
  { id:'mj-04',  category:'compter',  titre:'Compte les passagers', emoji:'👥', desc:'Combien de passagers en tout ?',      url:'mj-04.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', retire:true },
  { id:'mj-13c', category:'compter',  titre:'Combien avant ?',      emoji:'🔢', desc:'Compte les bus avant celui demandé !',url:'mj-13c.html', type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  // RETIRÉ 2026-07-28 (C0) : redondant avec mj-48 « il en arrive et il en part » (mj-05 = mj-48 en moins bon, panneau texte à lire).
  { id:'mj-05',  category:'compter',  titre:'La bonne place',       emoji:'🪑', desc:'Combien peuvent encore monter ?',     url:'mj-05.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', retire:true },
  { id:'mj-35',  category:'compter',  titre:'Le jeu des graines',   emoji:'🌱', desc:'Sème les graines, compte-les au grenier !', url:'mj-35.html', type:'html', orientation:'any',   access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  // RETIRÉ 2026-07-28 (C0) : même moteur que mj-45 (mj-dice.js) — redondance de moteur, pas de thème.
  { id:'mj-43',  category:'compter',  titre:'Remplis les caisses',  emoji:'📦', desc:'Range les dés et les dominos jusqu\'au bon compte !', url:'mj-43.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', retire:true },
  { id:'mj-46',  category:'compter',  titre:'Les œufs surprises',   emoji:'🥚', desc:'Compte les œufs du nid… ils éclosent !', url:'mj-46.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-47',  category:'compter',  titre:'Les constellations',   emoji:'✨', desc:'Combien de dinos dans le ciel ? Regarde d\'un coup d\'œil !', url:'mj-47.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-49',  category:'compter',  titre:'Les barquettes de 10',  emoji:'🔟', desc:'La boîte pleine fait 10 : lis les grands nombres d\'un coup !', url:'mj-49.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-48',  category:'compter',  titre:'Tout le monde monte !',  emoji:'🚌', desc:'Montées, descentes, file d\'attente : compte les passagers !', url:'mj-48.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  // FUSIONNÉ 2026-07-28 (C0) : absorbé par mj-48 « il en arrive et il en part » — la variante
  // « des passagers descendent » devient TODO 3e étoile de mj-48 (voir docs/jeux/figees/mj-48.md).
  { id:'mj-45',  category:'compter',  titre:'Le bus qui se remplit', emoji:'🚌', desc:'Fais monter et descendre les passagers, pile au bon compte !', url:'mj-45.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', retire:true },
  { id:'mj-53',  category:'compter',  titre:'Lis et fais',  emoji:'📖', desc:'Lis le mot, la syllabe, la consigne… et agis !', url:'mj-53.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-52',  category:'compter',  titre:'La boîte à mots',  emoji:'📮', desc:'Écoute le mot, construis-le avec les lettres mobiles !', url:'mj-52.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-51',  category:'compter',  titre:'Le tri des lettres',  emoji:'🔠', desc:'a attaché, a détaché, A MAJUSCULE : range chaque costume !', url:'mj-51.html', type:'html', orientation:'landscape', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-50',  category:'compter',  titre:'Trouve la lettre',  emoji:'👂', desc:'Écoute le son (« mmm »), touche la lettre qui le fait !', url:'mj-50.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live' },
  { id:'mj-06',  category:'compter',  titre:'Lis la phrase',        emoji:'📖', desc:'Quel mot manque dans la phrase ?',    url:'mj-06.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  // FUSIONNÉ 2026-07-28 (C0) : absorbé par mj-53 « Lis et fais ».
  { id:'mj-23',  category:'compter',  titre:'Lis le mot',           emoji:'🔤', desc:'Lis le mot, trouve la bonne image !',url:'mj-23.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', retire:true },
  // FUSIONNÉ 2026-07-28 (C0) : absorbé par mj-50 « Trouve la lettre » (mêmes phonèmes).
  { id:'mj-44',  category:'compter',  titre:'La boîte à sons',      emoji:'🔤', desc:'Range chaque mot dans la boîte du bon son !', url:'mj-44.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live', retire:true },

  // ─── 🧩 Casse-têtes (fusion logique + observer + bricoler) ───
  { id:'mj-13a', category:'casse',    titre:'Le premier bus',       emoji:'🥇', desc:'Quel bus arrive en premier ?',       url:'mj-13a.html', type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  { id:'mj-14',  category:'casse',    titre:'Les cases mystères',   emoji:'🔮', desc:'Devine la case qui manque dans la grille magique !', url:'mj-14.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  { id:'mj-15',  category:'casse',    titre:'L\'intrus',            emoji:'🔍', desc:'Lequel est l\'intrus ?',              url:'mj-15.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  // RETIRÉ 2026-07-28 (C0) : passe de tri qualité game-conseiller.
  { id:'mj-16',  category:'casse',    titre:'Complète la suite',    emoji:'📈', desc:'Qu\'est-ce qui vient ensuite ?',      url:'mj-16.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', retire:true },
  { id:'mj-34',  category:'casse',    titre:'Le dépôt bloqué',      emoji:'🚧', desc:'Fais glisser les bus, libère le tien !', url:'mj-34.html', type:'html', orientation:'any',   access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  { id:'mj-37',  category:'casse',    titre:'Croque-échecs !',      emoji:'♟️', desc:'Fou, Tour, Cavalier… croque tous les goûters !', url:'mj-37.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  { id:'mj-38',  category:'casse',    titre:'Saute-mouton !',       emoji:'🐑', desc:'Saute par-dessus les pions dodo !',   url:'mj-38.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  // mj-39 « Blocs magiques » — 🔒 voir docs/jeux/figees/mj-39.md : jamais de chrono/vitesse de chute (refus PY du Tetris 2026-07-28).
  { id:'mj-39',  category:'casse',    titre:'Blocs magiques',       emoji:'🟪', desc:'Pose les blocs, fais des lignes !',   url:'mj-39.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  { id:'mj-19',  category:'casse',    titre:'Trouve le bus !',      emoji:'🎯', desc:'Repère le bon bus qui bouge !',       url:'mj-19.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live' },
  // RETIRÉ 2026-07-28 (C0) : passe de tri qualité game-conseiller.
  { id:'mj-36',  category:'casse',    titre:'Le bon bus !',         emoji:'🚏', desc:'Envoie le bus de la bonne couleur !', url:'mj-36.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', retire:true },
  // FUSIONNÉ 2026-07-28 (C0) : absorbé par mj-09 (tri générique multi-asset).
  { id:'mj-08',  category:'casse',    titre:'Le grand rangement',   emoji:'🧸', desc:'Range le bazar dans les bons bacs !', url:'mj-08.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', retire:true },
  // RETIRÉ 2026-07-28 (C0, DÉCISION PY) : concept "prendre soin" (soigner/laver/réparer) GARDÉ comme piste à
  // re-concevoir proprement (pas un reskin) — voir EP-112, studio/minijeux/pmo/backlog.md 2026-07-28.
  { id:'mj-17',  category:'casse',    titre:'Le garage',            emoji:'🔧', desc:'Essence, lavage, pneus — répare les bus !',url:'mj-17.html',type:'html',orientation:'any',      access:'free', maxStars:3, unlock:null, tag:null,  status:'live', retire:true },

  // ─── 🌍 Le monde & en libre (fusion monde + langues + bacs à sable) ───
  // RETIRÉ 2026-07-28 (C0) : passe de tri qualité game-conseiller.
  { id:'mj-11',  category:'monde',    titre:'Quel pays ?',          emoji:'🌍', desc:'Trouve le pays du drapeau !',         url:'mj-11.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:'tts', status:'live', retire:true },
  { id:'mj-22',  category:'monde',    titre:'Trouve le pays !',     emoji:'🗺️', desc:'Localise les 25 pays d\'Europe !',    url:'mj-22.html',  type:'html', orientation:'landscape', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  { id:'mj-20',  category:'monde',    titre:'Compte en 8 langues',  emoji:'🌐', desc:'Compter dans toutes les langues !',   url:'mj-20.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  { id:'mj-42',  category:'monde',    titre:'Shisima !',            emoji:'🇰🇪', desc:'Le jeu du point d\'eau, venu du Kenya !', url:'mj-42.html', type:'html', orientation:'any',      access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true },
  // RETIRÉ 2026-07-28 (C0) : passe de tri qualité game-conseiller.
  { id:'mj-12',         category:'monde', titre:'Nouveaux sons', emoji:'🎵', desc:'Bus, Mario, Pokémon et sons secrets !', url:'mj-12.html',         type:'html',   orientation:'any',       access:'free', maxStars:0, unlock:null, tag:null, status:'live', retire:true },
  // DÉPLACÉ vers l'écran parental 2026-07-28 (C0) : bac à sable libre, pas d'étoiles/pédagogie évaluable
  // → sort du Mur gamifié enfant, reste accessible depuis compte.html (lien discret).
  { id:'max-adventure', category:'monde', titre:'Max Adventure', emoji:'🎮', desc:'Conduis ton bus dans Villejuif !',      url:'max-adventure.html', type:'phaser', orientation:'landscape', access:'free', maxStars:0, unlock:null, tag:null, status:'live', retire:true, parental:true },
  { id:'mj-pose-tiles', category:'monde', titre:'Pose-tes-tiles', emoji:'🚧', desc:'Petit ouvrier ! Construis ta ville.',  url:'mj-pose-tiles.html', type:'html',   orientation:'landscape', access:'free', maxStars:0, unlock:null, tag:null, status:'live', retire:true, parental:true },

  // ─── Retirés du menu enfant (décisions PY 2026-07-21), TRACE SEULE ────────
  // Ré-créées 2026-07-28 pour que la décision soit gravée dans ce fichier (pas
  // seulement le backlog) — cf. commit e8948785, historique studio/minijeux/pmo/backlog.md.
  // "on ne fait pas du nombre mais de la qualité" (PY) : la conformité technique
  // n'est PAS un argument de republication, ne JAMAIS les remettre au menu sans
  // décision PY explicite et datée.
  // RETIRÉ 2026-07-21 (PY) : "0 difficulté, aucun gain pédagogique, ça dégage".
  { id:'mj-25', category:'dinos', titre:'Pareil pas pareil',  emoji:'🔍', desc:'Trouve le dino identique !',             url:'mj-25.html', type:'html', orientation:'any', access:'sequence', maxStars:3, unlock:null, tag:'tts', status:'live', retire:true },
  // RETIRÉ 2026-07-21 (PY) : "on en a déjà un qui fait ça, pas fluide" (doublon).
  { id:'mj-29', category:'dinos', titre:'La fabrique de noms', emoji:'🧩', desc:'Tri + cérat + ops : construis les noms !',    url:'mj-29.html', type:'html', orientation:'any', access:'sequence', maxStars:3, unlock:null, tag:'tts', status:'live', retire:true },
  // RETIRÉ 2026-07-21 (PY) : "à regrouper dans un mémory générique multi-styles".
  { id:'mj-33', category:'dinos', titre:'Memory des ombres', emoji:'🃏', desc:'Associe chaque ombre à son dino !',        url:'mj-33.html', type:'html', orientation:'any', access:'sequence', maxStars:3, unlock:null, tag:'tts', status:'live', retire:true },
  // RETIRÉ 2026-07-21 (PY) : "pas compris la difficulté, V1 pas besoin d'afficher".
  { id:'mj-41', category:'dinos', titre:'Les tuiles dinos',  emoji:'🀄', desc:'Trouve les paires de dinos libres !',      url:'mj-41.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', retire:true },
];

// ─────────────────────────────────────────────────────────────────────────
//  catalogVisible() — FONCTION UNIQUE DE FILTRAGE menu enfant (2026-07-28)
//  Filtre les entrées retire:true. TOUT rendu de menu enfant (Mur, tiroirs
//  catégorie, total étoiles, jeu du jour, chaînage suivant/précédent) DOIT
//  passer par cette fonction — jamais un `.filter(e => !e.retire)` recopié
//  ailleurs (une seule règle, un seul endroit à faire évoluer).
//  Le lookup par id (lancer un jeu, résoudre un repaire/portail depuis mur.js)
//  continue lui à lire MAXPLAY_CATALOG brut : un jeu retire:true doit rester
//  atteignable par lien direct (écran parental, historique, code fixe).
// ─────────────────────────────────────────────────────────────────────────
window.catalogVisible = function () {
  return (window.MAXPLAY_CATALOG || []).filter(function (e) { return !e.retire; });
};
