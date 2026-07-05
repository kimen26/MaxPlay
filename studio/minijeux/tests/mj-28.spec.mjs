// Pilote MJ-28 — La lampe du paléontologue : fouille une ombre au halo, puis QCM du nom.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('DINOS chargé', await page.evaluate(() => typeof DINOS !== 'undefined' && DINOS.length > 10));
  ok('Niveau 1 = 4 billes (standard golden : 4/6/8 selon etoiles)', (await page.locator('.pip').count()) === 4);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

  await page.waitForSelector('#digShadow', { timeout: 5000 });
  const shadowSrc = await page.getAttribute('#digShadow', 'src');
  ok('ombre chargée depuis _new-ombre', /_new-ombre\/.+_ombre\.png$/.test(shadowSrc || ''), shadowSrc);

  await page.waitForSelector('.name-btn', { timeout: 5000 });
  const n = await page.locator('.name-btn').count();
  ok('Niveau 1 = 3 choix', n === 3, `boutons=${n}`);
  ok('1 seule bonne réponse', (await page.locator('.name-btn[data-correct="1"]').count()) === 1);

  // Simule la lampe : bouge le "doigt" sur la zone de fouille (touchmove non dispo en mouse, on drive via mousedown+mousemove)
  const wrap = page.locator('#digWrap');
  const box = await wrap.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.4, { steps: 5 });
  await page.mouse.up();
  const touched = await page.evaluate(() => document.getElementById('digWrap').classList.contains('touched'));
  ok('la lampe réagit au mouvement (halo suit le doigt)', touched);

  const mx = await page.evaluate(() => document.getElementById('digWrap').style.getPropertyValue('--mx'));
  ok('position du halo mise à jour (--mx en px)', /px$/.test(mx), mx);

  // Chemin gagnant : 3 bonnes réponses → l'écran s'éclaire (classe revealed) + fait affiché
  for (let q = 0; q < 3; q++) {
    await page.waitForSelector('.name-btn[data-correct="1"]', { timeout: 4000 });
    await page.click('.name-btn[data-correct="1"]').catch(() => {});
    await page.waitForTimeout(300);
    const revealed = await page.evaluate(() => document.getElementById('digWrap').classList.contains('revealed'));
    ok(`question ${q + 1} : révélation couleur au bon clic`, revealed);
    await page.waitForTimeout(2200);
  }
  const v1 = await page.locator('.pip.v1').count();
  ok('3 bonnes réponses → 3 billes vertes', v1 === 3, `billes vertes=${v1}`);
}
