// ─────────────────────────────────────────────────────────────────────────
//  cloud.js — Connexion parent + sync progression MaxPlay (Phase 1 light)
//
//  PRINCIPE LOCAL-FIRST : localStorage (tracker.js) reste la source de
//  vérité du jeu. Le cloud est un miroir : pull+merge au login/chargement,
//  push débouncé après chaque partie. Hors-ligne ou sans compte → tout
//  marche exactement comme avant (mode dégradé freemium).
//
//  Auth : Supabase magic link (email PARENT uniquement — modèle légal
//  audit 2026-07-06 : zéro donnée perso enfant, profils = surnoms).
//
//  Usage : <script src="js/cloud.js"></script> APRÈS tracker.js.
//  API :
//    Cloud.isConnected()            → bool (session parent active)
//    Cloud.hasActiveChild()         → bool (profil enfant sélectionné)
//    Cloud.signIn(email)            → envoie le magic link
//    Cloud.signOut()
//    Cloud.listChildren() / Cloud.createChild(nickname)
//    Cloud.setActiveChild(id)       → sélectionne + pull/merge immédiat
//    Cloud.syncNow()                → pull + merge + push (manuel)
//    Cloud.schedulePush()           → push débouncé (appelé par tracker.js)
//    Cloud.onChange(fn)             → callback état (login/logout/sync)
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  const SUPABASE_URL = 'https://bfrugwrzpefsaehsvypt.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_njKrpyff3NSIcNsEocRdVw_JAYW8WCx'; // publique par design (protégée par RLS)
  const SDK_URL = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';

  const PROGRESS_KEY = 'maxplay_progress';      // écrit par tracker.js
  const CHILD_KEY    = 'maxplay_active_child';  // { id, nickname }
  const PUSH_DELAY   = 5000;

  let _client = null;
  let _session = null;
  let _pushTimer = null;
  let _listeners = [];
  let _lastSync = null;

  // ── SDK chargé à la demande (pas de dépendance CDN en mode dégradé) ────
  function _loadSdk() {
    return new Promise((resolve, reject) => {
      if (global.supabase) return resolve();
      const s = document.createElement('script');
      s.src = SDK_URL;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('SDK Supabase inaccessible (offline ?)'));
      document.head.appendChild(s);
    });
  }

  async function _getClient() {
    if (_client) return _client;
    await _loadSdk();
    _client = global.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    return _client;
  }

  function _emit() { _listeners.forEach(fn => { try { fn(status()); } catch (e) {} }); }

  // ── État ────────────────────────────────────────────────────────────────
  function isConnected() { return !!_session; }

  function activeChild() {
    try { return JSON.parse(localStorage.getItem(CHILD_KEY)) || null; } catch (e) { return null; }
  }
  function hasActiveChild() { return isConnected() && !!activeChild(); }

  function status() {
    return {
      connected: isConnected(),
      email: _session ? _session.user.email : null,
      child: activeChild(),
      lastSync: _lastSync,
    };
  }

  // ── Auth ────────────────────────────────────────────────────────────────
  async function init() {
    // Sans trace de session antérieure, ne PAS charger le SDK (mode dégradé
    // = zéro requête réseau). Le token supabase vit dans localStorage.
    const hasToken = Object.keys(localStorage).some(k => k.startsWith('sb-'));
    const hasAuthParams = /[#?].*(access_token|code)=/.test(location.href);
    if (!hasToken && !hasAuthParams) return;

    try {
      const c = await _getClient();
      const { data } = await c.auth.getSession();
      _session = data.session || null;
      c.auth.onAuthStateChange((_evt, session) => { _session = session; _emit(); });
      if (hasActiveChild()) await syncNow();
      _emit();
    } catch (e) { /* offline : mode dégradé silencieux */ }
  }

  async function signIn(email) {
    const c = await _getClient();
    const { error } = await c.auth.signInWithOtp({
      email: String(email || '').trim().toLowerCase(),
      options: { emailRedirectTo: location.origin + location.pathname.replace(/[^/]*$/, 'compte.html') },
    });
    if (error) throw error;
    return true;
  }

  async function signOut() {
    if (!_client) return;
    await _client.auth.signOut();
    _session = null;
    localStorage.removeItem(CHILD_KEY);
    _emit();
  }

  // ── Profils enfants ─────────────────────────────────────────────────────
  async function listChildren() {
    const c = await _getClient();
    const { data, error } = await c.from('child_profiles')
      .select('id, nickname, created_at').order('created_at');
    if (error) throw error;
    return data;
  }

  async function createChild(nickname) {
    const c = await _getClient();
    const { data, error } = await c.from('child_profiles')
      .insert({ nickname: String(nickname || '').trim(), parent_id: _session.user.id })
      .select().single();
    if (error) throw error;
    // Log consentement : le parent crée sciemment un profil pseudonyme
    await c.from('consents').insert({
      parent_id: _session.user.id, kind: 'profile_created',
      detail: { child_id: data.id },
    });
    return data;
  }

  async function setActiveChild(id) {
    const children = await listChildren();
    const child = children.find(ch => ch.id === id);
    if (!child) throw new Error('Profil inconnu');
    localStorage.setItem(CHILD_KEY, JSON.stringify({ id: child.id, nickname: child.nickname }));
    await syncNow();
    _emit();
  }

  // ── Merge local ⇄ cloud (par jeu : le compteur plays est monotone) ─────
  function _merge(local, remote) {
    if (!remote || !remote.games) return local;
    if (!local  || !local.games)  return remote;
    const out = { version: 1, games: {}, sessions: [] };
    const ids = new Set([...Object.keys(local.games), ...Object.keys(remote.games)]);
    ids.forEach(id => {
      const l = local.games[id], r = remote.games[id];
      if (!l) { out.games[id] = r; return; }
      if (!r) { out.games[id] = l; return; }
      // Le record avec le plus de parties gagne (compteur monotone) ;
      // à égalité, le plus récent.
      out.games[id] = (r.plays > l.plays) ? r
                    : (l.plays > r.plays) ? l
                    : ((r.lastPlayed || '') > (l.lastPlayed || '') ? r : l);
    });
    // Sessions : union dédupliquée par (jeu, date), bornée à 200
    const seen = new Set();
    out.sessions = [...(local.sessions || []), ...(remote.sessions || [])]
      .filter(s => { const k = s.gameId + '|' + s.date; if (seen.has(k)) return false; seen.add(k); return true; })
      .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
      .slice(-200);
    return out;
  }

  // ── Sync ────────────────────────────────────────────────────────────────
  async function syncNow() {
    if (!hasActiveChild()) return false;
    const c = await _getClient();
    const childId = activeChild().id;

    const { data: row, error } = await c.from('progression')
      .select('data').eq('child_id', childId).maybeSingle();
    if (error) throw error;

    let local = null;
    try { local = JSON.parse(localStorage.getItem(PROGRESS_KEY)); } catch (e) {}
    const merged = _merge(local, row ? row.data : null) || { version: 1, games: {}, sessions: [] };

    localStorage.setItem(PROGRESS_KEY, JSON.stringify(merged));
    const { error: upErr } = await c.from('progression')
      .upsert({ child_id: childId, data: merged });
    if (upErr) throw upErr;

    _lastSync = new Date().toISOString();
    _emit();
    return true;
  }

  // Push débouncé — appelé par tracker.js après chaque sauvegarde.
  // No-op total si pas de compte / pas d'enfant actif / offline.
  function schedulePush() {
    if (!hasActiveChild()) return;
    clearTimeout(_pushTimer);
    _pushTimer = setTimeout(() => { syncNow().catch(() => {}); }, PUSH_DELAY);
  }

  function onChange(fn) { _listeners.push(fn); }

  global.Cloud = {
    init, isConnected, hasActiveChild, status,
    signIn, signOut,
    listChildren, createChild, setActiveChild, activeChild,
    syncNow, schedulePush, onChange,
  };

  init();
})(window);
