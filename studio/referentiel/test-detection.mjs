#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// test-detection.mjs — non-régression du détecteur de dérive
//
//   node studio/referentiel/test-detection.mjs        (sortie 0 = vert)
//
// Un détecteur se dégrade dans les deux sens, et les deux sont graves :
//   · trop strict  → il crie pour des reformulations légitimes, plus personne
//                    ne lit le tableau de bord, la vraie dérive passe inaperçue ;
//   · trop laxiste → il ne voit plus rien et rassure à tort.
//
// Chaque cas ci-dessous est tiré d'un texte RÉEL du dépôt, y compris le critère
// de recette du Lot 0 : la dérive du poids du T-Rex (« 3 hippopotames » face à
// « 4 rhinocéros ») doit être détectée. Elle a été corrigée depuis, on la garde
// ici en cas témoin — c'est elle qui a motivé tout le chantier.
// ─────────────────────────────────────────────────────────────────────────────
import { comparerRepere, segmenterParDimension } from './lib/reperes.mjs';

const CAS = [
  {
    nom: 'RECETTE LOT 0 — dérive historique du poids du T-Rex',
    dimension: 'poids',
    attendu: 'aussi lourd que 4 rhinocéros !',
    parle: "Il mesurait 13 mètres de long — aussi long qu'un bus RATP ! Et il pesait 8 mille kilos — aussi lourd que 3 hippopotames.",
    verdict: 'derive',
  },
  {
    nom: 'dérive de repère en hauteur (velociraptor, cas réel du dépôt)',
    dimension: 'hauteur',
    attendu: "il t'arrivait aux fesses !",
    parle: "50 centimètres de haut — il t'arrivait au nombril.",
    verdict: 'derive',
  },
  {
    nom: 'dérive de NOMBRE à repère identique (3 contre 4 rhinocéros)',
    dimension: 'poids',
    attendu: 'aussi lourd que 4 rhinocéros !',
    parle: 'Et il pesait 8 mille kilos — aussi lourd que 3 rhinocéros.',
    verdict: 'derive',
  },
  {
    nom: 'réécriture ElevenLabs légitime — même repère, autre tournure (4×4)',
    dimension: 'longueur',
    attendu: "aussi long qu'un grand 4×4 !",
    parle: '4 mètres 60 de long — comme un grand 4×4.',
    verdict: 'conforme',
  },
  {
    nom: 'réécriture légitime — « comme un enfant de 4 ans debout »',
    dimension: 'hauteur',
    attendu: "aussi grand qu'un enfant de 4 ans !",
    parle: '1 virgule 2 mètre de haut — comme un enfant de 4 ans debout.',
    verdict: 'conforme',
  },
  {
    nom: 'ponctuation finale seule (« ! » à l\'écran, « . » à l\'oral) — jamais une dérive',
    dimension: 'longueur',
    attendu: "aussi long qu'un camion !",
    parle: "9 virgule 5 mètres de long — aussi long qu'un camion.",
    verdict: 'conforme',
  },
  {
    nom: 'cloisonnement : « petite voiture » de la phrase de LONGUEUR ne pollue pas la HAUTEUR',
    dimension: 'hauteur',
    attendu: "aussi grand qu'un enfant de 4 ans !",
    parle: "3 mètres de long — comme une petite voiture. 1 mètre de haut — aussi grand qu'un enfant de 4 ans.",
    verdict: 'conforme',
  },
  {
    nom: 'mesure absente du bloc : on ne conclut rien plutôt que de crier',
    dimension: 'poids',
    attendu: 'aussi lourd que 4 rhinocéros !',
    parle: "Il mesurait 13 mètres de long — aussi long qu'un bus RATP.",
    verdict: 'non-enonce',
  },
];

let reussis = 0;
const echecs = [];

for (const cas of CAS) {
  const segments = segmenterParDimension(cas.parle);
  const resultat = comparerRepere(cas.dimension, cas.attendu, segments[cas.dimension]);
  if (resultat.verdict === cas.verdict) {
    reussis += 1;
    console.log(`OK    | ${cas.nom}`);
  } else {
    echecs.push(`${cas.nom}\n        attendu « ${cas.verdict} », obtenu ${JSON.stringify(resultat)}`);
    console.log(`ÉCHEC | ${cas.nom}`);
  }
}

console.log('');
console.log(`${reussis} / ${CAS.length} cas conformes`);
if (echecs.length) {
  console.log('\n--- échecs ---');
  echecs.forEach((e) => console.log(`- ${e}`));
  process.exit(1);
}
