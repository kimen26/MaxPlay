#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// valider.mjs — contrôles de forme du catalogue de contenu
//
//   node studio/referentiel/valider.mjs     (sortie 0 = vert)
//
// Fait respecter le contrat de catalogue/_SCHEMA.md. À lancer AVANT tout plan de
// génération : une erreur de forme ici coûte zéro, la même erreur découverte
// après 300 appels ElevenLabs coûte des crédits et une régénération complète.
//
// Distingue ERREURS (bloquantes) et REMARQUES (dette d'enrôlement, non bloquante).
// ─────────────────────────────────────────────────────────────────────────────
import { chargerCatalogue, chargerVoix, rendreGabarit, ROLES, PLAFOND_RENDUS } from './lib/catalogue.mjs';
import { ATOMES } from './catalogue/fr/atomes.mjs';

const TYPES_CONNUS = ['bruitage', 'humeur', 'replique', 'atome', 'gabarit', 'rendu', 'bloc'];
const I18N_CONNUS = ['invariant', 'reinvention', 'traduction', 'reecriture'];

const erreurs = [];
const remarques = [];

const { entrees, gabarits, pools, poolsInvites } = chargerCatalogue();
const resoudreVoix = chargerVoix();

// ── 1. forme commune ────────────────────────────────────────────────────────
const vues = new Set();
for (const e of entrees) {
  if (!e.cle) { erreurs.push('entrée sans clé'); continue; }
  if (vues.has(e.cle)) erreurs.push(`clé en double : ${e.cle}`);
  vues.add(e.cle);

  if (!TYPES_CONNUS.includes(e.type)) erreurs.push(`${e.cle} : type inconnu « ${e.type} »`);
  if (!I18N_CONNUS.includes(e.i18n)) erreurs.push(`${e.cle} : i18n inconnu « ${e.i18n} »`);
  if (!/^[a-z0-9.\-_]+$/i.test(e.cle)) erreurs.push(`${e.cle} : clé non conforme (minuscules pointées)`);
}

// ── 2. voix : rôle autorisé ET résoluble dans voice-map.json ────────────────
for (const e of entrees) {
  const role = e.production && e.production.voix;
  if (!role) continue;
  if (!ROLES.includes(role)) {
    erreurs.push(`${e.cle} : rôle de voix non autorisé « ${role} » (attendu : ${ROLES.join(', ')})`);
  } else if (!resoudreVoix(role)) {
    erreurs.push(`${e.cle} : rôle « ${role} » introuvable dans voice-map.json`);
  }
  if (/[a-zA-Z0-9]{20,}/.test(role)) {
    erreurs.push(`${e.cle} : un voice_id semble écrit en dur — interdit, résoudre par rôle`);
  }
}

// ── 3. ce qui doit avoir un texte en a un, ce qui n'en a pas n'en a pas ─────
for (const e of entrees) {
  const parlant = ['humeur', 'replique', 'atome', 'rendu', 'bloc'].includes(e.type);
  if (parlant && (!e.texte || !e.texte.trim())) erreurs.push(`${e.cle} : texte vide`);
  if (e.type === 'bruitage') {
    if (e.texte) erreurs.push(`${e.cle} : un bruitage n'a pas de texte`);
    if (!e.prompt_en) erreurs.push(`${e.cle} : bruitage sans prompt_en (sa seule source)`);
  }
}

// ── 4. les tags doivent être entre crochets au moment de partir, pas avant ──
// Sauf les blocs : leur « texte » est un script multi-voix catalogué par
// référence — les tags y sont inline par nature (une réplique = un ton), et
// ils ne passent jamais par le plan de génération (pas de `production`).
for (const e of entrees) {
  if (e.type === 'bloc') continue;
  if (e.texte && /\[[^\]]+\]/.test(e.texte)) {
    erreurs.push(`${e.cle} : tags v3 déjà dans le texte — les déclarer dans « tags », pas dans « texte »`);
  }
}

// ── 5. viabilité des gabarits (règle du domaine fini et petit) ──────────────
for (const g of gabarits) {
  const rendus = rendreGabarit(g, ATOMES);
  if (rendus.length === 0) {
    erreurs.push(`${g.cle} : aucun rendu — un trou pointe une famille d'atomes vide`);
  } else if (rendus.length > PLAFOND_RENDUS) {
    erreurs.push(
      `${g.cle} : ${rendus.length} rendus, au-dessus du plafond de ${PLAFOND_RENDUS}. `
      + 'Pré-générer n\'a plus de sens : choisir une tournure neutre qui évite l\'accord, ou le repli TTS.',
    );
  }
  for (const nom of Object.keys(g.trous)) {
    if (!g.patron.includes(`{${nom}}`)) erreurs.push(`${g.cle} : le trou « ${nom} » n'apparaît pas dans le patron`);
  }
  const restants = (g.patron.match(/\{(\w+)\}/g) || []).map((s) => s.slice(1, -1));
  for (const nom of restants) {
    if (!g.trous[nom]) erreurs.push(`${g.cle} : le patron cite « {${nom}} » qui n'est pas déclaré dans trous`);
  }
  if (!g.langue) erreurs.push(`${g.cle} : un gabarit doit déclarer sa langue (le patron appartient à la langue)`);
}

// ── 6. cohérence des pools d'humeur ────────────────────────────────────────
for (const p of pools) {
  if (!p.intention) erreurs.push(`${p.cle} : pool d'humeur sans intention (c'est sa seule définition)`);
  if (p.i18n !== 'reinvention') {
    erreurs.push(`${p.cle} : un pool d'humeur se ré-invente par culture, jamais « ${p.i18n} »`);
  }
  const slugs = p.variantes.map((v) => v.slug);
  if (new Set(slugs).size !== slugs.length) erreurs.push(`${p.cle} : slugs en double`);
}
for (const inv of poolsInvites) {
  const pool = pools.find((p) => p.cle === inv.cle);
  if (!pool) { erreurs.push(`pool invité « ${inv.langue} » : clé ${inv.cle} inconnue`); continue; }
  if (!pool.doublon_multilingue) {
    erreurs.push(`${inv.cle} en ${inv.langue} : ce pool n'est pas marqué doublon_multilingue (décision PY : positifs seuls)`);
  }
}

// ── 7. remarques (dette d'enrôlement, non bloquante) ───────────────────────
const aVerifier = entrees.filter((e) => e.texte && e.texte_verifie === false);
if (aVerifier.length) {
  remarques.push(
    `${aVerifier.length} textes non vérifiés — reconstruits depuis un slug ou un texte de repli. `
    + 'Ils deviendront vrais à la première régénération faite depuis le catalogue.',
  );
}
const promptsAVerifier = entrees.filter((e) => e.type === 'bruitage' && e.prompt_verifie === false);
if (promptsAVerifier.length) {
  remarques.push(`${promptsAVerifier.length} prompts de bruitage reconstruits — prompts d'origine non conservés.`);
}
const sansNatif = entrees.filter((e) => e.type === 'humeur' && e.langue && e.langue !== 'fr');
if (sansNatif.length) {
  remarques.push(
    `${sansNatif.length} fichiers de langues invitées — AUCUN texte relu par un locuteur natif. `
    + 'Contenu destiné à un enfant : faire relire chaque langue AVANT de générer.',
  );
}

// ── rapport ────────────────────────────────────────────────────────────────
console.log(`catalogue : ${entrees.length} entrées`);
const parType = {};
for (const e of entrees) parType[e.type] = (parType[e.type] || 0) + 1;
for (const [t, n] of Object.entries(parType).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${t.padEnd(10)} ${n}`);
}
console.log('');

if (remarques.length) {
  console.log('REMARQUES (non bloquantes)');
  remarques.forEach((r) => console.log(`  · ${r}`));
  console.log('');
}

if (erreurs.length) {
  console.log(`❌ ${erreurs.length} ERREUR(S)`);
  erreurs.forEach((e) => console.log(`  - ${e}`));
  process.exit(1);
}
console.log('✅ catalogue conforme au schéma');
