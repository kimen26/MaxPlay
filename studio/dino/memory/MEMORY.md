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
- **Suite de vague (2026-09-05 matin)** : HO-017 / HO-018 en cours (agents), audio EN intégral bloqué quota — décision palier ElevenLabs à prendre (`docs/handoffs/HO-019-reprise-audio-quota.md`), branchement `MENU_VOICE.epoque/dico` après HO-017. Détail : `memory/TODO.md` § Suite de vague.
- **Vague Fiches dino complètes (2026-09-05)** : data + scripts (4 langues) + audio théropodes livrés ; reste l'audio FR de 35 dinos (solde ElevenLabs, reset 2026-09-11), l'écoute de Papa Yann (musiques, SFX, T-Rex 4 langues) et la question vitesse en UI. L'ancien blocage « 32 fiches hors tolérance » est levé (tous les blocs B sortent des fonctions exécutées).
- **Questions Papa Yann non tranchées (2026-09-03)** : macro-périodes/Ères (Mésozoïque), challenge taxo (Pachycéphalosaure/Gallimimus/Oviraptor), drift count 70 vs 71. Détail : `memory/TODO.md` § Questions Papa Yann.

## Journal (3 dernières sessions substantielles)

- **2026-09-06 — Reste hors quota terminé (GO PY)** : Pangée et Grande Extinction rebranchées dans le Voyage (après Trias / après la météorite), `menu-accueil.mp3` orphelin retiré, `menu-ep-*` requalifiés en étiquettes Lunii (pack à passer à 12 épisodes au reset : LUNII-VOYAGE-12), `_md2json-hors-fiche.cjs --out=` (L-101). Côté JEU : mj-30 en pieds/livres en EN, packs es-es et pt-br des 36 mini-jeux (HO-MJ-07).
- **2026-09-05 (nuit) — Voyage V2 livré + récit météorite V2 + i18n mini-jeux lots 0-2** : Voyage passé à 12 récits (4 nouveaux du Précambrien au Permien, Mésozoïque enrichi, Grande Extinction réécrite avec les mots de PY), porte des récits créée, audio FR généré jusqu'au quota, EN prêt ; mini-jeux : plomberie i18n + panneaux règle EN des 36 jeux (HO-MJ-02), chaînes de jeu des 12 premiers en cours (HO-MJ-03). Reste au reset : MP3 FR (35 fiches + récits non régénérés), puis fiches EN.
- **2026-09-05 (soir) — Décisions PY : quota B, Voyage ères + Grande Mort, silence MP3, epic i18n mini-jeux** : palier Creator conservé (DEC-AUDIO-QUOTA-001, STS confirmé) ; 3 ères en macro-info + 9ᵉ récit « La Grande Mort » (défigeage gravé, audio FR fait, EN au quota) ; règle 250 ms de silence outillée (`_pad-tete.mjs`) et appliquée à tous les MP3 ; audit i18n des 36 mini-jeux livré (`studio/minijeux/docs/i18n/AUDIT-I18N-MJ-2026-09-05.md`, 6 lots).
- **2026-09-05 (matin) — Suite de vague : recadrage Tritri, EN intégral lancé, menu parental** : retour PY « trop de Tritri sur le T-Rex, c'est eux le centre » → règle 1 mention/fiche gravée (L-D-75, DEC-SCRIPTS-AUDIO-003, figée, porte) et 3 fiches × 4 langues recadrées + MP3 refaits. Espace parents refait en 4 tuiles (Statistiques / Paramètres / Compte / Retours) avec sélecteur de langue (Playwright OK). 2 accroches d'onglet FR produites (époques, dico). HO-017 (textes EN restants) et HO-018 (scripts EN hors fiches, 2 lots) lancés. Audio EN intégral chiffré ≈ 305 k caractères : bloqué quota, décision palier à prendre par PY (HO-019).
- **2026-09-05 — Vague « Fiches dino complètes » HO-009..016 (nuit, orchestration multi-agents)** : audit data 71/71 (28 corrigés : mesures, lieux, anachronismes, textes) ; nouveau champ `vitesse_kmh` + `_compVitesse` ; 71 Scripts audio FR réécrits 1 fichier/dino avec tags v3 denses (porte durcie) et relus 71 PASS ; i18n en/es-es/pt-br 71 × 3 ; audio des 13 théropodes en 4 langues (FR régénéré + pipeline STS multi-voix) ; 10 musiques + 41 SFX. Audio FR régénéré pour 36/71 ; les 35 restants attendent le reset EL du 2026-09-11. Textes UI traduits (strings.json 3 langues) recroisés avec la data. Détail : `docs/handoffs/README.md` § Vague 2026-09-05, `memory/TODO.md` § Lane Vague.

- **2026-09-03 — Vague i18n texte + audit UI + bugs merger** : EP-D-I18N livré (en/es-es/pt-br, fiches + UI complètes, recette Playwright 4/4 PASS), 2 bugs merger corrigés (`const` sur `window`, `DINO_RACINES` objet pas tableau), 2 dérives d'échelle EN rattrapées (bus scolaires), conversion métrique→impérial EN validée. Puis audit séparé le même jour : 32 scripts FR réécrits hors tolérance d'échelle — régénération audio bloquée en attente de correction. Détail : `archive/backlog-fermes-2026.md`.
- **2026-08-11/12 — Pipeline STS i18n livrée + poussée** : diagnostic (accent FR malgré `language_code`) → solution TTS voix native Voice Library → speech-to-speech vers narrateur_h (0 slot). 840 fichiers produits (770 noms i18n 11 langues + 70 FR), 0 échec. Limite gravée : STS ne couvre aucune langue africaine. i18n câblé mais dormant (pas de sélecteur UI). Détail : `archive/sprint-log-2026-06-08.md`.
- **2026-08-10/11 — Chantier audio/i18n transverse** : 69 recaps re-concaténés, 6 blocs en retard régénérés (référentiel 0 dette), 94/94 audios FR régénérés, lexiques prononciation 70/70 × 8 langues, 420 noms i18n produits, manifest multi-langue corrigé, périodes branchées, TTS unifié + respell FR. Détail : `archive/sprint-log-2026-06-08.md`.

## Fichiers clés

Voir [`../CLAUDE.md`](../CLAUDE.md) § Où vit quoi et [`../INDEX.md`](../INDEX.md) pour la carte complète.
