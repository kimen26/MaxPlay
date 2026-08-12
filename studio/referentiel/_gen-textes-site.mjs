#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// _gen-textes-site.mjs — génère site/js/textes-jeux.js, la table des textes
// canoniques du domaine JEU consommée par les libs partagées du site.
//
//   node studio/referentiel/_gen-textes-site.mjs
//
// Pas d'appel API, pas de drapeau : sortie 100 % déterministe depuis le
// catalogue versionné (comme _extraire-textes-jeux.mjs, on écrit une sortie).
//
// Pour chaque slug jouable (consigne, règle, ligne nommée, lieu, période) :
//   ecran — le texte canonique affiché ;
//   tts   — le texte de repli TTS (identique ici : le respell FR est appliqué
//           par tts.js au moment de parler ; tags v3 dépouillés) ;
//   mp3   — le chemin du MP3 sous site/ (« {voix} » = f/h/wex pour les lignes
//           nommées jouées dans les 3 voix du casting).
//
// C'est la SEULE source de chaînes pour les replis TTS des libs partagées
// (Lot 3 allégé) : victory-sounds.js, mj-shell.js, regle-info.js la consultent
// et elle gagne sur tout repli inline divergent (log console à la divergence).
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { SITE } from './lib/socle.mjs';
import {
  REPLIQUES, LIEUX, LIGNES_NOMMEES, CONSIGNES_GENEREES,
} from './catalogue/fr/repliques.mjs';
import { REGLES } from './catalogue/fr/regles.mjs';
import { PERIODES } from './catalogue/fr/dino-menu.mjs';

const SORTIE = path.join(SITE, 'js', 'textes-jeux.js');

/** Débarrasse un texte des tags v3 éventuels — jamais prononcés ni affichés. */
const sansTags = (t) => String(t || '').replace(/\[[^\]]{1,30}\]/g, ' ').replace(/\s+/g, ' ').trim();

const table = {};
const collisions = [];

/**
 * Pose une entrée dans la table. En cas de slug déjà présent, l'entrée
 * `texte_verifie` (prouvée = générée DEPUIS le catalogue) gagne ; à preuve
 * égale, la première posée reste et la collision est signalée.
 */
function poser(slug, entree) {
  if (!slug || !entree.texte) return;
  const nouvelle = {
    ecran: sansTags(entree.texte),
    tts: sansTags(entree.texte),
    mp3: entree.fichier,
  };
  const ancienne = table[slug];
  if (!ancienne) { table[slug] = nouvelle; return; }
  if (ancienne.ecran === nouvelle.ecran && ancienne.mp3 === nouvelle.mp3) return;
  collisions.push(slug);
  if (entree.texte_verifie) table[slug] = nouvelle;
}

// Consignes (repliques héritées, puis générées — les prouvées en dernier pour
// qu'elles l'emportent à slug égal), règles des panneaux 🧑‍🔬, lieux des hubs.
for (const e of [...REPLIQUES, ...REGLES, ...LIEUX, ...CONSIGNES_GENEREES]) poser(e.slug, e);

// Lignes nommées (SoundPool.voiceLine) : UN slug, 3 voix — les 3 entrées du
// catalogue fusionnent en une seule ligne, mp3 à trou « {voix} ».
for (const e of LIGNES_NOMMEES) {
  poser(e.slug, { ...e, fichier: e.fichier.replace(/voix\/[fhwex]+\//, 'voix/{voix}/') });
}

// Périodes dino : pas de `slug` déclaré, leur id fait office de clé
// (consommé par mj-31 PERIODE_MP3 et dev-dinos playPeriodeVoice).
for (const e of PERIODES) poser(e.cle.split('.').pop(), e);

const slugs = Object.keys(table).sort();
const corps = slugs
  .map((s) => `  ${JSON.stringify(s)}: ${JSON.stringify(table[s])},`)
  .join('\n');

const contenu = `// ─────────────────────────────────────────────────────────────────────────────
//  textes-jeux.js — GÉNÉRÉ, ne pas éditer à la main.
//  Régénérer : node studio/referentiel/_gen-textes-site.mjs
//  Source : studio/referentiel/catalogue/ (textes canoniques, slugs, MP3).
//
//  Table slug → { ecran, tts, mp3 } :
//    ecran — texte canonique affiché ;
//    tts   — repli TTS quand le MP3 manque (le respell FR est appliqué par
//            tts.js au moment de parler) ;
//    mp3   — chemin sous site/ (« {voix} » = f/h/wex pour les lignes nommées).
//  La table GAGNE sur tout repli inline divergent (victory-sounds.js logge la
//  divergence en console — c'est comme ça qu'on traque les appels obsolètes).
// ─────────────────────────────────────────────────────────────────────────────
window.TEXTES_JEUX = {
${corps}
};
`;

fs.writeFileSync(SORTIE, contenu, 'utf8');
console.log(`[gen-textes-site] ${slugs.length} entrées → ${path.relative(process.cwd(), SORTIE)}`);
if (collisions.length) {
  console.warn(`[gen-textes-site] ⚠ collisions de slug (l'entrée vérifiée a gagné) : ${collisions.join(', ')}`);
}
