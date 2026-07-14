// Pilote MJ-26 — Compte les dinos : compter les silhouettes affichées.
// Migré gabarit js/mj-shell.js (2026-07-14).
// + fix Papa Yann 2026-07-07 : (1) sprites qui débordaient du cadre .play-area
// en bas ("noir sur noir, tronqué") — check bounding box ; (2) palier 1 devait
// varier les cibles (pas "5 fois le chiffre 1") — check les comptes sur la session.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle v3 : s'ouvre TOUT SEUL à la 1ʳᵉ partie → on vérifie puis on ferme.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('data dinos chargée', await page.evaluate(() => typeof DINOS !== 'undefined' && DINOS.length >= 50));
  ok('Niveau 1 = 4 billes (standard golden : 4/6/8 selon etoiles)', (await page.locator('.pip').count()) === 4);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

  await page.waitForSelector('.play-area img.sil', { timeout: 5000 });
  await page.waitForSelector('.num-btn', { timeout: 5000 });

  // Niveau 1 = 1 à 3 dinos ; le bouton correct = nb réel de silhouettes
  const coherent = await page.evaluate(() => {
    const shown = document.querySelectorAll('.play-area img.sil').length;
    const good = parseInt(document.querySelector('.num-btn[data-correct="1"]').textContent, 10);
    return shown >= 1 && shown <= 3 && shown === good;
  });
  ok('nb affiché ∈ [1..3] et = bouton correct', coherent);
  ok('3 choix de nombres', (await page.locator('.num-btn').count()) === 3);
  ok('1 seul bouton correct', (await page.locator('.num-btn[data-correct="1"]').count()) === 1);

  // BUG Papa Yann : un dino pouvait déborder du cadre .play-area en bas (noir sur noir).
  // Vérifie TOUS les sprites entièrement contenus dans leur cadre, à un viewport contraint.
  await page.setViewportSize({ width: 480, height: 480 }); // viewport court : force le cas limite
  await page.waitForTimeout(200);
  const containment = await page.evaluate(() => {
    const play = document.getElementById('playArea').getBoundingClientRect();
    const imgs = [...document.querySelectorAll('.play-area img.sil')].map(im => im.getBoundingClientRect());
    const overflow = imgs.filter(im => im.top < play.top - 1 || im.bottom > play.bottom + 1 || im.left < play.left - 1 || im.right > play.right + 1);
    return { count: imgs.length, overflowCount: overflow.length };
  });
  ok('tous les sprites entièrement dans le cadre .play-area (aucun débordement)',
     containment.overflowCount === 0, `sprites=${containment.count} débordants=${containment.overflowCount}`);
  await page.setViewportSize({ width: 480, height: 900 }); // repasse au viewport par défaut

  // Variété palier 1 : sur 4 questions, ne doit pas tirer toujours le même compte
  // (régression signalée : "5 fois le chiffre 1"). On rejoue une partie complète et log les comptes.
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  await page.waitForSelector('.play-area img.sil', { timeout: 5000 });
  const counts = [];
  for (let q = 0; q < 4; q++) {
    await page.waitForSelector('.play-area img.sil', { timeout: 4000 });
    const c = await page.evaluate(() => document.querySelectorAll('.play-area img.sil').length);
    counts.push(c);
    await page.click('.num-btn[data-correct="1"]').catch(() => {});
    await page.waitForTimeout(1100);
  }
  const distinct = new Set(counts).size;
  ok('palier 1 varie les cibles (pas toujours le même compte sur 4 manches)', distinct >= 2, `comptes=[${counts.join(',')}]`);

  // Chemin gagnant
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  for (let q = 0; q < 3; q++) {
    await page.waitForSelector('.num-btn[data-correct="1"]', { timeout: 4000 });
    await page.click('.num-btn[data-correct="1"]').catch(() => {});
    await page.waitForTimeout(1800);
  }
  const v1 = await page.locator('.pip.v1').count();
  ok('3 bonnes réponses → 3 billes vertes', v1 === 3, `billes vertes=${v1}`);
}
