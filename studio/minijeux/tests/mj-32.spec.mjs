// Pilote MJ-32 — L'atelier coloriage : jeu LIBRE (pas de score/échec), flux créatif.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('DINOS chargé (60 dinos)', await page.evaluate(() => typeof DINOS !== 'undefined' && Array.isArray(DINOS) && DINOS.length >= 50));

  // Écran choix : au moins quelques vignettes visibles (certaines peuvent onerror-remove)
  await page.waitForSelector('.thumb-card', { timeout: 5000 });
  const nThumbs = await page.locator('#grid .thumb-card').count();
  ok('grille de coloriages affichée', nThumbs > 10, `thumbs=${nThumbs}`);

  // Choisir le 1er coloriage → ouvre l'atelier
  await page.click('#grid .thumb-card >> nth=0');
  await page.waitForSelector('#screenAtelier:not(.hidden)', { timeout: 4000 });
  ok('écran atelier ouvert', await page.locator('#screenAtelier').evaluate(el => !el.classList.contains('hidden')));

  // Attendre que le canvas soit prêt (dimensions posées par onload de l'image)
  await page.waitForFunction(() => {
    const c = document.getElementById('paintCanvas');
    return c && c.width > 0 && c.height > 0;
  }, { timeout: 5000 });

  const nSwatches = await page.locator('.palette .swatch').count();
  ok('palette de couleurs présente (10+marron/gris/vert + gomme)', nSwatches >= 11, `swatches=${nSwatches}`);

  // Choisir une couleur (pas la 1re, déjà sélectionnée par défaut) puis taper 2 points du canvas
  await page.click('.palette .swatch >> nth=3');

  const beforePixels = await page.evaluate(() => {
    const c = document.getElementById('paintCanvas');
    const ctx = c.getContext('2d');
    return Array.from(ctx.getImageData(0, 0, c.width, c.height).data);
  });

  const box = await page.locator('#paintCanvas').boundingBox();
  // Deux points dans la zone dessin (approx centre + décalé) — flood fill doit modifier des pixels
  await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);
  await page.waitForTimeout(150);
  await page.mouse.click(box.x + box.width * 0.3, box.y + box.height * 0.7);
  await page.waitForTimeout(150);

  const afterPixels = await page.evaluate(() => {
    const c = document.getElementById('paintCanvas');
    const ctx = c.getContext('2d');
    return Array.from(ctx.getImageData(0, 0, c.width, c.height).data);
  });

  let diffCount = 0;
  for (let i = 0; i < beforePixels.length; i += 4) {
    if (beforePixels[i] !== afterPixels[i] || beforePixels[i+1] !== afterPixels[i+1] || beforePixels[i+2] !== afterPixels[i+2]) {
      diffCount++;
    }
  }
  ok('flood fill a changé des pixels du canvas', diffCount > 0, `pixels changés=${diffCount}`);

  // Bouton Fini ! → sauvegarde galerie + retour/navigation vers galerie
  await page.click('#finBtn');
  await page.waitForSelector('#screenGallery:not(.hidden)', { timeout: 4000 });

  const galleryLen = await page.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('mj32_galerie') || '[]').length; }
    catch (e) { return -1; }
  });
  ok('1 œuvre sauvegardée dans la galerie', galleryLen === 1, `galerie=${galleryLen}`);

  const nPieces = await page.locator('#galleryView .thumb-card').count();
  ok('galerie affiche 1 vignette', nPieces === 1, `pieces=${nPieces}`);
}
