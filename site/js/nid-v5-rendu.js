// ─────────────────────────────────────────────────────────────────────────
//  nid-v5-rendu.js — HTML de l'écran du nid (NID v5, HO-MJ-25, D-041)
//  PUR : reçoit l'état du moteur (Collection.nids() / sac()) et rend des
//  chaînes HTML. Aucun accès DOM, aucun listener (voir nid-v5.js).
//  Toutes les positions sont en % de la boîte du nid (largeur W, hauteur 1,45 W),
//  donc la scène se redimensionne d'un bloc, sans calcul en pixels.
//  Image absente → l'<img> est remplacée par une forme CSS (classe .repli).
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  var IMG = 'img/nid/';
  var CAILLOUX_NID = 6;
  // Ordre de pose des cailloux sur l'ovale (angles en degrés, y vers le bas :
  // sin > 0 = devant l'œuf, sin < 0 = derrière). Centre (50 %W, 79 %H), rayons 32 %W / 14 %H.
  var ANGLES = [90, 30, 150, 330, 210, 270];
  var CX = 50, CY = 79, RX = 32, RY = 14;
  var PEINTS_POS = [[11, 76], [89, 76], [26, 98], [74, 98]]; // [%W, %H] autour du nid
  var FORMES = ['1', '2', '3'];

  function img(nom, cls, style) {
    return '<img class="' + cls + '" src="' + IMG + nom + '.webp" alt="" draggable="false"' +
      (style ? ' style="' + style + '"' : '') + ' onerror="NidV5Rendu.repli(this)">';
  }

  // Forme de secours quand le fichier image manque : même classe + .repli, même style inline.
  function repli(el) {
    var s = document.createElement('span');
    s.className = el.className + ' repli';
    s.setAttribute('style', el.getAttribute('style') || '');
    if (el.parentNode) el.parentNode.replaceChild(s, el);
  }

  function nomHabit(h) { return h.id + '-' + h.variante; }

  function cailloux(n) {
    var h = '';
    for (var i = 0; i < Math.min(n, CAILLOUX_NID); i++) {
      var a = ANGLES[i] * Math.PI / 180;
      var x = CX + RX * Math.cos(a), y = CY + RY * Math.sin(a);
      var devant = Math.sin(a) > 0.01;
      h += img('caillou-' + FORMES[i % 3], 'n5-cail c' + FORMES[i % 3] + (devant ? ' av' : ' ar'),
        'left:' + x.toFixed(1) + '%;top:' + y.toFixed(1) + '%;animation-delay:' + (i * 70) + 'ms');
    }
    return h;
  }

  function peints(liste) {
    return liste.slice(0, PEINTS_POS.length).map(function (p, i) {
      return img('peint-' + p.variante, 'n5-peint', 'left:' + PEINTS_POS[i][0] + '%;top:' + PEINTS_POS[i][1] + '%');
    }).join('');
  }

  function fissures(stage) {
    var h = '';
    for (var i = 1; i <= stage; i++) h += '<span class="nid-crack c' + i + '"></span>';
    return h;
  }

  // Un habit est posé selon son TYPE ; la 2e occurrence d'un type (rang 1) est décalée.
  function habits(liste) {
    var rang = {}, h = '';
    liste.forEach(function (it) {
      var r = rang[it.id] = (rang[it.id] === undefined ? 0 : rang[it.id] + 1);
      h += img(nomHabit(it), 'n5-hab h-' + it.id + ' r' + r);
    });
    return h;
  }

  // Œuf CSS teinté famille ; le conteneur .n5-oeuf porte aussi les habits (ancrés en %
  // de sa boîte) : c'est lui que le théâtre d'éclosion agite puis fait disparaître.
  function oeuf(e, i) {
    var classeNais = e.classeNais || '';
    var col = e.familleMeta && e.familleMeta.color ? e.familleMeta.color : '';
    return '<div class="n5-oeuf' + (e.ready ? ' pret' : '') + (e.stage ? ' stage-' + e.stage : '') + '" data-nid="' + i + '"' +
      (col && !e.golden ? ' style="--oeuf-c:' + col + ';"' : '') + ' role="button" aria-label="Œuf">' +
      habits(e.habits.filter(function (x) { return x.id === 'cape'; })) +
      '<div class="n5-corps' + (classeNais || '') + (e.golden ? ' dore' : '') + '">' + fissures(e.stage) + '</div>' +
      habits(e.habits.filter(function (x) { return x.id !== 'cape'; })) +
    '</div>';
  }

  function nid(n, i) {
    var lit = n.lit[0];
    return '<div class="n5-nid' + (n.ferme ? ' ferme' : '') + (n.oeuf ? ' avec-oeuf' : '') + '" data-nid="' + i + '" role="group" aria-label="Nid ' + (i + 1) + '">' +
      (n.ferme ? '' : '<div class="n5-vide"></div>') +
      cailloux(n.cailloux) +
      (lit ? img('lit-' + lit.variante, 'n5-lit') : '') +
      (n.oeuf ? oeuf(n.oeuf, i) : '') +
      peints(n.peints) +
    '</div>';
  }

  function scene(liste) {
    return liste.map(nid).join('');
  }

  // Le sac : au moins 3 cases ; un objet = bouton ≥ 80 px, glissable (data-i = index dans le sac).
  function sac(items, nbCases) {
    var h = '', total = Math.max(nbCases || 3, items.length);
    for (var i = 0; i < total; i++) {
      var it = items[i];
      if (!it) { h += '<div class="n5-case vide"></div>'; continue; }
      var nom = it.type === 'lit' ? 'lit-' + it.variante : it.id + '-' + it.variante;
      h += '<button type="button" class="n5-case" data-i="' + it.index + '" aria-label="' + (it.nom || '') + '">' +
        img(nom, 'n5-objet') + '</button>';
    }
    return h;
  }

  global.NidV5Rendu = { scene: scene, sac: sac, fissures: fissures, repli: repli, CAILLOUX_NID: CAILLOUX_NID };
})(window);
