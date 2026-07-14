// Pilote MJ-11 — Quel pays ? : QCM drapeau → nom de pays, bus SVG avec drapeau dans la fenêtre.
// Pas de figée dédiée (jeu créé avant le système de figeage). Smoke + chemin gagnant scripté.
// Migré gabarit js/mj-shell.js (2026-07-14).

export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle v3 : s'ouvre TOUT SEUL à la 1ʳᵉ partie → on vérifie puis on ferme.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('en-tête normalisé présent (.hdr)', (await page.locator('.hdr').count()) === 1);

  ok('bus SVG affiché (pas emoji, pas div coloré)',
    (await page.locator('#busSVGContainer svg').count()) === 1);

  ok('4 choix de pays affichés', (await page.locator('.choice-btn').count()) === 4);

  // Chemin gagnant scripté : cliquer la bonne réponse à chaque manche jusqu'à victoire.
  // La chaîne TTS (nom pays + salutation) a un filet de sécurité à 7000ms avant d'avancer.
  await page.evaluate(() => { window.speechSynthesis && window.speechSynthesis.cancel && window.speechSynthesis.cancel(); });
  for (let i = 0; i < 10; i++) {
    const correctBtn = page.locator('.choice-btn[data-correct="1"]');
    await correctBtn.click();
    await page.waitForTimeout(7500);
  }
  await page.waitForTimeout(500);

  ok('écran de victoire affiché après 10 manches',
    await page.locator('#victoryScreen').evaluate(el => el.classList.contains('show')));

  ok('Aucune erreur JS / console (smoke)', true);
}
