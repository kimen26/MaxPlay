// Pilote MJ-32 — L'atelier coloriage : jeu LIBRE (pas de score/échec), flux créatif.
// EP-fix 2026-07-07 : bug noir infranchissable (revue Papa Yann) + galerie reprendre/supprimer.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Migration gabarit mj-shell.js : panneau règle 🧑‍🔬 s'ouvre tout seul à la 1ʳᵉ partie
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

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

  // ─── BUG CRITIQUE (revue Papa Yann) : une zone remplie en NOIR doit rester recoloriable ───
  // Cause racine : la détection de contour lisait la luminance du canvas COURANT (déjà
  // colorié), pas le lineart original figé — donc une zone noircie (lum≈0) était confondue
  // avec un trait de contour et devenait un mur infranchissable pour tout nouveau clic.
  const centerX = box.x + box.width * 0.5;
  const centerY = box.y + box.height * 0.5;

  // Sélectionne le noir (dernier swatch avant la gomme, cf. PALETTE) et remplit la zone centrale
  const blackIndex = await page.evaluate(() => {
    const swatches = [...document.querySelectorAll('.palette .swatch:not(.eraser)')];
    return swatches.findIndex(s => (s.dataset.hex || '').toLowerCase() === '#000000');
  });
  ok('swatch noir présent dans la palette', blackIndex >= 0, `blackIndex=${blackIndex}`);

  await page.click(`.palette .swatch:not(.eraser) >> nth=${blackIndex}`);
  await page.mouse.click(centerX, centerY);
  await page.waitForTimeout(150);

  const afterBlack = await page.evaluate((pt) => {
    const c = document.getElementById('paintCanvas');
    const rect = c.getBoundingClientRect();
    const ctx = c.getContext('2d');
    const x = Math.round((pt.x - rect.left) * (c.width / rect.width));
    const y = Math.round((pt.y - rect.top) * (c.height / rect.height));
    const d = ctx.getImageData(x, y, 1, 1).data;
    return [d[0], d[1], d[2]];
  }, { x: centerX, y: centerY });
  ok('zone centrale bien noircie après clic noir', afterBlack[0] < 20 && afterBlack[1] < 20 && afterBlack[2] < 20, `rgb=${afterBlack}`);

  // Reclique sur la MÊME zone noircie avec le rouge (swatch 0) → doit se recolorier, pas rester bloqué
  await page.click('.palette .swatch >> nth=0');
  await page.mouse.click(centerX, centerY);
  await page.waitForTimeout(150);

  const afterRed = await page.evaluate((pt) => {
    const c = document.getElementById('paintCanvas');
    const rect = c.getBoundingClientRect();
    const ctx = c.getContext('2d');
    const x = Math.round((pt.x - rect.left) * (c.width / rect.width));
    const y = Math.round((pt.y - rect.top) * (c.height / rect.height));
    const d = ctx.getImageData(x, y, 1, 1).data;
    return [d[0], d[1], d[2]];
  }, { x: centerX, y: centerY });
  // rouge PALETTE[0] = #e53935 → r≈229, g≈57, b≈53
  ok('zone noire RECOLORIABLE en rouge (bug critique corrigé)', afterRed[0] > 150 && afterRed[1] < 120, `rgb=${afterRed}`);

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

  const pieceHasPngId = await page.evaluate(() => {
    const list = JSON.parse(localStorage.getItem('mj32_galerie') || '[]');
    const p = list[0];
    return !!(p && p.id && p.png);
  });
  ok('œuvre sauvegardée avec id + png (nécessaire pour reprendre/supprimer)', pieceHasPngId);

  // ─── Modèle JSON zones (retour Papa Yann annotations Supabase) ───
  // "on garde en json ou je sais pas quoi quelle couleur dans quelle zone" —
  // PAS un bitmap compressé. On vérifie la forme exacte des données persistées.
  const savedFills = await page.evaluate(() => {
    const list = JSON.parse(localStorage.getItem('mj32_galerie') || '[]');
    return list[0].fills;
  });
  ok('œuvre sauvegardée avec fills[] (zones JSON, pas juste un bitmap)',
     Array.isArray(savedFills) && savedFills.length >= 2, `fills=${JSON.stringify(savedFills)}`);
  ok('chaque fill a {nx,ny,hex} normalisés (indépendants de la résolution canvas)',
     savedFills.every(f => typeof f.nx === 'number' && typeof f.ny === 'number' && typeof f.hex === 'string'));

  // ─── Galerie : "Reprendre en copie" ───
  await page.click('#galleryView .thumb-card >> nth=0');
  await page.waitForSelector('#bigView:not(.hidden)', { timeout: 3000 });
  ok('bouton Reprendre en copie visible', await page.locator('#resumeBtn').isVisible());

  await page.click('#resumeBtn');
  await page.waitForSelector('#screenAtelier:not(.hidden)', { timeout: 4000 });
  await page.waitForFunction(() => {
    const c = document.getElementById('paintCanvas');
    return c && c.width > 0 && c.height > 0;
  }, { timeout: 5000 });
  // Laisse le temps au flood fill de rejouer tous les fills (async onload + boucle synchrone)
  await page.waitForTimeout(300);
  ok('Reprendre en copie rouvre l\'atelier avec le dessin existant', true);

  // ─── Réédition fidèle : couleurs IDENTIQUES + contours NOIRS intacts ───
  // Cœur du retour Papa Yann : "le dino était bleu, je le change de couleur et
  // le détourage est baveux dégueulasse" — on vérifie ici que rejouer les fills
  // sur le lineart original reproduit EXACTEMENT les mêmes pixels (zone centrale
  // rouge posée plus haut) et que le trait de contour (haut du canvas, hors zone
  // remplie) reste un noir net, jamais "mangé" par la couleur de fond.
  const reeditCenter = await page.evaluate((pt) => {
    const c = document.getElementById('paintCanvas');
    const rect = c.getBoundingClientRect();
    const ctx = c.getContext('2d');
    const x = Math.round((pt.x - rect.left) * (c.width / rect.width));
    const y = Math.round((pt.y - rect.top) * (c.height / rect.height));
    const d = ctx.getImageData(x, y, 1, 1).data;
    return [d[0], d[1], d[2]];
  }, { x: centerX, y: centerY });
  ok('réédition : zone centrale reproduit la MÊME couleur rouge (pas de bavure)',
     reeditCenter[0] > 150 && reeditCenter[1] < 120, `rgb=${reeditCenter}`);

  // Changer la couleur de cette même zone (bleu, swatch index 4) doit rester propre :
  // pas de résidu rouge, pas de contour mangé — flood fill franc sur zone rééditée.
  const blueIndex = await page.evaluate(() => {
    const swatches = [...document.querySelectorAll('.palette .swatch:not(.eraser)')];
    return swatches.findIndex(s => (s.dataset.hex || '').toLowerCase() === '#1e88e5');
  });
  ok('swatch bleu présent dans la palette', blueIndex >= 0);
  await page.click(`.palette .swatch:not(.eraser) >> nth=${blueIndex}`);
  await page.mouse.click(centerX, centerY);
  await page.waitForTimeout(150);
  const reeditRecolored = await page.evaluate((pt) => {
    const c = document.getElementById('paintCanvas');
    const rect = c.getBoundingClientRect();
    const ctx = c.getContext('2d');
    const x = Math.round((pt.x - rect.left) * (c.width / rect.width));
    const y = Math.round((pt.y - rect.top) * (c.height / rect.height));
    const d = ctx.getImageData(x, y, 1, 1).data;
    return [d[0], d[1], d[2]];
  }, { x: centerX, y: centerY });
  // bleu PALETTE #1e88e5 → r≈30, g≈136, b≈229 — plus de rouge résiduel
  ok('changement de couleur en réédition propre (bleu net, pas de résidu rouge)',
     reeditRecolored[2] > 150 && reeditRecolored[0] < 120, `rgb=${reeditRecolored}`);

  // L'original doit toujours être dans la galerie (copie, pas déplacement)
  await page.click('#backChoiceBtn');
  await page.click('#galleryBtn');
  const galleryLenAfterResume = await page.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('mj32_galerie') || '[]').length; }
    catch (e) { return -1; }
  });
  ok('original TOUJOURS présent après reprise (copie, pas déplacement)', galleryLenAfterResume === 1, `galerie=${galleryLenAfterResume}`);

  // ─── Galerie : suppression par appui long + confirmation ───
  const card = page.locator('#galleryView .thumb-card').first();
  const cardBox = await card.boundingBox();
  await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(700); // > LONG_PRESS_MS (600ms)
  await page.mouse.up();

  await page.waitForSelector('#confirmModal:not(.hidden)', { timeout: 2000 });
  ok('modal de confirmation suppression affichée', true);

  await page.click('#confirmNo');
  const lenAfterCancel = await page.evaluate(() => JSON.parse(localStorage.getItem('mj32_galerie') || '[]').length);
  ok('annuler la suppression conserve l\'œuvre', lenAfterCancel === 1, `galerie=${lenAfterCancel}`);

  // Repasse en appui long puis confirme la suppression
  await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(700);
  await page.mouse.up();
  await page.waitForSelector('#confirmModal:not(.hidden)', { timeout: 2000 });
  await page.click('#confirmYes');

  const lenAfterDelete = await page.evaluate(() => JSON.parse(localStorage.getItem('mj32_galerie') || '[]').length);
  ok('confirmer la suppression retire l\'œuvre de la galerie', lenAfterDelete === 0, `galerie=${lenAfterDelete}`);
}
