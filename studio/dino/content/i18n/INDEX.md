# 🌍 i18n DINO — autoring multilingue

> Créé 2026-07-10 (restructuration i18n). **FR = canon** (vit dans [`../sources/`](../sources/) et [`../scripts-audio/fr/`](../scripts-audio/)) ; les autres langues = **dérivés** rangés ici.
> Frontière produit (DEC-GED-001) : le site ne lit JAMAIS ce dossier — tout descend via fichiers générés (`site/js/i18n/dinos-strings.<lang>.js`, packs `site/audio/dinos/<lang>/`).

## Carte

| Quoi | Où | État |
|------|-----|------|
| Lexiques de prononciation (9 langues) | [`lexiques-prononciation/`](lexiques-prononciation/INDEX.md) | ✅ 70 dinos × 9 langues (non-FR : entrées 2026-08-10 « à relire natif ») |
| Textes traduits par langue | `<lang>/` (strings, fiches, recits) | ⬜ à créer à la 1re vague de traduction |
| Prod audio par langue | packs `site/audio/dinos/<lang>/` | ✅ fr (378 fichiers) · ⬜ autres |

## Mécanique produit (rappel)

- `site/js/lang.js` = langue active (`?lang=` → localStorage → fr) + `AUDIO_DINOS` (préfixe pack).
- `site/js/dinos-i18n.js` = merger : charge `site/js/i18n/dinos-strings.<lang>.js` (généré) et surcharge les champs TEXTE de `DINOS` / `DINO_FAMILLES` / `DINO_RACINES`. FR = zéro surcharge.
- `site/js/dinos-audio-manifest.js` = Sets par langue (`DINO_NOM_AUDIO_BY_LANG`) — consulté AVANT tout fetch (anti-404) ; langue sans pack → TTS natif (`TTS.speak` suit `Lang.bcp47()`).

## Matrice langue × contenu (statut)

| Langue | Lexique | Strings data | Audio noms | Audio fiches | Récits |
|--------|:-:|:-:|:-:|:-:|:-:|
| fr | ✅ | — (canon inline) | ✅ 60 | ✅ 51/60 | ✅ 8 |
| en | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| pt-br | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| es | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| it | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| ar | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| ru | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| zh | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| ja | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |

> Counts précis = `pmo/INVARIANTS.md` (règle zéro chiffre en dur : cette matrice donne le STATUT, pas les totaux).
> Lexiques : 70/70 espèces dans les 9 langues (canon = `site/js/dinos-data.js`, audit 2026-08-10) — les 8 lexiques non-FR portent la mention « à relire natif » sur les entrées ajoutées 2026-08-10 ; validation native requise avant toute prod audio non-FR.

## Ajouter une langue (playbook court)

1. Lexique déjà là (sinon : gabarit `lexiques-prononciation/fr.md`).
2. Créer `<lang>/strings.md` (menus + labels + textes fiches traduits) → générer `site/js/i18n/dinos-strings.<lang>.js`.
3. Tester `?lang=<lang>` : tout parle en TTS natif (fallback), textes traduits.
4. Prod audio par vagues (preview groupé → validation native → clips dans `site/audio/dinos/<lang>/`, mêmes noms de fichiers que fr/).
5. Régénérer le manifest (`DINO_NOM_AUDIO_BY_LANG.<lang>`).

_Plan i18n global : [`memory/audio/PLAN-AUDIO-I18N.md`](../../../../memory/audio/PLAN-AUDIO-I18N.md). Gouvernance : dino-pmo unifié FOND+FORME (fusion 2026-07-19)._
