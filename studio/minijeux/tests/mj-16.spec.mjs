// Pilote MJ-16 — Complète la suite : paliers par type de motif (N1 = couleur ABAB) + retry.
// + checks responsive (Papa Yann 2026-07-07 : "ne rentre pas en portrait") : la suite et
// les choix doivent TOUJOURS tenir dans le viewport, portrait téléphone ET paysage.
async function assertFitsViewport(page, ok, vp, label) {
  await page.setViewportSize(vp);
  await page.waitForTimeout(150); // laisse le temps au resize/reflow

  const noHScroll = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
  ok(`[${label}] zéro scroll horizontal`, noHScroll);

  // Tous les éléments visibles clés doivent être entièrement dans le viewport (pas coupés).
  const overflow = await page.evaluate(() => {
    const sel = ['#hdr', '#level-bar', '#q-label', '#sequence-row', '#choices'];
    const vw = window.innerWidth, vh = window.innerHeight;
    const bad = [];
    for (const s of sel) {
      const el = document.querySelector(s);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (r.left < -1 || r.right > vw + 1) bad.push(`${s} déborde horizontalement (l=${r.left.toFixed(0)},r=${r.right.toFixed(0)},vw=${vw})`);
      if (r.bottom > vh + 1) bad.push(`${s} déborde verticalement (bottom=${r.bottom.toFixed(0)},vh=${vh})`);
    }
    return bad;
  });
  ok(`[${label}] aucun élément coupé (header/level-bar/question/suite/choix)`, overflow.length === 0, overflow.join(' | '));
}

export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle v3 : s'ouvre TOUT SEUL à la 1ʳᵉ partie (gabarit mj-shell.js) → on ferme.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('bandeau Niveau présent', (await page.locator('#levelbar').count()) === 1);
  ok('démarre au Niveau 1', (((await page.locator('#levelbar').textContent()) || '').includes('Niveau 1')));

  await page.waitForSelector('.choice-btn', { timeout: 5000 });
  ok('choix affichés', (await page.locator('.choice-btn').count()) >= 2);

  // Checks responsive AUX 2 VIEWPORTS (portrait téléphone 360×740, paysage 1024×768)
  await assertFitsViewport(page, ok, { width: 360, height: 740 }, 'portrait 360×740');
  await assertFitsViewport(page, ok, { width: 1024, height: 768 }, 'paysage 1024×768');
  await page.setViewportSize({ width: 480, height: 900 }); // repasse au viewport par défaut du harnais

  // 5 manches parfaites (clique le bon choix)
  for (let i = 0; i < 5; i++) {
    await page.waitForSelector('.choice-btn[data-correct="1"]', { timeout: 6000 });
    await page.click('.choice-btn[data-correct="1"]');
    await page.waitForTimeout(1250);
  }

  ok('écran de fin affiché', (await page.locator('#end-screen.visible').count()) === 1);
  const stars = await page.evaluate(() => (window.Stars ? Stars.get('mj-16') : -1));
  ok('Stars.get(mj-16) === 1 après 1 manche parfaite', stars === 1, `stars=${stars}`);
}
