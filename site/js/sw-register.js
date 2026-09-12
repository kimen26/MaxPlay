// sw-register.js — enregistre le service worker MaxPlay (HO-R11, 2026-09-12).
// Inclus en <head> de tous les HTML du site (menu + mini-jeux + pages
// annexes) : la coquille et les pages déjà visitées deviennent disponibles
// hors ligne dès la première visite en ligne. Chemin RELATIF ('./sw.js') :
// le site est servi sous un sous-chemin GitHub Pages, jamais à la racine.
//
// Ne s'enregistre pas en file:// (navigator.serviceWorker.register échoue
// silencieusement sur ce protocole) ni si le navigateur ne supporte pas les
// service workers (échec silencieux, l'appli continue de fonctionner en
// ligne comme avant) — comportement volontaire, pas une erreur à remonter.
(function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  if (location.protocol === 'file:') return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('MaxPlay : service worker non enregistré —', err);
    });
  });
})();
