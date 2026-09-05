---
name: État pôle DINO MaxPlay
description: Où on en est — état complétude encyclopédie, chantiers en cours, journal des dernières sessions.
type: project
---

> Quintette mémoire pôle DINO (depuis 2026-09-04, HO-008) : `INVARIANTS` (chiffres) · `DECISIONS` (pourquoi) ·
> `TODO` (quoi ensuite) · `LESSONS` (erreur à ne pas refaire) · `MEMORY` (ce fichier, où on en est) · `CHANGELOG` (livré).

## Quelle question → quel fichier

| Question | Fichier |
|---|---|
| Un chiffre clé (count dinos/familles, échelle, casting voix) ? | `memory/INVARIANTS.md` |
| Pourquoi c'est comme ça ? | `memory/DECISIONS.md` (+ `archive/decisions-2026-H1.md` pour le détail) |
| Quoi faire ensuite ? | `memory/TODO.md` |
| Quelle erreur ne pas refaire ? | `memory/LESSONS.md` |
| Qu'est-ce qui est sorti ? | `memory/CHANGELOG.md` |
| Complétude par dino (8 axes) ? | `memory/_ETAT-DINOS.md` (généré, jamais à la main — régénérer : `node content/scripts/export/_gen-etat-dinos.cjs`) |
| Décisions verrouillées (jamais régresser) ? | `figees/encyclopedie.md` |

## État produit

Complétude par dino : voir `memory/_ETAT-DINOS.md` (généré). Compte dinos/familles/casting : voir `memory/INVARIANTS.md` (jamais recopié en dur ici, note L-D-45).

## Chantiers en cours

- **Vague i18n texte (HO-001..007, LIVRÉE)** : fiches + menu/UI traduits en en/es-es/pt-br (données, dictionnaire UI, relecture native). Reste ouvert non fait : `sens` des 100 racines du Dico + `label`/`date` des 8 épisodes du Voyage (pistes HO-009 si Papa Yann le veut). Détail complet de la vague : `archive/backlog-fermes-2026.md` § 2026-09-03.
- **Refonte infra Claude (vague « mémoire convergente »)** : ce chantier (HO-008) fait passer `pmo/` → `memory/` (quintette). Registre transverse : `docs/handoffs/README.md`.
- **Vague Fiches dino complètes (2026-09-05)** : data + scripts (4 langues) + audio théropodes livrés ; reste l'audio FR des 58 autres (solde ElevenLabs, reset 2026-09-11), le recroisement `strings.json`, l'écoute de Papa Yann (musiques, SFX, T-Rex 4 langues) et la question vitesse en UI. L'ancien blocage « 32 fiches hors tolérance » est levé (tous les blocs B sortent des fonctions exécutées).
- **Questions Papa Yann non tranchées (2026-09-03)** : macro-périodes/Ères (Mésozoïque), challenge taxo (Pachycéphalosaure/Gallimimus/Oviraptor), drift count 70 vs 71. Détail : `memory/TODO.md` § Questions Papa Yann.

## Journal (3 dernières sessions substantielles)

- **2026-09-05 — Vague « Fiches dino complètes » HO-009..016 (nuit, orchestration multi-agents)** : audit data 71/71 (28 corrigés : mesures, lieux, anachronismes, textes) ; nouveau champ `vitesse_kmh` + `_compVitesse` ; 71 Scripts audio FR réécrits 1 fichier/dino avec tags v3 denses (porte durcie) et relus 71 PASS ; i18n en/es-es/pt-br 71 × 3 ; audio des 13 théropodes en 4 langues (FR régénéré + pipeline STS multi-voix) ; 10 musiques + 41 SFX. Bloqué : audio FR des 58 autres (solde EL). Détail : `docs/handoffs/README.md` § Vague 2026-09-05, `memory/TODO.md` § Lane Vague.

- **2026-09-03 — Vague i18n texte + audit UI + bugs merger** : EP-D-I18N livré (en/es-es/pt-br, fiches + UI complètes, recette Playwright 4/4 PASS), 2 bugs merger corrigés (`const` sur `window`, `DINO_RACINES` objet pas tableau), 2 dérives d'échelle EN rattrapées (bus scolaires), conversion métrique→impérial EN validée. Puis audit séparé le même jour : 32 scripts FR réécrits hors tolérance d'échelle — régénération audio bloquée en attente de correction. Détail : `archive/backlog-fermes-2026.md`.
- **2026-08-11/12 — Pipeline STS i18n livrée + poussée** : diagnostic (accent FR malgré `language_code`) → solution TTS voix native Voice Library → speech-to-speech vers narrateur_h (0 slot). 840 fichiers produits (770 noms i18n 11 langues + 70 FR), 0 échec. Limite gravée : STS ne couvre aucune langue africaine. i18n câblé mais dormant (pas de sélecteur UI). Détail : `archive/sprint-log-2026-06-08.md`.
- **2026-08-10/11 — Chantier audio/i18n transverse** : 69 recaps re-concaténés, 6 blocs en retard régénérés (référentiel 0 dette), 94/94 audios FR régénérés, lexiques prononciation 70/70 × 8 langues, 420 noms i18n produits, manifest multi-langue corrigé, périodes branchées, TTS unifié + respell FR. Détail : `archive/sprint-log-2026-06-08.md`.

## Fichiers clés

Voir [`../CLAUDE.md`](../CLAUDE.md) § Où vit quoi et [`../INDEX.md`](../INDEX.md) pour la carte complète.
