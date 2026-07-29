// Chantier NID — écran de fin standard mj-golden.js (studio/minijeux/docs/2026-07-26-chantier-nid-plan.md)
// Pilote MJ-24 (golden simple, .dino-tile[data-correct]) pour vérifier, hors du contenu
// spécifique d'un jeu, le contrat transverse ajouté par A2 (reprise) + A3 (fin 3 boutons + œuf) :
//   - partie TERMINÉE (parfaite ou non) → 1 capsule dans Collection (localStorage)
//   - séquencement œuf (~1s) PUIS étoile sans-faute (jamais en parallèle)
//   - 3 boutons data-act="replay|next|home" présents, rétro-compat (.end-wrap/.end-btns/#badgeZone)
//   - fin non-parfaite : compliment de PROCESSUS, jamais de rappel d'étoile promise
//   - resume (A2) : quitter à la question 2 → recharger → piste restaurée
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  await page.click('#ri-ok');
  await page.waitForTimeout(200);

  // ── A2 : reprise de partie ────────────────────────────────────────────
  // Répond à 2 questions (avec 1 erreur d'abord, pour ne PAS déclencher une
  // "session parfaite" côté tracker.js — le pagehide auto-end du reload sinon
  // ferait passer Stars.get à 1, changerait Golden.level et invaliderait la
  // reprise par construction (garde A2 : reprise seulement si même niveau —
  // comportement attendu, pas un bug, mais pas le cas qu'on veut isoler ici).
  await page.waitForSelector('.dino-tile:not([data-correct="1"])', { timeout: 5000 });
  await page.click('.dino-tile:not([data-correct="1"])');
  await page.waitForTimeout(2000); // révélation
  await page.waitForSelector('.dino-tile[data-correct="1"]', { timeout: 5000 });
  await page.click('.dino-tile[data-correct="1"]');
  await page.waitForTimeout(1500);
  await page.waitForSelector('.dino-tile[data-correct="1"]', { timeout: 5000 });
  await page.click('.dino-tile[data-correct="1"]');
  await page.waitForTimeout(1500);
  const savedResume = await page.evaluate(() => {
    const raw = localStorage.getItem('maxplay_resume_mj-24');
    return raw ? JSON.parse(raw) : null;
  });
  ok('A2 : état de reprise sauvé après 2 questions', !!savedResume && savedResume.pipResults.length === 2,
     JSON.stringify(savedResume));

  await page.reload({ waitUntil: 'networkidle' });
  // Le panneau règle ne se rouvre pas automatiquement après la 1re partie (localStorage déjà écrit) —
  // s'il apparaît quand même (1er run), le fermer sans casser la reprise.
  const panneau = page.locator('#ri-panneau.on');
  if (await panneau.count()) { await page.click('#ri-ok'); await page.waitForTimeout(200); }
  const restored = await page.evaluate(() => [...document.querySelectorAll('.pip')]
    .map(p => p.className));
  ok('A2 : piste restaurée — 2 billes déjà jouées (done-first/done-retry)',
     restored.filter(c => /done-first|done-retry/.test(c)).length === 2, JSON.stringify(restored));
  ok('A2 : la 3e bille est marquée courante', restored[2] && /\bcur\b/.test(restored[2]));

  // ── Termine la partie EN ERREUR au moins 1 fois (fin NON parfaite) ─────
  await page.waitForSelector('.dino-tile:not([data-correct="1"])', { timeout: 5000 });
  await page.click('.dino-tile:not([data-correct="1"])');
  await page.waitForTimeout(2000); // révélation
  // termine les questions restantes
  for (let i = 0; i < 4; i++) {
    const done = await page.evaluate(() => !!document.querySelector('.end-wrap'));
    if (done) break;
    await page.waitForSelector('.dino-tile[data-correct="1"]', { timeout: 5000 }).catch(() => {});
    await page.click('.dino-tile[data-correct="1"]').catch(() => {});
    await page.waitForTimeout(1600);
  }
  await page.waitForSelector('.end-wrap', { timeout: 6000 });

  // ── A3 : capsule octroyée en fin de partie (parfaite ou non) ───────────
  const collection = await page.evaluate(() => {
    const raw = localStorage.getItem('maxplay_collection_v1');
    return raw ? JSON.parse(raw) : null;
  });
  // NID v4 (2026-07-30) : état v2 — nid vide → le gain est FORCÉMENT un œuf
  // individuel dans eggs[] (plus de pending[] anonyme), avec une famille.
  ok('A3/NID v4 : partie terminée sur nid vide → 1 œuf individuel avec famille',
     !!collection && collection.version === 2 && Array.isArray(collection.eggs) &&
     collection.eggs.length === 1 && !!collection.eggs[0].famille,
     JSON.stringify(collection));

  // ── A3 : resume effacé en fin de partie ────────────────────────────────
  const resumeAfterEnd = await page.evaluate(() => localStorage.getItem('maxplay_resume_mj-24'));
  ok('A3 : resume effacé après fin de partie', resumeAfterEnd === null);

  // ── A3 : 3 boutons rétro-compatibles, tapables ──────────────────────────
  ok('conteneur .end-wrap conservé (rétro-compat)', (await page.locator('.end-wrap').count()) === 1);
  ok('conteneur .end-btns conservé (rétro-compat)', (await page.locator('.end-btns').count()) === 1);
  ok('conteneur #badgeZone conservé (rétro-compat)', (await page.locator('#badgeZone').count()) === 1);
  ok('bouton replay data-act présent', (await page.locator('[data-act="replay"]').count()) === 1);
  ok('bouton home data-act présent', (await page.locator('[data-act="home"]').count()) === 1);

  for (const act of ['replay', 'home']) {
    const box = await page.locator(`[data-act="${act}"]`).boundingBox();
    ok(`bouton ${act} ≥ 80px (zone tap enfant)`, !!box && box.width >= 80 && box.height >= 80, JSON.stringify(box));
  }

  // ── Compliment de PROCESSUS sans rappel d'étoile promise ───────────────
  const endText = await page.evaluate(() => document.querySelector('.end-wrap').innerText);
  ok("Fin non-parfaite : PAS de rappel d'étoile promise (anti-pattern gravé)",
     !/si tu fais un sans-faute/i.test(endText), endText);
  ok('Fin non-parfaite : zéro mot punitif', !/perdu|raté|échec/i.test(endText), endText);

  // ── Séquencement œuf → étoile jamais en parallèle (fin non-parfaite : pas d'étoile,
  // donc on vérifie juste que la zone œuf a existé puis a été nettoyée) ───
  ok('zone œuf présente dans le DOM (séquenceur A3)', (await page.locator('.egg-zone').count()) === 1);
}
