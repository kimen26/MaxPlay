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

  // Mise à jour du site : la coquille est servie cache-first, donc la visite qui
  // découvre une nouvelle version affiche encore l'ancienne (incident 2026-09-28 :
  // l'armoire v6 réapparue chez Papa Yann après la bascule en v8). Quand le
  // nouveau service worker prend la main (skipWaiting + clients.claim), on
  // recharge UNE fois pour montrer la nouvelle coquille entière, jamais un
  // mélange ancien/nouveau. Pas de rechargement à la toute première
  // installation (aucun contrôleur avant : la page est déjà à jour). Jamais
  // dans un mini-jeu : recharger couperait une partie en cours ; le jeu sera
  // à jour à la prochaine ouverture.
  const isGame = /\/mj-[^/]*\.html$/.test(location.pathname);
  const hadController = !!navigator.serviceWorker.controller && !isGame;
  let reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloaded) return;
    reloaded = true;
    location.reload();
  });

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('MaxPlay : service worker non enregistré —', err);
    });
  });
})();
