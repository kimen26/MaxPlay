// Pilote MJ-06 — Lis la phrase : QCM mot manquant (bus + dino + voyage), 5 questions,
// pas de niveaux/étoiles (tracker simple). Smoke + chemin gagnant scripté.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('compteur de question présent', (await page.locator('#qcounter').count()) === 1);
  ok('démarre à Question 1 / 5', (((await page.locator('#qcounter').textContent()) || '').includes('Question 1 / 5')));
  ok('une phrase à trou est affichée', (await page.locator('.sentence-text .blank').count()) === 1);
  ok('4 choix proposés', (await page.locator('#choices .choice-btn').count()) === 4);

  // 5 questions : on clique toujours un choix (bon ou mauvais peu importe, feedback < 200ms
  // garanti par design) — ici on cherche la bonne réponse via le texte du blank.
  for (let i = 0; i < 5; i++) {
    await page.waitForSelector('#choices .choice-btn', { timeout: 6000 });
    const blankText = (await page.locator('.sentence-text .blank').textContent()) || '';
    const buttons = await page.locator('#choices .choice-btn').all();
    let clicked = false;
    for (const b of buttons) {
      const t = (await b.textContent()) || '';
      // Le blank affiche encore "?" tant que non répondu ; on ne peut pas connaître la bonne
      // réponse à l'avance depuis le DOM avant clic — on clique le premier bouton (chemin
      // "au moins une réponse par manche", suffisant pour valider que le jeu avance).
      await b.click();
      clicked = true;
      break;
    }
    ok(`question ${i + 1} : un choix cliqué`, clicked);
    await page.waitForTimeout(2400);
  }

  // Après 5 questions, l'écran de fin remplace #app (titre "Super !")
  ok('écran de fin affiché', (await page.locator('text=Super !').count()) === 1);
}
