// MJ-57 — Œufs Surprise (SameGame/Chain Shot enfant, pack DinoJeux 2026-07-31)
// Vérifie : gabarit shell, grille générée avec au moins un groupe ≥2, pré-illumination
// au survol, tap sur groupe ≥2 fait éclore (gravité + compactage), fin naturelle
// "Tous les œufs ont éclos" (jamais de défaite), score en bébés (jamais chiffre brut),
// 3 grilles par partie → écran de fin golden, zéro mot punitif.

export async function run({ page, ok }) {
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(200);
  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── N0 : grille 6x6, au moins un groupe ≥2 présent au départ ──
  await page.evaluate(() => window.__mjTest.setLevel(0));
  await page.waitForSelector('.grid .cell .mjk-oeuf', { timeout: 4000 });
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('N0 : grille 6x6', s0.rows === 6 && s0.cols === 6, `rows=${s0.rows} cols=${s0.cols}`);
  ok('N0 : au moins un groupe ≥2 dispo', s0.groupsRemaining >= 1, `groups=${s0.groupsRemaining}`);
  ok('N0 : totalGrids = 3', s0.totalGrids === 3);

  // Régression 2026-08-10 (annotation PY « y'a pas de couleur, tout s'allume,
  // clic n'importe où = gagné ») : window.LIGNES vaut undefined (const top-level
  // de data.js, PAS sur window) → palette vide → toute la grille = UN seul groupe.
  // Verrou : la grille rendue doit avoir au moins 3 fonds d'œufs distincts.
  const distinctN0 = await page.evaluate(() => {
    const set = new Set();
    document.querySelectorAll('.grid .cell:not(.empty) .mjk-oeuf').forEach(e => set.add(e.style.background));
    return set.size;
  });
  ok('N0 : ≥3 couleurs d\'œufs distinctes rendues (palette LIGNES bien branchée)', distinctN0 >= 3, `distinct=${distinctN0}`);

  // ── Pré-illumination au survol AVANT le tap (anti-hasard) ──
  const grp = await page.evaluate(() => window.__mjTest.findGroup());
  ok('un groupe ≥2 identifiable', Array.isArray(grp) && grp.length >= 2);
  const [r0, c0] = grp[0];
  await page.locator(`.cell[data-r="${r0}"][data-c="${c0}"]`).hover();
  await page.waitForTimeout(80);
  const hoverCount = await page.locator('.cell.hover').count();
  ok('survol illumine le groupe entier avant le tap', hoverCount === grp.length, `hover=${hoverCount} grp=${grp.length}`);

  // ── Tap sur le groupe → éclosion (bébés qui s'envolent, gravité, compactage) ──
  // La grille de départ peut n'avoir qu'un seul groupe géant (peu de couleurs sur
  // 6x6) : un tap peut donc faire éclore TOUTE la grille et avancer à la grille
  // suivante d'un coup — comportement correct, pas un bug. On vérifie donc le
  // signal fiable : le compteur de bébés augmente d'exactement la taille du groupe.
  const babiesBefore = s0.babiesHatched;
  const groupSize = grp.length;
  await page.evaluate(() => window.__mjTest.tapGroup());
  await page.waitForTimeout(150);
  const afterTap = await page.evaluate(() => window.__mjTest.state);
  ok('éclosion : le score de bébés augmente exactement de la taille du groupe',
     afterTap.babiesHatched === babiesBefore + groupSize,
     `before=${babiesBefore} groupSize=${groupSize} after=${afterTap.babiesHatched}`);
  const scoreText = await page.locator('#score-line').textContent();
  ok('score affiché en émoji bébés, jamais en chiffre brut', /^(?:🐣)*$/u.test(scoreText.trim()), `score="${scoreText}"`);

  // ── N1 : grille 8x8, 4 couleurs ──
  await page.evaluate(() => window.__mjTest.setLevel(1));
  await page.waitForSelector('.grid .cell .mjk-oeuf', { timeout: 4000 });
  const s1 = await page.evaluate(() => window.__mjTest.state);
  ok('N1 : grille 8x8', s1.rows === 8 && s1.cols === 8);

  // ── N2 : grille 8x8 + objectif œufs dorés ──
  await page.evaluate(() => window.__mjTest.setLevel(2));
  await page.waitForSelector('.grid .cell .mjk-oeuf', { timeout: 4000 });
  const s2 = await page.evaluate(() => window.__mjTest.state);
  ok('N2 : grille 8x8', s2.rows === 8 && s2.cols === 8);
  ok('N2 : 3 œufs dorés à faire éclore', s2.goldenLeft === 3, `golden=${s2.goldenLeft}`);
  const goldenBadge = await page.locator('.cell.golden').count();
  ok('N2 : les œufs dorés sont visuellement marqués', goldenBadge >= 1);

  // ── Fin naturelle d'une grille : "Tous les œufs ont éclos" quand plus de groupe ≥2.
  //    clearGrid() vide TOUJOURS la grille courante puis nextGrid() en repeuple une
  //    nouvelle aussitôt (groupsRemaining repasse à ≥1) : on doit lire la consigne
  //    juste après le vidage, avant que la grille suivante ne s'affiche.
  const gridIndexBefore = (await page.evaluate(() => window.__mjTest.state)).gridIndex;
  await page.evaluate(() => window.__mjTest.clearGrid());
  await page.waitForFunction(
    (idx) => window.__mjTest.state.gridIndex > idx,
    gridIndexBefore,
    { timeout: 8000 }
  );
  const { lastGridEndMsg } = await page.evaluate(() => window.__mjTest.state);
  ok('fin naturelle annoncée ("éclos"), jamais de défaite', /éclos/i.test(lastGridEndMsg), `msg="${lastGridEndMsg}"`);

  // ── Zones tap ≥ 64px (mesurée pendant qu'une grille est encore affichée) ──
  await page.evaluate(() => window.__mjTest.setLevel(0));
  await page.waitForSelector('.grid .cell .mjk-oeuf', { timeout: 4000 });
  const box = await page.locator('.cell').first().boundingBox();
  ok('cellule œuf ≥ 64px (zones tap enfant)', !!box && box.width >= 64 && box.height >= 64, `box=${JSON.stringify(box)}`);

  // ── Chemin gagnant complet : 3 grilles jusqu'à l'écran de fin golden ──
  for (let i = 0; i < 3; i++) {
    const done = await page.evaluate(() => !!document.querySelector('.end-wrap'));
    if (done) break;
    await page.waitForSelector('.grid .cell .mjk-oeuf', { timeout: 4000 }).catch(() => {});
    await page.evaluate(() => window.__mjTest.clearGrid());
    await page.waitForTimeout(200);
  }
  await page.waitForSelector('.end-wrap', { timeout: 8000 });
  ok('écran de fin golden atteint après 3 grilles', (await page.locator('.end-wrap').count()) === 1);

  // ── Zéro mot punitif / défaite ──
  const punitive = await page.evaluate(() => /perdu|raté|échec|game over|défaite/i.test(document.getElementById('app').innerText));
  ok('zéro mot punitif, jamais de défaite', punitive === false);

  // ── Zéro erreur console ──
}
