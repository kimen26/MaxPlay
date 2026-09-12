# HO-N02 — Rangement audio dino : docs de méthode sorties de `fr/V3/`, tickets gravés

**Statut :** fait
**Depend de :** — (vague 1, campagne nettoyage assets 2026-09-12). Mécanique : Haiku.

## Objectif
`studio/dino/content/scripts-audio/fr/V3/` ne contient QUE les 71 fiches ; les 3 docs de méthode vivent dans `studio/dino/content/scripts-audio/_methode/` ; les constats de l'audit audio sont gravés en tickets d'une ligne dans `studio/dino/memory/TODO.md` ; le dossier `studio/dino/content/sources/images/_grok-test/` (2 essais Diplodocus, canon déjà choisi) est supprimé.

## Contexte a lire d'abord
- `memory/audits/2026-09-12-nettoyage-assets-audio.md` § 4, 5, 6
- `studio/dino/memory/TODO.md` (format : 1 ligne par ticket, statuts `[ ] [~] [!] [?]`)
- `studio/dino/content/INDEX.md` (carte de `content/`, à mettre à jour si elle cite `fr/V3/` ou `_grok-test`)

## Fichiers autorises
- `studio/dino/content/scripts-audio/fr/V3/{CONSIGNES.md,diagnostic-plan-fiches-dino.md,plan-reecriture-fiches-dino-V3-consolide.md}` → déplacés vers `studio/dino/content/scripts-audio/_methode/`
- Tout fichier `.md`/`.cjs`/`.mjs`/`.sh` sous `studio/dino/**` et `.claude/skills/dino*/**` qui cite l'un de ces 3 chemins (grep avant, repointer après)
- `studio/dino/content/sources/images/_grok-test/**` (suppression)
- `studio/dino/memory/TODO.md`, `studio/dino/content/INDEX.md`

## Hors perimetre
- Aucune commande git. Aucun fichier hors liste. Aucun mp3, aucun script de génération, aucune génération ElevenLabs.

## Travail
1. `grep -rn "CONSIGNES.md\|diagnostic-plan-fiches-dino\|plan-reecriture-fiches-dino-V3-consolide\|_grok-test" studio .claude` → repointer chaque référence, puis déplacer (`mv`) les 3 docs, supprimer `_grok-test/`.
2. Tickets à ajouter dans `studio/dino/memory/TODO.md` (1 ligne chacun, sans doublonner un ticket existant : AUDIO-EN-INTEGRAL, LUNII-VOYAGE-12 existent déjà → les compléter plutôt que dupliquer) :
   - AUDIO-EN-INTEGRAL : préciser « reset 2026-09-11 passé, aucun MP3 EN daté après le 2026-09-10 : run étape 2 HO-019 (58 fiches EN) pas encore lancé, simulation d'abord ».
   - **LANGUES-NOM-SEUL** `[?]` — 8 langues (ar, de, hi, it, ja, ru, zh, es-mx) sélectionnables dans `site/js/lang.js` sans aucune fiche audio : retirer de `SUPPORTED` ou assumer un niveau « nom seul » documenté. Décision Papa Yann.
   - **LUNII-MENU-EP-5** : 5 étiquettes `menu-ep-{naissance-terre,vie-dans-eau,sortie-eau,reptiles-permien,grande-mort}.mp3` manquantes, à faire avec l'étape 6 de HO-019 (compléter LUNII-VOYAGE-12 si même sujet).
   - **REFERENTIEL-96-DETTES** `[ ]` — 96 dettes « script modifié après le dernier MP3 » dans `studio/referentiel/_ETAT-CONTENU.md` : à acquitter ou régénérer par lot.
3. Vérifier que `_gen-audio-v3.sh`, `_md2json-v3.cjs`, `_verif-scripts-audio.cjs` ne comptent plus que 71 fichiers dans `fr/V3/`.

## Portes de verification
```bash
ls studio/dino/content/scripts-audio/fr/V3/*.md | wc -l        # 71
node studio/dino/content/scripts/export/_gen-etat-dinos.cjs      # 71/71/0 inchangé
node studio/referentiel/build.mjs                                # sans erreur
grep -rn "fr/V3/CONSIGNES\|fr/V3/diagnostic\|fr/V3/plan-reecriture\|_grok-test" studio .claude   # 0 ligne
```

## Rapport attendu
`docs/handoffs/rapports/HO-N02.md` : fichiers déplacés / modifiés / supprimés, sortie des portes collée, lignes ajoutées au TODO dino citées verbatim.
