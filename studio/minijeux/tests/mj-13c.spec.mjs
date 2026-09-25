// Pilote MJ-13c — Combien avant ? : paliers = taille de la file (N1 = 3 bus).
// Rollout difficulté 2026-06-02/03 (catégorie Compter). Migré gabarit js/mj-shell.js (2026-07-14).
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Fermer le splash d'intro s'il est là
  const splash = page.locator('.mp-intro-splash');
  if (await splash.count()) await splash.click({ timeout: 1500 }).catch(() => {});
  await page.waitForSelector('.mp-intro-splash', { state: 'detached', timeout: 4000 }).catch(() => {});

  // Panneau règle v3 : s'ouvre TOUT SEUL à la 1ʳᵉ partie → on vérifie puis on ferme.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('piste golden (pips) présente', (await page.locator('#pips .pip').count()) === 8);

  await page.waitForSelector('.fiche', { timeout: 5000 });
  const fiches = await page.locator('.fiche').count();
  ok('Niveau 1 = file de 3 bus', fiches === 3, `fiches=${fiches}`);

  // REC-C1 (recette 2026-09-19) : mj-13c n'avait pas de <div id="app"> → écran de
  // fin plantait à la 8e manche. On joue les 8 manches EN PARFAIT (bouton
  // data-correct="1" du 1er coup, à chaque manche) pour vérifier étoile + fin.
  for (let m = 0; m < 8; m++) {
    await page.waitForSelector('.btn-count[data-correct="1"]', { timeout: 6000 });
    await page.click('.btn-count[data-correct="1"]');
    await page.waitForTimeout(500);
    const qt = (await page.locator('#q-text').textContent()) || '';
    ok(`manche ${m + 1}/8 : réponse correcte → Bravo`, /bravo/i.test(qt), `q="${qt.slice(0, 40)}"`);
    await page.waitForTimeout(1900); // laisse initRound() de la manche suivante se poser
  }

  await page.waitForSelector('.end-wrap', { timeout: 6000 });
  ok('écran de fin golden affiché (REC-C1)', (await page.locator('.end-wrap').count()) === 1);
  const stars = await page.evaluate(() => (window.Stars ? Stars.get('mj-13c') : -1));
  ok('étoile gagnée : Stars.get(mj-13c) === 1 après 8/8 parfait', stars === 1, `stars=${stars}`);
  // L'étoile vole vers le badge (anim MaxFX/_discreetStar, quelques secondes) avant
  // que .filled soit posé — attendre l'animation plutôt que la course.
  await page.waitForSelector('.badge-slot.filled', { timeout: 8000 }).catch(() => {});
  ok('badge étoile visible sur l\'écran de fin', (await page.locator('.badge-slot.filled').count()) >= 1);
}
