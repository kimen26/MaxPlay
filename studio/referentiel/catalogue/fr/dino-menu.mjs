// ─────────────────────────────────────────────────────────────────────────────
// dino-menu.mjs — voix des menus, récits et spéciaux de l'encyclopédie dino
//
// Plusieurs familles, plusieurs niveaux de preuve (colonne « origine_texte ») :
//
//   · ACCROCHES fam/régime (15) — replique, texte_verifie TRUE : textes FIGÉS
//     dans scripts-audio/_ACCROCHES-MENU-FAMILLES-REGIMES.md (validé PY 2026-06-09),
//     lus ici à la volée. Générés en eleven_multilingual_v2 (mono), pas en v3.
//   · RECITS (8) — bloc, texte_verifie TRUE : script conservé avec verbatim
//     (content/sources/recits/RECITS-EPOQUES.md + _md2json-recits-v3.cjs).
//     Dialogue narratrice_f + wex → régénération par le pipeline dino, pas par
//     le plan du référentiel (pas de `production` déclarée).
//   · SPECIAUX (6) — bloc, texte_verifie FALSE : le script est retrouvé mais
//     ARCHIVÉ (_archive/2026-07-18-ancien-pipeline/) — on ne peut pas prouver
//     que les MP3 actuels sortent de cette version. Les 2 récaps sont des
//     concaténations ffmpeg des blocs A-D (comme _gen-recaps.sh), sans texte propre.
//   · PERIODES (5) — atome, FALSE : reconstruit depuis la banque (« Le Jurassique ! »,
//     ton excité).
//   · MENU_TOP (4) et MENU_EP (8) — replique, FALSE : verbatim non conservé.
//     MENU_EP : produits via Kimi 2026-06-15, jamais branchés (backlog dino
//     EP-D-Menu-EP-Branchage) ; texte = titre court de menu documenté dans
//     studio/lunii/scripts/build-voyage-pack.mjs. Pas de `production` : à écouter
//     ou régénérer AVANT de figer voix et texte.
// ─────────────────────────────────────────────────────────────────────────────
import path from 'node:path';
import { STUDIO, lireTexte } from '../../lib/socle.mjs';

const SCRIPTS_AUDIO = path.join(STUDIO, 'dino', 'content', 'scripts-audio');
const ANCIEN_PIPELINE = path.join(SCRIPTS_AUDIO, '_archive', '2026-07-18-ancien-pipeline');

// ── Accroches familles / régimes — verbatim figé, lu dans la table du canon ──
function lireAccroches() {
  const lignes = lireTexte(path.join(SCRIPTS_AUDIO, '_ACCROCHES-MENU-FAMILLES-REGIMES.md')).split('\n');
  const trouvees = [];
  for (const ligne of lignes) {
    const m = ligne.match(/^\|\s*`([a-z_]+)`\s*\|\s*(.+?)\s*\|?\s*$/);
    if (m) trouvees.push({ id: m[1], texte: m[2] });
  }
  return trouvees;
}

const FAMILLES = ['trex', 'cou_long', 'arme', 'cornu', 'bec', 'raptor', 'pterosaures',
  'enaliosaures', 'volant', 'mammiferes', 'oiseaux'];
const REGIMES = ['carnivores', 'herbivores', 'piscivores', 'omnivores'];

const accroche = (prefixe, id, texte) => ({
  cle: `dino.menu.${prefixe}-${id.replace(/_/g, '-')}`,
  type: 'replique',
  i18n: 'traduction',
  texte,
  tags: [],
  origine_texte: 'script',
  texte_verifie: true,
  production: { voix: 'narrateur_h', usage: 'replique' },
  fichier: `audio/dinos/fr/menu-${prefixe}-${id}.mp3`,
  consommee_par: ['dev-dinos (MENU_FAM_VOICE / MENU_REGIME_VOICE)'],
  note: 'Généré en eleven_multilingual_v2 (mono), sans tags — cf. _ACCROCHES-MENU-FAMILLES-REGIMES.md.',
});

const TABLE_ACCROCHES = lireAccroches();
const texteAccroche = (id) => {
  const t = TABLE_ACCROCHES.find((a) => a.id === id);
  if (!t) throw new Error(`accroche sans verbatim dans le canon : ${id}`);
  return t.texte;
};

export const ACCROCHES = [
  ...FAMILLES.map((id) => accroche('fam', id, texteAccroche(id))),
  ...REGIMES.map((id) => accroche('regime', id, texteAccroche(id))),
];

// ── Récits d'époque — script V5 conservé (dialogue narratrice_f + wex) ──────
function lireParoles(cheminMd, motifSection) {
  const lignes = lireTexte(cheminMd).split('\n');
  const sections = [];
  let courante = null;
  for (const ligne of lignes) {
    const entete = ligne.match(motifSection);
    if (entete) {
      if (courante) sections.push(courante);
      courante = { id: entete[1], repliques: [] };
      continue;
    }
    if (!courante) continue;
    const parole = ligne.match(/^\*\*(?:NARRATRICE|NARRATEUR H|WEX)\*\*\s*((?:\[[^\]]+\])*)\s*:\s*(.+)$/);
    if (parole) {
      const tags = parole[1] ? `${parole[1]} ` : '';
      courante.repliques.push(`${tags}${parole[2].trim()}`);
    } else if (/^#{2,3} /.test(ligne) && !ligne.match(motifSection) && courante.repliques.length) {
      sections.push(courante);
      courante = null;
    }
  }
  if (courante) sections.push(courante);
  return sections.filter((s) => s.repliques.length > 0);
}

export const RECITS = lireParoles(
  path.join(STUDIO, 'dino', 'content', 'sources', 'recits', 'RECITS-EPOQUES.md'),
  /\(recit-([a-z-]+)\.mp3\)/,
).map((s) => ({
  cle: `dino.recit.${s.id}`,
  type: 'bloc',
  i18n: 'reecriture',
  texte: s.repliques.join('\n'),
  texte_verifie: true,
  origine_texte: 'script',
  regenere_par: 'pipeline dino (content/sources/recits/_gen-audio-recits-v3.sh, text-to-dialogue narratrice_f + wex)',
  fichier: `audio/dinos/fr/recit-${s.id}.mp3`,
  consommee_par: ['dev-dinos (onglet Voyage, playRecit)', 'pack Lunii voyage'],
}));

// ── Spéciaux extinction / pangée — script retrouvé mais ARCHIVÉ → false ─────
const BLOC_LETTRE = { A: 'a', B: 'b', C: 'c', D: 'd' };

const blocsSpeciaux = (fichier) => lireParoles(
  path.join(ANCIEN_PIPELINE, fichier),
  /BLOC ([A-D])\b/,
);

const special = (id, texte, extra = {}) => ({
  cle: `dino.special.${id}`,
  type: 'bloc',
  i18n: 'reecriture',
  texte,
  texte_verifie: false,
  origine_texte: 'script-archive',
  regenere_par: 'pipeline dino (text-to-dialogue narrateur_h + wex) — script archivé 2026-07-18',
  fichier: `audio/dinos/fr/special-${id}.mp3`,
  ...extra,
});

const blocsExtinction = blocsSpeciaux('special-extinction.md');
const blocsPangee = blocsSpeciaux('special-pangee.md');
const texteBlocs = (blocs) => blocs.map((b) => b.repliques.join('\n')).join('\n');

export const SPECIAUX = [
  ...blocsExtinction.map((b) => special(`extinction-${BLOC_LETTRE[b.id]}`, b.repliques.join('\n'), {
    consommee_par: ['mj-31 (finale météorite)'],
  })),
  special('extinction-recap', texteBlocs(blocsExtinction), {
    consommee_par: ['mj-31'],
    note: 'Concaténation ffmpeg des blocs A-D (aucun texte propre) — artefact dérivé.',
    derive_de: Object.values(BLOC_LETTRE).map((l) => `dino.special.extinction-${l}`),
  }),
  special('pangee-recap', texteBlocs(blocsPangee), {
    consommee_par: ['dev-dinos (bloc Pangée)'],
    note: 'Concaténation ffmpeg des blocs A-D de special-pangee.md — les blocs seuls n’existent pas en MP3.',
  }),
];

// ── Périodes (5) — reconstruit depuis la banque, ton excité ─────────────────
const periode = (id, texte) => ({
  cle: `atome.periode.${id}`,
  type: 'atome',
  i18n: 'traduction',
  famille: 'periode',
  texte,
  tags: ['excited'], // « Le Jurassique ! » ton excité — _BANQUE-SONS.md §1
  origine_texte: 'banque',
  texte_verifie: false,
  production: { voix: 'narrateur_h', usage: 'reaction' },
  fichier: `audio/dinos/fr/periodes/${id}.mp3`,
  consommee_par: ['mj-31 (PERIODE_MP3)', 'dev-dinos (playPeriodeVoice)'],
});

export const PERIODES = [
  periode('trias', 'Le Trias !'),
  periode('jurassique', 'Le Jurassique !'),
  periode('cretace', 'Le Crétacé !'),
  periode('cenozoique', 'Le Cénozoïque !'),
  periode('pangee', 'La Pangée !'), // permien → pangee.mp3 assumé (banque §5)
];

// ── Menus principaux (4) — textes de repli relevés dans dev-dinos.html ──────
const menuTop = (slug, texte, voix) => ({
  cle: `dino.menu.${slug}`,
  type: 'replique',
  i18n: 'traduction',
  texte,
  tags: [],
  origine_texte: 'repli',
  texte_verifie: false,
  production: { voix, usage: 'replique' },
  fichier: `audio/dinos/fr/${slug}.mp3`,
  consommee_par: ['dev-dinos (MENU_VOICE)'],
});

export const MENU_TOP = [
  menuTop('menu-accueil', 'Les dinosaures !', 'narrateur_h'),
  menuTop('menu-familles', 'Les grandes familles de dinosaures !', 'narrateur_h'),
  menuTop('menu-regime', 'Les dinosaures ne mangeaient pas tous la même chose. Les carnivores mangeaient de la viande. Les herbivores mangeaient des plantes.', 'narrateur_h'),
  menuTop('menu-voyage', 'Le grand voyage dans le temps ! On remonte très loin, de la première vie jusqu’à aujourd’hui.', 'narrateur_f'),
];

// ── Accroches d'époque (8) — verbatim perdu, titres courts du pack Lunii ────
const menuEp = (id, titre) => ({
  cle: `dino.menu.ep-${id}`,
  type: 'replique',
  i18n: 'traduction',
  texte: titre,
  tags: [],
  origine_texte: 'slug',
  texte_verifie: false,
  fichier: `audio/dinos/fr/menu-ep-${id}.mp3`,
  consommee_par: ['pack Lunii voyage (étiquette de menu)'],
  note: '⚠️ Verbatim NON conservé (produit via Kimi 2026-06-15, jamais branché — backlog '
    + 'EP-D-Menu-EP-Branchage). Texte = titre court documenté dans build-voyage-pack.mjs. '
    + 'Pas de production déclarée : écouter ou régénérer avant de figer texte et voix.',
});

export const MENU_EP = [
  menuEp('intro', 'Le départ'),
  menuEp('trias', 'Le Trias'),
  menuEp('jurassique', 'Le Jurassique'),
  menuEp('cretace', 'Le Crétacé'),
  menuEp('extinction', 'L’extinction'),
  menuEp('mammiferes', 'Les mammifères'),
  menuEp('glace-mammouth', 'La glace'),
  menuEp('paleo', 'La paléontologie'),
];
