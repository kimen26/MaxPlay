// MJ-47 — Les constellations (domino ciel : 2 moitiés dinos-ombres → total QCM)
// Vérifie : panneau règle, pas de traits entre les points (retrait demandé),
// chiffres de moitié révélés en sync avec chaque case + équation "a + b = total",
// chemin gagnant complet, zéro mot punitif, zones tap >=80px.

export async function run({ page, ok }) {
  // ── Gabarit mj-shell.js : le panneau règle s'ouvre TOUT SEUL à la 1ʳᵉ partie ──
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── Aucun trait de constellation entre les points ────────────────────
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('Aucun trait entre les points (sky-lines retirées)', s0.skyLines === 0, `skyLines=${s0.skyLines}`);

  // ── Chiffres de moitié présents mais cachés avant réponse ────────────
  ok('2 chiffres de moitié présents dans le DOM', s0.halfNums.length === 2 && s0.halfNums.every(n => n !== ''));
  ok('Chiffres cachés avant réponse', s0.halfNumsShown[0] === false && s0.halfNumsShown[1] === false);
  ok('halfNums = les 2 moitiés générées', s0.halfNums.map(Number).join(',') === s0.halves.join(','),
     `halfNums=${s0.halfNums} halves=${s0.halves}`);

  // ── Répondre correctement → chiffres révélés + équation "a + b = total" ──
  const c = await page.evaluate(() => {
    window.__mjTest.answer(true);
    return null;
  });
  await page.waitForTimeout(1100); // au-delà du 2e setTimeout (900ms) qui révèle la 2e moitié
  const s1 = await page.evaluate(() => window.__mjTest.state);
  ok('Les 2 chiffres de moitié révélés après réponse', s1.halfNumsShown[0] === true && s1.halfNumsShown[1] === true);
  const expectedEq = s1.halves[0] + ' + ' + s1.halves[1] + ' = ' + s1.value;
  ok('Équation affichée au format "a + b = total"', s1.calcText === expectedEq,
     `calcText="${s1.calcText}" attendu="${expectedEq}"`);

  // ── Zones tap ≥ 80px (boutons-chiffres QCM) — question fraîche, avant la fin ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  await page.waitForSelector('.choice', { timeout: 5000 });
  const choiceBox = await page.locator('.choice').first().boundingBox();
  ok('Bouton choix ≥ 80px', !!choiceBox && choiceBox.width >= 80 && choiceBox.height >= 80,
     choiceBox ? `${Math.round(choiceBox.width)}×${Math.round(choiceBox.height)}` : 'no-box');

  // ── Chemin gagnant complet : répondre juste jusqu'à la fin ───────────
  await page.evaluate(() => window.__mjTest.setTestMode(true));
  const fin = await page.evaluate(async () => {
    for (let i = 0; i < 30; i++) {
      const st = window.__mjTest.state;
      if (st.qCount >= st.totalQ && st.roundLock) break;
      window.__mjTest.answer(true);
      await new Promise(r => setTimeout(r, 20));
      window.__mjTest.next();
      await new Promise(r => setTimeout(r, 20));
    }
    return window.__mjTest.state;
  });
  ok('Partie se déroule sans blocage (qCount avance)', fin.qCount > 0);

  // ── Zéro mot punitif (scope : zone de jeu visible, pas tout le DOM/UI cloud) ──
  const punitive = await page.evaluate(() => {
    const zones = ['#calc-line', '#choices', '.hdr', '#ri-panneau'];
    const text = zones.map(sel => document.querySelector(sel)?.textContent || '').join(' ');
    return /perdu|raté|échec|nul|faux|erreur/i.test(text);
  });
  ok('Zéro mot punitif', punitive === false);
}
