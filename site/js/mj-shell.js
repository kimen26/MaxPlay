// ─────────────────────────────────────────────────────────────────────────
//  mj-shell.js — LE GABARIT MINIJEU MaxPlay (décision Papa Yann 2026-07-14)
//
//  UNE seule inclusion charge tout le cadre standard, dans le bon ordre :
//    mp-theme.css (si absent) puis : sounds → victory-sounds → feedback →
//    catalog → stars → qcm-retry → mj-golden → tracker → cloud → comments →
//    back-button → regle-info → mp-theme → celebrations.
//  (cloud.js TOUJOURS après tracker.js et avant l'usage de comments —
//   règle 🚨 2026-07-14 : sans lui les avis ne montent JAMAIS à Supabase.)
//
//  Usage type d'un minijeu :
//    <body>
//    <div id="app"></div>
//    <script src="js/bus-svg.js"></script>   <!-- libs SPÉCIFIQUES au jeu (optionnel) -->
//    <script src="js/data.js"></script>
//    <script src="js/mj-shell.js"></script>  <!-- LE gabarit -->
//    <script>
//    MJ.ready(function () {
//      const shell = MJ.init({
//        id: 'mj-24', emoji: '🦕', titre: 'Trouve le dino',
//        golden: true,          // piste 4/6/8 + étoiles + fin de partie standard
//        consigne: true,        // barre consigne (texte centré, tap = réécouter)
//        regle: {               // panneau savant fou 🧑‍🔬 (regle-info v3)
//          picto: '🦕❓', texte: 'Trouve le bon dino !',
//          etapes: [ { t: '…', d: '…' }, … ]
//        }
//      });
//      shell.setConsigne('Tape le bon dino !');   // + audio auto
//      // … jeu … shell.G.notePip(i, attempts, el) … shell.G.showEnd({replayUrl})
//    });
//    </script>
//
//  API : window.MJ = { ready(fn), init(cfg) → { G, say(t), setConsigne(t, say?) } }
//  Le CONTENU du jeu reste spécifique (⚠ réflexion cohérente par jeu) — le
//  gabarit ne norme QUE le cadre : en-tête, piste, consigne, panneau ?, thème,
//  célébrations, tracking, sync cloud.
// ─────────────────────────────────────────────────────────────────────────
(function () {
  'use strict';

  var SCRIPTS = [
    'js/sounds.js',
    'js/lexique-fr.js',
    'js/tts.js',
    // Table des textes canoniques (référentiel) : avant victory-sounds, dont
    // les replis TTS la consultent (la table gagne sur tout repli divergent).
    'js/textes-jeux.js',
    'js/victory-sounds.js',
    'js/feedback.js',
    'js/catalog.js',
    'js/stars.js',
    'js/qcm-retry.js',
    'js/mj-golden.js',
    'js/mj-kit.js',
    'js/tracker.js',
    'js/cloud.js',
    'js/comments.js',
    'js/back-button.js',
    'js/regle-info.js',
    'js/mp-theme.js',
    'js/celebrations.js',
    // Chantier NID (2026-07-26) : collection.js (moteur pur) puis son skin dino.
    // Chargés APRÈS celebrations.js (l'anim d'éclosion vit dans MaxFX.hatch, déjà
    // dispo). Défensifs : si absents (404), le shell continue sans capsule.
    'js/collection.js',
    'js/collection-dinos.js',
  ];

  // mp-theme.css si la page ne l'a pas déjà
  if (!document.querySelector('link[href*="mp-theme.css"]')) {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'css/mp-theme.css';
    document.head.appendChild(l);
  }

  var readyFns = [];
  var loaded = false;

  function hasScript(src) {
    var tags = document.querySelectorAll('script[src]');
    for (var i = 0; i < tags.length; i++) {
      if (tags[i].getAttribute('src').replace(/^\.\//, '') === src) return true;
    }
    return false;
  }

  function loadSeq(list, done) {
    if (!list.length) { done(); return; }
    var src = list[0];
    if (hasScript(src)) { loadSeq(list.slice(1), done); return; }
    var s = document.createElement('script');
    s.src = src;
    s.onload = function () { loadSeq(list.slice(1), done); };
    s.onerror = function () { loadSeq(list.slice(1), done); }; // jamais bloquer le jeu
    document.head.appendChild(s);
  }

  function whenDom(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  loadSeq(SCRIPTS, function () {
    whenDom(function () {
      loaded = true;
      readyFns.forEach(function (fn) { try { fn(); } catch (e) { console.error('[mj-shell]', e); } });
      readyFns = [];
    });
  });

  // ── construction du cadre standard ─────────────────────────────────────
  function init(cfg) {
    cfg = cfg || {};
    var app = document.getElementById('app') || document.body;

    // 1. En-tête .hdr (créé s'il manque) : ← fantôme · emoji+titre · (savant fou via regle-info)
    var hdr = document.querySelector('.hdr');
    if (!hdr) {
      hdr = document.createElement('div');
      hdr.className = 'hdr';
      app.insertBefore(hdr, app.firstChild);
    }
    if (!hdr.querySelector('a, .mp-back-btn')) {
      hdr.insertBefore(window.MaxPlayBackButton
        ? MaxPlayBackButton.create('index.html')
        : Object.assign(document.createElement('a'), { href: 'index.html', textContent: '←' }), hdr.firstChild);
    }
    if (!hdr.querySelector('.htitle')) {
      var t = document.createElement('span');
      t.className = 'htitle';
      t.textContent = (cfg.emoji ? cfg.emoji + ' ' : '') + (cfg.titre || document.title);
      hdr.appendChild(t);
    }

    // 2. Piste golden (si demandée) : #pips créé s'il manque, sous l'en-tête
    var G = null;
    if (cfg.golden && window.Golden) {
      var pips = document.getElementById('pips');
      if (!pips) {
        pips = document.createElement('div');
        pips.className = 'pips';
        pips.id = 'pips';
        hdr.parentNode.insertBefore(pips, hdr.nextSibling);
      }
      G = Golden.setup(cfg.id || gameIdFromUrl());
      G.buildPips();
    }

    // 3. Consigne standard (texte centré, tap = réécouter — jamais de gros bouton 🔊)
    var say = function (txt) {
      if (!txt) return;
      try {
        // TTS.speak = cancel-then-speak, rate 0.9 par défaut (+ respell lexique FR)
        if (window.TTS && TTS.speak) TTS.speak(txt, { priority: true });
      } catch (e) {}
    };

    // Slug d'une consigne = son texte slugifié. Ce n'est pas une invention : c'est
    // déjà la convention de la banque (« Il vivait quand ? » → il-vivait-quand.mp3).
    // La formaliser permet de brancher la vraie voix SANS toucher aux 60 jeux :
    // si le MP3 existe on le joue, sinon on retombe sur le TTS comme avant.
    // Une consigne dont le texte change perd son MP3 et repasse en TTS — dégradation
    // douce, et le référentiel la signale comme manquante.
    var slugConsigne = function (txt) {
      return String(txt || '')
        .toLowerCase()
        // Ligatures AVANT le dépouillement des accents : sinon « œufs » donne
        // « ufs » et le fichier ne se retrouve jamais.
        .replace(/œ/g, 'oe').replace(/æ/g, 'ae')
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[’']/g, ' ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    };

    // Dit la consigne en VRAIE VOIX si elle a été enregistrée, en TTS sinon.
    // Les consignes dynamiques (« Trouve le » + nom tiré au hasard) ne matchent
    // évidemment aucun fichier : elles restent en TTS, c'est le comportement juste.
    // Repli TTS : le texte canonique de la table textes-jeux gagne sur le texte
    // inline quand les deux divergent (référentiel, Lot 3 — log console).
    var direConsigne = function (txt) {
      if (!txt) return;
      var slug = slugConsigne(txt);
      var repli = (slug && window.SoundPool && SoundPool.repliCanonique)
        ? SoundPool.repliCanonique(slug, txt) : txt;
      if (slug && window.SoundPool && SoundPool.phrase) {
        try { SoundPool.phrase(slug, repli); return; } catch (e) {}
      }
      say(repli);
    };
    var consigneTxt = '';
    var setConsigne = function () {};
    if (cfg.consigne !== false) {
      var box = document.getElementById('consigne');
      if (!box) {
        box = document.createElement('div');
        box.className = 'mp-consigne';
        box.id = 'consigne';
        box.style.cssText = 'justify-content:center;text-align:center;cursor:pointer';
        box.setAttribute('role', 'button');
        box.setAttribute('aria-label', 'Réécouter la consigne');
        box.innerHTML = '<b id="instruction">…</b>';
        var anchor = document.getElementById('pips') || hdr;
        anchor.parentNode.insertBefore(box, anchor.nextSibling);
      }
      // tap = réécouter : audio custom du jeu (cfg.onRepeat) ou TTS de la consigne
      box.addEventListener('click', function () {
        if (cfg.onRepeat) cfg.onRepeat();
        else direConsigne(consigneTxt);
      });
      setConsigne = function (txt, sayIt) {
        consigneTxt = txt;
        var el = document.getElementById('instruction');
        if (el) el.textContent = txt;
        if (sayIt !== false) direConsigne(txt); // l'audio se lance TOUT SEUL (design v3)
      };
    }

    // 4. Panneau savant fou 🧑‍🔬 (règle + avis parent → Comments + cloud)
    if (cfg.regle && window.RegleInfo) RegleInfo.init(cfg.regle);

    return { G: G, say: say, setConsigne: setConsigne };
  }

  function gameIdFromUrl() {
    return (location.pathname.split('/').pop() || '').replace(/\.html?$/i, '');
  }

  window.MJ = {
    ready: function (fn) { if (loaded) fn(); else readyFns.push(fn); },
    init: init,
  };
})();
