// ─────────────────────────────────────────────────────────────────────────────
// dico.mjs — le dico des racines grec/latin (audio/dinos/fr/dico-*.mp3, 100)
//
// Type `bloc`, catalogué PAR RÉFÉRENCE : le verbatim n'est pas recopié ici, il
// est lu à la volée dans le script de génération conservé :
//   studio/dino/content/scripts-audio/_DICO-RACINES-AUDIO.md
// Chaque clip est un dialogue 2 voix (narrateur_h explique, wex rebondit) —
// la régénération passe par le pipeline dino (text-to-dialogue), PAS par le
// plan du référentiel : aucune `production` n'est donc déclarée ici.
//
// texte_verifie: true — le script de génération est conservé avec le verbatim
// (§ « Champ texte_verifie » du schéma). La vérification porte sur le texte du
// script ; la conversion exacte md → texte envoyé (emphase markdown, tags) est
// celle du pipeline dino.
// ─────────────────────────────────────────────────────────────────────────────
import path from 'node:path';
import { STUDIO, lireTexte } from '../../lib/socle.mjs';

const SOURCE = path.join(
  STUDIO, 'dino', 'content', 'scripts-audio', '_DICO-RACINES-AUDIO.md',
);

/**
 * Extrait les clips du canon dico. Forme d'un clip :
 *   **`-saure`** | grec | `dico-saure`
 *   narrateur_h: …
 *   wex: [excited] …
 * (la colonne langue est absente pour les noms propres).
 */
function extraireClips() {
  const lignes = lireTexte(SOURCE).split('\n');
  const clips = [];
  let courant = null;
  const entete = /^\*\*`([^`]+)`\*\*\s*\|(?:\s*([^|]*?)\s*\|)?\s*`(dico-[a-z-]+)`\s*$/;
  for (const ligne of lignes) {
    const m = ligne.match(entete);
    if (m) {
      if (courant) clips.push(courant);
      courant = { racine: m[1], langue: (m[2] || '').trim(), slug: m[3], repliques: [] };
      continue;
    }
    if (!courant) continue;
    const parole = ligne.match(/^(narrateur_h|wex):\s+(.+)$/);
    if (parole) courant.repliques.push(`${parole[1]}: ${parole[2].trim()}`);
    else if (ligne.trim() === '---' && courant.repliques.length) { clips.push(courant); courant = null; }
  }
  if (courant) clips.push(courant);
  return clips.filter((c) => c.repliques.length > 0);
}

export const DICO = extraireClips().map((clip) => ({
  cle: `dino.dico.${clip.slug.replace(/^dico-/, '')}`,
  type: 'bloc',
  i18n: 'reecriture',
  texte: clip.repliques.join('\n'),
  texte_verifie: true,
  origine_texte: 'script',
  racine: clip.racine,
  langue_racine: clip.langue || null,
  regenere_par: 'pipeline dino (text-to-dialogue narrateur_h + wex) — pas le plan du référentiel',
  fichier: `audio/dinos/fr/${clip.slug}.mp3`,
  consommee_par: ['dev-dinos (onglet Dico)', 'mj-29'],
}));
