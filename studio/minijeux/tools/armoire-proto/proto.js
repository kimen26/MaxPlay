// proto.js — HO-MJ-17 : calcule --u et pose la géométrie du prototype
// « L'Armoire v4 ». Reproduit le modèle du brief § 2 (fixe/souple, plafonds,
// ajout de rangées de casiers tant que la hauteur le permet). 40 lignes max.
(function () {
  var FIXED = 190 + 36 + 40 + 40 + 190 + 50 + 60; // fronton+planche+traverse-haut+traverse-bas+tiroirs+socle+pieds (rows=1 : pas de planche entre rangées)
  var SOFT_BASE = 200 + 200 + 150 + 120; // vitrine1+vitrine2+1 rangée casiers+bas-étagère
  var CUBBY_U = 150, CUBBY_CAP = 1.2, SOFT_CAP = 1.45;

  function cols(w) { return w < 600 ? 3 : w < 1000 ? 4 : 5; }

  function build() {
    var pieceW = window.innerWidth, pieceH = window.innerHeight;
    var marginPct = pieceW < 600 ? 0.09 : 0.04;
    var corpsMaxW = Math.min(pieceW * (1 - 2 * marginPct), 1100);
    var dispoH = pieceH * (1 - 0.06); // marge basse 3% + haut safe-area ~ approx 6%

    // brief § 2 : u = min(largeur, hauteur), PUIS tant qu'il reste, À
    // RATIO 1 (avant étirement des rangées souples), ≥ (150+36)u de
    // hauteur, on ajoute une rangée de casiers (max 3). La place restante
    // est jugée AVANT d'ajouter (pas après), sinon on ajoute une rangée de
    // trop dès que la marge devient inférieure à une unité.
    var rows = 1, fixed = FIXED, soft = SOFT_BASE, u, ratio;
    u = Math.min(corpsMaxW / 700, dispoH / (fixed + 0.85 * soft));
    while (rows < 3 && dispoH - (fixed + soft) * u >= (150 + 36) * u) {
      rows++; fixed = FIXED + (rows - 1) * 36; soft = SOFT_BASE + (rows - 1) * CUBBY_U;
      u = Math.min(corpsMaxW / 700, dispoH / (fixed + 0.85 * soft));
    }
    ratio = Math.min(SOFT_CAP, (dispoH - fixed * u) / (soft * u));

    var arm = document.getElementById('armoire');
    arm.style.setProperty('--u', u + 'px');
    arm.dataset.rows = rows; arm.dataset.ratio = ratio.toFixed(3); arm.dataset.u = u.toFixed(3);

    var vitH = Math.min(200 * ratio, 200 * SOFT_CAP);
    var basH = Math.min(120 * ratio, 120 * SOFT_CAP);
    var cubH = Math.min(150 * ratio, 150 * CUBBY_CAP);
    var nCols = cols(pieceW);

    function porte(side, top, height) {
      var h = document.createElement('div'); h.className = 'ar-porte-hote ' + side;
      h.style.top = top + 'px'; h.style.height = height + 'px';
      h.innerHTML = '<div class="ar-porte-epaisseur"></div>' +
        '<div class="ar-porte"><div class="ar-charniere haut"></div><div class="ar-charniere bas"></div></div>';
      return h;
    }
    function row(cls, height, inner) {
      var d = document.createElement('div'); d.className = 'ar-rangee ' + cls;
      if (height != null) d.style.height = height + 'px';
      if (inner) d.innerHTML = inner;
      return d;
    }
    function casierRow(h) {
      var d = row('ar-casiers', h);
      for (var i = 0; i < nCols; i++) {
        var c = document.createElement('div'); c.className = 'ar-casier';
        c.innerHTML = '<div class="ar-fond"></div>';
        d.appendChild(c);
        if (i < nCols - 1) d.appendChild(row('ar-separateur'));
      }
      return d;
    }

    arm.innerHTML = '';
    arm.appendChild(document.createElement('div')).className = 'ar-montant ar-montant-g';
    arm.appendChild(document.createElement('div')).className = 'ar-montant ar-montant-d';
    var frontonH = 190 * u, planche36 = 36 * u, planche40 = 40 * u, tiroirsH = 190 * u, socleH = 50 * u;
    var y = frontonH;
    arm.appendChild(row('ar-fronton', frontonH, '<div class="ar-prenom">Champion</div>'));
    arm.appendChild(porte('g', y, vitH * u + planche36 + vitH * u));
    arm.appendChild(porte('d', y, vitH * u + planche36 + vitH * u));
    // spots CSS purs, vitrine-1 SEULEMENT (brief passe 2, pt.2). Vitrines
    // passe 3 pt.1 : oubli corrigé — .ar-fond manquait, on voyait le mur.
    arm.appendChild(row('ar-vitrine', vitH * u, '<div class="ar-fond"></div><i class="spot g"></i><i class="spot d"></i>'));
    y += vitH * u;
    arm.appendChild(row('ar-planche', planche36)); y += planche36;
    arm.appendChild(row('ar-vitrine', vitH * u, '<div class="ar-fond"></div>'));
    y += vitH * u;
    arm.appendChild(row('ar-planche', planche40)); y += planche40;
    for (var r = 0; r < rows; r++) {
      if (r) { arm.appendChild(row('ar-planche', planche36)); y += planche36; }
      arm.appendChild(casierRow(cubH * u)); y += cubH * u;
    }
    arm.appendChild(row('ar-planche', planche40)); y += planche40;
    arm.appendChild(row('ar-bas-etagere', basH * u, '<div class="ar-fond"></div>'));
    arm.appendChild(porte('g', y, basH * u + tiroirsH));
    arm.appendChild(porte('d', y, basH * u + tiroirsH));
    y += basH * u;
    arm.appendChild(row('ar-tiroirs', tiroirsH, '<div class="ar-tiroir"></div><div class="ar-tiroir"></div>'));
    y += tiroirsH;
    arm.appendChild(row('ar-socle', socleH)); y += socleH;
    arm.appendChild(row('ar-pieds', 60 * u, '<div class="ar-pied"></div><div class="ar-pied ar-pied-d"></div>'));
  }

  window.addEventListener('load', build);
  window.addEventListener('resize', build);
})();
