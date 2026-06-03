// ─────────────────────────────────────────────────────────────────────────
//  comments.js — Bouton commentaire dans chaque MJ
//  Permet au parent de noter en live ce qui marche / ce qui bug / idées.
//  Stockage : localStorage['maxplay_comments'] = [{ gameId, date, text }]
//  Injecte automatiquement un bouton 💬 à côté du ← dans le header.
//  Saisie texte + dictée vocale (Web Speech Recognition, fr-FR) si dispo.
// ─────────────────────────────────────────────────────────────────────────

(function() {
  const STORAGE_KEY = 'maxplay_comments';

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch(e) { return []; }
  }
  function save(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch(e) {}
  }

  function detectGameId() {
    const f = (location.pathname.split('/').pop() || '').replace('.html', '');
    return f || 'inconnu';
  }

  function addComment(text) {
    const trimmed = (text || '').trim();
    if (!trimmed) return false;
    const list = load();
    list.push({
      gameId: detectGameId(),
      date: new Date().toISOString(),
      text: trimmed,
    });
    save(list);
    return true;
  }

  // ── Styles (injectés 1 fois) ─────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('maxplay-comments-style')) return;
    const s = document.createElement('style');
    s.id = 'maxplay-comments-style';
    s.textContent = `
      .mpc-btn {
        display:inline-flex; align-items:center; justify-content:center;
        background:rgba(255,255,255,0.15); color:#fff; border:none;
        width:44px; height:44px; border-radius:50%;
        font-size:1.2rem; cursor:pointer; margin-left:6px;
        font-family:inherit;
      }
      .mpc-btn:hover { background:rgba(255,255,255,0.28); }
      .mpc-overlay {
        position:fixed; inset:0; background:rgba(0,0,0,0.7);
        display:none; align-items:center; justify-content:center;
        z-index:99999; padding:16px;
      }
      .mpc-overlay.show { display:flex; }
      .mpc-modal {
        background:#1a2a3d; color:#fff; border-radius:20px;
        padding:20px; width:100%; max-width:520px;
        box-shadow:0 8px 40px rgba(0,0,0,0.5);
        font-family:'Nunito',sans-serif;
      }
      .mpc-modal h3 {
        margin:0 0 4px; font-size:1.1rem; font-weight:900;
      }
      .mpc-modal .mpc-sub {
        font-size:0.82rem; opacity:0.6; margin-bottom:12px;
      }
      .mpc-modal textarea {
        width:100%; min-height:130px; border-radius:12px;
        border:1px solid rgba(255,255,255,0.15);
        background:rgba(0,0,0,0.3); color:#fff;
        padding:12px; font-family:inherit; font-size:1rem;
        resize:vertical; box-sizing:border-box;
      }
      .mpc-actions {
        display:flex; gap:8px; margin-top:12px; flex-wrap:wrap;
      }
      .mpc-actions button {
        flex:1; min-width:110px; border:none; border-radius:12px;
        padding:12px 14px; font-family:'Nunito',sans-serif;
        font-weight:900; font-size:0.95rem; cursor:pointer;
      }
      .mpc-mic { background:#ffe066; color:#1a2a3d; }
      .mpc-mic.rec { background:#ff4444; color:#fff; animation:mpcPulse 1s infinite; }
      .mpc-save { background:#00c47a; color:#fff; }
      .mpc-cancel { background:rgba(255,255,255,0.1); color:#fff; }
      @keyframes mpcPulse { 0%,100% { opacity:1 } 50% { opacity:0.55 } }
      .mpc-status { font-size:0.78rem; opacity:0.7; margin-top:8px; min-height:1em; }
      .mpc-toast {
        position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
        background:#00c47a; color:#fff; padding:12px 20px;
        border-radius:24px; font-weight:900; z-index:100000;
        opacity:0; transition:opacity 0.3s; pointer-events:none;
        font-family:'Nunito',sans-serif;
      }
      .mpc-toast.show { opacity:1; }
    `;
    document.head.appendChild(s);
  }

  // ── Modal ────────────────────────────────────────────────────────────────
  let overlay, textarea, micBtn, statusEl, recognition = null, recognizing = false;

  function buildModal() {
    overlay = document.createElement('div');
    overlay.className = 'mpc-overlay';
    overlay.innerHTML = `
      <div class="mpc-modal" role="dialog" aria-label="Commentaire">
        <h3>💬 Commentaire sur ce jeu</h3>
        <div class="mpc-sub">Ce que fait Max, bugs, idées — pour revue plus tard.</div>
        <textarea placeholder="Tape ou dicte ton commentaire…"></textarea>
        <div class="mpc-status"></div>
        <div class="mpc-actions">
          <button type="button" class="mpc-mic">🎤 Dicter</button>
          <button type="button" class="mpc-cancel">Annuler</button>
          <button type="button" class="mpc-save">💾 Enregistrer</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    textarea = overlay.querySelector('textarea');
    micBtn   = overlay.querySelector('.mpc-mic');
    statusEl = overlay.querySelector('.mpc-status');
    const cancelBtn = overlay.querySelector('.mpc-cancel');
    const saveBtn   = overlay.querySelector('.mpc-save');

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    cancelBtn.addEventListener('click', close);
    saveBtn.addEventListener('click', onSave);
    micBtn.addEventListener('click', toggleMic);
  }

  function open() {
    if (!overlay) buildModal();
    textarea.value = '';
    statusEl.textContent = '';
    overlay.classList.add('show');
    setTimeout(() => textarea.focus(), 50);
  }

  function close() {
    if (recognizing) stopMic();
    overlay && overlay.classList.remove('show');
  }

  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'mpc-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 300);
    }, 1600);
  }

  function onSave() {
    const ok = addComment(textarea.value);
    if (!ok) {
      statusEl.textContent = 'Commentaire vide.';
      return;
    }
    close();
    toast('💬 Commentaire enregistré');
  }

  // ── Dictée vocale ────────────────────────────────────────────────────────
  function getSR() {
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }

  function toggleMic() {
    if (recognizing) { stopMic(); return; }
    const SR = getSR();
    if (!SR) {
      statusEl.textContent = 'Dictée vocale non supportée sur ce navigateur. Tape le texte.';
      return;
    }
    try {
      recognition = new SR();
      recognition.lang = 'fr-FR';
      recognition.continuous = true;
      recognition.interimResults = true;

      let baseText = textarea.value.trim();
      if (baseText) baseText += ' ';

      recognition.onresult = (event) => {
        let finalT = '', interimT = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const r = event.results[i];
          if (r.isFinal) finalT += r[0].transcript;
          else interimT += r[0].transcript;
        }
        if (finalT) baseText += finalT + ' ';
        textarea.value = (baseText + interimT).trim();
      };

      recognition.onerror = (e) => {
        statusEl.textContent = 'Erreur micro : ' + (e.error || 'inconnue');
        stopMic();
      };

      recognition.onend = () => {
        recognizing = false;
        micBtn.classList.remove('rec');
        micBtn.textContent = '🎤 Dicter';
      };

      recognition.start();
      recognizing = true;
      micBtn.classList.add('rec');
      micBtn.textContent = '⏹ Stop';
      statusEl.textContent = 'Écoute… parle clairement en français.';
    } catch(e) {
      statusEl.textContent = 'Impossible de démarrer le micro.';
      recognizing = false;
    }
  }

  function stopMic() {
    try { recognition && recognition.stop(); } catch(e) {}
    recognizing = false;
    micBtn && micBtn.classList.remove('rec');
    if (micBtn) micBtn.textContent = '🎤 Dicter';
  }

  // ── Injection du bouton 💬 à côté du ← ──────────────────────────────────
  function injectButton() {
    const backLink = document.querySelector('a[href="index.html"]');
    if (!backLink || !backLink.parentNode) return;
    if (backLink.parentNode.querySelector('.mpc-btn')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mpc-btn';
    btn.title = 'Ajouter un commentaire';
    btn.setAttribute('aria-label', 'Ajouter un commentaire');
    btn.textContent = '💬';
    btn.addEventListener('click', open);
    backLink.parentNode.insertBefore(btn, backLink.nextSibling);
  }

  function init() {
    injectStyles();
    injectButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── API publique ─────────────────────────────────────────────────────────
  window.Comments = {
    open,
    add: addComment,
    getAll: load,
    clear: () => save([]),
    export: () => {
      const blob = new Blob([JSON.stringify(load(), null, 2)], { type:'application/json' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url;
      a.download = `maxplay-comments-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    },
  };
})();
