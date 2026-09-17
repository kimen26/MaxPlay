// armoire-proto-shot.mjs — HO-MJ-17 : capture le prototype statique
// tools/armoire-proto/index.html aux 8 viewports du brief § 4, + mesures
// (scrollHeight/Width, largeur du corps, part visible des portes).
// Playwright vient de node_modules/playwright à la racine du repo (pas de
// dépendance dans studio/minijeux/tools) — même approche que tests/run.mjs
// (--allow-file-access-from-files pour que <img> locales ne soient pas
// taintées en file://).
import { chromium } from '../../../node_modules/playwright/index.mjs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';

const __dir = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dir, 'armoire-proto', 'index.html');
const outDir = resolve(__dir, '..', 'docs', 'handoffs', 'rapports', 'captures');
mkdirSync(outDir, { recursive: true });

const VIEWPORTS = [
  [360, 740], [360, 640], [320, 568], [390, 844],
  [412, 915], [800, 600], [1024, 768], [1280, 720]
];

const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });
const results = [];

for (const [w, h] of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
  await page.waitForTimeout(150); // laisse le resize/build() se stabiliser

  const measure = await page.evaluate(() => {
    const doc = document.documentElement;
    const arm = document.getElementById('armoire');
    const rect = arm.getBoundingClientRect();
    const imgs = Array.from(document.querySelectorAll('img'));
    const imgsBroken = imgs.filter(img => !(img.complete && img.naturalWidth > 0)).map(img => img.src);
    // .ar-porte-hote garde sa boîte DOM (315u) même une fois l'enfant
    // .ar-porte tourné en 3D : la largeur RENDUE (repliée par rotateY) est
    // sur .ar-porte, c'est elle qu'il faut mesurer pour "part visible".
    // HO-MJ-17 passe 3 pt.3 : getBoundingClientRect() ne donne QUE la boîte
    // englobante 2D (ne dit rien sur la hauteur du bord extérieur vs
    // charnière) — on utilise getBoxQuads() qui rend les 4 coins RÉELLEMENT
    // transformés en 3D par rotateY+perspective, pour mesurer la hauteur de
    // chaque bord vertical (distance entre coin haut et coin bas de CE bord).
    // getBoxQuads() n'existe pas dans ce Chromium (API jamais livrée hors
    // Firefox) et getBoundingClientRect() ne donne que la boîte englobante
    // 2D du trapèze tourné (brief passe 3 pt.3 : "ne suffit pas" — un scan
    // de pixels s'est avéré peu fiable en pratique : le fond sombre de la
    // vitrine derrière la porte est confondu avec la porte car les deux
    // sont "non-mur"). Solution retenue, EXACTE : on connaît la largeur
    // CSS réelle (offsetWidth), l'angle rotateY et la distance perspective
    // (lus depuis getComputedStyle) donc on calcule analytiquement, par
    // trigonométrie, la hauteur projetée du bord charnière (x=0, profondeur
    // 0) et du bord extérieur (x=largeur, profondeur = largeur*sin(angle)) :
    // hauteur_apparente(x) = hauteur_css * perspective / (perspective - profondeur(x)).
    // HO-MJ-17 passe 4 pt.1 (BLOQUANT, portes droites posées dans le corps) :
    // porte de vérif ajoutée — la charnière doit être à ±6u du bord
    // EXTÉRIEUR du montant correspondant (pas à l'intérieur du corps), et
    // le CENTRE de la porte doit être hors du corps (x < bord gauche du
    // corps pour .g, x > bord droit pour .d).
    const uPx = parseFloat(arm.dataset.u) || 1;
    const armBox = arm.getBoundingClientRect();
    const montantG = document.querySelector('.ar-montant-g'), montantD = document.querySelector('.ar-montant-d');
    const bordExtMontantG = montantG ? montantG.getBoundingClientRect().left : null;
    const bordExtMontantD = montantD ? montantD.getBoundingClientRect().right : null;
    const portes = Array.from(document.querySelectorAll('.ar-porte-hote')).map(hote => {
      const porteEl = hote.querySelector('.ar-porte');
      const r = porteEl.getBoundingClientRect();
      const visible = Math.max(0, Math.min(r.right, window.innerWidth) - Math.max(r.left, 0));
      const isGauche = hote.className.indexOf(' g') !== -1;
      const centrePorte = (r.left + r.right) / 2;
      const centreHorsCorps = isGauche ? centrePorte < armBox.left : centrePorte > armBox.right;
      // bord charnière = le bord de r le plus proche du montant correspondant
      const bordCharniereX = isGauche ? r.right : r.left;
      const bordExtMontant = isGauche ? bordExtMontantG : bordExtMontantD;
      const ecartCharniereU = (bordExtMontant != null) ? +((bordCharniereX - bordExtMontant) / uPx).toFixed(1) : null;
      const charniereOk = ecartCharniereU != null && Math.abs(ecartCharniereU) <= 6;
      const cs = getComputedStyle(porteEl);
      const m = new DOMMatrix(cs.transform === 'none' ? undefined : cs.transform);
      // angle réel de rotation Y à partir de la matrice (robuste même si le
      // CSS change d'écriture) : cos(theta) = m11 (composante [0][0])
      const theta = Math.acos(Math.max(-1, Math.min(1, m.m11)));
      const wCss = porteEl.offsetWidth, hCss = porteEl.offsetHeight;
      // distance perspective : lue depuis le transform du PARENT si posée
      // là, sinon depuis .ar-porte elle-même (ici : perspective() est dans
      // le transform de .ar-porte, sa valeur exacte importe peu ici car on
      // la redérive depuis m.m34 : perspective = -1/m34).
      const persp = m.m34 !== 0 ? -1 / m.m34 : Infinity;
      const profondeurBord = wCss * Math.sin(theta); // profondeur du bord OPPOSÉ au pivot
      const scaleBordExt = persp === Infinity ? 1 : persp / (persp - profondeurBord);
      const hBordPivot = hCss; // le bord au pivot (profondeur 0) n'est pas mis à l'échelle
      const hBordOppose = hCss * scaleBordExt;
      // pivot = bord charnière (transform-origin 100% pour .g, 0% pour .d)
      const bordCharH = hBordPivot, bordExtH = hBordOppose;
      const extPlusHautPct = bordCharH ? +(100 * (bordExtH - bordCharH) / bordCharH).toFixed(1) : null;
      return {
        classe: hote.className, largeur: r.width,
        visiblePct: r.width ? +(100 * visible / r.width).toFixed(1) : 0,
        bordExtH: +bordExtH.toFixed(1), bordCharH: +bordCharH.toFixed(1), extPlusHautPct,
        centreHorsCorps, ecartCharniereU, charniereOk
      };
    });
    // HO-MJ-17 passe 3 pt.1 : la vitrine-2 doit être ≥18% plus sombre que le
    // montant (même porte de vérif que les casiers). Lire un pixel déjà
    // peint à l'écran n'est pas possible en JS pur sans lib de rendu DOM ;
    // on renvoie ici les COORDONNÉES du centre de chaque zone, et la
    // luminance réelle est mesurée côté Node sur le PNG de la capture
    // (juste après page.screenshot(), voir plus bas).
    // Le point milieu vertical du montant (toute sa hauteur) tombe parfois
    // pile sur une planche qui le chevauche (elles ont un z-index
    // supérieur) : on a mesuré une planche claire au lieu du montant sur
    // certains viewports. Fix : prendre le point du montant à LA MÊME
    // hauteur Y que le centre de vitrine-2, jamais recouvert à cet endroit.
    function zoneCentre(el, fx, fy) {
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.left + r.width * fx), y: Math.round(r.top + r.height * fy) };
    }
    const vitrines = Array.from(document.querySelectorAll('.ar-vitrine'));
    const montantEl = document.querySelector('.ar-montant-g');
    const vitrine2Point = vitrines[1] ? zoneCentre(vitrines[1], 0.5, 0.5) : null;
    const montantRect = montantEl ? montantEl.getBoundingClientRect() : null;
    const montantPoint = (montantRect && vitrine2Point)
      ? { x: Math.round(montantRect.left + montantRect.width * 0.5), y: vitrine2Point.y }
      : null;
    // HO-MJ-17 passe 4 pt.2 : mesurer aussi le casier du MILIEU (même
    // porte de vérif que vitrine-2), pour vérifier que les deux tombent
    // dans la même fourchette 30-40% (un seul jeu de règles CSS).
    // HO-MJ-17 passe 4 pt.3 : sous le socle il ne doit rien y avoir sauf
    // les 2 pieds — porte de vérif = une ligne de pixels 4px sous le socle,
    // ENTRE les pieds, doit être 100% couleur du mur (aucun tronçon de
    // montant/séparateur résiduel). On renvoie les coordonnées de scan ; la
    // couleur réelle se lit sur le PNG (canvas taintée par les <img>).
    const socleEl = document.querySelector('.ar-socle');
    const piedsEls = Array.from(document.querySelectorAll('.ar-pied'));
    let sousLeSocleScan = null;
    if (socleEl && piedsEls.length >= 2) {
      const sRect = socleEl.getBoundingClientRect();
      const p0 = piedsEls[0].getBoundingClientRect(), p1 = piedsEls[1].getBoundingClientRect();
      sousLeSocleScan = {
        y: Math.round(sRect.bottom + 4),
        xStart: Math.round(p0.right + 4),
        xEnd: Math.round(p1.left - 4)
      };
    }
    const casiers = Array.from(document.querySelectorAll('.ar-casiers'));
    const derniereRangeeCasiers = casiers[casiers.length - 1];
    const casesMilieu = derniereRangeeCasiers
      ? Array.from(derniereRangeeCasiers.querySelectorAll('.ar-casier'))
      : [];
    const caseMilieu = casesMilieu[Math.floor(casesMilieu.length / 2)];
    const casierPoint = caseMilieu ? zoneCentre(caseMilieu, 0.5, 0.5) : null;

    return {
      scrollHeight: doc.scrollHeight, innerHeight: window.innerHeight,
      scrollWidth: doc.scrollWidth, innerWidth: window.innerWidth,
      corpsW: rect.width, corpsWPct: +(100 * rect.width / window.innerWidth).toFixed(1),
      rows: arm.dataset.rows, u: arm.dataset.u, ratio: arm.dataset.ratio,
      imgsBroken, portes, vitrine2Point, montantPoint, casierPoint, sousLeSocleScan
    };
  });

  const shotPath = resolve(outDir, `HO-MJ-17-proto-${w}x${h}.png`);
  await page.screenshot({ path: shotPath });
  results.push({ w, h, shotPath, errors, ...measure });
  await page.close();
}

await browser.close();

console.log('\n── HO-MJ-17 armoire-proto : 8 captures ──\n');
for (const r of results) {
  const noScrollY = r.scrollHeight <= r.innerHeight;
  const noScrollX = r.scrollWidth <= r.innerWidth;
  console.log(`${r.w}x${r.h} : u=${r.u} rows=${r.rows} ratio=${r.ratio} corps=${r.corpsWPct}% ` +
    `scrollY_ok=${noScrollY} scrollX_ok=${noScrollX} imgsBroken=${r.imgsBroken.length} erreurs=${r.errors.length}`);
  for (const p of r.portes) {
    console.log(`    ${p.classe} : ${p.visiblePct}% visible, bordExt=${p.bordExtH}px bordChar=${p.bordCharH}px ` +
      `(bord ext ${p.extPlusHautPct}% plus haut) | centreHorsCorps=${p.centreHorsCorps} ` +
      `charniere=${p.ecartCharniereU}u_du_montant ${p.charniereOk ? 'OK' : 'HORS TOLERANCE (>6u)'}`);
  }
  if (r.imgsBroken.length) console.log('    IMAGES CASSEES:', r.imgsBroken);
  if (r.errors.length) console.log('    ERREURS JS:', r.errors);
  console.log(`    -> ${r.shotPath}`);
}

// points de mesure pour armoire-proto-mesure.py : pt.2 (vitrine-2 ET casier
// du milieu vs montant, 30-40% plus sombre requis chacun, MÊME fourchette
// pour les deux). La luminance n'est pas lisible depuis le DOM seul
// (canvas taintée par les <img> file://) — mesurée sur le PNG de la
// capture. Le pt.1/pt.3 portes sont déjà mesurés analytiquement ci-dessus.
writeFileSync(resolve(outDir, 'HO-MJ-17-points-mesure.json'), JSON.stringify(
  results.map(r => ({
    w: r.w, h: r.h,
    vitrine2Point: r.vitrine2Point, montantPoint: r.montantPoint, casierPoint: r.casierPoint,
    sousLeSocleScan: r.sousLeSocleScan
  })),
  null, 2
));
