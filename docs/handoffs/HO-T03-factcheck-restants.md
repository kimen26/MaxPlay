# HO-T03 — Sourcer les Fact-check restants

**Statut :** pret
**Depend de :** —

## Objectif
Chaque ligne « > Fact-check » des scripts audio V3 restants cite une URL vérifiable (Grokipedia en première source), comme déjà fait pour 15 dinos le 2026-10-01.

## Contexte a lire d'abord
- `studio/dino/content/scripts/export/_verif-scripts-audio.cjs` § `LEGACY_FACTCHECK` (règle R22, commentaire L-D-85)
- Les 15 scripts déjà sourcés le 2026-10-01 (`git log` sur `studio/dino/content/scripts-audio/fr/V3/`) comme modèle de format : `> Fact-check (sourcé <date>) : <Source> <URL> — « citation » (constat)…`
- **Attention** : 4 des 15 déjà faits portent une mention **DOUTEUX** dans leur ligne (amargasaurus, ceratosaurus, glyptodon, edmontosaurus) — un fait du script ne trouve pas de confirmation exacte dans la source lue. Ce sont des questions ouvertes pour Papa Yann, pas des erreurs de format ; ne pas les retoucher dans ce brief, les signaler si une relecture les concerne.

## Fichiers autorises
- `studio/dino/content/scripts-audio/fr/V3/<id>.md` pour chaque id encore dans `LEGACY_FACTCHECK` (`pachycephalosaurus`, `paraceratherium`, `parasaurolophus`, `pentaceratops`, `scelidosaurus`, `scutellosaurus`, `spinosaurus`, `stegosaurus`, `tarbosaurus`, `therizinosaurus`, `triceratops`, `tyrannosaurus`)
- `studio/dino/content/scripts/export/_verif-scripts-audio.cjs` (uniquement le set `LEGACY_FACTCHECK`)

## Hors perimetre
- Aucune commande git. Ne modifier QUE la ligne Fact-check de chaque script (le reste du fichier ne doit pas bouger — vérifier avec `git diff` avant de rendre).
- Ne pas inventer de fait : une source qui ne confirme pas un détail du script = marquer DOUTEUX dans la ligne, ne pas trancher soi-même, ne pas supprimer le détail.

## Travail
Pour chaque id de la liste :
1. Chercher la page Grokipedia correspondante (et Wikipédia si besoin) ; citer l'URL exacte.
2. Reformuler la ligne Fact-check en sourçant chaque affirmation du script (formation géologique, dates, contemporanéité, régime, anatomie…), avec citation courte entre guillemets de la source.
3. Si un détail du script n'est pas confirmé par la source lue → marquer **DOUTEUX** explicitement dans la ligne, ne pas le garder comme acquis.
4. Retirer l'id du set `LEGACY_FACTCHECK` seulement si le script `_verif-scripts-audio.cjs fr` passe OK pour ce fichier et que seule la ligne Fact-check a changé.

## Portes de verification
```bash
node studio/dino/content/scripts/export/_verif-scripts-audio.cjs fr
git diff --stat -- studio/dino/content/scripts-audio/fr/V3/
```

## Rapport attendu
Liste des ids traités, ids retirés de `LEGACY_FACTCHECK`, ids restés en DOUTEUX, sortie du script (0 KO attendu), `git diff --stat` cohérent (une seule ligne par fichier).
