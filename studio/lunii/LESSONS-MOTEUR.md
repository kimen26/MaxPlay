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

_Créé 2026-06-17 lors de la construction du pack « Les dinos de Max ». Tient le journal des comportements moteur observés. À enrichir à chaque découverte (Papa Yann : « note bien tout ce qu'on voit, qu'on fait, améliorer, évoluer »)._
