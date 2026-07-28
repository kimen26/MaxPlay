// ─────────────────────────────────────────────────────────────────────────
//  nid-ui.js — Le NID (chantier NID P3, plan 2026-07-26)
//
//  Rendu du nid sur le Mur (3 emplacements d'œufs) + cinématique d'éclosion
//  + bandeau collection (têtes possédées / ombres) + vignettes-aperçu sur
//  les rangées copains + frise-chemin dans le repaire.
//
//  Code DÉFENSIF : si le moteur ne peut pas se charger → rien ne s'affiche,
//  zéro erreur console. Zéro nouvelle requête réseau AU-DELÀ du nécessaire :
//  charge collection.js/collection-dinos.js/dinos-data.js/dinos-assets.js
//  dynamiquement (paresseux) si absents — mur.js/index.html ne les chargent
//  pas par défaut (le Mur n'a jamais eu besoin du moteur nid ni du dico dino
//  jusqu'à ce chantier). ORDRE OBLIGATOIRE : dinos-data.js AVANT collection.js
//  AVANT collection-dinos.js (le skin dino lit DINOS et window.Collection,
//  tous deux doivent déjà exister — cf. collection-dinos.js guard clause).
//
//  API : window.NidUI = { init, refresh, playHatchIfReady }
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  var OMBRE = 'img/dinos/ombres/';
  var DINO_BEBE_SFX = ['sounds/fx/dino-bebe.mp3', 'sounds/fx/dino-bebe-2.mp3', 'sounds/fx/dino-bebe-3.mp3'];

  // Cris de bébé PAR FAMILLE (banque 2026-07-27, cf sounds/_BANQUE-SONS.md §
  // « cris de bébés par famille ») : à l'éclosion, le petit crie selon sa
  // famille (crête résonante = petit cor, sauropode = grondement doux, etc.).
  // Mapping défensif : famille inconnue OU fichier absent → fallback générique
  // dino-bebe-*, jamais de 404 bruyant ni d'éclosion muette.
  var CRI_FAMILLE = {
    trex: 'cri-bebe-trex.mp3',
    cou_long: 'cri-bebe-cou_long.mp3',
    arme: 'cri-bebe-arme.mp3',
    cornu: 'cri-bebe-cornu.mp3',
    bec: 'cri-bebe-bec.mp3',
    raptor: 'cri-bebe-raptor.mp3',
    pterosaures: 'cri-bebe-pterosaures.mp3',
    enaliosaures: 'cri-bebe-enaliosaures.mp3',
    volant: 'cri-bebe-volant.mp3',
    mammiferes: 'cri-bebe-mammiferes.mp3',
    oiseaux: 'cri-bebe-oiseaux.mp3'
  };

  function playGenericBabyCry() {
    try {
      var pick = DINO_BEBE_SFX[(Math.random() * DINO_BEBE_SFX.length) | 0];
      new Audio(pick).play().catch(function () {});
    } catch (e) {}
  }

  // Joue le cri de la famille du dino révélé, sinon retombe sur le générique.
  function playBabyCry(dino) {
    var file = dino && dino.famille ? CRI_FAMILLE[dino.famille] : null;
    if (!file) { playGenericBabyCry(); return; }
    try {
      var a = new Audio('sounds/fx/' + file);
      var fellBack = false;
      a.addEventListener('error', function () {
        if (fellBack) return;
        fellBack = true;
        playGenericBabyCry();
      });
      a.play().catch(function () {
        if (fellBack) return;
        fellBack = true;
        playGenericBabyCry();
      });
    } catch (e) { playGenericBabyCry(); }
  }

  // ── chargement paresseux des dépendances (jamais dans index.html) ─────
  // Ordre figé : dinos-data.js (DINOS) → collection.js (window.Collection)
  // → collection-dinos.js (configure() le catalogue depuis DINOS) → dinos-assets.js
  // (résolution des sprites, n'a pas de dépendance d'ordre avec les 3 premiers).
  // dinos-assets AVANT collection-dinos : le skin filtre sur DINO_ASSETS
  // (seuls les dinos illustrés sont collectionnables).
  var DEPS = ['js/dinos-data.js', 'js/dinos-assets.js', 'js/collection.js', 'js/collection-dinos.js'];
  function hasScript(src) {
    var tags = document.querySelectorAll('script[src]');
    for (var i = 0; i < tags.length; i++) {
      if (tags[i].getAttribute('src').replace(/^\.\//, '') === src) return true;
    }
    return false;
  }
  // Un window.Collection déjà présent (posé par un autre script, ou un harnais de
  // test qui injecte un FAUX Collection avant chargement, cf. mur-nid.spec.mjs)
  // ne doit JAMAIS être écrasé par notre <script src="js/collection.js"> paresseux —
  // sinon le mock est remplacé silencieusement par le vrai moteur en cours de test.
  function alreadySatisfied(src) {
    if (/collection\.js$/.test(src)) return !!global.Collection;
    // collection-dinos.js appelle Collection.configure(...) sans garde de son côté —
    // si un Collection (mock ou réel déjà configuré) est présent SANS configure()
    // classique attendu, ne pas l'invoquer évite un throw sur un mock de test.
    if (/collection-dinos\.js$/.test(src)) return !!global.Collection && typeof global.Collection.configure !== 'function';
    return false;
  }
  function loadSeq(list, done) {
    if (!list.length) { done(); return; }
    var src = list[0];
    if (hasScript(src) || alreadySatisfied(src)) { loadSeq(list.slice(1), done); return; }
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
  // La clé du manifeste DINO_ASSETS est le nom LATIN capitalisé = l'id du dino
  // capitalisé ('tyrannosaurus' → 'Tyrannosaurus'). PAS le nom FR ('T-Rex').
  function assetKey(dino) {
    if (!dino || !dino.id || !global.DINO_ASSETS) return null;
    var k = dino.id.charAt(0).toUpperCase() + dino.id.slice(1);
    return global.DINO_ASSETS[k] ? k : null;
  }
  function assetsFor(dino) {
    var k = assetKey(dino);
    return k ? global.DINO_ASSETS[k] : null;
  }
  function teteSrc(dino) {
    var a = assetsFor(dino);
    if (a && (a.tete || a.sprite)) return a.tete || a.sprite;
    return ombreSrc(dino);
  }
  function ombreSrc(dino) {
    var a = assetsFor(dino);
    if (a && a.ombre) return a.ombre;
    var k = assetKey(dino);
    return k ? OMBRE + k + '_ombre.png' : '';
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
  // id du dino qui vient d'être gagné : le bandeau lui pose un halo persistant
  // quelques secondes (retour PY : "le gain doit se comprendre sans lire").
  var _justGainedId = null;
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
      if (result.type !== 'doublon' && result.id) _justGainedId = result.id;
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
    // son du bébé dino, choisi selon sa famille (padding déjà fait, cf reference_sfx_silence_padding)
    playBabyCry(dino);
    // Retour playtest Papa Yann : "on a gagné quoi ? une fiche ? un badge ?" —
    // après la révélation (fête MaxFX.hatch), une carte claire distincte : NOM
    // en grand + 2 actions. Le gain (rejoint la collection) doit se comprendre
    // sans lire : halo persistant posé sur le bandeau juste après (glowNewDino).
    return MaxFX.hatch(eggEl, { imgSrc: imgSrc, label: '' })
      .then(function (ov) {
        if (ov && ov.parentNode) ov.parentNode.removeChild(ov); // referme la fête, place à la carte de gain
        return showHatchGainCard(dino, imgSrc);
      });
  }

  // Carte de gain : nom en grand + « Voir sa fiche » / « Continuer ». Zones ≥80px.
  function showHatchGainCard(dino, imgSrc) {
    return new Promise(function (resolve) {
      var ov = document.createElement('div');
      ov.style.cssText = 'position:fixed;inset:0;z-index:70;display:flex;align-items:center;justify-content:center;background:rgba(6,10,22,.75);padding:16px;';
      var name = dino ? dino.name : 'Un nouveau dino';
      ov.innerHTML =
        '<div class="hatch-gain">' +
          (imgSrc ? '<img class="hatch-gain-img" src="' + imgSrc + '" alt="">' : '') +
          '<div class="hatch-gain-txt">Tu as gagné</div>' +
          '<div class="hatch-gain-nom">' + name + '</div>' +
          '<div class="hatch-gain-sub">Il rejoint ta collection&nbsp;!</div>' +
          '<div class="hatch-gain-btns">' +
            (dino ? '<button type="button" class="hatch-btn hatch-btn-fiche" data-act="fiche">Voir sa fiche</button>' : '') +
            '<button type="button" class="hatch-btn hatch-btn-continuer" data-act="continuer">Continuer</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(ov);
      var done = false;
      function finish() {
        if (done) return;
        done = true;
        ov.style.transition = 'opacity .25s';
        ov.style.opacity = '0';
        setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); resolve(); }, 260);
      }
      ov.addEventListener('click', function (ev) {
        var btn = ev.target.closest('.hatch-btn');
        if (!btn) return;
        if (btn.dataset.act === 'fiche' && dino) {
          location.href = 'dev-dinos.html?v=7&open=' + encodeURIComponent(dino.id);
          return;
        }
        finish();
      });
    });
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

  // ── résolution famille (DINO_FAMILLES : label/emoji/color) ──────────
  function famillesArray() {
    try { return typeof DINO_FAMILLES !== 'undefined' ? DINO_FAMILLES : []; } catch (e) { return []; }
  }
  function familleInfo(id) {
    var list = famillesArray();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  // ── bandeau collection (retour PY : "70 ombres qui défilent, pas
  //    cliquable" → refonte : compteur X/total, possédés EN PREMIER,
  //    TOUT tapable (possédé → fiche, ombre → réaction mystère), regroupé
  //    par famille (séparateur + teinte de fond) pour lire comme un album.
  function bandeauVigHtml(d, has) {
    var src = has ? teteSrc(d) : ombreSrc(d);
    var glow = has && d.id === _justGainedId ? ' gain-glow' : '';
    return '<div class="nid-vig ' + (has ? 'possede' : 'ombre-only') + glow + '" data-dino="' + d.id + '" data-owned="' + (has ? '1' : '0') + '" role="button" aria-label="' + (has ? d.name : 'Dino à découvrir') + '">' +
      '<img src="' + src + '" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'">' +
    '</div>';
  }

  function renderBandeau() {
    mountHosts();
    var host = $('nid-bandeau');
    // Album = uniquement les dinos illustrés (même filtre que le pool d'éclosion)
    var dinos = dinosArray().filter(function (d) { return !!assetKey(d); });
    if (!host || !global.Collection || !dinos.length) { if (host) host.style.display = 'none'; return; }
    var state;
    try { state = Collection.state(); } catch (e) { host.style.display = 'none'; return; }
    if (!state) { host.style.display = 'none'; return; }
    var owned = {};
    (state.owned || []).forEach(function (id) { owned[id] = 1; });
    host.style.display = '';

    // Groupe par famille (ordre DINO_FAMILLES), possédés EN PREMIER dans chaque
    // famille — se lit comme un album à compléter plutôt qu'une file infinie.
    var familles = famillesArray();
    var order = familles.length ? familles.map(function (f) { return f.id; }) : [];
    var byFam = {};
    dinos.forEach(function (d) {
      var f = d.famille || '_sans';
      if (!byFam[f]) byFam[f] = [];
      byFam[f].push(d);
    });
    var famIds = order.length ? order.filter(function (f) { return byFam[f]; }) : Object.keys(byFam);
    Object.keys(byFam).forEach(function (f) { if (famIds.indexOf(f) === -1) famIds.push(f); });

    var groupsHtml = famIds.map(function (fid) {
      var list = byFam[fid].slice().sort(function (a, b) { return (owned[b.id] ? 1 : 0) - (owned[a.id] ? 1 : 0); });
      var info = familleInfo(fid);
      var vigs = list.map(function (d) { return bandeauVigHtml(d, !!owned[d.id]); }).join('');
      return '<div class="nid-fam-groupe" style="' + (info && info.color ? '--fam-c:' + info.color + ';' : '') + '">' +
        '<div class="nid-fam-sep">' + (info ? (info.emoji + ' ' + info.label) : 'Autres') + '</div>' +
        '<div class="nid-fam-row">' + vigs + '</div>' +
      '</div>';
    }).join('');

    var got = state.owned ? state.owned.length : 0;
    host.innerHTML = '<div class="nid-titre"><span class="t-emoji">🦕</span>Ma collection' +
        '<span class="nid-compteur">' + got + ' / ' + dinos.length + '</span></div>' +
      '<div class="nid-bandeau-scroll" id="nid-bandeau-row">' + groupsHtml + '</div>';

    // halo persistant sur le dino qui vient d'être gagné, ~4s, puis nettoyé
    if (_justGainedId) {
      var justId = _justGainedId;
      setTimeout(function () {
        if (_justGainedId !== justId) return; // un autre gain a pris le relai
        _justGainedId = null;
        var el = host.querySelector('.nid-vig.gain-glow');
        if (el) el.classList.remove('gain-glow');
      }, 4000);
    }
  }

  // ── réaction mystère sur une ombre tapée (jamais de tap mort) ───────
  function reactMystere(el) {
    if (!el || el.dataset.reacting) return;
    el.dataset.reacting = '1';
    var mark = document.createElement('span');
    mark.className = 'nid-vig-mystere';
    mark.textContent = '?';
    el.appendChild(mark);
    el.classList.add('wobble');
    try { var s = new Audio('sounds/fx/pop-apparition.mp3'); s.volume = 0.4; s.play().catch(function () {}); } catch (e) {}
    setTimeout(function () {
      el.classList.remove('wobble');
      if (mark.parentNode) mark.parentNode.removeChild(mark);
      delete el.dataset.reacting;
    }, 650);
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
  // `const Tracker = (()=>{...})()` (tracker.js) est un top-level const : il vit
  // dans l'environnement lexical global du document, PAS sur `window` — donc
  // `global.Tracker` (= window.Tracker) est TOUJOURS undefined ici, silencieusement
  // avalé par le catch, et playsOf() retournait 0 pour tout le monde (bug trouvé
  // chantier NID P4 2026-07-26 : la frise ne tamponnait jamais aucun jeu fait).
  // Même pattern que dinosArray() ci-dessus : référencer l'identifiant NU.
  function playsOf(id) {
    try {
      var g = (typeof Tracker !== 'undefined' ? Tracker : null);
      var stats = g ? g.getStats().games[id] : null;
      return stats ? (stats.plays || 0) : 0;
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
    // Pas de garde ici : Collection lui-même fait partie de DEPS (chargé
    // paresseusement juste en dessous). Le garde utile est dans refresh()/
    // renderNid()/renderBandeau(), appelés APRÈS le loadSeq — eux protègent
    // le cas où collection.js est en 404 (fichier absent en prod).
    loadSeq(DEPS, function () {
      refresh();
      // Si un repaire est déjà ouvert au moment où les DEPS finissent de charger
      // (deep-link #repaire=xxx : MUR.init() ouvre le repaire de façon SYNCHRONE,
      // avant que ce loadSeq asynchrone n'ait fini — la frise-chemin de renderRepaire()
      // tourne alors une 1re fois sans NidUI prêt et ne se redessine jamais toute seule).
      // MUR.refresh() re-render tout, y compris `if (current) renderRepaire(current)`
      // qui rappelle NidUI.renderFrise() avec les données maintenant disponibles.
      if (global.MUR && typeof global.MUR.refresh === 'function') global.MUR.refresh();
      // l'éclosion se joue au retour sur le Mur (théâtre du nid, avenant §8).
      // Bug PY 2026-07-28 ("j'ai eu un œuf en or il s'est ouvert direct") : la
      // série (3 parties/30 min) doit TEINTER la capsule en doré, jamais court-
      // circuiter le compteur de 3 ni le théâtre du nid. Le vrai defaut n'etait
      // pas la logique (readyToHatch() exige toujours 3 capsules, doré ou pas)
      // mais le delai ridicule (300ms) qui ne laissait jamais VOIR l'oeuf dore
      // dans le nid avant qu'il ne craque — d'ou l'impression qu'il "s'ouvre
      // tout seul". Si la capsule qui complete le trio est doree, on marque une
      // vraie pause (le temps de la lire) avant de lancer l'eclosion.
      var p = null;
      try { p = global.Collection ? global.Collection.pending() : null; } catch (e) {}
      var lastIsGolden = !!(p && p.count >= 3 && p.golden > 0);
      setTimeout(playHatchIfReady, lastIsGolden ? 1600 : 300);
    });
    // re-render si mur.js rafraîchit (retour repaire→mur, storage event…)
    // navigation .frise-jeu / .rep-jeu / .mur-mini déjà gérée par le
    // délégué click unique de mur.js (même sélecteur étendu) — on ne gère
    // ici QUE ce qui est propre au nid : bandeau (possédé→fiche, ombre→
    // réaction mystère, retour PY "jamais de tap mort") + œuf du nid
    // (réaction vivante, bonus léger avenant §4 — JAMAIS d'ouverture au tap).
    document.addEventListener('click', function (ev) {
      var vig = ev.target.closest('.nid-vig');
      if (vig) {
        if (vig.classList.contains('possede') && vig.dataset.dino) {
          location.href = 'dev-dinos.html?v=7&open=' + encodeURIComponent(vig.dataset.dino);
        } else {
          reactMystere(vig);
        }
        return;
      }
      var oeuf = ev.target.closest('.nid-oeuf.plein');
      if (oeuf) { reactOeuf(oeuf); return; }
    });
  }

  // ── réaction vivante sur tap d'un œuf du nid (bonus léger, avenant §4) —
  // wobble + petit cœur, son court. JAMAIS d'ouverture manuelle (l'éclosion
  // ne se déclenche QUE via Collection.readyToHatch() au retour sur le Mur).
  function reactOeuf(el) {
    if (!el || el.dataset.reacting) return;
    el.dataset.reacting = '1';
    var heart = document.createElement('span');
    heart.className = 'nid-oeuf-coeur';
    heart.textContent = '💛';
    el.appendChild(heart);
    el.classList.add('coucou');
    try { var s = new Audio('sounds/fx/pop-apparition.mp3'); s.volume = 0.35; s.play().catch(function () {}); } catch (e) {}
    setTimeout(function () {
      el.classList.remove('coucou');
      if (heart.parentNode) heart.parentNode.removeChild(heart);
      delete el.dataset.reacting;
    }, 700);
  }

  global.NidUI = { init: init, refresh: refresh, playHatchIfReady: playHatchIfReady, renderFrise: renderFrise };
})(window);
