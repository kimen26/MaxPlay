// ─── Drag & Drop utilities ───
// Partagé mj-08 / mj-09 / mj-17 et tout futur MJ tactile.

/**
 * Extrait la position pointeur depuis un MouseEvent / TouchEvent / PointerEvent
 * @param {Event} e
 * @returns {{x:number, y:number}}
 */
function getPointerXY(e) {
  if (e.touches && e.touches.length > 0) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  if (e.changedTouches && e.changedTouches.length > 0) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  return { x: e.clientX, y: e.clientY };
}

/**
 * Attache les listeners drag (mouse + touch) à un élément.
 * Les callbacks reçoivent la position pointeur en coordonnées viewport.
 * Renvoie une fonction detach() pour nettoyer.
 *
 * @param {HTMLElement} el
 * @param {{ onStart?:(pt,e)=>boolean|void, onMove?:(pt,e)=>void, onEnd?:(pt,e)=>void }} opts
 *   onStart peut retourner false pour refuser le drag.
 * @returns {() => void} detach
 */
function attachDraggable(el, opts = {}) {
  let dragging = false;

  const onDown = (e) => {
    const pt = getPointerXY(e);
    if (opts.onStart && opts.onStart(pt, e) === false) return;
    e.preventDefault();
    dragging = true;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onUp);
  };
  const onMove = (e) => {
    if (!dragging) return;
    e.preventDefault();
    opts.onMove && opts.onMove(getPointerXY(e), e);
  };
  const onUp = (e) => {
    if (!dragging) return;
    dragging = false;
    opts.onEnd && opts.onEnd(getPointerXY(e), e);
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onUp);
  };

  el.addEventListener('mousedown', onDown);
  el.addEventListener('touchstart', onDown, { passive: false });

  return () => {
    el.removeEventListener('mousedown', onDown);
    el.removeEventListener('touchstart', onDown);
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onUp);
  };
}
