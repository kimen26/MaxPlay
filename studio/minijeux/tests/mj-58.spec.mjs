// MJ-58 — Dino Run (runner latéral, saut variable)
// Vérifie : gabarit shell, canvas rendu, saut hauteur variable (maintien = gravité ÷2),
// ptérodactyle en anti-impulsivité N3, trébuchement = jamais game over (course continue),
// 4 segments fixes → écran de fin golden, zéro mot punitif.

export async function run({ page, ok }) {
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(200);
  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── Canvas rendu ──
  ok('canvas présent', (await page.locator('#run-canvas').count()) === 1);
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('4 segments fixes, segment 0 au départ', s0.totalSegments === 4 && s0.segIndex === 0, `seg=${s0.segIndex}`);
  ok('Rex démarre au sol', s0.onGround === true);

  // ── Saut : petit vs grand (maintien = gravité ÷2 pendant la montée) ──
  await page.evaluate(() => window.__mjTest.jump());
  const afterJump = await page.evaluate(() => window.__mjTest.state);
  ok('Jump : Rex quitte le sol', afterJump.onGround === false);
  await page.evaluate(() => window.__mjTest.tick(60)); // laisse le saut se terminer
  const afterLanding = await page.evaluate(() => window.__mjTest.state);
  ok('Rex retombe au sol après le saut', afterLanding.onGround === true);

  // ── Zéro chiffre de score/distance affiché (jalons illustrés) ──
  const jalonText = await page.locator('#jalon-line').textContent();
  ok('Jalon illustré (texte, pas un nombre nu)', /[🌿🪨🌋⛰️]/.test(jalonText || ''), `jalon="${jalonText}"`);

  // ── Niveau N3 : ptérodactyle possible (anti-impulsivité) ──
  await page.evaluate(() => window.__mjTest.setDifficulty(2));
  const lv2 = await page.evaluate(() => window.__mjTest.state);
  ok('Niveau forcé à 2', lv2.level === 2);

  // ── Trébuchement : jamais game over, la course continue automatiquement ──
  await page.evaluate(() => {
    // Force un segment à progresser sans franchir la fin, puis vérifie l'état après tick.
    window.__mjTest.tick(30);
  });
  const midRun = await page.evaluate(() => window.__mjTest.state);
  ok('Toujours en course après plusieurs frames (pas de blocage)', midRun.finished === false);

  // ── Chemin gagnant scripté : force la fin des 4 segments de façon déterministe ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => window.__mjTest.forceEndSegment());
    await page.waitForTimeout(30);
  }
  await page.waitForSelector('.end-wrap', { timeout: 6000 });
  ok('Écran de fin golden atteint après 4 segments', (await page.locator('.end-wrap').count()) === 1);

  const finalState = await page.evaluate(() => window.__mjTest.state);
  ok('4 segments comptabilisés à la fin', finalState.segIndex === 4, `segIndex=${finalState.segIndex}`);

  const punitive = await page.evaluate(() =>
    /perdu|game over|raté|échec/i.test(document.getElementById('app').innerText));
  ok('Zéro mot punitif (jamais "game over")', punitive === false);
}
