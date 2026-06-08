// Extrait data/racines.json depuis sources/etymo/_ETYMO-RACINES-50.md (déjà fact-checké).
// Source de vérité = le .md. Ce script ne fait que STRUCTURER (jamais réinventer une racine).
// Sortie : 2 vues réutilisables —
//   racines[] : dictionnaire des racines grec/latin (page Dico + Quiz), avec la liste des dinos qui l'utilisent
//   dinos{}   : décomposition nom -> racines + sens recomposé + statut nom_etym (fiches + Quiz)
// Usage : node _etymo2racines.cjs
const fs = require('fs');
const path = require('path');
const SRC = path.join(__dirname, '..', '..', 'sources', 'etymo', '_ETYMO-RACINES-50.md');
const OUT = path.join(__dirname, '..', '..', 'data', 'racines.json');
// Copie déployable pour la page (file:// ne peut pas fetch un .json → on émet un .js qui assigne une const).
const SITE_OUT = path.join(__dirname, '..', '..', '..', '..', '..', 'site', 'js', 'dinos-racines.js');

const md = fs.readFileSync(SRC, 'utf8');

// Fusion des familles récurrentes que la normalisation seule ne réunit pas (vérifié à la main sur le .md).
const MERGE = {
  sauro: 'saurus', saura: 'saurus', sauros: 'saurus', // famille -saure
  odonto: 'odon', odous: 'odon',                       // famille -odon (dent)
  keras: 'cerat',                                      // cérat = kéras (corne)
  lophus: 'lopho',                                     // -lophe (crête)
  cephalo: 'cephale',                                  // -céphale (tête)
  nychus: 'onyx', onux: 'onyx',                        // -onyx (griffe)
  mimos: 'mimus',                                      // -mime (qui imite)
};
// Clé canonique -> libellé d'affichage + translittération de référence
const LABEL = {
  saurus: { cle: '-saure', translit: 'sauros' },
  odon: { cle: '-odon', translit: 'odous' },
  cerat: { cle: 'cérat-', translit: 'kéras' },
  lopho: { cle: '-lophe', translit: 'lophos' },
  cephale: { cle: '-céphale', translit: 'kephale' },
  onyx: { cle: '-onyx', translit: 'onux' },
  mimus: { cle: '-mime', translit: 'mimos' },
};

const deaccent = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const normKey = raw => {
  let k = deaccent(raw.split('/')[0].toLowerCase()).replace(/[^a-z]/g, '');
  return MERGE[k] || k;
};

const racines = {}; // key -> entry
const dinos = {};

const sections = md.split(/^## /m).slice(1);
for (const sec of sections) {
  const lines = sec.split('\n');
  const head = lines[0].trim(); // "tyrannosaurus — T-Rex (Tyrannosaurus Rex)"
  const mHead = head.match(/^([a-z0-9_]+)\s+—\s+(.+?)\s+\((.+)\)\s*$/);
  if (!mHead) continue;
  const id = mHead[1], nom = mHead[2], full = mHead[3];
  const dinoRoots = [];
  let sensRecompose = '', statut = '', note = '';

  for (const line of lines) {
    const t = line.trim();
    // racine : - **root** (langue *translit*) = sens
    const mR = t.match(/^- \*\*(.+?)\*\*\s*(?:\(([^)]*)\))?\s*=\s*(.+)$/);
    if (mR) {
      const raw = mR[1].trim();
      const paren = (mR[2] || '').trim();
      let sens = mR[3].trim();
      // langue + translittération depuis la parenthèse
      const langueM = paren.match(/\b(grec|latin|nahuatl|espagnol|ta[ïi]no|aztèque)\b/i);
      const langue = langueM ? langueM[1].toLowerCase() : null;
      const translitM = paren.match(/\*([^*]+)\*/);
      const translit = translitM ? translitM[1] : null;
      // sens : on isole un éventuel commentaire entre parenthèses en fin
      let sensNote = null;
      const cm = sens.match(/^(.+?)\s*\((.+)\)\s*$/);
      if (cm) { sens = cm[1].trim(); sensNote = cm[2].trim(); }

      const key = normKey(raw);
      const label = LABEL[key] || {};
      const isProper = !langue || /^[A-Z]/.test(raw); // lieu / nom propre / dieu
      dinoRoots.push({ racine: raw, cle: label.cle || raw, langue, sens });

      if (!racines[key]) {
        racines[key] = {
          cle: label.cle || raw,
          langue,
          translitteration: label.translit || translit || null,
          sens,
          type: isProper ? 'nom_propre' : 'racine',
          variantes: new Set(),
          dinos: [],
        };
      }
      const e = racines[key];
      raw.split('/').forEach(v => e.variantes.add(v.trim()));
      if (translit) e.variantes.add(translit);
      if (!e.dinos.includes(id)) e.dinos.push(id);
      if (!e.langue && langue) e.langue = langue;
      if (!e.translitteration && translit) e.translitteration = translit;
      continue;
    }
    // recomposition : → **« ... »**
    const mS = t.match(/→\s*\*\*[«"]\s*(.+?)\s*[»"]\*\*/);
    if (mS) { sensRecompose = mS[1].trim(); continue; }
    // statut nom_etym
    const mNe = t.match(/^\[nom_etym\s*(.+?)\]\s*$/i);
    if (mNe) {
      const body = mNe[1].trim();
      if (/^OK/i.test(body)) { statut = 'ok'; }
      else { statut = 'a_corriger'; note = body.replace(/^à corriger\s*:?\s*/i, '').trim(); }
    }
  }
  dinos[id] = { nom, full, sens: sensRecompose, racines: dinoRoots, nom_etym: statut, note: note || undefined };
}

// Finalise : Set -> Array trié, tri du dico par fréquence puis alpha
const racinesArr = Object.values(racines).map(e => ({
  cle: e.cle,
  langue: e.langue,
  translitteration: e.translitteration,
  sens: e.sens,
  type: e.type,
  n: e.dinos.length,
  variantes: [...e.variantes].filter(Boolean).sort(),
  dinos: e.dinos.sort(),
})).sort((a, b) => b.n - a.n || a.cle.localeCompare(b.cle));

const out = {
  _meta: {
    source: 'studio/dino/content/sources/etymo/_ETYMO-RACINES-50.md',
    genere_par: 'scripts/export/_etymo2racines.cjs',
    note: 'STRUCTURE seulement — la source de vérité reste le .md (fact-checké). Curation pédagogique du dico = dino-conseiller.',
    nb_racines: racinesArr.length,
    nb_dinos: Object.keys(dinos).length,
  },
  racines: racinesArr,
  dinos,
};
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf8');
// Version déployée (consommée par dev-dinos.html, onglet Dico) — ne pas éditer à la main, régénérer.
const js = '// Racines grec/latin des dinos — GÉNÉRÉ par studio/dino/content/scripts/export/_etymo2racines.cjs.\n'
  + '// Source de vérité : studio/dino/content/sources/etymo/_ETYMO-RACINES-50.md. Ne pas éditer à la main.\n'
  + 'const DINO_RACINES = ' + JSON.stringify(out) + ';\n';
fs.writeFileSync(SITE_OUT, js, 'utf8');
console.log(`OK ${racinesArr.length} racines / ${Object.keys(dinos).length} dinos -> data/racines.json + site/js/dinos-racines.js`);
console.log('Top 8 racines récurrentes:');
racinesArr.slice(0, 8).forEach(r => console.log(`  ${r.cle} (${r.langue||'?'}) = ${r.sens} -> ${r.n} dinos`));
const aCorr = Object.entries(dinos).filter(([, d]) => d.nom_etym === 'a_corriger').map(([k]) => k);
if (aCorr.length) console.log(`\n${aCorr.length} nom_etym à corriger: ${aCorr.join(', ')}`);
