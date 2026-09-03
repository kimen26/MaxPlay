// dinos-i18n.js — surcouche multilingue des données dino.
// Principe : dinos-data.js (FR) = base canon inline. Pour une autre langue, un fichier
// GÉNÉRÉ js/i18n/dinos-strings.<lang>.js pose window.DINO_STRINGS = { dinos:{id:{...}}, familles:{id:{...}}, racines:{cle:{...}} }
// et ce script fusionne les champs TEXTE par-dessus (les champs neutres — mesures, couleurs, ids, images — ne bougent jamais).
// Ordre de chargement : lang.js → dinos-data.js [→ dinos-racines.js] → dinos-i18n.js.
// Langue sans fichier strings → 404 silencieux, l'app reste en FR (fallback assumé).
(function () {
  var lang = (window.Lang && window.Lang.current()) || 'fr';
  // Durcissement XSS : lang vient déjà d'une whitelist (lang.js), on re-valide localement
  // avant toute insertion dans le DOM (document.write requis pour un chargement SYNCHRONE
  // avant les scripts inline des jeux — un appendChild serait async et raterait le 1er rendu).
  if (lang === 'fr' || !/^[a-z]{2}(-[a-z]{2})?$/.test(lang)) return;

  window.applyDinoStrings = function () {
    var S = window.DINO_STRINGS;
    if (!S) return; // fichier absent : on reste en FR
    // DINOS et DINO_FAMILLES sont des TABLEAUX (cle = item.id) ;
    // DINO_RACINES est un OBJET indexe par cle. On accepte les deux formes.
    function merge(cible, over) {
      if (!cible || !over) return;
      var items = Array.isArray(cible)
        ? cible
        : Object.keys(cible).map(function (k) { return cible[k]; });
      items.forEach(function (item) {
        if (!item || typeof item !== 'object') return;
        var o = over[item.id || item.cle];
        if (!o) return;
        Object.keys(o).forEach(function (k) { item[k] = o[k]; });
      });
    }
    // Piege connu (cf. collection-dinos.js, nid-ui.js) : dinos-data.js declare
    // `const DINOS = [...]` en top-level — un const NE se pose PAS sur window.
    // On resout donc l'identifiant nu d'abord, window ensuite.
    merge(typeof DINOS !== 'undefined' ? DINOS : window.DINOS, S.dinos);
    merge(typeof DINO_FAMILLES !== 'undefined' ? DINO_FAMILLES : window.DINO_FAMILLES, S.familles);
    merge(typeof DINO_RACINES !== 'undefined' ? DINO_RACINES : window.DINO_RACINES, S.racines);
  };

  /* eslint-disable no-useless-escape */
  document.write('<script src="js/i18n/dinos-strings.' + lang + '.js"><\/script>');
  document.write('<script>window.applyDinoStrings && window.applyDinoStrings()<\/script>');
})();
