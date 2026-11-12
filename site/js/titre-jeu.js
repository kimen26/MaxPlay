// ─────────────────────────────────────────────────────────────────────────
//  titre-jeu.js — le titre du jeu est dit AU DÉBUT DU JEU (PY 2026-11-12,
//  amende D-036). Max a 4 ans, il ne lit pas : il entend le nom du jeu.
//
//  Avant : l'accueil disait le titre puis ouvrait le jeu (l'audio meurt avec
//  la page) ; mesuré, 2,3 s d'attente à chaque toucher avant même que le jeu
//  commence à charger. Maintenant, un seul fichier, deux côtés :
//
//   · ACCUEIL (index.html) : toucher une case note le titre à dire dans
//     sessionStorage et ouvre le jeu TOUT DE SUITE. La carte s'anime le temps
//     que la page change.
//   · JEU (chargé en premier par mj-shell.js) : si un titre attend pour CE
//     jeu, il est dit dès l'arrivée, pendant que le jeu s'affiche. Tant qu'il
//     est dit, tout autre son du jeu (MP3 ou voix du navigateur) est mis en
//     file, puis joué dans l'ordre à la fin du titre : jamais deux voix
//     ensemble, et la consigne passe juste après le titre. Le verrou est posé
//     sur la SORTIE du son (play / speak), seul point commun aux 32 jeux,
//     qui lancent leur consigne chacun à leur façon.
//
//  Son : sounds/voix/<lang>/titres/<id-jeu>.mp3, sinon repli voix du
//  navigateur avec le titre du catalogue dans la langue active (titreParle
//  puis titre ; hors FR, ceux du pack MJ_STRINGS, jamais le français).
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  var CLE = 'maxplay_titre_a_dire';
  var FRAIS_MS = 15000;   // au-delà, le titre noté est périmé (retour arrière, rechargement)
  var MAX_MS = 4000;      // plafond du verrou côté jeu : le jeu n'attend jamais plus
  var VOLUME = 0.95;
  var CLASSE = 'titre-dit';
  var LANG_TTS = { fr: 'fr-FR', en: 'en-US' };

  function langue() { return (global.Lang && Lang.current()) || 'fr'; }
  function idDeLaPage() { return (location.pathname.split('/').pop() || '').replace(/\.html?$/i, ''); }
  var DANS_UN_JEU = /^mj-/.test(idDeLaPage());

  // ── ACCUEIL ──────────────────────────────────────────────────────────

  // Pack de la langue (titres traduits) : chargé une fois, seulement hors FR.
  function chargerPack() {
    var lang = langue();
    if (lang === 'fr' || global.MJ_STRINGS) return;
    var s = document.createElement('script');
    s.src = 'js/gen/i18n/mj-strings.' + lang + '.js';
    document.head.appendChild(s);
  }

  // Texte dit dans la langue active, ou null s'il n'existe pas.
  function texteDit(entree) {
    if (langue() === 'fr') return entree.titreParle || entree.titre || null;
    var p = global.MJ_STRINGS && global.MJ_STRINGS[entree.id];
    return (p && (p.titreParle || p.titre)) || null;
  }

  var _occupe = false;    // une ouverture est partie : les autres touchers sont ignorés

  // Touche d'une carte de jeu : note le titre à dire, ouvre `url` aussitôt.
  function ouvrir(entree, url, carte) {
    if (_occupe) return;
    _occupe = true;
    if (carte) carte.classList.add(CLASSE);
    try {
      sessionStorage.setItem(CLE, JSON.stringify({
        id: entree.id, texte: texteDit(entree), lang: langue(), t: Date.now()
      }));
    } catch (e) { /* stockage refusé : le jeu s'ouvre sans titre */ }
    location.href = url;
  }

  // Retour par l'historique (cache de page) : la carte redevient touchable.
  global.addEventListener('pageshow', function (ev) {
    if (!ev.persisted) return;
    _occupe = false;
    var c = document.querySelectorAll('.' + CLASSE);
    for (var i = 0; i < c.length; i++) c[i].classList.remove(CLASSE);
  });

  // ── JEU : le verrou des sons ─────────────────────────────────────────
  var Media = global.HTMLMediaElement && HTMLMediaElement.prototype;
  var ss = global.speechSynthesis;
  var _play = Media && Media.play, _pause = Media && Media.pause;
  var _speak = ss && ss.speak, _cancel = ss && ss.cancel;
  var _file = [];         // { el, ok, ko } (MP3) ou { u } (voix du navigateur)

  function verrouiller() {
    Media.play = function () {
      var el = this;
      return new Promise(function (ok, ko) { _file.push({ el: el, ok: ok, ko: ko }); });
    };
    // le jeu coupe un son encore en file (« une voix à la fois ») : il n'est jamais joué
    Media.pause = function () {
      var el = this;
      _file = _file.filter(function (x) {
        if (x.el !== el) return true;
        x.ko(new DOMException('coupé avant la fin du titre', 'AbortError'));
        return false;
      });
      return _pause.call(el);
    };
    if (ss) {
      ss.speak = function (u) { _file.push({ u: u }); };
      ss.cancel = function () { _file = _file.filter(function (x) { return !x.u; }); };
    }
  }

  function deverrouiller() {
    Media.play = _play;
    Media.pause = _pause;
    if (ss) { ss.speak = _speak; ss.cancel = _cancel; }
    var file = _file;
    _file = [];
    file.forEach(function (x) {
      if (x.u) { ss.speak(x.u); return; }
      var p = _play.call(x.el);
      if (p && p.then) p.then(x.ok, x.ko); else x.ok();
    });
  }

  function lireTitreEnAttente() {
    var p = null;
    try {
      p = JSON.parse(sessionStorage.getItem(CLE) || 'null');
      sessionStorage.removeItem(CLE);   // dit une fois, jamais au rechargement
    } catch (e) { return null; }
    if (!p || p.id !== idDeLaPage() || !(Date.now() - p.t < FRAIS_MS)) return null;
    return p;
  }

  function direAuDepart() {
    var p = lireTitreEnAttente();
    if (!p || !Media) return;
    verrouiller();
    var fini = false;
    var plafond = setTimeout(fin, MAX_MS);
    function fin() {
      if (fini) return;
      fini = true;
      clearTimeout(plafond);
      deverrouiller();
    }
    function repliVoix() {
      if (!p.texte || !ss || !global.SpeechSynthesisUtterance) { fin(); return; }
      var u = new SpeechSynthesisUtterance(p.texte);
      u.lang = LANG_TTS[p.lang] || LANG_TTS.fr;
      u.pitch = 1.05;
      u.onend = fin;
      u.onerror = fin;
      _speak.call(ss, u);
    }
    var a = new Audio('sounds/voix/' + p.lang + '/titres/' + p.id + '.mp3');
    a.volume = VOLUME;
    a.addEventListener('ended', fin, { once: true });
    a.addEventListener('error', repliVoix, { once: true }); // MP3 absent -> voix du navigateur
    var lecture = _play.call(a);
    if (lecture && lecture.catch) lecture.catch(function (err) {
      // son refusé par le navigateur (pas de toucher récent) : on ne retient rien
      if (err && err.name === 'NotAllowedError') fin();
    });
  }

  if (DANS_UN_JEU) direAuDepart();
  else chargerPack();

  global.TitreJeu = { ouvrir: ouvrir, occupe: function () { return _occupe; }, texteDit: texteDit, CLE: CLE, MAX_MS: MAX_MS };
})(window);
