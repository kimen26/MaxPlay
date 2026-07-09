// decor.js — Items de décor PNG partagés (mêmes images pour la ligne du bus ET les planètes fusée).
// Images : img/decor/<id>.png (fond transparent, générées ChatGPT style cubiste facettes, cf. batch-decor-gpt.mjs).
// API : window.Decor.html(id, opts) → string HTML d'un <img> décoratif animé.
//   opts : { w:px, anim:'sway|bob|drift|pulse|shoot', dur:s, delay:s, style:'css inline', cls:'classes en plus', flip:bool }
// Toutes les animations respectent prefers-reduced-motion.
(function () {
  'use strict';
  var BASE = 'img/decor/';

  var css = document.createElement('style');
  css.textContent = [
    '.dc{position:absolute;pointer-events:none;user-select:none;-webkit-user-drag:none}',
    '.dc.flip{transform:scaleX(-1)}',
    // plante/objet posé : balancement doux depuis la base
    '@keyframes dcsway{0%,100%{rotate:-2.5deg}50%{rotate:2.5deg}}',
    '.dc-sway{transform-origin:50% 100%;animation:dcsway var(--dcd,4s) ease-in-out infinite alternate;animation-delay:var(--dcl,0s)}',
    // objet flottant : petit bob vertical
    '@keyframes dcbob{0%,100%{translate:0 0}50%{translate:0 -9px}}',
    '.dc-bob{animation:dcbob var(--dcd,3.5s) ease-in-out infinite;animation-delay:var(--dcl,0s)}',
    // nuage : traversée lente de gauche à droite (left % = largeur du PARENT, qui doit être position:relative)
    '@keyframes dcdrift{0%{left:-28%;opacity:0}8%{opacity:var(--dco,.9)}92%{opacity:var(--dco,.9)}100%{left:105%;opacity:0}}',
    '.dc-drift{left:-28%;animation:dcdrift var(--dcd,40s) linear infinite;animation-delay:var(--dcl,0s);opacity:0}',
    // variante : posé dans un conteneur en flux (ex. satellite d\'orbite)
    '.dc.static{position:static;display:block;filter:drop-shadow(0 2px 3px #0006)}',
    // volcan : gonfle doucement (il "vit")
    '@keyframes dcpulse{0%,100%{scale:1}50%{scale:1.06}}',
    '.dc-pulse{transform-origin:50% 100%;animation:dcpulse var(--dcd,2.6s) ease-in-out infinite}',
    // étoile filante / météorite : diagonale + fade, en boucle espacée
    '@keyframes dcshoot{0%,72%{translate:0 0;opacity:0}76%{opacity:1}100%{translate:-46vw 34vh;opacity:0}}',
    '.dc-shoot{animation:dcshoot var(--dcd,9s) linear infinite;animation-delay:var(--dcl,0s);opacity:0}',
    '@media(prefers-reduced-motion:reduce){.dc-sway,.dc-bob,.dc-drift,.dc-pulse,.dc-shoot{animation:none}',
    '  .dc-drift,.dc-shoot{opacity:.5}}'
  ].join('');
  document.head.appendChild(css);

  window.Decor = {
    base: BASE,
    html: function (id, opts) {
      opts = opts || {};
      var cls = 'dc' + (opts.anim ? ' dc-' + opts.anim : '') + (opts.flip ? ' flip' : '') + (opts.cls ? ' ' + opts.cls : '');
      var st = (opts.w ? 'width:' + opts.w + 'px;' : '')
        + (opts.dur ? '--dcd:' + opts.dur + 's;' : '')
        + (opts.delay ? '--dcl:' + opts.delay + 's;' : '')
        + (opts.style || '');
      return '<img class="' + cls + '" style="' + st + '" src="' + BASE + id + '.png" alt="" loading="lazy">';
    }
  };
})();
