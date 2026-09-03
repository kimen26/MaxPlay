---
name: lunii-sync
description: Synchroniser une boîte Lunii branchée avec la bibliothèque maître MaxPlay (packs-manifest.json). Auto-trigger sur synchronise la lunii, sync boîte, mets à jour la lunii, transfère les histoires sur la boîte, la verte/bleue est branchée, mets les packs à jour. Conçu pour être exécuté par n'importe quel modèle, même faible — c'est juste un script à lancer.
disable-model-invocation: true
---

# Skill — Synchronisation Lunii (boîte ↔ bibliothèque maître)

## SOURCE DE VÉRITÉ (bien la lire)

- **Manifest** : `studio/lunii/packs-manifest.json` = la liste canonique des packs MaxPlay et leur source.
- **Bibliothèque maître** : `~/.studio/library/` (zips + dossiers de packs).
- **RÈGLE D'OR — création de pack** : tout nouveau pack est **1)** déposé dans la bibliothèque maître (les `build-*.mjs` le font déjà), **2)** ajouté au manifest (id = 8 derniers hex de l'UUID, type `zip`/`library`/`plainpk`), **3)** seulement ensuite transféré sur une boîte — via ce sync, jamais à la main.

## QUE FAIRE (tout est là)

> « Synchronise la Lunii » → lancer UNE commande, lire le rapport, c'est tout.

```
node studio/lunii/scripts/sync-lunii.mjs
```

- Le script fait : **VÉRIF** (sources présentes, boîte détectée D:→H:, cohérence `.pi`/`.content`) → **TRANSFERT** de ce qui manque → **VÉRIF FINALE**. Rapport `✔/✘`, exit 0 = OK.
- Mettre à jour un pack existant (nouvelle version du zip) : `node studio/lunii/scripts/sync-lunii.mjs --refresh D4E5F603` (ou `--refresh all`).
- **Le sync ne supprime JAMAIS** ce qui n'est pas dans le manifest (enregistrements micro de la verte, etc.).

## Si le rapport est rouge

- `SOURCE INTROUVABLE` → le manifest pointe un fichier absent ; vérifier le chemin (le zip est-il dans `~/.studio/library/` ?).
- `Aucune Lunii détectée` → boîte pas branchée / pas montée ; demander de brancher.
- `.pi incohérent` → orphelin device : protocole BUG-4 dans `studio/lunii/LESSONS-MOTEUR.md` (comparer `taille(.pi)/16` aux dossiers `.content`).
- `timeout transfert` (type library) → gros pack, vérifier l'apparition du dossier puis relancer le sync (idempotent).
- Luniistore ouvert → le fermer (conflit device). STUdio est piloté par le script tout seul.

## Types de source

| type | source | canal de transfert |
|------|--------|--------------------|
| `zip` | archive STUdio dans la bibliothèque maître | `lunii-pm -pi` (STUdio arrêté par le script) |
| `plainpk` | `.plain.pk` déchiffré (ex. backup) | `lunii-pm -pi` |
| `library` | dossier UUID de la bibliothèque maître | `POST /api/device/addFromLibrary` (STUdio lancé par le script) |

Marche sur v2 (verte) et v3 (bleue). ⚠️ Bleue v3 : ne JAMAIS la connecter au WiFi (elle efface les packs manuels).
