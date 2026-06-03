// Pilote MJ-23 — Lis le mot (mot → image Twemoji, SANS audio).
// N1 + 8 bonnes réponses → manche parfaite → étoile dérivée.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Fermer le splash d'intro s'il est là
  const splash = page.locator('.mp-intro-splash');
  if (await splash.count()) await splash.click({ timeout: 1500 }).catch(() => {});
  await page.waitForSelector('.mp-intro-splash', { state: 'detached', timeout: 4000 }).catch(() => {});

  ok('bandeau Niveau présent', (await page.locator('#levelbar').count()) === 1);
  ok('démarre au Niveau 1', (((await page.locator('#levelbar').textContent()) || '').includes('Niveau 1')));
  ok('un mot est affiché', (((await page.locator('#word').textContent()) || '').trim().length) > 0);
  ok('4 images de choix', (await page.locator('#choices .ch').count()) === 4);

  // 8 manches parfaites (clique la bonne image à chaque fois)
  for (let i = 0; i < 8; i++) {
    await page.waitForSelector('.ch[data-correct="1"]', { timeout: 6000 });
    await page.click('.ch[data-correct="1"]');
    await page.waitForTimeout(1450);
  }

  ok('écran de fin affiché', (await page.locator('#end.show').count()) === 1);
  ok('manche parfaite → data-perfect=1', (await page.locator('#end').getAttribute('data-perfect')) === '1');

  const stars = await page.evaluate(() => (window.Stars ? Stars.get('mj-23') : -1));
  ok('Stars.get(mj-23) === 1 après 1 manche parfaite', stars === 1, `stars=${stars}`);
}
