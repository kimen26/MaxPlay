// Pilote EP-038 — MJ-36 "Le bon bus !" (v2 Bus Jam, réécriture 2026-07-06)
// Vérifie : smoke console, bon bus -> passagers montent + progression,
// mauvais bus -> aucune perte (pas de régression d'état), palier vidé -> victoire.

export async function run({ page, ok }) {
  // Smoke : le hook de test est exposé
  const hasHook = await page.evaluate(() => !!window.__mjTest);
  ok('window.__mjTest exposé', hasHook);
  if (!hasHook) return;

  // État initial cohérent : une couleur est demandée, 3 bus garés
  const st0 = await page.evaluate(() => window.__mjTest.getState());
  ok('Couleur demandée initiale définie', !!st0.currentColor, `currentColor=${st0.currentColor}`);
  ok('3 bus garés au départ', st0.parkedColors.length === 3, `parkedColors=${st0.parkedColors}`);
  ok('Au moins un bus garé correspond à la couleur demandée',
     st0.parkedColors.includes(st0.currentColor));

  // ── Mauvais bus : aucune perte, aucune régression de progression ──
  const before = await page.evaluate(() => window.__mjTest.getState());
  const tappedBad = await page.evaluate(() => window.__mjTest.tapBadBus());
  ok('Tap mauvais bus possible (au moins 1 bus différent garé)', tappedBad);
  await page.waitForTimeout(500);
  const afterBad = await page.evaluate(() => window.__mjTest.getState());
  ok('Mauvais bus : progression inchangée (zéro pénalité)',
     afterBad.paxBoardedTotal === before.paxBoardedTotal);
  ok('Mauvais bus : couleur demandée inchangée', afterBad.currentColor === before.currentColor);
  ok('Mauvais bus : pas bloqué en "busy"', afterBad.busy === false);

  // ── Bon bus : les passagers montent, progression avance ──────────
  const beforeGood = await page.evaluate(() => window.__mjTest.getState());
  const tappedGood = await page.evaluate(() => window.__mjTest.tapGoodBus());
  ok('Tap bon bus déclenché', tappedGood);

  const boarded = await page.waitForFunction((prevTotal) => {
    return window.__mjTest.getState().paxBoardedTotal > prevTotal;
  }, beforeGood.paxBoardedTotal, { timeout: 5000 }).then(() => true).catch(() => false);
  ok('Passagers montent après bon bus (paxBoardedTotal augmente)', boarded);

  const unlocked = await page.waitForFunction(() => window.__mjTest.getState().busy === false,
    null, { timeout: 5000 }).then(() => true).catch(() => false);
  ok('Jeu débloqué (busy=false) après séquence de montée', unlocked);

  // ─── EP-068 : bouton règles (i) — composant partagé RegleInfo ───
  // Testé avant l'écran Bravo (overlay plein écran bloquerait le clic après victoire).
  ok('Bouton règles ❓ présent dans le header', await page.locator('#btn-regle').count() === 1);
  await page.click('#btn-regle');
  ok('Modal règle ouverte au tap', await page.locator('#ri-overlay.show').count() === 1);
  const regleTexteEarly = (await page.locator('.ri-text').textContent() || '').trim();
  ok('Texte de règle correspond', regleTexteEarly === 'Tape le bus de la même couleur que les passagers !', regleTexteEarly);
  await page.click('#ri-close'); // v3 : fermeture explicite ✕ (panneau bottom-sheet)
  ok('Modal règle fermée au tap', await page.locator('#ri-overlay.show').count() === 0);

  // ── Rejoue jusqu'à vider le palier 1 (★) pour valider la victoire ─
  let safety = 0;
  while (safety < 40) {
    const s = await page.evaluate(() => window.__mjTest.getState());
    if (s.queueGroupsLen === 0) break;
    await page.waitForFunction(() => window.__mjTest.getState().busy === false,
      null, { timeout: 5000 }).catch(() => {});
    await page.evaluate(() => window.__mjTest.tapGoodBus());
    await page.waitForTimeout(50);
    safety++;
  }
  const bravo = await page.waitForFunction(() => window.__mjTest.isBravoShown(),
    null, { timeout: 8000 }).then(() => true).catch(() => false);
  ok('Écran Bravo affiché après avoir vidé la file du palier ★', bravo);
}
