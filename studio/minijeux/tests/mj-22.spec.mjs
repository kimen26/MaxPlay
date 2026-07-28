// Pilote MJ-22 "Trouve le pays !" — valide les 3 décisions figées :
// (1) Drapeau cible 72px affiché
// (2) Clic pays → highlight orange + bouton confirm → victoire overlay 2.5s
// (3) Progress dots maj après chaque pays trouvé

export async function run({ page, ok }) {
  // Migration gabarit mj-shell.js : panneau règle 🧑‍🔬 s'ouvre tout seul à la 1ʳᵉ partie
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  // FIGÉ #1 : Drapeau cible 72px en haut
  const drapeauEl = await page.locator('#drapeau-cible');
  const drapeauBox = await drapeauEl.boundingBox();
  const fontSize = await drapeauEl.evaluate(el =>
    window.getComputedStyle(el).fontSize
  );
  ok('FIGÉ drapeau cible 72px',
     parseInt(fontSize) >= 70 && parseInt(fontSize) <= 76,
     `fontSize=${fontSize}`);

  // FIGÉ #2 : Mécanique gagnante complète
  // Récupère le premier pays à trouver depuis la consigne
  const consigneText = (await page.locator('#consigne').textContent()).trim();
  const paysMatch = consigneText.match(/Trouve (?:la |le |l')(.+?)(\s*!)?$/);
  let paysTarget = paysMatch ? paysMatch[1].trim() : null;
  ok('Consigne lisible et contient un pays', !!paysTarget);

  if (!paysTarget) return;

  // Comparaison insensible à la casse : surtout PAS de `.toLowerCase()` sur la fin
  // du nom, qui écrasait le U de "Royaume-Uni" en "Royaume-uni" et faisait échouer
  // le sélecteur dès que le UK sortait en premier (tirage aléatoire).
  const cible = paysTarget.toLowerCase();
  const paysEl = page
    .locator(`xpath=//*[translate(@data-country,'ABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ','abcdefghijklmnopqrstuvwxyzàâäéèêëîïôöùûüç')='${cible}']`)
    .first();
  const exists = await paysEl.count() > 0;
  ok(`Pays "${paysTarget}" trouvé dans la carte SVG`, exists);

  if (!exists) return;

  // Clic sur le pays → highlight orange
  await paysEl.click();
  const hasHighlight = await paysEl.evaluate(el =>
    el.classList.contains('highlight')
  );
  ok('Clic pays → classe "highlight" appliquée', hasHighlight);

  // Bouton confirm doit être visible après sélection (FIGÉ)
  const confirmBtn = await page.locator('#confirmBtn');
  const isShown = await confirmBtn.evaluate(el =>
    el.classList.contains('show')
  );
  ok('FIGÉ bouton confirm apparaît après sélection', isShown);

  // Clic confirm → victoire overlay 2.5s
  await confirmBtn.click();

  // Attendre que l'overlay victoire s'affiche
  const victoire = await page.waitForFunction(() => {
    const overlay = document.querySelector('.victoire-overlay');
    return overlay && getComputedStyle(overlay).display !== 'none';
  }, null, { timeout: 5000 }).then(() => true).catch(() => false);
  ok('FIGÉ overlay victoire s\'affiche après confirm', victoire);

  // Vérifier que le drapeau énorme (140px) est dans l'overlay (animé bounce)
  if (victoire) {
    const drapeauVictoire = await page.locator('.drapeau-victoire');
    const drapeauVictoireBox = await drapeauVictoire.boundingBox();
    const victFontSize = await drapeauVictoire.evaluate(el =>
      window.getComputedStyle(el).fontSize
    );
    ok('FIGÉ drapeau victoire 140px visible',
       parseInt(victFontSize) >= 135 && parseInt(victFontSize) <= 145,
       `fontSize=${victFontSize}`);
  }

  // Attendre 2.7s pour vérifier que l'overlay disparaît et on passe au pays suivant
  await page.waitForTimeout(2700);

  // Après victoire 2.5s, l'overlay doit être fermé et progress dots mise à jour
  const overlayGone = await page.locator('.victoire-overlay').count() === 0;
  ok('FIGÉ overlay victoire disparu après 2.5s', overlayGone);

  // Piste golden (migration C1 2026-07-28) : la 1ère bille doit être marquée trouvée
  const firstPip = await page.locator('#pip0');
  const pipClass = await firstPip.evaluate(el => el.className);
  ok('piste golden : bille 1 marquée après victoire',
     pipClass.includes('done-first') || pipClass.includes('done-retry') || pipClass.includes('done-helped'),
     `class=${pipClass}`);

  // Console.error check (smoke test)
  const errors = await page.evaluate(() => {
    if (window.__errors) return window.__errors;
    return [];
  });
  ok('Aucune erreur console détectée', errors.length === 0,
     `errors=[${errors.join('; ')}]`);
}
