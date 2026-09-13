# HO-A02 — Audio EN : les 94 clips hors fiche

**Statut :** pret (BLOQUÉ quota jusqu'au reset du 2026-10-11)
**Depend de :** HO-A01 (clos, 71/71 fiches livrées le 2026-09-12)

## Objectif
L'encyclopédie anglaise parle partout, pas seulement dans les fiches : menus, ères, périodes,
récits du Voyage, dico des racines et clips spéciaux. Et le Scelidosaure a enfin son nom court,
dans les 12 langues.

## Contexte a lire d'abord
- `memory/audits/2026-09-12-etat-audio-en-dino.md` (état complet, plan en lots)
- `studio/dino/content/scripts/audio/_gen-audio-i18n-sts.mjs` (en-tête : pipeline STS, ledger, reprise sur quota)
- `.claude/rules/dino.md` (règles figées), archive `docs/handoffs/archives/2026-09-12-audio-en/HO-A01-*.md`, runbook `studio/dino/docs/handoffs/HO-019-reprise-audio-quota.md`

## Décisions figées (Papa Yann, 2026-09-12)
- **Qualité maximale, deux passes** : TTS voix native Liam, puis speech-to-speech vers la voix
  maison. Coût assumé. **Ne jamais proposer le TTS direct pour économiser.**
- Les fiches dino passent avant le hors-fiche : c'est fait, ce brief est la suite.

## Etat au 2026-09-13 (mesuré, pas estimé)
56 clips sur 150 sont faits (20 menu, 3 ere, 33 dico). Le ledger
`studio/dino/content/i18n/fiches-audio/en-hors-fiche.json` compte 56 entrées : à la reprise, le
script les saute et ne les repaye pas.

| Famille | Clips restants | Caracteres | Credits (ratio 1,29) |
|---|---|---|---|
| recit (Voyage) | 13 | 21 153 | ~27 287 |
| dico (suite) | 68 | 10 992 | ~14 180 |
| special | 8 | 4 854 | ~6 262 |
| periodes | 5 | 493 | ~636 |
| **TOTAL** | **94** | **37 492** | **~48 365** |

Le quota mensuel Creator est de 121 391 crédits : **tout passe en une seule fois**, avec de la
marge. Le ratio de 1,29 est mesuré sur le lot A (54 172 crédits pour 42 186 caractères), il
remplace le ×2 que supposait l'audit.

## Fichiers autorises
- `site/audio/dinos/en/**` et `site/audio/dinos/<lang>/noms/scelidosaurus.mp3` (12 langues)
- `studio/dino/content/i18n/fiches-audio/en-hors-fiche.json` (ledger, écrit par le script)
- `site/js/gen/dinos-audio-manifest.js` (régénéré par `_gen-audio-manifest.cjs`)
- `docs/handoffs/rapports/HO-A02.md`

## Hors perimetre
- Aucune commande git. Aucun texte de script modifié. Aucun sous-sous-agent.
- Ne PAS lancer `--force` : le ledger doit skipper les 56 clips déjà sains.

## Travail
1. Vérifier le solde : `mcp__elevenlabs__check_subscription`. Sans ~48 400 crédits libres, STOP
   et le dire — ne pas lancer une génération qui s'arrêtera au milieu.
2. Simulation d'abord, sans `--pour-de-vrai`, et comparer le nombre de clips annoncé aux 94
   attendus. Un écart = enquêter avant de dépenser.
3. Génération, famille par famille pour que le journal reste lisible :
   ```
   node studio/dino/content/scripts/audio/_gen-audio-i18n-sts.mjs --lang=en --hors-fiche=<slugs> --pour-de-vrai
   ```
   ⚠️ **Toujours énumérer les slugs.** `--hors-fiche=` avec une valeur vide signifie « tous les
   clips restants » : c'est ce qui a épuisé le quota le 2026-09-12 (un fichier de sélection
   écrit dans `/tmp` avait disparu entre deux commandes). Construire la liste dans la même
   commande que la génération, jamais via un fichier temporaire intermédiaire.
4. Nom court du Scelidosaure : absent dans les 12 langues (70/71 partout). À produire dans
   `site/audio/dinos/<lang>/noms/scelidosaurus.mp3`, un mot par clip, même voix que ses voisins.
5. Régénérer le manifest : `node studio/dino/content/scripts/export/_gen-audio-manifest.cjs`
6. Écouter 3 clips au hasard dont un récit : durée, silence de tête de 250 ms, pas de coupure.
   Un log de succès ne prouve rien — ouvrir le fichier.

## Portes de verification
```bash
ls site/audio/dinos/en/*.mp3 | wc -l
python -c "import json;print(len(json.load(open('studio/dino/content/i18n/fiches-audio/en-hors-fiche.json',encoding='utf-8'))))"  # 150
find site/audio/dinos/en -name '*.mp3' -size -2k        # doit etre vide (pas de fichier tronque)
ls site/audio/dinos/*/noms/scelidosaurus.mp3 | wc -l    # 12
node studio/dino/content/scripts/export/_gen-etat-dinos.cjs
node studio/referentiel/build.mjs
```

## Rapport attendu
`docs/handoffs/rapports/HO-A02.md` : clips générés par famille, coût réel constaté face aux
~48 365 prévus, sortie des portes, anomalies d'écoute.
