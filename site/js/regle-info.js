// ─── RegleInfo v3 — le savant fou 🧑‍🔬 : panneau règle + avis (package v3) ───
// Norme : studio/minijeux/docs/specs/NORME-i-REGLES.md (v3, 2026-07-14)
// Modèle validé : studio/minijeux/inbox/package-maxplay-design/package-maxplay-designv3/minijeu.html
//
// UN SEUL bouton d'aide dans l'en-tête : le savant fou 🧑‍🔬 (bulle « ? »).
// Il ouvre un panneau à 2 onglets :
//   📖 La règle (couleur = --accent, le monde de l'enfant) :
//      « 🔊 Écoute toutes les règles » (bouton audio UNIQUE), étapes numérotées
//      avec 2ᵉ ligne d'explication, encadré or « comment gagner les étoiles »
//      (la légende vert/orange/rouge vit ICI, jamais dans l'écran de jeu).
//      S'ouvre TOUT SEUL à la 1ʳᵉ partie d'un jeu (localStorage).
//   💬 Avis (couleur = --parent, VIOLET FIXE) : coin parent seul
//      (texte + 🎙️ dicter → Comments + sync cloud). RGPD : rien demandé à l'enfant.
//
// API (rétro-compatible v1/v2) :
//   RegleInfo.init({ texte, picto, slug, etapes, etoiles, autoOpen })
//     texte   : l'accroche courte (1 phrase)
//     picto   : séquence emoji courte (affichée en tête de la règle)
//     slug    : optionnel — slug MP3 voix réelle (SoundPool.phrase, fallback TTS)
//     etapes  : tableau de strings OU de {t:"titre court", d:"explication"} (2-4)
//     etoiles : optionnel — phrase(s) en plus dans l'encadré or (la légende
//               ✓vert/✓orange/💡 + « tout vert = étoile » est TOUJOURS générée)
//     autoOpen: défaut true — ouverture auto à la 1ʳᵉ visite du jeu
//
// Styles : css/mp-theme.css (.mp-prof, .mp-voile, .mp-panneau…). Zéro dépendance dure.
// IDs conservés pour le harnais : #btn-regle (bouton) · #ri-overlay (voile, .show quand ouvert).

(function () {
  function gameId() {
    var f = (location.pathname.split('/').pop() || '').replace(/\.html?$/i, '');
    return f || 'page';
  }

  function speak(texte) {
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(texte);
      u.lang = 'fr-FR';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } catch (e) {
      // fallback silencieux (EP-033 : jamais bloquer le jeu pour du son)
    }
  }
  var EMOJI_RE = /[\p{Extended_Pictographic}️‍]/gu;

  function init(opts) {
    opts = opts || {};
    var texte = opts.texte || '';
    var etapes = (opts.etapes || []).map(function (e) {
      return (typeof e === 'string') ? { t: e, d: '' } : e;
    });

    // le 💬 vit DANS ce panneau → comments.js ne doit plus injecter le sien
    document.body.setAttribute('data-cmt-inpanel', '');
    var oldCmt = document.querySelector('.mpc-btn');
    if (oldCmt) oldCmt.remove();

    var hdr = document.querySelector('.hdr') || document.querySelector('.mp-header');
    if (!hdr) return;

    // ── bouton savant fou dans l'en-tête ─────────────────────────────
    var btn = document.createElement('button');
    btn.className = 'mp-prof';
    btn.id = 'btn-regle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Règle du jeu et avis');
    btn.innerHTML = '🧑‍🔬<span class="bulle">?</span>';
    hdr.appendChild(btn);

    // ── panneau ──────────────────────────────────────────────────────
    var stepsHtml = etapes.map(function (e, i) {
      return '<div class="etape"><div class="num">' + (i + 1) + '</div>'
        + '<div class="grow"><b>' + e.t + '</b>'
        + (e.d ? '<small>' + e.d + '</small>' : '') + '</div></div>';
    }).join('');

    var extraStar = opts.etoiles ? '<div class="li" style="color:var(--ink-2)">' + opts.etoiles + '</div>' : '';
    var gagnerHtml =
      '<div class="gagner">'
      + '<b style="font-size:12.5px;color:var(--gold)">Comment gagner les étoiles ? ★★★</b>'
      + '<div class="li"><i style="background:var(--ok);color:#fff">✓</i>juste du 1ᵉʳ coup = vert</div>'
      + '<div class="li"><i style="background:var(--retry);color:#3a2000">✓</i>juste après 1 essai = orange</div>'
      + '<div class="li"><i style="background:var(--helped);color:#fff">💡</i>avec de l\'aide = rouge doux</div>'
      + '<div class="li" style="color:var(--gold)">tout vert = l\'étoile de champion ⭐ !</div>'
      + extraStar
      + '</div>';

    var voile = document.createElement('div');
    voile.className = 'mp-voile';
    voile.id = 'ri-overlay';
    document.body.appendChild(voile);

    var pan = document.createElement('div');
    pan.className = 'mp-panneau';
    pan.id = 'ri-panneau';
    pan.innerHTML =
      '<div class="p-tabs">'
      + '<div class="p-badge">🧑‍🔬</div>'
      + '<span class="p-tab regle on" id="ri-tab-regle-btn">📖 La règle</span>'
      + '<span class="p-tab avis" id="ri-tab-avis-btn">💬 Avis</span>'
      + '<button class="p-close" id="ri-close" type="button" aria-label="Fermer">✕</button>'
      + '</div>'
      // onglet RÈGLE
      + '<div id="ri-tab-regle" style="display:flex;flex-direction:column;flex:1;overflow:hidden">'
      + '<div class="lire-tout" id="ri-btn-son"><i>🔊</i><b>Écoute toutes les règles</b></div>'
      + '<div class="p-corps">'
      + (opts.picto ? '<div style="text-align:center;font-size:1.5rem;letter-spacing:3px;padding:0">' + opts.picto + '</div>' : '')
      + (texte ? '<div class="ri-text" style="text-align:center;font-family:\'Fredoka One\',cursive;font-size:0.92rem;line-height:1.3;padding:0 4px">' + texte + '</div>' : '')
      + stepsHtml
      + gagnerHtml
      + '</div>'
      + '<div style="padding:8px 12px 12px">'
      + '<button class="mp-btn-primary" id="ri-ok" style="height:42px;font-size:13.5px" type="button">J\'ai compris ! 👍</button>'
      + '</div></div>'
      // onglet AVIS (violet parent fixe)
      + '<div id="ri-tab-avis" style="display:none;flex-direction:column;flex:1;overflow:hidden">'
      + '<div class="p-corps" style="padding-top:4px">'
      + '<div class="parent-box">'
      + '<b style="font-size:13px">👨‍👦 Coin des parents</b>'
      + '<button class="ri-pin" id="ri-pin" type="button" style="width:100%;height:44px;border:0;border-radius:12px;font-family:inherit;font-weight:900;font-size:13px;cursor:pointer;margin-bottom:8px">❤️ Mettre en favori</button>'
      + '<textarea id="ri-avis-txt" placeholder="Un bug ? Une idée ? Trop dur, trop facile ?…"></textarea>'
      + '<div style="display:flex;gap:8px">'
      + '<button class="dicter" id="ri-dicter" type="button" title="dicter au lieu d\'écrire">🎙️</button>'
      + '<button class="envoyer" id="ri-envoyer" type="button">Envoyer 📨</button>'
      + '</div>'
      + '<div class="muted" id="ri-avis-msg" style="min-height:16px;font-size:11px"></div>'
      + '</div>'
      + '<div class="muted" style="text-align:center;font-size:11px;line-height:1.5">rien n\'est demandé à l\'enfant — zéro donnée le concernant 👍</div>'
      + '</div></div>';
    document.body.appendChild(pan);

    function onglet(t) {
      document.getElementById('ri-tab-regle').style.display = t === 'regle' ? 'flex' : 'none';
      document.getElementById('ri-tab-avis').style.display = t === 'avis' ? 'flex' : 'none';
      document.getElementById('ri-tab-regle-btn').classList.toggle('on', t === 'regle');
      document.getElementById('ri-tab-avis-btn').classList.toggle('on', t === 'avis');
    }
    function ouvrir(t) {
      voile.classList.add('on', 'show');
      pan.classList.add('on');
      onglet(t || 'regle');
    }
    function fermer() {
      voile.classList.remove('on', 'show');
      pan.classList.remove('on');
      try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) {}
      stopMic();
    }

    btn.addEventListener('click', function () { ouvrir('regle'); });
    voile.addEventListener('click', fermer);
    document.getElementById('ri-close').addEventListener('click', fermer);
    document.getElementById('ri-ok').addEventListener('click', fermer);
    document.getElementById('ri-tab-regle-btn').addEventListener('click', function () { onglet('regle'); });
    document.getElementById('ri-tab-avis-btn').addEventListener('click', function () { onglet('avis'); });

    // 🔊 audio UNIQUE : accroche + étapes + « tout vert = étoile »
    document.getElementById('ri-btn-son').addEventListener('click', function () {
      var full = [texte]
        .concat(etapes.map(function (e) { return e.t + (e.d ? '. ' + e.d : ''); }))
        .concat(['Réponds juste du premier coup à toutes les questions pour gagner l\'étoile de champion !'])
        .join('. ').replace(EMOJI_RE, '');
      if (opts.slug && window.SoundPool && SoundPool.phrase) SoundPool.phrase(opts.slug, full);
      else speak(full);
    });

    // ── avis parent : envoi via Comments (localStorage + sync cloud) ──
    var txt = document.getElementById('ri-avis-txt');
    var msg = document.getElementById('ri-avis-msg');
    document.getElementById('ri-envoyer').addEventListener('click', function () {
      var ok = false;
      try { ok = window.Comments && Comments.add ? Comments.add(txt.value) : false; } catch (e) {}
      if (ok) {
        try { window.Cloud && Cloud.schedulePush && Cloud.schedulePush(); } catch (e) {}
        txt.value = '';
        msg.textContent = 'Merci ! Avis envoyé ✓';
      } else {
        msg.textContent = txt.value.trim() ? 'Oups, réessaie 🙏' : 'Écris (ou dicte) ton avis d\'abord 🙂';
      }
      setTimeout(function () { msg.textContent = ''; }, 2600);
    });

    // ❤️ « Mettre en favori » : épingle ce jeu dans la rangée du menu.
    // Autonome (lit/écrit maxplay_pins en direct) pour marcher sur toute page de jeu,
    // même sans pins.js chargé. Cap 5 (figée menu.md).
    var PIN_KEY = 'maxplay_pins', PIN_CAP = 5;
    var pinBtn = document.getElementById('ri-pin');
    function pinRead() {
      try { var a = JSON.parse(localStorage.getItem(PIN_KEY)); return Array.isArray(a) ? a : []; }
      catch (e) { return []; }
    }
    function pinWrite(a) {
      try { localStorage.setItem(PIN_KEY, JSON.stringify(a.slice(0, PIN_CAP))); } catch (e) {}
      try { window.Cloud && Cloud.schedulePush && Cloud.schedulePush(); } catch (e) {}
    }
    function pinPaint() {
      if (!pinBtn) return;
      var on = pinRead().indexOf(gameId()) !== -1;
      pinBtn.textContent = on ? '❤️ Retirer des favoris' : '❤️ Mettre en favori';
      pinBtn.style.background = on ? 'var(--heart, #ff4d6d)' : 'var(--accent-soft, rgba(255,255,255,.1))';
      pinBtn.style.color = on ? 'var(--heart-ink, #fff)' : 'var(--accent, #fff)';
    }
    if (pinBtn) {
      pinPaint();
      pinBtn.addEventListener('click', function () {
        var id = gameId(), a = pinRead(), i = a.indexOf(id);
        if (i !== -1) { a.splice(i, 1); pinWrite(a); pinPaint(); return; }
        if (a.length >= PIN_CAP) {
          msg.textContent = 'Déjà 5 jeux en avant — retires-en un d\'abord 🙂';
          setTimeout(function () { msg.textContent = ''; }, 2600);
          return;
        }
        a.push(id); pinWrite(a); pinPaint();
        msg.textContent = 'Ajouté aux favoris ❤️';
        setTimeout(function () { msg.textContent = ''; }, 2200);
      });
    }

    // 🎙️ dictée (Web Speech API, comme la modale Comments historique)
    var rec = null, recOn = false;
    var micBtn = document.getElementById('ri-dicter');
    function stopMic() {
      try { rec && rec.stop(); } catch (e) {}
      recOn = false;
      micBtn.classList.remove('rec');
    }
    micBtn.addEventListener('click', function () {
      if (recOn) { stopMic(); return; }
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) { msg.textContent = 'Dictée non dispo sur ce navigateur'; setTimeout(function () { msg.textContent = ''; }, 2200); return; }
      rec = new SR();
      rec.lang = 'fr-FR';
      rec.interimResults = false;
      rec.continuous = true;
      rec.onresult = function (ev) {
        for (var i = ev.resultIndex; i < ev.results.length; i++) {
          if (ev.results[i].isFinal) txt.value = (txt.value + ' ' + ev.results[i][0].transcript).trim();
        }
      };
      rec.onend = stopMic;
      rec.onerror = stopMic;
      try { rec.start(); recOn = true; micBtn.classList.add('rec'); } catch (e) { stopMic(); }
    });

    // ── ouverture AUTO à la 1ʳᵉ partie de ce jeu ──────────────────────
    // Par défaut : seulement pour les jeux passés au format v3 (etapes
    // détaillées). Les jeux encore en API v1 (texte seul) gardent le
    // comportement historique tant qu'ils ne sont pas migrés.
    var auto = (opts.autoOpen !== undefined) ? opts.autoOpen : etapes.length > 0;
    if (auto) {
      var key = 'mp_regle_vue_' + gameId();
      var seen = null;
      try { seen = localStorage.getItem(key); } catch (e) {}
      if (!seen) {
        try { localStorage.setItem(key, '1'); } catch (e) {}
        setTimeout(function () { ouvrir('regle'); }, 450);
      }
    }

    return { open: ouvrir, close: fermer };
  }

  window.RegleInfo = { init: init };
})();
