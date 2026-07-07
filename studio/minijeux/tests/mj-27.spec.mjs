// Pilote MJ-27 — Lis le nom du dino : nom découpé en syllabes tapables (chacune lue en TTS
// au tap) + bouton 🔊 nom entier (MP3 <id>-nom.mp3, jamais TTS pour le nom complet).
// Amélioration 2026-07-07 suite revue Papa Yann : "cliquer sur les syllabes, entendre le son".
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());

  // Spy sur speechSynthesis AVANT le premier chargement (TTS.speak() capte les voix au load).
  await page.addInitScript(() => {
    window.__ttsCalls = [];
    const orig = window.SpeechSynthesisUtterance;
    window.SpeechSynthesisUtterance = function (text) {
      window.__ttsCalls.push(text);
      return new orig(text);
    };
    window.SpeechSynthesisUtterance.prototype = orig.prototype;
  });
  await page.reload({ waitUntil: 'networkidle' });

  ok('DINOS chargé', await page.evaluate(() => typeof DINOS !== 'undefined' && DINOS.length > 10));
  ok('Niveau 1 = 4 billes (standard golden : 4/6/8 selon etoiles)', (await page.locator('.pip').count()) === 4);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

  await page.waitForSelector('#word', { timeout: 5000 });
  ok('pas de TTS au chargement (EP-033)', (await page.evaluate(() => window.__ttsCalls.length)) === 0);

  // Le nom est découpé en syllabes tapables ≥ 60px de haut
  await page.waitForSelector('.syl-btn', { timeout: 5000 });
  const nSyl = await page.locator('.syl-btn').count();
  ok('au moins 2 syllabes tapables affichées', nSyl >= 2, `syllabes=${nSyl}`);
  const sylBox = await page.locator('.syl-btn').first().boundingBox();
  ok('syllabe ≥ 60px de haut (zone tap enfant)', !!sylBox && sylBox.height >= 60, `h=${sylBox?.height}`);

  // Bouton son du nom entier présent
  ok('bouton 🔊 nom entier présent', (await page.locator('#wordSoundBtn').count()) === 1);

  // Tap sur une syllabe → déclenche speechSynthesis (spy), pas de MP3 par syllabe
  await page.click('.syl-btn');
  await page.waitForTimeout(150);
  const afterSylTap = await page.evaluate(() => window.__ttsCalls.length);
  ok('tap syllabe déclenche speechSynthesis', afterSylTap >= 1, `calls=${afterSylTap}`);

  await page.waitForSelector('.dino-card', { timeout: 5000 });
  ok('6 images de choix', (await page.locator('.dino-card').count()) === 6, `cards=${await page.locator('.dino-card').count()}`);
  ok('1 seule bonne réponse', (await page.locator('.dino-card[data-correct="1"]').count()) === 1);
  ok('toutes les cartes ont une image encyclo', await page.evaluate(() =>
    [...document.querySelectorAll('.dino-card img')].every(i => /^img\/dinos\/[^/]+\.(png|jpg)$/.test(i.getAttribute('src')))
  ));

  // Chemin gagnant
  for (let q = 0; q < 3; q++) {
    await page.waitForSelector('.dino-card[data-correct="1"]', { timeout: 4000 });
    await page.click('.dino-card[data-correct="1"]').catch(() => {});
    await page.waitForTimeout(1300);
  }
  const v1 = await page.locator('.pip.v1').count();
  ok('3 bonnes réponses → 3 billes vertes', v1 === 3, `billes vertes=${v1}`);
}
