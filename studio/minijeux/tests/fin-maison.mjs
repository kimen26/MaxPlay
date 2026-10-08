// Aide de spec (HO-T02) : déclenche l'écran de fin STANDARD du gabarit (Golden.showEnd,
// le même que celui appelé par le jeu) et vérifie qu'il offre le retour maison.
// Le fait que chaque jeu appelle bien G.showEnd est contrôlé par audit-gabarit.mjs.
export async function verifierFinMaison({ page, ok, mj }) {
  await page.evaluate((m) => Golden.showEnd({ replayUrl: m + '.html' }), mj);
  const home = await page.waitForSelector('.end-wrap [data-act="home"]', { state: 'attached', timeout: 5000 })
    .then(() => true).catch(() => false);
  const href = home ? await page.getAttribute('.end-wrap [data-act="home"]', 'href') : null;
  ok('Fin de partie : écran standard avec bouton maison vers index.html', href === 'index.html', `href=${href}`);
}
