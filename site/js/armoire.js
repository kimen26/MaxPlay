// ─────────────────────────────────────────────────────────────────────────
//  armoire.js — Accueil enfant « L'Armoire » v3 (HO-MJ-15 : carcasse en
//  tuiles fidèle à la maquette statique studio/minijeux/tools/
//  armoire-compose.py — remplace le HTML/CSS pur de v2 HO-MJ-14).
//
//  L'armoire est IMMOBILE : jamais d'ascenseur. Le DOM de la carcasse
//  (fronton, panneaux, vitrines, casiers, tiroirs, pieds, portes) est généré
//  ICI à chaque resize, avec un pixel-par-unité --u calculé EXACTEMENT comme
//  compose() dans armoire-compose.py. Chaque rangée reçoit sa hauteur exacte
//  en pixels (style.height), posée par ce même calcul — c'est plus robuste
//  qu'un grid-template-rows figé puisque le nombre de rangées de casiers
//  varie (1 à 3). Les objets/jeux sont posés en CALQUE au-dessus, jamais
//  mélangés à la carcasse (brief HO-MJ-15 § 3).
//  Le tirage des jeux (SLOTS, pool, byCategory...) est inchangé depuis v2.
//
//  API : window.Armoire = { render, refresh }
//  Compat : window.MurScene = { markGainSeen, refresh } — nid-ui.js appelle
//  encore MurScene.refresh()/markGainSeen() (contrat inchangé, brief HO-MJ-13).
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ── Pool de tirage : TOUJOURS catalogVisible(), jamais le brut ──────
  function pool() { return (global.catalogVisible ? global.catalogVisible() : []) || []; }

  function byCategory(cat, opts) {
    opts = opts || {};
    return pool().filter(function (e) {
      if (e.category !== cat) return false;
      if (e.id === 'dinos') return false; // l'encyclo n'est jamais un tirage
      if (opts.tag && e.tag !== opts.tag) return false;
      if (opts.noTag && e.tag) return false;
      return true;
    });
  }

  function byBusMot() {
    return pool().filter(function (e) {
      if (e.id === 'dinos') return false;
      var t = (e.titre || '').toLowerCase(), d = (e.desc || '').toLowerCase();
      return t.indexOf('bus') !== -1 || d.indexOf('bus') !== -1;
    });
  }

  // Table de départ (brief HO-MJ-13, étiquettes raccourcies en revue : un mot
  // qu'un lecteur phonétique de 4 ans déchiffre) : le tirage aléatoire retire
  // du pool au fur et à mesure (`used`) pour qu'un jeu n'apparaisse jamais 2
  // fois. Dinos/Monde/Œufs/Album vivent en fixe dans la VITRINE (HO-MJ-14),
  // les casiers + l'étagère basse ne contiennent que le tirage aléatoire.
  function buildSlots() {
    var used = {};
    function pick(list) {
      var avail = list.filter(function (e) { return !used[e.id]; });
      if (!avail.length) return null;
      var e = avail[Math.floor(Math.random() * avail.length)];
      used[e.id] = 1;
      return e;
    }
    function fromPick(list) {
      return function () { var e = pick(list); return e ? { url: e.url } : null; };
    }
    return [
      { obj: 'obj-bus', label: 'Bus', pick: fromPick(byBusMot()) },
      { obj: 'obj-lettres', label: 'Lettres', pick: fromPick(byCategory('compter', { tag: 'tts' })) },
      { obj: 'obj-chiffres', label: 'Chiffres', pick: fromPick(byCategory('compter', { noTag: true })) },
      { obj: 'obj-drapeaux', label: 'Drapeaux', pick: fromPick(byCategory('monde')) },
      { obj: 'obj-volcan', label: 'Volcan', pick: fromPick(byCategory('dinos')) },
      { obj: 'obj-meteorite', label: 'Surprise', pick: fromPick(pool().filter(function (e) { return e.id !== 'dinos'; })) },
      { obj: 'obj-peluche-tri', label: 'Tritri', pick: fromPick(byCategory('casse')) },
      { obj: 'obj-peluche-stego', label: 'Copain', pick: fromPick(byCategory('couleurs')) },
      { obj: 'obj-reveil', label: 'Vite !', pick: fromPick(byCategory('casse')) },
      { obj: 'obj-radio', label: 'Radio', url: 'lecture.html' },
      { obj: 'obj-puzzle', label: 'Puzzle', url: 'mj-40.html' },
      { obj: 'obj-livre-ouvert', label: 'Lis', url: 'mj-53.html' }
    ].map(function (slot) {
      // résolution immédiate (une seule fois par chargement de page, ordre fixe)
      if (slot.url) return slot;
      var picked = slot.pick();
      return picked ? { obj: slot.obj, label: slot.label, url: picked.url } : null;
    }).filter(Boolean);
  }

  function isEncycloUnlocked() {
    try { return !!(global.Unlock && Unlock.isUnlocked('dinos')); } catch (e) { return false; }
  }

  // Prénom gravé dans l'arche (brief § 3) — même source que le filet de
  // sécurité inline en fin de index.html, relu à CHAQUE render (le DOM du
  // fronton est recréé au resize, un patch one-shot ne suffit pas).
  function readNickname() {
    try {
      var raw = localStorage.getItem('maxplay_active_child');
      var child = raw && JSON.parse(raw);
      if (child && child.nickname) return child.nickname;
    } catch (e) {}
    return 'Champion';
  }

  // ── Modèle géométrique = compose() de armoire-compose.py (spec HO-MJ-15) ──
  var DOOR_W = 139, PANEL_W = 22, MAX_SOFT = 1.45, MARGIN_X = 0.02;
  var NAT_W = 2 * DOOR_W + 2 * PANEL_W + 630; // 952 u
  var FIXED_1ROW = 165 + 26 + 32 + 30 + 188 + 75; // 516 u (fronton, planche-vitrine, traverse-haut, traverse-bas, tiroirs, pieds)
  var SOFT_BASE = 227 + 235 + 187; // vitrine-haut + vitrine-bas + bas-étagère
  var CUBBY_ROW_SOFT = 195, CUBBY_ROW_FIXED = 25; // une rangée de casiers + sa planche (sauf la 1ère)

  function cubbyCols(w) { return w >= 1200 ? 5 : w >= 600 ? 4 : 3; }

  var MARGIN_Y = 0.06; // maquette() : ah = H*0.94 avant compose() (marge tapis/centrage)

  // Calcule u (px/unité), le nombre de rangées de casiers, le ratio d'étirement
  // souple et les colonnes de casiers — reproduit EXACTEMENT compose().
  // `ayFull` (marge verticale, brief maquette()) : centré seulement si
  // l'espace restant est petit (<12% de H), sinon 3% depuis le haut — jamais
  // toujours centré (sinon le mur visible en bas grandit au lieu du haut).
  function computeGeometry(W, Hfull) {
    var marginX = W * MARGIN_X;
    var aw = W - 2 * marginX;
    var H = Hfull * (1 - MARGIN_Y);
    var cubbyRows = 1;
    var u, fixedU, softU, ratio, usedH;
    for (;;) {
      fixedU = FIXED_1ROW + (cubbyRows - 1) * CUBBY_ROW_FIXED;
      softU = SOFT_BASE + cubbyRows * CUBBY_ROW_SOFT;
      u = Math.min(aw / NAT_W, H / (fixedU + 0.85 * softU));
      ratio = Math.min(MAX_SOFT, (H - fixedU * u) / (softU * u));
      usedH = fixedU * u + softU * u * ratio;
      // écran haut : une rangée de casiers en plus plutôt qu'une armoire étirée
      if (cubbyRows < 3 && (H - usedH) >= (CUBBY_ROW_SOFT + CUBBY_ROW_FIXED) * u) { cubbyRows++; continue; }
      var remaining = Hfull - usedH;
      var ay = remaining < Hfull * 0.12 ? remaining / 2 : Hfull * 0.03;
      return { u: u, ratio: ratio, cubbyRows: cubbyRows, cubbyCols: cubbyCols(W), aw: aw, ay: ay };
    }
  }

  function px(u, units) { return (u * units) + 'px'; }
  function softPx(geo, units) { return (geo.u * units * geo.ratio) + 'px'; }

  // ── Construction du DOM de la carcasse (une fois par render/resize) ──
  function buildCarcasse(root, geo) {
    root.innerHTML = '';
    root.style.setProperty('--u', geo.u + 'px');
    root.style.marginTop = geo.ay + 'px';

    // colonnes 2 et 4 : panneaux latéraux continus (grid-row 1/-1)
    var panG = document.createElement('div'); panG.className = 'ar-panneau ar-panneau-g';
    var panD = document.createElement('div'); panD.className = 'ar-panneau ar-panneau-d';
    root.appendChild(panG); root.appendChild(panD);

    // Nombre total de lignes générées ci-dessous (fronton, vitH, planche1,
    // vitB, travHaut, N rangées de casiers + leurs planches-casiers
    // intercalaires, travBas, bas, tiroirs, pieds) — grid-row:-1 ne marche
    // PAS de façon fiable avec des lignes auto-générées (aucun
    // grid-template-rows explicite) : on fixe le numéro de ligne exact du
    // fronton (1) et des pieds (dernière) en JS plutôt qu'en négatif CSS.
    var totalRows = 5 + (geo.cubbyRows + (geo.cubbyRows - 1)) + 4;
    // panneaux : de la vitrine haute (2) aux tiroirs (totalRows-1), jamais sur
    // le fronton ni les pieds (revue 2026-09-17 : poteaux au-dessus de l'arche)
    panG.style.gridRow = panD.style.gridRow = '2 / ' + totalRows;

    // fronton (grid-column 1/6, ligne 1) : corps + épaules qui débordent +
    // prénom seul (brief HO-MJ-15 § 3 : le ⭐ total a migré dans le mini-menu
    // avatar).
    var fronton = document.createElement('header'); fronton.className = 'ar-fronton';
    fronton.style.gridRow = '1';
    fronton.style.height = px(geo.u, 165);
    fronton.innerHTML =
      '<span class="ar-fronton-corps" aria-hidden="true"></span>' +
      '<span class="ar-fronton-epaule ar-fronton-epaule-g" aria-hidden="true"></span>' +
      '<span class="ar-fronton-epaule ar-fronton-epaule-d" aria-hidden="true"></span>' +
      '<div class="pseudo" id="profil-pseudo">' + esc(readNickname()) + '</div>';
    root.appendChild(fronton);

    // vitrine haute (souple 227u) : 2 places (Dinos, Monde)
    var vitH = document.createElement('div'); vitH.className = 'ar-row ar-vitrine';
    vitH.style.height = softPx(geo, 227);
    vitH.innerHTML =
      '<button type="button" class="objet" id="vit-dinos" aria-label="Dinos">' +
        '<img class="obj" src="img/armoire/obj-livres-dinos.webp" alt="">' +
        '<span class="porte" aria-hidden="true"></span>' +
        '<span class="etiquette">Dinos</span></button>' +
      '<button type="button" class="objet" id="vit-monde" aria-label="Monde">' +
        '<img class="obj" src="img/armoire/obj-globe.webp" alt="">' +
        '<span class="etiquette">Monde</span></button>';
    root.appendChild(vitH);

    // planche fixe (26u)
    var planche1 = document.createElement('div'); planche1.className = 'ar-row ar-planche';
    planche1.style.height = px(geo.u, 26);
    root.appendChild(planche1);

    // vitrine basse (souple 235u) : 2 places (Œufs, Album)
    var vitB = document.createElement('div'); vitB.className = 'ar-row ar-vitrine ar-vitrine-bas';
    vitB.style.height = softPx(geo, 235);
    vitB.innerHTML =
      '<button type="button" class="objet" id="hdr-oeufs" aria-label="Mes œufs">' +
        '<img class="obj" src="img/armoire/obj-oeuf.webp" alt="">' +
        '<span class="hdr-badge" id="hdr-oeufs-n" style="display:none"></span>' +
        '<span class="etiquette">Œufs</span></button>' +
      '<button type="button" class="objet" id="hdr-padidi" aria-label="Album Padidi">' +
        '<img class="obj" src="img/armoire/obj-carnet.webp" alt="">' +
        '<span class="etiquette">Album</span></button>';
    root.appendChild(vitB);

    // traverse haute fixe (32u)
    var travHaut = document.createElement('div'); travHaut.className = 'ar-row ar-traverse-haut';
    travHaut.style.height = px(geo.u, 32);
    root.appendChild(travHaut);

    // N rangées de casiers (souples 195u chacune), séparées par une
    // planche-casiers fixe (25u) entre 2 rangées consécutives. Zone tap :
    // la case brute (corps 630u réparti en cubbyCols cases + séparateurs
    // 36u) peut descendre sous 80px sur petit écran à 3-4 colonnes (u limité
    // par la hauteur) — --casier-bleed (posé ici, en u) étend le bouton
    // .casier par-dessus le séparateur adjacent d'assez pour garantir 80px
    // (règle absolue STANDARD-MJ), calculé pour REMPLIR tout le séparateur
    // (36u) si besoin plutôt qu'un forfait fixe.
    // Un casier de BORD n'a qu'UN SEUL séparateur voisin (un seul côté de
    // bleed possible) tandis qu'un casier du MILIEU en a deux : le bleed
    // doit donc suffire à lui seul à combler le déficit d'un casier de
    // bord. Plafond à 45% de la largeur de case voisine (jamais au-delà de
    // son centre, pour ne pas capter la totalité du clic d'un voisin) —
    // au-delà du séparateur lui-même si besoin (rendu inchangé : la zone
    // qui déborde reste transparente, seul un clic pile sur la limite
    // devient ambigu entre les deux jeux adjacents, jamais un vrai bug).
    // Cible 96px (pas 80) : index.spec.mjs teste ≥96×96 à 480×900 ("au-delà
    // des 80px règle mobile"), armoire.spec.mjs teste ≥80×80 partout — viser
    // le seuil le plus strict connu rend le calcul robuste aux deux (un
    // bleed calant juste sur 80px donnait 0 dès que la case brute dépassait
    // 80 mais restait sous 96, régression constatée à 480px de large).
    var TARGET_TAP = 96;
    var corpsW = 630 * geo.u;
    var sepW = 36 * geo.u;
    var caseWpx = (corpsW - (geo.cubbyCols - 1) * sepW) / geo.cubbyCols;
    var bleedPx = Math.max(0, Math.min(caseWpx * 0.5, (TARGET_TAP - caseWpx) + 3));
    var bleedU = bleedPx / geo.u;

    var casierRows = [];
    for (var r = 0; r < geo.cubbyRows; r++) {
      if (r > 0) {
        var planCas = document.createElement('div'); planCas.className = 'ar-row ar-planche-casiers';
        planCas.style.height = px(geo.u, 25);
        root.appendChild(planCas);
      }
      var row = document.createElement('div'); row.className = 'ar-row ar-casiers-row';
      row.style.height = softPx(geo, 195);
      row.style.setProperty('--casier-bleed', bleedU);
      for (var c = 0; c < geo.cubbyCols; c++) {
        if (c > 0) { var sep = document.createElement('span'); sep.className = 'ar-separateur'; sep.setAttribute('aria-hidden', 'true'); row.appendChild(sep); }
        var cell = document.createElement('div'); cell.className = 'ar-casier-bg';
        row.appendChild(cell);
      }
      root.appendChild(row);
      casierRows.push(row);
    }

    // traverse basse fixe (30u)
    var travBas = document.createElement('div'); travBas.className = 'ar-row ar-traverse-bas';
    travBas.style.height = px(geo.u, 30);
    root.appendChild(travBas);

    // étagère basse (souple 187u) : 3 places, sans séparateur visuel entre
    // elles — un bouton peut donc déborder librement sur son voisin pour
    // garantir ≥80px de zone tap (bleed calculé comme pour les casiers,
    // mais sans largeur de séparateur à respecter : plafonné à la moitié de
    // la case pour ne jamais dépasser le centre du voisin).
    var bas = document.createElement('div'); bas.className = 'ar-row ar-bas-etagere';
    bas.style.height = softPx(geo, 187);
    var basCaseWpx = corpsW / 3;
    var basBleedPx = Math.max(0, Math.min(basCaseWpx / 2, (TARGET_TAP - basCaseWpx) + 2));
    bas.style.setProperty('--bas-bleed', basBleedPx / geo.u);
    root.appendChild(bas);

    // bloc tiroirs à fleur des panneaux (fixe 188u)
    var tiroirs = document.createElement('div'); tiroirs.className = 'ar-tiroirs';
    tiroirs.style.height = px(geo.u, 188);
    root.appendChild(tiroirs);

    // pieds (grid-column 1/6, dernière ligne, fixe 75u) : corps + colonnes
    // qui débordent (comme le fronton).
    var pieds = document.createElement('div'); pieds.className = 'ar-pieds';
    pieds.style.gridRow = String(totalRows);
    pieds.style.height = px(geo.u, 75);
    pieds.innerHTML =
      '<span class="ar-pieds-corps" aria-hidden="true"></span>' +
      '<span class="ar-pieds-col ar-pieds-col-g" aria-hidden="true"></span>' +
      '<span class="ar-pieds-col ar-pieds-col-d" aria-hidden="true"></span>';
    root.appendChild(pieds);

    // portes ouvertes, calque au-dessus, positionnées en absolu par-dessus
    // la grille (positionDoors, après layout réel du DOM ci-dessus).
    ['ar-porte-haut ar-porte-l', 'ar-porte-haut ar-porte-r', 'ar-porte-bas ar-porte-l', 'ar-porte-bas ar-porte-r'].forEach(function (cls) {
      var img = document.createElement('img');
      img.className = 'ar-porte ' + cls;
      img.alt = '';
      img.src = 'img/armoire/carcasse/' + (cls.indexOf('ar-porte-haut') !== -1 ? 'porte-haut.webp' : 'porte-bas.webp');
      root.appendChild(img);
    });

    return { vitH: vitH, vitB: vitB, casierRows: casierRows, bas: bas };
  }

  // Les portes sont positionnées en absolu par-dessus la grille : porte-haut
  // va du haut du fronton au bas de traverse-haut (couvre fronton + vitrine
  // haute + planche + vitrine basse + traverse-haut, comme le calque `doors`
  // de compose() qui s'étend sur toutes les bandes non-cubby) ; porte-bas va
  // du haut de bas-étagère au bas des pieds.
  function positionDoors(root) {
    var fronton = root.querySelector('.ar-fronton');
    var traverseHaut = root.querySelector('.ar-traverse-haut');
    var basEtagere = root.querySelector('.ar-bas-etagere');
    var pieds = root.querySelector('.ar-pieds');
    if (!fronton || !traverseHaut || !basEtagere || !pieds) return;
    var rootR = root.getBoundingClientRect();
    // revue 2026-09-17 : la porte haute commence à 110/165 du fronton (crop
    // porte-haut.webp = y 110→668), la basse s'arrête à 22/75 des pieds
    // (crop 938→1332), exactement comme les tuiles ont été découpées.
    var fr = fronton.getBoundingClientRect();
    var topHaut = fr.top - rootR.top + fr.height * (110 / 165);
    var bottomHaut = traverseHaut.getBoundingClientRect().bottom - rootR.top;
    var topBas = basEtagere.getBoundingClientRect().top - rootR.top;
    var pr = pieds.getBoundingClientRect();
    var bottomBas = pr.top - rootR.top + pr.height * (22 / 75);
    root.querySelectorAll('.ar-porte-haut').forEach(function (el) {
      el.style.top = topHaut + 'px'; el.style.height = (bottomHaut - topHaut) + 'px';
    });
    root.querySelectorAll('.ar-porte-bas').forEach(function (el) {
      el.style.top = topBas + 'px'; el.style.height = (bottomBas - topBas) + 'px';
    });
  }

  // ── Calque objets : pose les boutons dans les cases de la carcasse ──
  function cellHtml(slot, i) {
    return '<button type="button" class="casier" data-idx="' + i + '" aria-label="' + esc(slot.label) + '">' +
      '<img class="obj" src="img/armoire/' + slot.obj + '.webp" alt="">' +
      '<span class="etiquette">' + esc(slot.label) + '</span>' +
      '</button>';
  }

  function go(slot) {
    if (slot.url) location.href = slot.url;
  }

  var _resolved = null;
  var _wired = false;

  function wireVitrine() {
    var dinos = $('vit-dinos');
    if (dinos) {
      dinos.classList.toggle('locked', !isEncycloUnlocked());
      dinos.addEventListener('click', function () { if (global.MUR && MUR.openEncyclo) MUR.openEncyclo(); });
    }
    var monde = $('vit-monde');
    if (monde) monde.addEventListener('click', function () { if (global.MUR && MUR.openEncyclo) MUR.openEncyclo(); });
    var oeufs = $('hdr-oeufs');
    if (oeufs) oeufs.addEventListener('click', function () { if (global.NidUI && NidUI.openChambre) NidUI.openChambre(); });
    var padidi = $('hdr-padidi');
    if (padidi) padidi.addEventListener('click', function () { if (global.NidUI && NidUI.openPadidi) NidUI.openPadidi(); });
    paintOeufsBadge();
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

  // Pose les jeux tirés dans les casiers + l'étagère basse (3 places),
  // tronqués au nombre de places disponibles (brief § 3).
  function paintObjets(refs, geo) {
    if (!_resolved) _resolved = buildSlots();
    var nCubby = geo.cubbyRows * geo.cubbyCols;
    var cubbySlots = _resolved.slice(0, nCubby);
    var basSlots = _resolved.slice(nCubby, nCubby + 3);

    var idx = 0;
    refs.casierRows.forEach(function (row) {
      var cells = row.querySelectorAll('.ar-casier-bg');
      cells.forEach(function (cell) {
        var slot = cubbySlots[idx];
        cell.innerHTML = slot ? cellHtml(slot, idx) : '';
        idx++;
      });
    });

    refs.bas.innerHTML = basSlots.map(function (slot, i) { return cellHtml(slot, nCubby + i); }).join('');

    if (!_wired) {
      _wired = true;
      document.getElementById('armoire').addEventListener('click', function (ev) {
        var btn = ev.target.closest('.casier');
        if (!btn) return;
        var slot = _resolved[+btn.dataset.idx];
        if (slot) go(slot);
      });
    }
  }

  // #profil-avatar est un FRÈRE de #armoire (jamais un enfant : root.innerHTML
  // = '' dans buildCarcasse() le détruirait à chaque resize — incident
  // corrigé, cf. index.spec.mjs). Positionné en absolu par rapport à .piece,
  // ancré sur le coin haut-gauche réel de l'armoire (3% de sa largeur, mordu
  // ~70% par le haut du fronton via le transform CSS translateY(-70%)).
  function positionAvatar(root) {
    var avatar = $('profil-avatar');
    if (!avatar) return;
    var piece = root.closest('.piece') || root.parentElement;
    var armR = root.getBoundingClientRect();
    var pieceR = piece.getBoundingClientRect();
    // mordu à ~15 % : le bas du disque passe 15 % sous le haut de l'épaule
    // gauche de l'arche (opaque à partir de 100/165 du fronton). Jamais
    // au-dessus de l'écran (revue 1280×720 : le disque sortait par le haut).
    var fronton = root.querySelector('.ar-fronton');
    var frH = fronton ? fronton.getBoundingClientRect().height : 0;
    var size = avatar.offsetWidth || 56;
    var shoulderTop = armR.top - pieceR.top + frH * (100 / 165);
    avatar.style.left = (armR.left - pieceR.left + armR.width * 0.04) + 'px';
    avatar.style.top = Math.max(2, shoulderTop + size * 0.15 - size) + 'px';
  }

  function render() {
    var root = $('armoire');
    if (!root) return;
    var piece = root.closest('.piece') || root.parentElement;
    var W = piece ? piece.clientWidth : global.innerWidth;
    var H = piece ? piece.clientHeight : global.innerHeight;
    var geo = computeGeometry(W, H);
    var refs = buildCarcasse(root, geo);
    wireVitrine();
    paintObjets(refs, geo);
    // repositionne les portes + l'avatar après layout réel (dimensions
    // dépendent du DOM posé, donc pas fiables avant peinture du navigateur).
    positionDoors(root);
    positionAvatar(root);
    requestAnimationFrame(function () { positionDoors(root); positionAvatar(root); });
  }

  var _resizeT = null;
  function onResize() {
    clearTimeout(_resizeT);
    _resizeT = setTimeout(render, 120);
  }

  function init() {
    render();
    global.addEventListener('resize', onResize);
    global.addEventListener('orientationchange', onResize);
    // badge œufs : moteur Collection chargé paresseusement par le Mur,
    // on retente une fois de plus tôt puis à chaque pageshow (v2, inchangé).
    setTimeout(paintOeufsBadge, 1500);
    global.addEventListener('pageshow', paintOeufsBadge);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  global.Armoire = { render: render, refresh: render };
  // Compat nid-ui.js (contrat inchangé, brief HO-MJ-13 § Mapping) : la scène
  // n'existe plus, mais l'armoire réagit aux mêmes signaux (déblocage encyclo,
  // gain vu → recalcul du verrou de porte).
  global.MurScene = { markGainSeen: function () { render(); }, refresh: render };
})(window);
