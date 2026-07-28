// Pilote MJ-19 — Trouve le bus : paliers de difficulté.
// Régression corrigée 2026-06-02 : N1 partait à 50-80 bus rapides (injouable, a énervé Max).
// Désormais N1 = 10-12 bus lents. On vérifie le palier d'entrée + un tap gagnant.
export async function run({ page, ok }) {
  // Démarrage à froid (aucune étoile) → Niveau 1
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle v3 : s'ouvre TOUT SEUL à la 1ʳᵉ partie (gabarit mj-shell.js) → on ferme.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('piste golden (pips) présente', (await page.locator('#pips .pip').count()) === 7);

  await page.waitForSelector('.bus-mover', { timeout: 5000 });
  const n = await page.locator('.bus-mover').count();
  ok('Niveau 1 = 10 à 12 bus (plus 50+)', n >= 10 && n <= 12, `count=${n}`);

  // Cible annoncée
  const target = ((await page.locator('.quest b').textContent()) || '').trim();
  ok('cible annoncée', target.length > 0, `target="${target}"`);

  // Un tap gagnant : dispatch direct sur un bus cible
  // (cible mobile → dispatchEvent évite la flakiness d'un clic réel sur élément animé)
  const before = ((await page.locator('#pip0').textContent()) || '').trim();
  const targets = page.locator('.bus-mover', { has: page.locator(`text="${target}"`) });
  ok('au moins un bus cible présent', (await targets.count()) > 0);
  await targets.first().dispatchEvent('click');
  await page.waitForTimeout(900);
  const after = ((await page.locator('#pip0').textContent()) || '').trim();
  ok('tap correct → bille golden avance', before !== after, `${before} -> ${after}`);
}
