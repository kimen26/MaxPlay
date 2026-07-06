// Pilote MJ-34 — Le dépôt bloqué (Rush Hour bus). Smoke + chemin gagnant scripté
// via l'API window.__mjTest exposée par le jeu (state() + move(idx, deltaCells)).
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('API de test __mjTest exposée', await page.evaluate(() => !!window.__mjTest));

  const state0 = await page.evaluate(() => window.__mjTest.state());
  ok('Niveau 1 palier ★ = grille 4×4', state0.N === 4, `N=${state0.N}`);
  ok('tier=1, levelIdx=0 au démarrage', state0.tier === 1 && state0.levelIdx === 0);

  const maxCar0 = state0.cars[0];
  ok('Bus de Max (cars[0]) toujours horizontal', maxCar0.horiz === true);
  ok('Bus de Max présent visuellement (.is-max)', await page.locator('.car.is-max').count() === 1);
  ok('Flèche de sortie affichée', await page.locator('.exit-arrow').count() === 1);

  // Chemin gagnant scripté niveau 1 (tier ★, 3 coups BFS) :
  // A (idx1, vertical) descend de 1, puis Max (idx0) avance de 2 cases → sort.
  await page.evaluate(() => window.__mjTest.move(1, 1));
  await page.waitForTimeout(120);
  await page.evaluate(() => window.__mjTest.move(0, 2));
  await page.waitForTimeout(900); // laisse l'anim de sortie (620ms) + passage niveau 2 tourner

  const state1 = await page.evaluate(() => window.__mjTest.state());
  ok('Niveau 1 → niveau 2 après sortie du bus', state1.levelIdx === 1, `levelIdx=${state1.levelIdx}`);

  // Niveau 2 (3 coups) : A monte de 1, Max avance de 2.
  await page.evaluate(() => window.__mjTest.move(1, -1));
  await page.waitForTimeout(120);
  await page.evaluate(() => window.__mjTest.move(0, 2));
  await page.waitForTimeout(900);

  const state2 = await page.evaluate(() => window.__mjTest.state());
  ok('Niveau 2 → niveau 3 après sortie du bus', state2.levelIdx === 2, `levelIdx=${state2.levelIdx}`);

  // Niveau 3 (3 coups) : A (idx1, vertical) descend de 1, puis Max avance de 2.
  await page.evaluate(() => window.__mjTest.move(1, 1));
  await page.waitForTimeout(120);
  await page.evaluate(() => window.__mjTest.move(0, 2));
  await page.waitForTimeout(900);

  // Palier ★ terminé (3 niveaux) → écran de fin de palier affiché.
  const endShown = await page.waitForFunction(
    () => !!document.querySelector('.end-wrap'),
    null, { timeout: 3000 }
  ).then(() => true).catch(() => false);
  ok('Écran de fin de palier affiché après les 3 niveaux ★', endShown);

  ok('Étoile enregistrée (Tracker maxScore=score=1)', await page.evaluate(() => {
    const stats = Tracker.getStats();
    const g = stats.games['mj-34'];
    return !!g && g.totalScore >= 1 && g.maxScore >= 1 && g.totalScore === g.maxScore;
  }));

  // Zéro pénalité : un mouvement bloqué (bounce) ne doit jamais ajouter de classe "lost"/"error"
  ok('Aucun état punitif visible dans le DOM', await page.evaluate(() =>
    !document.querySelector('.lost, .error, .game-over, .perdu')));
}
