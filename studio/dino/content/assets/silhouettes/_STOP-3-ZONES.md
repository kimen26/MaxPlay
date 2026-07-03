# ⛔ STOP — 3 zones de silhouettes coexistent (ne rien relancer avant décision)

> Posé par **DEC-GED-001** (règle #6, 2026-07-03). Le même besoin « silhouette de dino » vit dans **3 zones** sans qu'aucune sache si les autres sont mortes. **Ne PAS générer de nouvelles silhouettes/ombres avant d'avoir tranché** — sinon on refait ce qui existe déjà ailleurs.

| Zone | Grain | Contenu | Statut |
|------|-------|---------|--------|
| `studio/dino/content/assets/silhouettes/` (ce dossier) | **par famille** | banque PNG noir/transparent extraite du tileset LimeZu | source d'autoring |
| `site/img/dinos/silhouettes/` | **par famille** | déployée (manifeste `site/js/dino-silhouettes.js`, page admin `dev-silhouettes.html`) | hors menu prod |
| `site/img/dinos/_new-ombre/` | **par dino nommé** | 19 « ombres chinoises » (`Nom_ombre.png`), chantier interrompu 2026-07-02 (4 échecs) | en pause |

## Pourquoi on ne tranche pas maintenant

Décision de fusion **reportée au démarrage du 1er mini-jeu qui consomme des silhouettes** (ex « devine le dino à son ombre »). C'est ce jeu qui dira le bon grain (par-famille vs par-dino-nommé) et la bonne source. Trancher sans le besoin réel = se tromper.

## En attendant

- ❌ Ne pas relancer de génération d'ombres/silhouettes.
- ❌ Ne pas supprimer une zone « parce qu'elle a l'air en double » — elles n'ont peut-être pas le même rôle.
- ✅ Quand le mini-jeu arrive : choisir la zone (probablement `_new-ombre/` par-dino, à compléter 19→60), archiver les autres, et faire descendre le résultat dans `site/` via la frontière autoring/produit (DEC-GED-001 règle #3).
