# Tests audio archivés — 001 Le Pont Cassé

> Tests effectués pendant la session 2026-05-11 sur les tags v3, tricks de graphie, équilibrage multi-voix.
> Conservés pour traçabilité (apprentissages capitalisés dans `audio-direction-elevenlabs/07-anti-patterns.md`).

## Contenu

- `_TEST-text-to-dialogue.mp3` — 1er test API text-to-dialogue (3 voix)
- `_TEST-4voix-balanced.mp3` — équilibrage volume Raph (Style 0.40 + Boost off)
- `_TEST-Wex-tics-inline.mp3` — tics phonétiques inline (ze, ouitte) — résultats inégaux
- `_TEST-Wex-stammers.mp3` — tag `[stammers]` → produit hésitation pré-phrase, pas intra-mot (AP#3)
- `_TEST-Wex-Brazilian-accent.mp3` — tag `[Brazilian accent]` sans effet sur voix Native French (AP#2)
- `_TEST-Wex-graduation-huit.mp3` — graduations `'huit` / `HUIT` / `hu-it` / `h-huit`
- `_TEST-Wex-soft-modulation.mp3` — modulations `[softly]` × intensités
- `_TEST-Wex-graphies-mots.mp3` — graphies de mots (`b-bus` valide, `bus-bus` non — AP#11)
- `_TEST-Raph-cris-graphies.mp3` — cris `CA TA STRO FFE` / `YOU HOU` / `HOULOU` (AP#10 phonétique pure)

## À nettoyer ?

Ces fichiers peuvent être supprimés après la canonisation du MP3 final v3 si l'espace disque devient un sujet. Pour l'instant on conserve pour retro/formation.
