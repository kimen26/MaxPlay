# Pôle LUNII — distribution des histoires sur la boîte à histoires de Max

> Canal de **distribution physique** : pousser les histoires MaxPlay (narration + récits
> dino) sur la Lunii de Max via STUdio. Ce pôle ne crée pas de contenu — il emballe et
> transfère ce que produisent les pôles NARRATION et DINO.
>
> 📋 **Règles d'or + pourquoi pas de PMO** → [`CLAUDE.md`](CLAUDE.md) (auto-chargé). Ce
> README = la doc détaillée (install, pipeline, pièges) + l'INDEX du pôle.

---

## Ce qui est installé sur la machine (2026-06-12)

| Quoi | Où | Note |
|------|-----|------|
| **STUdio 0.4.2** (community, marian-m12l) | `C:\ProjetsPerso\Tools\studio-lunii\studio-web-ui-0.4.2\` | Dernière release (2025-09-21) |
| **Java JDK Temurin 17** | `C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot\` | Prérequis STUdio (JDK 11+), installé via winget |
| **Luniistore officiel** | `C:\Program Files\Luniistore` | Déjà présent — fournit le **pilote libusb0** (vérifié installé) |
| Bibliothèque locale STUdio | `%UserProfile%\.studio\library\` | Les packs créés vivent ici (pas dans le repo git) |

**Lancer STUdio** : exécuter `C:\ProjetsPerso\Tools\studio-lunii\studio-web-ui-0.4.2\studio-windows.bat`
puis ouvrir http://localhost:8080 si le navigateur ne s'ouvre pas seul.

⚠️ **Ne jamais lancer Luniistore et STUdio en même temps** (conflit sur le pilote USB).

---

## Pipeline histoire MaxPlay → Lunii

```
1. SOURCE   Histoire canon (studio/narration/stories/NNN-*/): MP3 ElevenLabs 44.1kHz ✅
            ou récit dino (site/audio/dinos/*.mp3) ✅ — déjà au bon format
2. COVER    Image 320x240 (PNG/JPEG/BMP 24-bits) — couleurs simples, l'écran est
            derrière le plastique du boîtier
3. PACK     Éditeur STUdio (localhost:8080) :
            - Cover Node  = titre + image + son d'annonce
            - Menu Node   = choix (ex. « quelle histoire ? » molette Lunii)
            - Story Node  = le MP3 de l'histoire, retour auto à l'accueil
            Règle moteur : Stage Node → Action Node → Stage Node (jamais 2 du même type)
4. TEST     « Virtual Lunii » intégré à l'éditeur — écouter/naviguer avant transfert
5. TRANSFERT Brancher la Lunii en USB (Luniistore FERMÉ) → panneau gauche apparaît
            → glisser-déposer le pack vers l'appareil. Conversion de format automatique.
```

### Contraintes média (gravées, source README officiel STUdio)

- **Audio** : MP3 ou OGG **44100 Hz** (nos MP3 ElevenLabs sont OK), ou WAV mono 16-bits 32000 Hz. Normaliser le pic à 0 dB.
- **Images** : **320x240 exactement**, PNG/JPEG/BMP 24-bits.

---

## Pièges connus (deep search 2026-06-12)

1. **Lunii v3 + firmware récent** : le support v3 dans STUdio est **communautaire et peu
   testé**. Le firmware **3.2.2 a bloqué les outils tiers** — il faut la dernière version
   de STUdio (sur 3.1.5 ça passait déjà). Garder des sauvegardes des packs, être prêt à
   réinitialiser la boîte en cas de pépin.
2. **Lunii v3 + WiFi** : à la connexion WiFi, la Lunii peut **écraser les histoires
   ajoutées manuellement**. Parade communautaire : supprimer le fichier `wifi.pref` sur
   l'appareil.
3. **Formats par firmware** : `Brut` = v1.x (USB bas niveau) · `FS` = v2.x (stockage
   amovible) · `Archive` = format éditeur STUdio uniquement. La conversion est
   automatique au transfert.
4. **Alternatives si STUdio coince avec une v3** : `lunii-qt` (qt-manager) ou
   `lunii-admin` (outils communautaires plus récents sur le support v3).

**→ À vérifier : quelle version est la Lunii de Max (v1/v2/v3) ?** Indice : la v3 a le
WiFi. La version conditionne le risque (v1/v2 = très fiable, v3 = prudence).

---

## Packs construits

| Pack | Script | Contenu | Statut |
|------|--------|---------|--------|
| **Tritri le Tricératops** (2026-06-12) | [`scripts/build-tritri-pack.mjs`](scripts/build-tritri-pack.mjs) | Cover (image+nom) → récit 5 blocs concat+loudnorm (≈4 min) | En bibliothèque locale, à transférer |

La Lunii de Max est une **v2** (confirmé 2026-06-12) — terrain sûr.
Les packs ajoutés cohabitent avec les histoires achetées et les enregistrements micro de
l'appli : ils apparaissent comme des packs supplémentaires sur la molette, rien n'est écrasé.

Les zips de packs vivent dans `%UserProfile%\.studio\library\` (PAS dans le repo git —
seuls les scripts de build, rejouables, sont versionnés). UUIDs figés dans les scripts
pour que les rebuilds ne créent pas de doublons.

## Idées de prochains packs

- **Pack « Histoires de Wex »** : menu → 001 Le pont cassé · 002 La libellule (audio canon déjà produits)
- **Pack « Dinos de Max »** : menu par dino (molette = choisir son dino) → récit audio de
  la fiche, autres familles après Tritri

## Sources

- [README officiel STUdio (fr)](https://github.com/marian-m12l/studio/blob/master/README_fr.md)
- [Wiki STUdio — Documentation](https://github.com/marian-m12l/studio/wiki/Documentation)
- [Release 0.4.2](https://github.com/marian-m12l/studio/releases/tag/0.4.2)
- [Issue #471 — Lunii v3 importation](https://github.com/marian-m12l/studio/issues/471)
- [Planète Warez — installer/changer les histoires + astuce wifi.pref](https://planete-warez.net/topic/6305/lunii-installer-et-changer-les-histoires-sur-une-lunii-conteuse-d-histoires)
- [S3curity.info — firmware v3.2.2 bloqué puis résolu](https://s3curity.info/wp/lunii-v3-2-2-probleme-resolu/)
