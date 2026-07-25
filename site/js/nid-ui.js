// ─────────────────────────────────────────────────────────────────────────
//  nid-ui.js — Le NID (chantier NID P3, plan 2026-07-26)
//
//  Rendu du nid sur le Mur (3 emplacements d'œufs) + cinématique d'éclosion
//  + bandeau collection (têtes possédées / ombres) + vignettes-aperçu sur
//  les rangées copains + frise-chemin dans le repaire.
//
//  Code DÉFENSIF : si window.Collection est absent → rien ne s'affiche,
//  zéro erreur console (P1 collection.js peut ne pas exister encore).
//  Zéro nouvelle requête réseau : charge dinos-assets.js/dinos-data.js
//  dynamiquement (paresseux) si absents — mur.js/index.html ne les chargent
//  pas par défaut (le Mur n'a jamais eu besoin du dico dino jusqu'ici).
//
//  API : window.NidUI = { init, refresh, playHatchIfReady }
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  var OMBRE = 'img/dinos/ombres/';
  var DINO_BEBE_SFX = ['sounds/fx/dino-bebe.mp3', 'sounds/fx/dino-bebe-2.mp3', 'sounds/fx/dino-bebe-3.mp3'];

  // ── chargement paresseux des dépendances (jamais dans index.html) ─────
  var DEPS = ['js/dinos-assets.js', 'js/dinos-data.js'];
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
    s.onerror = function () { loadSeq(list.slice(1), done); }; // jamais bloquer le Mur
    document.head.appendChild(s);
  }

  function $(id) { return document.getElementById(id); }

  // ── ancrage DOM : index.html ne connaît pas le nid (chantier ajouté après
  //    coup) — on insère nos 2 conteneurs nous-mêmes, une seule fois, juste
  //    sous l'entête (.profil) du Mur. DOM léger, zéro dépendance de markup. */
  function mountHosts() {
    var muR = $('mur-view');
    if (!muR || $('nid-host')) return; // déjà monté ou pas sur le Mur
    var profil = muR.querySelector('.profil');
    var nid = document.createElement('section');
    nid.className = 'mur-bloc nid-bloc';
    nid.id = 'nid-host';
    nid.style.display = 'none';
    var bandeau = document.createElement('section');
    bandeau.className = 'mur-bloc nid-bandeau-bloc';
    bandeau.id = 'nid-bandeau';
    bandeau.style.display = 'none';
    if (profil && profil.nextSibling) {
      profil.parentNode.insertBefore(nid, profil.nextSibling);
      nid.parentNode.insertBefore(bandeau, nid.nextSibling);
    } else {
      muR.appendChild(nid);
      muR.appendChild(bandeau);
    }
  }

  // ── résolution dino par id (DINOS[].id, minuscule) ─────────────────────
  // dinos-data.js déclare `const DINOS = [...]` en haut de script (pas
  // `window.DINOS =`) : un `const` top-level vit dans l'environnement
  // lexical global du document, PAS sur window — accessible seulement via
  // l'identifiant nu, une fois le <script> exécuté. D'où ce helper plutôt
  // que `global.DINOS` (toujours undefined même le script chargé).
  function dinosArray() {
    try { return typeof DINOS !== 'undefined' ? DINOS : []; } catch (e) { return []; }
  }
  function dinoById(id) {
    var list = dinosArray();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function assetsFor(dino) {
    if (!dino || !dino.png || !global.DINO_ASSETS) return null;
    var key = dino.png.replace(/\.(jpg|jpeg|png|webp)$/i, '');
    return global.DINO_ASSETS[key] || null;
  }
  function teteSrc(dino) {
    var a = assetsFor(dino);
    return (a && (a.tete || a.sprite)) || (dino ? OMBRE + dino.name + '_ombre.png' : '');
  }
  function ombreSrc(dino) {
    var a = assetsFor(dino);
    // les fichiers _ombre.png sont nommés par le nom CAPITALISÉ (ex Triceratops), pas l'id
    if (a) return OMBRE + Object.keys(global.DINO_ASSETS).find(function (k) { return global.DINO_ASSETS[k] === a; }) + '_ombre.png';
    return '';
  }

  // ── markup du NID (3 œufs) ──────────────────────────────────────────
  function nidHtml(state) {
    var count = state.pending.count || 0;
    var golden = !!state.pending.golden;
    var slots = '';
    for (var i = 0; i < 3; i++) {
      var filled = i < count;
      var cls = 'nid-oeuf' + (filled ? ' plein' : '') + (filled && golden && i === count - 1 ? ' dore' : '');
      slots += '<div class="' + cls + '" role="img" aria-label="' + (filled ? 'œuf' : 'emplacement vide') + '"></div>';
    }
    return '<div class="nid-titre"><span class="t-emoji">🥚</span>Le nid</div>' +
      '<div class="nid-oeufs" id="nid-oeufs">' + slots + '</div>';
  }

  function renderNid() {
    mountHosts();
    var host = $('nid-host');
    if (!host || !global.Collection) { if (host) host.style.display = 'none'; return; }
    var state;
    try { state = Collection.state(); } catch (e) { host.style.display = 'none'; return; }
    if (!state) { host.style.display = 'none'; return; }
    host.style.display = '';
    host.innerHTML = nidHtml(state);
  }

  // ── éclosion : jouée au chargement du Mur si prête ──────────────────
  var hatchInProgress = false;
  function playHatchIfReady() {
    if (hatchInProgress || !global.Collection || !global.MaxFX) return;
    var ready = false;
    try { ready = Collection.readyToHatch(); } catch (e) { return; }
    if (!ready) return;
    var slots = document.querySelectorAll('#nid-oeufs .nid-oeuf.plein');
    var eggEl = slots.length ? slots[slots.length - 1] : $('nid-oeufs');
    if (!eggEl) return;
    hatchInProgress = true;
    loadSeq(DEPS, function () {
      var result;
      try { result = Collection.hatch(); } catch (e) { hatchInProgress = false; return; }
      if (!result) { hatchInProgress = false; return; }
      runHatchSequence(eggEl, result).then(function () {
        hatchInProgress = false;
        renderNid();
        renderBandeau();
        renderApercus();
      });
    });
  }

  function runHatchSequence(eggEl, result) {
    // doublon-cadeau (fin de collection, avenant P0 §4) : pas de craquage complet,
    // simple message tendre (offrable à un copain — V ultérieure).
    if (result.type === 'doublon') {
      var d = result.item && dinoById(result.item);
      return showTapToContinue(
        '<div class="hatch-doublon">' +
          '<div class="hatch-doublon-emoji">🥚</div>' +
          '<div class="hatch-doublon-txt">Tu as déjà ' + (d ? d.name : 'ce dino') + ' ! Un jour tu pourras l\'offrir à un copain.</div>' +
        '</div>'
      );
    }
    var dino = dinoById(result.id);
    var imgSrc = teteSrc(dino) || ombreSrc(dino);
    var overlay;
    // son du bébé dino (padding déjà fait, cf reference_sfx_silence_padding)
    try {
      var pick = DINO_BEBE_SFX[(Math.random() * DINO_BEBE_SFX.length) | 0];
      new Audio(pick).play().catch(function () {});
    } catch (e) {}
    return MaxFX.hatch(eggEl, { imgSrc: imgSrc, label: dino ? dino.name + ' !' : 'Un nouveau dino !' })
      .then(function (ov) { overlay = ov; return showTapToContinue(null, overlay); });
  }

  // tap n'importe où pour continuer — jamais bloquant plus de ~4s (auto-continue)
  function showTapToContinue(innerHtml, existingOverlay) {
    return new Promise(function (resolve) {
      var ov = existingOverlay;
      if (!ov) {
        ov = document.createElement('div');
        ov.style.cssText = 'position:fixed;inset:0;z-index:70;display:flex;align-items:center;justify-content:center;background:rgba(6,10,22,.7);';
        ov.innerHTML = innerHtml || '';
        document.body.appendChild(ov);
      } else {
        ov.style.pointerEvents = 'auto';
        ov.style.zIndex = '70';
      }
      var done = false;
      function finish() {
        if (done) return;
        done = true;
        ov.removeEventListener('click', finish);
        clearTimeout(timer);
        ov.style.transition = 'opacity .25s';
        ov.style.opacity = '0';
        setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); resolve(); }, 260);
      }
      ov.addEventListener('click', finish);
      var timer = setTimeout(finish, 4000);
    });
  }

  // ── bandeau collection ──────────────────────────────────────────────
  function renderBandeau() {
    mountHosts();
    var host = $('nid-bandeau');
    var dinos = dinosArray();
    if (!host || !global.Collection || !dinos.length) { if (host) host.style.display = 'none'; return; }
    var state;
    try { state = Collection.state(); } catch (e) { host.style.display = 'none'; return; }
    if (!state) { host.style.display = 'none'; return; }
    var owned = {};
    (state.owned || []).forEach(function (id) { owned[id] = 1; });
    host.style.display = '';
    var row = dinos.map(function (d) {
      var has = !!owned[d.id];
      var src = has ? teteSrc(d) : ombreSrc(d);
      return '<div class="nid-vig ' + (has ? 'possede' : 'ombre-only') + '" data-dino="' + (has ? d.id : '') + '" role="' + (has ? 'button' : 'img') + '" aria-label="' + (has ? d.name : 'Dino à découvrir') + '">' +
        '<img src="' + src + '" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'">' +
      '</div>';
    }).join('');
    host.innerHTML = '<div class="nid-titre"><span class="t-emoji">🦕</span>Ma collection</div>' +
      '<div class="nid-bandeau-row" id="nid-bandeau-row">' + row + '</div>';
  }

  // ── vignettes-aperçu sur les rangées copains (3 mini-vignettes) ─────
  // Réutilise le dict VIGNETTES de mur.js tel quel, en miniature. Discret :
  // ne casse pas la ligne compacte de 70px (voir mur.css .copain height:70px).
  function renderApercus() {
    if (!global.MUR || typeof global.MUR.entry !== 'function') return;
    var rows = document.querySelectorAll('.copain[data-copain]');
    if (!rows.length) return;
    rows.forEach(function (row) {
      if (row.querySelector('.c-apercu')) return; // déjà posé
      var id = row.dataset.copain;
      var copain = (global.MUR._copains || []).find ? null : null; // pas d'accès direct, on lit via DOM data
      var jeux = row.dataset.jeux ? row.dataset.jeux.split(',') : [];
      if (!jeux.length) return;
      var wrap = document.createElement('div');
      wrap.className = 'c-apercu';
      wrap.innerHTML = jeux.slice(0, 3).map(function (gid) {
        return '<div class="c-apercu-mini">' + (global.MUR.vignetteHtml ? global.MUR.vignetteHtml(gid) : '') + '</div>';
      }).join('');
      row.appendChild(wrap);
    });
  }

  // ── frise-chemin dans le repaire (remplace la grille) ───────────────
  // fait (≥1 partie) = tampon ✓ · prochain recommandé = grand + brille ·
  // suivants = atténués mais TAPABLES (accès libre depuis 2026-07-22).
  function playsOf(id) {
    try {
      var g = global.Tracker.getStats().games[id];
      return g ? (g.plays || 0) : 0;
    } catch (e) { return 0; }
  }

  function friseHtml(games) {
    var firstUndone = -1;
    for (var i = 0; i < games.length; i++) {
      if (playsOf(games[i].id) === 0) { firstUndone = i; break; }
    }
    return '<div class="frise" id="frise-jeux">' + games.map(function (g, i) {
      var done = playsOf(g.id) > 0;
      var reco = i === firstUndone;
      var cls = 'frise-jeu' + (done ? ' fait' : '') + (reco ? ' reco' : '');
      var vign = global.MUR && global.MUR.vignetteHtml ? global.MUR.vignetteHtml(g.id) : '';
      return '<div class="' + cls + '" data-url="' + g.url + '" role="button" aria-label="' + g.titre + '">' +
        '<div class="frise-vig">' + vign + (done ? '<span class="frise-tampon">✓</span>' : '') + '</div>' +
        '<div class="frise-titre">' + g.titre + '</div>' +
      '</div>';
    }).join('') + '</div>';
  }

  function renderFrise(games) {
    var host = $('rep-jeux');
    if (!host || !games || !games.length) return;
    host.innerHTML = friseHtml(games);
    host.classList.add('frise-host');
  }

  // ── init / refresh ───────────────────────────────────────────────────
  function refresh() {
    if (!global.Collection) return;
    renderNid();
    renderBandeau();
    renderApercus();
  }

  function init() {
    if (!global.Collection) return; // code défensif : rien sans le moteur (P1)
    loadSeq(DEPS, function () {
      refresh();
      // l'éclosion se joue au retour sur le Mur (théâtre du nid, avenant §8)
      setTimeout(playHatchIfReady, 300);
    });
    // re-render si mur.js rafraîchit (retour repaire→mur, storage event…)
    // navigation .frise-jeu / .rep-jeu / .mur-mini déjà gérée par le
    // délégué click unique de mur.js (même sélecteur étendu) — on ne gère
    // ici QUE ce qui est propre au nid (tap sur un dino possédé).
    document.addEventListener('click', function (ev) {
      var vig = ev.target.closest('.nid-vig.possede');
      if (vig && vig.dataset.dino) {
        location.href = 'dev-dinos.html?v=7&open=' + encodeURIComponent(vig.dataset.dino);
      }
    });
  }

  global.NidUI = { init: init, refresh: refresh, playHatchIfReady: playHatchIfReady, renderFrise: renderFrise };
})(window);
