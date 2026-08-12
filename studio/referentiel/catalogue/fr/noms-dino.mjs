// ─────────────────────────────────────────────────────────────────────────────
// noms-dino.mjs — le NOM SEUL de chaque dino, ton jeu (audio/dinos/fr/noms/, 70)
//
// Type `atome` : une brique courte rejouée dans plusieurs jeux (mj-24/28/31/33…).
// ⚠️ À ne pas confondre avec les `<id>-nom.mp3` à plat de `fr/` : ceux-là sont
// des segments de FICHE de 20-35 s (blocs, suivis par le registre via scan-dino),
// interdits sur un tap en jeu. Ici : 1,5-2 s, ton [excited] (banque §1).
//
// ⚠️ texte_verifie: false PARTOUT. Le texte est reconstruit : respelling du
// lexique de prononciation (content/i18n/lexiques-prononciation/fr.md) quand le
// nom y figure, `name` de dinos-data.js sinon. Le script qui a produit ces 70
// MP3 n'est pas conservé — la reconstruction est plausible, non prouvée.
// ─────────────────────────────────────────────────────────────────────────────
import path from 'node:path';
import { STUDIO, chargerDinos, lireTexte } from '../../lib/socle.mjs';

const LEXIQUE = path.join(
  STUDIO, 'dino', 'content', 'i18n', 'lexiques-prononciation', 'fr.md',
);

/** Table « Nom (fiche) → respelling validé » du lexique de prononciation. */
function chargerRespellings() {
  const table = new Map();
  for (const ligne of lireTexte(LEXIQUE).split('\n')) {
    const m = ligne.match(/^\|\s*([^|]+?)\s*\|\s*\*\*([^*]+)\*\*\s*\|/);
    if (m) table.set(m[1].trim().toLowerCase(), m[2].trim());
  }
  return table;
}

const RESPELLINGS = chargerRespellings();
const { DINOS } = chargerDinos();

const respellingDe = (dino) => {
  const candidats = [dino.name, String(dino.full || '').split(' ')[0]];
  for (const c of candidats) {
    const r = RESPELLINGS.get(String(c || '').toLowerCase());
    if (r) return r;
  }
  return dino.name;
};

export const NOMS_DINO = DINOS.map((dino) => ({
  cle: `atome.nom-dino.${dino.id}`,
  type: 'atome',
  i18n: 'traduction',
  famille: 'nom-dino',
  texte: respellingDe(dino),
  tags: ['excited'], // ton jeu, banque §1
  origine_texte: 'lexique',
  texte_verifie: false,
  production: { voix: 'narrateur_h', usage: 'reaction' },
  fichier: `audio/dinos/fr/noms/${dino.id}.mp3`,
  consommee_par: ['dinos-audio-manifest.js (playDinoNom)', 'mj-24', 'mj-28', 'mj-31', 'mj-33'],
  ...(dino.periode === 'cenozoique'
    ? { note: 'Mégafaune : banque §5 signale une hétérogénéité de ton sur ces 9 noms — vérifier à l’écoute avant toute régénération.' }
    : {}),
}));
