// MJ-42 — Shisima ! (jeu de duel traditionnel du Kenya)
// Smoke console + chemin gagnant Max scripté + vérif "IA gagne = pas d'état punitif".

export async function run({ page, ok }) {
  // ── Gabarit mj-shell.js : le panneau règle s'ouvre TOUT SEUL à la 1ʳᵉ partie ──
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  // Active le mode test (IA gelée / déterministe) avant toute IA auto.
  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── État initial ────────────────────────────────────────────────────
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('Plateau initial : 3 pions Max + 3 pions IA',
     s0.board.filter(b => b === 'max').length === 3 && s0.board.filter(b => b === 'ai').length === 3,
     `board=${JSON.stringify(s0.board)}`);
  ok('Tour initiale = Max', s0.turn === 'max');
  ok('Pas de gameOver au départ', s0.gameOver === false);

  // ─── EP-068 : bouton règles (i) — composant gabarit mj-shell.js ───
  // Testé avant toute victoire : #overlay plein écran bloquerait le clic après.
  ok('Bouton règles 🧑‍🔬 présent dans le header', await page.locator('#btn-regle').count() === 1);
  await page.click('#btn-regle');
  ok('Panneau règle ouvert au tap', await page.locator('#ri-panneau.on').count() === 1);
  const regleTexteEarly = (await page.locator('.ri-text').textContent() || '').trim();
  ok('Texte de règle correspond', regleTexteEarly === "Aligne tes 3 pions en passant par le point d'eau !", regleTexteEarly);
  await page.click('#ri-ok');
  ok('Panneau règle fermé au tap', await page.locator('#ri-panneau.on').count() === 0);

  // ── Chemin gagnant scripté ──────────────────────────────────────────
  // Départ : max=[0,2,4] ai=[1,3,5]. Ligne gagnante visée : [0, centre(8), 4]
  // Max a déjà 0 et 4 alignés avec le centre → il suffit de faire venir un
  // pion sur le centre (libre au départ). On force le coup adjacent : 2 -> 8.
  const move1 = await page.evaluate(() => window.__mjTest.move(2, 8));
  ok('Coup Max légal (2 -> centre)', move1 === true);

  const afterMove1 = await page.evaluate(() => window.__mjTest.state);
  ok('Après coup 1 : victoire Max (0, centre, 4 alignés)', afterMove1.gameOver === true && afterMove1.overlayShown === true);

  // Vérifie que la palier progresse (win comptabilisée)
  ok('Victoire comptabilisée (wins/paletteIdx cohérent)', afterMove1.wins >= 1 || afterMove1.paletteIdx >= 1);

  // ── Replay → pas d'état punitif, jeu se relance proprement ──────────
  await page.evaluate(() => window.__mjTest.replay());
  const s1 = await page.evaluate(() => window.__mjTest.state);
  ok('Replay relance une partie propre (gameOver=false, plateau réinitialisé)',
     s1.gameOver === false && s1.board.filter(b => b === 'max').length === 3);

  // ── Scénario défaite IA : pas de message punitif, overlay "presque" ─
  // On rejoue une partie où l'IA aligne ses pions [1,3,5] via centre.
  // ai a 1 et 5 alignés avec le centre (ligne [1,centre,5]).
  // Coup Max neutre (ne gagne pas) : 0 -> reste sur place impossible, on bouge 4 -> ...
  // Simple : Max joue un coup non gagnant (0 est adjacent à 7 qui est vide).
  const neutralMove = await page.evaluate(() => window.__mjTest.move(0, 7));
  ok('Coup neutre Max joué', neutralMove === true);

  // Force l'IA à jouer 3 -> centre pour aligner [1, centre, 5]
  await page.evaluate(() => window.__mjTest.forceAiMove(3, 8));
  await page.waitForTimeout(150);

  const s2 = await page.evaluate(() => window.__mjTest.state);
  ok('IA peut gagner sans bloquer le jeu (gameOver true, pas de crash)', s2.gameOver === true);

  const overlayTextPunitive = await page.evaluate(() => {
    const t = document.getElementById('overlay-text').textContent + document.getElementById('overlay-title').textContent;
    return /perdu|raté|échec|nul/i.test(t);
  });
  ok('Zéro mot punitif dans l\'overlay de défaite IA', overlayTextPunitive === false);

  const replayVisible = await page.evaluate(() => {
    const btn = document.getElementById('replay-btn');
    return !!btn && getComputedStyle(btn).display !== 'none';
  });
  ok('Bouton replay immédiat disponible', replayVisible);

  // ── Badge culturel présent ───────────────────────────────────────────
  const badge = await page.locator('#kenya-badge').textContent();
  ok('Badge "Un jeu du Kenya" présent', /Kenya/i.test(badge || ''));

  // ── Zones tap ≥ 80px (les points de plateau, cercles r>=22 -> diamètre >=44 visuel SVG scalé) ──
  const boardBox = await page.locator('#board-svg').boundingBox();
  ok('Plateau SVG rendu avec une taille exploitable (>200px)', !!boardBox && boardBox.width > 200);
}
