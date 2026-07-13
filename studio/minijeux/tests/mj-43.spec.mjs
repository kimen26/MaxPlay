// MJ-43 — Remplis les caisses ! (dés/dominos + regroupement, boîtes-cibles)
// Vérifie : round soluble par construction, placement valide, débordement refusé,
// résolution complète, progression des 3 paliers jusqu'à l'overlay, zéro mot punitif.

export async function run({ page, ok }) {
  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── État initial ─────────────────────────────────────────────────────
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('Palier initial = ★1 (paletteIdx 0)', s0.paletteIdx === 0, `idx=${s0.paletteIdx}`);
  ok('Palier 1 = 3 caisses', s0.crates.length === 3, `crates=${s0.crates.length}`);
  ok('Caisses vides au départ', s0.crates.every(c => c.sum === 0));
  ok('Des jetons dans l\'étagère', s0.trayCount > 0, `tray=${s0.trayCount}`);

  // Invariant clé : le round est soluble par construction (Σ jetons == Σ cibles)
  const solvable = await page.evaluate(() => {
    const total = window.__mjTest.tokens().reduce((s, t) => s + t.value, 0);
    const targets = window.__mjTest.state.crates.reduce((s, c) => s + c.target, 0);
    return total === targets;
  });
  ok('Round soluble : Σ jetons == Σ cibles', solvable);

  // ── Bouton règles (i) — composant partagé RegleInfo ──────────────────
  ok('Bouton règles ❓ présent', await page.locator('#btn-regle').count() === 1);
  await page.click('#btn-regle');
  ok('Modal règle ouverte au tap', await page.locator('#ri-overlay.show').count() === 1);
  await page.click('#ri-overlay');
  ok('Modal règle fermée au tap', await page.locator('#ri-overlay.show').count() === 0);

  // ── Placement valide : la somme de la caisse augmente ────────────────
  const placed = await page.evaluate(() => {
    const t = window.__mjTest.tokens().find(t => t.loc === 'tray');
    const before = window.__mjTest.state.crates[t.home].sum;
    window.__mjTest.place(t.id, t.home);
    const after = window.__mjTest.state.crates[t.home].sum;
    return { val: t.value, before, after };
  });
  ok('Placement valide augmente la somme', placed.after === placed.before + placed.val,
     `${placed.before}+${placed.val} -> ${placed.after}`);

  // ── Débordement refusé (best-effort : cherche un jeton > cible vide) ──
  const ov = await page.evaluate(() => {
    for (let tries = 0; tries < 20; tries++) {
      window.__mjTest.newRound();
      const st = window.__mjTest.state;
      const toks = window.__mjTest.tokens();
      for (let ci = 0; ci < st.crates.length; ci++) {
        const T = st.crates[ci].target;
        const t = toks.find(t => t.loc === 'tray' && t.value > T);
        if (t) {
          const before = window.__mjTest.state.crates[ci].sum;
          window.__mjTest.place(t.id, ci);
          const after = window.__mjTest.state.crates[ci].sum;
          const still = window.__mjTest.tokens().find(x => x.id === t.id).loc === 'tray';
          return { tested: true, before, after, still };
        }
      }
    }
    return { tested: false };
  });
  if (ov.tested) {
    ok('Débordement refusé : somme inchangée', ov.after === ov.before, `${ov.before}->${ov.after}`);
    ok('Débordement refusé : jeton reste dans l\'étagère', ov.still === true);
  } else {
    ok('Débordement : aucun cas dans 20 rounds (skip non bloquant)', true);
  }

  // ── Résolution complète d'un round ───────────────────────────────────
  await page.evaluate(() => { window.__mjTest.newRound(); window.__mjTest.solveRound(); });
  const s1 = await page.evaluate(() => window.__mjTest.state);
  ok('solveRound remplit toutes les caisses pile', s1.crates.every(c => c.done && c.sum === c.target));
  ok('Round marqué terminé (roundOver)', s1.roundOver === true);
  // need:1 → un round terminé fait avancer le palier (roundsDone repart à 0) : on vérifie l'un OU l'autre
  ok('Round comptabilisé (progression palier/round)', s1.roundsDone >= 1 || s1.paletteIdx >= 1,
     `roundsDone=${s1.roundsDone} paletteIdx=${s1.paletteIdx}`);

  // ── Anti-deadlock : cas canonique 5/5 {3,2,4,1} (REX conseiller 2026-07-13) ──
  // Sans solveur : 3 puis 1 dans la caisse A → reste {2,4} insoluble, Max coincé.
  const dl = await page.evaluate(() => {
    window.__mjTest.setRound([5, 5], [3, 2, 4, 1]);
    const find = v => window.__mjTest.tokens().find(t => t.value === v && t.loc === 'tray');
    const t3 = find(3);
    window.__mjTest.place(t3.id, 0);                 // 3 → A : légal (reste soluble)
    const okFirst = window.__mjTest.tokens().find(x => x.id === t3.id).loc === 0;
    const t1 = find(1);
    window.__mjTest.place(t1.id, 0);                 // 1 → A : rendrait insoluble → refusé doux
    const refused = window.__mjTest.tokens().find(x => x.id === t1.id).loc === 'tray';
    const t2 = find(2);
    window.__mjTest.place(t2.id, 0);                 // 2 → A : complète A, {4,1} = 5 pour B → légal
    const okSecond = window.__mjTest.tokens().find(x => x.id === t2.id).loc === 0;
    return { okFirst, refused, okSecond };
  });
  ok('Anti-deadlock : coup sain accepté (3 → A)', dl.okFirst);
  ok('Anti-deadlock : coup cul-de-sac refusé doucement (1 → A)', dl.refused);
  ok('Anti-deadlock : coup qui reste soluble accepté (2 → A)', dl.okSecond);

  // ── Jauge non numérique : jamais de "X / cible" affiché (figée anti-score) ──
  const hasNumericCounter = await page.evaluate(() => {
    window.__mjTest.newRound();
    return /\d+\s*\/\s*\d+/.test(document.getElementById('crates').textContent);
  });
  ok('Aucun compteur numérique "X / cible" dans les caisses', hasNumericCounter === false);
  ok('Jauge de remplissage présente', await page.locator('.crate-bar').count() >= 1);

  // ── Palier 3 = gros niveau (2 grosses caisses, cibles ≥ 12) ──────────
  await page.evaluate(() => window.__mjTest.setDifficulty(3));
  const s3 = await page.evaluate(() => window.__mjTest.state);
  ok('Palier 3 = 2 caisses', s3.crates.length === 2, `crates=${s3.crates.length}`);
  ok('Palier 3 : cibles ≥ 12 (regroupement obligatoire)',
     s3.crates.every(c => c.target >= 12), JSON.stringify(s3.crates.map(c => c.target)));

  // ── Chemin gagnant complet : need=2 rounds × 3 paliers → overlay 3★ ───
  const fin = await page.evaluate(() => {
    window.__mjTest.setTestMode(true);
    window.__mjTest.setDifficulty(1); // repart de ★1
    for (let i = 0; i < 14; i++) {
      if (window.__mjTest.state.overlayShown) break;
      window.__mjTest.solveRound();
      if (!window.__mjTest.state.overlayShown) window.__mjTest.newRound();
    }
    const st = window.__mjTest.state;
    const starsOn = document.querySelectorAll('.star.on').length;
    return { overlay: st.overlayShown, starsOn, finished: st.finished };
  });
  ok('Overlay 3★ atteint après les 3 paliers', fin.overlay === true);
  ok('3 étoiles allumées à la fin', fin.starsOn === 3, `stars=${fin.starsOn}`);
  ok('État finished posé', fin.finished === true);

  // ── Mode libre post-3★ : replay → nouvelle caisse, jamais de fin ──────
  const lib = await page.evaluate(() => {
    window.__mjTest.replay();
    const st = window.__mjTest.state;
    return { libre: st.libre, overlay: st.overlayShown, crates: st.crates.length,
             targetsHigh: st.crates.every(c => c.target >= 12) };
  });
  ok('Mode libre activé après replay', lib.libre === true && lib.overlay === false);
  ok('Mode libre : caisses cibles ≥ 12', lib.crates === 2 && lib.targetsHigh, JSON.stringify(lib));

  // ── Zéro mot punitif ─────────────────────────────────────────────────
  const punitive = await page.evaluate(() => {
    const t = document.getElementById('overlay-title').textContent
            + document.getElementById('overlay-text').textContent
            + document.getElementById('banner').textContent;
    return /perdu|raté|rate\b|échec|nul|faux|erreur/i.test(t);
  });
  ok('Zéro mot punitif (overlay + bannière)', punitive === false);

  // ── Zone tap : jetons de l'étagère ≥ 72px ────────────────────────────
  await page.evaluate(() => { window.__mjTest.setTestMode(false); window.__mjTest.setDifficulty(1); });
  const tokBox = await page.locator('.tray .tok').first().boundingBox();
  ok('Jeton tap ≥ 72px', !!tokBox && tokBox.width >= 72 && tokBox.height >= 72,
     tokBox ? `${Math.round(tokBox.width)}×${Math.round(tokBox.height)}` : 'no-box');
}
