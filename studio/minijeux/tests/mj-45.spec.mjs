// MJ-45 — Le bus qui se remplit (montées = addition ★1-2, descentes = soustraction ★3)
// Vérifie : bus SVG canonique, round soluble, tap direct, refus doux (dépassement +
// subset-sum inatteignable), undo, victoire, progression 3 paliers, zéro mot punitif.

export async function run({ page, ok }) {
  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── État initial ─────────────────────────────────────────────────────
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('Palier initial = ★1 mode montée', s0.paletteIdx === 0 && s0.mode === 'monte');
  ok('Une ligne RATP affichée', !!s0.ligne, `ligne=${s0.ligne}`);
  ok('Cible dans [3,6] au ★1', s0.target >= 3 && s0.target <= 6, `target=${s0.target}`);
  ok('Des groupes à l\'arrêt', s0.trayCount > 0);
  ok('Bus vide au départ', s0.busCount === 0 && s0.movedSum === 0);

  // Bus SVG canonique (busSVG → carrosserie turquoise + classe .bus-svg)
  ok('Bus rendu via busSVG() (svg.bus-svg présent)', await page.locator('#bus-wrap svg.bus-svg').count() === 1);
  const bodyTurquoise = await page.evaluate(() => {
    const r = document.querySelector('#bus-wrap svg rect');
    return r && r.getAttribute('fill') === '#1abc9c';
  });
  ok('Carrosserie turquoise RATP (règle absolue bus)', bodyTurquoise === true);

  // Round soluble : la solution générée (sol=true) somme à la cible
  const solvable = await page.evaluate(() => {
    const st = window.__mjTest.state;
    const sol = window.__mjTest.groups().filter(g => g.sol).reduce((s, g) => s + g.val, 0);
    return sol === st.target;
  });
  ok('Round soluble : Σ groupes solution == cible', solvable);

  // ── Bouton règles (i) ────────────────────────────────────────────────
  ok('Bouton règles ❓ présent', await page.locator('#btn-regle').count() === 1);
  await page.click('#btn-regle');
  ok('Modal règle ouverte au tap', await page.locator('#ri-overlay.show').count() === 1);
  await page.click('#ri-close'); // v3 : fermeture explicite ✕ (panneau bottom-sheet)
  ok('Modal règle fermée au tap', await page.locator('#ri-overlay.show').count() === 0);

  // ── Refus doux : dépassement ET subset-sum inatteignable ─────────────
  // Cible 5, groupes {3,2,4,1} : taper 4 laisse {3,2,1} avec reste 1 → OK (1).
  // Après 3 : reste 2 → taper 1 rendrait le reste 1 inatteignable avec {2,4} → refusé.
  const guard = await page.evaluate(() => {
    window.__mjTest.setRound('monte', 5, [3, 2, 4, 1]);
    const find = v => window.__mjTest.groups().find(g => g.val === v && g.loc === 'tray');
    const t6 = find(4);
    window.__mjTest.tap(t6.id); // 4 → monte (reste 1, atteignable avec {1})
    const ok4 = window.__mjTest.groups().find(g => g.id === t6.id).loc === 'bus';
    const t3 = find(3);
    window.__mjTest.tap(t3.id); // 3 → dépasserait (4+3=7 > 5) → refusé
    const refusedOver = window.__mjTest.groups().find(g => g.id === t3.id).loc === 'tray';
    // repart propre pour le cas "inatteignable sans dépasser"
    window.__mjTest.setRound('monte', 5, [3, 2, 4, 1]);
    const a3 = find(3);
    window.__mjTest.tap(a3.id); // 3 → monte (reste 2, atteignable {2})
    const a1 = find(1);
    window.__mjTest.tap(a1.id); // 1 → reste 1, inatteignable avec {2,4} → refusé
    const refusedDead = window.__mjTest.groups().find(g => g.id === a1.id).loc === 'tray';
    const a2 = find(2);
    window.__mjTest.tap(a2.id); // 2 → complète 5 → victoire
    const st = window.__mjTest.state;
    return { ok4, refusedOver, refusedDead, win: st.roundOver && st.movedSum === 5 };
  });
  ok('Montée légale acceptée', guard.ok4);
  ok('Dépassement refusé doucement', guard.refusedOver);
  ok('Coup cul-de-sac (subset-sum) refusé doucement', guard.refusedDead);
  ok('Cible atteinte pile → round gagné', guard.win);

  // ── Undo : redescendre un groupe monté ───────────────────────────────
  const undo = await page.evaluate(() => {
    window.__mjTest.setRound('monte', 6, [4, 2, 3]);
    const g4 = window.__mjTest.groups().find(g => g.val === 4);
    window.__mjTest.tap(g4.id);            // monte
    window.__mjTest.tap(g4.id);            // re-tap → redescend (undo)
    return window.__mjTest.groups().find(g => g.id === g4.id).loc === 'tray';
  });
  ok('Undo : re-tap un groupe monté le fait redescendre', undo);

  // ── ★3 : mode descente (soustraction) ────────────────────────────────
  await page.evaluate(() => window.__mjTest.setDifficulty(3));
  const s3 = await page.evaluate(() => window.__mjTest.state);
  ok('★3 = mode descente', s3.mode === 'descend');
  ok('★3 : bus pré-rempli', s3.busCount > 0);
  ok('★3 : cible descente dans [3,6]', s3.target >= 3 && s3.target <= 6, `target=${s3.target}`);
  const d = await page.evaluate(() => {
    window.__mjTest.solveRound();
    const st = window.__mjTest.state;
    return { win: st.roundOver, moved: st.movedSum, target: st.target, left: st.busCount };
  });
  ok('★3 : faire descendre la solution gagne le round', d.win && d.moved === d.target);
  ok('★3 : il reste des passagers dans le bus (ceux qui continuent)', d.left > 0);

  // ── Chemin gagnant complet : 2 rounds × 3 paliers → overlay 3★ ───────
  const fin = await page.evaluate(() => {
    window.__mjTest.setDifficulty(1);
    for (let i = 0; i < 14; i++) {
      if (window.__mjTest.state.overlayShown) break;
      window.__mjTest.solveRound();
      if (!window.__mjTest.state.overlayShown) window.__mjTest.newRound();
    }
    return { overlay: window.__mjTest.state.overlayShown,
             starsOn: document.querySelectorAll('.star.on').length };
  });
  ok('Overlay 3★ atteint', fin.overlay === true);
  ok('3 étoiles allumées', fin.starsOn === 3, `stars=${fin.starsOn}`);

  // ── Zéro mot punitif ─────────────────────────────────────────────────
  const punitive = await page.evaluate(() => {
    const t = document.getElementById('overlay-title').textContent
            + document.getElementById('overlay-text').textContent
            + document.getElementById('banner').textContent;
    return /perdu|raté|échec|nul|faux|erreur/i.test(t);
  });
  ok('Zéro mot punitif', punitive === false);

  // ── Zones tap ≥ 80px (groupes actionnables) ──────────────────────────
  await page.evaluate(() => { window.__mjTest.setTestMode(false); window.__mjTest.setDifficulty(1); });
  const grpBox = await page.locator('.tray .grp').first().boundingBox();
  ok('Groupe tap ≥ 80px', !!grpBox && grpBox.width >= 80 && grpBox.height >= 80,
     grpBox ? `${Math.round(grpBox.width)}×${Math.round(grpBox.height)}` : 'no-box');
}
