// Pilote MJ-04 — gabarit standard + montée de niveau EP-112 (spec 2026-07-28).
// Partie 1 : enfant neuf → piste golden, 8 questions, manche parfaite → étoile,
//            écran de fin STANDARD (.end-wrap, 3 boutons).                (T9)
// Partie 2 : montée par COMPÉTENCE via historique fabriqué (T1) + garde-fous
//            T2 (perf moyenne), T3 (2 parties seulement), T4/T5 (jamais de descente).
export async function run({ page, ok }) {
  async function closeIntro() {
    const splash = page.locator('.mp-intro-splash');
    if (await splash.count()) await splash.click({ timeout: 1500 }).catch(() => {});
    await page.waitForSelector('.mp-intro-splash', { state: 'detached', timeout: 4000 }).catch(() => {});
    const ri = page.locator('#ri-panneau.on');
    if (await ri.count()) { await page.click('#ri-ok').catch(() => {}); await page.waitForTimeout(250); }
  }

  // ── T9 : enfant neuf, comportement standard ────────────────────────────
  await closeIntro();
  ok('piste golden présente (piste .pip)', (await page.locator('.pip').count()) === 8, `pips=${await page.locator('.pip').count()}`);
  ok('plus de bandeau levelbar maison', (await page.locator('#levelbar').count()) === 0);
  ok('niveau 1 pour un enfant neuf (T9)', (await page.evaluate(() => Golden.levelOf('mj-04', 2))) === 0);

  // 8 bonnes réponses du premier coup
  for (let i = 0; i < 8; i++) {
    await page.waitForSelector('.ch[data-correct="1"]:not(.ok):not(.ko)', { timeout: 6000 });
    await page.click('.ch[data-correct="1"]:not(.ok):not(.ko)');
    await page.waitForTimeout(1450);
  }

  await page.waitForSelector('.end-wrap', { timeout: 12000 });
  ok('écran de fin STANDARD (gabarit .end-wrap, plus d’écran maison)', (await page.locator('.end-wrap').count()) === 1);
  await page.waitForTimeout(2500);
  const stars = await page.evaluate(() => (window.Stars ? Stars.get('mj-04') : -1));
  ok('Stars.get(mj-04) === 1 après 1 manche parfaite', stars === 1, `stars=${stars}`);

  // ── Montée de niveau par compétence (historique fabriqué) ──────────────
  const lvl = await page.evaluate(() => {
    function fab(sessions) {
      localStorage.removeItem('golden_openlvl_mj-04');
      const data = { version: 1, games: {}, sessions: [] };
      data.games['mj-04'] = {
        plays: sessions.length, totalQuestions: 0, correctAnswers: 0, totalScore: 0, maxScore: 0,
        mastery: 'en-cours', firstPlayed: '2026-07-01T10:00:00Z', lastPlayed: '2026-07-01T10:00:00Z',
        history: sessions.map((s, i) => ({
          date: new Date(Date.parse('2026-07-20T10:00:00Z') + i * 3600e3).toISOString(),
          score: 0, maxScore: 80, correct: s.c, first: s.f, questions: s.q, duration: 120,
        })),
      };
      localStorage.setItem('maxplay_progress', JSON.stringify(data));
    }
    const out = {};
    // NB : correct=7 (une révélation) — correct>=questions donnerait une étoile
    // (stars.js compte "parfait" sur correct, pas sur premier coup) et fausserait le plancher.
    // T1 : 3 parties à 7/8 du premier coup, AUCUN sans-faute → niveau 2 (index 1)
    fab([{ c: 7, f: 7, q: 8 }, { c: 7, f: 7, q: 8 }, { c: 7, f: 7, q: 8 }]);
    out.t1 = Golden.levelOf('mj-04', 2);
    // T2 : 3 parties moyennes (5/8) → reste niveau 1 (index 0)
    fab([{ c: 6, f: 5, q: 8 }, { c: 6, f: 5, q: 8 }, { c: 6, f: 5, q: 8 }]);
    out.t2 = Golden.levelOf('mj-04', 2);
    // T3 : 2 parties excellentes seulement → reste niveau 1 (règle des 3)
    fab([{ c: 7, f: 7, q: 8 }, { c: 7, f: 7, q: 8 }]);
    out.t3 = Golden.levelOf('mj-04', 2);
    // T4 : niveau 2 ouvert PUIS 3 parties catastrophiques → ne redescend JAMAIS
    fab([{ c: 7, f: 7, q: 8 }, { c: 7, f: 7, q: 8 }, { c: 7, f: 7, q: 8 }]);
    Golden.levelOf('mj-04', 2);                        // ouvre le niveau (persisté)
    const d = JSON.parse(localStorage.getItem('maxplay_progress'));
    // 3 parties catastrophiques datées APRÈS l'ouverture (sinon elles seraient
    // simplement ignorées par la fenêtre "depuis la dernière ouverture")
    for (let i = 1; i <= 3; i++) {
      d.games['mj-04'].history.push({
        date: new Date(Date.now() + i * 60000).toISOString(),
        correct: 1, first: 0, questions: 8, score: 0, maxScore: 80, duration: 60,
      });
    }
    localStorage.setItem('maxplay_progress', JSON.stringify(d));
    out.t4 = Golden.levelOf('mj-04', 2);
    // T5 : l'étoile reste un plancher — le pilote n'abaisse jamais sous min(2, stars)
    out.t5 = Golden.levelOf('mj-04', 2) >= Math.min(2, (window.Stars ? Stars.get('mj-04') : 0));
    return out;
  });
  ok('T1 — 3 parties à 7/8 premier coup SANS sans-faute → niveau 2', lvl.t1 === 1, `lvl=${lvl.t1}`);
  ok('T2 — performance moyenne (5/8) → pas de montée', lvl.t2 === 0, `lvl=${lvl.t2}`);
  ok('T3 — 2 parties seulement → pas de montée (règle des 3)', lvl.t3 === 0, `lvl=${lvl.t3}`);
  ok('T4 — niveau ouvert + 3 parties ratées → JAMAIS de descente', lvl.t4 === 1, `lvl=${lvl.t4}`);
  ok('T5 — l’étoile reste un plancher', lvl.t5 === true);

  // ── T6 : niveau 2 en difficulté → sac allégé (au plus 2 questions dures) ──
  await page.evaluate(() => {
    localStorage.setItem('golden_openlvl_mj-04', JSON.stringify({ lvl: 1, at: Date.now() }));
    const data = { version: 1, games: {}, sessions: [] };
    data.games['mj-04'] = {
      plays: 3, history: [1, 2, 3].map(i => ({
        date: new Date(Date.parse('2026-07-20T10:00:00Z') + i * 3600e3).toISOString(),
        score: 0, maxScore: 80, correct: 4, first: 3, questions: 8, duration: 120,
      })),
    };
    localStorage.setItem('maxplay_progress', JSON.stringify(data));
    localStorage.removeItem('maxplay_resume_mj-04');
  });
  await page.reload({ waitUntil: 'networkidle' });
  await closeIntro();
  let st = await page.evaluate(() => window.__mjTest.state);
  const nHard = st.qLevels.filter(l => l >= st.level).length;
  ok('T6 — niveau 2 + <50% premier coup → sac allégé (≤2 dures sur 8)',
     st.level === 2 && st.qLevels.length === 8 && nHard <= 2, `level=${st.level} hard=${nHard}`);

  // ── T8 : la baisse est INVISIBLE — aucun texte niveau/difficulté à l'écran ──
  const visible = await page.evaluate(() => document.body.innerText.toLowerCase());
  ok('T8 — aucun mot "niveau/difficile/facile" affiché pendant la partie allégée',
     !/niveau|difficult|facile/.test(visible), visible.slice(0, 120));

  // ── T7 : 3 premiers coups justes d'affilée → les questions restantes durcissent ──
  await page.evaluate(() => {
    localStorage.setItem('golden_openlvl_mj-04', JSON.stringify({ lvl: 1, at: Date.now() }));
    localStorage.removeItem('maxplay_progress');   // pas d'historique → dosage 4/4
    localStorage.removeItem('maxplay_resume_mj-04');
  });
  await page.reload({ waitUntil: 'networkidle' });
  await closeIntro();
  for (let i = 0; i < 3; i++) {
    await page.waitForSelector('.ch[data-correct="1"]:not(.ok):not(.ko)', { timeout: 6000 });
    await page.click('.ch[data-correct="1"]:not(.ok):not(.ko)');
    await page.waitForTimeout(1450);
  }
  st = await page.evaluate(() => window.__mjTest.state);
  const restantes = st.qLevels.slice(st.questionCount);
  ok('T7 — 3 premiers coups justes → toutes les questions restantes au niveau courant',
     st.level === 2 && restantes.length > 0 && restantes.every(l => l === st.level),
     `level=${st.level} restantes=${JSON.stringify(restantes)}`);
}
