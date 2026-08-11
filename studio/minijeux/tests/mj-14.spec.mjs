// MJ-14 — La grille (Raven) : paliers = types de pattern (N1 = A seulement).
// Migré au gabarit mj-shell (2026-07-22) : panneau règle 🧑‍🔬 auto-ouvert à fermer d'abord.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(200);

  ok('piste golden (pips) présente', (await page.locator('#pips .pip').count()) === 8);

  await page.waitForSelector('.choice-btn', { timeout: 5000 });
  ok('choix affichés', (await page.locator('.choice-btn').count()) >= 2);

  // 🔒 Bandeau niveau (figée) — palier courant affiché (3★)
  const levelTxt = ((await page.locator('#levelbar').textContent()) || '').trim();
  ok('bandeau niveau affiché (Niveau 1 / 3 au départ)', levelTxt === 'Niveau 1 / 3', `levelbar="${levelTxt}"`);

  // ── Mode Dinos (ordre Papa Yann 2026-08-10, annotation #6309) ──
  // Ombres chinoises canon sur pastille couleur, mêmes patterns A/B/C/D.
  await page.click('#btn-mode-dino');
  await page.waitForSelector('.choice-btn[data-correct="1"]', { timeout: 6000 });
  const dinoCells = await page.locator('#grid .cell img').count();
  ok('mode Dinos : la grille affiche des ombres de dinos', dinoCells === 8, `imgs=${dinoCells}`);
  ok('mode Dinos : 3 choix dont 1 correct', (await page.locator('.choice-btn').count()) === 3
     && (await page.locator('.choice-btn[data-correct="1"]').count()) === 1);
  // Bonne réponse → case mystère révélée avec un badge dino
  await page.click('.choice-btn[data-correct="1"]');
  await page.waitForTimeout(300);
  const revealed = await page.locator('#grid .cell.flash-ok img').count();
  ok('mode Dinos : bonne réponse révèle la case mystère (badge dino)', revealed === 1);
  // Laisse le setTimeout(nextRound, 1100) de la bonne réponse se consommer AVANT
  // de changer de mode — sinon il avancerait d'une manche « gratuite » pendant
  // la manche parfaite mesurée ci-dessous et fausserait le compte des 8 manches.
  await page.waitForTimeout(1300);
  // Retour au mode Formes pour la manche parfaite mesurée
  await page.click('#btn-mode-shapes');
  await page.waitForSelector('.choice-btn[data-correct="1"]', { timeout: 6000 });

  // 8 manches parfaites (clique le bon motif en 1ʳᵉ tentative)
  for (let i = 0; i < 8; i++) {
    await page.waitForSelector('.choice-btn[data-correct="1"]', { timeout: 6000 });
    await page.click('.choice-btn[data-correct="1"]');
    await page.waitForTimeout(1250);
  }

  await page.waitForSelector('.end-wrap', { timeout: 6000 });
  ok('écran de fin golden affiché', (await page.locator('.end-wrap').count()) === 1);

  const stars = await page.evaluate(() => (window.Stars ? Stars.get('mj-14') : -1));
  ok('Stars.get(mj-14) === 1 après 1 manche parfaite (8/8)', stars === 1, `stars=${stars}`);

  const punitive = await page.evaluate(() => /perdu|raté|échec/i.test(document.getElementById('app').innerText));
  ok('zéro mot punitif', punitive === false);
}
