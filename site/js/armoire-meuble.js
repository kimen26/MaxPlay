// ─────────────────────────────────────────────────────────────────────────
//  armoire-meuble.js — le MEUBLE de l'accueil « L'Armoire », v8 (HO-MJ-20).
//
//  Un kit de pièces, toutes découpées dans UNE seule image (la référence
//  validée docs/refs/armoire/ref-ouverte.png, par tools/armoire-v8.py) :
//  carcasse inpaintée, 5 planches, 2 montants, 1 tiroir (posé deux fois),
//  2 vantaux ouverts (droite = miroir), 2 vantaux fermés (droite = miroir).
//
//  Ce fichier ne calcule AUCUNE dimension. Chaque pièce a une boîte en % du
//  repère 911 × 1480, servie par js/gen/armoire-kit.js (GÉNÉRÉ, jamais
//  recopié à la main). Le CSS met la scène entière à l'échelle via --cab-w.
//  À la configuration par défaut, le rendu EST la référence ; on peut
//  masquer, déplacer ou dupliquer une pièce en passant un kit modifié.
//
//  API : window.ArmoireMeuble = { build(root, kit?), setZone(root, zone, open), toggle(root, zone), KIT }
//  Zones : 'haut' (vantaux hauts) et 'bas' (vantaux bas + tiroirs derrière).
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  var KIT = global.ARMOIRE_KIT;
  var IMG = 'img/armoire/v8/';
  // ?v=<empreinte des webp> : un sprite regenere n'est jamais servi depuis
  // un cache (navigateur ou service worker) — constate en recette : un
  // navigateur montrait encore les vantaux sans charnieres.
  function src(name) { return IMG + name + '.webp?v=' + (KIT ? KIT.version : '0'); }

  // Ce qui est DERRIÈRE quelle porte : ce n'est pas mesurable sur l'image,
  // c'est la logique du meuble.
  var ZONE = {
    'planche-1': 'haut', 'planche-4': 'bas', 'planche-5': 'bas',
    'tiroir': 'bas'
  };

  function box(el, b) {
    el.style.setProperty('--x', b.x + '%');
    el.style.setProperty('--y', b.y + '%');
    el.style.setProperty('--w', b.w + '%');
    el.style.setProperty('--h', b.h + '%');
  }

  function img(name, cls, b) {
    var el = document.createElement('img');
    el.className = 'am ' + cls;
    el.src = src(name);
    el.alt = '';
    el.draggable = false;
    el.dataset.piece = name;
    if (ZONE[name]) el.dataset.zone = ZONE[name];
    box(el, b);
    return el;
  }

  // la face d'un bouton : une <img> (URL versionnee), jamais un fond CSS
  function feuille(name) {
    var el = document.createElement('img');
    el.className = 'am-feuille';
    el.src = src(name);
    el.alt = '';
    el.draggable = false;
    el.setAttribute('aria-hidden', 'true');
    return el;
  }

  function button(cls, label) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'am ' + cls;
    b.setAttribute('aria-label', label);
    b.innerHTML = '<span class="am-tap" aria-hidden="true"></span>';
    return b;
  }

  function build(root, kit) {
    kit = kit || KIT;
    if (!kit) throw new Error('ArmoireMeuble : js/gen/armoire-kit.js non chargé');
    var P = kit.pieces;
    root.classList.add('am-root');

    // 1. carcasse
    root.appendChild(img('shell', 'am-shell', P.shell.box));

    // 2. planches, montants (dans l'ordre du kit : une image par pièce)
    Object.keys(P).forEach(function (name) {
      if (/^planche-/.test(name)) root.appendChild(img(name, 'am-planche', P[name].box));
    });
    Object.keys(P).forEach(function (name) {
      if (/^montant-/.test(name)) root.appendChild(img(name, 'am-montant', P[name].box));
    });

    // 3. deux tiroirs : le même sprite, chacun est un bouton
    [['tiroir-g', P.tiroir.box, 'Tiroir de gauche'], ['tiroir-d', P.tiroir.box_droite, 'Tiroir de droite']]
      .forEach(function (t) {
        var b = button('am-tiroir ' + t[0], t[2]);
        b.dataset.zone = 'bas';
        b.appendChild(feuille('tiroir'));
        box(b, t[1]);
        root.appendChild(b);
      });

    // 4. vantaux OUVERTS : découpés dans la référence, posés à leur place
    //    exacte (charnière sur le montant extérieur), invisibles au départ.
    //    Droite = miroir du sprite, dans sa propre boîte symétrique.
    ['haut', 'bas'].forEach(function (zone) {
      var p = P['porte-ouverte-' + zone];
      var g = img('porte-ouverte-' + zone, 'am-ouverte am-g', p.box);
      var d = img('porte-ouverte-' + zone, 'am-ouverte am-d', p.box_droite);
      g.dataset.zone = zone; d.dataset.zone = zone;
      root.appendChild(g); root.appendChild(d);
    });

    // 5. vantaux FERMÉS : boutons, sprite de face (v6, issu de ref-fermee),
    //    droite = miroir DANS le bouton — c'est le bouton qui tourne.
    ['haut', 'bas'].forEach(function (zone) {
      var p = P['porte-' + zone];
      [['am-g', p.box], ['am-d', p.box_droite]].forEach(function (side) {
        var b = button('am-porte am-porte-' + zone + ' ' + side[0], 'Ouvrir');
        b.dataset.zone = zone;
        // axe des charnieres, mesure dans la reference (fraction de la largeur)
        b.style.setProperty('--charniere', (p.charniere * 100) + '%');
        b.appendChild(feuille('porte-' + zone));
        box(b, side[1]);
        root.appendChild(b);
      });
    });

    root.addEventListener('click', function (ev) {
      var porte = ev.target.closest('.am-porte, .am-ouverte');
      if (porte) toggle(root, porte.dataset.zone);
    });
    setZone(root, 'haut', false);
    setZone(root, 'bas', false);
    return root;
  }

  var _t = {};

  function setZone(root, zone, open) {
    root.classList.toggle('am-ouvert-' + zone, !!open);
    root.querySelectorAll('.am-porte[data-zone="' + zone + '"]').forEach(function (p) {
      p.setAttribute('aria-expanded', open ? 'true' : 'false');
      p.setAttribute('aria-label', (open ? 'Fermer' : 'Ouvrir') +
        (zone === 'haut' ? ' le haut de l\'armoire' : ' le bas de l\'armoire'));
    });
    // ce qui est derrière une porte fermée n'est ni cliquable ni annoncé
    var derriere = root.querySelectorAll('.am-tiroir[data-zone="' + zone + '"]');
    clearTimeout(_t[zone]);
    if (open) {
      derriere.forEach(function (c) { c.classList.remove('am-cache'); });
    } else {
      _t[zone] = setTimeout(function () {
        derriere.forEach(function (c) { c.classList.add('am-cache'); });
      }, 620);
    }
  }

  function toggle(root, zone) {
    setZone(root, zone, !root.classList.contains('am-ouvert-' + zone));
  }

  global.ArmoireMeuble = { build: build, setZone: setZone, toggle: toggle, KIT: KIT };
})(window);
