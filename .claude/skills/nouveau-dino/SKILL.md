---
name: nouveau-dino
description: "Ajouter une ou plusieurs bêtes à l'encyclopédie dino MaxPlay de bout en bout - fact-check, entrée data, dialogues audio Narrateur et Wex, MP3 ElevenLabs, étymologie, images paléoart, traces PMO. Auto-trigger sur ajouter un dino, nouveau dinosaure, rajoute un dinosaure, ajoute Minmi, nouvelle bête dino, intégrer un dino, faire une fiche dino, ajouter à l'encyclopédie dino."
---

# Skill — Ajouter une bête à l'encyclopédie dino

> **V1, écrite 2026-07-25** au retour de la vague +7 (Minmi, Scutellosaure, Maiasaura, Édaphosaure, Gorgonops, Lystrosaure, Moschops). Elle encode ce qui a réellement marché et ce qui a réellement coincé ce jour-là. À réviser après le prochain usage.
>
> **Déclenchement en langage naturel.** Papa Yann arrive souvent depuis Telegram : « ajoute un Ptérodactyle » doit suffire. Ne jamais exiger de syntaxe de commande.

## Le principe : un seul arrêt

Papa Yann ne veut pas d'allers-retours (surtout sur mobile). Donc :

- **UN arrêt obligatoire** : après le fact-check, sur la **taxonomie** (voir § Arrêt taxo). C'est le seul point où une erreur contamine tout le reste.
- **Ensuite ça enchaîne** jusqu'aux images, sans redemander.
- **Arrêt supplémentaire seulement si tu tombes sur un os** : sources en désaccord franc, canal d'images bloqué, quota épuisé, règle figée qui semble devoir bouger. Dans ce cas → **alerte texte**, jamais de décision unilatérale.

🚫 **JAMAIS `AskUserQuestion`** — ni ici ni ailleurs. Le picker ne se relaie pas sur Telegram. Toute question se pose **en texte dans la réponse**.

## Avant de commencer

Lire, dans cet ordre :
1. [`studio/dino/CLAUDE.md`](../../../studio/dino/CLAUDE.md) — règles du pôle
2. [`studio/dino/figees/encyclopedie.md`](../../../studio/dino/figees/encyclopedie.md) — décisions verrouillées
3. [`studio/dino/content/sources/_PLAYBOOK-DINO-NOUVEAU.md`](../../../studio/dino/content/sources/_PLAYBOOK-DINO-NOUVEAU.md) — les 7 phases détaillées
4. [`studio/dino/pmo/INVARIANTS.md`](../../../studio/dino/pmo/INVARIANTS.md) — chiffres clés (jamais de mémoire)

Puis annoncer le plan en une phrase et **TodoWrite** les phases.

---

## Phase 1 — Fact-check (agent `dino-conseiller`)

Un agent par lot de 3-4 bêtes, **en parallèle**. Grokipedia en 1ʳᵉ source, Wikipedia en recoupement. Si WebFetch rend 403 → Playwright/Chromium de `studio/minijeux/tests/` (mémoire `reference_webfetch_403_playwright`).

Demander pour chaque bête les champs exacts de `dinos-data.js` (voir gabarit `id: 'dimetrodon'`), **fourchette trouvée + valeur retenue** pour taille/hauteur/poids, et la **signalisation explicite des désaccords** entre sources.

⚠️ **Faire dire à l'agent ce qu'on ne sait PAS.** Exemple vécu : le crâne longtemps attribué à Minmi appartient en réalité à *Kunbarrasaurus* (séparé en 2015) — le vrai Minmi n'a **pas de crâne connu**. Sans ce signalement, on décrit un autre animal dans le texte ET dans l'image.

## ⛔ Arrêt taxo (le seul obligatoire)

Beaucoup de « dinos » demandés n'en sont pas. Vérifier chaque bête :

| Cas | Famille (clé `dinos-data.js`) | Libellé UI |
|---|---|---|
| Vrai dinosaure | `trex` `cou_long` `arme` `cornu` `bec` `raptor` | selon le clade |
| Synapside / thérapside (Permien-Trias) | `volant` | « Avant les dinosaures » |
| Reptile marin | `enaliosaures` | Énaliosaures |
| Ptérosaure | `pterosaures` | Ptérosaures |
| Mégafaune post-dinos | `mammiferes` / `oiseaux` | Cénozoïque |

Précédent qui fait jurisprudence : **L-D03, honnêteté taxo** (Titanis rangé en oiseau, pas en mammifère). On ne range jamais une bête dans « dinosaures » pour se simplifier la vie.

**Poser en texte, court** : « X et Y ne sont pas des dinosaures, ce sont des <quoi> → ils vont dans <famille>. Je continue ? » Puis attendre.

Si l'ajout fait **grossir une famille** dont le texte `explic` ne cite qu'un membre → le réécrire (vécu : `volant` ne parlait que du Dimétrodon alors qu'ils étaient 5).

## Phase 2 — Data `site/js/dinos-data.js`

Insérer chaque entrée **auprès de ses voisins de famille**. `id` minuscule stable, `png` en Majuscule exacte.

**Les comparaisons de taille ne s'écrivent JAMAIS à la main** : `comp_taille: _compLong(x)`, `comp_hauteur: _compHaut(y)`, `comp_poids: _compPoids(z)`.

Puis **vérifier par exécution** (script jetable dans le scratchpad) :
- `DINOS.length`, répartition par famille/régime
- clés `famille`/`cat`/`periode` valides, ids uniques, aucun champ vide
- **la sortie réelle de chaque `_compXXX`** — et contrôler qu'elle ne ment pas de plus de 10 % (règle figée)

⚠️ **Auditer les paliers, pas seulement l'appel.** Vécu (L-D-52) : `_compPoids` avait un trou entre 200 kg et 1,2 t qui faisait dire « aussi lourd qu'un gros cochon » à 17 dinos déjà en ligne, jusqu'à +400 % d'écart. Une fonction canonique validée une fois n'est pas validée pour toujours : les nouveaux entrants révèlent des trous que personne ne mesurait.

## Phase 3 — Dialogues audio V3

Fichier `studio/dino/content/scripts-audio/fr/V3/<lot>.md`, **format strict** (un convertisseur le parse) :
- `## Nom — Nom latin complet` (l'id vient du 1ᵉʳ mot latin en minuscules, il doit exister en data)
- `### BLOC A — Présentation` · `B — Taille` · `C — Comment il vivait` · `D — Le truc fou`
- `**NARRATEUR H** [tag] : texte` et `**WEX** [tag] : texte`

Calquer [`corythosaurus.md`](../../../studio/dino/content/scripts-audio/fr/V3/corythosaurus.md) (en-tête `>` + checklist finale incluses). Consignes de style : [`CONSIGNES.md`](../../../studio/dino/content/scripts-audio/fr/V3/CONSIGNES.md).

Règles dures : **Wex 1 ligne, jamais de `!` final, jamais d'écho, aucun tic écrit** (la voix les ajoute) · boucle fermée (toute question de Wex trouve sa réponse dans le même bloc) · **vraies dates et vrais chiffres** (le « zéro chiffre en dur » est une règle de gouvernance, PAS de contenu narré) · prédation dite avec vérité mais jamais gore · termes savants expliqués, « synapside »/« thérapside » bannis à l'antenne.

Le **bloc B reprend mot pour mot** la sortie des `_compXXX` — la calculer avant d'écrire et la donner au rédacteur.

**Relire soi-même après l'agent.** Ce que la relecture a rattrapé cette fois : une prédation trop appuyée sur la blessure, un doublon entre blocs, un accord féminin, et **une erreur factuelle** (« juste après lui, une catastrophe » → il a vécu *pendant*).

Vérif finale sur les **lignes de dialogue uniquement** (les en-têtes méta citent légitimement les mots interdits) :
```bash
grep -E "^\*\*(NARRATEUR H|WEX)\*\*" <fichier> | grep -niE "\bmax\b|doudou|peluche|nounours|\bbus\b|regarde"
grep -E "^\*\*WEX\*\*" <fichier> | grep -c '!$'   # doit valoir 0
```

## Phase 3b — MP3

```bash
node studio/dino/content/scripts/audio/_md2json-v3.cjs                    # scanne V3/, écrit les segments
bash studio/dino/content/scripts/audio/_gen-audio-v3.sh "id1 id2 id3"     # 4 blocs + recap par bête
node studio/dino/content/scripts/export/_gen-audio-manifest.cjs           # sinon l'app ne voit pas les MP3
```

⚠️ **La clé ElevenLabs vit dans `~/.claude/settings.json > env`**, pas dans `.claude.json` (qui ne contient qu'un `${...}` depuis la norme secrets). `_gen-audio-v3.sh` gère les deux ; les vieux scripts non (L-D-53).

**Vérifier les fichiers, pas le message du script** : compter 5 MP3 par bête et contrôler les durées à l'`ffprobe` (bloc 15-35 s, recap 60-120 s). Un « OK » ne prouve rien — c'est arrivé que des MP3 annoncés OK soient absents du disque.

## Phase 4 — Étymologie

Ajouter les racines dans [`_ETYMO-RACINES-50.md`](../../../studio/dino/content/sources/etymo/_ETYMO-RACINES-50.md) (format : puces `**racine-** (grec/latin *mot*) = sens` puis `→ **« sens entier »**`), puis régénérer :
```bash
node studio/dino/content/scripts/export/_etymo2racines.cjs
```
Compléter aussi [`i18n/lexiques-prononciation/fr.md`](../../../studio/dino/content/i18n/lexiques-prononciation/fr.md) : § 2 si le nom a un piège (`ch` grec → k, `y` → i, `ph` → f, `-us` final), § 3 sinon. **La règle écrite prime sur l'usage courant** (tranché : Moschops → « Mos-kops », comme Brachiosaure).

## Phase 5 — Images paléoart

**Avant de générer**, dans `~/.claude/skills/dino-images-lunii/scripts/batch-dino-series.mjs` :
1. **Ajouter une signature `MORPHO`** par bête — trait unique en MAJUSCULES, formulé en positif, chiffré. Sans elle le modèle produit une silhouette passe-partout, donc la mauvaise espèce (leçon gravée de longue date).
2. Vérifier que `NON_DINO` couvre la famille (le mot « dinosaure » dans le prompt pousse le modèle vers une silhouette de dinosaure — faux pour un synapside).
3. Contrôler à sec : `node ...batch-dino-series.mjs <id> --preview`

Puis :
```bash
powershell -File ~/.claude/skills/dino-images-lunii/scripts/launch-brave.ps1
node ~/.claude/skills/dino-images-lunii/scripts/batch-dino-series.mjs <id1> <id2> <id3>
```

**Brique d'abord** : 1 bête, lire les PNG, valider — puis batcher le reste par lots de 3.

⚠️ Si `connectOverCDP` expire alors que le port 9222 répond en HTTP : l'instance est figée. Fermer **uniquement** les process du profil isolé (`CommandLine` contient `brave-debug`) — la session Brave normale de Papa Yann ne doit pas bouger — puis relancer et attendre ~12 s (le script n'attend que 3 s, insuffisant à froid).

⚠️ Le batch **écrit `done` et conclut « terminé » même quand tout a échoué** (L-D-54) : toujours vérifier les fichiers sur le disque.

**Déploiement** (format figé) :
```bash
ffmpeg -y -i <png> -q:v 4 site/img/dinos/paleoart/<Nom>.jpg -loglevel error
```
Puis vider `_new-xxl/` **après avoir vérifié la contrepartie prod** (règle 2026-07-19 : staging = inbox, pas entrepôt).

**Câbler** dans `site/dev-dinos.html` : `DINO_EXTRAS` (les 4 scènes de galerie) + `DINO_AUDIO` (`_audioSet('<id>')`) + `DINO_AUDIO_VERSION` (`'V3'`) — **les trois**, sinon le bouton audio reste masqué ou porte un mauvais badge.

## Phase 6 — Vérifier pour de vrai

Playwright sur `site/dev-dinos.html` : `DINOS.length`, `DINO_EXTRAS`, `DINO_AUDIO` doivent être **égaux**, 0 erreur console, 0 404. Puis ouvrir une fiche et **regarder la capture** — le hero doit charger.

## Phase 7 — PMO + git

**Dans le tour**, jamais à la fin :
- `studio/dino/pmo/backlog.md` — 1 ligne par décision, + une leçon `L-D-NN` par bug trouvé (avec sa cause racine, pas juste le symptôme)
- `studio/dino/pmo/sprint-log.md` — la session
- `studio/dino/pmo/INVARIANTS.md` — les counts (seul fichier autorisé à porter des chiffres)
- `node studio/dino/content/scripts/export/_gen-etat-dinos.cjs` — jamais tenu à la main

⚠️ Un fichier PMO touché hors pôle DINO (ex. un agent narration) → tracer **aussi** dans `studio/narration/pmo/`, sinon le hook Stop bloque.

Commit par palier (data+audio, puis images, puis PMO) et **push** — Papa Yann teste via GitHub Pages. Chemins explicites, jamais `git add -A` (sessions concurrentes).

⚠️ Écrire les entrées PMO avec **Write/Edit**, pas un heredoc bash : les backticks se font manger par le shell et le fichier sort corrompu.

---

## Ce qui coince en vrai (vécu 2026-07-25)

| Symptôme | Cause | Fix |
|---|---|---|
| Agent « spawned with zero tools » | frontmatter `tools:` invalide | omettre la clé (= tous les outils) |
| MP3 « OK » mais absents | curl écrit l'erreur dans le .mp3 | vérifier taille + `ffprobe` |
| `invalid_api_key` | clé lue dans `.claude.json` (placeholder) | lire `settings.json > env` |
| CDP timeout, port 9222 OK | instance Brave figée | tuer le profil `brave-debug` seul, relancer |
| Batch « terminé », 0 image | le script trace l'intention | vérifier le disque |
| Mauvaise espèce dessinée | pas de signature `MORPHO` | l'ajouter avant de générer |
| Bouton audio masqué | manque dans `DINO_AUDIO` | câbler les 3 maps |

## Anti-patterns

- ❌ Ranger une bête en « dinosaure » par facilité → honnêteté taxo (L-D03)
- ❌ Écrire une comparaison de taille à la main → `_compXXX` uniquement
- ❌ Faire confiance au message d'un script → vérifier les fichiers
- ❌ Générer les images avant d'avoir la signature `MORPHO`
- ❌ Édulcorer un chiffre dans un texte narré au nom du « zéro chiffre en dur » (règle de gouvernance, pas de contenu)
- ❌ Décrire une partie du corps qu'on ne connaît pas (cas Minmi/Kunbarrasaurus)
- ❌ `AskUserQuestion` — questions en texte, toujours
