// ─────────────────────────────────────────────────────────────────────────────
// regles.mjs — la voix des panneaux de règles 🧑‍🔬 (sounds/voix/phrases/regle-*.mp3)
//
// Type `replique` : UN MP3 par jeu, lu d'un seul tenant par regle-info.js
// (accroche + étapes + phrase de l'étoile). Le texte est reconstruit de façon
// DÉTERMINISTE depuis la page du jeu par lib/regles.mjs — la même fonction qui
// a servi à générer les MP3 (_gen-regles.mjs, 2026-08-10, [warmly] narrateur_h).
//
// texte_verifie: true pour les fichiers PRÉSENTS : le MP3 sort de ce texte
// exact (génération déterministe + source versionnée ; les seules pages
// retouchées depuis ne modifient pas leur bloc `regle:`). false pour les
// panneaux dont le MP3 n'existe pas encore — le texte est prêt, le fichier
// reste à générer (plan de génération, action « creer »).
//
// ⚠️ Le texte VIT dans site/mj-XX.html : toute modif d'un bloc `regle:` oblige
// à régénérer le MP3, sinon l'écran et l'oreille divergent.
// ─────────────────────────────────────────────────────────────────────────────
import path from 'node:path';
import { SITE, existe } from '../../lib/socle.mjs';
import { listerRegles } from '../../lib/regles.mjs';

export const REGLES = listerRegles()
  .filter((r) => !r.ignore)
  .map((r) => {
    const fichier = `sounds/voix/phrases/${r.slug}.mp3`;
    const present = existe(path.join(SITE, fichier));
    return {
      cle: `jeu.regle.${r.id}`,
      type: 'replique',
      i18n: 'traduction',
      slug: r.slug,
      texte: r.texte,
      tags: ['warmly'], // le savant fou explique, il n'annonce pas une catastrophe
      origine_texte: 'genere',
      texte_verifie: present,
      production: { voix: 'narrateur_h', usage: 'replique' },
      fichier,
      consommee_par: [`${r.id}.html (regle-info.js 🔊)`],
    };
  });
