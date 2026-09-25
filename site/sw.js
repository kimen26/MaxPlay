// sw.js — Service worker MaxPlay (HO-R11, 2026-09-12).
//
// Stratégie de cache PAR TYPE (rapidité vs fraîcheur) :
//
//   1. COQUILLE (PRECACHE_LIST ci-dessous) — index.html, css, js runtime du
//      menu, catalogue, manifest, icônes, offline.html. Précachée à
//      l'install, versionnée par SW_VERSION (hash de contenu, jamais en dur —
//      voir studio/minijeux/scripts/gen-sw-version.mjs). Servie CACHE-FIRST :
//      c'est la coquille de l'appli, elle doit s'afficher instantanément et
//      hors ligne, quitte à être une version derrière le déploiement (elle se
//      renouvelle toute seule au prochain `npm run build` + déploiement, sans
//      action de l'enfant).
//
//   2. RUNTIME img/ audio/ sounds/ — STALE-WHILE-REVALIDATE avec plafond par
//      cache (voir CACHE_LIMITS). Un dino déjà vu, un mini-jeu déjà ouvert
//      s'affichent immédiatement depuis le cache pendant qu'une requête
//      réseau discrète met à jour le cache pour la prochaine fois. Plafonné
//      car 790 Mo d'assets ne tiennent pas indéfiniment sur une tablette :
//      au-delà de la limite, les entrées les plus anciennes sont évincées
//      (LRU approximatif par ordre d'insertion du Cache API).
//
//   3. Supabase / API distante — NETWORK-FIRST, jamais mis en cache : les
//      scores, commentaires et progressions doivent toujours refléter l'état
//      réel si le réseau est là ; cloud.js gère déjà le local-first pour les
//      données (IndexedDB/localStorage), le SW ne s'en mêle pas.
//
//   4. Tout le reste (pages HTML des mini-jeux non précachées, JS non listé,
//      CDN fonts) — NETWORK-FIRST avec repli cache si présent, pour permettre
//      de rouvrir un jeu déjà visité même hors ligne sans le précacher tous.
//
// Chemins et scope RELATIFS partout : le site est servi sous un sous-chemin
// GitHub Pages (kimen26.github.io/MaxPlay/), jamais à la racine du domaine.
// Un chemin absolu ('/sw.js', '/img/...') casserait le scope et le cache dès
// que le repo est servi ailleurs qu'à la racine.

importScripts('./js/gen/sw-version.js');

const VERSION = self.SW_VERSION || 'dev';
const SHELL_CACHE = `maxplay-shell-${VERSION}`;
const RUNTIME_PREFIX = 'maxplay-runtime-';
const RUNTIME_CACHES = {
  img: `${RUNTIME_PREFIX}img`,
  audio: `${RUNTIME_PREFIX}audio`,
  sounds: `${RUNTIME_PREFIX}sounds`,
};
// Plafond d'entrées par cache runtime (LRU approximatif, éviction FIFO).
const CACHE_LIMITS = {
  [RUNTIME_CACHES.img]: 500,
  [RUNTIME_CACHES.audio]: 300,
  [RUNTIME_CACHES.sounds]: 100,
};

// Coquille précachée à l'install — édité seulement si le menu charge un
// nouveau fichier partagé. gen-sw-version.mjs relit ce bloc pour calculer le
// hash : ne pas renommer PRECACHE_LIST, ne pas y mettre de commentaire entre
// les guillemets.
//
// Pièces STRUCTURELLES de l'armoire (fronton/casiers/socle) précachées
// ci-dessous (HO-MJ-13) : les 16 objets (img/armoire/obj-*.webp) restent en
// runtime img/ stale-while-revalidate, pas précachés.
const PRECACHE_LIST = [
  './',
  'index.html',
  'offline.html',
  'manifest.json',
  'css/mp-theme.css',
  'css/mur.css',
  'css/armoire-meuble.css',
  'css/armoire.css',
  'js/lang.js',
  'js/mj-i18n.js',
  // Pages transverses (offline.html, compte, suivi) chargent js/lang.js puis
  // js/mj-i18n.js puis le pack de la langue courante : les 3 bundles sont
  // precaches pour que offline.html reste traduit hors ligne, quelle que
  // soit la langue choisie avant la coupure reseau. Zero apostrophe dans ce
  // commentaire : gen-sw-version.mjs extrait les entrees par une regex
  // naive sur les guillemets simples, une apostrophe ici casse le calcul
  // (deja le cas plus haut, cf. avertissement en tete de PRECACHE_LIST).
  'js/i18n/mj-strings.en.js',
  'js/i18n/mj-strings.es-es.js',
  'js/i18n/mj-strings.pt-br.js',
  'js/ping.js',
  'js/tracker.js',
  'js/cloud.js',
  'js/catalog.js',
  'js/stars.js',
  'js/unlock.js',
  'js/gen/avatars.js',
  'js/gen/sw-version.js',
  // HO-MJ-21 (2026-09-19) : mj-shell.js charge maintenant ce catalogue dans
  // TOUS les mini-jeux golden (sans lui, collection-dinos.js sortait en
  // silence et le nid restait vide) — il doit être précaché comme le reste
  // de la coquille, sinon un jeu ouvert hors-ligne perd le gain.
  'js/gen/dinos-data.js',
  'js/collection.js',
  'js/collection-dinos.js',
  'js/avatar-picker.js',
  'js/bus-svg.js',
  'js/mp-theme.js',
  'js/celebrations.js',
  'js/mur.js',
  'js/gen/armoire-objets.js',
  'js/gen/armoire-kit.js',
  'js/armoire-meuble.js',
  'js/armoire.js',
  'js/sw-register.js',
  'img/maxplay-icon-192.png',
  'img/maxplay-icon-512.png',
  'img/maxplay-icon-maskable-192.png',
  'img/maxplay-icon-maskable-512.png',
  'img/maxplay-icon-180.png',
  // Armoire v8 (HO-MJ-20/22) : le meuble est un kit de pieces decoupees dans
  // UNE reference (carcasse, 5 planches, 3 montants, 1 tiroir pose 2 fois,
  // 2 vantaux ouverts, 2 vantaux fermes) — toutes precachees, le halo des
  // spots reste un degrade CSS.
  'img/armoire/v8/shell.webp',
  'img/armoire/v8/planche-1.webp',
  'img/armoire/v8/planche-2.webp',
  'img/armoire/v8/planche-3.webp',
  'img/armoire/v8/planche-4.webp',
  'img/armoire/v8/planche-5.webp',
  'img/armoire/v8/montant-1.webp',
  'img/armoire/v8/montant-2.webp',
  'img/armoire/v8/montant-3.webp',
  'img/armoire/v8/tiroir.webp',
  'img/armoire/v8/porte-haut.webp',
  'img/armoire/v8/porte-bas.webp',
  'img/armoire/v8/porte-ouverte-haut.webp',
  'img/armoire/v8/porte-ouverte-bas.webp',
  // Globe animé (HO-MJ-16) : 11 frames 256 px, un seul tour au tap sur la
  // case « Monde ». Précachées pour que le tour soit fluide dès le 1er tap,
  // hors ligne comprise.
  'img/armoire/globe-01.webp',
  'img/armoire/globe-02.webp',
  'img/armoire/globe-03.webp',
  'img/armoire/globe-04.webp',
  'img/armoire/globe-05.webp',
  'img/armoire/globe-06.webp',
  'img/armoire/globe-07.webp',
  'img/armoire/globe-08.webp',
  'img/armoire/globe-09.webp',
  'img/armoire/globe-10.webp',
  'img/armoire/globe-11.webp',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(PRECACHE_LIST)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(
      names
        .filter((name) => (name.startsWith('maxplay-shell-') && name !== SHELL_CACHE))
        .map((name) => caches.delete(name))
    )).then(() => self.clients.claim())
  );
});

/** Évince les plus vieilles entrées d'un cache runtime au-delà de sa limite. */
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  const toDelete = keys.slice(0, keys.length - maxEntries);
  await Promise.all(toDelete.map((key) => cache.delete(key)));
}

/** stale-while-revalidate : sert le cache immédiatement, revalide en tâche de fond. */
function staleWhileRevalidate(request, cacheName, maxEntries) {
  return caches.open(cacheName).then(async (cache) => {
    const cached = await cache.match(request);
    const networkFetch = fetch(request)
      .then((response) => {
        if (response && response.ok) {
          cache.put(request, response.clone());
          trimCache(cacheName, maxEntries);
        }
        return response;
      })
      .catch(() => undefined);
    return cached || networkFetch;
  });
}

/** network-first : réseau si possible, repli cache sinon, puis repli offline.html pour les pages. */
function networkFirst(request, isNavigation) {
  return fetch(request)
    .then((response) => {
      if (response && response.ok && request.method === 'GET') {
        caches.open(SHELL_CACHE).then((cache) => cache.put(request, response.clone()));
      }
      return response;
    })
    .catch(async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      if (isNavigation) return caches.match('offline.html');
      return Response.error();
    });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return; // écritures Supabase/cloud.js jamais interceptées

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // CDN fonts, etc. : laissés au navigateur

  const isNavigation = request.mode === 'navigate';

  // 1. Coquille précachée → cache-first (avec secours réseau si jamais absente).
  const precachedPath = url.pathname.replace(self.registration.scope.replace(self.location.origin, ''), '');
  if (PRECACHE_LIST.includes(precachedPath) || PRECACHE_LIST.includes('./' + precachedPath) || isNavigation) {
    event.respondWith(
      caches.match(request).then((cached) => cached || networkFirst(request, isNavigation))
    );
    return;
  }

  // 2. Runtime img/audio/sounds → stale-while-revalidate plafonné.
  if (url.pathname.includes('/img/')) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHES.img, CACHE_LIMITS[RUNTIME_CACHES.img]));
    return;
  }
  if (url.pathname.includes('/audio/')) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHES.audio, CACHE_LIMITS[RUNTIME_CACHES.audio]));
    return;
  }
  if (url.pathname.includes('/sounds/')) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHES.sounds, CACHE_LIMITS[RUNTIME_CACHES.sounds]));
    return;
  }

  // 3. Supabase / API distante : jamais intercepté (garde-fou en plus du filtre d'origine ci-dessus).
  if (url.hostname.includes('supabase')) return;

  // 4. Reste (JS/CSS non précachés, pages mj-*.html) : network-first avec repli cache.
  event.respondWith(networkFirst(request, false));
});
