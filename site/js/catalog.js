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
//  Champs MUR (HO-R09, décision PY : le Mur lit le catalogue, il n'a plus
//  aucun id en dur) :
//    zone (string)       — id du copain/coin de La Vallée qui héberge ce jeu
//                           ('spino'|'galli'|'troudi'|'volta'|'dino'|'trex').
//                           Un jeu sans zone n'apparaît pas dans La Vallée
//                           (encyclopédie 'dinos' notamment, portée par le Roi).
//    murOrder (number)   — rang dans la chaîne de déblocage 2★ DE SA ZONE
//                           (0 = premier). Deux jeux de la même zone ne
//                           partagent jamais le même rang. Un jeu sans zone
//                           n'a pas besoin de murOrder.
//    libelleMur (string)  — titre affiché dans la bulle du Mur (peut différer
//                           du `titre` catalogue, plus long/descriptif ailleurs).
//                           Absent → `titre` sert de repli.
//    vignette (string)   — HTML (CSS/SVG pur, zéro emoji) de la mini-vignette
//                           affichée dans la bulle du copain. Absent → vignette
//                           générique (voir mur.js `vignetteHtml`).
//    libre (bool)         — jeu affiché dans sa zone SANS entrer dans la chaîne
//                           de déblocage à 2★ (toujours visible, ex. coloriage).
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
  { id:'mj-24', category:'dinos', titre:'Trouve le dino',     emoji:'🦕', desc:'Trouve le bon dino par son nom !',       url:'mj-24.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live', murOrder:1, zone:'dino', libelleMur:'Le cache-cache des dinos', vignette:'<div class="vig vig-ombre"><img src="img/dinos/ombres/Triceratops_ombre.png" alt=""></div>' },
  // ── Pack DinoJeux (spec PY 2026-07-31) ──
  { id:'mj-57', category:'dinos', titre:'Œufs Surprise',      emoji:'🎨', desc:'Tape les œufs de même couleur, les bébés éclosent !', url:'mj-57.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null, status:'live', murOrder:0, zone:'dino', libelleMur:'Œufs Surprise', vignette:'<div class="vig vig-oeufs-col"><i></i><i></i><i></i><i></i></div>' },
  { id:'mj-28', category:'dinos', titre:'La lampe du dino', emoji:'🔦', desc:'Fouille le noir, devine le dino caché !', url:'mj-28.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live', murOrder:2, zone:'dino', libelleMur:'La lampe magique', vignette:'<div class="vig vig-lampe"><img class="vl-dino" src="img/dinos/ombres/Gallimimus_ombre.png" alt=""></div>' },
  { id:'mj-30', category:'dinos', titre:'Range-les par taille', emoji:'📏', desc:'Du plus petit au plus grand, en vrais mètres !', url:'mj-30.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live', murOrder:4, zone:'dino', libelleMur:'Du plus petit au plus grand', vignette:'<div class="vig vig-tailles"><img src="img/dinos/ombres/Velociraptor_ombre.png" alt=""><img src="img/dinos/ombres/Triceratops_ombre.png" alt=""><img src="img/dinos/ombres/Diplodocus_ombre.png" alt=""></div>' },
  { id:'mj-31', category:'dinos', titre:'Le voyage du temps', emoji:'🌋', desc:'Trias, Jurassique, Crétacé… et la météorite !', url:'mj-31.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live', murOrder:3, zone:'dino', libelleMur:'La machine à voyager dans le temps', vignette:'<div class="vig vig-temps"><span class="v-aiguille"></span><span class="v-aiguille a2"></span></div>' },
  { id:'mj-40', category:'dinos', titre:'Tangram des dinos', emoji:'🔺', desc:'7 pièces pour former la silhouette !',     url:'mj-40.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true, murOrder:6, zone:'dino', vignette:'<div class="vig vig-tangram"><i class="t1"></i><i class="t2"></i><i class="t3"></i></div>' },
  { id:'mj-32', category:'dinos', titre:'L\'atelier coloriage', emoji:'🖍️', desc:'Colorie les 60 dinos, garde tes œuvres !', url:'mj-32.html', type:'html', orientation:'any', access:'free', maxStars:0, unlock:null, tag:'tts', status:'live', murOrder:5, zone:'dino', libre:true, libelleMur:'L\'atelier coloriage', vignette:'<div class="vig"><img class="v-img" src="img/dinos/paleoart/Triceratops_coloriage.webp" alt=""></div>' },

  // ─── 🎨 Les couleurs ───
  { id:'mj-09',  category:'couleurs', titre:'Trie les bus !',       emoji:'🗂️', desc:'Range-les dans leur famille de couleur !',url:'mj-09.html',type:'html', orientation:'landscape', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', murOrder:10, zone:'troudi', vignette:'<div class="vig vig-bus" data-bus="162"></div>' },
  { id:'mj-21',  category:'couleurs', titre:'Peins les bus !',      emoji:'🎨', desc:'Mélange rouge, jaune et bleu !',      url:'mj-21.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', murOrder:0, zone:'volta', libelleMur:'L\'atelier peinture', vignette:'<div class="vig vig-peinture"><i class="b-r"></i><i class="b-j"></i><i class="b-b"></i></div>' },
  { id:'mj-18',  category:'couleurs', titre:'Tubes de couleurs',    emoji:'🧪', desc:'Verse les couleurs pour trier les tubes !',url:'mj-18.html',type:'html',orientation:'any',      access:'free', maxStars:3, unlock:null, tag:null,  status:'live', murOrder:6, zone:'troudi', libelleMur:'Les potions', vignette:'<div class="vig vig-tubes"><div class="vig-tube"><i style="background:#e0655a"></i><i style="background:#4d9de0"></i></div><div class="vig-tube"><i style="background:#ffd166"></i><i style="background:#e0655a"></i></div><div class="vig-tube"><i style="background:#4d9de0"></i><i style="background:#ffd166"></i></div></div>' },

  // ─── 🔢 Compter & lire (fusion compter + lire) ───
  { id:'mj-13c', category:'compter',  titre:'Combien avant ?',      emoji:'🔢', desc:'Compte les bus avant celui demandé !',url:'mj-13c.html', type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', murOrder:11, zone:'troudi', vignette:'<div class="vig vig-compte"><i></i><i></i><span class="dix">3</span></div>' },
  { id:'mj-35',  category:'compter',  titre:'Le jeu des graines',   emoji:'🌱', desc:'Sème les graines, compte-les au grenier !', url:'mj-35.html', type:'html', orientation:'any',   access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true, murOrder:4, zone:'spino', vignette:'<div class="vig vig-graines"><i></i><i></i><i></i></div>' },
  { id:'mj-46',  category:'compter',  titre:'Les œufs surprises',   emoji:'🥚', desc:'Compte les œufs du nid… ils éclosent !', url:'mj-46.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', murOrder:0, zone:'spino', libelleMur:'Les œufs surprises', vignette:'<div class="vig vig-oeufs"><i></i><i></i><i></i></div>' },
  { id:'mj-47',  category:'compter',  titre:'Les constellations',   emoji:'✨', desc:'Combien de dinos dans le ciel ? Regarde d\'un coup d\'œil !', url:'mj-47.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', murOrder:1, zone:'spino', libelleMur:'Les constellations', vignette:'<div class="vig vig-constel"><i></i><i></i><i></i><i></i></div>' },
  { id:'mj-49',  category:'compter',  titre:'Les barquettes de 10',  emoji:'🔟', desc:'La boîte pleine fait 10 : lis les grands nombres d\'un coup !', url:'mj-49.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', murOrder:3, zone:'spino', libelleMur:'Les barquettes de 10', vignette:'<div class="vig vig-barq"><span class="dix">10</span></div>' },
  { id:'mj-48',  category:'compter',  titre:'Tout le monde monte',  emoji:'🚌', desc:'Montées, descentes, file d\'attente : compte les passagers !', url:'mj-48.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', murOrder:2, zone:'spino', libelleMur:'Tout le monde monte !', vignette:'<div class="vig vig-bus vig-monte" data-bus="162"></div>' },
  { id:'mj-53',  category:'compter',  titre:'Lis et fais',  emoji:'📖', desc:'Lis le mot, la syllabe, la consigne… et agis !', url:'mj-53.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live', murOrder:3, zone:'galli', libelleMur:'Lis et fais', vignette:'<div class="vig vig-lisfais"><span class="vig-lettre lf-mot">pa</span><span class="lf-fleche">→</span><div class="mjk-oeuf-mini"></div></div>' },
  { id:'mj-52',  category:'compter',  titre:'La boîte à mots',  emoji:'📮', desc:'Écoute le mot, construis-le avec les lettres mobiles !', url:'mj-52.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live', murOrder:2, zone:'galli', libelleMur:'La boîte à mots', vignette:'<div class="vig vig-boitemot"><div class="boite"><span class="s1">pa</span><span class="sep"></span><span class="s2">pa</span></div></div>' },
  { id:'mj-51',  category:'compter',  titre:'Le tri des lettres',  emoji:'🔠', desc:'a attaché, a détaché, A MAJUSCULE : range chaque costume !', url:'mj-51.html', type:'html', orientation:'landscape', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live', murOrder:1, zone:'galli', libelleMur:'Le tri des lettres', vignette:'<div class="vig vig-tri"><div class="tri-case c1"><span class="vig-lettre">a</span></div><div class="tri-case c2"><span class="vig-lettre script">a</span></div><span class="tri-fleche">→</span></div>' },
  { id:'mj-50',  category:'compter',  titre:'Trouve la lettre',  emoji:'👂', desc:'Écoute le son (« mmm »), touche la lettre qui le fait !', url:'mj-50.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:'tts', status:'live', murOrder:0, zone:'galli', libelleMur:'Trouve la lettre', vignette:'<div class="vig vig-son-lettre"><img class="vsl-dino" src="img/dinos/ombres/Gallimimus_ombre.png" alt=""><span class="vig-lettre">m</span><i class="w1"></i><i class="w2"></i></div>' },
  { id:'mj-06',  category:'compter',  titre:'Lis la phrase',        emoji:'📖', desc:'Quel mot manque dans la phrase ?',    url:'mj-06.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true, murOrder:4, zone:'galli', vignette:'<div class="vig vig-phrase"><span class="vig-lettre lf-mot">___</span></div>' },

  // ─── 🧩 Casse-têtes (fusion logique + observer + bricoler) ───
  // ── Pack DinoJeux logique (spec PY 2026-07-31, docs/specs/2026-07-31-dinojeux-pack-logique.md) ──
  { id:'mj-54',  category:'casse',    titre:'Sudoku Dino',          emoji:'🥚', desc:'Un de chaque partout : remplis la grille de dinos !', url:'mj-54.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', murOrder:0, zone:'troudi', libelleMur:'Sudoku Dino', vignette:'<div class="vig vig-sudoku"><img src="img/dinos/ombres/Triceratops_ombre.png" alt=""><span class="mjk-oeuf-mini"></span><span class="mjk-oeuf-mini"></span><img src="img/dinos/ombres/Velociraptor_ombre.png" alt=""></div>' },
  { id:'mj-55',  category:'casse',    titre:'Équilibre',            emoji:'⚖️', desc:'Jamais 3 pareils qui se suivent : dinos et œufs à égalité !', url:'mj-55.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', murOrder:1, zone:'troudi', libelleMur:'Équilibre', vignette:'<div class="vig vig-equilibre"><img src="img/dinos/ombres/Diplodocus_ombre.png" alt=""><span class="mjk-oeuf-mini"></span><span class="eq-q">?</span></div>' },
  { id:'mj-56',  category:'casse',    titre:'Les Enclos',           emoji:'🦕', desc:'Un dino par enclos, et ils ne se touchent jamais !', url:'mj-56.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', murOrder:8, zone:'troudi', libelleMur:'Les Enclos', vignette:'<div class="vig vig-enclos"><i class="z1"></i><i class="z2"></i><i class="z3"></i><i class="z4"></i><img src="img/dinos/ombres/Stegosaurus_ombre.png" alt=""></div>' },
  { id:'mj-59',  category:'casse',    titre:'Territoires',          emoji:'🟦', desc:'Découpe la vallée en territoires, un par pierre !', url:'mj-59.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', murOrder:9, zone:'troudi', libelleMur:'Territoires', vignette:'<div class="vig vig-terr"><i class="r1"></i><i class="r2"></i><i class="r3"></i></div>' },
  { id:'mj-13a', category:'casse',    titre:'Le premier bus',       emoji:'🥇', desc:'Quel bus arrive en premier ?',       url:'mj-13a.html', type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', murOrder:3, zone:'troudi', libelleMur:'La course des bus', vignette:'<div class="vig vig-bus" data-bus="162,185"></div>' },
  { id:'mj-14',  category:'casse',    titre:'Les cases mystères',   emoji:'🔮', desc:'Devine la case qui manque dans la grille magique !', url:'mj-14.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true, murOrder:4, zone:'troudi', libelleMur:'Les cases mystères', vignette:'<div class="vig vig-grille"><i></i><i class="rond"></i><i></i><i class="rond"></i><i></i><i class="rond"></i><i></i><i class="rond"></i><i class="vide"></i></div>' },
  { id:'mj-15',  category:'casse',    titre:'L\'intrus',            emoji:'🔍', desc:'Lequel est l\'intrus ?',              url:'mj-15.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', murOrder:2, zone:'troudi', libelleMur:'L\'intrus', vignette:'<div class="vig vig-intrus"><i></i><i></i><i class="autre"></i><i></i></div>' },
  { id:'mj-34',  category:'casse',    titre:'Le dépôt bloqué',      emoji:'🚧', desc:'Fais glisser les bus, libère le tien !', url:'mj-34.html', type:'html', orientation:'any',   access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true, murOrder:7, zone:'troudi', libelleMur:'Le dépôt bloqué', vignette:'<div class="vig vig-blocs"><i class="bus"></i><i class="b2"></i><i></i><i class="b3"></i><i></i><i></i><i class="b2"></i><i></i><i></i><i class="b3"></i><i></i><i></i></div>' },
  { id:'mj-37',  category:'casse',    titre:'Croque-échecs !',      emoji:'♟️', desc:'Fou, Tour, Cavalier… croque tous les goûters !', url:'mj-37.html', type:'html', orientation:'any', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true, murOrder:12, zone:'troudi', vignette:'<div class="vig vig-echecs"><i class="case c1"></i><i class="case c2"></i><i class="pion"></i></div>' },
  { id:'mj-38',  category:'casse',    titre:'Saute-mouton !',       emoji:'🐑', desc:'Saute par-dessus les pions dodo !',   url:'mj-38.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true, murOrder:13, zone:'troudi', vignette:'<div class="vig vig-saute"><i class="mouton"></i><i class="mouton m2"></i></div>' },
  // mj-39 « Blocs magiques » — 🔒 voir docs/jeux/figees/mj-39.md : jamais de chrono/vitesse de chute (refus PY du Tetris 2026-07-28).
  { id:'mj-39',  category:'casse',    titre:'Blocs magiques',       emoji:'🟪', desc:'Pose les blocs, fais des lignes !',   url:'mj-39.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true, murOrder:14, zone:'troudi', vignette:'<div class="vig vig-blocsm"><i></i><i></i><i></i><i></i></div>' },
  { id:'mj-19',  category:'casse',    titre:'Trouve le bus !',      emoji:'🎯', desc:'Repère le bon bus qui bouge !',       url:'mj-19.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', murOrder:5, zone:'troudi', libelleMur:'Trouve-le !', vignette:'<div class="vig vig-cible"></div>' },

  // ─── 🌍 Le monde & en libre (fusion monde + langues + bacs à sable) ───
  { id:'mj-22',  category:'monde',    titre:'Trouve le pays !',     emoji:'🗺️', desc:'Localise les 25 pays d\'Europe !',    url:'mj-22.html',  type:'html', orientation:'landscape', access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true, murOrder:2, zone:'volta', libelleMur:'Où est le pays ?', vignette:'<div class="vig vig-carte"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="#2fbf8f" d="M18 30c10-8 22-10 32-6 12 5 24 2 32-6v44c-8 8-20 11-32 6-10-4-22-2-32 6z" opacity=".9"/><path fill="#e0655a" d="M50 18c-8 0-14 6-14 13 0 10 14 25 14 25s14-15 14-25c0-7-6-13-14-13z"/><circle cx="50" cy="31" r="6" fill="#fff"/></svg></div>' },
  { id:'mj-20',  category:'monde',    titre:'Compte en 8 langues',  emoji:'🌐', desc:'Compter dans toutes les langues !',   url:'mj-20.html',  type:'html', orientation:'any',       access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true, murOrder:1, zone:'volta', libelleMur:'Compte avec le monde', vignette:'<div class="vig vig-drapeaux"><span class="f-flag france"></span><span class="f-flag bresil"></span><span class="f-flag espagne"></span></div>' },
  { id:'mj-42',  category:'monde',    titre:'Shisima !',            emoji:'🇰🇪', desc:'Le jeu du point d\'eau, venu du Kenya !', url:'mj-42.html', type:'html', orientation:'any',      access:'free', maxStars:3, unlock:null, tag:null,  status:'live', refonte:true, murOrder:3, zone:'volta', vignette:'<div class="vig vig-shisima"><i class="pt"></i><i class="pt p2"></i><i class="pt p3"></i></div>' },
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
