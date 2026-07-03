# Archive — versionnite des récits d'époque (2026-07-03)

> Rangé ici par **DEC-GED-001** (règle #1 : canon sans numéro, historique daté). Rien n'est supprimé — l'invariant « jamais jeter de matière narrative » est respecté. Ces fichiers sont l'HISTORIQUE ; le présent vit dans [`../../RECITS-EPOQUES.md`](../../RECITS-EPOQUES.md).

## Pourquoi ces fichiers sont ici

Six fichiers coexistaient dans `recits/` sans que rien ne dise lequel faisait foi. Preuve objective du canon : le générateur `_md2json-recits-v3.cjs` lit **V5** par défaut, et le dernier commit de prod audio (`101d48c7`, 2026-06-19 « regenerate all 8 voyage episodes with V5 energy ») a produit les 8 MP3 déployés depuis V5. → **V5 est devenu `RECITS-EPOQUES.md` (le canon).** Les autres sont archivés ici.

| Fichier | Ce que c'était |
|---------|----------------|
| `_RECITS-EPOQUES-DIALOGUE-V0-faux-final.md` | 1ʳᵉ version. **Se disait « DIALOGUE FINAL » à tort** — c'est ce faux ami qui trompait tout le monde (et vers lequel pointaient les refs figées avant correction). |
| `_RECITS-EPOQUES-DIALOGUE-V3.md` | Itération intermédiaire |
| `_RECITS-EPOQUES-DIALOGUE-V4.md` | Itération intermédiaire |
| `_RECITS-EPOQUES-BRUT.md` | Matière brute amont (avant mise en dialogue) |
| `_RECITS-EPOQUES-FOND.md` | Fond factuel des 8 époques (contexte recherche) |

## Règle pour l'avenir

Nouvelle version d'un récit → elle **devient** `RECITS-EPOQUES.md`, l'ancienne descend ici, datée. On ne garde jamais deux « présents ».
