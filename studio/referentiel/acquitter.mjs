#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// acquitter.mjs — clôt une dette de contenu (Lot 1)
//
//   node studio/referentiel/acquitter.mjs <clé> <canal> --propage [--raison "…"]
//   node studio/referentiel/acquitter.mjs <clé> <canal> --sans-impact "raison"
//
//   <clé> et <canal> acceptent le joker `*` (ex : dino.corythosaurus.*).
//
// Une dette ne se résout jamais toute seule : un humain tranche.
//   · --propage      le canal a été régénéré/réécrit ; la nouvelle signature
//                    devient la référence.
//   · --sans-impact  le changement de source ne remet pas le canal en cause ;
//                    la référence est re-calée sur la valeur courante, AVEC la
//                    raison — l'équivalent du « défuzzifier » de gettext.
//
// Les deux re-calent la signature de référence sur la valeur COURANTE et
// journalisent la décision (date ISO, décision, raison) dans empreintes.json.
// Lecture seule sur le contenu : ce script ne touche ni texte, ni audio, ni
// page — uniquement studio/referentiel/empreintes.json.
// ─────────────────────────────────────────────────────────────────────────────
import readline from 'node:readline';
import { scannerDino } from './scan-dino.mjs';
import { scannerJeu } from './scan-jeu.mjs';
import {
  chargerBase, sauvegarderBase, synchroniser, lignesSuivies,
} from './lib/dette.mjs';

function usage(message) {
  if (message) console.error(`erreur : ${message}`);
  console.error(`usage :
  node studio/referentiel/acquitter.mjs <clé> <canal> --propage [--raison "…"] [--oui]
  node studio/referentiel/acquitter.mjs <clé> <canal> --sans-impact "raison" [--oui]

  <clé> et <canal> acceptent le joker * (ex : dino.corythosaurus.*).
  --oui passe la confirmation quand plusieurs lignes sont touchées.`);
  process.exit(1);
}

// ── arguments ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const positionnels = [];
let decision = null;
let raison = null;
let oui = false;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--propage') decision = 'propage';
  else if (a === '--sans-impact') { decision = 'sans-impact'; raison = args[++i]; }
  else if (a === '--raison') raison = args[++i];
  else if (a === '--oui' || a === '-y') oui = true;
  else if (a.startsWith('--')) usage(`option inconnue : ${a}`);
  else positionnels.push(a);
}
if (positionnels.length !== 2) usage('il faut exactement <clé> et <canal>');
if (!decision) usage('il faut --propage ou --sans-impact "raison"');
if (decision === 'sans-impact' && (!raison || !raison.trim())) {
  usage('--sans-impact exige une raison — c\'est elle qui rend l\'acquittement relisible');
}

const [motifCle, motifCanal] = positionnels;
const glob = (motif) => new RegExp(`^${motif.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`);
const testeCle = glob(motifCle);
const testeCanal = glob(motifCanal);

// ── état courant ────────────────────────────────────────────────────────────
const entrees = [...scannerDino(), ...scannerJeu()];
const base = chargerBase();
synchroniser(base, entrees); // enrôle les lignes nouvelles avant de trancher
const suivies = lignesSuivies(entrees);

const cibles = [];
for (const [cle, canaux] of suivies) {
  if (!testeCle.test(cle)) continue;
  for (const [canal, { sig }] of canaux) {
    if (!testeCanal.test(canal)) continue;
    cibles.push({ cle, canal, sig, ref: base.lignes[cle][canal] });
  }
}

if (!cibles.length) {
  console.error(`aucune ligne suivie ne correspond à « ${motifCle} ${motifCanal} ».`);
  console.error('(seules les lignes DINO, canaux el/mp3 dont l\'artefact existe, sont suivies au Lot 1)');
  process.exit(1);
}

const dejaAJour = cibles.filter((c) => c.ref === c.sig);
const aTraiter = cibles.filter((c) => c.ref !== c.sig);

console.log(`${cibles.length} ligne(s) correspondante(s), dont ${aTraiter.length} en dette :`);
for (const c of cibles) {
  console.log(`  ${c.ref === c.sig ? '· à jour  ' : '· EN DETTE'}  ${c.cle} · ${c.canal}`);
}

if (!aTraiter.length) {
  console.log('Toutes les lignes sont déjà à jour — rien à acquitter.');
  process.exit(0);
}

// ── confirmation si le joker touche plusieurs lignes ───────────────────────
if (aTraiter.length > 1 && !oui) {
  if (!process.stdin.isTTY) {
    console.error(`Refus d'acquitter ${aTraiter.length} lignes sans confirmation : relancer avec --oui.`);
    process.exit(1);
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const reponse = await new Promise((res) => rl.question(`Acquitter ces ${aTraiter.length} lignes ? (o/N) `, res));
  rl.close();
  if (!/^[oOyY]$/.test(reponse.trim())) {
    console.log('Annulé — aucune écriture.');
    process.exit(0);
  }
}

// ── acquittement ────────────────────────────────────────────────────────────
const date = new Date().toISOString();
for (const c of aTraiter) {
  base.lignes[c.cle][c.canal] = c.sig; // re-cale la référence sur la valeur courante
  base.acquittements.push({ date, cle: c.cle, canal: c.canal, decision, raison: raison || null });
}
sauvegarderBase(base);

console.log(`${aTraiter.length} ligne(s) acquittée(s) (${decision}) — référence re-calée sur la valeur courante.`);
if (dejaAJour.length) console.log(`${dejaAJour.length} ligne(s) déjà à jour ignorée(s).`);
console.log('écrit : studio/referentiel/empreintes.json');
