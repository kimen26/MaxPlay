// Pilote MJ-31 — Le grand voyage du temps : associer un dino (ombre) à sa bande d'époque.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('DINOS chargé', await page.evaluate(() => typeof DINOS !== 'undefined' && DINOS.length >= 40));
  ok('Niveau 1 = 4 billes (standard golden : 4/6/8 selon etoiles)', (await page.locator('.pip').count()) === 4);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

  await page.waitForSelector('.band', { timeout: 5000 });
  const nBands = await page.locator('.band').count();
  ok('Niveau 1 (L0) = 4 bandes (pas de bande "avant les dinosaures")', nBands === 4, `bands=${nBands}`);
  ok('Pas de bande permien en niveau 1', (await page.locator('.band[data-periode="permien"]').count()) === 0);
  ok('1 seule bonne bande désignée', (await page.locator('.band[data-correct="1"]').count()) === 1);
  ok('ombre du dino affichée', await page.evaluate(() => {
    const img = document.querySelector('#dinoCard img');
    return !!img && img.getAttribute('src').includes('ombres') && img.getAttribute('src').includes('_ombre.png');
  }));
  ok('nom du dino écrit', (await page.textContent('#dinoName')).trim().length > 0);

  // Chemin gagnant : taper la bonne bande N fois de suite (N = questions niveau 1 = 4, standard golden)
  const totalQ = await page.locator('.pip').count();
  for (let q = 0; q < totalQ; q++) {
    // Attend que la bille courante avance au tour q (évite de re-cliquer sur un DOM périmé
    // juste avant que la finale météorite ne remplace la frise).
    await page.waitForFunction(
      (expected) => document.querySelectorAll('.pip.v1,.pip.v2,.pip.v3,.pip.v4').length === expected,
      q,
      { timeout: 4000 }
    );
    const meteorUp = await page.locator('.meteor-screen').count();
    if (meteorUp > 0) break; // finale démarrée plus tôt que prévu (ne devrait pas arriver avant la fin)
    const btn = page.locator('.band[data-correct="1"]');
    await btn.waitFor({ state: 'visible', timeout: 4000 });
    await btn.click();
    await page.waitForTimeout(3300); // laisse la vignette se poser + la phrase d'époque être dite
  }

  // Toutes les billes doivent être vertes (sans-faute)
  const v1 = await page.locator('.pip.v1').count();
  ok(`${totalQ} bonnes réponses → ${totalQ} billes vertes`, v1 === totalQ, `billes vertes=${v1}`);

  // Au moins une vignette de dino s'est posée dans une bande (frise peuplée)
  const nSlots = await page.locator('.band-slot').count();
  ok('la frise se peuple de vignettes posées', nSlots >= totalQ, `slots=${nSlots}`);

  // Traverse la finale météorite : 4 tableaux plein écran, un tap chacun
  for (let i = 0; i < 4; i++) {
    await page.waitForSelector('.meteor-screen', { timeout: 4000 });
    const n = await page.locator('.meteor-screen').count();
    ok(`tableau météorite ${i + 1}/4 affiché`, n === 1);
    await page.click('.meteor-screen');
    await page.waitForTimeout(300);
  }

  // Écran de fin standard golden atteint (étoile sans-faute)
  await page.waitForSelector('.end-wrap', { timeout: 4000 });
  ok('écran de fin affiché après la finale météorite', (await page.locator('.end-wrap').count()) === 1);
}
