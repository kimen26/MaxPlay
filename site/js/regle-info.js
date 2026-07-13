// ─── RegleInfo v2 — bouton (?) unique : règle du jeu BIEN expliquée + avis ───
// Norme : studio/minijeux/docs/specs/NORME-i-REGLES.md (v2, Design System 2026-07)
//
// API (rétro-compatible v1) :
//   RegleInfo.init({ texte, picto, slug, etapes, etoiles })
//     texte   : l'accroche courte (1 phrase, gros, lue par le 🔊)
//     picto   : séquence emoji courte, ex "🚌➡️🚪"
//     slug    : optionnel — slug MP3 sounds/voix/phrases/ (voix réelle via
//               SoundPool.phrase, fallback TTS). Sans slug : TTS.
//     etapes  : optionnel — tableau de strings "comment on joue", chaque étape
//               commence idéalement par un emoji. 2-4 étapes, phrases courtes.
//     etoiles : optionnel — 1 phrase sur comment gagner l'étoile.
//
// Un SEUL bouton ❓ dans le header (décision Papa Yann 2026-07-13) :
// le panneau contient la règle détaillée + le bouton "💬 Ton avis" (parent),
// qui ouvre la modale Comments existante. comments.js n'injecte plus son
// bouton 💬 quand <body data-cmt-inpanel> est posé (fait ici automatiquement).

(function () {
  const STYLE_ID = 'regle-info-style';

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const css = `
      .hinfo {
        flex-shrink:0; width:40px; height:40px; border-radius:50%;
        background:rgba(255,255,255,0.09); color:#fff; border:none;
        font-family:'Fredoka One',sans-serif; font-weight:900; font-size:16px;
        display:flex; align-items:center; justify-content:center;
        cursor:pointer; padding:0;
      }
      .hinfo:active { background:rgba(255,255,255,0.3); }
      .ri-overlay {
        position:fixed; inset:0; background:rgba(0,0,0,0.75);
        display:flex; align-items:center; justify-content:center;
        z-index:200; opacity:0; visibility:hidden; transition:all 0.25s;
        padding:20px;
      }
      .ri-overlay.show { opacity:1; visibility:visible; }
      .ri-box {
        background:var(--card, #16213e);
        border-radius:24px; border:1px solid var(--line, rgba(255,255,255,0.12));
        padding:22px 20px 16px; text-align:center; max-width:360px; width:100%;
        max-height:86vh; overflow-y:auto;
      }
      .ri-picto { font-size:2.2rem; margin-bottom:10px; letter-spacing:4px; }
      .ri-text { color:var(--ink,#fff); font-size:1.12rem; font-weight:900; line-height:1.4; margin-bottom:6px;
                 font-family:'Fredoka One',cursive; font-weight:400; }
      .ri-etapes { text-align:left; margin:12px 2px 4px; display:flex; flex-direction:column; gap:9px; }
      .ri-etape { display:flex; gap:9px; align-items:flex-start;
                  background:rgba(255,255,255,0.05); border-radius:14px; padding:9px 12px;
                  color:var(--ink-2,#c3d0e8); font-size:0.95rem; font-weight:800; line-height:1.35; }
      .ri-etape .n { flex-shrink:0; width:22px; height:22px; border-radius:50%; margin-top:1px;
                     background:var(--accent-soft,rgba(127,180,255,.15)); color:var(--accent,#7fb4ff);
                     display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:900; }
      .ri-etoiles { display:flex; gap:9px; align-items:center; text-align:left;
                    background:var(--gold-soft,rgba(255,209,102,.14)); border-radius:14px;
                    padding:9px 12px; margin:9px 2px 4px;
                    color:var(--gold,#ffd166); font-size:0.92rem; font-weight:800; line-height:1.35; }
      .ri-actions { display:flex; align-items:center; justify-content:center; gap:14px; margin-top:14px; }
      .ri-btn-son {
        background:var(--ok,#00c47a); color:#fff; border:none;
        border-radius:50%; width:56px; height:56px; font-size:1.5rem;
        cursor:pointer; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;
      }
      .ri-btn-son:active { opacity:0.8; }
      .ri-btn-ok {
        border:none; border-radius:999px; height:46px; padding:0 26px; cursor:pointer;
        background:rgba(255,255,255,0.1); color:var(--ink,#fff);
        font-family:'Nunito',sans-serif; font-weight:900; font-size:1rem;
      }
      .ri-avis {
        margin-top:12px; border:none; background:none; cursor:pointer;
        color:var(--ink-3,#8fa5cc); font-family:'Nunito',sans-serif;
        font-weight:800; font-size:0.8rem; text-decoration:underline;
      }
    `;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function speak(texte) {
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(texte);
      u.lang = 'fr-FR';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } catch (e) {
      // fallback silencieux (EP-033 : jamais bloquer le jeu pour du son)
    }
  }

  function init({ texte, picto, slug, etapes, etoiles }) {
    injectStyle();

    // le 💬 vit DANS ce panneau → comments.js ne doit plus injecter le sien
    document.body.setAttribute('data-cmt-inpanel', '');
    const oldCmt = document.querySelector('.mpc-btn');
    if (oldCmt) oldCmt.remove();

    const hdr = document.querySelector('.hdr') || document.querySelector('.mp-header');
    if (!hdr) return;

    // Bouton ❓ unique dans le header
    const btn = document.createElement('button');
    btn.className = 'hinfo';
    btn.id = 'btn-regle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Règle du jeu');
    btn.textContent = '❓';
    hdr.appendChild(btn);

    const stepsHtml = (etapes && etapes.length)
      ? '<div class="ri-etapes">' + etapes.map((s, i) =>
          `<div class="ri-etape"><span class="n">${i + 1}</span><span>${s}</span></div>`).join('') + '</div>'
      : '';
    const starsHtml = etoiles
      ? `<div class="ri-etoiles"><span style="font-size:1.15rem">⭐</span><span>${etoiles}</span></div>`
      : '';

    // Modal
    const overlay = document.createElement('div');
    overlay.className = 'ri-overlay';
    overlay.id = 'ri-overlay';
    overlay.innerHTML = `
      <div class="ri-box">
        <div class="ri-picto">${picto || ''}</div>
        <div class="ri-text">${texte || ''}</div>
        ${stepsHtml}
        ${starsHtml}
        <div class="ri-actions">
          <button class="ri-btn-son" id="ri-btn-son" type="button" aria-label="Écouter la règle">🔊</button>
          <button class="ri-btn-ok" id="ri-btn-ok" type="button">C'est parti !</button>
        </div>
        <button class="ri-avis" id="ri-avis" type="button">💬 Donner un avis sur ce jeu (parents)</button>
      </div>
    `;
    document.body.appendChild(overlay);

    const open = () => overlay.classList.add('show');
    const close = () => overlay.classList.remove('show');

    btn.addEventListener('click', open);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('#ri-btn-ok').addEventListener('click', close);
    overlay.querySelector('#ri-btn-son').addEventListener('click', (e) => {
      e.stopPropagation();
      const full = [texte].concat(etapes || []).concat(etoiles ? [etoiles] : [])
        .join('. ').replace(/[\p{Extended_Pictographic}️‍]/gu, '');
      if (slug && window.SoundPool && SoundPool.phrase) SoundPool.phrase(slug, full);
      else speak(full);
    });
    overlay.querySelector('#ri-avis').addEventListener('click', (e) => {
      e.stopPropagation();
      close();
      if (window.Comments && Comments.open) Comments.open();
    });
  }

  window.RegleInfo = { init };
})();
