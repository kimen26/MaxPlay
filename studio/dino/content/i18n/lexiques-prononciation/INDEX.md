# 🌍 Lexiques de prononciation dino — multilingue (9 langues)

> Source de vérité de la **prononciation des noms de dinos par langue**, pour la génération audio ElevenLabs (voix native par langue).
> Créé 2026-07-08 (workflow 8 agents linguistes + 2 QA). Couverture : **70 espèces × 9 langues**, toutes à 70/70 — complétion 2026-08-10 (10 espèces ajoutées aux 8 lexiques non-FR, marquées « à relire natif » ; FR déjà complet).
> 🔒 Règle : le texte parlé n'est JAMAIS affiché → on peut déformer la graphie autant qu'il faut pour que ça SONNE juste.

---

## Les 9 langues

| Langue | Fichier | Méthode | Voix TTS cible |
|--------|---------|---------|----------------|
| 🇫🇷 Français | [`fr.md`](fr.md) (gabarit, existant) | respelling FR | narrateur_h FR |
| 🇬🇧 Anglais | [`en.md`](en.md) | respelling EN (accent en CAPS) | Native English |
| 🇧🇷 Portugais BR | [`pt-br.md`](pt-br.md) | respelling PT-BR (-sauro) | Native Brazilian Portuguese |
| 🇪🇸 Espagnol | [`es.md`](es.md) | respelling ES (-saurio) | Native Spanish (Spain) |
| 🇮🇹 Italien | [`it.md`](it.md) | respelling IT (-sauro) | Native Italian |
| 🇸🇦 Arabe | [`ar.md`](ar.md) | écriture native + translit | Native Arabic |
| 🇷🇺 Russe | [`ru.md`](ru.md) | cyrillique + translit (-завр) | Native Russian |
| 🇨🇳 Chinois | [`zh.md`](zh.md) | hanzi + pinyin (龙 = -saure) | Native Mandarin |
| 🇯🇵 Japonais | [`ja.md`](ja.md) | katakana + romaji (サウルス) | Native Japanese |

---

## Deux approches (⚠️ ne pas confondre)

- **Langues latines (EN · PT-BR · ES · IT)** → **respelling phonétique** : on réécrit le nom comme il SONNE pour un natif, syllabé, accent marqué. Ex : Tyrannosaurus → EN `Tie-RAN-oh-SOR-us` · PT `Ti-ra-no-SSAU-ro` · ES `Ti-ra-no-SAU-rio` · IT `Ti-ran-no-SAU-ro`.
- **Langues non-latines (AR · RU · ZH · JA)** → **écriture native + nom établi** (ce que la voix lit) + romanisation de contrôle. Le chinois est **sémantique** (pas une translittération) : Tyrannosaurus = 霸王龙 (bàwánglóng, « dragon roi-tyran »).

---

## Verdict QA (2026-07-08)

- **Couverture** : 70/70 dans les 9 langues (audit 2026-08-10 vs canon 70 espèces de `dinos-data.js`), aucun doublon, format gabarit respecté.
- **Non-latin FIABLE** : ZH **aucun hanzi inventé** (noms de paléontologie chinois réels, distinction dino/翼龙/鱼龙/mammifères correcte) · JA katakana établi (マンモス vernaculaire bien géré) · RU -завр + pièges anticipés (Карнотавр, Мамонт) · AR /p/→ب et /v/→ف respectés dans toute la table.
- **Latin** : respellings crédibles ; réglages mineurs à faire (voir décisions ci-dessous).

---

## 🚦 Décisions à trancher AVANT la régé de masse (validation à l'oreille / natif)

> Ces points sont déjà notés en section « incertitudes » de chaque fichier. Regroupés ici pour un passage unique. La méthode = **preview groupé par langue** (1 MP3 des noms respellés → écoute native → correction) avant les 60 clips.

**Transverses (toutes langues)** — taxons rares, forme peu établie partout : `aenocyon` · `titanis` · `patagotitan` · `quetzalcoatlus` (nahuatl) · `coelodonta` · `paraceratherium` · `megatherium`. → valider avec un locuteur natif.

**Ajouts 2026-08-10 (complétion 60→70, toutes langues non-FR)** — `minmi` · `scutellosaurus` · `corythosaurus` · `maiasaura` · `saurolophus` · `hatzegopteryx` · `edaphosaurus` · `gorgonops` · `lystrosaurus` · `moschops` : graphies posées selon les règles de chaque lexique mais **jamais relues par un natif** → marquées « à relire natif » dans chaque table. À inclure au preview groupé de chaque langue avant toute prod audio.

**🇸🇦 Arabe** : (1) rendu du **/g/ dur** = choix de PAYS selon l'accent de la voix (ج égyptien vs غ) — concerne Giganotosaurus, Gallimimus, Stegosaurus, Iguanodon, Glyptodon, Amargasaurus, Patagotitan, Megatherium. (2) `th` → ت (/t/, défaut) vs ث (/θ/). (3) suffixe -saurus rendu ـصور — confirmer que la voix ne coupe pas le S.

**🇨🇳 Chinois** : science vs grand public — `伶盗龙`/`迅猛龙` (Velociraptor), `迷惑龙`/`雷龙` (Apatosaurus). Choisir la ligne éditoriale (recommandé : science, cohérent avec l'encyclopédie = vrai).

**🇪🇸 Espagnol** : `Mammuthus` → forme populaire **Mamut** (plus naturelle enfant) vs latine ? · `c`+e/i = /θ/ Espagne (assumé).

**🇧🇷 Portugais** : garder `-us` latin vs porter en `-o` (Diplódoco) ? · doublage `ss` à valider à l'oreille (parfois sur-appliqué).

**🇬🇧 Anglais** : corriger la formulation de la règle §1 (contredit la table — la table fait foi) · `therizinosaurus` défaut = `theh-RIZ-ih-noh-` (forme dominante).

---

## Prochaine étape (reset budget EL = 2026-07-11)

1. Régé propre des **60 noms FR respellés** (lexique gabarit) — réglages validés preview `_preview-noms-respell.mp3`.
2. Par langue : **preview groupé** → validation native → régé des 60 clips `audio/dinos/<lang>/<id>-nom.mp3`.
3. Priorité langues : FR (base) → EN + PT-BR (actées) → ES · IT · RU · JA → AR · ZH (validation native la plus critique).

_Produit par workflow `lexiques-prononciation-dino-multilingue` (8 linguistes + 2 QA, 60 espèces initiales). Complété 2026-08-10 : 60→70 espèces (canon `dinos-data.js`), 10 entrées ajoutées par langue non-FR, marquées « à relire natif ». Gouvernance : dino-pmo unifié FOND+FORME (fusion 2026-07-19). Plan i18n global : [`../../../../../memory/audio/PLAN-AUDIO-I18N.md`](../../../../memory/audio/PLAN-AUDIO-I18N.md)._
