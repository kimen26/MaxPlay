// ─────────────────────────────────────────────────────────────────────────
//  armoire.js — Accueil enfant « L'Armoire » (HO-MJ-13, remplace La Vallée).
//  L'armoire est IMMOBILE : une grille de casiers en bois, un objet par
//  casier, jamais d'ascenseur. Le tirage des jeux passe par SLOTS ci-dessous,
//  toujours via window.catalogVisible() (jamais MAXPLAY_CATALOG brut).
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
  // qu'un lecteur phonétique de 4 ans déchiffre) : ordre FIXE, 2 premiers =
  // dinos/monde, toujours visibles. Le tirage aléatoire retire du pool au fur
  // et à mesure (`used`) pour qu'un jeu n'apparaisse jamais 2 fois.
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
      // Œufs et album vivent dans les 2 TIROIRS du socle (revue 2026-09-15 :
      // pas de doublon œuf/album entre la grille et les tiroirs).
      { obj: 'obj-livres-dinos', label: 'Dinos', action: 'encyclo' },
      { obj: 'obj-globe', label: 'Monde', action: 'encyclo' },
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
      if (slot.action) return slot;
      if (slot.url) return slot;
      var picked = slot.pick();
      return picked ? { obj: slot.obj, label: slot.label, url: picked.url } : null;
    }).filter(Boolean);
  }

  function isEncycloUnlocked() {
    try { return !!(global.Unlock && Unlock.isUnlocked('dinos')); } catch (e) { return false; }
  }

  // ── Layout : cols/rows tels que chaque casier fait ≥ 96px, JAMAIS d'ascenseur ──
  function computeLayout(total) {
    var w = global.innerWidth;
    var cols = w >= 1200 ? 6 : w >= 900 ? 5 : w >= 600 ? 4 : 3;
    var casiers = $('casiers');
    var h = (casiers && casiers.clientHeight) || 0;
    var rows = Math.min(4, Math.max(2, Math.floor(h / 96) || 2));
    var raw = Math.min(cols * rows, total);
    // grille toujours PLEINE (jamais de dernière rangée à moitié vide) :
    // on tronque au multiple de cols le plus proche par en dessous.
    var full = Math.max(1, Math.floor(raw / cols));
    return { cols: cols, n: full * cols };
  }

  function cellHtml(slot, i) {
    var locked = slot.action === 'encyclo' && !isEncycloUnlocked();
    return '<button type="button" class="casier' + (locked ? ' locked' : '') + '" data-idx="' + i + '" aria-label="' + esc(slot.label) + '">' +
      '<span class="spot" aria-hidden="true"></span>' +
      '<span class="lumiere" aria-hidden="true"></span>' +
      '<img class="obj" src="img/armoire/' + slot.obj + '.webp" alt="">' +
      (locked ? '<span class="porte" aria-hidden="true"></span>' : '') +
      '<span class="etiquette">' + esc(slot.label) + '</span>' +
      '</button>';
  }

  function go(slot) {
    if (slot.action === 'encyclo') { if (global.MUR && MUR.openEncyclo) MUR.openEncyclo(); return; }
    if (slot.action === 'oeufs') { if (global.NidUI && NidUI.openChambre) NidUI.openChambre(); return; }
    if (slot.action === 'padidi') { if (global.NidUI && NidUI.openPadidi) NidUI.openPadidi(); return; }
    if (slot.url) location.href = slot.url;
  }

  var _resolved = null;
  var _wired = false;

  function render() {
    var casiers = $('casiers');
    if (!casiers) return;
    if (!_resolved) _resolved = buildSlots();
    var layout = computeLayout(_resolved.length);
    casiers.style.setProperty('--cols', layout.cols);
    casiers.innerHTML = _resolved.slice(0, layout.n).map(cellHtml).join('');
    if (!_wired) {
      _wired = true;
      casiers.addEventListener('click', function (ev) {
        var btn = ev.target.closest('.casier');
        if (!btn) return;
        var slot = _resolved[+btn.dataset.idx];
        if (!slot) return;
        if (btn.classList.contains('locked')) { if (global.MUR && MUR.openEncyclo) MUR.openEncyclo(); return; }
        go(slot);
      });
    }
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
