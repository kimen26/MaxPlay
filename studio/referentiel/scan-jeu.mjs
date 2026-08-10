// ─────────────────────────────────────────────────────────────────────────────
// scan-jeu.mjs — inventaire du domaine JEU pour le référentiel de contenu
//
// Rôle ENTREPÔT visé (décision Q1) : contrairement au domaine DINO, ces textes
// n'ont AUCUN domicile — ils vivent en dur dans le HTML de chaque mini-jeu. Le
// Lot 0 se contente de les recenser là où ils sont ; le Lot 3 leur donnera un
// domicile unique et générera les chaînes consommées par les pages.
//
// Trois familles recensées :
//   · catalogue      — titres et descriptions (site/js/catalog.js)
//   · textes de jeu  — consignes et panneaux de règles (inline dans mj-XX.html)
//   · voix produites — MP3 de site/sounds/voix/. Ils SONT documentés dans
//                      site/sounds/_BANQUE-SONS.md (rôle, voix, méthode). Ce qui
//                      manque est plus étroit : le TEXTE VERBATIM envoyé à
//                      ElevenLabs, avec ses tags v3, n'est stocké nulle part.
//
// ⚠️ Correction 2026-08-10 : ce scanner annonçait « aucune source » pour ces 109
// fichiers parce qu'il ignorait _BANQUE-SONS.md. Faux constat, rectifié. Tant que
// la banque n'est pas lue comme source de contrat, ne rien affirmer de plus fort
// que « texte verbatim non tracé ».
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import {
  SITE, empreinte, existe, dateFichier, lireTexte, litterauxDe, proprieteTexte, relatif,
} from './lib/socle.mjs';

const DOSSIERS_VOIX = ['f', 'h', 'lieux', 'phrases', 'wex'];

/** Charge window.MAXPLAY_CATALOG sans navigateur (même méthode que dinos-data.js). */
function chargerCatalogue() {
  const fichier = path.join(SITE, 'js', 'catalog.js');
  if (!existe(fichier)) return [];
  const fenetre = {};
  try {
    new Function('window', 'document', lireTexte(fichier))(fenetre, {});
  } catch {
    return [];
  }
  return Array.isArray(fenetre.MAXPLAY_CATALOG) ? fenetre.MAXPLAY_CATALOG : [];
}

/** Étapes du panneau de règles : `etapes: [{ t: '…', d: '…' }, …]`. */
function etapesDeRegle(source) {
  const debut = source.indexOf('etapes:');
  if (debut < 0) return [];
  const fin = source.indexOf(']', debut);
  if (fin < 0) return [];
  const bloc = source.slice(debut, fin);
  const trouves = [];
  const motif = /\b([td])\s*:\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = motif.exec(bloc)) !== null) {
    const texte = m[2].replace(/\\'/g, "'");
    if (texte.trim().length >= 3) trouves.push(texte);
  }
  return trouves;
}

function entree(cle, texte, contrat, source, extra = {}) {
  return {
    cle,
    domaine: 'jeu',
    role: 'entrepot-vise',
    source,
    depend_de: ['texte'],
    empreinte_source: empreinte(texte),
    texte,
    contrat,
    lignee: {},
    verifiable: false,
    etat: 'a-jour',
    ecarts: [],
    manquants: [],
    audio_en_retard: false,
    ...extra,
  };
}

export function scannerJeu() {
  const entrees = [];

  // ── 1. catalogue : titres et descriptions ────────────────────────────────
  for (const jeu of chargerCatalogue()) {
    if (!jeu || !jeu.id) continue;
    const contrat = { ecran: 'requis', tts: 'na', el: 'na', mp3: 'na', lunii: 'na', langues: ['fr'] };
    if (jeu.titre) entrees.push(entree(`jeu.${jeu.id}.titre`, jeu.titre, contrat, 'site/js/catalog.js'));
    if (jeu.desc) entrees.push(entree(`jeu.${jeu.id}.desc`, jeu.desc, contrat, 'site/js/catalog.js'));
  }

  // ── 2. textes inline des mini-jeux : consignes + panneau de règles ────────
  const pages = fs.readdirSync(SITE)
    .filter((f) => /^mj-.*\.html$/.test(f))
    .sort();

  for (const page of pages) {
    const chemin = path.join(SITE, page);
    const source = lireTexte(chemin);
    const id = page.replace(/\.html$/, '');
    const ref = `site/${page}`;

    // La consigne est LUE automatiquement par le gabarit → elle a un contrat TTS.
    litterauxDe(source, 'setConsigne').forEach((texte, i) => {
      entrees.push(entree(`jeu.${id}.consigne.${i + 1}`, texte,
        { ecran: 'requis', tts: 'requis', el: 'souhaite', mp3: 'absent', lunii: 'na', langues: ['fr'] },
        ref, { etat: 'sans-voix-reelle' }));
    });

    const regle = proprieteTexte(source, 'texte');
    if (regle) {
      entrees.push(entree(`jeu.${id}.regle.texte`, regle,
        { ecran: 'requis', tts: 'na', el: 'na', mp3: 'na', lunii: 'na', langues: ['fr'] }, ref));
    }
    etapesDeRegle(source).forEach((texte, i) => {
      entrees.push(entree(`jeu.${id}.regle.etape.${i + 1}`, texte,
        { ecran: 'requis', tts: 'na', el: 'na', mp3: 'na', lunii: 'na', langues: ['fr'] }, ref));
    });
  }

  // ── 3. voix produites dont le texte source est introuvable ───────────────
  for (const dossier of DOSSIERS_VOIX) {
    const base = path.join(SITE, 'sounds', 'voix', dossier);
    if (!existe(base)) continue;
    for (const fichier of fs.readdirSync(base).filter((f) => f.endsWith('.mp3')).sort()) {
      const chemin = path.join(base, fichier);
      const nom = fichier.replace(/\.mp3$/, '');
      entrees.push({
        cle: `jeu.voix.${dossier}.${nom}`,
        domaine: 'jeu',
        role: 'voix-produite',
        source: 'site/sounds/_BANQUE-SONS.md',
        depend_de: [],
        empreinte_source: null,
        contrat: { ecran: 'na', tts: 'na', el: 'requis', mp3: 'requis', lunii: 'na', langues: ['fr'] },
        lignee: { mp3: { fichier: relatif(chemin), produit: dateFichier(chemin) } },
        verifiable: false,
        etat: 'texte-verbatim-non-trace',
        ecarts: [],
        manquants: ['texte-verbatim'],
        audio_en_retard: false,
      });
    }
  }

  return entrees;
}
