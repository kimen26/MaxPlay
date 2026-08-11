// dinos-ombres.js — savoir-faire commun aux mini-jeux dino a ombres chinoises
// (mj-24 Trouve le dino, mj-25 Pareil pas pareil, mj-26 Compte les dinos,
//  mj-28 Lampe du paleontologue, mj-33 Memory des ombres).
//
// Regle FIGEE (mj-24/25/26.md 🔒) : ombres chinoises canon EXCLUSIVES depuis
// img/dinos/ombres/<Basename>_ombre.png. JAMAIS de silhouettes LimeZu par-famille.
//
// Prerequis : charger AVANT ce script -> js/lang.js, js/dinos-data.js (assigne
// window.DINOS), js/dinos-audio-manifest.js (playDinoNom/playDinoFunfact, sonar
// exclusif deja gere par ces helpers globaux). Ce fichier ne redefinit PAS
// playDinoNom/playDinoFunfact : il expose playNom()/stopNom() comme wrapper
// pratique par-dessus, avec exclusivite (un son coupe le precedent) pour les
// jeux qui n'ont pas leur propre gestion (mj-24 en avait une locale, remplacee).
//
// Usage : <script src="js/dinos-ombres.js"></script> APRES dinos-audio-manifest.js,
// AVANT mj-shell.js (ou apres, l'ordre entre les deux n'a pas d'importance).
(function (window) {
  'use strict';

  function shuffle(a) {
    a = [...a];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function basenameOf(png) {
    return (png || '').replace(/\.(jpg|jpeg|png)$/i, '');
  }

  function ombreSrc(pngOrDino) {
    const png = typeof pngOrDino === 'string' ? pngOrDino : (pngOrDino && pngOrDino.png);
    return 'img/dinos/ombres/' + basenameOf(png) + '_ombre.png';
  }

  function colorSrc(pngOrDino) {
    const png = typeof pngOrDino === 'string' ? pngOrDino : (pngOrDino && pngOrDino.png);
    // paleoart/ : les héros racine img/dinos/*.jpg ont été purgés le 2026-07-17
    return 'img/dinos/paleoart/' + png;
  }

  // Pool canon : tous les dinos avec un png top-level (pas de sous-dossier) +
  // un nom -> objet { id, name, famille, png, fait, src (ombre) }.
  // requireFait=true filtre aux dinos ayant un champ `fait` (mj-28 en a besoin
  // pour le funfact affiche a la revelation).
  function pool(opts) {
    opts = opts || {};
    const src = (typeof DINOS !== 'undefined') ? DINOS : (window.DINOS || []);
    return src
      .filter(d => d.png && d.name && !d.png.includes('/') && (!opts.requireFait || d.fait))
      .map(d => ({ id: d.id, name: d.name, famille: d.famille, png: d.png, fait: d.fait, src: ombreSrc(d.png) }));
  }

  // Tirage d'une cible + distracteurs, avec option "cousin de la meme famille"
  // parmi les distracteurs (regle commune mj-24/28/33 aux niveaux eleves : au
  // moins 1 cousin de la famille de la cible pour forcer la discrimination fine).
  //
  // pickCousins(list, target, nChoices, { minCousins }) -> array de distracteurs
  // (nChoices - 1 elements), garanti minCousins cousins si possible.
  function pickCousins(list, target, nChoices, opts) {
    opts = opts || {};
    const minCousins = opts.minCousins != null ? opts.minCousins : 0;
    const need = nChoices - 1;
    if (minCousins > 0) {
      const cousins = shuffle(list.filter(o => o.id !== target.id && o.famille === target.famille)).slice(0, minCousins);
      const rest = shuffle(list.filter(o => o.id !== target.id && !cousins.includes(o))).slice(0, need - cousins.length);
      return cousins.concat(rest).slice(0, need);
    }
    // pas de cousin impose : distracteurs de familles differentes en priorite
    // (plus lisible pour les plus jeunes), complete avec le reste si besoin.
    const others = shuffle(list.filter(o => o.id !== target.id && o.famille !== target.famille)).slice(0, need);
    if (others.length < need) {
      const rest = shuffle(list.filter(o => o.id !== target.id && !others.includes(o)));
      return others.concat(rest).slice(0, need);
    }
    return others;
  }

  // pick(list) -> un element au hasard.
  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  // Lecture EXCLUSIVE du nom d'un dino : coupe tout son en cours (nom ou
  // funfact) avant de jouer le nouveau. Wrapper au-dessus de playDinoNom/
  // playDinoFunfact (dinos-audio-manifest.js) qui gerent deja MP3->fallback TTS ;
  // ce module ajoute juste la garantie "un seul son a la fois" partagee par
  // mj-28/mj-33 (mj-24 avait sa propre variante locale, desormais ici).
  let currentAudio = null;
  function stopNom() {
    if (currentAudio) {
      try { currentAudio.pause(); currentAudio.currentTime = 0; } catch (e) { /* noop */ }
      currentAudio = null;
    }
  }
  // playNom(id, fallbackName, opts) -> joue le nom (MP3+fallback TTS), exclusif.
  // opts.then : callback fin de lecture (voir playDinoNom).
  function playNom(id, fallbackName, opts) {
    stopNom();
    if (window.TTS) TTS.cancel();
    currentAudio = window.playDinoNom(id, fallbackName, opts);
    return currentAudio;
  }
  // playFunfact(id, fallbackText, opts) -> idem pour le fait amusant (~15-20s).
  function playFunfact(id, fallbackText, opts) {
    stopNom();
    currentAudio = window.playDinoFunfact(id, fallbackText, opts);
    return currentAudio;
  }

  // Chaîne « amorce TTS → nom MP3 » (factorisée depuis mj-24/mj-19, 2026-08-11).
  // Le TTS dit l'amorce (« Trouve le… » — JAMAIS le nom, il massacrerait la
  // prononciation), puis le MP3 réel dit le nom ; repli playNom direct si pas
  // de TTS. Filet : si onEnd ne revient jamais (pile vocale incomplète), le
  // MP3 part quand même après opts.filet ms (défaut 2600). Chaque appel
  // invalide le précédent (token) — fini le bug du sayTarget() fantôme.
  // opts : { amorce, amorceOpts (opts TTS.speak), filet (ms) }
  let annonceToken = 0;
  function stopAnnonce() {
    annonceToken++; // invalide un éventuel filet encore en attente
    stopNom();
    if (window.TTS) TTS.cancel();
  }
  function annoncer(id, fallbackName, opts) {
    opts = opts || {};
    const token = ++annonceToken;
    if (window.TTS && TTS.supported && TTS.supported()) {
      stopNom();
      TTS.cancel();
      let played = false;
      const go = function () {
        if (played || token !== annonceToken) return;
        played = true;
        playNom(id, fallbackName);
      };
      TTS.speak(opts.amorce || '', Object.assign({ pitch: 1.05 }, opts.amorceOpts, { onEnd: go }));
      setTimeout(go, opts.filet || 2600);
    } else {
      playNom(id, fallbackName);
    }
  }

  window.DinoOmbres = {
    shuffle: shuffle,
    basenameOf: basenameOf,
    ombreSrc: ombreSrc,
    colorSrc: colorSrc,
    pool: pool,
    pick: pick,
    pickCousins: pickCousins,
    playNom: playNom,
    playFunfact: playFunfact,
    stopNom: stopNom,
    annoncer: annoncer,
    stopAnnonce: stopAnnonce,
  };
})(window);
