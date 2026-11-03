// ─────────────────────────────────────────────────────────────────────────
//  titre-jeu.js — le menu DIT le titre du jeu au toucher (PY 2026-11-03 :
//  Max a 4 ans, il ne lit pas). Unique mécanisme de « titre parlé » : il
//  remplace tracker._announceTitle (code mort depuis D-024, supprimé).
//
//  Le jeu s'ouvre sur une AUTRE page, et l'audio meurt avec la page : on ne
//  peut donc pas dire le titre « pendant » l'ouverture. Séquence retenue :
//    toucher -> la carte s'anime et le titre est dit -> à la fin du titre
//    (au plus MAX_MS) la page du jeu s'ouvre. La consigne du jeu démarre
//    donc forcément APRÈS le titre : jamais deux voix ensemble.
//
//  Son : sounds/voix/<lang>/titres/<id-jeu>.mp3 s'il existe, sinon repli TTS
//  navigateur avec le titre du catalogue dans la langue active. Le texte dit
//  est entree.titreParle (champ optionnel de catalog.js, pour un titre qui
//  contiendrait un id technique ou un emoji) sinon entree.titre ; en langue
//  non-FR, MJ_STRINGS[id].titreParle puis .titre du pack de la langue.
//  Registre « une voix à la fois » : SoundPool (victory-sounds.js).
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  var MAX_MS = 2000;      // plafond d'attente avant d'ouvrir le jeu
  var VOLUME = 0.95;
  var CLASSE = 'titre-dit';
  var _occupe = false;    // un titre est en cours : les autres touchers sont ignorés

  function langue() { return (global.Lang && Lang.current()) || 'fr'; }

  // Pack de la langue (titres traduits) : chargé une fois, seulement hors FR.
  function chargerPack() {
    var lang = langue();
    if (lang === 'fr' || global.MJ_STRINGS) return;
    var s = document.createElement('script');
    s.src = 'js/gen/i18n/mj-strings.' + lang + '.js';
    document.head.appendChild(s);
  }

  // Texte dit dans la langue active, ou null s'il n'existe pas (jamais le
  // français dit à un enfant qui a choisi l'anglais).
  function texteDit(entree) {
    if (langue() === 'fr') return entree.titreParle || entree.titre || null;
    var p = global.MJ_STRINGS && global.MJ_STRINGS[entree.id];
    return (p && (p.titreParle || p.titre)) || null;
  }

  function couperVoix() {
    try { if (global.SoundPool) SoundPool.couperVoix(); } catch (e) {}
    try { if (global.TTS) TTS.cancel(); } catch (e) {}
  }

  // Dit le titre, rappelle aLaFin() une seule fois (fin du son, ou échec).
  function dire(entree, aLaFin) {
    var fini = false;
    function fin() { if (!fini) { fini = true; aLaFin(); } }
    var texte = texteDit(entree);
    function repliTts() {
      if (texte && global.TTS && TTS.supported()) {
        TTS.speak(texte, { pitch: 1.05, priority: true, onEnd: fin });
      } else { fin(); }
    }
    couperVoix();
    if (!global.SoundPool) { repliTts(); return; }
    var a = SoundPool.file('sounds/voix/' + langue() + '/titres/' + entree.id + '.mp3', VOLUME);
    if (!a) { repliTts(); return; }
    a.addEventListener('ended', fin, { once: true });
    a.addEventListener('error', repliTts, { once: true }); // MP3 absent -> TTS
  }

  // Touche d'une carte de jeu : dit le titre puis ouvre `url`.
  function ouvrir(entree, url, carte) {
    if (_occupe) return;
    _occupe = true;
    if (carte) carte.classList.add(CLASSE);
    var parti = false;
    function partir() {
      if (parti) return;
      parti = true;
      location.href = url;
    }
    setTimeout(partir, MAX_MS);
    dire(entree, partir);
  }

  // Retour par l'historique (cache de page) : la carte redevient touchable.
  global.addEventListener('pageshow', function (ev) {
    if (!ev.persisted) return;
    _occupe = false;
    var c = document.querySelectorAll('.' + CLASSE);
    for (var i = 0; i < c.length; i++) c[i].classList.remove(CLASSE);
  });

  chargerPack();
  global.TitreJeu = { ouvrir: ouvrir, occupe: function () { return _occupe; }, texteDit: texteDit, MAX_MS: MAX_MS };
})(window);
