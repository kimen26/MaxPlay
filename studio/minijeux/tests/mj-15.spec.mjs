// Pilote MJ-15 — L'intrus : paliers par critère (N1 = couleur évidente) + retry.
// Migré gabarit js/mj-shell.js (2026-07-14).
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle v3 : s'ouvre TOUT SEUL à la 1ʳᵉ partie → on vérifie puis on ferme.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('bandeau Niveau présent', (await page.locator('#levelbar').count()) === 1);
  ok('démarre au Niveau 1', (((await page.locator('#levelbar').textContent()) || '').includes('Niveau 1')));

  await page.waitForSelector('.bus-btn', { timeout: 5000 });
  const buses = await page.locator('.bus-btn').count();
  ok('5 bus affichés', buses === 5, `bus=${buses}`);

  // Win path : on tape les bus jusqu'à trouver l'intrus → le round avance (Round 2)
  let advanced = false;
  for (let i = 0; i < 5; i++) {
    const sel = `.bus-btn[data-idx="${i}"]`;
    if ((await page.locator(sel).count()) === 0) continue;
    await page.click(sel).catch(() => {});
    await page.waitForTimeout(1100);
    const lvl = (await page.locator('#level-label').textContent()) || '';
    if (/Round\s*2/.test(lvl)) { advanced = true; break; }
  }
  ok('intrus correct → round avance', advanced);

  // Diversification 2026-07-07 : niveau F (émojis proches) et G (ombres dino teintées)
  // doivent rendre du contenu visible (pas de silhouette noire invisible — bug trouvé et
  // corrigé en session : hue-rotate() n'a aucun effet sur du noir pur, remplacé par un
  // filtre SVG <feColorMatrix> inline).
  const puzzleCheck = await page.evaluate(() => {
    const out = {};
    try {
      const pF = generatePuzzleF();
      out.fOk = pF && pF.kind === 'emoji' && pF.buses.length === 5;
    } catch (e) { out.fErr = e.message; }
    try {
      const pG = generatePuzzleG();
      out.gOk = pG && pG.kind === 'dino' && pG.buses.length === 5
        && pG.buses.every(b => b.src && b.filter);
    } catch (e) { out.gErr = e.message; }
    return out;
  });
  ok('generatePuzzleF() → 5 cartes emoji valides', puzzleCheck.fOk === true, JSON.stringify(puzzleCheck));
  ok('generatePuzzleG() → 5 cartes dino (src+filter) valides', puzzleCheck.gOk === true, JSON.stringify(puzzleCheck));

  // Rendu réel du niveau G : le filtre SVG doit être référencé (pas hue-rotate cassé sur noir)
  await page.evaluate(() => {
    const dino = OMBRES_MJ15[0];
    const cards = [0,0,0,0,1].map(i => ({ src: dino.src, filter: SHADOW_TINTS[i], name: dino.name }));
    const positions = [0,1,2,3,4];
    const placed = new Array(5);
    positions.forEach((pos, i) => { placed[pos] = cards[i]; });
    renderPuzzle({ kind:'dino', buses: placed, intrusIdx: 4, hint:'test', level:'G' });
  });
  const imgFilter = await page.locator('.bus-btn img').first().evaluate(el => el.style.filter);
  ok('image dino a un filter url(#...) (pas hue-rotate)', /url\(["']?#tint/.test(imgFilter), imgFilter);
  const svgFilterCount = await page.locator('svg filter[id^="tint"]').count();
  ok('defs SVG de teinte présentes dans le DOM', svgFilterCount >= 4, `count=${svgFilterCount}`);
}
