#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// plan-generation.mjs — écrit le PLAN des appels ElevenLabs. N'en fait AUCUN.
//
//   node studio/referentiel/plan-generation.mjs            (tout le catalogue)
//   node studio/referentiel/plan-generation.mjs humeur.positif.pt-BR
//
// 🚫 Ce script ne contacte aucune API et ne dépense aucun crédit. Il produit :
//   · _PLAN-GENERATION.md  — le plan lisible, à relire AVANT de dépenser
//   · plan-generation.json — le même plan, exécutable par un runner ultérieur
//
// Pourquoi séparer le plan de l'exécution (demande Papa Yann 2026-08-10, « les
// call EL seront faits après le code validé ») : un appel ElevenLabs est
// irréversible côté budget et produit un fichier qu'on croira ensuite canonique.
// On relit d'abord ce qui va partir — texte verbatim, tags, voix, réglages,
// destination — puis on lance.
//
// Le plan porte tout ce qu'il faut pour la REJOUABILITÉ : un fichier généré
// depuis ce plan est régénérable à l'identique, traduisible et vérifiable.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chargerCatalogue, chargerVoix, REGLAGES, TRAITEMENT, LANGUES_INVITEES } from './lib/catalogue.mjs';
import { existe, SITE, relatif } from './lib/socle.mjs';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const SORTIE_MD = path.join(ICI, '_PLAN-GENERATION.md');
const SORTIE_JSON = path.join(ICI, 'plan-generation.json');

const filtre = process.argv[2] || null;

/** Coût approximatif : ElevenLabs facture au caractère. */
const cout = (texte) => texte.length;

/** Ce qui part réellement à l'API : les tags précèdent le texte, en tête. */
function texteEnvoye(entree) {
  const tags = (entree.tags || []).map((t) => `[${t}]`).join('');
  return tags ? `${tags} ${entree.texte}` : entree.texte;
}

const { entrees } = chargerCatalogue();
const resoudreVoix = chargerVoix();

const appels = [];
const ignores = [];

for (const e of entrees) {
  if (filtre && !e.cle.startsWith(filtre)) continue;

  // Les bruitages passent par un autre moteur : hors de ce plan.
  if (e.type === 'bruitage') {
    ignores.push({ cle: e.cle, raison: 'bruitage — moteur text_to_sound_effects, plan séparé' });
    continue;
  }
  if (!e.production || !e.production.voix) {
    ignores.push({ cle: e.cle, raison: 'aucune production déclarée' });
    continue;
  }

  const role = e.production.voix;
  const voiceId = resoudreVoix(role);
  const usage = e.production.usage || 'replique';
  const profil = REGLAGES[usage] || REGLAGES.replique;
  const destination = e.fichier;
  const dejaLa = existe(path.join(SITE, destination));

  appels.push({
    cle: e.cle,
    langue: e.langue,
    type: e.type,
    // ── ce qui part à l'API ──
    texte_envoye: texteEnvoye(e),
    voix_role: role,
    voix_id: voiceId,
    modele: profil.modele,
    reglages: profil.reglages,
    // ── ce qu'on fait après ──
    traitement: TRAITEMENT,
    destination: `site/${destination}`,
    // ── état ──
    fichier_deja_present: dejaLa,
    action: dejaLa ? 'remplacer' : 'creer',
    texte_verifie: e.texte_verifie === true,
    translitteration: e.translitteration || null,
    cout_caracteres: cout(texteEnvoye(e)),
  });
}

// ── agrégats ────────────────────────────────────────────────────────────────
const total = appels.reduce((s, a) => s + a.cout_caracteres, 0);
const aCreer = appels.filter((a) => a.action === 'creer');
const aRemplacer = appels.filter((a) => a.action === 'remplacer');

const grouper = (liste, cle) => {
  const m = new Map();
  for (const a of liste) {
    const k = cle(a);
    if (!m.has(k)) m.set(k, { n: 0, cout: 0 });
    const v = m.get(k);
    v.n += 1; v.cout += a.cout_caracteres;
  }
  return [...m.entries()].sort((x, y) => y[1].n - x[1].n);
};

// ── rapport lisible ─────────────────────────────────────────────────────────
const L = [];
L.push('# Plan de génération ElevenLabs');
L.push('');
L.push('> **FICHIER GÉNÉRÉ — aucun appel n\'a été fait.**');
L.push('> Régénérer : `node studio/referentiel/plan-generation.mjs`');
L.push('> À relire AVANT de dépenser le moindre crédit.');
L.push('');
L.push('| | |');
L.push('|---|---|');
L.push(`| Appels prévus | **${appels.length}** |`);
L.push(`| — fichiers à créer | ${aCreer.length} |`);
L.push(`| — fichiers à remplacer | ${aRemplacer.length} |`);
L.push(`| Coût estimé | **${total.toLocaleString('fr-FR')} caractères** |`);
L.push(`| Textes déjà vérifiés | ${appels.filter((a) => a.texte_verifie).length} / ${appels.length} |`);
L.push('');

L.push('## Par langue');
L.push('');
L.push('| Langue | Appels | Caractères |');
L.push('|---|---|---|');
for (const [langue, v] of grouper(appels, (a) => a.langue || '—')) {
  const libelle = LANGUES_INVITEES.find((l) => l.code === langue);
  L.push(`| ${libelle ? `${libelle.drapeau} ${libelle.libelle}` : langue} | ${v.n} | ${v.cout.toLocaleString('fr-FR')} |`);
}
L.push('');

L.push('## Par voix');
L.push('');
L.push('| Rôle | Appels |');
L.push('|---|---|');
for (const [role, v] of grouper(appels, (a) => a.voix_role)) L.push(`| ${role} | ${v.n} |`);
L.push('');
L.push('_Les voice_id sont résolus depuis `voice-map.json` au moment du plan et ne sont écrits que dans `plan-generation.json`, jamais dans le catalogue._');
L.push('');

L.push('## ⚠️ À trancher avant de lancer');
L.push('');
const nonVerifies = appels.filter((a) => !a.texte_verifie && a.action === 'remplacer');
if (nonVerifies.length) {
  L.push(`- **${nonVerifies.length} fichiers seraient REMPLACÉS par un texte non vérifié.** Ces textes sont`);
  L.push('  reconstruits depuis un slug ou un texte de repli : ils sont plausibles, pas prouvés. Les');
  L.push("  remplacer changerait ce que l'enfant entend, peut-être en mieux, peut-être pas. Décider");
  L.push('  explicitement, ou écouter les fichiers actuels avant.');
}
const invitees = appels.filter((a) => a.langue && a.langue !== 'fr');
if (invitees.length) {
  L.push(`- **${invitees.length} fichiers en langue invitée, aucun relu par un locuteur natif.** C'est du`);
  L.push('  contenu destiné à un enfant : faire relire chaque langue avant de générer.');
}
L.push('');

L.push('## Détail');
L.push('');
L.push('| Clé | Voix | Texte envoyé | → |');
L.push('|---|---|---|---|');
for (const a of appels.slice(0, 60)) {
  const t = a.texte_envoye.replace(/\|/g, '\\|');
  L.push(`| \`${a.cle}\` | ${a.voix_role} | ${t} | ${a.action} |`);
}
if (appels.length > 60) L.push(`\n_… et ${appels.length - 60} autres — détail complet dans \`plan-generation.json\`._`);
L.push('');

if (ignores.length) {
  L.push('## Hors de ce plan');
  L.push('');
  for (const [raison, v] of grouper(ignores.map((i) => ({ ...i, cout_caracteres: 0 })), (i) => i.raison)) {
    L.push(`- ${raison} — ${v.n}`);
  }
  L.push('');
}

L.push('---');
L.push('');
L.push('_Produit par `studio/referentiel/plan-generation.mjs`. Ce script ne contacte aucune API._');

fs.writeFileSync(SORTIE_MD, `${L.join('\n')}\n`, 'utf8');
fs.writeFileSync(SORTIE_JSON, `${JSON.stringify({
  genere_le: new Date().toISOString(),
  avertissement: 'PLAN SEUL — aucun appel effectué. Relire _PLAN-GENERATION.md avant exécution.',
  filtre,
  total_appels: appels.length,
  cout_caracteres: total,
  appels,
  ignores,
}, null, 2)}\n`, 'utf8');

console.log(`plan : ${appels.length} appels · ${total.toLocaleString('fr-FR')} caractères estimés`);
console.log(`  à créer     : ${aCreer.length}`);
console.log(`  à remplacer : ${aRemplacer.length}`);
console.log('AUCUN appel ElevenLabs effectué.');
console.log(`écrit : ${relatif(SORTIE_MD)} + ${relatif(SORTIE_JSON)}`);
