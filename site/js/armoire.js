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

  // ── Grille des cases : 3 colonnes (mise en page du plateau de jeu — sans
  // rapport avec les montants du meuble, qui ne courent pas sur toute la
  // hauteur) × 5 rangées calées sur les 5 planches du kit. ────────────────
  var COLS = [28.58, 49.75, 70.92];   // centres des 3 colonnes
  var COL_W = 21.17;                  // largeur d'une colonne
  var ROWS_ZONE = ['haut', 'haut', 'niche', 'bas', 'bas'];
  var ROWS_H = [13.6, 12.6, 9.8, 10.3, 13.0]; // hauteur de case par rangée (tunée à la main)

  // Le BAS de chaque case tombe sur le DESSUS de sa planche — planche-N.box.y
  // du kit, JAMAIS un y recopié à la main : sinon case et étagère divergent
  // au moindre ajustement du kit (L-138).
  function buildRows(kit) {
    var P = kit.pieces;
    return ROWS_ZONE.map(function (zone, i) {
      var planche = P['planche-' + (i + 1)];
      var ch = ROWS_H[i];
      return { zone: zone, cy: planche.box.y - ch / 2, ch: ch };
    });
  }

  var SPOTS = [{ x: 31.0, y: 10.5 }, { x: 63.5, y: 10.5 }];

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

  // EXACTEMENT 12 jeux : 2 niveaux × 3 colonnes derrière les portes hautes,
  // autant derrière les basses. Pas un de plus — au-delà, l'armoire vire au
  // launcher d'icônes et cesse d'être un meuble. Dinos, Monde et Œufs ne sont
  // pas des jeux tirés : ce sont les trois fonctions permanentes du meuble,
  // posées dans la niche centrale toujours ouverte.
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
      { obj: 'obj-livre-ouvert', label: 'Lis', url: 'mj-53.html' }
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

  // ── Décor : le MEUBLE vient du kit (ArmoireMeuble), les CASES de jeu
  // sont posées par-dessus, calées sur ses planches. ─────────────────────
  function buildDecor(root, slots) {
    var kit = global.ARMOIRE_KIT;
    if (!global.ArmoireMeuble || !kit) {
      throw new Error('armoire.js : ArmoireMeuble / ARMOIRE_KIT non chargés (vérifier l\'ordre des <script> dans index.html)');
    }
    var ROWS = buildRows(kit);

    // 1. le meuble : carcasse, planches, montants, 2 tiroirs, 4 vantaux —
    //    posés fermés (ArmoireMeuble.build ferme les deux zones lui-même).
    global.ArmoireMeuble.build(root);

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
          btn.innerHTML = '<span class="tap" aria-hidden="true"></span>' +
            objHtml(f.obj) +
            (f.badge ? '<span class="hdr-badge" id="' + f.badge + '" style="display:none"></span>' : '') +
            '<span class="etiquette">' + esc(f.label) + '</span>';
        } else {
          slot = slots[iTirage];
          if (!slot) return;
          btn = makeSlot('casier', null, slot.label);
          btn.dataset.idx = iTirage;
          btn.innerHTML = slotHtml(slot);
          iTirage++;
        }
        btn.dataset.zone = row.zone;
        place(btn, cx, row.cy, COL_W, row.ch);
        root.appendChild(btn);
      });
    });

    // 4. les deux tiroirs du kit sont RÉUTILISÉS (poignée + façade déjà
    //    posées par ArmoireMeuble.build) : on leur donne un id et un
    //    comportement, jamais une icône flottante en plus.
    var tiroirG = root.querySelector('.am-tiroir.tiroir-g');
    var tiroirD = root.querySelector('.am-tiroir.tiroir-d');
    if (tiroirG) { tiroirG.id = 'hdr-padidi'; tiroirG.setAttribute('aria-label', 'Mon album de photos'); }
    if (tiroirD) { tiroirD.id = 'tiroir-encore'; tiroirD.setAttribute('aria-label', 'Encore d\'autres jeux'); }

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
      '.casier[data-zone="' + zone + '"], .objet[data-zone="' + zone + '"]');
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

  // Les 2 tiroirs du kit : leur poignée gère déjà l'effet visuel « tiré »
  // (listener délégué posé par ArmoireMeuble PENDANT build(), donc plus tôt
  // que celui-ci). Ce listener-ci s'exécute ensuite et ajoute juste la
  // navigation par-dessus l'animation.
  function wireTiroirs(root) {
    root.addEventListener('click', function (ev) {
      var t = ev.target.closest('.am-tiroir');
      if (!t) return;
      if (t.id === 'hdr-padidi') { if (global.NidUI && NidUI.openPadidi) NidUI.openPadidi(); }
      else if (t.id === 'tiroir-encore') { retirerLesJeux(root); }
    });
  }

  // Tiroir de droite : « encore ». On retire au sort douze nouveaux jeux et
  // on les repose dans les cases, sans quitter l'armoire. C'est le geste
  // naturel du tiroir — on l'ouvre, il y a autre chose dedans.
  function retirerLesJeux(root) {
    _slots = buildSlots();
    var i = 0;
    root.querySelectorAll('.casier').forEach(function (btn) {
      var slot = _slots[i];
      if (!slot) return;
      btn.dataset.idx = i;
      btn.setAttribute('aria-label', slot.label);
      btn.innerHTML = slotHtml(slot);
      i++;
    });
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
