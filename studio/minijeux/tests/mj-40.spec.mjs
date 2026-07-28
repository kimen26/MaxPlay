// MJ-40 — Tangram des dinos
// Smoke console + placement scripté via __mjTest.place() + enchaînement des 3 figures du palier ★.

export async function run({ page, ok }) {
  // Panneau règle v3 (savant fou 🧑‍🔬) : s'ouvre TOUT SEUL à la 1ʳᵉ partie (gabarit
  // mj-shell) → on vérifie puis on le ferme pour dérouler le jeu.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  // ── État initial ────────────────────────────────────────────────────
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('7 pièces de tangram présentes', s0.totalPieces === 7 && s0.pieceNames.length === 7);
  ok('Palier initial = ★ (tier 1), figure 1 chargée', s0.currentTier === 1 && s0.placedCount === 0);

  const trayPieces = await page.locator('#tray-svg .piece').count();
  ok('Les 7 pièces sont dans le plateau bas', trayPieces === 7);

  // ── Zones tap : pièces du plateau assez grosses ─────────────────────
  const box = await page.locator('#tray-svg .piece').first().boundingBox();
  ok('Pièce du plateau visible et saisissable', !!box && box.width > 20 && box.height > 10);

  // ─── Bouton règles 🧑‍🔬 (savant fou) — composant partagé RegleInfo v3 ───
  // Testé AVANT le chemin gagnant : l'écran de fin de palier remplace #app (donc le header).
  ok('Bouton règles présent dans le header', await page.locator('#btn-regle').count() === 1);
  await page.click('#btn-regle');
  ok('Panneau règle ouvert au tap', (await page.locator('#ri-panneau.on').count()) === 1);
  const regleTexte = (await page.locator('.ri-text').textContent() || '').trim();
  ok('Texte de règle correspond', regleTexte === 'Place les 7 pièces sur la silhouette du dino !', regleTexte);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('Panneau règle refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  // ── Placement d'une seule pièce ─────────────────────────────────────
  const placed1 = await page.evaluate(() => window.__mjTest.place('bigTri1'));
  const s1 = await page.evaluate(() => window.__mjTest.state);
  ok('place(bigTri1) accepté', placed1 === true);
  ok('1 pièce posée et verrouillée', s1.placedCount === 1 && s1.piecesState.bigTri1.locked === true);

  // ── Compléter la figure 1 ───────────────────────────────────────────
  await page.evaluate(() => window.__mjTest.placeAll());
  const s2 = await page.evaluate(() => window.__mjTest.state);
  ok('Figure 1 complète (7/7)', s2.placedCount === 7);

  const eyesVisible = await page.evaluate(() =>
    document.getElementById('victory-eyes').getAttribute('opacity') === '1');
  ok('La silhouette prend vie (yeux visibles)', eyesVisible);

  // auto-avance vers la figure 2 après ~1.4s
  await page.waitForTimeout(1800);
  const s3 = await page.evaluate(() => window.__mjTest.state);
  ok('Figure 2 chargée automatiquement', s3.currentFigureIdx !== s2.currentFigureIdx && s3.placedCount === 0);
  ok('Étoile du palier comptée', s3.starsPerTier[1] >= 1);

  // ── Compléter les figures 2 et 3 → écran de fin de palier ───────────
  await page.evaluate(() => window.__mjTest.placeAll());
  await page.waitForTimeout(1800);
  await page.evaluate(() => window.__mjTest.placeAll());
  await page.waitForTimeout(1800);

  const endVisible = await page.evaluate(() => !!document.querySelector('.end-wrap'));
  ok('Écran de fin de palier golden affiché', endVisible);

  const s4 = await page.evaluate(() => window.__mjTest.state);
  ok('3 étoiles du palier ★', s4.starsPerTier[1] === 3);
}
