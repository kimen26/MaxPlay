# 🎛️ Lunii — Leçons moteur & pièges de construction de packs

> Journal des comportements **observés** du moteur Lunii (vraie boîte) et du **simulateur STUdio**
> (« Virtual Lunii »). À lire AVANT de coder un script `build-*-pack.mjs`. Complète le
> [`README.md`](README.md) (install/pipeline) et les règles d'or de [`CLAUDE.md`](CLAUDE.md).
>
> ⚠️ Distinguer **simulateur** (player React de STUdio, `webroot/static/js/main.*.chunk.js`)
> et **vraie boîte** (moteur firmware lisant le format FS binaire `ni/li/ri/sf/si`). Un bug
> peut n'exister que dans l'un des deux. Toujours préciser où une observation a été faite.

---

## ✅ Acquis solides (validés)

### Format story.json v1 (archive STUdio)
- `actionNode.id` **DOIT être un UUID** (pas un id texte type `action-menu`), sinon l'**éditeur web** affiche « Failed to load story pack » à l'ouverture. La **boîte** et le **reader Java** (`ArchiveStoryPackReader`) tolèrent les ids texte, mais pas l'éditeur. → on génère des UUID déterministes (sha1 du nom).
- Format canonique d'un node = champs `uuid, squareOne?, image, audio, okTransition, homeTransition, controlSettings` ; **pas de champ `name`** (STUdio ne le met pas). actionNode = `{ id, options }` seulement.
- Chaque stage doit avoir **un audio non-null** (un stage muet gêne l'éditeur).
- **Validation sans la boîte** : compiler un mini-prog Java qui appelle `ArchiveStoryPackReader.read()` (cp = `studio-web-ui-0.4.2/lib/*.jar`). Si `read()` ne jette pas → l'éditeur sait l'ouvrir. (cf. `c:/tmp/TestPack.java`.)

### Menu molette = actionNode multi-options
- Un menu (molette) = **1 stage** (wheel=true) dont l'`okTransition` pointe vers **1 actionNode à N options** (= les N stages parcourus à la molette). Validé : la boîte parcourt bien les options à la molette, et OK entre dans l'option courante.

### Cover = menu fusionné (anti double-OK)
- Mettre `squareOne:true` + `wheel:true` sur le **1er stage** et le faire pointer direct vers le menu → la molette est active dès l'écran d'accueil. Sinon : Cover (1 OK) puis Menu (1 OK) = **double-OK** ressenti par l'utilisateur (signalé Papa Yann 2026-06-16, corrigé).
- **Voyage 2026-06-19** : Cover/Menu fusionné validé (`squareOne + wheel + ok + home`), pas de double-OK. La molette choisit l'époque dès l'accueil, OK entre, home sort du pack.

### Place sur la boîte
- Lunii v2 de Max : carte SD **14,4 Go**, ~491 Mo utilisés (12 packs achetés + nos packs). **~13,9 Go libres** → la place n'est jamais un souci.

### Images
- Format réel boîte = **BMP RLE4, 320×240, 16 niveaux de gris, sans alpha**. STUdio convertit le PNG au transfert. On conçoit en **gris contrasté** pour maîtriser le rendu (cf. skill `dino-images-lunii`).
- Photos de dinos passent bien en gris (lisibles). Cover « scène de groupe » + emblèmes familles fournis par Papa Yann vivent dans `studio/dino/content/lunii/familles/` (mapping clé→fichier dans `build-dinos-pack.mjs`).
- **Voyage 2026-06-19** : les images `ep-*.png` (320×240, fond noir natif, skill dino-images-lunii) sont utilisées directement dans le build. Plus de cartons couleur + texte placeholders.

### Audio — silence de tête (1ʳᵉ syllabe coupée)
- **Symptôme** (signalé 2026-06-17) : la **1ʳᵉ syllabe est coupée** à la lecture (mots savants démarrant sur consonne : Th-, S-, C-).
- **Cause** : le moteur rogne le tout début (latence de démarrage du décodeur). Nos audios ElevenLabs avaient ~128 ms de silence ; insuffisant.
- **Fix appliqué** : ajouter **+300 ms de silence en tête** (`adelay=300|300`) sur toutes les accroches/noms/fiches → ~400 ms de silence total. Script `c:/tmp/pad-head.cjs` (paramètre `PAD_MS`). À intégrer dans le pipeline de préparation des assets. ➡️ **à reconfirmer** : 300 ms suffit-il sur la vraie boîte ?
- **Voyage 2026-06-19** : pad 300ms + loudnorm combiné (`ffmpeg -af "adelay=300|300,loudnorm"`) appliqué à tous les récits. Ordre important : pad d'abord, loudnorm après (sinon le loudnorm compresse le silence).

---

### BUG-5 — Pack Voyage : molette bloquée sur la vraie boîte (RÉSOLU 2026-06-28)
- **Observé** (vraie boîte) : pack "Le voyage des dinosaures", quand on le sélectionne, l'histoire se lance toute seule sans possibilité de choisir l'époque avec la molette.
- **Cause** : structure de navigation incorrecte. Le cover pointait directement vers des récits avec `autoplay:true` (8 récits dans le menu). Quand la molette pointait sur un récit, le moteur le lançait automatiquement.
- **Premier essai raté** : suppression des étiquettes intermédiaires pour faire un menu direct cover → récits. Résultat : l'histoire se lance immédiatement sans choix.
- **Deuxième essai raté** : étiquettes avec `wheel:false`. Résultat : la molette ne fonctionnait pas sur les étiquettes.
- **Fix final** : restructurer comme le pack Dino (qui marche) :
  - **Cover** (`squareOne`, `wheel:true`) → OK → menu époques
  - **Étiquette** (`wheel:true`) → la molette parcourt les 8 époques, OK → récit
  - **Récit** (`autoplay:true`) → le récit se joue, retour au cover
- **Règle validée** : pour que la molette fonctionne sur un menu, les **options du menu doivent être des stages avec `wheel:true`** (pas des récits `autoplay`). Les récits `autoplay` doivent être dans un niveau séparé, accessibles via OK depuis les étiquettes.
- **Pattern correct** : `Cover(wheel) → Étiquette(wheel) → Récit(autoplay) → Retour cover`. Exactement le même pattern que le pack Dino : `Cover(wheel) → Famille(wheel) → Nom(wheel) → Fiche(autoplay)`.

---

## ⚠️ EN COURS D'INVESTIGATION (bugs ouverts)

### BUG-1 — La fiche se relance toute seule (répétition) + image figée
- **Observé** : 2026-06-17, **simulateur STUdio** (Virtual Lunii), pack TEST 10 dinos, sur le Stégosaure : après la fiche, l'audio **se relance tout seul** (répétition) et l'**image reste affichée** pendant toute la lecture (alors que les autres écrans, eux, libèrent l'image).
- **Cause identifiée (côté simulateur)** : le player React n'enchaîne en fin d'audio QUE si **`controls.autoplay` (du stage) ET `options.autoplay` (de l'actionNode cible)** sont vrais :
  ```js
  audioEnded = () => { controls.autoplay && options.autoplay && okClicked() }
  ```
  Notre `okTransition` pointe vers un actionNode **sans flag autoplay** → `options.autoplay` est `undefined` → pas de transition → l'élément `<audio autoPlay controls>` reboucle/attend et l'image ne change jamais.
- **`options.autoplay`** est un flag du **modèle d'édition enrichi** (avec `type`/`groupId`/`position`), que le simulateur reconstruit. Notre `story.json` v1 minimal ne le porte pas.
- **Hypothèses de fix à tester (par ordre de préférence)** :
  1. **Pattern "story" canonique** : pour un nœud histoire qui doit s'arrêter et rendre la main au menu, STUdio met `home:true, pause:true, autoplay:true` **et retire le okPort** (pas de `okTransition`). Le moteur revient alors au menu parent en fin d'audio. → tester un stage fiche **sans okTransition**.
  2. Ajouter les **métadonnées enrichies** (`type:"story.story"`, `groupId`, `menu.optionstage`…) pour que le simulateur dérive `options.autoplay`. Lourd (toute la structure éditeur).
  3. Vérifier sur la **vraie boîte** : ce bug est peut-être **simulateur-only** (la boîte suit le v1 brut où `autoplay:true` sur le stage suffit — c'est ce qui a marché pour Tritri). ➡️ **trancher avec la boîte branchée**.
- **Statut** : non corrigé. Ne pas figer le pack 51 avant résolution.

### BUG-2 — Image qui ne disparaît pas pendant la lecture
- Probablement **le même mécanisme que BUG-1** : sans transition de fin, le stage (et donc son image) reste actif. Les écrans qui « libèrent » l'image sont ceux où une transition a bien lieu.
- À revalider une fois BUG-1 corrigé.

---

### BUG-3 — Bouton HOME bloqué au niveau racine du pack (RÉSOLU 2026-06-17)
- **Observé** (vraie boîte) : depuis le menu « Dinos de Max », naviguer puis **home** → on revient au niveau 0 **du pack** (menu familles), mais **impossible de ressortir** vers la bibliothèque Lunii (choix des autres packs). Coincé dans le pack.
- **Cause** : le **squareOne** avait `controlSettings.home: false` → le bouton maison est **désactivé** une fois revenu à la cover → plus de sortie possible. (Et mes nodes internes faisaient `homeTransition → cover` au lieu de sortir.)
- **Fix** : **home = sortir du pack**. Sur le squareOne : `home:true` + `homeTransition:null` (le moteur interprète "pas de home interne" = quitter le pack vers la bibliothèque). Sur les nodes internes : `homeTransition:null` (dinos) ou `→ menu interne` (voyage, OK car `home:true`).
- **Règle** : `home:false` + `homeTransition` non-null = piège #100 (crash). `home:true` + `homeTransition:null` = **sortie du pack** (sûr). cf. [discussion #191](https://github.com/marian-m12l/studio/discussions/191).
- **Voyage 2026-06-19** : `home:true` sur le squareOne (Cover/Menu fusionné) + `homeTransition:null` = sortie du pack. Sur les récits : `home:true` + `homeTransition → action-back-menu` = retour au menu (pas sortie du pack). Validé.

### Préparation des assets dino (REX 2026-08-02, maj 51 → 70 dinos · 11 familles)
- **Script versionné** : [`scripts/prepare-dino-assets.mjs`](scripts/prepare-dino-assets.mjs) (remplace le one-off perdu de juin). Récit = concat 5 blocs canon + `adelay=300|300,loudnorm`. Nom sec = **extraction du début du bloc `-nom` canon** (cut au 1er silence détecté, +120 ms de marge, fade-out 150 ms) — plus besoin de TTS pour un nouveau dino.
- ⚠️ **ffmpeg `-t` AVANT `-i`** (trim d'entrée) : en option de sortie, `-t` tronque le pad 300 ms d'`adelay` → 1ʳᵉ syllabe à nouveau coupée. Attrappé en vérifiant les durées (nom = cut + 0,3 s attendu).
- **Images dino** : la source « photo web » du build pointe désormais sur `site/img/dinos/paleoart/<Nom>.jpg` (la racine `site/img/dinos/*.png` a été réorganisée en sous-dossiers — l'ancien chemin produisait des cartons couleur).
- **Clé ElevenLabs** : les clés des 2 serveurs MCP sont **périmées** (401, 2026-08-02) ; la clé valide vit dans `~/.claude/settings.json` — utilisable en appel API direct (curl) en attendant de re-synchroniser les configs MCP. ⚠️ Git Bash : passer le corps JSON via un fichier écrit par node (`--data-binary @f.json`) — les accents tapés dans la commande partent en mauvais encodage (`invalid_unicode`).
- **Exception titanis** : son bloc `-nom` a un fond sonore qui empêche la détection de silence → nom sec généré en TTS (`[excited] Titanis !`, narrateur_h). Idem pour les 2 nouvelles accroches menu (`Les mammifères !` / `Les oiseaux !`, narrateur_h, eleven_v3) + pad/loudnorm.
- **studio-ctl.ps1** : nécessite un **BOM UTF-8** (ajouté 2026-08-02) — Windows PowerShell 5.1 lit le .ps1 en ANSI sinon et casse le parsing sur les accents.
- Pack 70 dinos validé : graphe OK (152 stages, 0 transition pendante) + `ArchiveStoryPackReader.read()` OK. Même UUID cover → pas de doublon au transfert.

### Ops — Sauvegarde complète de la SD avec Lunii.PACKS (REX 2026-08-02)
- **Outil** : [Lunii.PACKS](https://github.com/o-daneel/Lunii.PACKS) (CLI Python) installé dans `C:\ProjetsPerso\Tools\Lunii.PACKS` (venv incluse). Sur v2 il **déchiffre les packs officiels** (clé device lue sur la boîte) et exporte en `.plain.pk` (MP3+BMP en clair) — STUdio, lui, ne sait pas les lire.
- **Protocole** : `studio-ctl.ps1 stop` D'ABORD (java tient D:, sinon « périphérique qui n'existe pas ») → backup `.pi`/`.md`/`.cfg`/`version` → `lunii-pm.py -d D:/ -l -v` (liste) → export **pack par pack** (`-pe <8 hex>`) : `-pe ALL` échoue silencieusement (bug d'encodage console Windows sur emoji dans les logs) alors que l'unitaire marche.
- ⚠️ `lunii-pm` **réécrit `.pi`** à chaque lancement (dédup interne, sans perte en cas nominal) → backup `.pi` avant, obligatoire.
- Backup du jour : `C:\ProjetsPerso\Tools\lunii-backups\2026-08-02\` (`sd-system/` + `packs/`, 12 packs ≈ 600 Mo). Hors git — contenu acheté chiffré, usage sauvegarde perso uniquement.
- **v3 validée (fw 3.1.5, bleue, 2026-08-02)** : import des 4 Suzanne et Gaston depuis les `.plain.pk` via `lunii-pm -pi` (re-chiffrement AES avec les clés de la boîte cible) → STUdio relit la boîte sans erreur. Le transfert STUdio classique (drag-drop) marche aussi sur cette v3 (pack Voyage passé). ⚠️ juge final = lecture sur la boîte elle-même.
- **Orphelin inversé = transfert STUdio bloqué** : après des drag-drop ratés du pack Dinos, `.content/D4E5F603` existait (55 Mo, partiel) **sans entrée dans `.pi`** → STUdio échouait à re-transférer le même UUID, sans message clair. Diagnostic : comparer `taille(.pi)/16` aux dossiers `.content/` (dans les 2 sens : entrée sans dossier = BUG-4, dossier sans entrée = ce cas). Fix : `studio-ctl stop` → backup `.pi` → supprimer le dossier orphelin → `lunii-pm -pi <zip STUdio>` (il accepte le format archive STUdio : nettoie les tags audio, chiffre, crée l'autorisation, met `.pi` à jour proprement). Pack 70 dinos (150 Mo) passé comme ça. **lunii-pm -pi = plan B fiable quand le drag-drop STUdio échoue.**

### BUG-4 — STUdio « Failed to fetch packs from device » : index `.pi` orphelin (RÉSOLU 2026-06-19)
- **Symptôme** (vraie boîte, firmware 2.22, STUdio 0.4.2) : la Lunii est détectée (« Device is plugged ») mais STUdio affiche en rouge **« Failed to fetch packs from device »** et n'affiche **aucun pack** côté device. (Confondu d'abord avec un souci de library — non : c'est la lecture du **device** qui plante.)
- **Cause racine** : l'**index `.pi`** (à la racine de la carte SD, fichier **caché**) liste les packs installés = des **UUID de 16 octets concaténés** (`taille .pi / 16` = nombre de packs). Chaque pack a un dossier dans **`.content/`** nommé par les **8 DERNIERS caractères hex de l'UUID** (⚠️ PAS les premiers). Un transfert interrompu/raté avait **ajouté 2 UUID à `.pi`** (nos packs voyage `1f0a…f601` + dinos `3f0a…f603`) **sans écrire leurs dossiers `.content/`** → 2 entrées **orphelines** → STUdio plante en lisant la liste.
- **Diagnostic (lecture seule)** : décoder `.pi` (PowerShell `ReadAllBytes`, boucle de 16 octets) ; pour chaque UUID, tester `Test-Path "D:\.content\<8 derniers hex en MAJ>"`. Les entrées sans dossier = orphelines à retirer.
- **Fix appliqué** :
  1. **Fermer STUdio D'ABORD** : le backend java (port **8080**) tient/sonde le device → toute écriture directe échoue avec *« Un périphérique qui n'existe pas a été spécifié »*. `Stop-Process` du PID qui écoute sur 8080.
  2. **Backup** `.pi` / `.md` / `.cfg` / `version` (+ dump hex de `.pi`) → `c:\tmp\lunii-backup\`.
  3. **Tronquer `.pi`** pour ne garder que les entrées avec dossier (ici **176 → 144 octets** = 9 packs d'usine ; les orphelins = les 2×16 derniers octets). Gérer l'attribut caché : `attrib -h` avant write, `attrib +h` après.
  4. **Relancer STUdio** → device lu, 9 packs OK.
- **Règles gravées** :
  - 🔑 Dossiers `.content/` = **8 DERNIERS** hex de l'UUID (pas les premiers).
  - 🔑 **Fermer STUdio avant toute écriture directe sur la SD** (conflit USB, cf. règle Luniistore-fermé-pendant-STUdio).
  - 🔑 **Toujours backup `.pi` avant de le toucher** (garde-fou : abandonner si la taille n'est pas un multiple de 16 attendu).
  - 🔑 **NE JAMAIS « ajouter » un pack en éditant `.pi` à la main** : le transfert passe par STUdio (qui écrit `.pi` ET `.content/`). Un demi-transfert (index sans contenu) casse la lecture du device. ➡️ donc re-transférer voyage/dinos **via STUdio**, pas en bidouillant l'index.
- **Statut** : RÉSOLU 2026-06-19. Backup conservé `c:\tmp\lunii-backup\` (`pi-original.hex` = index avant fix).

## 🧪 Protocole de test d'un pack (sans / avec boîte)

1. **Sans boîte** : `ArchiveStoryPackReader.read()` (Java) → pas d'exception = lisible.
2. **Graphe** : script node qui vérifie 0 transition/option pendante, UUID valides, 1 squareOne, pas de famille vide.
3. **Simulateur STUdio** : http://localhost:8080 → ouvrir le pack dans le Virtual Lunii → parcourir molette + OK + fin de fiche.
4. **Vraie boîte** (terrain de vérité) : transférer (Luniistore fermé), tester avec Max. ⚠️ Seul juge final pour les comportements moteur (autoplay, retour menu, coupe audio).

---

## 🛠️ Ops STUdio & device — lancer / arrêter / diagnostiquer (REX 2026-06-19)

Script de contrôle réutilisable : [`scripts/studio-ctl.ps1`](scripts/studio-ctl.ps1) — `start` | `stop` | `status` | `packs`.

- **Lancer STUdio** : ⚠️ le `.bat` fourni (`studio-windows.bat`) **échoue souvent sur cette machine** :
  - `java` **n'est PAS sur le PATH système** → le `.bat` ne trouve pas java et sort sans rien lancer. Java réel = `C:\Program Files\Eclipse Adoptium\jdk-17.x\bin\java.exe` (**chemin absolu obligatoire**).
  - son `copy` des jars **prompte** quand les jars existent déjà (en lancement non-interactif → bloque/sort).
  - → utiliser `studio-ctl.ps1 start` (lance java en chemin absolu, poll 8080, logs dans `%TEMP%\studio-*.log`).
- **Arrêter STUdio AVANT d'écrire sur la SD** : le backend java (port 8080) **tient le lecteur D:** → toute écriture directe échoue (« Un périphérique qui n'existe pas a été spécifié »). `studio-ctl.ps1 stop` avant de toucher `.pi`/`.content`, relancer après. (Même esprit que « Luniistore fermé pendant STUdio ».)
- **Vérifier que la boîte se lit (sans l'UI)** : API REST STUdio →
  - `GET http://localhost:8080/api/device/infos`
  - `GET http://localhost:8080/api/device/packs` → liste `{uuid, folderName, sizeInBytes, title?}` = **le fetch qui plante quand `.pi` est incohérent** (cf. BUG-4). S'il renvoie la liste → device OK. (`studio-ctl.ps1 packs`.)
- **Trouver la Lunii** : `Get-Volume | Where FileSystemLabel -eq 'LUNII'` → lecteur (ex `D:`), FAT32, ~14 Go.
- **Windows « Analyser et réparer ce lecteur »** : apparaît après un **remontage brusque** (ex. on a tué java alors qu'il tenait D:) → dirty bit FAT32 posé. **Réparer est SÛR** (FAT32 ; chkdsk corrige les métadonnées du FS, ne touche pas le contenu des packs) **et recommandé AVANT un transfert**. ⚠️ faire `stop` STUdio d'abord pour que chkdsk **verrouille D: sans redémarrage**. Données vérifiables intactes via l'API `packs` avant/après.

### REX 2026-08-02 (soir) — retransfert d'un pack existant + images ChatGPT

- **Réimporter un pack DÉJÀ sur la boîte** : `lunii-pm -pi` refuse (`'X' is already loaded !`) → supprimer d'abord : `echo y | lunii-pm.py -d D:/ -pr <UUID8>` (le `-pr` **prompte interactivement**, d'où le `echo y |`). Puis `-pi` normal. Cohérence `.pi`/`.content` re-vérifiée après (10 packs, 160 o, 10 dossiers).
- **Illustrations de pack via ChatGPT** (skill dino-images-lunii réutilisé hors dino) : cover + 12 illustrations dodo générées dans UN chat (style cohérent), post-traitées `to-lunii.sh`. Le build `build-dodo-pack.mjs` prend l'illustration `<slug>-lunii.png` si présente, sinon fallback carton drawtext (pattern `illustrationOrCarton`).
- **Brave debug figé (CDP timeout)** : symptôme = `curl /json/version` répond MAIS Playwright `connectOverCDP` timeout (ws connecté puis pendu) → instance zombie. Fix : tuer les process brave dont la CommandLine contient `brave-debug` (WMI, cf. `c:/tmp/kill-brave-debug.ps1`), relancer `launch-brave.ps1` en ouvrant direct l'URL du chat (`chatgpt.com/c/<id>`) pour retrouver la série. Le chat survit (sauvé côté compte).
- **Pack dodo** : ADAM trimmé à **42,7 s** (blanc réel après les 40 s annoncées — toujours vérifier par `silencedetect` ; source originale dans `assets/audio/histoires-dodo/originaux/`).
- **Récits dino périmés** : les assemblages `recits-dino/*.mp3` ne se régénèrent PAS tout seuls — après toute régénération des blocs canon `site/audio/dinos/fr/`, comparer les dates et relancer `prepare-dino-assets.mjs` (15 fiches périmées trouvées le 2026-08-03, T-Rex inclus). Le « 1er morceau qui revient en fin de fiche » = le bloc **recap** répète l'étymologie par design, ce n'est PAS un bug d'assemblage.
- **Bibliothèque locale STUdio → boîte v2** : endpoint `POST /api/device/addFromLibrary` `{uuid, path}` (path = nom du dossier dans `~/.studio/library/`), transfert async avec `transferId`. Marche même pour un pack aspiré depuis la **v3** (la bibliothèque stocke un fs v2-compatible — ex. Zoé et Léo `8126c612…171a964` transféré sur la verte, déchiffrage confirmé par lunii-pm `-l`).

### REX 2026-08-04 — les 3 pièges du refresh automatisé (sync-lunii.mjs durci)

- **Ré-énumération USB après `-pr`** : la Lunii (v2 comme v3) **disparaît de D: quelques secondes après un retrait de pack** → un `-pi` lancé tout de suite échoue `Directory 'D:/' does not exist`. Fix : `waitForDevice()` (poll `.pi`+`.content` sur D:→H:, 90 s max) entre remove et import. ⚠️ Effet de bord : un remove suivi d'un import raté laisse parfois le pack **intact** (retrait annulé au démontage) — toujours vérifier l'état réel (`ls /d/.content`) au lieu de croire le « Story removed ».
- **`PYTHONUTF8=1` obligatoire pour lunii-pm** : sinon son logging **crash sur ses propres emojis** (🚧/⌛) en console Windows cp1252 → remove/import qui échouent **silencieusement** à des points arbitraires (le « remove OK, import KO » fantôme du 2026-08-03 venait de là).
- **`studio-ctl.ps1 start` peut se figer** : java démarre et l'API répond, mais le spawnSync reste pendu → timeout 60 s ajouté (le transfert est déjà fini, c'est cosmétique — diagnostic : pack vérifié sur la boîte, tuer le node restant).
- **Vérifier la VERSION d'un pack sur la boîte** sans l'allumer : `ls -la /d/.content/<ID>/rf/000/` — nombre d'images + poids total (ex. dinos paleoart ≈ 4,7 Mo / dinos ombres ≈ 0,7 Mo). Plus fiable que les dates.
- **Ombres chinoises Lunii** : les `site/img/dinos/ombres/*.png` sont en **rgba** (forme dans l'alpha, fond transparent) → `alphaextract` donne directement du blanc-sur-noir natif (PAS `negate` : le RGB des pixels transparents est arbitraire). 70/70 générées, déployées sur les 2 boîtes le 2026-08-04.
- 🔊 **Mastering boîte = -13 LUFS / TP -1.5 dB, JAMAIS le loudnorm par défaut (-24).** Mesuré 2026-08-04 : packs du commerce ≈ **-13 LUFS** (Suzanne et Gaston), nos packs étaient à **-24.6 LUFS** → ~11 dB trop bas, « à fond on entend à peine » (Papa Yann). Règle gravée : toute masterisation pour la boîte utilise `loudnorm=I=-13:TP=-1.5:LRA=11`, appliquée **au packaging** (build-*.mjs, helper `masterAudio`) — le canon web `site/audio/` reste inchangé. Patché dans les 5 builds (dinos, voyage, dodo, pierre-loup, tritri). ⚠️ `prepare-dino-assets.mjs` et les assets pré-générés restent à -24 : c'est le BUILD qui re-masterise, ne pas « corriger » les assets.

---

### REX 2026-08-21 — « Erreur carte SD » en navigation + glitch audio mi-histoire (investigation)

- **Symptômes** (signalés PY, boîte v2 de Max) : **(A)** en naviguant dans le pack Dinos (molette dans une famille, allers-retours sans entrer dans une fiche), « erreur carte SD » au bout d'un moment ; **(B)** dans certaines histoires du soir (pack Dodo), ~10-15 s d'audio dégradé puis la lecture reprend et se termine.
- **Audit côté packs** (zips maîtres `~/.studio/library/`, scripts `c:/tmp/lunii-audit-2026-08-19/`) : les **177 MP3** (152 dinos + 25 dodo) décodés intégralement (`ffmpeg -xerror`) → **0 erreur** ; tous **44100 Hz mono ~128 kbps** conformes ; **graphes story.json sains** sur les 2 packs (pattern validé `Cover(wheel) → Famille/Étiquette(wheel) → Récit(autoplay)`, 0 transition pendante, 0 piège #100, 0 BUG-5 en menu multi-options). ⚠️ un check naïf « menu wheel → option sans wheel » faussement positif sur les transitions OK à 1 option (Nom→Fiche) — le vrai BUG-5 ne concerne que les actions **multi-options**.
- **Conclusion** : la source est saine → suspicion **device-side**. Scénario « au bout d'un moment » + « 10-15 s puis ça reprend » = lecture SD qui échoue/rame puis réussit, typique d'un **média marginal**, pas d'un fichier corrompu à la source (qui faillirait toujours au même endroit). Causes candidates par ordre : corruption FAT32 / fichiers du pack **sur la boîte** (historique chargé : transferts interrompus, orphelins `.pi` BUG-4 + orphelin inversé 2026-08-02, remontages brusques = dirty bit) · usure flash de la micro-SD d'origine · batterie faible (chute de tension lecture+ampli → erreur de lecture).
- **Discriminants à demander à PY** : l'erreur SD arrive-t-elle **toujours sur le même dino/famille** ? le glitch **toujours au même moment de la même histoire** ? (déterministe → fichier endommagé sur la boîte → re-transfert ciblé suffit ; aléatoire → FS/flash → formatage).
- **Protocole proposé** (boîte branchée, STUdio + Luniistore fermés) : 1) « Analyser et réparer » / chkdsk sur le lecteur (sûr, cf. § Ops) ; 2) cohérence `.pi`/`.content` (`studio-ctl.ps1 packs` + comparaison taille `.pi`/16 vs dossiers) ; 3) refresh backup Lunii.PACKS si besoin ; 4) si erreurs chkdsk ou récidive → **formatage FAT32 complet + resync total** `sync-lunii.mjs` (packs officiels restaurés depuis le backup `.plain.pk` 2026-08-02 ; le formatage FAT32 est aussi le remède officiel Lunii : [support.lunii.com](https://support.lunii.com/hc/fr/articles/4406176774929)) ; 5) si récidive après formatage → **remplacement de la micro-SD** (clonage secteur par secteur, cf. [guide AOMEI](https://www.aomei.fr/logiciel-clonage/changer-carte-sd-lunii-0478-gc.html) + [studio issue #63](https://github.com/marian-m12l/studio/issues/63)).
- ⚠️ Le pack Dinos actuellement **sur la boîte** est encore l'ancien (avec récap en flux) — le nouveau (EP-D-30, récap exclu) attend la sync.

### REX 2026-08-23 — session device : FS réparé + refresh complet effectués (RÉSOLU, sous surveillance)

- **chkdsk lecture seule : erreurs FAT32 confirmées** — 1 chaîne d'allocation perdue (512 Ko, débris probable d'un transfert interrompu) + dirty metadata. `chkdsk D: /F` : **réparé** (chaîne convertie en fichier récupéré), re-scan = **« sans trouver de problème »**. Cohérence `.pi`/`.content` re-vérifiée après : 11/11 OK. ⚠️ Git Bash : écrire `chkdsk D: //F` (double slash — MSYS convertit `/F` en chemin `F:\`).
- **Refresh complet effectué** : `sync-lunii.mjs --refresh all` → les **5 packs maison ré-importés** depuis les zips maîtres sains (dinos = **nouvelle version EP-D-30 : récap hors flux + Albertosaure V4** · dodo · voyage · pierre-loup · douce nuit). Les 6 packs `library` (officiels) sont **volontairement ignorés au refresh** — si un glitch apparaît sur l'un d'eux : retrait manuel + `addFromLibrary`.
- **Diagnostic final** : corruption FS confirmée et corrigée + contenu ré-écrit propre = retour à un état connu-bon. Volume SD créé le **14/06/2023** (carte d'origine, 3 ans) → **si récidive des 2 symptômes après ce reset complet : remplacement de la micro-SD** (clonage secteur, protocole § ci-dessus point 5).
- À faire côté PY : re-test avec Max (navigation longue dans les familles + écoute dodo) et rapporter si récidive, en notant si c'est toujours le même endroit.

---

_Créé 2026-06-17 lors de la construction du pack « Les dinos de Max ». Tient le journal des comportements moteur observés. À enrichir à chaque découverte (Papa Yann : « note bien tout ce qu'on voit, qu'on fait, améliorer, évoluer »). Section Ops + BUG-4 ajoutées 2026-06-19 (session infra/debug device)._
