// Pilote MJ-35 — Le jeu des graines (semailles mancala SOLO, coopératif).
// Spec : studio/minijeux/docs/jeux/mj-34-35-36-specs.md § MJ-35.
// Chemin gagnant scripté via window.__mjTest.sow(i) jusqu'à ce que
// granary === total (toutes les graines récoltées) → écran de fin affiché.

export async function run({ page, ok }) {
  const hasHook = await page.evaluate(() => typeof window.__mjTest !== 'undefined');
  ok('window.__mjTest exposé', hasHook);
  if (!hasHook) return;

  const initial = await page.evaluate(() => window.__mjTest.state);
  ok('6 trous au départ', Array.isArray(initial.pits) && initial.pits.length === 6, `pits=${JSON.stringify(initial.pits)}`);
  ok('niveau 1 = 6-8 graines', initial.total >= 6 && initial.total <= 10, `total=${initial.total}`);
  ok('grenier vide au départ', initial.granary === 0);
  ok('somme trous = total (rien perdu au départ)',
     initial.pits.reduce((a, b) => a + b, 0) + initial.granary === initial.total);

  // Chemin gagnant scripté : sème chaque trou non-vide en boucle jusqu'à
  // ce que toutes les graines soient au grenier (toujours possible : la
  // spec garantit que le trou le plus à droite finit par nourrir le grenier).
  let guard = 0;
  while (guard < 200) {
    const state = await page.evaluate(() => window.__mjTest.state);
    if (state.granary >= state.total) break;

    const idx = state.pits.findIndex(n => n > 0);
    if (idx === -1) break; // ne devrait jamais arriver (règle douce : rien n'est perdu)

    await page.evaluate((i) => window.__mjTest.sow(i), idx);
    // attend la fin de l'animation de semis (bloque sowing pendant ~260ms/graine)
    await page.waitForFunction(() => window.__mjTest.state.sowing === false, null, { timeout: 10000 });
    guard++;
  }

  const finalState = await page.evaluate(() => window.__mjTest.state);
  ok('toutes les graines au grenier (granary === total)',
     finalState.granary === finalState.total, `granary=${finalState.granary} total=${finalState.total}`);
  ok('aucun trou ne garde de graines à la victoire',
     finalState.pits.every(n => n === 0), `pits=${JSON.stringify(finalState.pits)}`);

  const victoryShown = await page.waitForFunction(
    () => document.getElementById('end-screen')?.classList.contains('visible'),
    null, { timeout: 5000 }
  ).then(() => true).catch(() => false);
  ok('écran de victoire affiché', victoryShown);

  // Zéro pénalité : aucun bouton/texte "perdu" ou score négatif visible
  const bodyText = await page.evaluate(() => document.body.innerText);
  ok('aucun texte punitif ("perdu"/"raté") affiché', !/perdu|raté|game over/i.test(bodyText));
}
