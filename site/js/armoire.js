// ─────────────────────────────────────────────────────────────────────────
//  armoire.js — Accueil enfant « L'Armoire » (HO-MJ-22, meuble v8).
//
//  Le MEUBLE (carcasse, planches, montants, tiroirs, vantaux) est construit
//  par js/armoire-meuble.js (ArmoireMeuble.build), à partir du kit généré
//  js/gen/armoire-kit.js (boîtes en % du repère 911 × 1480, mesurées sur
//  docs/refs/armoire/ref-ouverte.png). Ce fichier-ci ne pose plus AUCUNE
//  pièce de meuble : il range par-dessus les CASES DE JEUX, les 3 fonctions
//  fixes (Dinos/Monde/Œufs), le prénom et l'avatar — z-index 40 (cases) et
//  50 (prénom) d'armoire.css, le meuble occupant les z-index 10 à 60
//  d'armoire-meuble.css.
//
//  Les 2 tiroirs du meuble sont RÉUTILISÉS tels quels (ArmoireMeuble gère
//  déjà leur effet visuel « tiré » au tap) : on leur donne juste un id et
//  un comportement de navigation, jamais une icône flottante par-dessus.
//
//  API : window.Armoire = { render, refresh }
//  Compat : window.MurScene = { markGainSeen, refresh } — contrat inchangé
//  depuis HO-MJ-13, nid-ui.js appelle encore ces deux-là.
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  var IMG = 'img/armoire/';

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ── Grille des cases, MESURÉE sur le kit (retour PY 2026-10-30 : objets
  // décentrés, lampes à cheval sur les étagères, bois superposé). Chaque
  // case EST un compartiment du meuble : de la planche du dessus (ou du
  // plafond) au dessus de sa planche, d'une cloison à l'autre. Plus aucune
  // hauteur ni aucun centre recopiés à la main (L-138) : les anciennes
  // valeurs (COLS 28,58/49,75/70,92, ROWS_H 13,6/12,6/…) ne tombaient ni
  // entre les cloisons ni entre les planches.
  var ROWS_ZONE = ['haut', 'haut', 'niche', 'bas', 'bas'];
  // Dessous de la corniche, mesuré dans shell.webp (bande sombre du
  // sous-plafond de 10,5 à 12,9 % : c'est là que vivent les spots).
  var PLAFOND_Y = 10.3;

  function buildRows(kit) {
    var P = kit.pieces;
    return ROWS_ZONE.map(function (zone, i) {
      var dessus = i === 0 ? PLAFOND_Y : P['planche-' + i].box.y + P['planche-' + i].box.h;
      var planche = P['planche-' + (i + 1)].box;
      return { zone: zone, top: dessus, bottom: planche.y, cy: (dessus + planche.y) / 2,
               ch: planche.y - dessus, chant: planche.h };
    });
  }

  // 3 colonnes = les 3 compartiments entre les côtés intérieurs (planche-1)
  // et les 2 cloisons (montant-1/2 du kit, les mêmes que la niche).
  function buildCols(kit) {
    var P = kit.pieces;
    var g = P['planche-1'].box.x, d = g + P['planche-1'].box.w;
    var m1 = P['montant-1'].box, m2 = P['montant-2'].box;
    return [[g, m1.x], [m1.x + m1.w, m2.x], [m2.x + m2.w, d]].map(function (b) {
      return { cx: (b[0] + b[1]) / 2, cw: b[1] - b[0] };
    });
  }

  // ── Teinte de fond par case, selon l'objet (retour PY 2026-09-28) : UNE
  // seule constante, en "r g b" (jamais un hex éparpillé dans le CSS), lue
  // par --tinte-rgb dans armoire.css. Couleur dominante de chaque sprite —
  // la météorite (Surprise) n'en a pas : son fond est un ciel nocturne
  // complet, géré par le sélecteur [data-obj="obj-meteorite"] en CSS.
  var OBJ_TINTE = {
    'obj-bus':            '242 194 48',  // jaune bus
    'obj-lettres':        '224 72 60',   // rouge (cube A)
    'obj-chiffres':       '63 143 209',  // bleu (le "3")
    'obj-drapeaux':       '58 110 165',  // bleu drapeaux
    'obj-volcan':         '226 98 43',   // orange/rouge lave
    'obj-peluche-tri':    '79 158 79',   // vert Tritri
    'obj-peluche-stego':  '217 122 60',  // orange plaques stégo
    'obj-reveil':         '124 194 74',  // vert réveil
    'obj-radio':          '226 112 74',  // corail radio
    'obj-puzzle':         '63 127 199',  // bleu plateau puzzle
    'obj-livre-ouvert':   '201 145 90',  // brun livre
    'obj-livres-dinos':   '74 143 74',   // vert couverture
    'obj-globe':          '47 127 199',  // bleu monde
    'obj-oeuf':           '169 161 90',  // crème/vert œuf
    'obj-dessin':         '242 194 48',  // jaune crayon
    'obj-couleurs':       '226 98 43',   // orange peinture
    'obj-grilles':        '201 145 90',  // bois du plateau
    'obj-cherche':        '124 194 74',  // vert herbe sous la loupe
    'obj-dino':           '79 158 79'    // vert bébé dino
  };
  function applyObjMeta(btn, objName) {
    btn.dataset.obj = objName;
    var t = OBJ_TINTE[objName];
    if (t) btn.style.setProperty('--tinte-rgb', t);
  }

  // ── Le globe tourne au tap : 11 frames (256 px, ~150 Ko), UN SEUL tour,
  // jamais en boucle. Servies par le service worker (précache, HO-MJ-16) :
  // pas de préchargement JS ici, ça alourdirait le premier affichage pour un
  // objet qu'on ne touche pas forcément. Idle : léger flottement CSS
  // (#vit-monde .obj dans armoire.css) — jamais un tour automatique (le
  // dépôt de Papa Yann le dit lui-même : « évite que l'armoire entière
  // bouge »). prefers-reduced-motion : le tour est sauté, la navigation
  // suit tout de suite.
  var GLOBE_N = 11;
  var GLOBE_FRAMES = [];
  for (var _gi = 1; _gi <= GLOBE_N; _gi++) {
    GLOBE_FRAMES.push(IMG + 'globe-' + (_gi < 10 ? '0' + _gi : _gi) + '.webp');
  }
  function reducedMotion() {
    try { return !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches); }
    catch (e) { return false; }
  }
  function playGlobeTour(imgEl, done) {
    if (reducedMotion() || !imgEl) { done(); return; }
    var original = imgEl.getAttribute('src'), i = 0;
    var iv = setInterval(function () {
      if (i >= GLOBE_FRAMES.length) {
        clearInterval(iv);
        imgEl.setAttribute('src', original);
        done();
        return;
      }
      imgEl.setAttribute('src', GLOBE_FRAMES[i]);
      i++;
    }, 1000 / 9);
  }

  // ── Pool de tirage : TOUJOURS catalogVisible(), jamais le brut ──────
  function pool() { return (global.catalogVisible ? global.catalogVisible() : []) || []; }

  // ── Tour par tour dans une case (EP-156, PY 2026-10-28 : « si y'en a 3
  // dans ce thème un s'ouvre aléatoirement, et ça tourne ») : un sac mélangé
  // par case, rangé dans localStorage. Chaque toucher sort le jeu suivant du
  // sac ; sac vide → on remélange, sans rejouer tout de suite le dernier.
  // Tous les jeux d'une case passent donc avant qu'un revienne.
  var TOUR_KEY = 'maxplay_armoire_tour';

  function lireTour() {
    try { return JSON.parse(localStorage.getItem(TOUR_KEY)) || {}; } catch (e) { return {}; }
  }
  function ecrireTour(tour) {
    try { localStorage.setItem(TOUR_KEY, JSON.stringify(tour)); }
    catch (e) { /* stockage bloqué : chaque toucher reste un tirage au hasard */ }
  }
  function melanger(liste) {
    var a = liste.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var k = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[k]; a[k] = t;
    }
    return a;
  }

  function prochainJeu(caseId) {
    var jeux = pool().filter(function (e) { return e.armoire === caseId; });
    if (!jeux.length) return null;
    var ids = jeux.map(function (e) { return e.id; });
    var tour = lireTour();
    var etat = tour[caseId] || {};
    var sac = (etat.sac || []).filter(function (id) { return ids.indexOf(id) !== -1; });
    if (!sac.length) {
      sac = melanger(ids);
      if (sac.length > 1 && sac[0] === etat.dernier) sac.push(sac.shift());
    }
    var id = sac.shift();
    tour[caseId] = { sac: sac, dernier: id };
    ecrireTour(tour);
    return jeux[ids.indexOf(id)];
  }

  function jeuSurprise() {
    var jeux = pool().filter(function (e) { return e.id !== 'dinos'; });
    return jeux.length ? jeux[Math.floor(Math.random() * jeux.length)] : null;
  }

  // EXACTEMENT 12 cases : 2 niveaux × 3 colonnes derrière les portes hautes,
  // autant derrière les basses. Pas une de plus — au-delà, l'armoire vire au
  // launcher d'icônes et cesse d'être un meuble. Dinos, Monde et Œufs ne sont
  // pas des cases à thème : ce sont les trois fonctions permanentes du meuble,
  // posées dans la niche centrale toujours ouverte.
  // Les 9 cases à thème viennent de MAXPLAY_ARMOIRE (catalog.js), puis
  // Musique, Histoires et Surprise, le seul hasard pur du meuble. Chaque objet
  // n'apparaît qu'une fois. Étiquettes d'un mot, déchiffrables à 4 ans.
  function buildSlots() {
    var themes = (global.MAXPLAY_ARMOIRE || []).map(function (c) {
      return { obj: c.obj, label: c.label, choisir: function () { return prochainJeu(c.id); } };
    });
    return themes.concat([
      { obj: 'obj-radio', label: 'Musique', url: 'musique.html' },
      { obj: 'obj-livre-ouvert', label: 'Histoires', url: 'lecture.html' },
      { obj: 'obj-meteorite', label: 'Surprise', choisir: jeuSurprise }
    ]);
  }

  // Le jeu est choisi AU TOUCHER, pas à l'affichage : deux touchers de suite
  // sur la même case ouvrent deux jeux différents du thème.
  function urlDuSlot(slot) {
    if (slot.url) return slot.url;
    var e = slot.choisir();
    return e ? e.url : null;
  }

  function isEncycloUnlocked() {
    try { return !!(global.Unlock && Unlock.isUnlocked('dinos')); } catch (e) { return false; }
  }

  // Prénom gravé dans l'arche — même source que le filet inline en fin
  // d'index.html. Le DOM n'étant plus recréé, une seule lecture suffit.
  function readNickname() {
    try {
      var raw = localStorage.getItem('maxplay_active_child');
      var child = raw && JSON.parse(raw);
      if (child && child.nickname) return child.nickname;
    } catch (e) {}
    return 'Champion';
  }

  // ── Décor : posé une seule fois, jamais reconstruit ─────────────────
  function place(el, cx, cy, cw, ch) {
    el.style.setProperty('--cx', cx + '%');
    el.style.setProperty('--cy', cy + '%');
    el.style.setProperty('--cw', cw + '%');
    el.style.setProperty('--ch', ch + '%');
  }

  // Facteur de taille par objet : MESURÉ par tools/armoire-objets.py, servi
  // par js/gen/armoire-objets.js. Sans lui, à taille de case égale, un objet
  // ajouré (drapeaux, volcan) paraît maigre à côté d'un objet trapu (livres).
  function objHtml(nom) {
    var s = (global.ARMOIRE_OBJ_SCALE || {})[nom];
    return '<img class="obj" src="' + IMG + nom + '.webp" alt=""' +
      (s ? ' style="--obj-scale:' + s + '"' : '') + '>';
  }

  function slotHtml(slot) {
    return '<span class="tap" aria-hidden="true"></span>' +
           objHtml(slot.obj) +
           '<span class="etiquette">' + esc(slot.label) + '</span>';
  }

  function makeSlot(cls, id, label) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = cls;
    if (id) b.id = id;
    b.setAttribute('aria-label', label);
    return b;
  }

  // ── Cloisons entre les cases d'une même rangée (retour PY 2026-09-28,
  // réf. image « Dino & Bus ») : la niche centrale a déjà deux montants du
  // kit entre Dinos/Monde/Œufs (montant-1/2, toujours visibles). On rejoue
  // EXACTEMENT le même bois — jamais une cloison CSS inventée (L-145) — sur
  // les 4 autres rangées, aligné sur les mêmes centres x pour que les
  // cloisons courent d'un seul tenant du haut en bas du meuble. Cachées
  // avec leur zone comme les cases (setCasesVisible), jamais un montant du
  // meuble lui-même : ce sont des <img> posées par armoire.js, pas par
  // ArmoireMeuble.
  function buildCloisons(root, kit, ROWS) {
    var m1 = kit.pieces['montant-1'].box, m2 = kit.pieces['montant-2'].box;
    var cx1 = m1.x + m1.w / 2, cx2 = m2.x + m2.w / 2;
    var v = kit.version;
    // Glisse un peu SOUS les planches voisines (z-index 19 < planche 20,
    // armoire.css) : l'étagère passe devant la cloison, comme sur
    // docs/refs/armoire/ref-casiers-12.png, jamais un bois posé par-dessus.
    var engage = 0.4;
    [0, 1, 3, 4].forEach(function (i) {
      var row = ROWS[i];
      [[cx1, 'montant-1'], [cx2, 'montant-2']].forEach(function (pair) {
        var im = document.createElement('img');
        im.className = 'cloison';
        im.src = IMG + 'v8/' + pair[1] + '.webp?v=' + v;
        im.alt = ''; im.draggable = false;
        im.dataset.zone = row.zone;
        place(im, pair[0], row.cy, m1.w, row.ch + engage * 2);
        root.appendChild(im);
      });
    });
  }

  // ── Recouvre les 2 douilles peintes dans shell.webp (retour PY passe 3,
  // 2026-09-28) : positions mesurées (32.38 %/66.99 %, y 11.19 %), taille =
  // exactement la boîte source du patch (12 % × 8 %, pas d'étirement) pour
  // que le grain colle. Pas de bordure nette : un masque radial fait
  // disparaître le raccord dans le bois environnant.
  var PATCH_PLAFOND = [
    { x: 32.38, y: 11.19 }, { x: 66.99, y: 11.19 }
  ];
  var PATCH_W = 12, PATCH_H = 8;
  function buildPatchesPlafond(root) {
    PATCH_PLAFOND.forEach(function (p) {
      var im = document.createElement('img');
      im.className = 'patch-plafond';
      im.src = IMG + 'patch-plafond.webp';
      im.alt = ''; im.draggable = false;
      im.setAttribute('aria-hidden', 'true');
      place(im, p.x, p.y, PATCH_W, PATCH_H);
      root.appendChild(im);
    });
  }

  // ── Décor : le MEUBLE vient du kit (ArmoireMeuble), les CASES de jeu
  // sont posées par-dessus, calées sur ses planches. ─────────────────────
  function buildDecor(root, slots) {
    var kit = global.ARMOIRE_KIT;
    if (!global.ArmoireMeuble || !kit) {
      throw new Error('armoire.js : ArmoireMeuble / ARMOIRE_KIT non chargés (vérifier l\'ordre des <script> dans index.html)');
    }
    var ROWS = buildRows(kit);
    var COLS = buildCols(kit);

    // 1. le meuble : carcasse, planches, montants, 2 tiroirs, 4 vantaux —
    //    posés fermés (ArmoireMeuble.build ferme les deux zones lui-même).
    global.ArmoireMeuble.build(root);

    // 2. plus de 2 spots isolés (retour PY passe 2, 2026-09-28) : le 2e
    //    (x=63.5) tombait quasi pile sur la nouvelle cloison de droite
    //    (montant-2 centré à 63.45 %), et aucun des deux n'était centré sur
    //    une case du plateau de jeu (COLS = 28.58/49.75/70.92). Remplacés
    //    par l'ampoule + halo posés sur CHAQUE case (.casier::before /
    //    .objet::before, armoire.css) : les 15 cases sont éclairées, plus
    //    seulement 2 sur 15, et plus de doublon avec la nouvelle cloison.
    //
    //    Supprimer les .spot ne suffisait pas (retour PY passe 3) : les 2
    //    douilles + ampoule sont PEINTES dans shell.webp lui-même, à
    //    32,38 % et 66,99 % (mesuré par analyse de pixels, luminance > 235
    //    dans le bandeau du haut). On ne touche ni au kit ni à shell.webp :
    //    on les recouvre par un petit calque DÉCOUPÉ dans shell.webp
    //    lui-même (le plafond plain entre les 2 douilles, x 44-56 %,
    //    y 7,5-15,5 % — vérifié sans halo — généré une fois par
    //    tools/armoire-patch-plafond.mjs vers img/armoire/patch-plafond.webp,
    //    même bois, même grain, L-145) posé PAR-DESSUS le plafond peint et
    //    SOUS notre propre ampoule (z-index 16 : au-dessus de la carcasse
    //    z10, sous cloisons/cases z39-40).
    buildPatchesPlafond(root);

    // 3. les cases. Niche (toujours visible) : Dinos · Monde · Œufs. Les
    //    deux niveaux du haut et les deux du bas : les 12 premiers tirages.
    var fixes = [
      { id: 'vit-dinos', obj: 'obj-livres-dinos', label: 'Dinos' },
      { id: 'vit-monde', obj: 'obj-globe', label: 'Monde' },
      { id: 'hdr-oeufs', obj: 'obj-oeuf', label: 'Œufs', badge: 'hdr-oeufs-n' }
    ];
    var iTirage = 0;
    ROWS.forEach(function (row) {
      COLS.forEach(function (colonne, col) {
        var btn, slot;
        if (row.zone === 'niche') {
          var f = fixes[col];
          btn = makeSlot('objet', f.id, f.label);
          btn.innerHTML = '<span class="tap" aria-hidden="true"></span>' +
            objHtml(f.obj) +
            (f.badge ? '<span class="hdr-badge" id="' + f.badge + '" style="display:none"></span>' : '') +
            '<span class="etiquette">' + esc(f.label) + '</span>';
          applyObjMeta(btn, f.obj);
        } else {
          slot = slots[iTirage];
          if (!slot) return;
          btn = makeSlot('casier', null, slot.label);
          btn.dataset.idx = iTirage;
          btn.innerHTML = slotHtml(slot);
          applyObjMeta(btn, slot.obj);
          iTirage++;
        }
        btn.dataset.zone = row.zone;
        btn.style.setProperty('--chant', row.chant);
        place(btn, colonne.cx, row.cy, colonne.cw, row.ch);
        root.appendChild(btn);
      });
    });
    buildCloisons(root, kit, ROWS);

    // 4. les deux tiroirs du kit sont RÉUTILISÉS (poignée + façade déjà
    //    posées par ArmoireMeuble.build) : on leur donne un id et un
    //    comportement, jamais une icône flottante en plus.
    var tiroirG = root.querySelector('.am-tiroir.tiroir-g');
    var tiroirD = root.querySelector('.am-tiroir.tiroir-d');
    if (tiroirG) { tiroirG.id = 'hdr-padidi'; tiroirG.setAttribute('aria-label', 'Mon album de photos'); }

    // 5. le prénom, gravé sur l'arche
    var nom = document.createElement('div');
    nom.className = 'player-name';
    nom.id = 'profil-pseudo';
    nom.textContent = readNickname();
    root.appendChild(nom);
  }

  // ── Ouverture / fermeture des CASES d'une zone. Le meuble lui-même
  // (vantaux, tiroirs) est géré par ArmoireMeuble.setZone/toggle — on ne le
  // refait pas ici, on synchronise juste ce qu'on a posé par-dessus. ──────
  var _closeT = {};

  function setCasesVisible(root, zone, open, immediat) {
    var cases = root.querySelectorAll(
      '.casier[data-zone="' + zone + '"], .objet[data-zone="' + zone + '"], .cloison[data-zone="' + zone + '"]');
    clearTimeout(_closeT[zone]);
    if (open) {
      cases.forEach(function (c) { c.classList.remove('zone-cachee'); });
    } else if (immediat) {
      cases.forEach(function (c) { c.classList.add('zone-cachee'); });
    } else {
      // on ne masque qu'une fois le vantail revenu devant
      _closeT[zone] = setTimeout(function () {
        cases.forEach(function (c) { c.classList.add('zone-cachee'); });
      }, 620);
    }
  }

  // ArmoireMeuble pose son propre listener délégué sur `root` PENDANT
  // build() (plus tôt), donc quand ce listener-ci s'exécute (même cible,
  // même phase de bulle), la porte a déjà tourné et root.classList reflète
  // le NOUVEL état — on n'a plus qu'à synchroniser les cases dessus.
  function wireDoors(root) {
    root.addEventListener('click', function (ev) {
      var porte = ev.target.closest('.am-porte, .am-ouverte');
      if (!porte) return;
      var zone = porte.dataset.zone;
      setCasesVisible(root, zone, root.classList.contains('am-ouvert-' + zone));
    });
  }

  // ── Câblage des cases fixes (Dinos/Monde/Œufs) ──────────────────────
  function wireFixes(root) {
    var dinos = $('vit-dinos');
    if (dinos) dinos.addEventListener('click', function () { if (global.MUR && MUR.openEncyclo) MUR.openEncyclo(); });
    var monde = $('vit-monde');
    if (monde) {
      var globeBusy = false;
      monde.addEventListener('click', function () {
        if (globeBusy) return;
        globeBusy = true;
        playGlobeTour(monde.querySelector('.obj'), function () {
          globeBusy = false;
          if (global.MUR && MUR.openEncyclo) MUR.openEncyclo();
        });
      });
    }
    var oeufs = $('hdr-oeufs');
    if (oeufs) oeufs.addEventListener('click', function () { if (global.NidUI && NidUI.openChambre) NidUI.openChambre(); });
  }

  // Le tiroir de droite tirait 12 nouveaux jeux au sort (« encore ») : avec
  // une case par thème (EP-156), il n'a plus rien à tirer et redevient un
  // simple tiroir du meuble, qui s'ouvre et se ferme.
  // Les 2 tiroirs du kit : leur poignée gère déjà l'effet visuel « tiré »
  // (listener délégué posé par ArmoireMeuble PENDANT build(), donc plus tôt
  // que celui-ci). Ce listener-ci s'exécute ensuite et ajoute juste la
  // navigation par-dessus l'animation.
  function wireTiroirs(root) {
    root.addEventListener('click', function (ev) {
      var t = ev.target.closest('.am-tiroir');
      if (!t) return;
      if (t.id === 'hdr-padidi') { if (global.NidUI && NidUI.openPadidi) NidUI.openPadidi(); }
    });
  }

  var _slots = null;

  function wireCasiers(root) {
    root.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.casier');
      if (!btn) return;
      var slot = _slots[+btn.dataset.idx];
      var url = slot && urlDuSlot(slot);
      if (url) location.href = url;
    });
  }

  // ── Repeints légers (appelés par refresh(), jamais de reconstruction) ─
  function paintLock() {
    var dinos = $('vit-dinos');
    if (dinos) dinos.classList.toggle('locked', !isEncycloUnlocked());
  }

  function paintOeufsBadge() {
    try {
      var n = global.Collection ? Collection.eggs().length : 0;
      var b = $('hdr-oeufs-n');
      if (!b) return;
      b.textContent = n;
      b.style.display = n > 0 ? '' : 'none';
    } catch (e) {}
  }

  function refresh() {
    paintLock();
    paintOeufsBadge();
  }

  var _built = false;

  function render() {
    var root = $('armoire');
    if (!root) return;
    if (!_built) {
      _built = true;
      _slots = buildSlots();
      buildDecor(root, _slots);
      wireDoors(root);
      wireFixes(root);
      wireTiroirs(root);
      wireCasiers(root);

      // Cases FERMÉES à l'arrivée, comme les vantaux (déjà fermés par
      // ArmoireMeuble.build) : c'est l'enfant qui ouvre. Les ouvrir tout
      // seul après une demi-seconde tuait l'idée même du meuble — on
      // découvre ce qu'il y a dedans en le touchant, on ne regarde pas une
      // armoire se déballer.
      setCasesVisible(root, 'haut', false, true);
      setCasesVisible(root, 'bas', false, true);
    }
    refresh();
  }

  function init() {
    render();
    // badge œufs : moteur Collection chargé paresseusement par le Mur, on
    // retente une fois plus tard puis à chaque pageshow (contrat v2).
    setTimeout(paintOeufsBadge, 1500);
    global.addEventListener('pageshow', paintOeufsBadge);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  global.Armoire = { render: render, refresh: refresh };
  // Compat nid-ui.js (contrat inchangé depuis HO-MJ-13) : la scène du Mur
  // n'existe plus, mais l'armoire réagit aux mêmes signaux.
  global.MurScene = { markGainSeen: function () { refresh(); }, refresh: refresh };
})(window);
