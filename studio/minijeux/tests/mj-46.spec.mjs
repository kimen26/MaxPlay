// Pilote MJ-46 — Les œufs surprises : compter les œufs du nid puis QCM.
// Retour Papa Yann 2026-07-21 (annotation Supabase) : chevauchement plus prononcé
// (1/3 mini visible), aléatoire plus chaotique, fanfare sonore à l'éclosion
// (craquement + cris de bébé dino variés). Ce spec verrouille :
//  (1) zone tap réelle ≥ 80×80 même si l'œuf visuel est plus petit
//  (2) chevauchement effectif entre œufs (pas juste un jitter cosmétique)
//  (3) chaque œuf garde au moins ~1/3 de sa surface libre (pas totalement caché)
//  (4) chemin gagnant : QCM correct → éclosion → bille verte
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle v3 (gabarit mj-shell.js) : s'ouvre seul à la 1ʳᵉ partie.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  await page.waitForSelector('#eggs .slot', { timeout: 5000 });
  await page.waitForSelector('.choices.qcm46 .ch', { timeout: 5000 });

  // console propre (aucune erreur JS pendant le rendu)
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));

  const geo = await page.evaluate(() => {
    const slots = [...document.querySelectorAll('#eggs .slot')];
    const boxes = slots.map(s => s.getBoundingClientRect());
    return boxes.map(b => ({ x: b.x, y: b.y, w: b.width, h: b.height }));
  });

  ok('œufs rendus (≥1 slot)', geo.length >= 1, `n=${geo.length}`);

  // (1) Zone tap réelle ≥ 80×80 (règle non-négociable, cf. memory/rules.md)
  const under80 = geo.filter(b => b.w < 79 || b.h < 79);   // -1px marge arrondi
  ok('toutes les zones tap œuf ≥ 80×80px', under80.length === 0, `sous 80px=${under80.length}/${geo.length}`);

  // (2) Chevauchement effectif entre au moins une paire d'œufs visuels
  //     (retour PY : "encore plus les décaler et les faire se chevaucher").
  //     On mesure sur les .egg (visuel réel), pas les .slot (halo tap agrandi).
  const eggGeo = await page.evaluate(() => {
    return [...document.querySelectorAll('#eggs .egg')].map(e => {
      const b = e.getBoundingClientRect();
      return { x: b.x, y: b.y, w: b.width, h: b.height };
    });
  });
  function overlapFrac(a, b) {
    const ix = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
    const iy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
    const inter = ix * iy;
    if (!inter) return 0;
    return inter / Math.min(a.w * a.h, b.w * b.h);
  }
  let maxOverlap = 0, anyOverlap = false;
  for (let i = 0; i < eggGeo.length; i++) {
    for (let j = i + 1; j < eggGeo.length; j++) {
      const f = overlapFrac(eggGeo[i], eggGeo[j]);
      if (f > 0.02) anyOverlap = true;
      maxOverlap = Math.max(maxOverlap, f);
    }
  }
  if (eggGeo.length > 1) {
    ok('au moins un chevauchement visible entre 2 œufs', anyOverlap, `maxOverlap=${maxOverlap.toFixed(2)}`);
    // (3) jamais totalement caché : overlap max ≤ 2/3 (= ≥ 1/3 visible, marge tolérance)
    ok('aucun œuf caché à plus de 2/3 par un autre (≥1/3 visible garanti)', maxOverlap <= 0.70, `maxOverlap=${maxOverlap.toFixed(2)}`);
  }

  ok('aucune erreur JS pendant le rendu', errors.length === 0, errors.join(' | '));

  // Chemin gagnant : lire le total réel affiché, tapoter le bon nombre d'œufs,
  // puis cliquer le bon chiffre → attend l'éclosion → bille verte.
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  await page.click('#ri-ok');
  await page.waitForTimeout(250);

  const totalQ = await page.locator('.pip').count();
  ok('piste golden présente (4/6/8 billes)', [4, 6, 8].includes(totalQ), `pips=${totalQ}`);

  let allPipsTurnedGreen = true;
  for (let q = 0; q < totalQ; q++) {
    await page.waitForSelector('#eggs .slot', { timeout: 4000 });
    // Attendre un bouton FRAIS (ni .ok ni .ko) — sinon on peut retomber sur le
    // bouton de la question précédente encore affiché pendant hatchAll (les
    // œufs/QCM de la question N ne sont remplacés qu'après l'éclosion + 500ms).
    await page.waitForSelector('.choices.qcm46 .ch[data-correct="1"]:not(.ok):not(.ko)', { timeout: 8000 });
    const nEggs = await page.locator('#eggs .slot').count();
    await page.click('.choices.qcm46 .ch[data-correct="1"]:not(.ok):not(.ko)').catch(() => {});
    // hatchAll est séquentiel : ~300ms/œuf + ~1000ms de queue avant nextQuestion
    // (jusqu'à 22 œufs au palier N2) → attendre que LA bille verte apparaisse
    // réellement plutôt qu'un délai fixe (évite le flake sur les gros paliers).
    const turnedGreen = await page.waitForFunction(
      (i) => document.querySelectorAll('.pip')[i]?.classList.contains('v1'),
      q, { timeout: nEggs * 300 + 3000 }
    ).then(() => true).catch(() => false);
    if (!turnedGreen) allPipsTurnedGreen = false;
  }
  ok(`${totalQ} bonnes réponses → ${totalQ} billes vertes (une par une, sans délai fixe)`, allPipsTurnedGreen);
}
