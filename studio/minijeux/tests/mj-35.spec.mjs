// Pilote MJ-35 — Le jeu des graines (semailles mancala SOLO, coopératif).
// Spec : studio/minijeux/docs/jeux/mj-34-35-36-specs.md § MJ-35.
// Redesign 2026-07-06 (feedback Papa Yann "y'a pas moyen de perdre") :
// objectif = trouver le trou PILE-able (compte == distance exacte au grenier)
// 3 fois par palier. Mauvais trou = rien perdu, pas de son négatif, tableau
// réarrangé. Bon trou = "PILE !" + tableau suivant. 3 PILE = victoire.

export async function run({ page, ok }) {
  const hasHook = await page.evaluate(() => typeof window.__mjTest !== 'undefined');
  ok('window.__mjTest exposé', hasHook);
  if (!hasHook) return;

  const initial = await page.evaluate(() => window.__mjTest.state);
  ok('6 trous au départ', Array.isArray(initial.pits) && initial.pits.length === 6, `pits=${JSON.stringify(initial.pits)}`);
  ok('grenier vide au départ', initial.granary === 0);
  ok('pileCount démarre à 0', initial.pileCount === 0);
  ok('pileTarget = 3', initial.pileTarget === 3);
  ok('exactement un trou PILE-able au départ', initial.pileIdx !== -1, `pileIdx=${initial.pileIdx}`);

  // ─── EP-068 : bouton règles (i) — composant partagé RegleInfo ───
  // Testé tôt (avant l'écran de victoire) : l'overlay de fin capte les clics
  // et bloquerait le tap sur #btn-regle en fin de partie.
  ok('Bouton règles ❓ présent dans le header', await page.locator('#btn-regle').count() === 1);
  await page.click('#btn-regle');
  ok('Modal règle ouverte au tap', await page.locator('#ri-overlay.show').count() === 1);
  const regleTexteEarly = (await page.locator('.ri-text').textContent() || '').trim();
  ok('Texte de règle correspond', regleTexteEarly === 'Trouve le trou qui remplit le grenier PILE-POIL !', regleTexteEarly);
  await page.click('#ri-overlay');
  ok('Modal règle fermée au tap', await page.locator('#ri-overlay.show').count() === 0);

  // ── Mauvais trou : pas de victoire, pas d'état "perdu", rien de cassé ──
  const wrongIdx = initial.pits.findIndex((n, i) => i !== initial.pileIdx && n > 0);
  ok('un trou non-PILE existe pour tester le mauvais choix', wrongIdx !== -1);
  if (wrongIdx !== -1) {
    await page.evaluate((i) => window.__mjTest.sow(i), wrongIdx);
    await page.waitForFunction(() => window.__mjTest.state.sowing === false, null, { timeout: 10000 });
    // laisse le temps au réarrangement doux (newBoard différé ~900ms)
    await page.waitForTimeout(1200);
    const afterWrong = await page.evaluate(() => window.__mjTest.state);
    ok('mauvais trou : pileCount ne progresse pas', afterWrong.pileCount === 0, `pileCount=${afterWrong.pileCount}`);
    ok('mauvais trou : pas de victoire affichée',
       !(await page.evaluate(() => document.getElementById('end-screen')?.classList.contains('visible'))));
    ok('mauvais trou : toujours exactement un trou PILE-able (rien de cassé)',
       afterWrong.pileIdx !== -1, `pileIdx=${afterWrong.pileIdx}`);
    const bodyTextWrong = await page.evaluate(() => document.body.innerText);
    ok('mauvais trou : aucun texte punitif ("perdu"/"raté"/"game over")',
       !/perdu|raté|game over/i.test(bodyTextWrong));
  }

  // ── Chemin gagnant scripté : tape le trou PILE-able 3 fois de suite ──
  let guard = 0;
  while (guard < 10) {
    const state = await page.evaluate(() => window.__mjTest.state);
    if (state.pileCount >= state.pileTarget) break;
    ok(`palier ${guard + 1}: trou PILE-able identifiable`, state.pileIdx !== -1, `pileIdx=${state.pileIdx}`);
    if (state.pileIdx === -1) break;

    await page.evaluate((i) => window.__mjTest.sow(i), state.pileIdx);
    await page.waitForFunction(() => window.__mjTest.state.sowing === false, null, { timeout: 10000 });
    await page.waitForTimeout(1100); // laisse "PILE !" fx + transition newBoard/victoire
    guard++;
  }

  const finalState = await page.evaluate(() => window.__mjTest.state);
  ok('3 PILE réussis (pileCount === pileTarget)',
     finalState.pileCount === finalState.pileTarget, `pileCount=${finalState.pileCount}`);

  const victoryShown = await page.waitForFunction(
    () => document.getElementById('end-screen')?.classList.contains('visible'),
    null, { timeout: 5000 }
  ).then(() => true).catch(() => false);
  ok('écran de victoire affiché', victoryShown);

  // Zéro pénalité : aucun bouton/texte "perdu" ou score négatif visible
  const bodyText = await page.evaluate(() => document.body.innerText);
  ok('aucun texte punitif ("perdu"/"raté") affiché', !/perdu|raté|game over/i.test(bodyText));

  // ── Responsive 360×740 (portrait phone) : plateau entièrement visible ──
  await page.setViewportSize({ width: 360, height: 740 });
  await page.waitForTimeout(300); // laisse le CSS clamp()/vmin se recalculer
  const viewport = { width: 360, height: 740 };
  const pitBoxes = await page.locator('.pit').evaluateAll(
    els => els.map(el => el.getBoundingClientRect()).map(r => ({ x: r.x, y: r.y, right: r.right, bottom: r.bottom }))
  );
  const granaryBox = await page.locator('#granary').boundingBox();
  ok('360px portrait : 6 trous rendus', pitBoxes.length === 6, `n=${pitBoxes.length}`);
  const allPitsVisible = pitBoxes.every(b => b.x >= -1 && b.right <= viewport.width + 1 && b.y >= 0 && b.bottom <= viewport.height);
  ok('360px portrait : tous les trous dans le viewport (pas coupés)', allPitsVisible, JSON.stringify(pitBoxes));
  const granaryVisible = !!granaryBox && granaryBox.x >= -1 && (granaryBox.x + granaryBox.width) <= viewport.width + 1;
  ok('360px portrait : grenier dans le viewport (pas coupé)', granaryVisible, JSON.stringify(granaryBox));
  const hasHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  ok('360px portrait : aucun scroll horizontal', !hasHorizontalScroll);

  // ── Responsive 1024×768 (paysage) : le plateau ne doit pas déborder du
  // conteneur #app (max-width 680px), sinon les trous 1/6 et le grenier
  // sont coupés visuellement (bug constaté 2026-07-06). ──
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.waitForTimeout(300);
  const pitBoxesLandscape = await page.locator('.pit').evaluateAll(
    els => els.map(el => el.getBoundingClientRect()).map(r => ({ x: r.x, right: r.right }))
  );
  const granaryBoxLandscape = await page.locator('#granary').boundingBox();
  const appBox = await page.locator('#app').boundingBox();
  const allPitsInApp = pitBoxesLandscape.every(b => b.x >= appBox.x - 1 && b.right <= appBox.x + appBox.width + 1);
  ok('1024x768 paysage : tous les trous dans #app (pas coupés)', allPitsInApp, JSON.stringify(pitBoxesLandscape));
  const granaryInApp = !!granaryBoxLandscape && (granaryBoxLandscape.x + granaryBoxLandscape.width) <= appBox.x + appBox.width + 1;
  ok('1024x768 paysage : grenier dans #app (pas coupé)', granaryInApp, JSON.stringify(granaryBoxLandscape));
}
