---
paths:
  - "studio/narration/personnages/**"
  - "studio/narration/cross-culture/castings-nationaux/**"
  - "studio/narration/cross-culture/prenoms/**"
---

# Personnages — règles auto-chargées

> Chargé automatiquement dès que Claude touche un fichier perso/casting/prénom.
> Source de vérité : [`studio/narration/personnages/INDEX.md`](../../studio/narration/personnages/INDEX.md) (gabarit figé 5 fichiers, structure du pilier) + [`studio/narration/personnages/lookup.yml`](../../studio/narration/personnages/lookup.yml) + [`studio/narration/memory/INVARIANTS.md`](../../studio/narration/memory/INVARIANTS.md) (casting figé, voice_ids).

## Casting V1 « Christ » FIGÉ (2026-04-24, ajusté 2026-05-05) — 4F/5M + Wex

Melki(1) · Mimi(2) · Dadou(3) · Madie(4) · Lulu(5) · Pierrot(6) · Raph(7) · Juju(8) · Nono(9) · **Wex** (hors-système, invariant cross-culture, jamais un ennéatype).

**Règle absolue** : ne JAMAIS inventer un prénom — toujours résoudre via [`lookup.yml`](../../studio/narration/personnages/lookup.yml). Détail complet des 9 types + notes : `memory/INVARIANTS.md` § Casting figé.

## Gabarit figé (2026-05-15)

5 fichiers obligatoires par dossier (`type-01/`…`type-09/` ou variante Wex) : README.md · enneagramme.md (absent pour Wex) · personnage.md · alive.md · voix.md. Détail complet : [`personnages/INDEX.md`](../../studio/narration/personnages/INDEX.md) § Gabarit figé.

## Règles d'écriture

- **Notation interne** `TypeN/TitiN @origine` en brouillon (avant lookup) → prénom final résolu en canon. Voir [`notation-types.md`](../../studio/narration/personnages/notation-types.md).
- **Surnoms 80 % du temps** (Mimi, Dadou, Nono…), prénoms complets réservés au formel (20 %).
- **Univers IMPLICITE** : jamais nommer un ennéatype ou un système dans le texte canon — dilué dans le comportement.
- **Wex** : hors-système, observateur quantique, invariant cross-culture (jamais de variante par pays).

## Cross-culture

Casting FR figé (V1) : [`cross-culture/castings-nationaux/fr/`](../../studio/narration/cross-culture/castings-nationaux/fr/). Castings à venir : [`castings-nationaux/INDEX.md`](../../studio/narration/cross-culture/castings-nationaux/INDEX.md). Réserve prénoms (218 qualifiés/30 cultures) : [`cross-culture/prenoms/INDEX.md`](../../studio/narration/cross-culture/prenoms/INDEX.md).

Seul prénom rejeté validé : "Salo" — ne pas extrapoler depuis critiques IA externes.

## Théorie & pédagogie (lecture OBLIGATOIRE avant brainstorm/plan/brief)

- Ennéagramme (Chabreuil) : [`personnages/theorie/enneagramme/`](../../studio/narration/personnages/theorie/enneagramme/README.md)
- Boussole pédagogie 4-5 ans : [`personnages/theorie/pedagogie-enfance/`](../../studio/narration/personnages/theorie/pedagogie-enfance/README.md)

## Voix-meta

Casting voix ElevenLabs : [`voix-meta/_VOICE-IDS-CASTING.md`](../../studio/narration/personnages/voix-meta/_VOICE-IDS-CASTING.md) (méthodo v24, figée 2026-05-11).

## Anti-patterns

❌ Inventer un prénom · ❌ Nommer un ennéatype dans le texte · ❌ Variante de Wex par culture · ❌ Casting modifié sans validation auteur · ❌ Surnom < 80 % du temps · ❌ Brief sans lecture pédagogie/ennéatypes.

---

_Refonte 2026-05-13, allégée HO-G07 (2026-09-03) : gabarit 5 fichiers et casting détaillé déplacés vers `personnages/INDEX.md` et `memory/INVARIANTS.md` (déjà sources uniques, non recopiées ici)._
