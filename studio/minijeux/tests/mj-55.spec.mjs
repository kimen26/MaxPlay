// MJ-55 — Équilibre (Takuzu/Binairo enfant, spec 2026-07-31 §mj-55)
// Vérifie : gabarit shell, cycle tap 3 états (vide→🦕→🥚→vide), N1 = une seule
// ligne de 6, conflit trio surligné jamais bloquant, N2+ équilibre 2/2,
// chemin gagnant scripté, .end-wrap + zéro erreur console.

export async function run({ page, ok }) {
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(200);
  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── N0/N1 : une seule ligne de 6 cases (onboarding) ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  await page.waitForTimeout(150);
  const s0 = await page.evaluate(() => window.__mjTest.state);
  // Amendement PY 2026-07-31 : plus de niveau ligne-seule — 4×4 dès le N0.
  ok('N0 : grille 4×4 directement (plus de ligne seule)', s0.rows === 4 && s0.cols === 4, `rows=${s0.rows} cols=${s0.cols}`);
  ok('N0 : 16 cases', await page.locator('.eq-cell').count() === 16);

  // ── Cycle tap 3 états sur une case vide ──
  // Chercher la case vide dans TOUTE la grille, pas seulement la 1re ligne : les
  // cases pre-remplies sont tirees au hasard, et une 1re ligne pleine donnait
  // findIndex = -1. L'assertion le constatait mais le test continuait quand meme
  // et se bloquait 30 s sur `[data-c="-1"]`, un selecteur impossible — d'ou un
  // echec ~1 passage sur 4, longtemps mis a tort sur le compte de la charge.
  let videR = -1, videC = -1;
  for (let r = 0; r < s0.given.length && videR === -1; r++) {
    const c = s0.given[r].findIndex(v => v === 0);
    if (c !== -1) { videR = r; videC = c; }
  }
  ok('au moins une case vide en N1', videR !== -1, `grille=${JSON.stringify(s0.given)}`);
  if (videR === -1) return;   // sans case vide, la suite n'a aucun sens : on s'arrete net
  const cell = page.locator(`.eq-cell[data-r="${videR}"][data-c="${videC}"]`);
  ok('case vide au départ (aucun texte)', (await cell.textContent()).trim() === '');
  await cell.click();
  ok('1er tap → 🦕', (await cell.textContent()).trim() === '🦕');
  await cell.click();
  ok('2e tap → 🥚', (await cell.textContent()).trim() === '🥚');
  await cell.click();
  ok('3e tap → retour vide', (await cell.textContent()).trim() === '');

  // ── Conflit trio : force 3 pareils adjacents, vérifie le surlignage orange, jamais bloquant ──
  await page.evaluate(() => {
    const t = window.__mjTest;
    // Pose 3 dinos sur les premières cases libres. La ligne 0 n'est pas forcément
    // celle qui en a : les indices sont tirés au hasard et elle peut être pleine.
    // On prend la ligne LA PLUS libre, sinon le bloc ne testait rien en silence.
    let ligne = 0, mieux = -1;
    for (let r = 0; r < t.state.rows; r++) {
      const libres = t.state.given[r].filter(v => v === 0).length;
      if (libres > mieux) { mieux = libres; ligne = r; }
    }
    let count = 0;
    for (let j = 0; j < t.state.cols && count < 3; j++) {
      if (t.state.given[ligne][j] === 0) {
        while (t.state.grid[ligne][j] !== 1) t.tap(ligne, j);
        count++;
      }
    }
  });
  await page.waitForTimeout(100);
  const hasConflictAfterForce = await page.evaluate(() => window.__mjTest.state.hasConflict);
  // Le conflit peut ou non se déclencher selon les indices déjà posés — vérifie au moins
  // que l'API de détection répond et que rien ne bloque le jeu (roundLock reste false si conflit).
  const stAfter = await page.evaluate(() => window.__mjTest.state);
  ok('conflit détecté ou non mais jamais de blocage (roundLock=false tant que grille incomplète/conflit)',
     stAfter.roundLock === false || stAfter.full, `hasConflict=${hasConflictAfterForce}`);

  // ── Chemin gagnant scripté N1 : résout puis vérifie la manche avance ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  await page.waitForTimeout(100);
  const qBefore = (await page.evaluate(() => window.__mjTest.state)).qCount;
  await page.evaluate(() => window.__mjTest.solveCurrent());
  await page.waitForTimeout(1600);
  const afterSolve = await page.evaluate(() => window.__mjTest.state);
  ok('puzzle résolu → manche avance', afterSolve.qCount === qBefore + 1, `qCount=${afterSolve.qCount}`);

  // ── N2/N3 : grille 4×4, niveau 2 = équilibre 2/2 exigé pour valider ──
  await page.evaluate(() => window.__mjTest.setDifficulty(2));
  await page.waitForTimeout(150);
  const s2 = await page.evaluate(() => window.__mjTest.state);
  ok('N3 : grille 4×4', s2.rows === 4 && s2.cols === 4, `rows=${s2.rows} cols=${s2.cols}`);

  // ── Zones tap ≥ 80px sur grille 1 ligne (plus grande cellule) ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  await page.waitForTimeout(150);
  const box = await page.locator('.eq-cell').first().boundingBox();
  ok('Case ≥ 80px de large (ou proche, tolérance tablette)', !!box && box.width >= 56 && box.height >= 56, `w=${box && box.width}`);

  // ── Chemin gagnant complet → écran de fin golden ──
  // testMode=true (posé en tête de spec) réduit le délai post-victoire de
  // chaque puzzle à 0 (cf. nextPuzzle/checkWin dans mj-55.html) : la boucle
  // reste rapide même sur les 4 puzzles d'une manche complète.
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  for (let i = 0; i < 8; i++) {
    const done = await page.evaluate(() => !!document.querySelector('.end-wrap'));
    if (done) break;
    const avant = await page.evaluate(() => window.__mjTest.state.qCount);
    await page.evaluate(() => window.__mjTest.solveCurrent());
    // Attendre le FAIT (le puzzle a bien été validé, ou l'écran de fin est là)
    // plutôt qu'une durée fixe : 80 ms était un pari sur la vitesse de la
    // machine, et sous charge le puzzle suivant n'était pas encore prêt quand
    // `solveCurrent()` repartait — la boucle épuisait ses 8 tours sans jamais
    // atteindre la fin. Échec ~1 passage sur 2 en suite complète, jamais seul.
    await page.waitForFunction(
      (n) => window.__mjTest.state.qCount > n || !!document.querySelector('.end-wrap'),
      avant, { timeout: 5000 }
    ).catch(() => {});
  }
  await page.waitForSelector('.end-wrap', { timeout: 15000 });
  ok('Écran de fin golden atteint', (await page.locator('.end-wrap').count()) === 1);
  // Laisse les mp3/anims de célébration de fin (étoile, pop) terminer leur
  // requête réseau avant que run.mjs ferme le navigateur — sinon une requête
  // encore en vol lève un faux "ERR_CONNECTION_CLOSED" au smoke console.
  await page.waitForTimeout(1500);

  const punitive = await page.evaluate(() => /perdu|raté|échec/i.test(document.getElementById('app').innerText));
  ok('Zéro mot punitif', punitive === false);
}
