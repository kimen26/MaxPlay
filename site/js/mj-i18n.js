// mj-i18n.js — surcouche multilingue du panneau règle (RegleInfo) des mini-jeux.
// Principe (HO-MJ-02, miroir dinos-i18n.js) : le FR reste le CANON, en dur dans chaque
// mj-XX.html (cfg.regle passé à MJ.init). Un fichier GÉNÉRÉ js/i18n/mj-strings.<lang>.js
// pose window.MJ_STRINGS = { "mj-14": { titre, regle:{texte, etapes:[{t,d}], etoiles} }, ... }
// et MJi18n.regle(gameId, cfgRegle) rend une COPIE fusionnée par-dessus cfgRegle (jamais
// de mutation de l'objet d'origine — le jeu peut le réutiliser).
// Langue absente / jeu absent du pack -> repli FR intégral, jamais de trou.
//
// Chargement du pack : PAS de document.write ici (contrairement à dinos-i18n.js, qui est
// posé en <script src> SYNCHRONE dans le HTML). mj-i18n.js est lui-même chargé de façon
// ASYNCHRONE par mj-shell.js (loadSeq/createElement) : document.write y échouerait
// silencieusement (« It isn't possible to write into a document from an asynchronously-
// loaded external script »). C'est mj-shell.js qui insère mj-strings.<lang>.js dans sa
// propre file d'attente séquentielle juste après ce fichier — voir SCRIPTS dans mj-shell.js.
//
// Ordre de chargement : lang.js -> mj-i18n.js -> mj-strings.<lang>.js -> (mj-shell.js
// appelle RegleInfo.init après le chargement complet des scripts, cf. MJ.ready).
(function () {
  function gameId() {
    var f = (location.pathname.split('/').pop() || '').replace(/\.html?$/i, '');
    return f || 'page';
  }

  // Fusionne les clés texte du pack par-dessus une COPIE de cfgRegle (le FR d'origine
  // n'est jamais modifié). etapes : fusion positionnelle (index i du pack sur l'étape i
  // du FR) — un nombre d'étapes différent entre FR et pack est un bug de traduction
  // (le checker _check-mj-traduction.cjs le détecte), pas géré ici en silence.
  function regle(id, cfgRegle) {
    cfgRegle = cfgRegle || {};
    var out = {
      texte: cfgRegle.texte,
      picto: cfgRegle.picto,
      slug: cfgRegle.slug,
      etoiles: cfgRegle.etoiles,
      autoOpen: cfgRegle.autoOpen,
      etapes: (cfgRegle.etapes || []).map(function (e) {
        return (typeof e === 'string') ? { t: e, d: '' } : { t: e.t, d: e.d };
      })
    };
    var S = window.MJ_STRINGS;
    var entry = S && S[id || gameId()];
    if (!entry || !entry.regle) return out; // pas de traduction pour ce jeu -> FR intact

    var r = entry.regle;
    if (typeof r.texte === 'string' && r.texte) out.texte = r.texte;
    if (typeof r.etoiles === 'string' && r.etoiles) out.etoiles = r.etoiles;
    if (Array.isArray(r.etapes) && r.etapes.length === out.etapes.length) {
      out.etapes = out.etapes.map(function (e, i) {
        var o = r.etapes[i];
        if (!o) return e;
        return {
          t: (typeof o.t === 'string' && o.t) ? o.t : e.t,
          d: (typeof o.d === 'string' && o.d) ? o.d : e.d
        };
      });
    }
    return out;
  }

  // Titre traduit du jeu (menu/en-tête), même repli FR si absent du pack.
  function titre(id, titreFr) {
    var S = window.MJ_STRINGS;
    var entry = S && S[id || gameId()];
    return (entry && typeof entry.titre === 'string' && entry.titre) ? entry.titre : titreFr;
  }

  window.MJi18n = { regle: regle, titre: titre, gameId: gameId };
})();
