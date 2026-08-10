// ─────────────────────────────────────────────────────────────────────────────
// socle.mjs — briques partagées du référentiel de contenu (Lot 0)
//
// Trois services : charger dinos-data.js sans navigateur · calculer une empreinte
// de contenu · normaliser un texte parlé pour le comparer à un texte généré.
//
// Le chargement de dinos-data.js reprend la méthode déjà éprouvée dans
// content/scripts/export/_verif-comppoids.cjs (évaluation du fichier dans une
// fonction, puis exposition des symboles). On ne réinvente pas : ce fichier est
// du JS navigateur, il n'a ni export ni module.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ICI = path.dirname(fileURLToPath(import.meta.url));
export const RACINE = path.resolve(ICI, '..', '..', '..');
export const SITE = path.join(RACINE, 'site');
export const STUDIO = path.join(RACINE, 'studio');

/** Symboles de dinos-data.js dont on a besoin ici. */
const SYMBOLES = ['DINOS', 'DINO_FAMILLES', '_compLong', '_compHaut', '_compPoids', '_statsPhrase'];

/**
 * Évalue site/js/dinos-data.js hors navigateur et rend ses symboles.
 * Un `window` factice est fourni : le fichier s'y publie en fin de course.
 *
 * Sur l'évaluation dynamique : la seule entrée est un fichier versionné du dépôt,
 * jamais une saisie utilisateur ni une source distante, et l'outil tourne hors ligne
 * en autoring. Exécuter ce fichier revient à exécuter le dépôt lui-même. Ne jamais
 * étendre cette fonction à un chemin reçu en argument.
 */
export function chargerDinos() {
  const fichier = path.join(SITE, 'js', 'dinos-data.js');
  const source = fs.readFileSync(fichier, 'utf8');
  const code = `${source}\n;module.exports = { ${SYMBOLES.join(', ')} };`;
  const faux = { exports: {} };
  const fenetre = {};
  new Function('module', 'exports', 'window', 'document', code)(faux, faux.exports, fenetre, {});
  const sortie = faux.exports;
  if (!Array.isArray(sortie.DINOS)) throw new Error('DINOS introuvable dans dinos-data.js');
  return sortie;
}

/** Empreinte de contenu (sha1 court). Stable, indépendante des dates de fichiers. */
export function empreinte(valeur) {
  const texte = typeof valeur === 'string' ? valeur : JSON.stringify(valeur);
  return crypto.createHash('sha1').update(texte, 'utf8').digest('hex').slice(0, 12);
}

/** Empreinte des seuls champs déclarés comme sources d'un bloc (dépendances fines). */
export function empreinteChamps(objet, champs) {
  const retenu = {};
  for (const c of champs) if (objet[c] !== undefined) retenu[c] = objet[c];
  return empreinte(retenu);
}

/**
 * Normalise un texte pour comparaison : retire les tags v3, uniformise les
 * apostrophes/tirets/espaces. Ne touche NI aux mots NI aux chiffres.
 */
export function normaliser(texte) {
  return String(texte || '')
    .replace(/\[[^\]]{1,30}\]/g, ' ')          // tags v3 : [excited], [curious]…
    .replace(/[’‘‚]/g, "'")
    .replace(/[“”„]/g, '"')
    .replace(/[—–‑]/g, '-')
    .replace(/ /g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Noyau comparable d'une phrase : sans sa ponctuation finale.
 *
 * Les comparateurs de dinos-data.js terminent par « ! » (ton enthousiaste à
 * l'écran) alors que le texte parlé finit souvent par « . » (débit posé du
 * narrateur). Cet écart-là ne change RIEN au fait énoncé : le signaler
 * noierait les vraies dérives sous le bruit.
 */
function noyau(phrase) {
  return normaliser(phrase).replace(/[\s!.…?]+$/u, '');
}

/**
 * Le fait attendu est-il énoncé dans le texte parlé ?
 * Strict sur les mots et les chiffres, indifférent à la ponctuation finale.
 */
export function contient(texteParle, fragmentAttendu) {
  return normaliser(texteParle).includes(noyau(fragmentAttendu));
}

/** Concatène tous les `text` d'un segment ElevenLabs (format text-to-dialogue). */
export function texteDuSegment(segment) {
  if (!segment || !Array.isArray(segment.inputs)) return '';
  return segment.inputs.map((i) => i && i.text ? i.text : '').join(' ');
}

// ── petites aides disque ────────────────────────────────────────────────────
export const existe = (p) => fs.existsSync(p);
export const dateFichier = (p) => (existe(p) ? fs.statSync(p).mtime.toISOString().slice(0, 10) : null);
export const horodatage = (p) => (existe(p) ? fs.statSync(p).mtimeMs : null);

export function lireJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; }
}

export function lireTexte(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return ''; }
}

/** Chemin relatif à la racine du dépôt, en séparateurs POSIX (lisible dans le rapport). */
export function relatif(p) {
  return path.relative(RACINE, p).split(path.sep).join('/');
}

/**
 * Date du dernier commit ayant RÉELLEMENT modifié chaque fichier, par chemin relatif.
 *
 * On n'utilise pas les dates de fichiers : un déplacement de dossier, un checkout
 * ou un clone les réécrit toutes sans que le contenu ait bougé. Ici, une
 * réorganisation du 2026-07-27 a touché 217 scripts d'un coup — s'y fier
 * signalerait 217 faux retards, et un tableau de bord qui crie pour rien meurt.
 *
 * Un seul appel git, la première occurrence d'un fichier étant la plus récente.
 */
export function datesDeCommit(prefixes) {
  const dates = new Map();
  try {
    const sortie = execFileSync(
      'git',
      ['log', '--format=@%cI', '--name-only', '--', ...prefixes],
      { cwd: RACINE, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
    );
    let courante = null;
    for (const ligne of sortie.split('\n')) {
      const l = ligne.trim();
      if (!l) continue;
      if (l.startsWith('@')) { courante = l.slice(1); continue; }
      if (courante && !dates.has(l)) dates.set(l, courante);
    }
  } catch {
    // Dépôt indisponible : on rend une table vide, l'appelant retombe sur le disque.
  }
  return dates;
}

/**
 * Extrait les chaînes littérales JS d'un appel donné.
 * Ex : litterauxDe(src, 'setConsigne') → tous les 1ers arguments texte.
 * Tolère les apostrophes échappées et les apostrophes typographiques françaises.
 */
export function litterauxDe(source, nomAppel) {
  const motif = new RegExp(`${nomAppel}\\(\\s*(['"\`])((?:[^\\\\]|\\\\.)*?)\\1`, 'g');
  const trouves = [];
  let m;
  while ((m = motif.exec(source)) !== null) {
    const brut = m[2].replace(/\\'/g, "'").replace(/\\"/g, '"');
    if (brut.trim().length >= 3) trouves.push(brut);
  }
  return trouves;
}

/** Extrait la valeur littérale d'une propriété (`texte: '…'`). */
export function proprieteTexte(source, nomPropriete) {
  const m = source.match(new RegExp(`${nomPropriete}\\s*:\\s*(['"\`])((?:[^\\\\]|\\\\.)*?)\\1`));
  return m ? m[2].replace(/\\'/g, "'") : null;
}
