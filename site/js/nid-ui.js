// ─────────────────────────────────────────────────────────────────────────
//  nid-ui.js — LE MONDE DINO (Mur v2 « La Vallée », spec 2026-07-29 §6)
//
//  Depuis 2026-07-30 le nid ne vit PLUS sur le menu : la vallée est un
//  terrain de jeu pur, la collection vit derrière le Roi T-Rex (« les œufs
//  de dinosaures sont gardés par le roi des dinosaures »). Ce module porte
//  les 2 salles du monde dino (la 3e, l'encyclopédie, est une page à part) :
//
//  · LA CHAMBRE DES ŒUFS (NID v4, contrat inchangé) : œufs individuels
//    teintés FAMILLE, fissures de caresse (cosmétique), sac d'accessoires
//    latéral, soin tap-tap/drag, éclosion individuelle jouée SUR PLACE.
//    Un œuf déjà au chaud à l'ouverture attend ~1,2 s AVANT d'éclore
//    (le doré doit se VOIR, bug PY 2026-07-28 — jamais « ouvert direct »).
//  · PADIDI : simple point d'entrée vers les fiches — grille d'ombres par
//    famille, possédé → fiche encyclo, ombre → réaction mystère.
//    Anti-spoiler gravé : jamais d'œuf à la place d'un dino non révélé.
//  · LE THÉÂTRE DU 1er ŒUF : one-shot par profil, gestuel, débouche sur la
//    chambre (la première occurrence d'une mécanique est MONTRÉE).
//
//  Code DÉFENSIF : moteur absent → rien ne s'affiche, zéro erreur console.
//  Dépendances chargées paresseusement (ordre figé, cf. DEPS).
//
//  API : window.NidUI = { init, refresh, openChambre, openPadidi }
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  var OMBRE = 'img/dinos/ombres/';
  var DINO_BEBE_SFX = ['sounds/fx/dino-bebe.mp3', 'sounds/fx/dino-bebe-2.mp3', 'sounds/fx/dino-bebe-3.mp3'];

  // Cris de bébé PAR FAMILLE (banque 2026-07-27, sounds/_BANQUE-SONS.md).
  // Mapping défensif : famille inconnue OU fichier absent → fallback générique.
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

  // ── chargement paresseux des dépendances ────────────────────────────
  // Ordre figé : dinos-data.js (DINOS) → dinos-assets.js → collection.js
  // (window.Collection) → collection-dinos.js (configure le catalogue).
  var DEPS = ['js/dinos-data.js', 'js/dinos-assets.js', 'js/collection.js', 'js/collection-dinos.js'];
  function hasScript(src) {
    var tags = document.querySelectorAll('script[src]');
    for (var i = 0; i < tags.length; i++) {
      if (tags[i].getAttribute('src').replace(/^\.\//, '') === src) return true;
    }
    return false;
  }
  // Un window.Collection déjà présent (mock de harnais, cf. mur-nid.spec.mjs)
  // ne doit JAMAIS être écrasé par notre chargement paresseux.
  function alreadySatisfied(src) {
    if (/collection\.js$/.test(src)) return !!global.Collection;
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
    s.onerror = function () { loadSeq(list.slice(1), done); }; // jamais bloquer le menu
    document.head.appendChild(s);
  }

  function $(id) { return document.getElementById(id); }

  // ── résolution dino par id (DINOS[].id, minuscule) ─────────────────
  // `const DINOS` top-level (dinos-data.js) vit dans l'environnement lexical
  // global, PAS sur window → identifiant nu obligatoire (piège documenté).
  function dinosArray() {
    try { return typeof DINOS !== 'undefined' ? DINOS : []; } catch (e) { return []; }
  }
  function dinoById(id) {
    var list = dinosArray();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  // Clé du manifeste DINO_ASSETS = nom LATIN capitalisé (id capitalisé).
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

  // ── résolution famille (DINO_FAMILLES : label/emoji/color) ──────────
  function famillesArray() {
    try { return typeof DINO_FAMILLES !== 'undefined' ? DINO_FAMILLES : []; } catch (e) { return []; }
  }
  function familleInfo(id) {
    var list = famillesArray();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  // ── helpers œufs (chambre) ──────────────────────────────────────────
  var ACC_EMOJI = { paille: '🌾', couverture: '🧶', bonnet: '🧢', echarpe: '🧣', etoile: '🌟' };
  function accEmoji(id) { return ACC_EMOJI[id] || '🎁'; }
  function crackSpans(stage) {
    var h = '';
    for (var i = 1; i <= stage; i++) h += '<span class="nid-crack c' + i + '"></span>';
    return h;
  }

  // ── clé de flag préfixée profil (même logique que collection.js) ─────
  function flagKey(name) {
    try {
      var raw = localStorage.getItem('maxplay_active_child');
      var c = raw ? JSON.parse(raw) : null;
      return name + (c && c.id ? '__' + c.id : '');
    } catch (e) { return name; }
  }

  // ── séquence d'éclosion (fête MaxFX + carte de gain) ────────────────
  var hatchInProgress = false;

  function runHatchSequence(eggEl, result) {
    if (result.type === 'doublon') {
      var d = result.item && dinoById(result.item.id ? result.item.id : result.item);
      return showTapToContinue(
        '<div class="hatch-doublon">' +
          '<div class="hatch-doublon-emoji">🥚</div>' +
          '<div class="hatch-doublon-txt">Tu as déjà ' + (d ? d.name : 'ce dino') + ' ! Un jour tu pourras l\'offrir à un copain.</div>' +
        '</div>'
      );
    }
    var dino = dinoById(result.id);
    var imgSrc = teteSrc(dino) || ombreSrc(dino);
    playBabyCry(dino);
    // Retour playtest PY : après la fête, une carte claire (NOM en grand + 2
    // actions ≥80px) — le gain doit se comprendre sans lire.
    return MaxFX.hatch(eggEl, { imgSrc: imgSrc, label: '' })
      .then(function (ov) {
        if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
        return showHatchGainCard(dino, imgSrc);
      });
  }

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

  // tap n'importe où pour continuer — jamais bloquant plus de ~4s
  function showTapToContinue(innerHtml) {
    return new Promise(function (resolve) {
      var ov = document.createElement('div');
      ov.style.cssText = 'position:fixed;inset:0;z-index:70;display:flex;align-items:center;justify-content:center;background:rgba(6,10,22,.7);';
      ov.innerHTML = innerHtml || '';
      document.body.appendChild(ov);
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

  // ── réactions tendres (jamais de tap mort) ──────────────────────────
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

  // ─────────────────────────────────────────────────────────────────────
  //  LA CHAMBRE DES ŒUFS (NID v4 — contrat moteur inchangé)
  // ─────────────────────────────────────────────────────────────────────
  var _chambreSel = null;

  function chambreSupported() {
    return !!(global.Collection && typeof global.Collection.eggs === 'function'
      && typeof global.Collection.warmEgg === 'function');
  }

  function chambreEggHtml(egg) {
    var col = egg.familleMeta && egg.familleMeta.color ? egg.familleMeta.color : '';
    var th = egg.needed || 3;
    var slots = '';
    for (var i = 0; i < th; i++) {
      var accId = egg.acc[i];
      slots += '<span class="ch-slot' + (accId ? ' rempli' : '') + '">' + (accId ? accEmoji(accId) : '') + '</span>';
    }
    return '<div class="ch-oeuf" data-egg="' + egg.index + '">' +
      '<div class="ch-oeuf-visu' + (egg.golden ? ' dore' : '') + (egg.ready ? ' pret' : '') +
        (egg.stage ? ' stage-' + egg.stage : '') + '"' +
        (col && !egg.golden ? ' style="--oeuf-c:' + col + ';"' : '') + '>' +
        crackSpans(egg.stage) +
      '</div>' +
      '<div class="ch-slots">' + slots + '</div>' +
    '</div>';
  }

  function chambreSacHtml() {
    var items = [];
    try { items = global.Collection.sac(); } catch (e) { items = []; }
    var rows = items.map(function (a) {
      return '<button type="button" class="ch-acc' + (_chambreSel === a.id ? ' sel' : '') + '" data-acc="' + a.id + '">' +
        '<span class="ch-acc-e">' + a.emoji + '</span>' +
        (a.count > 1 ? '<span class="ch-acc-n">' + a.count + '</span>' : '') +
      '</button>';
    }).join('');
    if (!rows) rows = '<div class="ch-sac-vide">🎒</div>'; // vide : gestuel, aucune promesse
    return rows;
  }

  function renderChambre() {
    var ov = $('chambre-ov');
    if (!ov) return;
    var eggs = [];
    try { eggs = global.Collection.eggs(); } catch (e) { eggs = []; }
    var eggsHtml = eggs.length
      ? eggs.map(chambreEggHtml).join('')
      : '<div class="ch-vide"><div class="ch-vide-oeuf"></div></div>';
    ov.querySelector('.ch-oeufs').innerHTML = eggsHtml;
    ov.querySelector('.ch-sac-items').innerHTML = chambreSacHtml();
  }

  function openChambre() {
    if (!chambreSupported()) return;
    if ($('chambre-ov')) return;
    _chambreSel = null;
    // le gain est « vu » dès qu'on entre dans le monde dino → le Roi cesse
    // de pulser (source unique du signal : la scène)
    if (global.MurScene && global.MurScene.markGainSeen) global.MurScene.markGainSeen();
    var ov = document.createElement('div');
    ov.id = 'chambre-ov';
    ov.innerHTML =
      '<div class="chambre">' +
        '<div class="ch-hdr">' +
          '<button type="button" class="ch-back" aria-label="Retour">←</button>' +
          '<span class="ch-titre">🥚 La chambre des œufs</span>' +
        '</div>' +
        '<div class="ch-oeufs"></div>' +
        '<div class="ch-sac"><div class="ch-sac-tete">🎒</div><div class="ch-sac-items"></div></div>' +
      '</div>';
    document.body.appendChild(ov);
    renderChambre();

    // Un œuf déjà au chaud (revenu d'un jeu, œuf migré, amour d'hier) éclot
    // ICI, après une vraie pause — il doit se VOIR avant de craquer (le doré
    // surtout, bug PY 2026-07-28 « il s'est ouvert direct »).
    var ready = -1;
    try { ready = global.Collection.readyEggIndex(); } catch (e) {}
    if (ready !== -1) setTimeout(function () { hatchInChambre(ready); }, 1300);

    ov.addEventListener('click', function (ev) {
      if (ev.target.closest('.ch-back')) { closeChambre(); return; }
      var accBtn = ev.target.closest('.ch-acc');
      if (accBtn) {
        _chambreSel = (_chambreSel === accBtn.dataset.acc) ? null : accBtn.dataset.acc;
        renderChambre();
        return;
      }
      var eggEl = ev.target.closest('.ch-oeuf');
      if (eggEl) {
        var idx = parseInt(eggEl.dataset.egg, 10);
        if (_chambreSel !== null) placeAcc(idx, _chambreSel, eggEl);
        else caressEgg(idx, eggEl);
      }
    });
    // drag naturel : pointerdown sur un accessoire → fantôme qui suit le
    // doigt → relâché sur un œuf = posé.
    ov.addEventListener('pointerdown', function (ev) {
      var accBtn = ev.target.closest('.ch-acc');
      if (!accBtn) return;
      var accId = accBtn.dataset.acc;
      var ghost = null;
      var moved = false;
      function onMove(e) {
        if (!ghost) {
          ghost = document.createElement('div');
          ghost.className = 'ch-ghost';
          ghost.textContent = accEmoji(accId);
          document.body.appendChild(ghost);
        }
        moved = true;
        ghost.style.left = e.clientX + 'px';
        ghost.style.top = e.clientY + 'px';
      }
      function onUp(e) {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        if (!moved) return; // simple tap : géré par le click (sélection)
        var under = document.elementFromPoint(e.clientX, e.clientY);
        var eggEl = under && under.closest ? under.closest('.ch-oeuf') : null;
        if (eggEl) placeAcc(parseInt(eggEl.dataset.egg, 10), accId, eggEl);
      }
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
    });
  }

  function closeChambre() {
    var ov = $('chambre-ov');
    if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
    _chambreSel = null;
    refresh();
  }

  function placeAcc(eggIndex, accId, eggEl) {
    var res = null;
    try { res = global.Collection.warmEgg(eggIndex, accId); } catch (e) { return; }
    if (!res || !res.ok) {
      if (eggEl) reactOeuf(eggEl.querySelector('.ch-oeuf-visu') || eggEl);
      return;
    }
    _chambreSel = null;
    try { var s = new Audio('sounds/fx/pop-apparition.mp3'); s.volume = 0.5; s.play().catch(function () {}); } catch (e) {}
    renderChambre();
    var visu = document.querySelector('.ch-oeuf[data-egg="' + eggIndex + '"] .ch-oeuf-visu');
    if (visu) reactOeuf(visu);
    if (res.ready) setTimeout(function () { hatchInChambre(eggIndex); }, 900);
  }

  function caressEgg(eggIndex, eggEl) {
    var res = null;
    try { res = global.Collection.caress(eggIndex); } catch (e) { return; }
    var visu = eggEl.querySelector('.ch-oeuf-visu') || eggEl;
    reactOeuf(visu);
    if (res && res.stage) {
      visu.classList.remove('stage-1', 'stage-2', 'stage-3');
      visu.classList.add('stage-' + res.stage);
      visu.innerHTML = crackSpans(res.stage);
    }
    if (res && (res.loveJustWarmed || res.ready)) setTimeout(function () { hatchInChambre(eggIndex); }, 900);
  }

  function hatchInChambre(eggIndex) {
    if (hatchInProgress) return;
    var eggEl = document.querySelector('.ch-oeuf[data-egg="' + eggIndex + '"] .ch-oeuf-visu');
    if (!eggEl || !global.MaxFX) return;
    var result = null;
    try { result = global.Collection.hatchEgg(eggIndex); } catch (e) { return; }
    if (!result) return;
    hatchInProgress = true;
    runHatchSequence(eggEl, result).then(function () {
      hatchInProgress = false;
      renderChambre();
      refresh();
    });
  }

  // ─────────────────────────────────────────────────────────────────────
  //  PADIDI — point d'entrée vers les fiches (spec §6.3) : grille d'ombres
  //  par famille, possédé → fiche encyclo, ombre → réaction mystère.
  //  Anti-spoiler GRAVÉ : jamais d'œuf à la place d'un dino non révélé.
  // ─────────────────────────────────────────────────────────────────────
  function padidiVigHtml(d, has) {
    var src = has ? teteSrc(d) : ombreSrc(d);
    return '<div class="nid-vig ' + (has ? 'possede' : 'ombre-only') + '" data-dino="' + d.id + '" data-owned="' + (has ? '1' : '0') + '" role="button" aria-label="' + (has ? d.name : 'Dino à découvrir') + '">' +
      '<img src="' + src + '" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'">' +
    '</div>';
  }

  function padidiContentHtml() {
    var dinos = dinosArray().filter(function (d) { return !!assetKey(d); });
    if (!global.Collection || !dinos.length) return '';
    var state;
    try { state = Collection.state(); } catch (e) { return ''; }
    var owned = {};
    (state.owned || []).forEach(function (id) { owned[id] = 1; });

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
      var vigs = list.map(function (d) { return padidiVigHtml(d, !!owned[d.id]); }).join('');
      return '<div class="nid-fam-groupe" style="' + (info && info.color ? '--fam-c:' + info.color + ';' : '') + '">' +
        '<div class="nid-fam-sep">' + (info ? (info.emoji + ' ' + info.label) : 'Autres') + '</div>' +
        '<div class="nid-fam-row">' + vigs + '</div>' +
      '</div>';
    }).join('');

    var got = state.owned ? state.owned.length : 0;
    return '<div class="ch-hdr">' +
        '<button type="button" class="ch-back" aria-label="Retour">←</button>' +
        '<span class="ch-titre">🏞 Padidi</span>' +
        '<span class="nid-compteur">' + got + ' / ' + dinos.length + '</span>' +
      '</div>' +
      '<div class="nid-bandeau-scroll">' + groupsHtml + '</div>';
  }

  function openPadidi() {
    if ($('padidi-ov')) return;
    var ov = document.createElement('div');
    ov.id = 'padidi-ov';
    ov.innerHTML = padidiContentHtml();
    if (!ov.innerHTML) return; // moteur/données absents : pas d'écran vide
    if (global.MurScene && global.MurScene.markGainSeen) global.MurScene.markGainSeen();
    document.body.appendChild(ov);
    ov.addEventListener('click', function (ev) {
      if (ev.target.closest('.ch-back')) { if (ov.parentNode) ov.parentNode.removeChild(ov); return; }
      var vig = ev.target.closest('.nid-vig');
      if (!vig) return;
      if (vig.classList.contains('possede') && vig.dataset.dino) {
        location.href = 'dev-dinos.html?v=7&open=' + encodeURIComponent(vig.dataset.dino);
      } else {
        reactMystere(vig); // jamais de tap mort, jamais de spoiler
      }
    });
  }

  // ─────────────────────────────────────────────────────────────────────
  //  THÉÂTRE DU 1er ŒUF — one-shot par profil, gestuel, → chambre
  // ─────────────────────────────────────────────────────────────────────
  function maybeNidIntro() {
    if (!chambreSupported()) return;
    var KEY = flagKey('maxplay_nid_intro');
    try { if (localStorage.getItem(KEY)) return; } catch (e) { return; }
    var eggs = [];
    try { eggs = global.Collection.eggs(); } catch (e) { return; }
    if (!eggs.length) return;
    try { localStorage.setItem(KEY, '1'); } catch (e) {}

    var egg = eggs[0];
    var col = egg.familleMeta && egg.familleMeta.color ? egg.familleMeta.color : '#f5e3c2';
    var ov = document.createElement('div');
    ov.id = 'nid-intro-ov';
    ov.innerHTML =
      '<div class="ni-scene">' +
        '<div class="ni-nid">🪺</div>' +
        '<div class="ni-oeuf" style="--oeuf-c:' + col + ';"></div>' +
        '<div class="ni-acc">🧶</div>' +
        '<div class="ni-coeur">💛</div>' +
        '<div class="ni-txt">Un œuf ! Garde-le au chaud dans le nid.</div>' +
      '</div>';
    document.body.appendChild(ov);
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      ov.style.transition = 'opacity .3s';
      ov.style.opacity = '0';
      setTimeout(function () {
        if (ov.parentNode) ov.parentNode.removeChild(ov);
        openChambre(); // la routine de soin commence LÀ
      }, 310);
    }
    ov.addEventListener('click', finish);
    setTimeout(finish, 6000);
  }

  // ── init / refresh ───────────────────────────────────────────────────
  function refresh() {
    // la vallée porte les signaux (pulse du Roi) — on la laisse se resynchroniser
    if (global.MurScene && typeof global.MurScene.refresh === 'function') global.MurScene.refresh();
  }

  function init() {
    loadSeq(DEPS, function () {
      // théâtre du 1er œuf au retour dans la vallée (one-shot)
      setTimeout(maybeNidIntro, 700);
      if (global.MurScene && typeof global.MurScene.refresh === 'function') global.MurScene.refresh();
    });
  }

  global.NidUI = { init: init, refresh: refresh, openChambre: openChambre, openPadidi: openPadidi };
})(window);
