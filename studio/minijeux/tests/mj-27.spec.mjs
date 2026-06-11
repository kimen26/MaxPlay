// Pilote MJ-27 — Lis le nom du dino : LECTURE PURE (nom écrit + 6 images encyclo, aucun son d'aide).
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('DINOS chargé', await page.evaluate(() => typeof DINOS !== 'undefined' && DINOS.length > 10));
  ok('8 billes de progression (standard golden)', (await page.locator('.pip').count()) === 8);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

  await page.waitForSelector('#word', { timeout: 5000 });
  ok('un nom à lire est affiché', (((await page.locator('#word').textContent()) || '').trim().length > 1));

  await page.waitForSelector('.dino-card', { timeout: 5000 });
  ok('6 images de choix', (await page.locator('.dino-card').count()) === 6, `cards=${await page.locator('.dino-card').count()}`);
  ok('1 seule bonne réponse', (await page.locator('.dino-card[data-correct="1"]').count()) === 1);
  ok('toutes les cartes ont une image encyclo', await page.evaluate(() =>
    [...document.querySelectorAll('.dino-card img')].every(i => /^img\/dinos\/[^/]+\.png$/.test(i.getAttribute('src')))
  ));

  // Pas de TTS dans la page (lecture pure) : aucun appel TTS.speak ne doit exister
  ok('pas de dépendance TTS (lecture pure)', await page.evaluate(() => typeof TTS === 'undefined'));

  // Chemin gagnant
  for (let q = 0; q < 3; q++) {
    await page.waitForSelector('.dino-card[data-correct="1"]', { timeout: 4000 });
    await page.click('.dino-card[data-correct="1"]').catch(() => {});
    await page.waitForTimeout(1300);
  }
  const v1 = await page.locator('.pip.v1').count();
  ok('3 bonnes réponses → 3 billes vertes', v1 === 3, `billes vertes=${v1}`);
}
