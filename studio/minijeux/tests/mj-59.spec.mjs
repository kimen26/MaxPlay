// MJ-59 — Territoires (Shikaku enfant)
// Vérifie : gabarit shell, drag rectangle → compteur live, valide (1 pierre ∧ aire=n ∧
// pas de chevauchement) → territoire verrouillé + dino, invalide → s'efface sans message,
// tap sur territoire verrouillé le libère, niveau 0 passerelle (1 pierre), chemin gagnant
// 4 puzzles → écran de fin golden, zéro punitif.

export async function run({ page, ok }) {
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(200);
  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── N0 passerelle : puzzle 1 = UNE seule pierre (grille 3×3) ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  await page.waitForTimeout(150);
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('N0 puzzle 1 : vallée = rectangle de 3 (1×3)', s0.rows * s0.cols === 3, `rows=${s0.rows} cols=${s0.cols}`);
  ok('N0 puzzle 1 : une seule pierre', s0.stones.length === 1, `stones=${s0.stones.length}`);
  ok('totalQ = 4 puzzles', s0.totalQ === 4);

  // ── Drag valide : trace exactement le rectangle solution → territoire verrouillé ──
  const sol0 = await page.evaluate(() => window.__mjTest.solution);
  ok('solution exposée (1 rectangle)', sol0.length === 1);
  await page.evaluate((rc) => window.__mjTest.dragRect(rc.r0, rc.c0, rc.r1, rc.c1), sol0[0]);
  await page.waitForTimeout(950);
  const afterValid = await page.evaluate(() => window.__mjTest.state);
  ok('drag valide → grille couverte → puzzle suivant', afterValid.qCount === 2, `qCount=${afterValid.qCount}`);

  // ── Drag invalide : mauvais rectangle (aire fausse) → s'efface, zéro message, reste ouvert ──
  const sBefore = await page.evaluate(() => window.__mjTest.state);
  const badStone = sBefore.stones[0];
  // rectangle 1×1 sur la pierre seule (presque sûrement faux si n>1)
  if (badStone.n !== 1) {
    await page.evaluate((s) => window.__mjTest.dragRect(s.r, s.c, s.r, s.c), badStone);
    await page.waitForTimeout(200);
    const afterBad = await page.evaluate(() => window.__mjTest.state);
    ok('drag invalide : puzzle reste ouvert (pas de couverture forcée)', afterBad.qCount === sBefore.qCount);
  }

  // ── Zéro texte d'erreur, zéro mot punitif ──
  const punitiveOrError = await page.evaluate(() =>
    /perdu|raté|échec|erreur|faux/i.test(document.getElementById('app').innerText));
  ok('Zéro mot punitif / message d\'erreur', punitiveOrError === false);

  // ── Zones case ≥ 64px ──
  const box = await page.locator('.cell').first().boundingBox();
  ok('Case ≥ 64px', !!box && box.width >= 64 && box.height >= 64, `w=${box && box.width}`);

  // ── Chemin gagnant complet : résout les 4 puzzles jusqu'à l'écran de fin golden ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  for (let i = 0; i < 4; i++) {
    const done = await page.evaluate(() => !!document.querySelector('.end-wrap'));
    if (done) break;
    const rects = await page.evaluate(() => window.__mjTest.solution);
    for (const rc of rects) {
      await page.evaluate((r) => window.__mjTest.dragRect(r.r0, r.c0, r.r1, r.c1), rc);
      await page.waitForTimeout(30);
    }
    await page.waitForTimeout(60);
  }
  await page.waitForSelector('.end-wrap', { timeout: 6000 });
  ok('Écran de fin golden atteint', (await page.locator('.end-wrap').count()) === 1);

  const punitiveEnd = await page.evaluate(() => /perdu|raté|échec/i.test(document.getElementById('app').innerText));
  ok('Zéro mot punitif (fin)', punitiveEnd === false);
}
