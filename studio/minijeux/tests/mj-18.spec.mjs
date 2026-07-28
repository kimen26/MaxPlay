// Pilote MJ-18 — Tubes de couleurs : paliers = nb de couleurs (N1 = 2 couleurs → 4 tubes).
// Résolution du puzzle trop fragile à scripter → on valide la structure du palier + smoke.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle v3 : s'ouvre TOUT SEUL à la 1ʳᵉ partie (gabarit mj-shell.js) → on ferme.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('bandeau Niveau présent', (await page.locator('#lvlVal').count()) === 1);
  ok('démarre au Niveau 1', (((await page.locator('#lvlVal').textContent()) || '').trim() === '1'));

  await page.waitForSelector('.tube', { timeout: 5000 });
  const tubes = await page.locator('.tube').count();
  ok('Niveau 1 = 2 couleurs → 4 tubes (2 + 2 vides)', tubes === 4, `tubes=${tubes}`);

  const cnt = ((await page.locator('#tubeCountVal').textContent()) || '').trim();
  ok('compteur couleurs = 2', cnt === '2', `cnt=${cnt}`);

  // Migration gabarit (fin de partie STANDARD) : la victoire réelle n'est
  // qu'une célébration INTERMÉDIAIRE (parade bus/dino) — la fin de partie doit
  // passer par G.showEnd (.end-wrap), jamais par un overlay maison figé.
  await page.evaluate(() => window.__mjTest.forceVictory());
  await page.waitForSelector('#victoryOverlay.show', { timeout: 4000 });
  ok('célébration intermédiaire (parade) affichée', (await page.locator('#victoryOverlay.show').count()) === 1);

  await page.click('#paintContinueBtn');
  await page.waitForSelector('.end-wrap', { timeout: 4000 });
  ok('fin de partie STANDARD (.end-wrap) affichée après la parade', (await page.locator('.end-wrap').count()) === 1);
  ok('overlay maison refermé (pas de doublon avec .end-wrap)', (await page.locator('#victoryOverlay.show').count()) === 0);
}
