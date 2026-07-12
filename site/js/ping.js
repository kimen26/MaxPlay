// ─────────────────────────────────────────────────────────────────────────
//  ping.js — Mesure d'audience anonyme (exemption CNIL mesure d'audience)
//
//  1 ping max par appareil et par jour, au chargement du menu.
//  - device_hash : UUID aléatoire généré une fois, stocké en localStorage.
//    JAMAIS croisé avec compte parent / profil enfant (condition exemption).
//  - Aucune donnée perso : juste (uuid aléatoire, date, connecté oui/non).
//  - Fetch REST direct (pas de SDK) : zéro poids pour l'anonyme, silencieux
//    si offline ou file://.
//  Serveur : table pings (migration 006), anon = INSERT only, RLS.
// ─────────────────────────────────────────────────────────────────────────
(function () {
  const URL = 'https://bfrugwrzpefsaehsvypt.supabase.co/rest/v1/pings';
  const KEY = 'sb_publishable_njKrpyff3NSIcNsEocRdVw_JAYW8WCx'; // publique par design
  const DEVICE_KEY = 'maxplay_device';
  const DAY_KEY = 'maxplay_ping_day';

  try {
    const today = new Date().toISOString().slice(0, 10);
    if (localStorage.getItem(DAY_KEY) === today) return; // déjà pingé aujourd'hui

    let device = localStorage.getItem(DEVICE_KEY);
    if (!device) {
      device = (crypto.randomUUID && crypto.randomUUID()) ||
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = Math.random() * 16 | 0;
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
      localStorage.setItem(DEVICE_KEY, device);
    }

    const loggedIn = Object.keys(localStorage).some(k => k.startsWith('sb-'));

    fetch(URL, {
      method: 'POST',
      headers: {
        'apikey': KEY,
        'Authorization': 'Bearer ' + KEY,
        'Content-Type': 'application/json',
        // Pas de Prefer resolution=ignore-duplicates : le chemin upsert de
        // PostgREST se heurte à RLS (401). Doublon du jour = 409, géré ci-dessous.
      },
      body: JSON.stringify({ device_hash: device, logged_in: loggedIn }),
    }).then(r => {
      if (r.ok || r.status === 409) localStorage.setItem(DAY_KEY, today);
    }).catch(() => {}); // offline / file:// : silencieux, on retentera demain
  } catch (e) {}
})();
