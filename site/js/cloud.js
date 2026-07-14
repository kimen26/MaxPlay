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

  // Clés localStorage synchronisées dans child_state (whitelist — migration 003).
  // Valeurs stockées telles quelles côté serveur : { v: "<string brute>" }.
  const STATE_KEYS = [
    'maxplay_unlocks', 'maxplay_avatar', 'maxplay_avatar_cfg', 'maxplay_lang',
    'maxplay_ambiance',  // fond d'écran choisi — suit l'avatar entre appareils (fix audit 2026-07-14)
    'mj20_progress', 'mj20_streak', 'mj37_progress', 'mj32_galerie', 'mj-pose-tiles',
  ];
  // Méta de sync locale : { states: { clé: hash dernière valeur synchro },
  //                         lastSessionPush: ISO } — jamais poussée au cloud.
  const SYNC_META_KEY = 'maxplay_sync_meta';

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
      // Fix audit : parent connecté sans profil actif → pousser quand même le
      // backlog d'annotations (sinon il dort en localStorage jusqu'à une action).
      else if (_session) { try { await _flushAnnotations(c); } catch (e) {} }
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

  // Connexion par CODE à 6 chiffres (même email que le magic link).
  // Indispensable en PWA iOS : le lien s'ouvre dans Safari (stockage séparé
  // de la PWA installée) → la session n'atterrit pas dans l'app. Le code,
  // saisi DANS la PWA, si. Prérequis : ajouter {{ .Token }} au template
  // email Supabase (voir infra/supabase/README.md).
  async function verifyCode(email, code) {
    const c = await _getClient();
    const { data, error } = await c.auth.verifyOtp({
      email: String(email || '').trim().toLowerCase(),
      token: String(code || '').trim(),
      type: 'email',
    });
    if (error) throw error;
    _session = data.session;
    _emit();
    // Fix audit : pousser tout de suite le backlog d'annotations accumulé en
    // Mode 1 (💬 + notes de revue), sans attendre la sélection d'un profil.
    try { await _flushAnnotations(await _getClient()); } catch (e) {}
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
      // Histoires UNIONNÉES par date (jamais de perte d'étoile : stars.js dérive
      // des sessions parfaites de l'history). Dédup par date, tri chrono, cap 20.
      const seen = new Set();
      const fullHistory = [...(l.history || []), ...(r.history || [])]
        .filter(h => { const k = h.date; if (!k || seen.has(k)) return false; seen.add(k); return true; })
        .sort((a, b) => (a.date || '').localeCompare(b.date || ''));
      const history = fullHistory.slice(-20);

      // Agrégats RECALCULÉS depuis l'history unionné dédupliqué (fix audit :
      // l'ancien max-pick jetait les compteurs du record perdant → sous-comptage
      // en jeu parallèle multi-appareils). La dédup par date empêche le double
      // comptage. L'history unionné EST la source de vérité — pas de plancher
      // max() sur les anciens compteurs (il ré-écraserait la somme correcte).
      // Cap 20 de l'history : au-delà, game_sessions (append-only) porte la
      // vérité analytique côté serveur.
      const sum = fullHistory.reduce((a, h) => ({
        totalQuestions: a.totalQuestions + (h.questions || 0),
        correctAnswers: a.correctAnswers + (h.correct || 0),
        totalScore: a.totalScore + (h.score || 0),
        maxScore: a.maxScore + (h.maxScore || 0),
      }), { totalQuestions: 0, correctAnswers: 0, totalScore: 0, maxScore: 0 });
      const plays = fullHistory.length;
      const totalQuestions = sum.totalQuestions;
      const correctAnswers = sum.correctAnswers;
      const totalScore = sum.totalScore;
      const maxScore = sum.maxScore;
      const lastPlayed = (r.lastPlayed || '') > (l.lastPlayed || '') ? r.lastPlayed : l.lastPlayed;
      const rate = totalQuestions > 0 ? correctAnswers / totalQuestions : 0;
      const mastery = (plays >= 3 && rate >= 0.85) ? 'maîtrisé'
                    : (plays >= 1 || rate >= 0.5) ? 'en-cours' : 'nouveau';
      out.games[id] = {
        ...l, ...r, plays, totalQuestions, correctAnswers, totalScore, maxScore,
        lastPlayed, mastery, history,
      };
    });
    // Sessions : union dédupliquée par (jeu, date), bornée à 200
    const seen = new Set();
    out.sessions = [...(local.sessions || []), ...(remote.sessions || [])]
      .filter(s => { const k = s.gameId + '|' + s.date; if (seen.has(k)) return false; seen.add(k); return true; })
      .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
      .slice(-200);
    return out;
  }

  // ── Sync état par clé (child_state) ─────────────────────────────────────
  function _hash(s) {
    if (s === null || s === undefined) return null;
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return String(h) + ':' + s.length;
  }

  function _syncMeta() {
    try { return JSON.parse(localStorage.getItem(SYNC_META_KEY)) || {}; } catch (e) { return {}; }
  }
  function _saveSyncMeta(m) {
    try { localStorage.setItem(SYNC_META_KEY, JSON.stringify(m)); } catch (e) {}
  }

  // ── Merge sémantique par clé structurée (progression cumulative) ─────────
  // Les clés child_state sont des ENSEMBLES/paliers qui croissent des deux
  // côtés → un remplacement total perd le contenu d'un seul côté. On fusionne
  // par type de clé pour ne jamais faire régresser un acquis (audit 2026-07-14).
  // Renvoie une STRING (le format stocké) ou null si rien à fusionner.
  function _mergeState(key, localStr, remoteStr) {
    if (localStr === null) return remoteStr;
    if (remoteStr === null) return localStr;
    if (localStr === remoteStr) return localStr;
    let l, r;
    try { l = JSON.parse(localStr); } catch (e) { return localStr; }
    try { r = JSON.parse(remoteStr); } catch (e) { return localStr; }

    // mj20_progress : { version, langs:{ code:{unlockedTier, consecutiveCorrect} } }
    if (key === 'mj20_progress' && l && r && l.langs && r.langs) {
      const out = { ...r, ...l, langs: {} };
      const codes = new Set([...Object.keys(l.langs), ...Object.keys(r.langs)]);
      codes.forEach(code => {
        const a = l.langs[code] || {}, b = r.langs[code] || {};
        out.langs[code] = {
          ...b, ...a,
          unlockedTier: Math.max(a.unlockedTier || 0, b.unlockedTier || 0),
          consecutiveCorrect: Math.max(a.consecutiveCorrect || 0, b.consecutiveCorrect || 0),
        };
      });
      return JSON.stringify(out);
    }

    // maxplay_unlocks : { bundleId: true } → union des clés vraies
    if (key === 'maxplay_unlocks' && l && r && !Array.isArray(l) && !Array.isArray(r)) {
      return JSON.stringify({ ...r, ...l });
    }

    // mj20_streak / mj37_progress : { key: true|number } → union / max
    if ((key === 'mj37_progress' || key === 'mj20_streak') && l && r
        && !Array.isArray(l) && !Array.isArray(r)) {
      const out = { ...r };
      Object.keys(l).forEach(k => {
        const a = l[k], b = r[k];
        out[k] = (typeof a === 'number' && typeof b === 'number') ? Math.max(a, b) : (a || b);
      });
      return JSON.stringify(out);
    }

    // mj32_galerie : [pièce…] → union dédupliquée par id|date, cap 12
    if (key === 'mj32_galerie' && Array.isArray(l) && Array.isArray(r)) {
      const seen = new Set(), out = [];
      [...l, ...r].forEach(p => {
        const k = (p && (p.id || p.date || JSON.stringify(p))) + '';
        if (seen.has(k)) return; seen.add(k); out.push(p);
      });
      return JSON.stringify(out.slice(-12));
    }

    // Clés scalaires (maxplay_avatar, _cfg, _lang, ambiance, mj-pose-tiles) :
    // pas de structure cumulative → last-writer-wins géré par le baseline appelant.
    return null;
  }

  // Baseline sync par clé, avec merge sémantique anti-régression :
  //  - local modifié depuis la dernière synchro ET cloud aussi → MERGE des deux,
  //    puis push du merge (jamais d'écrasement d'un acquis).
  //  - baseline absent (1er login/appareil neuf) + cloud plus riche → on adopte
  //    le cloud d'abord (fix audit : ne plus écraser le cloud avec le défaut local).
  //  - local seul changé → push local ; cloud seul changé → adopte cloud.
  async function _syncStates(c, childId) {
    const { data: rows, error } = await c.from('child_state')
      .select('key, data').eq('child_id', childId);
    if (error) throw error;
    const remote = {};
    (rows || []).forEach(r => { remote[r.key] = (r.data && typeof r.data.v === 'string') ? r.data.v : null; });

    const meta = _syncMeta();
    const states = { ...(meta.states || {}) };
    const toPush = [];

    STATE_KEYS.forEach(k => {
      const local = localStorage.getItem(k);
      const rem   = (k in remote) ? remote[k] : null;
      const lH = _hash(local), rH = _hash(rem), base = states[k];
      const localChanged = (local !== null && lH !== base);
      const remoteChanged = (rem !== null && rH !== lH);

      if (lH === rH && lH !== null) {
        states[k] = lH;                                   // déjà identiques
        return;
      }
      if (localChanged && remoteChanged) {
        // Les DEUX ont bougé → fusion sémantique (structuré) ou local gagne (scalaire).
        const merged = _mergeState(k, local, rem);
        if (merged !== null && merged !== rem) {
          try { localStorage.setItem(k, merged); } catch (e) {}
          toPush.push({ child_id: childId, key: k, data: { v: merged } });
          states[k] = _hash(merged);
        } else if (merged === rem) {
          try { localStorage.setItem(k, rem); } catch (e) {}
          states[k] = rH;
        } else {
          // scalaire : last-writer-wins = local (l'utilisateur vient de choisir)
          toPush.push({ child_id: childId, key: k, data: { v: local } });
          states[k] = lH;
        }
        return;
      }
      if (base === undefined && remoteChanged) {
        // Appareil neuf : le cloud fait référence. Mais si la clé est structurée
        // et que le local diffère (jeu anonyme), fusionner plutôt qu'adopter sec.
        const merged = _mergeState(k, local, rem);
        if (merged !== null && merged !== rem && merged !== local) {
          try { localStorage.setItem(k, merged); } catch (e) {}
          toPush.push({ child_id: childId, key: k, data: { v: merged } });
          states[k] = _hash(merged);
        } else {
          try { localStorage.setItem(k, rem); states[k] = rH; } catch (e) {}
        }
        return;
      }
      if (localChanged) {                                 // local seul a bougé
        toPush.push({ child_id: childId, key: k, data: { v: local } });
        states[k] = lH;
      } else if (remoteChanged) {                         // cloud seul a bougé
        try { localStorage.setItem(k, rem); states[k] = rH; } catch (e) {}
      }
    });

    if (toPush.length) {
      const { error: upErr } = await c.from('child_state').upsert(toPush);
      if (upErr) throw upErr;
    }
    _saveSyncMeta({ ...meta, states });
  }

  // ── Flush sessions → game_sessions (append-only, dédup serveur) ─────────
  async function _flushSessions(c, childId) {
    let progress = null;
    try { progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)); } catch (e) {}
    if (!progress || !Array.isArray(progress.sessions)) return;

    const meta = _syncMeta();
    const last = meta.lastSessionPush || '';
    const fresh = progress.sessions.filter(s => s.date && s.date > last);
    if (!fresh.length) return;

    // correct/questions vivent dans games[*].history (même date) — jointure locale
    const detail = {};
    Object.keys(progress.games || {}).forEach(gid => {
      (progress.games[gid].history || []).forEach(h => { detail[gid + '|' + h.date] = h; });
    });

    const rows = fresh.map(s => {
      const h = detail[s.gameId + '|' + s.date] || {};
      return {
        child_id: childId, game_id: s.gameId, played_at: s.date,
        score: s.score ?? null, max_score: s.maxScore ?? null,
        correct: h.correct ?? null, questions: h.questions ?? null,
        duration_s: s.duration ?? null,
      };
    });
    const { error } = await c.from('game_sessions')
      .upsert(rows, { onConflict: 'child_id,game_id,played_at', ignoreDuplicates: true });
    if (error) throw error;
    const maxDate = fresh.reduce((m, s) => (s.date > m ? s.date : m), last);
    _saveSyncMeta({ ..._syncMeta(), lastSessionPush: maxDate });
  }

  // ── Flush annotations (💬 comments.js + notes de revue index.html) ──────
  async function _flushAnnotations(c) {
    if (!_session) return;
    const childId = activeChild() ? activeChild().id : null;
    const comments = [];   // immuables (dédup par date) → ignoreDuplicates
    const reviews = [];    // éditables (clé stable par jeu) → mise à jour

    try {
      // client_key inclut child_id : deux profils du même parent peuvent avoir
      // le même commentaire sur le même jeu sans que l'un écrase l'autre.
      (JSON.parse(localStorage.getItem('maxplay_comments')) || []).forEach(cm => {
        if (!cm.text) return;
        comments.push({
          parent_id: _session.user.id, child_id: childId, game_id: cm.gameId || null,
          source: 'comment', text: String(cm.text).slice(0, 100000),
          client_key: 'c|' + (childId || '?') + '|' + (cm.gameId || '?') + '|' + (cm.date || '?'),
        });
      });
    } catch (e) {}

    try {
      // client_key de revue stable par (child, jeu) SANS hash du texte : une
      // édition MET À JOUR la ligne au lieu d'accumuler des versions périmées.
      const rv = JSON.parse(localStorage.getItem('maxplay_review_comments')) || {};
      Object.keys(rv).forEach(gid => {
        const txt = String(rv[gid] || '').trim();
        if (!txt) return;
        reviews.push({
          parent_id: _session.user.id, child_id: childId, game_id: gid,
          source: 'review', text: txt.slice(0, 100000),
          client_key: 'r|' + (childId || '?') + '|' + gid,
        });
      });
    } catch (e) {}

    if (comments.length) {
      const { error } = await c.from('annotations')
        .upsert(comments, { onConflict: 'parent_id,client_key', ignoreDuplicates: true });
      if (error) throw error;
    }
    if (reviews.length) {
      // ignoreDuplicates:false → le texte édité écrase l'ancien (même client_key).
      const { error } = await c.from('annotations')
        .upsert(reviews, { onConflict: 'parent_id,client_key', ignoreDuplicates: false });
      if (error) throw error;
    }
  }

  // ── Envoi direct d'un payload outil (duel, lecture…) ────────────────────
  // Remplace le copier-coller JSON : le résultat part en table annotations,
  // lisible par Claude via MCP. Dédup par hash du contenu.
  async function pushAnnotation(source, text, gameId) {
    if (!_session) return false;
    const c = await _getClient();
    const child = activeChild();
    const body = String(text || '');
    if (!body.trim()) return false;
    const { error } = await c.from('annotations').upsert([{
      parent_id: _session.user.id,
      child_id: child ? child.id : null,
      game_id: gameId || source,
      source,
      text: body.slice(0, 100000),   // garde-fou = contrainte DB annotations.text ≤ 100000
      client_key: source + '|' + (child ? child.id : '?') + '|' + _hash(body),
    }], { onConflict: 'parent_id,client_key', ignoreDuplicates: true });
    if (error) throw error;
    return true;
  }

  // ── Reset d'un profil enfant : ANONYMISE puis purge (fix audit RGPD) ──────
  // Appelle la RPC serveur reset_child_anonymized (migration 012) qui, en UNE
  // transaction : (1) agrège l'usage de l'enfant dans usage_stats_anon +
  // reset_events (stats ANONYMES, sans lien à l'enfant — permet de savoir
  // « combien de resets après une maj »), puis (2) SUPPRIME les lignes
  // nominatives (game_sessions/child_state/progression). Le droit à
  // l'effacement est honoré ET la statistique d'usage survit, désindexée.
  // La RPC vérifie l'ownership côté serveur (le caller doit être le parent).
  // En Mode 1 (pas de profil actif), no-op : le reset local seul suffit.
  async function resetChild() {
    if (!hasActiveChild()) return false;
    const c = await _getClient();
    const childId = activeChild().id;
    const { error } = await c.rpc('reset_child_anonymized', {
      p_child_id: childId,
      p_app_version: (global.MAXPLAY_VERSION || null),
    });
    if (error) throw error;
    _saveSyncMeta({});   // repart sur un baseline propre
    return true;
  }

  // Flush best-effort avant destruction de la page (fix audit : le push
  // débouncé 5s meurt si l'onglet ferme avant). Envoi keepalive qui survit
  // à l'unload — n'attend pas de réponse.
  function flushNow() {
    if (!hasActiveChild() && !_session) return;
    clearTimeout(_pushTimer);
    try { syncNow().catch(() => {}); } catch (e) {}
  }

  // ── Sync ────────────────────────────────────────────────────────────────
  async function syncNow() {
    // Parent connecté SANS profil enfant : on pousse quand même les
    // annotations (💬, notes de revue, duel/lecture) — le reste attend un profil.
    if (!hasActiveChild()) {
      if (!_session) return false;
      const c0 = await _getClient();
      try { await _flushAnnotations(c0); } catch (e) {}
      _lastSync = new Date().toISOString();
      _emit();
      return true;
    }

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

    // Étapes non-critiques : un échec n'invalide pas la sync progression
    try { await _syncStates(c, childId); } catch (e) {}
    try { await _flushSessions(c, childId); } catch (e) {}
    try { await _flushAnnotations(c); } catch (e) {}

    _lastSync = new Date().toISOString();
    _emit();
    return true;
  }

  // Push débouncé — appelé par tracker.js après chaque sauvegarde.
  // No-op total si pas de compte du tout / offline.
  function schedulePush() {
    if (!hasActiveChild() && !_session) return;
    clearTimeout(_pushTimer);
    _pushTimer = setTimeout(() => { syncNow().catch(() => {}); }, PUSH_DELAY);
  }

  function onChange(fn) { _listeners.push(fn); }

  // Flush au départ de la page (retour menu, fermeture PWA, bascule onglet).
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('pagehide', flushNow);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushNow();
    });
  }

  global.Cloud = {
    init, isConnected, hasActiveChild, status,
    signIn, verifyCode, signOut,
    listChildren, createChild, setActiveChild, activeChild,
    syncNow, schedulePush, pushAnnotation, onChange, resetChild, flushNow,
    _merge, _mergeState, // exposés pour les tests uniquement
  };

  init();
})(window);
