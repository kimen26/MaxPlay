// ─────────────────────────────────────────────────────────────────────────
//  collection-dinos.js — Skin DINO du moteur collection.js (thème-neutre)
//  Mappe le catalogue DINOS (site/js/dinos-data.js) → items {id, nom, famille, rare}.
//  rare = familles les moins représentées dans DINOS (20% les moins fournies).
//  Charger APRÈS dinos-data.js et collection.js : <script src="js/collection-dinos.js">
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  if (typeof global.DINOS === 'undefined' && typeof DINOS === 'undefined') return;
  var list = typeof DINOS !== 'undefined' ? DINOS : global.DINOS;
  if (!global.Collection || !Array.isArray(list)) return;

  // Seuls les dinos ILLUSTRÉS sont collectionnables : une éclosion doit toujours
  // pouvoir montrer sa bête. Clé manifeste = id capitalisé (nom latin).
  // Si le manifeste DINO_ASSETS n'est pas chargé sur cette page (mini-jeux :
  // seul grantCapsule y sert), on ne filtre pas — le Mur, lui, le charge.
  var assets = global.DINO_ASSETS;
  if (assets) {
    list = list.filter(function (d) {
      if (!d || !d.id || !d.name) return false;
      var k = d.id.charAt(0).toUpperCase() + d.id.slice(1);
      return !!assets[k];
    });
  } else {
    list = list.filter(function (d) { return d && d.id && d.name; });
  }
  if (!list.length) return;

  var counts = {};
  list.forEach(function (d) { var f = d.famille || '_sans'; counts[f] = (counts[f] || 0) + 1; });
  var familles = Object.keys(counts).sort(function (a, b) { return counts[a] - counts[b]; });
  var cut = Math.max(1, Math.ceil(familles.length * 0.20));
  var rareFamilies = familles.slice(0, cut);

  // TOP très connus (œuf DORÉ = un de ceux-là, décision PY 2026-07-30 —
  // « les dorés c'est n'importe quelle famille mais un très connu »).
  var STARS_CONNUS = ['tyrannosaurus', 'spinosaurus', 'giganotosaurus', 'allosaurus',
    'dilophosaurus', 'brachiosaurus', 'diplodocus', 'ankylosaurus', 'stegosaurus',
    'triceratops', 'parasaurolophus', 'iguanodon', 'velociraptor', 'pteranodon', 'mosasaurus'];

  var items = list.map(function (d) {
    return {
      id: d.id,
      nom: d.name || d.full || d.id,
      famille: d.famille || '_sans',
      rare: rareFamilies.indexOf(d.famille || '_sans') !== -1,
      star: STARS_CONNUS.indexOf(d.id) !== -1,
    };
  });

  // Méta familles (NID v4, 2026-07-30) : la COULEUR d'un œuf = sa famille
  // (DINO_FAMILLES est un const top-level de dinos-data.js — identifiant nu,
  // jamais global.DINO_FAMILLES, cf. piège documenté nid-ui.js/mj-golden.js).
  var famMeta = [];
  try {
    var fams = typeof DINO_FAMILLES !== 'undefined' ? DINO_FAMILLES : global.DINO_FAMILLES;
    if (Array.isArray(fams)) {
      famMeta = fams.map(function (f) {
        return { id: f.id, label: f.label, emoji: f.emoji, color: f.color };
      });
    }
  } catch (e) { famMeta = []; }

  global.Collection.configure({ items: items, familles: famMeta });
})(window);
