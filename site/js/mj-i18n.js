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

  // Remplace les placeholders {cle} d'un texte par params[cle] (HO-MJ-03). Une clé
  // absente de params n'est PAS remplacée (reste visible {cle}, signal de bug plutôt
  // que trou silencieux). params est optionnel.
  function applyParams(texte, params) {
    if (!params) return texte;
    return String(texte).replace(/\{([a-zA-Z0-9_]+)\}/g, function (m, k) {
      return Object.prototype.hasOwnProperty.call(params, k) ? params[k] : m;
    });
  }

  // t(gameId, cle, frFallback, params) — chaîne UI hors panneau règle (HO-MJ-03).
  // Cherche MJ_STRINGS[gameId].ui[cle] (langue active), sinon retombe sur frFallback
  // (le FR reste toujours en dur dans le jeu = canon, jamais de trou). `cle` supporte
  // un chemin en points ("confirm.msg") pour les jeux avec plusieurs sous-groupes ui.
  // params = {n:3} -> "{n}" remplacé dans le texte choisi (FR ou traduit).
  // Cas spécial '_commun' (HO-MJ-04) : chrome transverse du panneau regle-info.js,
  // pas un jeu — pas de sous-clé `.ui`, l'objet du pack EST directement la table
  // cle -> texte (voir studio/minijeux/i18n/<lang>/strings.json § _commun).
  function t(id, cle, frFallback, params) {
    var S = window.MJ_STRINGS;
    var gid = id || gameId();
    var entry = S && S[gid];
    var root = (gid === '_commun') ? entry : (entry && entry.ui);
    var val;
    if (root) {
      val = cle.split('.').reduce(function (acc, k) {
        return (acc && typeof acc === 'object') ? acc[k] : undefined;
      }, root);
    }
    var texte = (typeof val === 'string' && val) ? val : frFallback;
    return applyParams(texte, params);
  }

  // voix(gameId, slug, frFallback) — HO-MJ-06 : texte de repli TTS d'une consigne
  // PARLÉE (site/js/textes-jeux.js, slugs regle-mj-XX + phrases partagées). Cherche
  // MJ_STRINGS[gameId].voix[slug] (jeu, ex. regle-mj-14) puis MJ_STRINGS._commun.voix[slug]
  // (phrase partagée, ex. cest-parti) — même repli FR intégral que t()/regle() si absent
  // (langue non traduite ou slug hors pack), jamais de trou. gameId peut être omis
  // (résolu depuis l'URL comme ailleurs dans ce fichier).
  function voix(id, slug, frFallback) {
    var S = window.MJ_STRINGS;
    var gid = id || gameId();
    var parJeu = S && S[gid] && S[gid].voix && S[gid].voix[slug];
    if (typeof parJeu === 'string' && parJeu) return parJeu;
    var commun = S && S._commun && S._commun.voix && S._commun.voix[slug];
    if (typeof commun === 'string' && commun) return commun;
    return frFallback;
  }

  // plural(n, one, many) — accord simple : en / es-es / pt-br mettent le pluriel dès que
  // n !== 1 (« 0 stars », « 0 estrellas », « 0 estrelas ») ; le FR garde le singulier
  // pour 0 et 1 (« 0 étoile »). Les jeux FR n'appellent pas cette fonction (logique en dur).
  function plural(n, one, many) {
    var lang = (window.Lang && Lang.current()) || 'fr';
    if (lang === 'fr') return n <= 1 ? one : many;
    return n === 1 ? one : many;
  }

  window.MJi18n = { regle: regle, titre: titre, gameId: gameId, t: t, plural: plural, voix: voix };
})();
