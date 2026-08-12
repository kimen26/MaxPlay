// ─────────────────────────────────────────────────────────────────────────────
// dette.mjs — moteur de dette du référentiel de contenu (Lot 1)
//
// Modèle (memory/ARCHI-REFERENTIEL-CONTENU.md §6) : pour chaque ligne
// clé × canal suivie, on compare la SIGNATURE courante de détection à la
// signature de référence gravée dans empreintes.json (base compacte, VERSIONNÉE
// — c'est elle qui porte la mémoire de « ce qui était à jour la dernière fois »).
//
//   signature_ref === signature_courante  →  à jour
//   sinon                                 →  en dette
//
// Une dette ne se résout jamais toute seule : seul `acquitter.mjs` re-cale la
// signature de référence (décision « propagé » ou « sans impact », tracée avec
// date et raison dans le journal append-only `acquittements`). Un acquittement
// « sans impact » garde donc la ligne close TANT QUE la source n'a pas rebougi
// depuis l'acquittement — on compare à la signature acquittée, pas à l'originale.
//
// Lignes suivies : domaine DINO, canaux `el` et `mp3` dont l'artefact existe
// (le `recap` n'a pas de script propre — il est concaténé — et `lunii` hérite
// de `mp3` : suivre l'un reviendrait à suivre l'autre). Le domaine JEU n'a pas
// encore de canal dérivé à surveiller : son texte EST le produit (Lot 3).
//
// Alerter juste : la signature ne contient QUE ce que le canal déclare consommer
// (empreinte des champs sources du bloc, écarts de faits, retard audio). Un
// changement hors dépendances déclarées ne lève rien.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { empreinte } from './socle.mjs';

const ICI = path.dirname(fileURLToPath(import.meta.url));
export const BASE_CHEMIN = path.join(ICI, '..', 'empreintes.json');

/** Base vierge. `lignes` : clé → canal → signature de référence (null = dette initiale). */
export function baseVierge() {
  return { v: 1, lignes: {}, acquittements: [] };
}

export function chargerBase(chemin = BASE_CHEMIN) {
  try {
    const base = JSON.parse(fs.readFileSync(chemin, 'utf8'));
    if (!base || typeof base !== 'object' || !base.lignes) return baseVierge();
    if (!Array.isArray(base.acquittements)) base.acquittements = [];
    return base;
  } catch {
    return baseVierge();
  }
}

/** Écriture stable et diff-able : clés triées, rien d'autre que la donnée. */
export function sauvegarderBase(base, chemin = BASE_CHEMIN) {
  const lignes = {};
  for (const cle of Object.keys(base.lignes).sort()) {
    const canaux = base.lignes[cle];
    const tri = {};
    for (const canal of Object.keys(canaux).sort()) tri[canal] = canaux[canal];
    lignes[cle] = tri;
  }
  const sortie = `${JSON.stringify({ v: base.v, lignes, acquittements: base.acquittements }, null, 2)}\n`;
  const actuelle = fs.existsSync(chemin) ? fs.readFileSync(chemin, 'utf8') : null;
  if (actuelle !== sortie) fs.writeFileSync(chemin, sortie, 'utf8');
}

/**
 * Signature courante de détection d'une ligne. Ne contient QUE les entrées
 * déclarées du canal :
 *   · el  — empreinte des champs sources + écarts de faits (le script doit-il
 *           être réécrit ?). Le retard de l'audio ne le concerne PAS.
 *   · mp3 — les mêmes + le retard audio daté (le MP3 est-il plus vieux que la
 *           dernière modification réelle de son script ?).
 */
export function signatureLigne(entree, canal) {
  const commun = { src: entree.empreinte_source, ecarts: entree.ecarts };
  if (canal === 'mp3') {
    commun.retard = entree.audio_en_retard ? `${entree.modifie_el}>${entree.modifie_mp3}` : null;
  }
  return empreinte(commun);
}

/**
 * Les lignes effectivement suivies pour un lot d'entrées de registre.
 * Rend une Map clé → Map(canal → { sig, entree }). Seuls les canaux dont
 * l'artefact existe peuvent entrer en dette ; un artefact absent relève du
 * « manquant », déjà traité par ailleurs.
 */
export function lignesSuivies(entrees) {
  const lignes = new Map();
  for (const e of entrees) {
    if (e.domaine !== 'dino') continue;
    const canaux = new Map();
    if (e.contrat.el !== 'concatenation' && !e.manquants.includes('el')) {
      canaux.set('el', { sig: signatureLigne(e, 'el'), entree: e });
    }
    if (!e.manquants.includes('mp3')) {
      canaux.set('mp3', { sig: signatureLigne(e, 'mp3'), entree: e });
    }
    if (canaux.size) lignes.set(e.cle, canaux);
  }
  return lignes;
}

export const etatLigne = (sigRef, sigCourante) => (sigRef === sigCourante ? 'a-jour' : 'en-dette');

/** Ce qui a changé, formulé pour le tableau de bord. */
function detailDette(entree, canal) {
  if (entree.ecarts.length) {
    return entree.ecarts.map((x) => `${x.fait} : dit « ${x.dit} », la donnée dit « ${x.attendu} »`).join(' · ');
  }
  if (canal === 'mp3' && entree.audio_en_retard) {
    const jour = (d) => (d ? d.slice(0, 10) : '?');
    return `script modifié le ${jour(entree.modifie_el)}, audio produit le ${jour(entree.modifie_mp3)}`;
  }
  return 'champs sources modifiés depuis la dernière empreinte de référence';
}

/**
 * Synchronise la base avec la réalité du scan et rend l'état des lignes.
 *
 * La base n'est modifiée que structurellement : lignes nouvelles (posées à
 * jour, ou marquées en dette initiale — sig null — si le scan signale déjà
 * une dérive connue) et lignes disparues. La signature de référence d'une
 * ligne existante n'est JAMAIS réécrite ici — c'est le rôle exclusif de
 * l'acquittement.
 */
export function synchroniser(base, entrees) {
  const suivies = lignesSuivies(entrees);
  const lignes = [];

  // lignes disparues du scan → sortent de la base (l'historique, lui, est gardé)
  for (const cle of Object.keys(base.lignes)) {
    if (!suivies.has(cle)) delete base.lignes[cle];
  }

  for (const [cle, canaux] of suivies) {
    if (!base.lignes[cle]) base.lignes[cle] = {};
    for (const [canal, { sig, entree }] of canaux) {
      if (!(canal in base.lignes[cle])) {
        // Enrôlement : à jour, sauf si le scan signale DÉJÀ un écart réel —
        // les dérives connues au premier passage démarrent « en dette ».
        const flag = entree.ecarts.length > 0 || (canal === 'mp3' && entree.audio_en_retard);
        base.lignes[cle][canal] = flag ? null : sig;
      }
      const sigRef = base.lignes[cle][canal];
      const etat = etatLigne(sigRef, sig);
      lignes.push({
        cle, canal, etat,
        detail: etat === 'en-dette' ? detailDette(entree, canal) : null,
      });
    }
  }
  return lignes;
}

/** Dernier acquittement d'une ligne (pour « depuis quand »), ou null. */
export function dernierAcquittement(base, cle, canal) {
  for (let i = base.acquittements.length - 1; i >= 0; i--) {
    const a = base.acquittements[i];
    if (a.cle === cle && a.canal === canal) return a;
  }
  return null;
}
