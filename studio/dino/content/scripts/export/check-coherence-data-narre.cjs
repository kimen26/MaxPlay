#!/usr/bin/env node
'use strict';
/**
 * HO-R12 — contrôle : les nombres dits dans le corps narré FR (scripts audio V3)
 * doivent correspondre à la fiche canon JSON (D-009). Un dino dont le texte lu
 * à voix haute divergerait silencieusement de la donnée casserait la promesse
 * "l'enfant entend le vrai chiffre".
 *
 * Extrait du BLOC B (taille) : longueur, hauteur, poids, vitesse — sous leurs
 * formes narrées usuelles (entier, "X virgule Y", "X mètre YY" façon "1m70",
 * "et demi(e)", "X mille kilos", "X XXX kilos" avec espace-milliers, "X virgule
 * Y tonnes"). Compare à taille_m/hauteur_m/poids_t/vitesse_kmh de la fiche JSON
 * canon (tolérance d'arrondi 5 % ou 0,05 unité).
 *
 * LIMITE CONNUE : les nombres écrits tout en lettres ("deux mètres", "trois
 * mille kilos") ne sont pas reconnus — seuls les écarts détectables par cette
 * V1 mécanique sont remontés. Une fiche "non trouvé dans le texte narré" peut
 * donc être un vrai trou de fact-check OU une limite du parseur : à vérifier
 * à la main avant d'agir (liste complète dans le rapport HO-R12).
 *
 * Sortie : "dino · bloc · attendu · trouvé" pour chaque écart. Toujours en
 * AVERTISSEMENT dans `npm run check` — jamais bloquant (l'orchestrateur décide
 * du basculement en bloquant sur la liste produite).
 *
 * Usage : node studio/dino/content/scripts/export/check-coherence-data-narre.cjs
 * Exit code : toujours 0 (avertissement) — la liste est le contrat, pas le code
 * de sortie. Si un futur handoff bascule ce contrôle en bloquant, changer ici.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../../..');
const DINOS_DIR = path.join(ROOT, 'studio/dino/content/dinos');
const MD_DIR = path.join(ROOT, 'studio/dino/content/scripts-audio/fr/V3');

// Un nombre dit à voix haute peut s'écrire de plusieurs façons dans le texte narré :
//   "13 mètres de long"        -> entier
//   "1 mètre 70 de long"       -> mètres + centimètres accolés (style "1m70")
//   "9 virgule 5 mètres..."    -> décimal en toutes lettres
//   "2 mètres et demi de..."   -> "et demi(e)" = + 0,5
function buildDistanceRegex(suffix) {
  return new RegExp(
    '(?:(\\d+)\\s+virgule\\s+(\\d+)\\s*mètres?\\s+' + suffix + ')' +
    '|(?:(\\d+)\\s*mètres?\\s+et\\s+demie?\\s+' + suffix + ')' +
    '|(?:(\\d+)\\s*mètres?\\s+(\\d{1,2})\\s+' + suffix + ')' +
    '|(?:(\\d+)\\s*mètres?\\s+' + suffix + ')'
  );
}

function parseDistance(match) {
  if (!match) return undefined;
  const virguleInt = match[1], virguleDec = match[2];
  const demiInt = match[3];
  const cmInt = match[4], cmDec = match[5];
  const entierInt = match[6];
  if (virguleInt !== undefined) return Number(virguleInt + '.' + virguleDec);
  if (demiInt !== undefined) return Number(demiInt) + 0.5;
  if (cmInt !== undefined) return Number(cmInt + '.' + cmDec);
  return Number(entierInt);
}

const SUFFIX_LONGUEUR = "(?:de long|d['’]un bout (?:de l['’]aile )?à l['’]autre)";

function parseNarratedNumbers(text) {
  const out = {};

  // Longueur : "de long" ou "d'un bout (de l'aile) à l'autre" (envergure ptérosaures)
  let m = text.match(buildDistanceRegex(SUFFIX_LONGUEUR));
  out.taille_m = parseDistance(m);

  // Hauteur : "de haut"
  m = text.match(buildDistanceRegex('de haut'));
  out.hauteur_m = parseDistance(m);

  // Poids : "X mille kilos" | "X XXX kilos" (espace = milliers) | "X virgule Y tonne(s)"
  // | "X kilo(s)" simple (poids_t < 1, en kg — singulier "1 kilo" inclus).
  m = text.match(/(\d+)\s*mille\s*kilos/);
  if (m) {
    out.poids_t = Number(m[1]);
  } else {
    m = text.match(/(\d+)[\s ](\d{3})\s*kilos\b/);
    if (m) {
      out.poids_t = Number(m[1] + m[2]) / 1000;
    } else {
      m = text.match(/(\d+)\s+virgule\s+(\d+)\s*tonnes?\b/);
      if (m) {
        out.poids_t = Number(m[1] + '.' + m[2]);
      } else {
        m = text.match(/(\d+)\s*kilos?\b/);
        if (m) out.poids_t = Number(m[1]) / 1000;
      }
    }
  }

  // Vitesse : "X kilomètres à l'heure" ou "X kilomètres-heure" ou "X km/h"
  m = text.match(/(\d+)\s*kilomètres?[\s-]*(?:à l['’]heure|\/h|heure)/);
  if (m) out.vitesse_kmh = Number(m[1]);

  return out;
}

function withinTolerance(expected, found, tolPct, tolAbs) {
  if (tolPct === undefined) tolPct = 0.05;
  if (tolAbs === undefined) tolAbs = 0.05;
  if (expected === undefined || found === undefined) return true; // rien à comparer
  const diff = Math.abs(expected - found);
  return diff <= tolAbs || diff <= Math.abs(expected) * tolPct;
}

function main() {
  const files = fs.readdirSync(MD_DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
  const ecarts = [];
  let checked = 0;

  for (const f of files) {
    const id = f.replace(/\.md$/, '');
    const dinoFile = path.join(DINOS_DIR, id + '.json');
    if (!fs.existsSync(dinoFile)) continue; // fichier non-dino (template/consigne)
    const d = JSON.parse(fs.readFileSync(dinoFile, 'utf8'));

    const content = fs.readFileSync(path.join(MD_DIR, f), 'utf8');
    // BLOC B — Taille est le bloc canonique qui porte les 3-4 chiffres.
    const blocMatch = content.match(/### BLOC B[^\n]*\n([\s\S]*?)(?=\n###|\n##|$)/);
    if (!blocMatch) {
      ecarts.push({ dino: id, bloc: 'BLOC B', attendu: '(bloc taille présent)', trouve: 'BLOC B introuvable' });
      continue;
    }
    checked++;

    const narrated = parseNarratedNumbers(blocMatch[1]);

    const fields = [
      ['taille_m', d.taille_m],
      ['hauteur_m', d.hauteur_m],
      ['poids_t', d.poids_t],
      ['vitesse_kmh', d.vitesse_kmh],
    ];
    for (const pair of fields) {
      const key = pair[0], expected = pair[1];
      if (expected === undefined) continue;
      const found = narrated[key];
      if (found === undefined) {
        ecarts.push({ dino: id, bloc: 'BLOC B · ' + key, attendu: expected, trouve: '(non trouvé dans le texte narré)' });
        continue;
      }
      if (!withinTolerance(expected, found)) {
        ecarts.push({ dino: id, bloc: 'BLOC B · ' + key, attendu: expected, trouve: found });
      }
    }
  }

  console.log('check-coherence-data-narre : ' + checked + ' fiches vérifiées (BLOC B), ' + ecarts.length + ' écart(s).');
  if (ecarts.length) {
    console.log('');
    for (const e of ecarts) {
      console.log(e.dino + ' · ' + e.bloc + ' · attendu ' + e.attendu + ' · trouvé ' + e.trouve);
    }
  }
  // Toujours exit 0 : avertissement seulement (npm run check ne doit jamais
  // échouer sur ce contrôle tant que l'orchestrateur n'a pas tranché — brief HO-R12).
  process.exit(0);
}

main();
