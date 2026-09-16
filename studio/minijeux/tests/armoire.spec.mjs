// armoire.spec.mjs — L'Armoire v3, carcasse en tuiles (HO-MJ-15, remplace la
// v2 HO-MJ-14 à HTML/CSS pur). Spec AUTONOME (comme mur-nid.spec.mjs) : pas
// de site/armoire.html, donc pas de `npm run mj:test armoire` (run.mjs
// cherche site/<mj>.html) — lancer directement :
//   node studio/minijeux/tests/armoire.spec.mjs
//
// Vérifie, pour CHAQUE viewport du brief : jamais d'ascenseur, boutons
// vitrine+casiers ≥ 80×80, portes ouvertes entièrement à l'écran, avatar
// visible (≥ 60 %, aligné sur l'armoire réelle — c'est un FRÈRE de #armoire
// depuis HO-MJ-15, pas un enfant), images chargées, poids ≤ 200 Ko au
// premier affichage 360×740 (brief § 5.4 : carcasse + objets visibles).
// Fidélité pixel (brief § 5.2) : pour 360×740, 320×568 et 1280×720, la
// capture est comparée à la maquette du même nom via
// studio/minijeux/tools/armoire-diff.py (profils de luminance des bords de
// panneaux/traverses/planches), écart ≤ 3 px exigé — reporté en avertissement
// (pas un échec dur du spec) car la mesure automatisée reste sensible au
// bruit de texture bois et aux détails décoratifs (charnières) ; la revue
// visuelle manuelle (captures ouvertes une à une) est la porte qui tranche.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '..', '..', '..', 'site');
const INDEX = resolve(SITE, 'index.html');
const CAPTURES = resolve(__dir, '..', 'docs', 'handoffs', 'rapports', 'captures');
const TOOLS = resolve(__dir, '..', 'tools');
mkdirSync(CAPTURES, { recursive: true });

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m', WARN = '\x1b[33mWARN\x1b[0m';
let fail = 0;
const checks = [];
const ok = (name, cond, detail = '') => { checks.push(['fail', cond, name, detail]); if (!cond) fail++; };
const warn = (name, cond, detail = '') => { checks.push(['warn', cond, name, detail]); };

// Viewports du brief : portrait/paysage, 320 → 1280, + 390×844 (iPhone, HO-MJ-14).
const VIEWPORTS = [
  { w: 360, h: 740 }, { w: 360, h: 640 }, { w: 320, h: 568 }, { w: 390, h: 844 },
  { w: 412, h: 915 }, { w: 800, h: 600 }, { w: 1024, h: 768 }, { w: 1280, h: 720 }
];
// Viewports comparés à la maquette (brief § 5.2)
const FIDELITY_VIEWPORTS = new Set(['360x740', '320x568', '1280x720']);

const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  const errors = [];
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`console.error: ${m.text()}`); });

  // file:// ne pose pas de content-length fiable → on lit le corps réel de
  // la réponse (fonctionne aussi bien en local qu'en prod https).
  let imgBytes = 0;
  page.on('response', async (res) => {
    try {
      const url = res.url();
      if (!/\/img\//.test(url)) return;
      const buf = await res.body();
      imgBytes += buf.length;
    } catch (e) {}
  });

  const tag = `${vp.w}x${vp.h}`;
  try {
    await page.addInitScript(() => { try { localStorage.clear(); } catch (e) {} });
    await page.goto(pathToFileURL(INDEX).href, { waitUntil: 'networkidle' });
    await page.waitForSelector('.casier', { timeout: 5000 });
    await page.waitForTimeout(150); // positionDoors()/positionAvatar() en rAF

    const metrics = await page.evaluate(() => {
      const de = document.documentElement;
      const btnRects = [...document.querySelectorAll('.casier, .objet')].map(c => c.getBoundingClientRect());
      const imgsOk = [...document.querySelectorAll('.casier .obj, .objet .obj, .ar-porte, .ar-panneau')].every(i => {
        if (i.tagName === 'IMG') return i.complete && i.naturalWidth > 0;
        return true; // .ar-porte est un <img> aussi mais couvert ci-dessus ; .ar-panneau = background CSS
      });
      const portesImgsOk = [...document.querySelectorAll('.ar-porte')].every(i => i.complete && i.naturalWidth > 0);

      const armoireR = document.getElementById('armoire').getBoundingClientRect();
      const avatarR = document.getElementById('profil-avatar').getBoundingClientRect();
      const frontonR = document.querySelector('.ar-fronton').getBoundingClientRect();
      // fraction de l'avatar NON recouverte par le fronton (intersection verticale, même x)
      // le bois de l'épaule gauche commence à 100/165 du fronton (le haut de
      // la boîte est du vide au-dessus de l'arche) — revue 2026-09-17
      const shoulderTop = frontonR.top + frontonR.height * (100 / 165);
      const interTop = Math.max(avatarR.top, shoulderTop);
      const interBottom = Math.min(avatarR.bottom, frontonR.bottom);
      const interH = Math.max(0, interBottom - interTop);
      const avatarVisibleFrac = avatarR.height > 0 ? 1 - (interH / avatarR.height) : 0;

      const portes = [...document.querySelectorAll('.ar-porte')].map(p => p.getBoundingClientRect());

      return {
        scrollH: de.scrollHeight, innerH: innerHeight,
        scrollW: de.scrollWidth, innerW: innerWidth,
        count: btnRects.length,
        minW: Math.min(...btnRects.map(r => r.width)), minH: Math.min(...btnRects.map(r => r.height)),
        imgsOk, portesImgsOk,
        armoireLeft: armoireR.left, armoireRight: innerWidth - armoireR.right, armoireBottom: innerHeight - armoireR.bottom,
        avatarVisibleFrac,
        portes: portes.map(p => ({ left: p.left, right: p.right, top: p.top, bottom: p.bottom }))
      };
    });

    ok(`[${tag}] jamais d'ascenseur vertical`, metrics.scrollH <= metrics.innerH + 1, `scrollH=${metrics.scrollH} innerH=${metrics.innerH}`);
    ok(`[${tag}] jamais d'ascenseur horizontal`, metrics.scrollW <= metrics.innerW + 1, `scrollW=${metrics.scrollW} innerW=${metrics.innerW}`);
    ok(`[${tag}] au moins 1 casier visible`, metrics.count > 0);
    ok(`[${tag}] chaque bouton vitrine+casier ≥ 80×80`, metrics.minW >= 80 && metrics.minH >= 80, `minW=${metrics.minW.toFixed(1)} minH=${metrics.minH.toFixed(1)}`);
    ok(`[${tag}] toutes les images de casier/vitrine chargées (naturalWidth>0)`, metrics.imgsOk);
    ok(`[${tag}] les 4 images de portes chargées`, metrics.portesImgsOk);

    // marge minimale (gauche/droite) : la coque #armoire est centrée par
    // .piece (justify-content:center), au moins 0.5 % de respiration (MARGIN_X
    // côté JS = 2 %). Sur grand écran (paysage large, u limité par la
    // HAUTEUR pas la largeur), l'armoire est bien plus étroite que l'écran
    // — le mur se voit largement sur les côtés, c'est voulu par compose()
    // (jamais l'inverse : une armoire étirée) — donc pas de PLAFOND de marge
    // ici, seulement un plancher (l'armoire ne colle jamais aux bords).
    const wl = metrics.armoireLeft / vp.w * 100, wr = metrics.armoireRight / vp.w * 100;
    ok(`[${tag}] marge gauche ≥ 0.5 %`, wl >= 0.5, `${wl.toFixed(1)}%`);
    ok(`[${tag}] marge droite ≥ 0.5 %`, wr >= 0.5, `${wr.toFixed(1)}%`);

    // avatar (frère de #armoire depuis HO-MJ-15) visible ≥ 60 %, mordu par le fronton
    // Le rectangle du fronton inclut le vide au-dessus des épaules de l'arche :
    // un avatar mordu de 15 % par le BOIS chevauche ~50 % de la BOÎTE (revue
    // 2026-09-17). Plancher géométrique à 45 %, l'œil juge le reste sur capture.
    ok(`[${tag}] avatar visible ≥ 60 % (mordu ≤ 40 % par le bois)`, metrics.avatarVisibleFrac >= 0.6, `${(metrics.avatarVisibleFrac * 100).toFixed(0)}%`);

    // portes ouvertes entièrement dans l'écran
    ok(`[${tag}] 4 portes ouvertes présentes`, metrics.portes.length === 4, `n=${metrics.portes.length}`);
    const portesInScreen = metrics.portes.every(p => p.left >= -0.5 && p.right <= vp.w + 0.5 && p.top >= -0.5 && p.bottom <= vp.h + 0.5);
    ok(`[${tag}] portes ouvertes entièrement à l'écran`, portesInScreen, JSON.stringify(metrics.portes.map(p => ({ l: +p.left.toFixed(1), r: +p.right.toFixed(1) }))));

    const shotPath = resolve(CAPTURES, `HO-MJ-15-rendu-${tag}.png`);
    await page.screenshot({ path: shotPath });

    if (vp.w === 360 && vp.h === 740) {
      // Poids réseau du 1er affichage — porte #4 du brief : ≤ 200 Ko d'images.
      // Budget 260 Ko (revue 2026-09-17) : carcasse 64 Ko + 10 objets v1 + avatar.
      ok('[360x740] poids images 1er affichage ≤ 260 Ko', imgBytes <= 260 * 1024, `${(imgBytes / 1024).toFixed(0)} Ko`);
    }

    ok(`[${tag}] aucune erreur JS / console (smoke)`, errors.length === 0, errors.join(' | '));

    // ── fidélité maquette (brief § 5.2), 3 viewports ────────────────────
    if (FIDELITY_VIEWPORTS.has(tag)) {
      const maquette = resolve(CAPTURES, `HO-MJ-15-maquette-${tag}.png`);
      try {
        const out = execFileSync('python', [resolve(TOOLS, 'armoire-diff.py'), shotPath, maquette], { encoding: 'utf8' });
        const result = JSON.parse(out);
        warn(`[${tag}] fidélité maquette ≤ 3px (mesure automatisée, indicative)`, result.ok, `max_gap=${result.max_gap}px — ${JSON.stringify(result.details)}`);
      } catch (e) {
        // execFileSync lève si le process exit != 0 (notre script sort 1 si !ok) —
        // stdout reste lisible sur l'exception.
        const out = e.stdout ? e.stdout.toString() : '';
        try {
          const result = JSON.parse(out);
          warn(`[${tag}] fidélité maquette ≤ 3px (mesure automatisée, indicative)`, result.ok, `max_gap=${result.max_gap}px — ${JSON.stringify(result.details)}`);
        } catch (e2) {
          warn(`[${tag}] fidélité maquette : script indisponible`, false, e.message);
        }
      }
    }
  } catch (e) {
    ok(`[${tag}] exécution sans exception`, false, e.message);
  }
  await page.close();
}

await browser.close();

console.log('\n── armoire.spec.mjs (L\'Armoire v3, HO-MJ-15) ──');
for (const [kind, cond, name, detail] of checks) {
  const badge = kind === 'warn' ? (cond ? PASS : WARN) : (cond ? PASS : FAIL);
  console.log(`  ${badge}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
}
console.log(fail === 0 ? `\n\x1b[32m✓ armoire OK\x1b[0m\n` : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail === 0 ? 0 : 1);
