// Pilote MJ-20 — Compte avec le monde : 3 modes (Apprendre / Quiz / Progression).
// Figée mj-20.md (2026-07-20) : gating par étoiles — 0★ = FR seul, quiz plafonné 1-5.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle v3 : s'ouvre TOUT SEUL à la 1ʳᵉ partie (gabarit mj-shell.js) → on ferme.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  // 🔒 Gating étoiles (0★ après localStorage.clear) : FR seul visible
  const nLangs = await page.locator('#langScroll .lang-btn').count();
  ok('🔒 0★ : un seul pays dans le sélecteur', nLangs === 1, `langs=${nLangs}`);
  ok('🔒 0★ : ce pays est le français', (await page.locator('#langScroll .lang-btn[data-code="fr"]').count()) === 1);

  // Mode Apprendre actif par défaut, grille de chiffres 1-10
  ok('mode Apprendre actif par défaut', (await page.locator('#modeLearn.active').count()) === 1);
  await page.waitForSelector('#learnGrid .num-btn', { timeout: 5000 });
  const nLearn = await page.locator('#learnGrid .num-btn').count();
  ok('grille Apprendre affichée (1-10 par défaut)', nLearn === 10, `n=${nLearn}`);

  // Bascule en mode Quiz → une question s'affiche avec choix
  await page.click('#modeQuiz');
  await page.waitForSelector('.choice-btn', { timeout: 5000 });
  const nChoices = await page.locator('.choice-btn').count();
  ok('choix quiz affichés', nChoices >= 2, `n=${nChoices}`);
  ok('1 seule bonne réponse', (await page.locator('.choice-btn[data-correct="1"]').count()) === 1);

  // 🔒 0★ : jamais « compter jusqu'à 10 direct » — chiffres du quiz plafonnés à 5
  const maxChoice = await page.evaluate(() =>
    Math.max(...[...document.querySelectorAll('.choice-btn')].map(b => parseInt(b.dataset.n, 10))));
  ok('🔒 0★ : chiffres du quiz ≤ 5', maxChoice <= 5, `max=${maxChoice}`);

  // Chemin gagnant : taper la bonne réponse 3 fois de suite → déblocage possible + score avance
  for (let i = 0; i < 3; i++) {
    await page.waitForSelector('.choice-btn[data-correct="1"]', { timeout: 4000 });
    await page.click('.choice-btn[data-correct="1"]');
    await page.waitForTimeout(2700); // enchaînement next round ~2600ms
  }
  const donePips = await page.locator('#pips .pip[class*="done-"]').count();
  ok('score avance après 3 bonnes réponses (3 billes golden marquées)', donePips === 3, `pips=${donePips}`);

  // ── Terminer les 10 manches → écran de fin STANDARD (plus d'écran maison) ──
  for (let i = 0; i < 7; i++) {
    await page.waitForSelector('.choice-btn[data-correct="1"]', { timeout: 4000 });
    await page.click('.choice-btn[data-correct="1"]');
    await page.waitForTimeout(2700);
  }
  await page.waitForSelector('.end-wrap', { timeout: 8000 });
  ok('écran de fin STANDARD (.end-wrap, plus d’écran maison)', (await page.locator('.end-wrap').count()) === 1);

  // ── Dead code retiré : plus d'ancien écran victoire maison ──
  ok('plus de #victoryScreen maison', (await page.locator('#victoryScreen').count()) === 0);
}
