// ─────────────────────────────────────────────────────────────────────────
//  armoire.js — Accueil enfant « L'Armoire » v6 (HO-MJ-19).
//
//  Ce fichier ne calcule AUCUNE dimension. L'armoire vit dans un repère de
//  design fixe de 911 × 1480 (le cadrage de ref-ouverte.png) et c'est le CSS
//  qui met la scène entière à l'échelle, d'un bloc, via --cab-w. Le JS ne
//  fait que trois choses : poser le décor une fois, y ranger les jeux, et
//  ouvrir ou fermer les portes.
//
//  Il n'y a donc plus de handler de resize, plus de --u, plus de hauteur de
//  planche recalculée par écran : c'est exactement ce qui tordait les v3/v4.
//
//  API : window.Armoire = { render, refresh }
//  Compat : window.MurScene = { markGainSeen, refresh } — contrat inchangé
//  depuis HO-MJ-13, nid-ui.js appelle encore ces deux-là.
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  var IMG = 'img/armoire/';
  var KIT = IMG + 'v6/';

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ── Repère de design ────────────────────────────────────────────────
  // Tout est en % du cadre 911 × 1480, mesuré sur la carcasse elle-même
  // (studio/minijeux/tools/armoire-sprites.py écrit les mêmes chiffres dans
  // site/img/armoire/v6/repere.json — c'est la source, ne pas diverger).
  var COLS = [28.58, 49.75, 70.92];   // centres des 3 colonnes
  var COL_W = 21.17;                  // largeur d'une colonne

  // Les 5 niveaux du meuble, du haut vers le bas. `zone` dit derrière quelle
  // porte le niveau se trouve — la niche centrale n'en a pas, elle est
  // toujours ouverte.
  var ROWS = [
    { zone: 'haut',  cy: 16.4, ch: 13.6 },
    { zone: 'haut',  cy: 30.7, ch: 12.6 },
    { zone: 'niche', cy: 44.6, ch: 9.8 },
    { zone: 'bas',   cy: 60.1, ch: 10.3 },
    { zone: 'bas',   cy: 72.8, ch: 13.0 }
  ];
  var TIROIRS = [
    { zone: 'bas', cx: 33.6, cy: 86.7, cw: 29.0, ch: 11.0 },
    { zone: 'bas', cx: 65.8, cy: 86.7, cw: 29.0, ch: 11.0 }
  ];
  var PORTES = [
    { zone: 'haut', dy: 9.184,  dh: 28.124 },
    { zone: 'bas',  dy: 54.694, dh: 38.352 }
  ];
  var PORTE_X_G = 18.558, PORTE_W = 31.277, PORTE_X_D = 49.835;
  var SPOTS = [{ x: 31.0, y: 10.5 }, { x: 63.5, y: 10.5 }];

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

  // 13 jeux tirés : 12 derrière les deux paires de portes (2 niveaux × 3
  // colonnes en haut, autant en bas), le 13e dans le tiroir de droite.
  // Étiquettes d'un mot, déchiffrables par un lecteur phonétique de 4 ans.
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
      { obj: 'obj-livre-ouvert', label: 'Lis', url: 'mj-53.html' },
      { obj: 'obj-livres-jeux', label: 'Encore', pick: fromPick(pool().filter(function (e) { return e.id !== 'dinos'; })) }
    ].map(function (slot) {
      if (slot.url) return slot;
      var picked = slot.pick();
      return picked ? { obj: slot.obj, label: slot.label, url: picked.url } : null;
    }).filter(Boolean);
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

  function slotHtml(slot, i) {
    return '<img class="obj" src="' + IMG + slot.obj + '.webp" alt="">' +
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

  function buildDecor(root, slots) {
    // 1. la carcasse
    var shell = document.createElement('img');
    shell.className = 'cab-shell';
    shell.src = KIT + 'shell.webp';
    shell.alt = '';
    root.appendChild(shell);

    // 2. le halo des deux spots (dégradé CSS, pas d'image)
    SPOTS.forEach(function (s) {
      var sp = document.createElement('span');
      sp.className = 'spot';
      sp.setAttribute('aria-hidden', 'true');
      sp.style.left = s.x + '%';
      sp.style.top = s.y + '%';
      root.appendChild(sp);
    });

    // 3. les cases. Niche (toujours visible) : Dinos · Monde · Œufs. Les
    //    deux niveaux du haut et les deux du bas : les 12 premiers tirages.
    var fixes = [
      { id: 'vit-dinos', obj: 'obj-livres-dinos', label: 'Dinos' },
      { id: 'vit-monde', obj: 'obj-globe', label: 'Monde' },
      { id: 'hdr-oeufs', obj: 'obj-oeuf', label: 'Œufs', badge: 'hdr-oeufs-n' }
    ];
    var iTirage = 0;
    ROWS.forEach(function (row) {
      COLS.forEach(function (cx, col) {
        var btn, slot;
        if (row.zone === 'niche') {
          var f = fixes[col];
          btn = makeSlot('objet', f.id, f.label);
          btn.innerHTML = '<img class="obj" src="' + IMG + f.obj + '.webp" alt="">' +
            (f.badge ? '<span class="hdr-badge" id="' + f.badge + '" style="display:none"></span>' : '') +
            '<span class="etiquette">' + esc(f.label) + '</span>';
        } else {
          slot = slots[iTirage];
          if (!slot) return;
          btn = makeSlot('casier', null, slot.label);
          btn.dataset.idx = iTirage;
          btn.innerHTML = slotHtml(slot, iTirage);
          iTirage++;
        }
        btn.dataset.zone = row.zone;
        place(btn, cx, row.cy, COL_W, row.ch);
        root.appendChild(btn);
      });
    });

    // 4. les deux tiroirs : l'album à gauche, un 13e jeu à droite
    var album = makeSlot('objet', 'hdr-padidi', 'Album');
    album.innerHTML = '<img class="obj" src="' + IMG + 'obj-carnet.webp" alt="">' +
      '<span class="etiquette">Album</span>';
    album.dataset.zone = TIROIRS[0].zone;
    place(album, TIROIRS[0].cx, TIROIRS[0].cy, TIROIRS[0].cw, TIROIRS[0].ch);
    root.appendChild(album);

    var dernier = slots[iTirage];
    if (dernier) {
      var b = makeSlot('casier', null, dernier.label);
      b.dataset.idx = iTirage;
      b.dataset.zone = TIROIRS[1].zone;
      b.innerHTML = slotHtml(dernier, iTirage);
      place(b, TIROIRS[1].cx, TIROIRS[1].cy, TIROIRS[1].cw, TIROIRS[1].ch);
      root.appendChild(b);
    }

    // 5. les quatre vantaux. Le sprite de droite est celui de gauche en
    //    miroir : c'est le WRAPPER qui tourne, jamais le sprite miroité.
    PORTES.forEach(function (p) {
      [['porte-g', PORTE_X_G, 'Ouvrir'], ['porte-d', PORTE_X_D, 'Ouvrir']].forEach(function (side) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'porte porte-' + p.zone + ' ' + side[0];
        btn.dataset.zone = p.zone;
        btn.style.setProperty('--dx', side[1] + '%');
        btn.style.setProperty('--dy', p.dy + '%');
        btn.style.setProperty('--dw', PORTE_W + '%');
        btn.style.setProperty('--dh', p.dh + '%');
        btn.innerHTML = '<span class="porte-feuille" aria-hidden="true"></span>';
        root.appendChild(btn);
      });
    });

    // 6. le prénom, gravé sur l'arche
    var nom = document.createElement('div');
    nom.className = 'player-name';
    nom.id = 'profil-pseudo';
    nom.textContent = readNickname();
    root.appendChild(nom);
  }

  // ── Ouverture / fermeture d'une zone ────────────────────────────────
  // Les cases d'une zone fermée sont réellement masquées (visibility), donc
  // ni cliquables ni annoncées : la porte est devant, on ne triche pas.
  var _closeT = {};

  function setZone(root, zone, open) {
    var cls = 'ouvert-' + zone;
    root.classList.toggle(cls, open);
    root.querySelectorAll('.porte[data-zone="' + zone + '"]').forEach(function (p) {
      p.setAttribute('aria-expanded', open ? 'true' : 'false');
      p.setAttribute('aria-label', (open ? 'Fermer' : 'Ouvrir') +
        (zone === 'haut' ? ' le haut de l\'armoire' : ' le bas de l\'armoire'));
    });
    var cases = root.querySelectorAll('.casier[data-zone="' + zone + '"], .objet[data-zone="' + zone + '"]');
    clearTimeout(_closeT[zone]);
    if (open) {
      cases.forEach(function (c) { c.classList.remove('zone-cachee'); });
    } else {
      // on ne masque qu'une fois le vantail revenu devant
      _closeT[zone] = setTimeout(function () {
        cases.forEach(function (c) { c.classList.add('zone-cachee'); });
      }, 620);
    }
  }

  function wireDoors(root) {
    root.addEventListener('click', function (ev) {
      var porte = ev.target.closest('.porte');
      if (!porte) return;
      var zone = porte.dataset.zone;
      setZone(root, zone, !root.classList.contains('ouvert-' + zone));
    });
  }

  // ── Câblage des cases ───────────────────────────────────────────────
  function wireFixes(root) {
    var dinos = $('vit-dinos');
    if (dinos) dinos.addEventListener('click', function () { if (global.MUR && MUR.openEncyclo) MUR.openEncyclo(); });
    var monde = $('vit-monde');
    if (monde) monde.addEventListener('click', function () { if (global.MUR && MUR.openEncyclo) MUR.openEncyclo(); });
    var oeufs = $('hdr-oeufs');
    if (oeufs) oeufs.addEventListener('click', function () { if (global.NidUI && NidUI.openChambre) NidUI.openChambre(); });
    var padidi = $('hdr-padidi');
    if (padidi) padidi.addEventListener('click', function () { if (global.NidUI && NidUI.openPadidi) NidUI.openPadidi(); });
  }

  var _slots = null;

  function wireCasiers(root) {
    root.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.casier');
      if (!btn) return;
      var slot = _slots[+btn.dataset.idx];
      if (slot && slot.url) location.href = slot.url;
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
      wireCasiers(root);

      // Portes fermées au chargement, puis elles s'ouvrent toutes seules :
      // l'armoire accueille l'enfant une fois par visite, sans lui demander
      // deux gestes à chaque retour. Mouvement réduit : ouvert d'emblée.
      var sobre = global.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      setZone(root, 'haut', false);
      setZone(root, 'bas', false);
      if (sobre) {
        setZone(root, 'haut', true);
        setZone(root, 'bas', true);
      } else {
        setTimeout(function () { setZone(root, 'haut', true); }, 420);
        setTimeout(function () { setZone(root, 'bas', true); }, 640);
      }
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
