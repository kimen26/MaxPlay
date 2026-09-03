---
name: lunii-pack-builder
description: "Construire des packs d'histoires pour la boîte Lunii (conteuse) via STUdio — format story.json v1, navigation molette/menus, controlSettings (wheel/ok/home/pause/autoplay), enchaînement autoplay, format binaire FS (ni/li/ri/si), conversion audio/image, et pièges moteur. Auto-trigger sur lunii, STUdio story pack, conteuse, build pack lunii, story.json, controlSettings, autoplay node, menu molette lunii, transfert lunii, .content boîte, pack histoires enfant."
---

# 🎒 Lunii Pack Builder — paramétrage & format

> Mémoire technique pour **construire des packs Lunii** (boîte à histoires) fiables, par script,
> sans passer par l'éditeur souris de STUdio. Couvre le format, les controlSettings, le moteur,
> et les pièges vérifiés sur la **vraie boîte** (Lunii v2) + le **simulateur** STUdio.
>
> Contexte projet MaxPlay : pôle [`studio/lunii/`](../../../ProjetsPerso/Claude_Projects/MaxPlay/studio/lunii/) — journal vivant dans `studio/lunii/LESSONS-MOTEUR.md`.

---

## 1. Deux formats, deux mondes

| | Format | Qui le lit | Vérité ? |
|---|--------|-----------|----------|
| **Archive** (`.zip`) | `story.json` v1 + `assets/` (sha1) + `thumbnail.png` | éditeur web + reader Java | format d'échange |
| **FS** (dossier `<UUID8>/`) | binaire `ni li ri si` + `rf/ sf/ bt` | **moteur de la boîte** | ⭐ vérité moteur |

STUdio convertit Archive → FS au **transfert** vers la boîte. La boîte ne lit QUE le FS.
- `ni` = node index (stages) · `li` = action list · `ri` = ref images · `si` = ref sons · `rf/`,`sf/` = assets · `bt` = boot.

### Décoder le `ni` (node index) — structure vérifiée (Lunii v2, firmware 2.22)
Header **512 octets**, puis N nodes de **44 octets** (little-endian) :
```
offset  champ
 0  int32  imageAssetIndex   (-1 = pas d'image)
 4  int32  audioAssetIndex   (-1 = pas d'audio)
 8  int32  okActionIndex     (index dans li, -1 = aucun)
12  int32  okOptionsCount
16  int32  okSelectedOption
20  int32  homeActionIndex   (-1 = aucun)
24  int32  homeOptionsCount
28  int32  homeSelectedOption
32  int16  wheel  (0/1)
34  int16  ok     (0/1)
36  int16  home   (0/1)
38  int16  pause  (0/1)
40  int16  autoplay (0/1)
```
Script de dump : voir `reference/decode-ni.cjs`. Header[0..7] observé = `01 00 01 00 00 02 00 00` (version + flags).

---

## 2. story.json v1 — règles dures

- `format:"v1"`, `title`, `description`, `version:1`, `nightModeAvailable`, `stageNodes[]`, `actionNodes[]`.
- **stageNode** = `{ uuid, squareOne?, image, audio, okTransition, homeTransition, controlSettings }`. **Pas de `name`** (STUdio ne le sérialise pas).
- **actionNode** = `{ id, options[] }`. `id` **DOIT être un UUID** (sinon « Failed to load story pack » dans l'éditeur web ; la boîte/reader Java tolèrent le texte). → générer UUID déterministe (sha1).
- `okTransition` / `homeTransition` = `{ actionNode:<uuid>, optionIndex:<n> }` ou `null`.
- 1 seul `squareOne:true` (le point d'entrée).
- Chaque stage = **1 image + 1 audio non-null** (stage muet/sans image gêne l'éditeur).

### Validation SANS la boîte (réflexe avant tout transfert)
1. **Reader Java** : `ArchiveStoryPackReader.read(zip)` ne jette pas → l'éditeur l'ouvre.
   cp = `studio-web-ui-*/lib/*.jar`. Voir `reference/TestPack.java`.
2. **Graphe** (node) : 0 transition/option pendante, UUID valides, 1 squareOne, pas de menu vide.

---

## 3. controlSettings — LE point critique

`{ wheel, ok, home, pause, autoplay }` (booléens). Sens :
- **wheel** : la molette parcourt les options de l'`okTransition` (= un MENU).
- **ok** : le bouton OK est actif (déclenche l'okTransition).
- **home** : le bouton maison est actif (déclenche l'homeTransition).
- **pause** : bouton pause actif.
- **autoplay** : à la **fin de l'audio**, déclenche automatiquement l'okTransition.

### 🚨 RÈGLE D'OR (cause de bug réelle, vérifiée 2026-06-17)
> **Un node `autoplay:true` DOIT avoir `ok:true`.**
> Sinon l'okTransition de fin est **ignorée** → l'audio **reboucle** et l'**image reste figée**.
> (Symétrique du piège issue #100 : `controlSettings.X:false` + `XTransition` non-null = incohérent.)
> Confirmé : les packs Lunii **officiels** ont `ok=1, autoplay=1` sur leurs nodes histoire.

### ⚠️ Règle issue #100
> Si `controlSettings.home:false` → `homeTransition` DOIT être `null` (et idem pour `ok`).
> Un port à false + une transition non-null = crash « Cannot read property link of undefined ».

### Recettes de controlSettings par type de node
| Type de node | wheel | ok | home | pause | autoplay | okTransition | homeTransition |
|---|---|---|---|---|---|---|---|
| **Cover/menu** (point d'entrée, molette) | 1 | 1 | 1 | 0 | 0 | → action menu (N options) | null |
| **Cover/menu fusionné** (squareOne + wheel, pas de double-OK) | 1 | 1 | 1 | 0 | 0 | → action menu (N options) | null |
| **Sous-menu / Étiquette** (molette) | **1** | 1 | 1 | 0 | 0 | → action (1 option = récit) | null |
| **Histoire qui s'arrête** (retour menu) | 0 | **1** | 1 | 1 | **1** | → action retour menu | null |
| **Histoire qui enchaîne** (série) | 0 | **1** | 1 | 1 | **1** | → **histoire suivante** | null |

**⚠️ Règle cruciale (BUG-5, 2026-06-28)** : Les options d'un menu molette (`wheel:true`) doivent pointer vers des stages **aussi avec `wheel:true`** (étiquettes/sous-menus), jamais vers des récits `autoplay:true`. Sinon le moteur lance le récit dès que la molette pointe dessus, sans attendre OK.

---

## 4. Patterns de navigation

### Menu molette à 1 niveau (Cover/Menu fusionné — recommandé)
Fusionner Cover ET menu en UN stage `squareOne+wheel`. La molette parcourt les N options, OK entre dans l'époque sélectionnée. Pas de double-OK ressenti.
`Cover(wheel,ok,home) --ok--> actionMenu[opt1..optN]` ; chaque option = un stage. La molette tourne dans les N, OK entre.

**Anti double-OK** : ne PAS faire Cover(OK) → Menu(wheel). Faire Cover=Menu(wheel) directement.

### Menu à 2 niveaux (familles → items)
`Cover/menu familles (wheel) --ok--> action[fam1..famN]` → chaque `fam` est un stage `(wheel)` qui `--ok--> action[item1..itemM]` → chaque item.
- **Anti double-OK** : fusionner Cover ET menu de niveau 1 en UN stage `squareOne+wheel`. Sinon Cover(1 OK) + Menu(1 OK) = double-OK ressenti.
- Filtrer les **familles vides** (ne pas lister un sous-menu à 0 option).

### Série chronologique (enchaînement auto)
Récit i : `autoplay:true, ok:true`, `okTransition → récit i+1`. Le **dernier** : `okTransition → menu`.
→ Lancer le 1er enchaîne toute la série, sortie au menu à la fin. (Ex : Trias→Jurassique→…→sortie.)

### Étiquette molette vs contenu (imagier sonore)
Pour « la molette dit le nom, OK lance la fiche » : 2 stages par item —
(a) stage "nom" `(wheel,ok)` audio=nom court, `--ok--> fiche` ; (b) stage "fiche" `(autoplay,ok)` audio=contenu, `--ok--> retour sous-menu`.

**⚠️ Règle cruciale (BUG-5, 2026-06-28)** : Les options d'un menu molette (`wheel:true`) doivent pointer vers des stages **aussi avec `wheel:true`** (étiquettes/sous-menus), jamais vers des récits `autoplay:true`. Sinon le moteur lance le récit dès que la molette pointe dessus, sans attendre OK. Le pattern correct est : `Cover(wheel) → Étiquette(wheel) → Récit(autoplay) → Retour cover`.

---

## 5. Audio

- Format : **MP3/OGG 44100 Hz** (les MP3 ElevenLabs passent). Loudnorm en post (`ffmpeg -af loudnorm`).
- **Silence de tête +300 ms minimum** (`adelay=300|300`) : le moteur rogne le tout début → 1ʳᵉ syllabe coupée sinon (surtout consonnes Th-/S-/C-). Voir `reference/pad-head.cjs`.
- **Pad 300ms + loudnorm combiné** : `ffmpeg -af "adelay=300|300,loudnorm"` (ordre important : pad d'abord, loudnorm après).
- Accroches/noms courts = 1-2 s. Récit d'époque ~10-25 s.
- Tags v3 ElevenLabs (`[excited]`…) nécessitent `model_id:"eleven_v3"`. Réglage accroche énergique validé MaxPlay : `[excited]` stability 0.4 / style 0.35 / similarity 0.8 / narrateur_h.

## 6. Image

- **320×240 px exactement**, **PAS d'alpha** (BMP final). PNG/JPEG/BMP24 en entrée.
- Boîte affiche en **16 niveaux de gris** (BMP RLE4) → concevoir en **gris contrasté**.
- **Fond sombre/noir = meilleur contraste** sur l'écran Lunii (l'écran est derrière le plastique). Les emblèmes MaxPlay sont conçus fond foncé, sujet clair.
- Conversion sûre : `scale=320:240:force_original_aspect_ratio=decrease,pad=320:240:(ow-iw)/2:(oh-ih)/2:black,format=rgb24` (pad **noir**, pas blanc, pour rester cohérent fond sombre).

---

## 7. Transfert & boîte

- **Luniistore FERMÉ** pendant STUdio (conflit pilote USB). Règle absolue.
- **STUdio (backend java, port 8080) FERMÉ avant toute écriture directe sur la SD** — sinon l'écriture échoue (« Un périphérique qui n'existe pas a été spécifié »). Même logique que Luniistore.
- Boîte montée comme disque (ex `D:`) → packs dans `D:\.content\<UUID8>\` (8 derniers hex de l'UUID, MAJ).
- **Index `.pi`** (racine SD, caché) = liste des packs = UUID 16 octets concaténés (`taille/16` = nb packs). 🚨 Un demi-transfert qui ajoute un UUID à `.pi` SANS écrire son dossier `.content/` → entrée **orpheline** → STUdio « **Failed to fetch packs from device** ». **NE JAMAIS éditer `.pi` à la main pour « ajouter » un pack** ; toujours transférer via STUdio. Réparation d'un `.pi` orphelin (backup → tronquer → relancer STUdio) : voir REX **BUG-4** dans `studio/lunii/LESSONS-MOTEUR.md`.
- UUIDs **figés** dans les scripts → un rebuild ne crée pas de doublon.
- Lunii v2 = pas de WiFi = terrain sûr (pas de piège firmware 3.x / `wifi.pref`).
- Test de vérité = **la vraie boîte** avec l'enfant. Le simulateur STUdio a ses propres règles (ex : exige `options.autoplay` dérivé du modèle enrichi pour enchaîner — un comportement OK boîte peut buguer en simu et inversement).

### Ops STUdio (lancer / arrêter / diagnostiquer) — REX 2026-06-19
- **Lancer STUdio de façon fiable** : le `.bat` officiel peut échouer (`java` pas sur le PATH système ; `copy` qui prompte). → lancer **java en chemin absolu** (`...\Eclipse Adoptium\jdk-17.x\bin\java.exe -cp "<studio>.jar;<studio>/lib/*;." io.vertx.core.Launcher run studio.webui.MainVerticle`, cwd = dossier STUdio). Helper projet MaxPlay : `studio/lunii/scripts/studio-ctl.ps1` (`start|stop|status|packs`).
- **Vérifier la lecture du device sans l'UI** : `GET http://localhost:8080/api/device/packs` (liste les packs de la boîte) et `/api/device/infos`. Si `packs` renvoie la liste → device sain.
- **Écrire directement sur la SD** (réparer `.pi`, etc.) : **arrêter STUdio d'abord** (il tient le lecteur, sinon « Un périphérique qui n'existe pas a été spécifié »). Après un remontage brusque, Windows propose « Analyser et réparer » le lecteur FAT32 → **sûr et recommandé** (chkdsk ne touche pas le contenu des packs), STUdio fermé pour éviter un redémarrage. Détail : `studio/lunii/LESSONS-MOTEUR.md` § Ops + BUG-4.

---

## 8. Protocole de build (checklist)
1. Préparer assets (audio **pad 300ms + loudnorm**, images 320×240 gris fond sombre).
2. Générer `story.json` (UUID actions, controlSettings selon §3, transitions selon §4).
3. Valider : reader Java + graphe (§2).
4. Zip (`jar -cfM`, entrées avec `/`) → déposer dans `~/.studio/library/`.
5. STUdio → Virtual Lunii (1re passe) → **vraie boîte** (juge final).
6. Noter toute découverte moteur dans `studio/lunii/LESSONS-MOTEUR.md`.

---

## Références
- `reference/decode-ni.cjs` — dump du node index binaire.
- `reference/TestPack.java` — validation via le reader officiel STUdio.
- `reference/pad-head.cjs` — ajout de silence de tête audio.
- Doc officielle : [README STUdio fr](https://github.com/marian-m12l/studio/blob/master/README_fr.md) · [Wiki](https://github.com/marian-m12l/studio/wiki) · [issue #100 (port/transition incohérents)](https://github.com/marian-m12l/studio/issues/100) · [Lunii.QT (o-daneel)](https://github.com/o-daneel/Lunii.QT).

---

_Créé 2026-06-17 (MaxPlay, packs « voyage des dinosaures » + « dinos de Max »). Format ni reverse-engineeré depuis la boîte v2 de Max + diff avec packs officiels. Règle d'or autoplay→ok:true = cause d'un bug réel résolu ce jour._
