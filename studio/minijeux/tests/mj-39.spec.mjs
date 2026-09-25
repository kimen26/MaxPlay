// Pilote EP-038 — MJ-39 "Blocs magiques" (Block Blast-like, 8x8, sans rotation).
// Vérifie : smoke console, placement programmatique via __mjTest.place(),
// complétion d'une ligne -> effacement + compteur de lignes incrémenté,
// jamais de blocage (pieces renouvelées), palier ★ atteint sans "Game Over" punitif.

export async function run({ page, ok }) {
  // ─── Règles v3 : panneau s'ouvre TOUT SEUL à la 1ʳᵉ partie (regle-info.js) ───
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  const hasHook = await page.evaluate(() => !!window.__mjTest);
  ok('window.__mjTest exposé', hasHook);
  if (!hasHook) return;

  const st0 = await page.evaluate(() => window.__mjTest.getState());
  ok('Grille 8x8 vide au départ', st0.board.length === 8 && st0.board.every(row => row.length === 8 && row.every(v => v === false)));
  ok('3 pièces proposées au départ', st0.pieces.length === 3 && st0.pieces.every(p => p !== null));
  ok('Compteur de lignes à 0 au départ', st0.lignesEffacees === 0);
  ok('Aucune étoile au départ', st0.starsGiven.every(s => s === false));

  // Force un scénario déterministe : 3 lignes de 8 (shape index 5 = ligne 4 H)
  // pour remplir une ligne complète de la grille en posant 2x la pièce "ligne 4 H".
  await page.evaluate(() => window.__mjTest.forceNextPieces([5, 5, 0]));

  // Pose "ligne 4 H" en (0,0) et (0,4) -> remplit toute la ligne 0
  const placed1 = await page.evaluate(() => window.__mjTest.place(0, 0, 0));
  ok('Placement pièce 0 (ligne 4H) en (0,0) réussi', placed1);
  const placed2 = await page.evaluate(() => window.__mjTest.place(1, 0, 4));
  ok('Placement pièce 1 (ligne 4H) en (0,4) réussi', placed2);

  // Après 320ms l'animation d'effacement a tourné (setTimeout dans checkLines)
  const cleared = await page.waitForFunction(() => window.__mjTest.getState().lignesEffacees >= 1,
    null, { timeout: 2000 }).then(() => true).catch(() => false);
  ok('Ligne complète effacée -> compteur de lignes incrémenté', cleared);

  const st1 = await page.evaluate(() => window.__mjTest.getState());
  ok('Ligne 0 vidée après effacement', st1.board[0].every(v => v === false));

  // Les 3 pièces posées (0,1 placées + la 3e index 2 encore dispo) déclenchent
  // un renouvellement complet une fois toutes posées — ici on vérifie juste
  // qu'il reste toujours au moins une pièce jouable (jamais de blocage silencieux).
  const stillHasPiece = st1.pieces.some(p => p !== null);
  ok('Au moins une pièce restante ou renouvelée après pose (pas de rack vide bloqué)', stillHasPiece);

  // ── Palier ★ (5 lignes) : rejoue le même pattern jusqu'à 5 lignes effacées ──
  let safety = 0;
  while (safety < 20) {
    const s = await page.evaluate(() => window.__mjTest.getState());
    if (s.lignesEffacees >= 5) break;
    await page.evaluate(() => window.__mjTest.forceNextPieces([5, 5, 0]));
    await page.evaluate(() => { window.__mjTest.place(0, 0, 0); window.__mjTest.place(1, 0, 4); });
    await page.waitForTimeout(400);
    safety++;
  }
  const star1 = await page.waitForFunction(() => window.__mjTest.getState().starsGiven[0] === true,
    null, { timeout: 3000 }).then(() => true).catch(() => false);
  ok('Palier ★ (5 lignes) atteint -> étoile attribuée sans écran punitif', star1);

  const st2 = await page.evaluate(() => window.__mjTest.getState());
  ok('Partie continue après palier (pas de Game Over à ce stade)', st2.gameOverShown === false);

  // ─── EP-068 : bouton règles (i) — réouverture manuelle après le 1er auto-open ───
  ok('Bouton règles ❓ présent dans le header', await page.locator('#btn-regle').count() === 1);
  await page.click('#btn-regle');
  ok('Modal règle ouverte au tap', await page.locator('#ri-overlay.show').count() === 1);
  const regleTexte = (await page.locator('.ri-text').textContent() || '').trim();
  ok('Texte de règle correspond', regleTexte === 'Pose les blocs pour remplir des lignes entières !', regleTexte);
  await page.click('#ri-close'); // v3 : fermeture explicite ✕ (panneau bottom-sheet)
  ok('Modal règle fermée au tap', await page.locator('#ri-overlay.show').count() === 0);

  // ── REC-M2 (recette 2026-09-19) : progression non sauvée quand le coup qui
  // remplit la grille (game over) est AUSSI celui qui efface une ligne. Cause
  // racine : checkGameOver() tournait en synchrone juste après placePiece(),
  // avant le setTimeout(320ms) de checkLines() qui efface la ligne ET notifie
  // le palier (G.notePip -> Tracker.logAnswer). G.showEnd() fermait la session
  // Tracker AVANT que ce palier soit noté -> jamais persisté.
  //
  // Repro : plateau presque plein avec UN trou par ligne (jamais toute une
  // colonne trouée en même temps, sinon checkLines() la compterait aussi et
  // fausserait le scénario) — ligne 7 n'a qu'UN SEUL trou en (7,0), colonne 0
  // en a un DEUXIÈME en (0,0) pour ne jamais être complète elle non plus. Le
  // dernier coup pose un 1x1 en (7,0) : ça complète UNIQUEMENT la ligne 7
  // (colonne 0 garde son trou en (0,0)). Après effacement, ligne 7 et les
  // trous isolés des autres lignes ne forment jamais un bloc 2x2 libre — les
  // 2 pièces restantes du rack (carrés 2x2) ne rentrent donc plus nulle part :
  // vrai game over au même coup que le palier de 5 lignes.
  //
  // Piège de spec découvert en écrivant ce test (2-strikes, cause racine avant
  // pansement) : `page.reload()` déclenche `pagehide` -> tracker.js a un
  // "Auto-end" (ligne ~239) qui clôt toute session encore ouverte pour les jeux
  // sans fin explicite. La partie 1 de ce spec (plus haut) avait laissé la
  // session mj-39 ouverte avec 1 palier déjà noté (correct=questions=1) ->
  // l'auto-end l'écrit comme "parfaite" AU RELOAD, avant même le scénario
  // ci-dessous. `localStorage.clear()` avant le reload n'y change rien (le
  // pagehide écrit APRÈS le clear, pendant la navigation). Un `Stars.get() > 0`
  // brut se voyait donc pollué par cette entrée SANS RAPPORT — vert même sur le
  // code buggé. Fix de spec : mesurer le nombre d'entrées d'historique juste
  // APRÈS le reload (englobe l'auto-end de la partie 1 s'il a eu lieu) puis
  // vérifier qu'il grandit d'EXACTEMENT 1 après le scénario — ça isole bien
  // CETTE victoire-là, quoi qu'il se soit passé avant.
  await page.reload({ waitUntil: 'networkidle' });
  if (await page.locator('#ri-panneau.on').count()) {
    await page.click('#ri-ok');
    await page.waitForTimeout(250);
  }
  // Le reload peut avoir ajouté l'entrée auto-end de la partie 1 (cf. ci-dessus) :
  // on re-mesure APRÈS reload, juste avant le scénario, pour un point de départ net.
  const historyLenBaseline = await page.evaluate(() => {
    try {
      const d = JSON.parse(localStorage.getItem('maxplay_progress') || '{}');
      return ((d.games && d.games['mj-39'] && d.games['mj-39'].history) || []).length;
    } catch (e) { return -1; }
  });
  await page.evaluate(() => window.__mjTest.forceLignesEffacees(4));
  await page.evaluate(() => window.__mjTest.forceBoardWithGaps([
    [0, 0], [0, 7], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 0],
  ]));
  await page.evaluate(() => window.__mjTest.forceNextPieces([0, 7, 7])); // 1x1 + 2 carrés 2x2
  const placedFinal = await page.evaluate(() => window.__mjTest.place(0, 7, 0));
  ok('REC-M2 : dernier coup (1x1 en 7,0) posé', placedFinal);

  const palierFranchi = await page.waitForFunction(
    () => window.__mjTest.getState().lignesEffacees >= 5,
    null, { timeout: 2000 }
  ).then(() => true).catch(() => false);
  ok('REC-M2 : la ligne se complète et efface (palier 5 franchi : 4 -> 5)', palierFranchi);

  const gameOverReel = await page.waitForFunction(
    () => window.__mjTest.getState().gameOverShown === true,
    null, { timeout: 3000 }
  ).then(() => true).catch(() => false);
  ok('REC-M2 : vrai Game Over (2 carrés 2x2 ne rentrent plus nulle part)', gameOverReel);

  // Le cœur du bug : G.showEnd() doit avoir persisté CETTE victoire (palier de
  // la dernière ligne) dans tracker.js — avant fix, ce coup de dernière seconde
  // ne laissait aucune trace (session Tracker déjà close par un showEnd trop
  // précoce) malgré 5 lignes effacées et un vrai Game Over affiché à l'écran.
  const historyLenAfter = await page.evaluate(() => {
    try {
      const d = JSON.parse(localStorage.getItem('maxplay_progress') || '{}');
      return ((d.games && d.games['mj-39'] && d.games['mj-39'].history) || []).length;
    } catch (e) { return -1; }
  });
  ok('REC-M2 : une entrée d’historique de plus après le Game Over (cette victoire est enregistrée)',
     historyLenAfter === historyLenBaseline + 1,
     `avant=${historyLenBaseline} après=${historyLenAfter}`);

  const lastEntryPerfect = await page.evaluate(() => {
    try {
      const d = JSON.parse(localStorage.getItem('maxplay_progress') || '{}');
      const h = (d.games && d.games['mj-39'] && d.games['mj-39'].history) || [];
      const last = h[h.length - 1];
      return !!last && ((last.questions > 0 && last.correct >= last.questions) || (last.maxScore > 0 && last.score >= last.maxScore));
    } catch (e) { return false; }
  });
  ok('REC-M2 : cette entrée compte comme palier franchi (parfaite pour Stars.get)', lastEntryPerfect);
}
