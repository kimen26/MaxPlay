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

  // Mutualisation UI (2026-08-01) : l'ancien overlay maison #victoryOverlay a
  // été retiré — la victoire réelle n'est qu'une célébration INTERMÉDIAIRE
  // (parade bus/dino) rendue inline dans #stage, qui enchaîne automatiquement
  // sur l'écran de fin STANDARD G.showEnd (.end-wrap), sans bouton local.
  await page.evaluate(() => window.__mjTest.forceVictory());
  await page.waitForSelector('.paint-scene', { timeout: 4000 });
  ok('célébration intermédiaire (parade) affichée inline', (await page.locator('.paint-scene').count()) === 1);
  ok('aucun overlay maison résiduel', (await page.locator('#victoryOverlay').count()) === 0);

  await page.waitForSelector('.end-wrap', { timeout: 15000 });
  ok('fin de partie STANDARD (.end-wrap) affichée après la parade', (await page.locator('.end-wrap').count()) === 1);

  // REC-M2 (recette 2026-09-19) : Stars.get('mj-18') retombait à 0 après une 2e
  // victoire — mj-18 n'appelle jamais G.notePip (pas un jeu à questions), donc
  // le Tracker.endSession(firstTry*10, totalQ*10) interne à G.showEnd() envoyait
  // toujours score=0 < maxScore : jamais "parfait" pour stars.js. Corrigé en
  // appelant nous-mêmes Tracker.endSession(1,1) dans showVictory(), comme le
  // prescrit la figée ("Étoile = puzzle résolu"). Ce test rejoue une 2e victoire
  // et vérifie que l'étoile cumule (1 -> 2), pas qu'elle retombe à 0.
  const stars1 = await page.evaluate(() => window.Stars ? Stars.get('mj-18') : -1);
  ok('1re victoire : 1 étoile enregistrée', stars1 === 1, `Stars.get=${stars1}`);

  await page.goto(page.url());
  await page.waitForTimeout(800);
  if (await page.locator('#ri-panneau.on').count()) {
    await page.click('#ri-ok');
    await page.waitForTimeout(250);
  }
  await page.evaluate(() => window.__mjTest.forceVictory());
  await page.waitForSelector('.end-wrap', { timeout: 15000 });
  const stars2 = await page.evaluate(() => window.Stars ? Stars.get('mj-18') : -1);
  ok('2e victoire : l’étoile cumule (2), ne retombe pas à 0', stars2 === 2, `Stars.get=${stars2}`);
}
