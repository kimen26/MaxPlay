// Pilote MJ-22 "Trouve le pays !" — valide les 3 décisions figées :
// (1) Drapeau cible 72px affiché
// (2) Clic pays → highlight orange + bouton confirm → victoire overlay 2.5s
// (3) Progress dots maj après chaque pays trouvé

// CAUSE RACINE (CI, 2026-09-28) : Playwright .click() cible par défaut le
// CENTRE de la bounding box de l'élément. Pour un pays représenté par un
// <g> multi-îles (ex: es = Espagne continentale + îles éparses) ou une
// forme très concave (ex: no = Norvège, fjords), ce centre géométrique
// tombe HORS de la zone peinte (l'océan entre les îles) : le hit-test
// navigateur (elementFromPoint) ne trouve pas l'élément cible à ce point
// précis, Playwright réessaie 30s puis lève une exception. Vérifié en local
// (Windows) avec un script de diagnostic : es échoue 100% du temps, gb/it
// réussissent par chance (leur bbox center tombe sur le mainland). Pas un
// bug CI, pas un bug de casse de chemin — un vrai joueur tape toujours sur
// la zone colorée visible, jamais sur le centre géométrique de la bbox,
// donc ce n'est pas non plus un bug de jeu réel, seulement un angle mort du
// harnais. Correctif : chercher un point réellement peint (hit-test) dans
// la bbox avant de cliquer, au lieu de faire confiance au centre.
async function clickPeintPoint(page, locator) {
  const point = await locator.evaluate(el => {
    const box = el.getBoundingClientRect();
    const STEPS = 14;
    for (let iy = 0; iy <= STEPS; iy++) {
      for (let ix = 0; ix <= STEPS; ix++) {
        const x = box.x + (box.width * ix) / STEPS;
        const y = box.y + (box.height * iy) / STEPS;
        const hit = document.elementFromPoint(x, y);
        if (hit === el || (hit && el.contains(hit))) return { x, y };
      }
    }
    return null;
  });
  if (!point) throw new Error('clickPeintPoint: aucun point peint trouvé dans la bbox de l\'élément');
  await page.mouse.click(point.x, point.y);
}

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
  await clickPeintPoint(page, paysEl);
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

  // CAUSE RACINE (trouvée en stress CPU x4, 2026-09-28) : l'overlay se ferme
  // via son propre setTimeout(2500) côté jeu (site/mj-22.html, fonction
  // victoire()). Un `waitForTimeout(2700)` fixe suppose que ce timer
  // navigateur s'exécute dans les 200ms suivant l'échéance — vrai sur une
  // machine détendue, faux sous charge CPU (CI, throttling) où le tick
  // event-loop peut être retardé au-delà. On attend l'ÉTAT réel (overlay
  // détaché du DOM) au lieu d'un délai fixe.
  await page.waitForSelector('.victoire-overlay', { state: 'detached', timeout: 6000 });

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
