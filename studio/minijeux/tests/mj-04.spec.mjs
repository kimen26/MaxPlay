// Pilote MJ-04 — contrat de difficulté : bandeau niveau, manche parfaite → étoile.
// Joue 6 questions en cliquant la bonne réponse (data-correct="1") → écran de fin
// "parfait" → Stars.get('mj-04') passe à 1 (dérivé de la progression tracker).
export async function run({ page, ok }) {
  // Fermer le splash d'intro s'il est encore là
  const splash = page.locator('.mp-intro-splash');
  if (await splash.count()) await splash.click({ timeout: 1500 }).catch(() => {});
  await page.waitForSelector('.mp-intro-splash', { state: 'detached', timeout: 4000 }).catch(() => {});

  // Panneau règle (gabarit mj-shell) : s'ouvre TOUT SEUL à la 1ʳᵉ partie
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('bandeau Niveau présent', (await page.locator('#levelbar').count()) === 1);
  ok('démarre au Niveau 1', (((await page.locator('#levelbar').textContent()) || '').includes('Niveau 1')));

  // 6 manches parfaites
  for (let i = 0; i < 8; i++) {
    await page.waitForSelector('.ch[data-correct="1"]', { timeout: 6000 });
    await page.click('.ch[data-correct="1"]');
    await page.waitForTimeout(1450);
  }

  ok('écran de fin affiché', (await page.locator('#endscreen').count()) === 1);
  ok('manche parfaite → data-perfect=1', (await page.locator('#endscreen').getAttribute('data-perfect')) === '1');

  const stars = await page.evaluate(() => (window.Stars ? Stars.get('mj-04') : -1));
  ok('Stars.get(mj-04) === 1 après 1 manche parfaite', stars === 1, `stars=${stars}`);
}
