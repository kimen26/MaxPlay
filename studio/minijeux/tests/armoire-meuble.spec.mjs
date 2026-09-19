// armoire-meuble.spec.mjs — Le MEUBLE v7 (HO-MJ-20). Spec AUTONOME (comme
// armoire.spec.mjs) : node studio/minijeux/tests/armoire-meuble.spec.mjs
//
// Ce que ce spec garde, viewport par viewport (brief § 5, + iterations 2-3) :
//   · jamais d'ascenseur ;
//   · rien de rogné PAR .piece (pas le viewport — la barre de dev reserve sa
//     hauteur, iteration 2 point 6) ;
//   · toutes les images (<img> ET fonds CSS rechargés, L-139) ;
//   · 5 planches de même hauteur = plancheCh ±0,3 px (iteration 3 point 3) ;
//   · 2 montants ; 2 tiroirs ; 2 spots ; 4 vantaux ;
//   · arrive fermé ;
//   · portes FERMÉES couvrent l'OUVERTURE AVANT à ±0,3 % (iteration 3 point 1,
//     remplace la mesure fausse de l'itération 2) ;
//   · spots entièrement dans un vantail haut, portes fermées ;
//   · boîte tiroirs ≥ 0,10 H (iteration 3 point 3) ;
//   · ?etat=ouvert → les 4 sprites ouverts visibles et les 4 fermés à
//     opacité 0, chaque vantail ouvert dans sa boîte [libre,charnière] à
//     ±0,3 % (iteration 3 point 2, remplace [0,13.6%] de l'itération 2) ;
//   · toggle ouvre puis referme ;
//   · empreinte des proportions (toutes les pièces) identique entre 320 et
//     1280 ;
//   · poids images ≤ 250 Ko ;
//   · zéro erreur JS.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const DEV = resolve(__dir, '..', '..', '..', 'site', 'dev-armoire.html');

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m';
let fail = 0;
const checks = [];
const ok = (name, cond, detail = '') => { checks.push([cond, name, detail]); if (!cond) fail++; };

const VIEWPORTS = [
  { w: 320, h: 568 }, { w: 360, h: 640 }, { w: 360, h: 740 },
  { w: 412, h: 915 }, { w: 800, h: 600 }, { w: 1280, h: 720 }
];

let empreinte = null;

const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  const errors = [];
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`console.error: ${m.text()}`); });
  let imgBytes = 0;
  page.on('response', async (res) => {
    try { if (/\/img\//.test(res.url())) imgBytes += (await res.body()).length; } catch (e) {}
  });

  const tag = `${vp.w}x${vp.h}`;
  try {
    await page.goto(pathToFileURL(DEV).href, { waitUntil: 'networkidle' });
    await page.waitForSelector('.am-carcasse', { state: 'attached', timeout: 5000 });

    const ferme = await page.evaluate(() => {
      const root = document.getElementById('armoire');
      return !root.classList.contains('am-ouvert-haut') && !root.classList.contains('am-ouvert-bas');
    });
    ok(`[${tag}] arrive portes fermées`, ferme);

    const m0 = await page.evaluate(() => {
      const de = document.documentElement;
      const piece = document.querySelector('.piece');
      const pieceR = piece.getBoundingClientRect();
      const root = document.getElementById('armoire');
      const rootR = root.getBoundingClientRect();
      const all = [...root.querySelectorAll('*')].map(e => e.getBoundingClientRect());
      const bornes = {
        l: Math.min(...all.map(r => r.left)), r: Math.max(...all.map(r => r.right)),
        t: Math.min(...all.map(r => r.top)), b: Math.max(...all.map(r => r.bottom))
      };
      const planches = [...document.querySelectorAll('.am-planche')];
      const montants = [...document.querySelectorAll('.am-montant')];
      const tiroirs = [...document.querySelectorAll('.am-tiroir')];
      const spots = [...document.querySelectorAll('.am-spot')];
      const portes = [...document.querySelectorAll('.am-porte')];
      const imgsOk = [...document.querySelectorAll('#armoire img')]
        .every(i => i.complete && i.naturalWidth > 0);
      const fonds = [...new Set(
        [...document.querySelectorAll('.am-porte-fermee, .am-porte-ouverte')]
          .map(e => getComputedStyle(e).backgroundImage.replace(/^url\("?|"?\)$/g, ''))
      )];

      const empreinte = {};
      [...planches, ...montants, ...tiroirs, ...spots].forEach((el, i) => {
        const r = el.getBoundingClientRect();
        empreinte['piece' + i] = [
          (r.left + r.width / 2 - rootR.left) / rootR.width,
          (r.top + r.height / 2 - rootR.top) / rootR.height,
          r.width / rootR.width,
          r.height / rootR.height
        ];
      });

      const plancheH = planches.map(p => p.getBoundingClientRect().height);

      // hauteur de la boîte tiroirs, en % de la hauteur de l'armoire (les 2
      // tiroirs partagent la même cy/ch : on prend le premier).
      const tiroirBoxHPct = tiroirs.length
        ? tiroirs[0].getBoundingClientRect().height / rootR.height * 100
        : 0;

      // portes fermées couvrent l'ouverture (le panneau visible entre les
      // deux vantaux d'une même zone) : bornes gauche/droite des 2 vantaux
      // d'une zone, en % de la largeur de l'armoire.
      const couvertureZone = {};
      ['haut', 'bas'].forEach(zone => {
        const els = [...document.querySelectorAll(`.am-porte[data-zone="${zone}"]`)]
          .map(e => e.getBoundingClientRect());
        couvertureZone[zone] = {
          left: (Math.min(...els.map(r => r.left)) - rootR.left) / rootR.width * 100,
          right: (Math.max(...els.map(r => r.right)) - rootR.left) / rootR.width * 100
        };
      });

      // spots : entièrement dans le rect d'un vantail haut fermé
      const vantauxHaut = [...document.querySelectorAll('.am-porte-haut')].map(e => e.getBoundingClientRect());
      const spotsDansVantail = spots.every(s => {
        const r = s.getBoundingClientRect();
        return vantauxHaut.some(v => r.left >= v.left - 0.5 && r.right <= v.right + 0.5 &&
          r.top >= v.top - 0.5 && r.bottom <= v.bottom + 0.5);
      });

      return {
        scrollH: de.scrollHeight, innerH: innerHeight,
        scrollW: de.scrollWidth, innerW: innerWidth,
        pieceR: { l: pieceR.left, t: pieceR.top, r: pieceR.right, b: pieceR.bottom, w: pieceR.width, h: pieceR.height },
        bornes, imgsOk, fonds, empreinte,
        nPlanches: planches.length, nMontants: montants.length,
        nTiroirs: tiroirs.length, nSpots: spots.length, nPortes: portes.length,
        plancheH, couvertureZone, spotsDansVantail, tiroirBoxHPct,
        armoireHpx: rootR.height
      };
    });

    ok(`[${tag}] jamais d'ascenseur vertical`, m0.scrollH <= m0.innerH + 1, `${m0.scrollH} > ${m0.innerH}`);
    ok(`[${tag}] jamais d'ascenseur horizontal`, m0.scrollW <= m0.innerW + 1, `${m0.scrollW} > ${m0.innerW}`);
    ok(`[${tag}] rien de rogné par .piece (pas le viewport — barre de dev réservée)`,
      m0.bornes.l >= m0.pieceR.l - 0.5 && m0.bornes.t >= m0.pieceR.t - 0.5 &&
      m0.bornes.r <= m0.pieceR.r + 0.5 && m0.bornes.b <= m0.pieceR.b + 0.5,
      `armoire L${m0.bornes.l.toFixed(1)} R${m0.bornes.r.toFixed(1)} T${m0.bornes.t.toFixed(1)} B${m0.bornes.b.toFixed(1)} ` +
      `vs .piece L${m0.pieceR.l.toFixed(1)} R${m0.pieceR.r.toFixed(1)} T${m0.pieceR.t.toFixed(1)} B${m0.pieceR.b.toFixed(1)}`);
    ok(`[${tag}] toutes les images chargées`, m0.imgsOk);
    ok(`[${tag}] 5 planches`, m0.nPlanches === 5, `n=${m0.nPlanches}`);
    ok(`[${tag}] 2 montants`, m0.nMontants === 2, `n=${m0.nMontants}`);
    ok(`[${tag}] 2 tiroirs`, m0.nTiroirs === 2, `n=${m0.nTiroirs}`);
    ok(`[${tag}] 2 spots`, m0.nSpots === 2, `n=${m0.nSpots}`);
    ok(`[${tag}] 4 vantaux`, m0.nPortes === 4, `n=${m0.nPortes}`);
    ok(`[${tag}] spots entièrement dans un vantail haut`, m0.spotsDansVantail);

    // 5 planches de même hauteur = plancheCh (3,0 % du repère, DONNÉE DE
    // CONFIG depuis l'itération 3 point 3 — plus le ratio du sprite), en px
    // ±0,3 px. m0.armoireHpx = hauteur réelle de l'armoire sur ce viewport.
    const PLANCHE_CH_PCT = 3.0;
    const plancheChAttenduPx = PLANCHE_CH_PCT / 100 * m0.armoireHpx;
    const pireCh = Math.max(...m0.plancheH.map(h => Math.abs(h - plancheChAttenduPx)));
    ok(`[${tag}] 5 planches à plancheCh=3,0% ±0,3 px`, pireCh < 0.3,
      `écart max=${pireCh.toFixed(2)}px (attendu ${plancheChAttenduPx.toFixed(1)}px, mesuré ${m0.plancheH.map(h => h.toFixed(1)).join(', ')})`);

    // portes fermées couvrent l'OUVERTURE AVANT à ±0,3 % (iteration 3,
    // point 1 — remplace la mesure fausse de l'itération 2, qui avait
    // relevé le panneau de fond au fond de la perspective intérieure, pas
    // le bord avant du cadre). Ouverture mesurée sur carcasse-vide.webp
    // (kit.json "ouverture") : left=14,414 % right=87,834 %.
    const OUVERTURE = { left: 14.414, right: 87.834, top: 11.132, bottom: 90.63 };
    for (const zone of ['haut', 'bas']) {
      const c = m0.couvertureZone[zone];
      ok(`[${tag}] portes ${zone} fermées couvrent l'ouverture avant à ±0,3 %`,
        Math.abs(c.left - OUVERTURE.left) <= 0.3 && Math.abs(c.right - OUVERTURE.right) <= 0.3,
        `left=${c.left.toFixed(2)} (attendu ${OUVERTURE.left}) right=${c.right.toFixed(2)} (attendu ${OUVERTURE.right})`);
    }

    // boîte tiroirs ≥ 0,10 H (iteration 3, point 3)
    const OUV_H = OUVERTURE.bottom - OUVERTURE.top;
    ok(`[${tag}] boîte tiroirs ≥ 0,10 H`,
      m0.tiroirBoxHPct >= 0.10 * OUV_H - 0.05,
      `boîte=${m0.tiroirBoxHPct.toFixed(3)}% (min attendu ${(0.10 * OUV_H).toFixed(3)}%)`);

    const fondsOk = await page.evaluate(async (urls) => {
      const res = await Promise.all(urls.map(u => new Promise(r => {
        const i = new Image(); i.onload = () => r(true); i.onerror = () => r(false); i.src = u;
      })));
      return res.every(Boolean);
    }, m0.fonds);
    ok(`[${tag}] fonds CSS des vantaux se chargent`, fondsOk, m0.fonds.join(' | '));

    if (!empreinte) {
      empreinte = m0.empreinte;
    } else {
      let pire = 0, quoi = '';
      for (const k of Object.keys(empreinte)) {
        if (!m0.empreinte[k]) { pire = 1; quoi = `pièce absente : ${k}`; break; }
        for (let i = 0; i < 4; i++) {
          const d = Math.abs(empreinte[k][i] - m0.empreinte[k][i]);
          if (d > pire) { pire = d; quoi = `${k} axe${i}`; }
        }
      }
      ok(`[${tag}] proportions identiques au viewport de référence`, pire <= 0.015,
        `écart max ${(pire * 100).toFixed(2)} % (${quoi})`);
    }

    // ?etat=ouvert : les 4 sprites ouverts visibles, les 4 fermés à opacité 0
    await page.goto(pathToFileURL(DEV).href + '?etat=ouvert', { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);
    const etatOuvert = await page.evaluate(() => {
      const root = document.getElementById('armoire');
      const rootR = root.getBoundingClientRect();
      const ouvertesEl = [...document.querySelectorAll('.am-porte-ouverte')];
      const ouvertes = ouvertesEl.map(e => +getComputedStyle(e).opacity);
      const fermees = [...document.querySelectorAll('.am-porte-fermee')].map(e => +getComputedStyle(e).opacity);
      const bornesVantaux = ouvertesEl.map(e => {
        const r = e.getBoundingClientRect();
        return {
          side: e.classList.contains('am-porte-g') ? 'g' : 'd',
          left: (r.left - rootR.left) / rootR.width * 100,
          right: (r.right - rootR.left) / rootR.width * 100
        };
      });
      return { ouvertes, fermees, bornesVantaux };
    });
    ok(`[${tag}] ?etat=ouvert : les 4 sprites ouverts visibles`,
      etatOuvert.ouvertes.every(o => o > 0.95), JSON.stringify(etatOuvert.ouvertes));
    ok(`[${tag}] ?etat=ouvert : les 4 sprites fermés à opacité 0`,
      etatOuvert.fermees.every(o => o < 0.05), JSON.stringify(etatOuvert.fermees));
    // vantail ouvert dans sa boîte [libre,charnière] à ±0,3 % (iteration 3,
    // point 2 — remplace [0,13.6%] de l'itération 2). Gauche [2.5,12.3],
    // droite [87.7,97.5] par symétrie autour de 50 (porteOuverte DEFAUT).
    const PO = { libre: 2.5, charniere: 12.3 };
    const vantauxOk = etatOuvert.bornesVantaux.every(v => {
      const [lo, hi] = v.side === 'g' ? [PO.libre, PO.charniere] : [100 - PO.charniere, 100 - PO.libre];
      return Math.abs(v.left - lo) <= 0.3 && Math.abs(v.right - hi) <= 0.3;
    });
    ok(`[${tag}] vantaux ouverts dans [2.5,12.3%] (g) / [87.7,97.5%] (d) à ±0,3 %`,
      vantauxOk, JSON.stringify(etatOuvert.bornesVantaux));

    // toggle : ouvre puis referme
    await page.goto(pathToFileURL(DEV).href, { waitUntil: 'networkidle' });
    await page.click('.am-porte-haut.am-porte-g');
    await page.waitForTimeout(800);
    const ouvertApresClick = await page.evaluate(() =>
      document.getElementById('armoire').classList.contains('am-ouvert-haut'));
    ok(`[${tag}] toggle ouvre`, ouvertApresClick);
    await page.click('.am-porte-haut.am-porte-g');
    await page.waitForTimeout(800);
    const refermeApresClick = await page.evaluate(() =>
      !document.getElementById('armoire').classList.contains('am-ouvert-haut'));
    ok(`[${tag}] toggle referme`, refermeApresClick);

    if (vp.w === 360 && vp.h === 740) {
      ok('[360x740] poids images ≤ 250 Ko', imgBytes <= 250 * 1024, `${(imgBytes / 1024).toFixed(0)} Ko`);
    }
    ok(`[${tag}] aucune erreur JS / console`, errors.length === 0, errors.join(' | '));
  } catch (e) {
    ok(`[${tag}] exécution sans exception`, false, e.message);
  }
  await page.close();
}

await browser.close();

console.log('\n── armoire-meuble.spec.mjs (Le Meuble v7, HO-MJ-20) ──');
for (const [cond, name, detail] of checks) {
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
}
console.log(fail === 0 ? `\n\x1b[32m✓ armoire-meuble OK\x1b[0m\n` : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail === 0 ? 0 : 1);
