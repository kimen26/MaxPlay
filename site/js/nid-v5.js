// ─────────────────────────────────────────────────────────────────────────
//  nid-v5.js — L'ÉCRAN DU NID (NID v5, HO-MJ-25, D-041) : 3 nids côte à côte,
//  sac de 3 cases, glisser-déposer (pointer events) ou toucher-pour-placer.
//  Remplace la « chambre des œufs » : nid-ui.js openChambre() délègue ici quand
//  le moteur expose l'API v3 (nids/poser). L'overlay garde l'id #chambre-ov
//  (deep-link ?open=nid, théâtre d'éclosion) et le bouton .ch-back.
//  Un refus (3e habit du même type, lit sans nid fermé…) ne dit RIEN : l'objet
//  revient au sac en rebondissant. L'éclosion reste le théâtre de nid-ui.js.
//  Rendu HTML : nid-v5-rendu.js. API : window.NidV5 = { supporte, ouvrir, rendre, fermer }
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  var SEUIL_GLISSE = 8;        // px avant qu'un appui devienne un glissé
  var PAUSE_ECLOSION_OUVERTURE = 1300;
  var PAUSE_ECLOSION_POSE = 900;
  var SON_POSE = 'sounds/fx/pop-apparition.mp3';

  function $(id) { return document.getElementById(id); }
  function C() { return global.Collection; }
  function calme() { return !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches); }

  function supporte() {
    var c = C();
    return !!(global.NidV5Rendu && c && typeof c.nids === 'function' && typeof c.poser === 'function' && typeof c.sac === 'function');
  }

  function chargerCss() {
    if (document.querySelector('link[href*="nid-v5.css"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = 'css/nid-v5.css';
    document.head.appendChild(l);
  }

  function son(vol) {
    try { var a = new Audio(SON_POSE); a.volume = vol || 0.5; a.play().catch(function () {}); } catch (e) {}
  }

  // ── rendu ────────────────────────────────────────────────────────────
  function rendre() {
    var ov = $('chambre-ov');
    if (!ov || !ov.classList.contains('n5')) return;
    var nids = [], sac = [];
    try { nids = C().nids(); sac = C().sac(); } catch (e) { return; }
    // contenant de naissance (œuf / aquarium / tanière) : look partagé via MaxFX
    nids.forEach(function (n) {
      if (n.oeuf && global.MaxFX && global.MaxFX.contenantClasse) n.oeuf.classeNais = global.MaxFX.contenantClasse(n.oeuf.naissance);
    });
    ov.querySelector('.n5-scene').innerHTML = global.NidV5Rendu.scene(nids);
    ov.querySelector('.n5-sac').innerHTML = global.NidV5Rendu.sac(sac, 3);
  }

  // ── choix du nid quand l'enfant TOUCHE un objet (sans glisser) ───────
  function cibleAuto(idx) {
    var nids = C().nids(), it = C().sac()[idx];
    if (!it) return -1;
    var best = -1, bestV = null;
    nids.forEach(function (n, i) {
      var v = null;
      if (it.type === 'lit') {
        if (n.ferme && !n.lit.length) v = n.oeuf ? 0 : 1;               // l'œuf qui en a besoin d'abord
      } else if (n.oeuf) {
        var meme = n.oeuf.habits.filter(function (h) { return h.id === it.id; }).length;
        if (meme < 2) v = n.oeuf.habits.length * 2 + (n.lit.length ? 0 : 1); // le moins habillé, lit d'abord
      }
      if (v !== null && (bestV === null || v < bestV)) { best = i; bestV = v; }
    });
    return best;
  }

  function nidSous(x, y) {
    var el = document.elementFromPoint(x, y);
    var n = el && el.closest ? el.closest('.n5-nid') : null;
    return n ? parseInt(n.dataset.nid, 10) : -1;
  }

  function surligner(i) {
    var ov = $('chambre-ov');
    if (!ov) return;
    var all = ov.querySelectorAll('.n5-nid');
    for (var k = 0; k < all.length; k++) all[k].classList.toggle('cible', k === i);
  }

  // ── refus : l'objet revient au sac en rebondissant, aucun message ─────
  function rebond(cas, ghost) {
    if (!cas || !cas.parentNode) { if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost); return; }
    var r = cas.getBoundingClientRect();
    if (ghost && !calme()) {
      var gx = parseFloat(ghost.style.left), gy = parseFloat(ghost.style.top);
      var tx = r.left + r.width / 2, ty = r.top + r.height / 2;
      var a = ghost.animate([
        { left: gx + 'px', top: gy + 'px', transform: 'translate(-50%,-50%) scale(1.1)' },
        { left: tx + 'px', top: ty + 'px', transform: 'translate(-50%,-50%) scale(1.15)', offset: 0.55 },
        { left: tx + 'px', top: (ty - 18) + 'px', transform: 'translate(-50%,-50%) scale(1)', offset: 0.75 },
        { left: tx + 'px', top: ty + 'px', transform: 'translate(-50%,-50%) scale(1)' }
      ], { duration: 520, easing: 'ease-out' });
      a.onfinish = function () { if (ghost.parentNode) ghost.parentNode.removeChild(ghost); cas.classList.remove('en-main'); };
      return;
    }
    if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
    cas.classList.remove('en-main');
    if (!calme()) cas.animate([{ transform: 'scale(1)' }, { transform: 'translateY(-10px) scale(1.08)' }, { transform: 'scale(.96)' }, { transform: 'scale(1)' }], { duration: 380 });
  }

  function poserSur(nid, idx, cas, ghost) {
    if (nid < 0) { rebond(cas, ghost); return; }
    var res = null;
    try { res = C().poser(nid, idx); } catch (e) { res = null; }
    if (!res || !res.ok) { rebond(cas, ghost); return; }
    if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
    son(0.5);
    rendre();
    var eg = document.querySelector('.n5-oeuf[data-nid="' + nid + '"]') || document.querySelector('.n5-nid[data-nid="' + nid + '"]');
    if (eg) { eg.classList.add('pose'); setTimeout(function () { eg.classList.remove('pose'); }, 700); }
    if (res.ready) setTimeout(function () { eclore(nid); }, PAUSE_ECLOSION_POSE);
  }

  function eclore(nid) {
    if (global.NidUI && typeof global.NidUI.hatchNid === 'function') global.NidUI.hatchNid(nid);
  }

  // ── glisser depuis le sac ────────────────────────────────────────────
  function lierSac(ov) {
    ov.addEventListener('pointerdown', function (ev) {
      var cas = ev.target.closest ? ev.target.closest('.n5-case[data-i]') : null;
      if (!cas || cas.classList.contains('en-main')) return;
      ev.preventDefault();
      var idx = parseInt(cas.dataset.i, 10), x0 = ev.clientX, y0 = ev.clientY;
      var ghost = null, moved = false;
      try { cas.setPointerCapture(ev.pointerId); } catch (e) {}

      function move(e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < SEUIL_GLISSE) return;
        if (!ghost) {
          ghost = document.createElement('div');
          ghost.className = 'n5-fantome';
          var im = cas.querySelector('.n5-objet');
          if (im) ghost.appendChild(im.cloneNode(true));
          document.body.appendChild(ghost);
          cas.classList.add('en-main');
        }
        moved = true;
        ghost.style.left = e.clientX + 'px';
        ghost.style.top = e.clientY + 'px';
        surligner(nidSous(e.clientX, e.clientY));
      }
      function fin(e, annule) {
        cas.removeEventListener('pointermove', move);
        cas.removeEventListener('pointerup', up);
        cas.removeEventListener('pointercancel', annuler);
        try { cas.releasePointerCapture(ev.pointerId); } catch (er) {}
        surligner(-1);
        if (annule) { rebond(cas, ghost); return; }
        if (!moved) { poserSur(cibleAuto(idx), idx, cas, null); return; }
        poserSur(nidSous(e.clientX, e.clientY), idx, cas, ghost);
      }
      function up(e) { fin(e, false); }
      function annuler(e) { fin(e, true); }
      cas.addEventListener('pointermove', move);
      cas.addEventListener('pointerup', up);
      cas.addEventListener('pointercancel', annuler);
    });
  }

  // ── caresse : cœurs + frétillement, les voisins se penchent ───────────
  function caresser(eg) {
    if (!eg || eg.dataset.caresse) return;
    var i = parseInt(eg.dataset.nid, 10), res = null;
    try { res = C().caresser(i); } catch (e) { return; }
    eg.dataset.caresse = '1';
    var coeur = document.createElement('span');
    coeur.className = 'n5-coeur';
    coeur.textContent = '💛';
    eg.appendChild(coeur);
    eg.classList.add('coucou');
    son(0.35);
    var corps = eg.querySelector('.n5-corps');
    if (corps && res && res.stage) corps.innerHTML = global.NidV5Rendu.fissures(res.stage);
    var voisins = [];
    [i - 1, i + 1].forEach(function (j) {
      var v = document.querySelector('.n5-oeuf[data-nid="' + j + '"]');
      if (v) { v.classList.add(j > i ? 'penche-g' : 'penche-d'); voisins.push(v); }
    });
    setTimeout(function () {
      eg.classList.remove('coucou');
      if (coeur.parentNode) coeur.parentNode.removeChild(coeur);
      delete eg.dataset.caresse;
      voisins.forEach(function (v) { v.classList.remove('penche-g', 'penche-d'); });
    }, 900);
  }

  // ── ouverture / fermeture ────────────────────────────────────────────
  function fermer() {
    document.body.classList.remove('n5-ouvert');
    var ov = $('chambre-ov');
    if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
    if (global.MurScene && typeof global.MurScene.refresh === 'function') global.MurScene.refresh();
  }

  function ouvrir() {
    if (!supporte() || $('chambre-ov')) return;
    chargerCss();
    // le gain est « vu » dès qu'on entre dans le nid → le Roi cesse de pulser
    if (global.MurScene && global.MurScene.markGainSeen) global.MurScene.markGainSeen();
    var ov = document.createElement('div');
    ov.id = 'chambre-ov';
    ov.className = 'n5 arrive';
    ov.innerHTML =
      '<div class="n5-hdr"><button type="button" class="ch-back" aria-label="Retour">←</button>' +
      '<span class="n5-titre">🪺 Mon nid</span></div>' +
      '<div class="n5-scene"></div>' +
      '<div class="n5-sac" aria-label="Sac"></div>';
    document.body.appendChild(ov);
    // classe sur <body> tant que l'écran existe (masque le dino de l'accueil) ; retirée aussi
    // quand le théâtre d'éclosion supprime l'overlay sans passer par fermer()
    document.body.classList.add('n5-ouvert');
    var veille = new MutationObserver(function () {
      if (!$('chambre-ov')) { document.body.classList.remove('n5-ouvert'); veille.disconnect(); }
    });
    veille.observe(document.body, { childList: true });
    rendre();
    setTimeout(function () { ov.classList.remove('arrive'); }, 1100); // les cailloux ne rejouent pas leur arrivée aux re-rendus
    ov.addEventListener('click', function (ev) {
      if (ev.target.closest('.ch-back')) { fermer(); return; }
      var eg = ev.target.closest('.n5-oeuf');
      if (eg) caresser(eg);
    });
    lierSac(ov);
    // Un œuf déjà prêt à l'ouverture éclot APRÈS une vraie pause (il doit se voir)
    var pret = -1;
    try { pret = C().readyEggIndex(); } catch (e) {}
    if (pret !== -1) setTimeout(function () { eclore(pret); }, PAUSE_ECLOSION_OUVERTURE);
  }

  global.NidV5 = { supporte: supporte, ouvrir: ouvrir, rendre: rendre, fermer: fermer };
})(window);
