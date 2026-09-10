// Pilote EP-038 — rejoue une partie gagnante de MJ-21 et vérifie les 3 sagas
// du REX : (1) crash Mixer, (2) "bus en haut" régression, (3) tube/clone vide
// (clipPath id dupliqué). Vert sur HEAD, rouge sur les commits buggés.

// Recettes IDFM (copie de DEFIS dans mj-21.html) — label → doses À VERSER.
//
// ⚠️ Ce ne sont PAS toujours les proportions nominales du défi : le tube est
// plafonné à TUBE_CAP = 4 doses (🔒 dans mj-21.html) et la victoire se juge sur
// la PROPORTION obtenue (`findBestDefi`, distance < 0,55), pas sur le compte
// exact. Une recette nominale de plus de 4 doses est donc injouable telle
// quelle : son 5e clic est refusé et le défi ne peut jamais être validé.
//
// Seul le `brun` est dans ce cas (2+2+1 = 5). On verse la combinaison la plus
// simple qui tombe sur lui : 1 rouge + 1 jaune + 1 bleu (distance 0,267, la
// meilleure des trois possibles à 4 doses ou moins). Ce n'est pas un
// contournement du test — c'est ce que fait l'enfant, qui n'a lui non plus que
// 4 doses. Cause d'un échec 1 fois sur 8 jusqu'au 2026-09-10, le temps que le
// tirage aléatoire tombe sur ce défi-là.
const RECIPES = {
  'rouge':{r:1,j:0,b:0,w:0}, 'jaune':{r:0,j:1,b:0,w:0}, 'bleu':{r:0,j:0,b:1,w:0},
  'vert':{r:0,j:1,b:1,w:0}, 'violet':{r:1,j:0,b:1,w:0}, 'rose':{r:1,j:0,b:0,w:1},
  'vert clair':{r:0,j:1,b:1,w:1}, 'bleu ciel':{r:0,j:0,b:3,w:1}, 'orange':{r:1,j:1,b:0,w:0},
  'or':{r:1,j:3,b:0,w:0}, 'rose pâle':{r:1,j:0,b:0,w:2}, 'lavande':{r:1,j:0,b:1,w:2},
  'brun':{r:1,j:1,b:1,w:0},
};
const POT = { r:'.pot-rouge', j:'.pot-jaune', b:'.pot-bleu', w:'.pot-blanc' };

export async function run({ page, ok }) {
  // Migration gabarit mj-shell.js : panneau règle 🧑‍🔬 s'ouvre tout seul à la 1ʳᵉ partie
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  // FIGÉ : le bus cible est EN BAS (sous le tube). Vérifié avant de jouer.
  const tubeBox0 = await page.locator('#tube-wrap').boundingBox();
  const busBox0  = await page.locator('#bus-bas-wrap').boundingBox();
  ok('FIGÉ bus cible EN BAS (sous le tube)',
     !!(tubeBox0 && busBox0) && busBox0.y > tubeBox0.y,
     `tube.y=${tubeBox0?.y} bus.y=${busBox0?.y}`);

  // Lit la couleur cible affichée et reproduit sa recette
  const label = (await page.locator('#cible-name').textContent() || '').trim();
  const recipe = RECIPES[label];
  ok(`Couleur cible reconnue ("${label}")`, !!recipe);
  if (!recipe) return;

  const types = ['r','j','b','w'].filter(k => recipe[k] > 0);
  for (const k of types)
    for (let i = 0; i < recipe[k]; i++) await page.click(POT[k]);

  // 1 seule couleur = victoire auto (figé). Sinon il faut Mixer.
  if (types.length > 1) await page.click('#btn-mixer');

  // La victoire est atteinte : #cible-name passe en "✓ label !"
  // (prouve que Mixer + tout le chemin victoire a tourné — saga "Object.entries")
  const victoire = await page.waitForFunction(
    () => document.getElementById('cible-name')?.textContent?.trim().startsWith('✓'),
    null, { timeout: 8000 }
  ).then(() => true).catch(() => false);
  ok('Victoire atteinte (Mixer + chemin victoire OK)', victoire);

  // Pendant l'anim : le clone tube ne doit pas être vide ET tous les
  // clipPath doivent avoir un id UNIQUE (cause racine saga "tube vide")
  const scene = await page.waitForFunction(() => {
    const s = document.getElementById('victoire-scene');
    return s && getComputedStyle(s).display !== 'none' && s.querySelector('.vtube svg');
  }, null, { timeout: 8000 }).then(() => true).catch(() => false);
  ok('Scène de victoire (clone tube) rendue', scene);

  if (scene) {
    const diag = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('clipPath')].map(c => c.id);
      const uniques = new Set(ids).size === ids.length && ids.length > 0;
      const svg = document.querySelector('.vtube svg');
      const fillRect = svg && [...svg.querySelectorAll('rect')]
        .some(r => { const f = r.getAttribute('fill') || ''; return /^#|rgb/.test(f) && parseFloat(r.getAttribute('height')) > 10; });
      return { ids, uniques, fillRect };
    });
    ok('clipPath id UNIQUE (pas de collision vrai tube ↔ clone)',
       diag.uniques, `ids=[${diag.ids.join(',')}]`);
    ok('Clone tube REMPLI de couleur (pas vide à la victoire)', !!diag.fillRect);
  }
}
