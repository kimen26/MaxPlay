#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// _extraire-textes-jeux.mjs — inventaire EXHAUSTIF des textes parlés des jeux
//
//   node studio/referentiel/_extraire-textes-jeux.mjs
//
// Pourquoi ce fichier existe : le premier inventaire ne lisait que les chaînes
// littérales passées à setConsigne(). Il annonçait 23 consignes. La réalité, ce
// sont TOUTES les consignes de TOUS les jeux, plus les 55 panneaux de règles et
// leurs centaines d'étapes — tout cela parlé par la voix de synthèse.
//
// Ici on ratisse le fichier ENTIER de chaque jeu, pas seulement l'appel :
//   · consignes    — setConsigne(...) littéral OU variable/fonction, on remonte
//                    à la définition pour récupérer les textes possibles
//   · règles       — regle: { texte, etapes: [{t, d}] } du panneau 🧑‍🔬
//
// Un texte n'est retenu que s'il est FIXE. Ceux qui contiennent une valeur
// calculée (« Touche le ' + ORDINAUX[i] + ' de la file ») restent en TTS : un
// MP3 figé mentirait. C'est le cas « atome composable » du référentiel.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { SITE } from '../lib/socle.mjs';

/** Chaînes JS littérales d'un fragment, apostrophes échappées comprises. */
function litteraux(fragment) {
  const out = [];
  const re = /(['"])((?:\\.|(?!\1)[^\\])*)\1/g;
  let m;
  while ((m = re.exec(fragment)) !== null) out.push(m[2].replace(/\\'/g, "'").replace(/\\"/g, '"'));
  return out;
}

/** Un texte concaténé à une valeur calculée ne peut pas devenir un MP3 figé. */
const estFixe = (t) => t
  && t.trim().length >= 8
  && !/\{|\}|\$\{|\+ *$|^ *\+/.test(t)
  && /[a-zà-ÿ]/i.test(t);

/** Le bloc regle: { … } d'un jeu, accolades équilibrées. */
function blocRegle(src) {
  const i = src.indexOf('regle:');
  if (i < 0) return null;
  const debut = src.indexOf('{', i);
  if (debut < 0) return null;
  let profondeur = 0;
  for (let j = debut; j < src.length; j += 1) {
    if (src[j] === '{') profondeur += 1;
    else if (src[j] === '}') {
      profondeur -= 1;
      if (profondeur === 0) return src.slice(debut, j + 1);
    }
  }
  return null;
}

const resultat = [];

for (const fichier of fs.readdirSync(SITE).filter((f) => /^mj-.*\.html$/.test(f)).sort()) {
  const id = fichier.replace(/\.html$/, '');
  const src = fs.readFileSync(path.join(SITE, fichier), 'utf8');
  const textes = new Map(); // texte → origine

  // ── 1. consignes ─────────────────────────────────────────────────────────
  const appels = src.match(/setConsigne\s*\(([^;]{0,200})/g) || [];
  for (const appel of appels) {
    const args = appel.replace(/^setConsigne\s*\(/, '');
    const lit = litteraux(args);
    if (lit.length) {
      // Appel littéral : le 1er argument est le texte.
      if (estFixe(lit[0])) textes.set(lit[0], 'consigne');
    } else {
      // Appel calculé : on remonte à la variable / fonction citée.
      const nom = (args.match(/^\s*([A-Za-z_$][\w$]*)/) || [])[1];
      if (!nom) continue;
      // Toutes les définitions de ce nom dans le fichier, littéraux compris.
      const def = new RegExp(`(?:function\\s+${nom}\\s*\\([^)]*\\)|(?:const|let|var)\\s+${nom}\\s*=)([\\s\\S]{0,400})`, 'g');
      let d;
      while ((d = def.exec(src)) !== null) {
        for (const t of litteraux(d[1])) if (estFixe(t)) textes.set(t, 'consigne calculée');
      }
    }
  }

  // ── 2. panneau de règles ─────────────────────────────────────────────────
  const bloc = blocRegle(src);
  if (bloc) {
    const mTexte = bloc.match(/texte\s*:\s*(['"])((?:\\.|(?!\1)[^\\])*)\1/);
    if (mTexte && estFixe(mTexte[2])) textes.set(mTexte[2].replace(/\\'/g, "'"), 'règle');
    const etapes = bloc.slice(bloc.indexOf('etapes:') >= 0 ? bloc.indexOf('etapes:') : 0);
    const re = /\b([td])\s*:\s*(['"])((?:\\.|(?!\2)[^\\])*)\2/g;
    let e;
    while ((e = re.exec(etapes)) !== null) {
      const t = e[3].replace(/\\'/g, "'");
      if (estFixe(t)) textes.set(t, e[1] === 't' ? 'règle · titre d’étape' : 'règle · détail d’étape');
    }
  }

  for (const [texte, origine] of textes) resultat.push({ jeu: id, origine, texte });
}

fs.writeFileSync(
  path.join(path.dirname(new URL(import.meta.url).pathname.slice(1)), 'textes-jeux.json'),
  `${JSON.stringify(resultat, null, 2)}\n`, 'utf8',
);

const parOrigine = {};
for (const r of resultat) parOrigine[r.origine] = (parOrigine[r.origine] || 0) + 1;
const cout = resultat.reduce((s, r) => s + r.texte.length + 10, 0);

console.log(`${resultat.length} textes parlés dans ${new Set(resultat.map((r) => r.jeu)).size} jeux`);
for (const [o, n] of Object.entries(parOrigine).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${o}`);
}
console.log(`\ncoût estimé : ~${cout.toLocaleString('fr-FR')} caractères`);
