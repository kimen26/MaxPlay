// _check-catalogue-dino-i18n.mjs — porte de recette du catalogue dino traduit.
//
// Répond à la question « les 71 dinos × 4 langues ont-ils tous un nom ? », qui
// était jusqu'ici marquée « jamais fait, seuls des échantillons ont été vus ».
// Vérifier 71 × 4 + 19 plantes + 11 familles à l'œil n'a aucun sens : on charge
// la vraie page dans les 4 langues et on compare les tableaux après fusion.
//
// Ce que l'outil signale :
//   VIDE     — un nom absent ou nul dans une langue. C'est un DÉFAUT, exit 1.
//   IDENTIQUE au FR — informatif, JAMAIS un défaut : les noms scientifiques
//     (Diplodocus, Minmi, Troodon, Ginkgo…) sont du latin et se disent pareil
//     dans les quatre langues. Les traduire serait le vrai bug.
//
// Usage : node studio/minijeux/tools/_check-catalogue-dino-i18n.mjs
// Playwright vit dans studio/minijeux/tests/node_modules, d'où l'import résolu
// depuis ce dossier-là.

import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const require = createRequire(pathToFileURL(resolve(__dir, '../tests/package.json')).href);
const { chromium } = require('playwright');

const LANGUES = ['fr', 'en', 'es-es', 'pt-br'];
const PAGE = resolve(__dir, '../../../site/mj-32.html');

const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });
const releve = {};

for (const lang of LANGUES) {
  const page = await browser.newPage({ viewport: { width: 360, height: 900 } });
  await page.goto(pathToFileURL(PAGE).href + '?lang=' + lang);
  // dinos-i18n.js fusionne par document.write au chargement : on laisse le pack
  // de la langue arriver avant de lire les tableaux.
  await page.waitForFunction(() => typeof DINOS !== 'undefined' && DINOS.length > 0, null, { timeout: 20000 });
  await page.waitForTimeout(1500);
  releve[lang] = await page.evaluate(() => ({
    dinos: (typeof DINOS !== 'undefined' ? DINOS : []).map(d => [d.id, d.name]),
    plantes: (typeof DINO_PLANTES !== 'undefined' ? DINO_PLANTES : []).map(p => [p.id, p.name]),
    familles: (typeof DINO_FAMILLES !== 'undefined' ? DINO_FAMILLES : []).map(f => [f.id, f.label || f.nom || f.titre])
  }));
  await page.close();
}
await browser.close();

let defauts = 0;
for (const genre of ['dinos', 'plantes', 'familles']) {
  const fr = new Map(releve.fr[genre]);
  for (const lang of LANGUES.filter(l => l !== 'fr')) {
    const trad = new Map(releve[lang][genre]);
    const vides = [...fr.keys()].filter(id => !trad.get(id));
    const latins = [...fr.entries()].filter(([id, nom]) => trad.get(id) === nom).length;
    console.log(`${genre.padEnd(9)} ${lang.padEnd(6)} ${String(fr.size).padStart(3)} entrées · ${latins} nom(s) scientifique(s) identique(s) au FR · ${vides.length} vide(s)`);
    if (vides.length) {
      defauts += vides.length;
      console.log('   VIDE : ' + vides.join(', '));
    }
  }
}

console.log(defauts === 0
  ? '\n✓ catalogue dino complet dans les 4 langues — aucun nom manquant'
  : `\n✗ ${defauts} nom(s) manquant(s)`);
process.exit(defauts === 0 ? 0 : 1);
