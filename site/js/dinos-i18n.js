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
    function merge(list, over) {
      if (!list || !over) return;
      list.forEach(function (item) {
        var o = over[item.id || item.cle];
        if (!o) return;
        Object.keys(o).forEach(function (k) { item[k] = o[k]; });
      });
    }
    if (window.DINOS) merge(window.DINOS, S.dinos);
    if (window.DINO_FAMILLES) merge(window.DINO_FAMILLES, S.familles);
    if (window.DINO_RACINES) merge(window.DINO_RACINES, S.racines);
  };

  /* eslint-disable no-useless-escape */
  document.write('<script src="js/i18n/dinos-strings.' + lang + '.js"><\/script>');
  document.write('<script>window.applyDinoStrings && window.applyDinoStrings()<\/script>');
})();
