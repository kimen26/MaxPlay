#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// build.mjs — construit le référentiel de contenu et son tableau de bord (Lot 0)
//
//   node studio/referentiel/build.mjs
//
// Lecture seule sur le contenu : ce script ne modifie AUCUN texte, AUCUN audio,
// AUCUNE page. Il écrit uniquement ses trois sorties :
//   · registre.json      — le registre (clés, contrats, lignée, empreintes)
//   · _ETAT-CONTENU.md   — le tableau de bord lisible
//   · empreintes.json    — base d'empreintes VERSIONNÉE (Lot 1) : il n'y touche
//                          que structurellement (lignes nouvelles/disparues) ;
//                          la référence d'une ligne n'est re-calée que par
//                          acquitter.mjs — une dette ne se résout jamais seule.
//
// Les deux sont GÉNÉRÉS : jamais tenus à la main. « Où en est le contenu ? » → on
// régénère. Même doctrine que pmo/_ETAT-DINOS.md.
//
// Plan d'ensemble : memory/ARCHI-REFERENTIEL-CONTENU.md
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scannerDino } from './scan-dino.mjs';
import { scannerJeu } from './scan-jeu.mjs';
import { chargerBase, sauvegarderBase, synchroniser, dernierAcquittement } from './lib/dette.mjs';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const SORTIE_REGISTRE = path.join(ICI, 'registre.json');
const SORTIE_RAPPORT = path.join(ICI, '_ETAT-CONTENU.md');

const PLAFOND_LISTE = 40; // au-delà, on résume : un rapport illisible n'est pas lu

const compter = (entrees, predicat) => entrees.filter(predicat).length;

function grouper(entrees, cle) {
  const map = new Map();
  for (const e of entrees) {
    const k = cle(e);
    map.set(k, (map.get(k) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

function listeTronquee(lignes) {
  if (lignes.length <= PLAFOND_LISTE) return lignes.join('\n');
  const gardees = lignes.slice(0, PLAFOND_LISTE);
  return `${gardees.join('\n')}\n\n_… et ${lignes.length - PLAFOND_LISTE} autres — détail complet dans \`registre.json\`._`;
}

function construireRapport(entrees, dettes, base) {
  const dino = entrees.filter((e) => e.domaine === 'dino');
  const jeu = entrees.filter((e) => e.domaine === 'jeu');

  const derives = entrees.filter((e) => e.etat === 'derive');
  const enRetard = entrees.filter((e) => e.etat === 'audio-en-retard');
  const manquants = entrees.filter((e) => e.etat === 'manquant');
  const sansSource = entrees.filter((e) => e.etat === 'texte-verbatim-non-trace');
  const sansVoix = entrees.filter((e) => e.etat === 'sans-voix-reelle');
  const verifiables = entrees.filter((e) => e.verifiable);

  const jour = new Date().toISOString().slice(0, 10);
  const L = [];

  L.push('# État du contenu — référentiel unique');
  L.push('');
  L.push('> **FICHIER GÉNÉRÉ — ne jamais éditer à la main.**');
  L.push('> Régénérer : `node studio/referentiel/build.mjs`');
  L.push(`> Plan d'ensemble : [\`memory/ARCHI-REFERENTIEL-CONTENU.md\`](../../memory/ARCHI-REFERENTIEL-CONTENU.md) · généré le ${jour}`);
  L.push('');
  L.push('---');
  L.push('');

  // ── dettes ouvertes (Lot 1) — la todo consultable du projet ──────────────
  const ouvertes = dettes.filter((d) => d.etat === 'en-dette');
  L.push(`## 🔴 Dettes ouvertes — ${ouvertes.length}`);
  L.push('');
  L.push('Une dette ne se résout **jamais toute seule** : un humain tranche entre');
  L.push('`node studio/referentiel/acquitter.mjs <clé> <canal> --propage` (canal régénéré)');
  L.push('et `… --sans-impact "raison"` (le changement de source ne remet pas le canal en cause).');
  L.push('Base de référence : [`empreintes.json`](empreintes.json) (versionnée).');
  L.push('');
  if (!ouvertes.length) {
    L.push('_Aucune dette ouverte._');
  } else {
    L.push(listeTronquee(ouvertes.map((d) => {
      const acq = dernierAcquittement(base, d.cle, d.canal);
      const depuis = acq
        ? ` — la source a rebougé depuis l'acquittement « ${acq.decision} » du ${acq.date.slice(0, 10)}`
        : '';
      return `- **${d.cle}** · canal \`${d.canal}\` — ${d.detail}${depuis}`;
    })));
  }
  L.push('');
  L.push('---');
  L.push('');

  // ── synthèse ──────────────────────────────────────────────────────────────
  L.push('## Synthèse');
  L.push('');
  L.push('| Indicateur | Nombre |');
  L.push('|---|---|');
  L.push(`| Clés recensées | **${entrees.length}** |`);
  L.push(`| — domaine DINO | ${dino.length} |`);
  L.push(`| — domaine JEU | ${jeu.length} |`);
  L.push(`| Lignes suivies par le moteur de dette (clé × canal) | ${dettes.length} |`);
  L.push(`| 🔴 Dettes ouvertes | **${ouvertes.length}** |`);
  L.push(`| Clés vérifiables automatiquement | ${verifiables.length} |`);
  L.push(`| 🔴 Dérives de fait confirmées | **${derives.length}** |`);
  L.push(`| 🟠 Audio en retard sur son script | **${enRetard.length}** |`);
  L.push(`| 🟡 Canaux manquants au contrat | ${manquants.length} |`);
  L.push(`| 🟡 Consignes lues sans voix réelle | ${sansVoix.length} |`);
  L.push(`| ⚪ Voix dont le texte verbatim n'est pas tracé | ${sansSource.length} |`);
  L.push('');

  // ── dérives ───────────────────────────────────────────────────────────────
  L.push('## 🔴 Dérives de fait');
  L.push('');
  L.push('Le texte parlé n\'énonce plus ce que `dinos-data.js` calcule aujourd\'hui.');
  L.push('Détection exacte et rétroactive : le bloc « taille » a un générateur déterministe (`_statsPhrase`).');
  L.push('');
  if (!derives.length) {
    L.push('_Aucune dérive de fait détectée._');
  } else {
    L.push(listeTronquee(derives.map((e) => {
      const detail = e.ecarts
        .map((x) => `${x.fait} : dit « ${x.dit} », la donnée dit « ${x.attendu} »`)
        .join(' · ');
      return `- **${e.cle}** — ${detail}\n  <br>script : \`${e.lignee.el ? e.lignee.el.fichier : '—'}\``;
    })));
  }
  L.push('');

  // ── audio en retard ───────────────────────────────────────────────────────
  L.push('## 🟠 Audio en retard sur son script');
  L.push('');
  L.push('Le MP3 a été produit avant la dernière modification réelle de son script.');
  L.push('Comparaison sur les **dates de commit**, pas les dates de fichiers (un déplacement de dossier');
  L.push('réécrit les secondes sans changer le contenu — s\'y fier produirait des centaines de faux retards).');
  L.push('');
  if (!enRetard.length) {
    L.push('_Aucun audio en retard._');
  } else {
    L.push(listeTronquee(enRetard.map((e) =>
      `- **${e.cle}** — script ${e.lignee.el ? e.lignee.el.produit : '?'} · audio ${e.lignee.mp3 ? e.lignee.mp3.produit : '?'}`)));
  }
  L.push('');

  // ── manquants ─────────────────────────────────────────────────────────────
  L.push('## 🟡 Canaux manquants au contrat');
  L.push('');
  if (!manquants.length) {
    L.push('_Aucun manque._');
  } else {
    L.push('Répartition par canal absent :');
    L.push('');
    L.push('| Canal absent | Clés |');
    L.push('|---|---|');
    for (const [canal, n] of grouper(manquants, (e) => e.manquants.join(' + '))) {
      L.push(`| ${canal} | ${n} |`);
    }
    L.push('');
    L.push(listeTronquee(manquants.map((e) => `- ${e.cle} — absent : ${e.manquants.join(', ')}`)));
  }
  L.push('');

  // ── domaine JEU ───────────────────────────────────────────────────────────
  L.push('## Domaine JEU — état des lieux');
  L.push('');
  L.push('Ces textes n\'ont **aucun domicile** : ils vivent en dur dans le HTML de chaque page.');
  L.push('Le Lot 0 les recense là où ils sont ; le Lot 3 leur en donnera un.');
  L.push('');
  L.push('| Famille | Clés |');
  L.push('|---|---|');
  for (const [role, n] of grouper(jeu, (e) => e.role)) L.push(`| ${role} | ${n} |`);
  L.push('');
  L.push(`**${sansVoix.length} consignes** sont lues à l'enfant par le moteur du navigateur, sans voix réelle enregistrée.`);
  L.push(`**${sansSource.length} fichiers de voix** sont documentés dans [\`site/sounds/_BANQUE-SONS.md\`](../../site/sounds/_BANQUE-SONS.md)`);
  L.push('(rôle, voix, méthode de génération), mais le **texte verbatim** envoyé à ElevenLabs — avec ses tags v3 —');
  L.push("n'est stocké nulle part. On ne peut donc ni les régénérer à l'identique, ni les traduire, ni vérifier");
  L.push("ce que l'enfant entend sans les écouter un par un.");
  L.push('');
  if (sansSource.length) {
    L.push('Répartition :');
    L.push('');
    L.push('| Dossier | Fichiers |');
    L.push('|---|---|');
    for (const [dossier, n] of grouper(sansSource, (e) => e.cle.split('.')[2])) {
      L.push(`| \`site/sounds/voix/${dossier}/\` | ${n} |`);
    }
    L.push('');
  }

  // ── méthode ───────────────────────────────────────────────────────────────
  L.push('---');
  L.push('');
  L.push('## Ce que ce rapport ne dit pas (encore)');
  L.push('');
  L.push('Les blocs **réécrits à la main** (nom, régime, funfact, récap) n\'ont pas de générateur :');
  L.push('on ne peut pas vérifier rétroactivement qu\'ils disent encore la vérité de `dinos-data.js`.');
  L.push('Leur **empreinte de référence est posée** dans [`empreintes.json`](empreintes.json) — toute');
  L.push('modification de leurs champs sources lève désormais une dette, visible en tête de ce rapport.');
  L.push('C\'est la façon normale d\'enrôler un corpus existant : on ne rattrape pas le passé,');
  L.push('on arrête l\'hémorragie.');
  L.push('');
  L.push('_Généré par `studio/referentiel/build.mjs` — lecture seule, ne modifie aucun contenu._');

  return L.join('\n');
}

// ── exécution ───────────────────────────────────────────────────────────────
const entrees = [...scannerDino(), ...scannerJeu()];

// Lot 1 — moteur de dette : la base d'empreintes versionnée est synchronisée
// structurellement (lignes nouvelles/disparues) ; l'état de chaque ligne est
// calculé en comparant la signature courante à la référence gravée.
const base = chargerBase();
const dettes = synchroniser(base, entrees);
sauvegarderBase(base);

const registre = {
  genere_le: new Date().toISOString(),
  outil: 'studio/referentiel/build.mjs',
  plan: 'memory/ARCHI-REFERENTIEL-CONTENU.md',
  lot: 1,
  total: entrees.length,
  entrees,
};

fs.writeFileSync(SORTIE_REGISTRE, `${JSON.stringify(registre, null, 2)}\n`, 'utf8');
fs.writeFileSync(SORTIE_RAPPORT, `${construireRapport(entrees, dettes, base)}\n`, 'utf8');

const bilan = (etat) => compter(entrees, (e) => e.etat === etat);
console.log(`registre : ${entrees.length} clés`);
console.log(`  dettes ouvertes      : ${compter(dettes, (d) => d.etat === 'en-dette')} (sur ${dettes.length} lignes suivies)`);
console.log(`  dérives de fait      : ${bilan('derive')}`);
console.log(`  audio en retard      : ${bilan('audio-en-retard')}`);
console.log(`  canaux manquants     : ${bilan('manquant')}`);
console.log(`  consignes sans voix  : ${bilan('sans-voix-reelle')}`);
console.log(`  voix texte non trace : ${bilan('texte-verbatim-non-trace')}`);
console.log(`écrit : studio/referentiel/registre.json + _ETAT-CONTENU.md + empreintes.json`);
