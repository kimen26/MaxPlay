# Scripts de génération (pôle JEU)

Générateurs de contenu, pas des tests — rangés hors de `tests/` depuis le 2026-09-03 (HO-G10).

- `audio/` — génération des MP3 jeu (consignes, règles, nombres, phonèmes) via `studio/referentiel/`
  (voir `studio/referentiel/README.md` pour le contrat "constater vs générer").
- `avatars/` — `batch-avatars-{dual,gpt,grok}.mjs`, génération des avatars dino (Playwright + Grok/ChatGPT).
- `decor/` — `batch-decor-gpt.mjs`, génération des éléments de décor (mur/fusée).

## Lancer

Scripts Node purs : `node studio/minijeux/scripts/audio/<script>.mjs` (dry-run par défaut, flag
`--pour-de-vrai` pour un vrai appel API — jamais lancé sans validation explicite).
Scripts `avatars/`, `decor/` : nécessitent Playwright installé (`npm i` dans `studio/minijeux/tests/`).
