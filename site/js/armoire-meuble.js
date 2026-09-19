// ─────────────────────────────────────────────────────────────────────────
//  armoire-meuble.js — Le MEUBLE vide de l'armoire (HO-MJ-20, v7).
//
//  Recompose le meuble depuis un KIT de pieces (site/img/armoire/v7/), une
//  piece par NATURE (carcasse, planche, montant, porte fermee/ouverte,
//  tiroir, spot), jamais une bande par position (D-029, L-137). Ce fichier
//  ne calcule AUCUNE dimension : tout est pose en % du repere de design fixe
//  911 x 1480 (D-027, D-028, L-138), comme armoire.js v6. Zero handler de
//  resize, zero contrainte en pixels sur la geometrie visuelle (L-140).
//
//  API : window.ArmoireMeuble = { build(root, config), setZone(root, zone,
//  open), toggle(root, zone) }
//
//  HO-MJ-22 (suite) branchera armoire.js v6 sur ce module a la place de
//  shell.webp. Ce fichier-ci ne pose QUE le meuble vide : pas de case, pas
//  d'objet, pas de prenom, pas d'avatar (§ 4 du brief).
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  var IMG = 'img/armoire/v7/';

  // ── Configuration : une DONNEE, surchargeable ───────────────────────────
  // ITERATION 3 (arbitrage coordinateur) : abandon des y mesures sur
  // ref-ouverte.png (iterations 1-2, source d'incoherence — voir rapport
  // HO-MJ-20 § 9.4). TOUT derive desormais de l'OUVERTURE AVANT mesuree sur
  // carcasse-vide.webp (kit.json "ouverture" — le rectangle forme par les
  // faces AVANT des montants/traverses/socle, PAS le panneau de fond au fond
  // de la perspective interieure : erreur d'iteration 2, corrigee, voir
  // rapport § 10.1), en FRACTIONS de sa largeur W et hauteur H. Chiffres de
  // fraction fournis par le coordinateur, releves sur ref-ouverte.png.
  var OUVERTURE = { left: 14.414, right: 87.834, top: 11.132, bottom: 90.63 };
  var OUV_W = OUVERTURE.right - OUVERTURE.left;
  var OUV_H = OUVERTURE.bottom - OUVERTURE.top;
  function xFrac(f) { return OUVERTURE.left + f * OUV_W; }
  function yFrac(f) { return OUVERTURE.top + f * OUV_H; }

  // epaisseur de planche : DONNEE DE CONFIG, pas le ratio du sprite (brief
  // iteration 3 point 2) — le sprite planche.webp est une dalle vue de
  // dessus (h/w=0,0986, soit 6,3% a cette largeur), largement plus epaisse
  // qu'une planche de la reference (1,7 a 2,7%). Compressee verticalement en
  // background-size:100% 100%, assume. Traverses (planches 2/3) et etageres
  // partagent la meme epaisseur.
  var PLANCHE_CH = 3.0;

  var PLANCHES_Y = [0.179, 0.348, 0.510, 0.671, 0.837].map(yFrac);

  var DEFAUT = {
    // 5 planches, du haut vers le bas. y = TOP (fraction de H, coordinateur).
    // x0/x1 = bords de l'ouverture (le chevauchement de 0,5% du repere est
    // ajoute au placement par buildPlanches(), pas stocke ici).
    planches: PLANCHES_Y.map(function (y) { return { y: y, x0: OUVERTURE.left, x1: OUVERTURE.right }; }),
    plancheCh: PLANCHE_CH,

    // 2 montants de niche : x = 0,285 W et 0,717 W (coordinateur). y0/y1 =
    // BAS reel de la planche 2 / HAUT de la planche 3 (planches[1].y +
    // plancheCh, planches[2].y) — coherent par construction avec plancheCh,
    // contrairement aux iterations 1-2 qui melangeaient deux sources.
    montants: [
      { x: xFrac(0.285), y0: PLANCHES_Y[1] + PLANCHE_CH, y1: PLANCHES_Y[2] },
      { x: xFrac(0.717), y0: PLANCHES_Y[1] + PLANCHE_CH, y1: PLANCHES_Y[2] }
    ],

    // 2 tiroirs : FACADE seule (tiroir-face.webp). Boite = entre le BAS de
    // la planche 5 et le bas de l'ouverture (coordinateur : « ≈ 0,13 H » —
    // mesure ici 0,125 H, ≥ 0,10 H exige par le spec, donc VISIBLE — corrige
    // le defaut degenere de l'iteration 2, ou les deux sources de mesure
    // incoherentes donnaient une boite de 0,235% du repere). Largeur
    // commandee par la hauteur si elle ne rentre pas (ici elle rentre :
    // 2*wEach+gap=63,08% < OUV_W=73,42%), centrees, 1% d'ecart entre les 2.
    tiroirs: (function () {
      var p5Bottom = PLANCHES_Y[4] + PLANCHE_CH;
      var boxH = OUVERTURE.bottom - p5Bottom;
      var ratioHW = 154 / 480; // tiroir-face.webp
      var gap = 1.0;
      var wEach = boxH / ratioHW;
      if (2 * wEach + gap > OUV_W) { wEach = (OUV_W - gap) / 2; } // largeur commande si besoin
      var milieu = (OUVERTURE.left + OUVERTURE.right) / 2;
      var cy = (p5Bottom + OUVERTURE.bottom) / 2;
      return [
        { cx: milieu - gap / 2 - wEach / 2, cy: cy, cw: wEach },
        { cx: milieu + gap / 2 + wEach / 2, cy: cy, cw: wEach }
      ];
    })(),

    // 2 spots : x = 0,25 W et 0,75 W, centre y = haut.top + 0,09*(0,354*H)
    // (coordinateur), largeur 6% du repere (fixe, pas une fraction de W).
    spots: [
      { x: xFrac(0.25), y: OUVERTURE.top + 0.09 * (0.354 * OUV_H), w: 6 },
      { x: xFrac(0.75), y: OUVERTURE.top + 0.09 * (0.354 * OUV_H), w: 6 }
    ],

    // Zones de porte, fractions de H depuis le haut de l'ouverture
    // (coordinateur) : haut=[0,0.354], niche=[0.354,0.531], bas=[0.531,1].
    portes: { haut: { top: yFrac(0), bottom: yFrac(0.354) }, bas: { top: yFrac(0.531), bottom: yFrac(1) } },
    // x = bord GAUCHE de chaque vantail = bords de l'ouverture / son milieu.
    porteX: { gauche: OUVERTURE.left, droite: (OUVERTURE.left + OUVERTURE.right) / 2 },

    // Vantail ouvert (coordinateur, iteration 3) : sur ref-ouverte.png, le
    // vantail gauche ouvert va de x=2,5% (bord libre) a x=12,3% (les
    // pentures sont SUR le montant, le vantail recouvre le bord du corps de
    // ~1% — plus de trou entre la feuille et le corps, defaut signale en
    // iteration 2 § 9.1). Boite gauche [2.5,12.3], droite [87.7,97.5] par
    // symetrie autour de 50.
    porteOuverte: { libre: 2.5, charniere: 12.3, depasseHaut: 0.0686, depasseBas: 0.1558 }
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function place(el, cx, cy, cw, ch) {
    el.style.setProperty('--cx', cx + '%');
    el.style.setProperty('--cy', cy + '%');
    el.style.setProperty('--cw', cw + '%');
    el.style.setProperty('--ch', ch + '%');
  }

  // ── La carcasse : une seule image, z-index 10 ───────────────────────────
  // pose_pct (studio/minijeux/tools/armoire-kit.py, kit.json) : le crop ne
  // remplit PAS tout le frame 911x1480 (marge autour de l'arche/pieds après
  // rognage sur la boîte alpha totale) — jamais poser en inset:0.
  var CARCASSE_POSE = { left: 10.419, top: 0.811, width: 78.924, height: 98.311 };
  function buildCarcasse(root) {
    var img = document.createElement('img');
    img.className = 'am-carcasse';
    img.src = IMG + 'carcasse-vide.webp';
    img.alt = '';
    img.style.setProperty('--gx', CARCASSE_POSE.left + '%');
    img.style.setProperty('--gy', CARCASSE_POSE.top + '%');
    img.style.setProperty('--gw', CARCASSE_POSE.width + '%');
    img.style.setProperty('--gh', CARCASSE_POSE.height + '%');
    root.appendChild(img);
  }

  // ── Les 5 planches : le meme sprite, repete, z-index 20 ─────────────────
  // Chevauche les cotes de 0,5% du repere de chaque cote (brief § 4).
  function buildPlanches(root, cfg) {
    var overlap = 0.5;
    cfg.planches.forEach(function (p, i) {
      var img = document.createElement('img');
      img.className = 'am-planche';
      img.src = IMG + 'planche.webp';
      img.alt = '';
      img.dataset.idx = i;
      var cx = (p.x0 + p.x1) / 2;
      var cw = (p.x1 - p.x0) + overlap * 2;
      place(img, cx, p.y + cfg.plancheCh / 2, cw, cfg.plancheCh);
      root.appendChild(img);
    });
  }

  // ── Les 2 montants de niche : z-index 25 ────────────────────────────────
  // Chevauchent la planche du dessus et celle du dessous de 0,5% (brief § 4).
  function buildMontants(root, cfg) {
    var overlap = 0.5;
    // largeur du montant en % du repere, deduite du ratio du sprite
    // montant.webp (120x1188 -> w/h etroit) appliquee a sa hauteur de niche.
    cfg.montants.forEach(function (m, i) {
      var img = document.createElement('img');
      img.className = 'am-montant';
      img.src = IMG + 'montant.webp';
      img.alt = '';
      img.dataset.idx = i;
      var cy = (m.y0 + m.y1) / 2;
      var ch = (m.y1 - m.y0) + overlap * 2;
      // largeur : ratio du sprite (montant.webp) applique a ch, converti en
      // unite horizontale via le ratio du repere (FRAME_W/FRAME_H).
      place(img, m.x, cy, null, ch);
      img.style.setProperty('--mw-ratio', String(MONTANT_W_RATIO));
      root.appendChild(img);
    });
  }

  // ratio largeur/hauteur du sprite montant.webp (mesure au lot A : 120x1188)
  var MONTANT_W_RATIO = 120 / 1188;

  // ── Les 2 tiroirs : FACADE seule (tiroir-face.webp), z-index 30 ─────────
  // (iteration 2, point 4 : tiroir.webp montre un tiroir TIRE vu de dessus,
  // jamais utilise pour l'etat "ferme" du meuble — garde pour un futur etat
  // "tiroir ouvert", non branche ici.)
  function buildTiroirs(root, cfg) {
    cfg.tiroirs.forEach(function (t, i) {
      var img = document.createElement('img');
      img.className = 'am-tiroir';
      img.src = IMG + 'tiroir-face.webp';
      img.alt = '';
      img.dataset.idx = i;
      var ch = t.cw * TIROIR_FACE_RATIO;
      place(img, t.cx, t.cy, t.cw, ch);
      root.appendChild(img);
    });
  }
  var TIROIR_FACE_RATIO = 154 / 480; // h/w du sprite tiroir-face.webp (lot A)

  // ── Les 2 spots + halo CSS : z-index 35 ─────────────────────────────────
  // (iteration 2, point 3 : w en % du repere, h deduite du ratio du sprite
  // spot.webp, 160x96 -> h/w=0.6.)
  var SPOT_RATIO = 96 / 160;
  function buildSpots(root, cfg) {
    cfg.spots.forEach(function (s) {
      var img = document.createElement('img');
      img.className = 'am-spot';
      img.src = IMG + 'spot.webp';
      img.alt = '';
      img.style.setProperty('--sx', s.x + '%');
      img.style.setProperty('--sy', s.y + '%');
      img.style.setProperty('--sw', s.w + '%');
      img.style.setProperty('--sh', (s.w * SPOT_RATIO) + '%');
      root.appendChild(img);

      var halo = document.createElement('span');
      halo.className = 'am-halo';
      halo.setAttribute('aria-hidden', 'true');
      halo.style.left = s.x + '%';
      halo.style.top = s.y + '%';
      root.appendChild(halo);
    });
  }

  // ── Les 4 vantaux : deux sprites (ferme/ouvert), z-index 60 ─────────────
  // FERME : v6 L-141, porte-fermee.webp pose tel quel a gauche, miroir a
  // droite (inchange).
  //
  // OUVERT (iteration 2, point 1 — CORRIGE, inverse la conclusion de
  // l'iteration 1) : zoom sur le vantail HAUT GAUCHE de ref-ouverte.png —
  // ses pentures sont sur son bord DROIT (contre le montant interieur), son
  // anneau sur son bord GAUCHE. porte-ouverte.webp a ses pentures a GAUCHE
  // (verifie sur docs/refs/armoire/kit/porte-ouverte.png) : pose tel quel,
  // c'est la pose du vantail DROIT. Le vantail GAUCHE est donc son MIROIR.
  // (L'iteration 1 avait conclu l'inverse en lisant la vue d'ensemble sans
  // zoomer sur les pentures — corrige ici a l'oeil sur un crop rapproche.)
  //
  // Boite du sprite ouvert : mesure sur ref-ouverte.png (y=300, bande de la
  // porte haute), le bord LIBRE du vantail gauche ouvert tombe a x=2,52% du
  // repere (PAS negatif) et sa charniere (bord interieur) est proche de
  // corps.left=11,306% — largeur apparente reelle ~8,8%, mais le chiffre
  // donne par le brief pour porteOuverte.largeur est 13,6%. Bornage impose
  // par le brief lui-meme (spec § 1 : « vantail ouvert gauche entierement
  // dans [0, 13,5 %], droit dans [86,5, 100 %] ») : avec une charniere a
  // 11,306% et une largeur de 13,6%, le vantail deborderait a x negatif
  // (-2,29%), hors de cette fenetre. Les deux contraintes du brief (charniere
  // sur le montant EXTERIEUR du corps, ET boite entierement dans [0,13,5]/
  // [86,5,100]) ne sont donc pas simultanement satisfaisables avec ces
  // chiffres : j'ai retenu la borne EXPLICITEMENT VERIFIEE PAR LE SPEC
  // (boite [0,largeur] / [100-largeur,100]) plutot que l'ancrage sur
  // corps.left/droite, qui aurait fait echouer le test tel qu'ecrit. Ecart
  // signale au rapport plutot que tranche en silence.
  function buildPortes(root, cfg) {
    var po = cfg.porteOuverte;
    ['haut', 'bas'].forEach(function (zone) {
      var pz = cfg.portes[zone];
      var zoneH = pz.bottom - pz.top;
      var oy = pz.top - zoneH * po.depasseHaut;
      var oh = zoneH + zoneH * po.depasseHaut + zoneH * po.depasseBas;
      // boite gauche [libre, charniere], droite [100-charniere, 100-libre]
      // (coordinateur, iteration 3) : plus d'ancrage sur corps.left/right —
      // la boite EST la contrainte, mesuree directement sur ref-ouverte.png.
      var largeur = po.charniere - po.libre;
      [
        { side: 'g', x: cfg.porteX.gauche, ox: po.libre, mirror: true, label: 'Ouvrir' },
        { side: 'd', x: cfg.porteX.droite, ox: 100 - po.charniere, mirror: false, label: 'Ouvrir' }
      ].forEach(function (v) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'am-porte am-porte-' + zone + ' am-porte-' + v.side;
        btn.dataset.zone = zone;
        var pw = cfg.porteX.droite - cfg.porteX.gauche;
        btn.style.setProperty('--dx', v.x + '%');
        btn.style.setProperty('--dy', pz.top + '%');
        btn.style.setProperty('--dw', pw + '%');
        btn.style.setProperty('--dh', zoneH + '%');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', v.label + (zone === 'haut' ? ' le haut de l\'armoire' : ' le bas de l\'armoire'));
        btn.innerHTML = '<span class="am-tap" aria-hidden="true"></span><span class="am-porte-fermee" aria-hidden="true"></span>';
        root.appendChild(btn);

        // Le sprite OUVERT vit HORS du bouton (--ox/--oy/--ow/--oh sont des
        // coordonnees absolues du repere, differentes de la boite fermee
        // --dx/--dy/--dw/--dh) : un enfant `position:absolute` du bouton se
        // positionnerait relativement A LA BOITE DU BOUTON, pas au repere —
        // donc sibling direct de .am-root, pose a la meme place dans le DOM
        // (juste apres son bouton) pour garder la meme zone/data attributs.
        var ouverte = document.createElement('span');
        ouverte.className = 'am-porte-ouverte am-porte-' + zone + ' am-porte-' + v.side;
        ouverte.setAttribute('aria-hidden', 'true');
        ouverte.dataset.zone = zone;
        ouverte.style.setProperty('--ox', v.ox + '%');
        ouverte.style.setProperty('--oy', oy + '%');
        ouverte.style.setProperty('--ow', largeur + '%');
        ouverte.style.setProperty('--oh', oh + '%');
        root.appendChild(ouverte);
      });
    });
  }

  // ── Assemblage complet ───────────────────────────────────────────────────
  function build(root, config) {
    var cfg = config || DEFAUT;
    root.innerHTML = '';
    root.classList.add('am-root');
    buildCarcasse(root);
    buildPlanches(root, cfg);
    buildMontants(root, cfg);
    buildTiroirs(root, cfg);
    buildSpots(root, cfg);
    buildPortes(root, cfg);
    wireDoors(root);
    setZone(root, 'haut', false, true);
    setZone(root, 'bas', false, true);
    return root;
  }

  // ── Ouverture / fermeture d'une zone ────────────────────────────────────
  function setZone(root, zone, open) {
    var cls = 'am-ouvert-' + zone;
    root.classList.toggle(cls, open);
    root.querySelectorAll('.am-porte[data-zone="' + zone + '"]').forEach(function (p) {
      p.setAttribute('aria-expanded', open ? 'true' : 'false');
      p.setAttribute('aria-label', (open ? 'Fermer' : 'Ouvrir') +
        (zone === 'haut' ? ' le haut de l\'armoire' : ' le bas de l\'armoire'));
    });
  }

  function toggle(root, zone) {
    setZone(root, zone, !root.classList.contains('am-ouvert-' + zone));
  }

  function wireDoors(root) {
    root.addEventListener('click', function (ev) {
      var porte = ev.target.closest('.am-porte');
      if (!porte) return;
      toggle(root, porte.dataset.zone);
    });
  }

  global.ArmoireMeuble = { build: build, setZone: setZone, toggle: toggle, DEFAUT: DEFAUT };
})(window);
