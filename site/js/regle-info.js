// ─── RegleInfo — bouton (?) + modal règle du jeu ───
// Norme : studio/minijeux/docs/specs/NORME-i-REGLES.md
//
// API :
//   RegleInfo.init({ texte, picto })
//     texte : 1 phrase de règle max (string)
//     picto : séquence emoji courte, ex "🚌➡️🚪" (string)
//
// Injecte dans le header .hdr existant un bouton rond ❓ (à droite du titre)
// qui ouvre une modal légère : picto + phrase + bouton 🔊 (speechSynthesis,
// lecture UNIQUEMENT au tap, jamais auto). Fermeture par tap n'importe où.
// Zéro dépendance, vanilla.

(function () {
  const STYLE_ID = 'regle-info-style';

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const css = `
      .hinfo {
        flex-shrink:0; width:34px; height:34px; border-radius:50%;
        background:rgba(255,255,255,0.14); color:#fff; border:none;
        font-family:'Fredoka One',sans-serif; font-weight:900; font-size:1.05rem;
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
        background:linear-gradient(135deg,#1a1a2e,#16213e);
        border-radius:24px; border:2px solid rgba(255,255,255,0.12);
        padding:28px 22px; text-align:center; max-width:340px; width:100%;
      }
      .ri-picto { font-size:2.4rem; margin-bottom:14px; letter-spacing:4px; }
      .ri-text { color:#fff; font-size:1.15rem; font-weight:900; line-height:1.45; margin-bottom:20px; }
      .ri-btn-son {
        background:linear-gradient(135deg,#00c47a,#00a86b); color:#fff; border:none;
        border-radius:50%; width:56px; height:56px; font-size:1.5rem;
        cursor:pointer; display:inline-flex; align-items:center; justify-content:center;
      }
      .ri-btn-son:active { opacity:0.8; }
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

  function init({ texte, picto }) {
    injectStyle();

    const hdr = document.querySelector('.hdr');
    if (!hdr) return;

    // Bouton ❓ dans le header
    const btn = document.createElement('button');
    btn.className = 'hinfo';
    btn.id = 'btn-regle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Règle du jeu');
    btn.textContent = '❓';
    hdr.appendChild(btn);

    // Modal
    const overlay = document.createElement('div');
    overlay.className = 'ri-overlay';
    overlay.id = 'ri-overlay';
    overlay.innerHTML = `
      <div class="ri-box">
        <div class="ri-picto">${picto || ''}</div>
        <div class="ri-text">${texte || ''}</div>
        <button class="ri-btn-son" id="ri-btn-son" type="button" aria-label="Écouter la règle">🔊</button>
      </div>
    `;
    document.body.appendChild(overlay);

    const open = () => overlay.classList.add('show');
    const close = () => overlay.classList.remove('show');

    btn.addEventListener('click', open);
    overlay.addEventListener('click', close);
    overlay.querySelector('#ri-btn-son').addEventListener('click', (e) => {
      e.stopPropagation();
      speak(texte);
    });
  }

  window.RegleInfo = { init };
})();
