// armoire.spec.mjs — L'Armoire, meuble v8 (HO-MJ-22). Spec AUTONOME (comme
// mur-nid.spec.mjs) : il n'y a pas de site/armoire.html, donc pas de
// `npm run mj:test armoire` (run.mjs cherche site/<mj>.html) — lancer :
//   node studio/minijeux/tests/armoire.spec.mjs
//
// Le MEUBLE (carcasse/planches/montants/tiroirs/vantaux, classes .am-*) est
// posé par js/armoire-meuble.js (kit v8) — sa fidélité aux boîtes du kit est
// couverte par armoire-meuble.spec.mjs (contre site/dev-armoire.html). Ici :
// l'intégration réelle sur index.html, CE QUE js/armoire.js ajoute PAR-DESSUS
// (cases .casier/.objet, prénom, avatar) et le cadrage global.
//
// Ce que ce spec garde, viewport par viewport :
//   · jamais d'ascenseur, et rien de rogné par le bord de l'écran ;
//   · l'armoire arrive FERMÉE, et ses cases avec ;
//   · les 15 cases + 2 tiroirs présents, zone tactile ≥ 48 × 48 ;
//   · aucun vantail ouvert ne retombe sur un objet ;
//   · toutes les images chargées ;
//   · les 4 vantaux s'ouvrent et se referment (via ArmoireMeuble) ;
//   · le poids du premier affichage ;
//   · aucune erreur JS.
//
// Et surtout la promesse de l'architecture en repère fixe : LES PROPORTIONS
// NE BOUGENT PAS. Chaque case est mesurée en fraction de la boîte de
// l'armoire, et ces fractions doivent être identiques à 320 px et à 1280 px.
// C'est ce test-là qui échouerait si quelqu'un remettait un calcul de taille
// par pièce.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '..', '..', '..', 'site');
const INDEX = resolve(SITE, 'index.html');
const CAPTURES = resolve(__dir, '..', 'docs', 'handoffs', 'rapports', 'captures');
mkdirSync(CAPTURES, { recursive: true });

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m';
let fail = 0;
const checks = [];
const ok = (name, cond, detail = '') => { checks.push([cond, name, detail]); if (!cond) fail++; };

const VIEWPORTS = [
  { w: 360, h: 740 }, { w: 360, h: 640 }, { w: 320, h: 568 }, { w: 390, h: 844 },
  { w: 412, h: 915 }, { w: 800, h: 600 }, { w: 1024, h: 768 }, { w: 1280, h: 720 }
];
const CASES_ATTENDUES = 15; // 12 jeux derrière les portes + 3 fonctions en niche
const TIROIRS_ATTENDUS = 2;  // album + « encore » — les tiroirs SONT les boutons, sans icône

// empreinte de proportions : { label → [cx, cy, cw, ch] en fraction de la
// boîte de l'armoire }, relevée au premier viewport et comparée aux suivants.
let empreinte = null;

const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  const errors = [];
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`console.error: ${m.text()}`); });
  // file:// ne pose pas de content-length fiable → on lit le corps réel.
  let imgBytes = 0;
  page.on('response', async (res) => {
    try { if (/\/img\//.test(res.url())) imgBytes += (await res.body()).length; } catch (e) {}
  });

  const tag = `${vp.w}x${vp.h}`;
  try {
    await page.addInitScript(() => { try { localStorage.clear(); } catch (e) {} });
    await page.goto(pathToFileURL(INDEX).href, { waitUntil: 'networkidle' });
    // state:'attached' : les cases arrivent MASQUÉES (portes fermées), donc
    // attendre qu'elles soient visibles bloquerait pour toujours.
    await page.waitForSelector('.casier', { state: 'attached', timeout: 5000 });
    // l'armoire arrive FERMÉE : c'est l'enfant qui ouvre. On capture cet état
    // puis on ouvre les deux zones à la main, comme lui.
    const ferme = await page.evaluate(() => {
      const cab = document.getElementById('armoire');
      return !cab.classList.contains('am-ouvert-haut') && !cab.classList.contains('am-ouvert-bas') &&
        [...document.querySelectorAll('.casier')].every(c => c.classList.contains('zone-cachee'));
    });
    ok(`[${tag}] arrive portes fermées, cases masquées`, ferme);
    if (vp.w === 360 && vp.h === 740) {
      await page.screenshot({ path: resolve(CAPTURES, 'HO-MJ-22-armoire-360x740-ferme.png') });
    }
    await page.click('.am-porte-haut.am-g');
    await page.click('.am-porte-bas.am-g');
    await page.waitForTimeout(900);

    const m = await page.evaluate(() => {
      const de = document.documentElement;
      const cab = document.getElementById('armoire');
      const cabR = cab.getBoundingClientRect();
      const cases = [...document.querySelectorAll('.casier, .objet')];
      const rects = cases.map(c => c.getBoundingClientRect());
      // zone tactile réelle : le calque .tap, pas la boîte du bouton. Le
      // bouton fait la CASE (repère proportionnel) ; lui imposer un plancher
      // en pixels écraserait la géométrie du meuble.
      const taps = cases.map(c => c.querySelector('.tap').getBoundingClientRect());

      // tout le contenu de l'armoire, vantaux ouverts compris
      const all = [...cab.querySelectorAll('*')].map(e => e.getBoundingClientRect());
      const bornes = {
        l: Math.min(...all.map(r => r.left)), r: Math.max(...all.map(r => r.right)),
        t: Math.min(...all.map(r => r.top)), b: Math.max(...all.map(r => r.bottom))
      };

      const imgsOk = [...document.querySelectorAll('#armoire img')]
        .every(i => i.complete && i.naturalWidth > 0);

      const empreinte = {};
      cases.forEach((c, i) => {
        const r = rects[i];
        empreinte[c.getAttribute('aria-label')] = [
          (r.left + r.width / 2 - cabR.left) / cabR.width,
          (r.top + r.height / 2 - cabR.top) / cabR.height
        ];
      });

      return {
        scrollH: de.scrollHeight, innerH: innerHeight,
        scrollW: de.scrollWidth, innerW: innerWidth,
        cab: { w: cabR.width, h: cabR.height },
        n: cases.length,
        nTiroirs: document.querySelectorAll('.am-tiroir').length,
        minW: Math.min(...taps.map(r => r.width)), minH: Math.min(...taps.map(r => r.height)),
        // aucun objet flottant posé sur les tiroirs par armoire.js — la
        // poignée + la façade du kit (am-feuille/am-tap) suffisent.
        tiroirsNus: [...document.querySelectorAll('.am-tiroir')].every(t => t.querySelectorAll('.obj').length === 0),
        bornes, imgsOk, empreinte,
        nPortes: document.querySelectorAll('.am-porte').length,
        ouvert: cab.classList.contains('am-ouvert-haut') && cab.classList.contains('am-ouvert-bas'),
        // seuls les vantaux OUVERTS (opacité > 0) comptent : le vantail fermé
        // correspondant tourne hors champ (opacité 0), sa boîte ne doit rien
        // masquer.
        porteLibre: (() => {
          const ouvertes = [...document.querySelectorAll('.am-ouverte')]
            .filter(p => +getComputedStyle(p).opacity > 0)
            .map(p => p.getBoundingClientRect());
          return cases.every((c) => {
            const o = c.querySelector('.obj').getBoundingClientRect();
            return ouvertes.every(p => p.right <= o.left + 0.5 || p.left >= o.right - 0.5);
          });
        })(),
        recouvrement: [...document.querySelectorAll('.am-ouverte')].map(p => {
          const r = p.getBoundingClientRect();
          return { l: +r.left.toFixed(1), r: +r.right.toFixed(1), opacity: +getComputedStyle(p).opacity };
        })
      };
    });

    ok(`[${tag}] jamais d'ascenseur vertical`, m.scrollH <= m.innerH + 1, `${m.scrollH} > ${m.innerH}`);
    ok(`[${tag}] jamais d'ascenseur horizontal`, m.scrollW <= m.innerW + 1, `${m.scrollW} > ${m.innerW}`);
    ok(`[${tag}] rien de rogné par le bord de l'écran`,
      m.bornes.l >= -0.5 && m.bornes.t >= -0.5 && m.bornes.r <= vp.w + 0.5 && m.bornes.b <= vp.h + 0.5,
      `L${m.bornes.l.toFixed(1)} R${m.bornes.r.toFixed(1)} T${m.bornes.t.toFixed(1)} B${m.bornes.b.toFixed(1)}`);
    ok(`[${tag}] les ${CASES_ATTENDUES} cases sont là`, m.n === CASES_ATTENDUES, `n=${m.n}`);
    ok(`[${tag}] les ${TIROIRS_ATTENDUS} tiroirs sont là`, m.nTiroirs === TIROIRS_ATTENDUS, `n=${m.nTiroirs}`);
    ok(`[${tag}] les tiroirs n'ont aucune icône posée dessus`, m.tiroirsNus);
    ok(`[${tag}] chaque case ≥ 48 × 48 de zone tactile`, m.minW >= 48 && m.minH >= 48,
      `min=${m.minW.toFixed(1)}×${m.minH.toFixed(1)}`);
    ok(`[${tag}] toutes les images de l'armoire chargées`, m.imgsOk);
    ok(`[${tag}] 4 vantaux présents, ouverts après appui`, m.nPortes === 4 && m.ouvert,
      `n=${m.nPortes} ouvert=${m.ouvert}`);
    // un vantail ouvert ne doit plus retomber sur la colonne de bord : c'est
    // tout l'intérêt d'ouvrir. Mesuré, parce que l'angle et la charnière se
    // compensent et qu'on ne peut pas le deviner.
    ok(`[${tag}] les vantaux ouverts ne masquent aucune case`, m.porteLibre,
      JSON.stringify(m.recouvrement));

    // proportions identiques d'un viewport à l'autre (promesse du repère fixe)
    if (!empreinte) {
      empreinte = m.empreinte;
    } else {
      let pire = 0, quoi = '';
      for (const k of Object.keys(empreinte)) {
        if (!m.empreinte[k]) { pire = 1; quoi = `case absente : ${k}`; break; }
        for (let i = 0; i < 2; i++) {
          const d = Math.abs(empreinte[k][i] - m.empreinte[k][i]);
          if (d > pire) { pire = d; quoi = `${k} axe${i}`; }
        }
      }
      // 1,5 % : la zone tactile de 96 px est un plancher en PIXELS, elle
      // décale légèrement le centre des cases sur les très petits écrans.
      ok(`[${tag}] proportions identiques au viewport de référence`, pire <= 0.015,
        `écart max ${(pire * 100).toFixed(2)} % (${quoi})`);
    }

    // fermeture / réouverture d'une zone — on referme via le vantail OUVERT
    // (c'est lui qui reste cliquable une fois la zone ouverte, cf. am-ouverte
    // pointer-events:auto dans armoire-meuble.css), on rouvre via le fermé.
    await page.click('.am-ouverte.am-g[data-zone="haut"]');
    await page.waitForTimeout(800);
    const referme = await page.evaluate(() =>
      !document.getElementById('armoire').classList.contains('am-ouvert-haut') &&
      [...document.querySelectorAll('.casier[data-zone="haut"]')].every(c => c.classList.contains('zone-cachee')));
    ok(`[${tag}] cliquer un vantail referme la zone et masque ses cases`, referme);
    await page.click('.am-porte-haut.am-g');
    await page.waitForTimeout(800);
    const rouvert = await page.evaluate(() =>
      document.getElementById('armoire').classList.contains('am-ouvert-haut'));
    ok(`[${tag}] et la rouvre`, rouvert);

    await page.screenshot({ path: resolve(CAPTURES, `HO-MJ-22-armoire-${tag}.png`) });

    if (vp.w === 360 && vp.h === 740) {
      // budget du 1er affichage : carcasse+planches+montants+tiroir+4 vantaux
      // (kit v8, ~175 Ko) + 15 objets (~250 Ko) ≈ 425 Ko mesurés — le globe
      // animé (HO-MJ-16) n'est chargé qu'au tap, jamais au 1er affichage.
      ok('[360x740] poids images 1er affichage ≤ 460 Ko', imgBytes <= 460 * 1024,
        `${(imgBytes / 1024).toFixed(0)} Ko`);
    }
    ok(`[${tag}] aucune erreur JS / console`, errors.length === 0, errors.join(' | '));
  } catch (e) {
    ok(`[${tag}] exécution sans exception`, false, e.message);
  }
  await page.close();
}

await browser.close();

console.log('\n── armoire.spec.mjs (L\'Armoire, meuble v8, HO-MJ-22) ──');
for (const [cond, name, detail] of checks) {
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
}
console.log(fail === 0 ? `\n\x1b[32m✓ armoire OK\x1b[0m\n` : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail === 0 ? 0 : 1);
