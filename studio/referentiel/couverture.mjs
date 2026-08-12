#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// couverture.mjs — « qu'est-ce qui n'est PAS encore au catalogue ? »
//
//   node studio/referentiel/couverture.mjs
//
// Répond à une question simple qu'on ne pouvait pas poser jusqu'ici : sur tout
// l'audio du site, combien est enrôlé — c'est-à-dire régénérable, traduisible,
// vérifiable — et combien ne l'est pas encore.
//
// ⚠️ « Pas enrôlé » ne veut PAS dire « texte perdu ». Beaucoup de fichiers ont
// leur verbatim ailleurs, dans le dossier d'autoring de leur pôle : les blocs de
// fiche dino l'ont dans leurs segments V3, le dico dans son canon, les accroches
// de menu dans le leur. Ceux-là sont à RATTACHER, pas à réécrire. La colonne
// « verbatim » dit lequel des deux cas s'applique.
//
// Écrit _COUVERTURE.md. Ne modifie aucun contenu, n'appelle aucune API.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chargerCatalogue } from './lib/catalogue.mjs';
import { scannerDino } from './scan-dino.mjs';
import { SITE, existe, relatif } from './lib/socle.mjs';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const SORTIE = path.join(ICI, '_COUVERTURE.md');

/**
 * Familles d'audio du site. `verbatim` dit où vit le texte réellement prononcé —
 * c'est ce qui sépare « à rattacher » (travail mécanique) de « à retrouver »
 * (il faut écouter, ou réécrire et régénérer).
 */
const FAMILLES = [
  { nom: 'Blocs de fiche dino', motif: /^audio\/dinos\/fr\/(?!menu-)[a-z]+-(nom|taille|regime|funfact)\.mp3$/,
    verbatim: 'studio/dino/content/scripts-audio/fr/V3/json/', pole: 'DINO', via: 'registre' },
  { nom: 'Récaps dino (concaténés)', motif: /^audio\/dinos\/fr\/[a-z]+-recap\.mp3$/,
    verbatim: 'dérivé des 4 blocs (aucun texte propre)', pole: 'DINO', via: 'registre' },
  { nom: 'Dico des racines', motif: /^audio\/dinos\/fr\/dico-/,
    verbatim: 'studio/dino/content/sources/etymo/_DICO-RACINES-AUDIO.md', pole: 'DINO' },
  { nom: 'Noms de dinos seuls', motif: /^audio\/dinos\/fr\/noms\//,
    verbatim: 'lexique i18n/lexiques-prononciation/fr.md (respellings)', pole: 'DINO' },
  { nom: 'Accroches familles / régimes', motif: /^audio\/dinos\/fr\/menu-(fam|regime)-/,
    verbatim: 'studio/dino/content/scripts-audio/_ACCROCHES-MENU-FAMILLES-REGIMES.md', pole: 'DINO' },
  { nom: 'Menus principaux dino', motif: /^audio\/dinos\/fr\/menu-(accueil|familles|regime|voyage)\.mp3$/,
    verbatim: 'textes de repli relevés dans dev-dinos.html (MENU_VOICE)', pole: 'DINO' },
  { nom: 'Accroches époques', motif: /^audio\/dinos\/fr\/menu-ep-/, verbatim: null, pole: 'DINO' },
  { nom: 'Récits d’époque', motif: /^audio\/dinos\/fr\/recit-/, verbatim: null, pole: 'DINO' },
  { nom: 'Extinction (mj-31)', motif: /^audio\/dinos\/fr\/special-/, verbatim: null, pole: 'DINO' },
  { nom: 'Périodes', motif: /^audio\/dinos\/fr\/periodes\//, verbatim: null, pole: 'DINO' },
  { nom: 'Réactions (f/h/wex)', motif: /^sounds\/voix\/(f|h|wex)\//, verbatim: null, pole: 'JEU' },
  { nom: 'Encouragements langues invitées', motif: /^sounds\/voix\/(pt-BR|en|ja|zh|it|es)\//,
    verbatim: 'studio/referentiel/catalogue/fr/humeur.mjs § HUMEUR_INVITEE', pole: 'JEU' },
  { nom: 'Consignes de jeu', motif: /^sounds\/voix\/phrases\//, verbatim: null, pole: 'JEU' },
  { nom: 'Noms de lieux', motif: /^sounds\/voix\/lieux\//, verbatim: null, pole: 'JEU' },
  { nom: 'Nombres', motif: /^sounds\/nombres\//, verbatim: null, pole: 'JEU' },
  { nom: 'Phonèmes', motif: /^sounds\/phonemes\//, verbatim: null, pole: 'JEU' },
  { nom: 'Pièces d’échecs (mj-37)', motif: /^sounds\/pieces\//, verbatim: null, pole: 'JEU' },
  { nom: 'Identité sonore du hub', motif: /^sounds\/ui\//, verbatim: 'prompt EN', pole: 'JEU' },
  { nom: 'Bruitages', motif: /^sounds\/fx\//, verbatim: 'prompt EN', pole: 'JEU' },
];

/**
 * Orphelins ASSUMÉS : sons tiers « cultes » conservés tels quels (Mario, Zelda,
 * Pokémon, jingles SNCF/RATP, freesound…). Ni régénérables via ElevenLabs, ni
 * traduisibles, ni à réécrire — le catalogue n'a rien à décider pour eux, ils
 * n'y entreront pas. Certains sont branchés (pools de victory-sounds.js),
 * d'autres dormants : tous restent volontairement hors enrôlement.
 */
const ORPHELINS_ASSUMES = [
  'sounds/among-us-role-reveal-sound.mp3',
  'sounds/ff7_victory.mp3',
  'sounds/freesound_community-bus-doors-sound-effect-44034.mp3',
  'sounds/freesound_community-bus-pop-85054.mp3',
  'sounds/Gagné.mp3',
  'sounds/honk-sound.mp3',
  'sounds/mario coin hit.mp3',
  'sounds/maro-jump-sound-effect_1.mp3',
  'sounds/motus-boule-noire_cTY2JG4.mp3',
  'sounds/perdu.mp3',
  'sounds/perfect-fart.mp3',
  'sounds/pew.mp3',
  'sounds/pikachu_mw38Ry2.mp3',
  'sounds/pikachu_scream.mp3',
  'sounds/pokemon lvl up.mp3',
  'sounds/ratp-jingle.mp3',
  'sounds/sncf-france-jingle.mp3',
  'sounds/super-mario-coin-sound.mp3',
  'sounds/victory-mario-series-hq-super-smash-bros.mp3',
  'sounds/zelda-tresor.mp3',
];

function listerMp3(base, prefixe = '') {
  const abs = path.join(SITE, base);
  if (!existe(abs)) return [];
  const sortie = [];
  for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = prefixe ? `${prefixe}/${e.name}` : e.name;
    if (e.isDirectory()) sortie.push(...listerMp3(path.join(base, e.name), rel));
    else if (e.name.endsWith('.mp3')) sortie.push(rel);
  }
  return sortie;
}

const surDisque = [
  ...listerMp3('sounds', 'sounds'),
  ...listerMp3('audio/dinos', 'audio/dinos'),
];

const { entrees } = chargerCatalogue();
const enroles = new Set(entrees.map((e) => e.fichier).filter(Boolean));

// Les blocs de fiche dino (et leurs récaps concaténés) sont catalogués PAR
// RÉFÉRENCE (type « bloc » du schéma) : clé, contrat, lignée et verbatim vivent
// dans le registre tenu par scan-dino.mjs — dupliquer 351 entrées de catalogue
// n'ajouterait rien. Un MP3 réclamé par la lignée du registre est enrôlé.
for (const e of scannerDino()) {
  const mp3 = e.lignee && e.lignee.mp3 && e.lignee.mp3.fichier;
  if (mp3) enroles.add(mp3.replace(/^site\//, ''));
}

const lignes = FAMILLES.map((f) => {
  const fichiers = surDisque.filter((p) => f.motif.test(p));
  const couverts = fichiers.filter((p) => enroles.has(p)).length;
  return { ...f, total: fichiers.length, couverts, restants: fichiers.length - couverts };
});

const classes = new Set(lignes.flatMap((l) => surDisque.filter((p) => l.motif.test(p))));
const nonClasses = surDisque.filter((p) => !classes.has(p) && !ORPHELINS_ASSUMES.includes(p));
const orphelinsPresents = ORPHELINS_ASSUMES.filter((p) => surDisque.includes(p));

const totalDisque = surDisque.length;
const totalCouvert = lignes.reduce((s, l) => s + l.couverts, 0);
const aCreer = entrees.filter((e) => e.fichier && !existe(path.join(SITE, e.fichier)));

const L = [];
L.push('# Couverture du catalogue');
L.push('');
L.push('> **FICHIER GÉNÉRÉ** — `node studio/referentiel/couverture.mjs`');
L.push('> Répond à : « sur tout l’audio du site, qu’est-ce qui reste à faire ? »');
L.push('');
L.push('| | |');
L.push('|---|---|');
L.push(`| MP3 sur le disque | **${totalDisque}** |`);
L.push(`| — enrôlés (catalogue, ou registre pour les blocs dino) | **${totalCouvert}** |`);
L.push(`| — pas encore enrôlés | **${totalDisque - totalCouvert}** |`);
L.push(`| — dont orphelins assumés (hors catalogue par nature) | ${orphelinsPresents.length} |`);
L.push(`| Entrées du catalogue sans fichier (à générer) | ${aCreer.length} |`);
L.push('');
L.push('**Enrôlé** = son texte verbatim, sa voix, son modèle et ses réglages sont au catalogue');
L.push('(ou, pour les blocs de fiche dino, au registre tenu par `scan-dino.mjs` — type « bloc »');
L.push('catalogué par référence), donc il est régénérable à l’identique, traduisible et vérifiable.');
L.push('');
L.push('## Par famille');
L.push('');
L.push('| Famille | Pôle | Sur disque | Enrôlés | Reste | Le verbatim est… |');
L.push('|---|---|---|---|---|---|');
for (const l of lignes.filter((x) => x.total > 0).sort((a, b) => b.restants - a.restants)) {
  const etat = l.restants === 0 ? '✅' : `**${l.restants}**`;
  const nom = l.via === 'registre' ? `${l.nom} *(via registre)*` : l.nom;
  L.push(`| ${nom} | ${l.pole} | ${l.total} | ${l.couverts} | ${etat} | ${l.verbatim ? `\`${l.verbatim}\`` : '— introuvable'} |`);
}
L.push('');
L.push('## Comment lire la dernière colonne');
L.push('');
L.push('- **Un chemin** → le texte existe, ailleurs. L’enrôlement est **mécanique** : rattacher,');
L.push('  pas réécrire. Aucun appel ElevenLabs nécessaire.');
L.push('- **`— introuvable`** → le texte prononcé n’est écrit nulle part. Deux issues : écouter et');
L.push('  transcrire, ou réécrire et régénérer. C’est là qu’est la vraie dette.');
L.push('- ***(via registre)*** → la famille est suivie par `scan-dino.mjs` (clés `dino.<id>.<bloc>`,');
L.push('  contrats, lignée script → MP3), pas par des entrées de catalogue : le type « bloc » est');
L.push('  catalogué par référence.');
L.push('');
if (orphelinsPresents.length) {
  L.push(`## Orphelins assumés (${orphelinsPresents.length})`);
  L.push('');
  L.push('Sons tiers « cultes » conservés tels quels (Mario, Zelda, Pokémon, jingles SNCF/RATP,');
  L.push('freesound…) : ni régénérables via ElevenLabs, ni traduisibles, ni à réécrire. Le catalogue');
  L.push('n’a rien à décider pour eux — **ils n’y entreront pas**, c’est voulu. Certains restent');
  L.push('branchés (pools de `victory-sounds.js`), d’autres dorment.');
  L.push('');
  for (const p of orphelinsPresents) L.push(`- \`${p}\``);
  L.push('');
}
if (nonClasses.length) {
  L.push(`## Non classés (${nonClasses.length})`);
  L.push('');
  L.push('Fichiers qu’aucune famille ne décrit — famille à ajouter ci-dessus, ou fichiers orphelins.');
  L.push('');
  for (const p of nonClasses.slice(0, 30)) L.push(`- \`${p}\``);
  if (nonClasses.length > 30) L.push(`\n_… et ${nonClasses.length - 30} autres._`);
  L.push('');
}
L.push('---');
L.push('');
L.push('_Rien ici n’oblige à générer quoi que ce soit. C’est un état, consultable à tout moment :_');
L.push('_on relance ce qu’on veut, quand on veut, selon le budget. Le plan des appels est dans_');
L.push('_[`_PLAN-GENERATION.md`](_PLAN-GENERATION.md)._');

fs.writeFileSync(SORTIE, `${L.join('\n')}\n`, 'utf8');
console.log(`disque ${totalDisque} MP3 · enrôlés ${totalCouvert} · reste ${totalDisque - totalCouvert}`);
console.log(`entrées du catalogue sans fichier (à générer) : ${aCreer.length}`);
console.log(`écrit : ${relatif(SORTIE)}`);
