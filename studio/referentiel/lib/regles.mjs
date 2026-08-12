// ─────────────────────────────────────────────────────────────────────────────
// regles.mjs — reconstruction DÉTERMINISTE du texte parlé d'un panneau de règles
//
// Source unique partagée par :
//   · _gen-regles.mjs        — génère les MP3 regle-<id>.mp3 (appelle ElevenLabs)
//   · catalogue/fr/regles.mjs — enrôle ces mêmes textes au catalogue
//
// La concaténation reproduit EXACTEMENT celle de site/js/regle-info.js :
//   [texte] + etapes.map(t + '. ' + d) + phrase étoile, joints par '. ',
//   emojis retirés. Toute divergence ferait mentir le MP3 — c'est pour ça que
//   l'extraction vit ici, une seule fois.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { SITE } from './socle.mjs';

// Doit rester identique à EMOJI_RE de regle-info.js.
export const EMOJI_RE = /[\p{Extended_Pictographic}️‍]/gu;
export const PHRASE_ETOILE = "Réponds juste du premier coup à toutes les questions pour gagner l'étoile de champion !";

const litteraux = (frag) => {
  const out = [];
  const re = /(['"])((?:\\.|(?!\1)[^\\])*)\1/g;
  let m;
  while ((m = re.exec(frag)) !== null) out.push(m[2].replace(/\\'/g, "'").replace(/\\"/g, '"'));
  return out;
};

function blocRegle(src) {
  const i = src.indexOf('regle:');
  if (i < 0) return null;
  const debut = src.indexOf('{', i);
  if (debut < 0) return null;
  let p = 0;
  for (let j = debut; j < src.length; j += 1) {
    if (src[j] === '{') p += 1;
    else if (src[j] === '}') { p -= 1; if (p === 0) return src.slice(debut, j + 1); }
  }
  return null;
}

/** Reconstruit le texte que regle-info.js prononce pour ce jeu. */
export function texteParle(src) {
  const bloc = blocRegle(src);
  if (!bloc) return null;
  const mT = bloc.match(/texte\s*:\s*(['"])((?:\\.|(?!\1)[^\\])*)\1/);
  if (!mT) return null;
  const accroche = mT[2].replace(/\\'/g, "'");

  const iE = bloc.indexOf('etapes:');
  const etapes = [];
  if (iE >= 0) {
    // Chaque étape est un objet { t: '…', d: '…' } — on les prend dans l'ordre.
    const re = /\{\s*t\s*:\s*(['"])((?:\\.|(?!\1)[^\\])*)\1\s*(?:,\s*d\s*:\s*(['"])((?:\\.|(?!\3)[^\\])*)\3)?/g;
    let m;
    while ((m = re.exec(bloc.slice(iE))) !== null) {
      const t = m[2].replace(/\\'/g, "'");
      const d = m[4] ? m[4].replace(/\\'/g, "'") : '';
      etapes.push(t + (d ? `. ${d}` : ''));
    }
    if (!etapes.length) {
      // Variante : etapes = tableau de chaînes simples.
      for (const s of litteraux(bloc.slice(iE))) if (s.trim().length > 4) etapes.push(s);
    }
  }

  return [accroche, ...etapes, PHRASE_ETOILE].join('. ').replace(EMOJI_RE, '').replace(/\s+/g, ' ').trim();
}

const INTERDITS = /\b(max|doudou|peluche)\b/i;

/**
 * Tous les panneaux de règles du site, avec leur texte parlé reconstruit.
 * `ignore` porte la raison d'exclusion (mot interdit, texte trop court) —
 * le générateur l'affiche, le catalogue l'ignore silencieusement.
 */
export function listerRegles() {
  const regles = [];
  for (const f of fs.readdirSync(SITE).filter((x) => /^mj-.*\.html$/.test(x)).sort()) {
    const id = f.replace(/\.html$/, '');
    const texte = texteParle(fs.readFileSync(path.join(SITE, f), 'utf8'));
    if (!texte || texte.length < 30) continue;
    if (INTERDITS.test(texte)) { regles.push({ id, ignore: 'mot interdit' }); continue; }
    regles.push({ id, slug: `regle-${id}`, texte });
  }
  return regles;
}
