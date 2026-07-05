// Pilote MJ-26 — Compte les dinos : compter les silhouettes affichées.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('data dinos chargée', await page.evaluate(() => typeof DINOS !== 'undefined' && DINOS.length >= 50));
  ok('Niveau 1 = 4 billes (standard golden : 4/6/8 selon etoiles)', (await page.locator('.pip').count()) === 4);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

  await page.waitForSelector('.play-area img.sil', { timeout: 5000 });
  await page.waitForSelector('.num-btn', { timeout: 5000 });

  // Niveau 1 = 1 à 3 dinos ; le bouton correct = nb réel de silhouettes
  const coherent = await page.evaluate(() => {
    const shown = document.querySelectorAll('.play-area img.sil').length;
    const good = parseInt(document.querySelector('.num-btn[data-correct="1"]').textContent, 10);
    return shown >= 1 && shown <= 3 && shown === good;
  });
  ok('nb affiché ∈ [1..3] et = bouton correct', coherent);
  ok('3 choix de nombres', (await page.locator('.num-btn').count()) === 3);
  ok('1 seul bouton correct', (await page.locator('.num-btn[data-correct="1"]').count()) === 1);

  // Chemin gagnant
  for (let q = 0; q < 3; q++) {
    await page.waitForSelector('.num-btn[data-correct="1"]', { timeout: 4000 });
    await page.click('.num-btn[data-correct="1"]').catch(() => {});
    await page.waitForTimeout(1800);
  }
  const v1 = await page.locator('.pip.v1').count();
  ok('3 bonnes réponses → 3 billes vertes', v1 === 3, `billes vertes=${v1}`);
}
