// Pilote MJ-34 — Le dépôt bloqué (Rush Hour bus). Smoke + chemin gagnant scripté
// via l'API window.__mjTest exposée par le jeu (state() + move(idx, deltaCells)).
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Migration gabarit mj-shell.js : panneau règle 🧑‍🔬 s'ouvre tout seul à la 1ʳᵉ partie
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

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

  // Juste après la sortie de Max (victoire détectée +160ms, exiting anim 620ms), l'évacuation
  // automatique des autres bus doit démarrer (fix feedback Papa Yann : "un seul bus sauvé ça
  // fait bizarre" → le dépôt se vide tout seul).
  await page.waitForTimeout(950);
  const evacFlag = await page.evaluate(() => window.__mjTest.state().evacuating);
  ok('Évacuation auto des autres bus déclenchée après la sortie de Max', evacFlag === true, `evacuating=${evacFlag}`);
  ok('Au moins un bus restant a la classe .leaving pendant l\'évacuation',
    await page.locator('.car.leaving').count() >= 1);

  await page.waitForTimeout(1000); // laisse l'évacuation (niveau 1 = 2 autres bus) + passage niveau 2 tourner

  const state1 = await page.evaluate(() => window.__mjTest.state());
  ok('Niveau 1 → niveau 2 après sortie du bus', state1.levelIdx === 1, `levelIdx=${state1.levelIdx}`);

  // Niveau 2 (3 coups) : A monte de 1, Max avance de 2.
  await page.evaluate(() => window.__mjTest.move(1, -1));
  await page.waitForTimeout(120);
  await page.evaluate(() => window.__mjTest.move(0, 2));
  await page.waitForTimeout(2500);

  const state2 = await page.evaluate(() => window.__mjTest.state());
  ok('Niveau 2 → niveau 3 après sortie du bus', state2.levelIdx === 2, `levelIdx=${state2.levelIdx}`);

  // Niveau 3 (3 coups) : A (idx1, vertical) descend de 1, puis Max avance de 2.
  await page.evaluate(() => window.__mjTest.move(1, 1));
  await page.waitForTimeout(120);
  await page.evaluate(() => window.__mjTest.move(0, 2));
  await page.waitForTimeout(2500);

  // Palier ★ terminé (3 niveaux) → écran de fin de palier affiché.
  const endShown = await page.waitForFunction(
    () => !!document.querySelector('.end-wrap'),
    null, { timeout: 8000 }
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

  // ─── EP-068 : bouton règles (i) — composant partagé RegleInfo ───
  ok('Bouton règles ❓ présent dans le header', await page.locator('#btn-regle').count() === 1);
  await page.click('#btn-regle');
  ok('Modal règle ouverte au tap', await page.locator('#ri-overlay.show').count() === 1);
  const regleTexte = (await page.locator('.ri-text').textContent() || '').trim();
  ok('Texte de règle correspond', regleTexte === 'Fais glisser les bus pour libérer le bus jaune !', regleTexte);
  await page.click('#ri-close'); // v3 : fermeture explicite ✕ (panneau bottom-sheet)
  ok('Modal règle fermée au tap', await page.locator('#ri-overlay.show').count() === 0);
}
