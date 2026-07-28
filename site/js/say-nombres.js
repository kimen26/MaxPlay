// say-nombres.js — LA voix des nombres (banque C6, décision PY 2026-07-28).
// UNE seule implémentation partagée : les jeux appellent SayNombres.*, JAMAIS
// leur propre new Audio('sounds/nombres/…') ni un assemblage mot-à-mot (effet robot).
// Banque : site/sounds/nombres/ — n-<n>.mp3 (0-30, 40, 50, 100, 1000, neutre chaleureux),
// n-<n>-fete.mp3 (1-10, réussite), phrases-gabarits COMPLÈTES il-en-manque-<n> /
// il-en-faut-<n> / <n>-oeufs (1-10). Voix narrateur_h, eleven_v3, padding 250 ms.
// Règle anti-lassitude : le neutre est le défaut, la fête réservée aux fins/gains.
// Repli TTS navigateur OBLIGATOIRE si le MP3 manque (règle d'or banque de sons).
(function (global) {
  'use strict';

  var BASE = 'sounds/nombres/';
  var MOTS = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
    'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf', 'vingt',
    'vingt-et-un', 'vingt-deux', 'vingt-trois', 'vingt-quatre', 'vingt-cinq', 'vingt-six', 'vingt-sept',
    'vingt-huit', 'vingt-neuf', 'trente'];
  MOTS[40] = 'quarante'; MOTS[50] = 'cinquante'; MOTS[100] = 'cent'; MOTS[1000] = 'mille';

  var current = null;

  function ttsFallback(text) {
    if (global.TTS && TTS.speak) TTS.speak(text, { rate: 0.9, priority: true });
  }

  // Joue BASE+slug.mp3 (exclusif : coupe le nombre en cours), repli TTS sur fallbackText.
  function play(slug, fallbackText, vol) {
    try { if (current) { current.pause(); current.currentTime = 0; } } catch (e) { /* noop */ }
    try {
      var a = new Audio(BASE + slug + '.mp3');
      a.volume = vol || 0.95;
      a.onerror = function () { ttsFallback(fallbackText); };
      a.play().catch(function () { ttsFallback(fallbackText); });
      current = a;
      return a;
    } catch (e) { ttsFallback(fallbackText); return null; }
  }

  function mot(n) { return MOTS[n] || String(n); }
  function known(n) { return MOTS[n] !== undefined; }

  global.SayNombres = {
    // Le nombre seul. opts.fete = variante réussite (1-10 seulement, sinon neutre).
    say: function (n, opts) {
      var fete = opts && opts.fete && n >= 1 && n <= 10;
      if (!known(n)) { ttsFallback(mot(n)); return null; }
      return play('n-' + n + (fete ? '-fete' : ''), mot(n));
    },
    // Phrases-gabarits complètes (1-10) — repli TTS phrase entière au-delà.
    manque: function (n) {
      if (n >= 1 && n <= 10) return play('il-en-manque-' + n, 'Il en manque ' + mot(n) + ' !');
      ttsFallback('Il en manque ' + mot(n) + ' !'); return null;
    },
    faut: function (n) {
      if (n >= 1 && n <= 10) return play('il-en-faut-' + n, 'Il en faut ' + mot(n) + ' en tout !');
      ttsFallback('Il en faut ' + mot(n) + ' en tout !'); return null;
    },
    oeufs: function (n) {
      if (n >= 1 && n <= 10) return play(n + '-oeufs', mot(n) + (n === 1 ? ' œuf !' : ' œufs !'));
      ttsFallback(mot(n) + ' œufs !'); return null;
    },
    mot: mot,
  };
})(window);
