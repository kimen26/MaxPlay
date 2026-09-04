// MJ-pose-tiles — Bac à sable tileset LimeZu (pas de golden, pas de consigne).
// Vérifie : panneau règle auto-open 1ère partie, pose/efface une tile, lisser,
// bouton Fini déclenche la célébration, zéro élément golden/consigne injecté.

export async function run({ page, ok }) {
  // ── Gabarit mj-shell.js : le panneau règle s'ouvre TOUT SEUL à la 1ʳᵉ partie ──
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  // ── Bac à sable : ni golden, ni consigne (brief) ──────────────────────
  ok('Pas de piste golden (#pips absent)', await page.locator('#pips').count() === 0);
  ok('Pas de barre consigne (#consigne absent)', await page.locator('#consigne').count() === 0);

  // ── Header réutilisé (topbar + hdr fusionnés, pas de doublon) ─────────
  ok('Un seul header (.hdr)', await page.locator('.hdr').count() === 1);
  ok('Bouton règles 🧑‍🔬 présent', await page.locator('#btn-regle').count() === 1);

  // ── Grille par défaut 8×8 ──────────────────────────────────────────────
  const cellCount = await page.locator('#grid .cell').count();
  ok('Grille 8×8 = 64 cases au départ', cellCount === 64, `cells=${cellCount}`);

  // ── Sélection d'une tile puis pose sur une case ───────────────────────
  // Note : selectTile() réécrit #selected-display.innerHTML (le <span id="selected-text">
  // statique disparaît, remplacé par un <span> sans id) — on lit donc le conteneur.
  await page.click('#tiles-list .tile-btn');
  const selText = (await page.locator('#selected-display').textContent() || '').trim();
  ok('Une pièce est sélectionnée (texte mis à jour)', selText !== 'Choisis une pièce' && selText.length > 0, selText);

  await page.click('#grid .cell >> nth=0');
  const hasImgAfterPlace = await page.locator('#grid .cell').first().locator('img').count();
  ok('Poser la pièce affiche une image dans la case', hasImgAfterPlace === 1);

  // ── Effacer (appui long simulé via clearCell direct + bouton Effacer) ─
  await page.evaluate(() => window.clearAll());
  const anyImgAfterClear = await page.locator('#grid .cell img').count();
  ok('Effacer tout retire toutes les images', anyImgAfterClear === 0);

  // ── Lisser : fonction exposée sur window, ne casse rien (smoke) ───────
  await page.evaluate(() => window.lisser());
  ok('lisser() exécutable sans erreur (smoke)', true);

  // ── Bouton Fini : célébration, jamais de mot punitif ──────────────────
  await page.click('#fini-btn');
  await page.waitForTimeout(100);
  const finiTxt = (await page.locator('#fini-btn').textContent() || '');
  ok('Bouton Fini affiche "Bravo"', /Bravo/i.test(finiTxt), finiTxt);
  ok('Zéro mot punitif au clic Fini', !/perdu|raté|échec|nul|faux|erreur/i.test(finiTxt));

  // ── Zones tap ≥ 80px (boutons toolbar) ────────────────────────────────
  const toolBox = await page.locator('.tool-btn.fini').boundingBox();
  ok('Bouton toolbar hauteur ≥ 40px (mini-tap outil, pas jeu enfant direct)',
     !!toolBox && toolBox.height >= 40, toolBox ? `${Math.round(toolBox.height)}px` : 'no-box');
}
