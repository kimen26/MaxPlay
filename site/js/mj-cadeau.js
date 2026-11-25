// ─────────────────────────────────────────────────────────────────────────
//  mj-cadeau.js — Cartes cadeau de l'écran de fin (NID v5, HO-MJ-25, D-041 §3)
//  Une carte par cadeau : l'IMAGE de l'objet (cailloux, œuf teinté famille, lit,
//  habit, caillou peint) + une phrase courte DITE à voix haute (Max ne lit pas).
//  Double cadeau : deux cartes l'une après l'autre, puis la fête.
//  Aucun cadeau : on n'appelle pas ce module (rien à annoncer, rien à dire).
//  Utilisé par mj-golden.js showEnd() : GoldenCadeau.jouer(cartes, {fete}) → Promise
//  carte = { type, id, variante, rare, golden?, couleur?, naissance?, texte (HTML i18n) }
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  var IMG = 'img/nid/';
  var DUREE_CARTE = 2300;   // ms : la phrase dite + le temps de regarder
  var DELAI_VOIX = 280;     // ms : le pop d'abord, la voix juste après

  var CSS =
    '.mjc-ov{position:fixed;inset:0;z-index:71;display:flex;align-items:center;justify-content:center;background:rgba(6,10,22,.74);padding:16px;}' +
    '.mjc-carte{display:flex;flex-direction:column;align-items:center;gap:14px;max-width:min(92vw,340px);}' +
    '.mjc-visuel{position:relative;width:min(52vw,220px);height:min(52vw,220px);display:flex;align-items:center;justify-content:center;}' +
    '.mjc-visuel img{max-width:100%;max-height:100%;object-fit:contain;filter:drop-shadow(0 8px 14px rgba(0,0,0,.5));}' +
    '.mjc-visuel.rare img,.mjc-visuel.rare .mjc-oeuf{filter:drop-shadow(0 0 16px #ffd166) drop-shadow(0 6px 10px rgba(0,0,0,.45));}' +
    '.mjc-visuel.rare::after{content:"\\2728";position:absolute;right:2%;top:0;font-size:34px;}' +
    '.mjc-cailloux{display:flex;align-items:flex-end;justify-content:center;width:100%;}' +
    '.mjc-cailloux img{width:46%;margin:0 -7%;}' +
    '.mjc-visuel::before{content:"";position:absolute;inset:-6%;border-radius:50%;background:radial-gradient(circle,rgba(255,246,220,.32),rgba(255,246,220,0) 68%);}' +
    '.mjc-visuel>*{position:relative;}' +
    '.mjc-oeuf{--oeuf-c:#f5e3c2;width:62%;aspect-ratio:1/1.23;position:relative;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;' +
      'background:linear-gradient(160deg,#fff7e0 10%,var(--oeuf-c) 90%);border:3px solid rgba(255,255,255,.5);box-shadow:inset -8px -12px 0 rgba(0,0,0,.1),0 8px 16px rgba(0,0,0,.4);}' +
    '.mjc-oeuf.dore{background:linear-gradient(160deg,#fff3c4,#ffd166);border-color:#ffd166;}' +
    '.mjc-phrase{font:900 clamp(19px,5.6vw,24px)/1.3 "Fredoka One","Nunito",system-ui,sans-serif;color:#fff;text-align:center;' +
      'background:rgba(6,10,22,.82);border-radius:999px;padding:10px 20px;}' +
    '.mjc-repli{font-size:92px;line-height:1;}';

  function injecterCss() {
    if (document.getElementById('mjc-css')) return;
    var s = document.createElement('style');
    s.id = 'mjc-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  // Image avec repli emoji si le fichier manque (jamais de case cassée).
  function img(nom) {
    return '<img src="' + IMG + nom + '.webp" alt="" draggable="false" ' +
      'onerror="this.outerHTML=\'<span class=&quot;mjc-repli&quot;>\\uD83C\\uDF81</span>\'">';
  }

  function visuel(c) {
    var h;
    if (c.type === 'cailloux') h = '<div class="mjc-cailloux">' + img('caillou-2') + img('caillou-1') + img('caillou-3') + '</div>';
    else if (c.type === 'oeuf') {
      var nais = (global.MaxFX && global.MaxFX.contenantClasse) ? global.MaxFX.contenantClasse(c.naissance) : '';
      h = '<div class="mjc-oeuf' + nais + (c.golden ? ' dore' : '') + '"' + (c.couleur && !c.golden ? ' style="--oeuf-c:' + c.couleur + ';"' : '') + '></div>';
    }
    else if (c.type === 'lit') h = img('lit-' + c.variante);
    else if (c.type === 'peint') h = img('peint-' + c.variante);
    else h = img(c.id + '-' + c.variante);
    return '<div class="mjc-visuel' + (c.rare || c.golden ? ' rare' : '') + '">' + h + '</div>';
  }

  function calme() { return !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  function attendre(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function dire(texte) {
    var brut = String(texte || '').replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '');
    try { if (global.TTS && global.TTS.speak && brut) global.TTS.speak(brut, { pitch: 1.05, priority: true }); } catch (e) {}
  }

  function pop() {
    try { var a = new Audio('sounds/fx/pop-apparition.mp3'); a.volume = 0.7; a.play().catch(function () {}); } catch (e) {}
  }

  function montrer(ov, c) {
    ov.innerHTML = '<div class="mjc-carte">' + visuel(c) + '<div class="mjc-phrase">' + (c.texte || '') + '</div></div>';
    var carte = ov.firstChild;
    pop();
    if (!calme() && carte.animate) {
      carte.animate([
        { transform: 'scale(.3) rotate(-8deg)', opacity: 0 },
        { transform: 'scale(1.1) rotate(3deg)', opacity: 1, offset: 0.55 },
        { transform: 'scale(1) rotate(0)', opacity: 1 }
      ], { duration: 600, easing: 'cubic-bezier(.34,1.56,.64,1)' });
    }
    setTimeout(function () { dire(c.texte); }, DELAI_VOIX);
    return attendre(DUREE_CARTE);
  }

  // Joue les cartes dans l'ordre ; opts.fete() est appelée après la dernière si 2 cartes.
  function jouer(cartes, opts) {
    opts = opts || {};
    if (!cartes || !cartes.length) return Promise.resolve();
    injecterCss();
    var ov = document.createElement('div');
    ov.className = 'mjc-ov';
    document.body.appendChild(ov);
    var suite = Promise.resolve();
    cartes.forEach(function (c, i) {
      suite = suite.then(function () {
        return montrer(ov, c).then(function () {
          if (i === cartes.length - 1 && cartes.length > 1 && typeof opts.fete === 'function') { try { opts.fete(); } catch (e) {} }
        });
      });
    });
    return suite.then(function () {
      ov.style.transition = 'opacity .25s';
      ov.style.opacity = '0';
      return attendre(260);
    }).then(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); });
  }

  global.GoldenCadeau = { jouer: jouer, DUREE_CARTE: DUREE_CARTE };
})(window);
