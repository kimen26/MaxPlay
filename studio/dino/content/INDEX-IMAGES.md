# 🖼️ INDEX IMAGES DINO — carte maîtresse

> **Le réflexe** : tu cherches une image dino (pour un mini-jeu, une fiche, Lunii, une idée) → ce fichier te dit **ce qui existe, où, comment c'est nommé, et comment en refaire**.
> Complétude par dino (qui a quoi) : [`../pmo/_ETAT-DINOS.md`](../pmo/_ETAT-DINOS.md) (généré, jamais à la main).
> Doctrine : les features ne lisent QUE `site/` (jamais `studio/`). Staging `_new-*` = local, gitignoré, jamais référencé par le code.

---

## 🔎 Je cherche… → va là

| Besoin | Collection | Chemin |
|---|---|---|
| **Sprite transparent ingame** (perso de jeu, carte, HUD) | sprites | `site/img/dinos/sprites/<Nom>_sprite.png` (entier profil) · `<Nom>_tete.png` (buste) |
| **Empreinte de pas** (jeu de piste « à qui est cette trace ? ») | traces | `site/img/dinos/traces/<Nom>_trace.png` (pictogramme plat transparent, top 15) |
| **Grande scène réaliste** (hero fiche, fond, illustration) | paleoart | `site/img/dinos/paleoart/<Nom>.jpg` (hero) + 5 scènes (voir nommage) |
| **Coloriage à imprimer** | paleoart | `site/img/dinos/paleoart/<Nom>_coloriage.webp` |
| **Silhouette / ombre chinoise** (vignette, quiz "qui est-ce ?") | ombres | `site/img/dinos/ombres/<Nom>_ombre.png` (noir sur transparent) |
| **Galerie variée d'un dino** (poses, angles) | grok + wiki | via `site/js/dinos-images-grok.js` / `dinos-images-local.js` (générés) |
| **Emblème famille / images conteuse** (fond noir, 16 gris) | lunii | `studio/dino/content/lunii/` (familles/ · voyage/ · `_sources-hd/`) |
| **Idées / matière brute** | staging | `site/img/dinos/_new-xxl/` (local) — tout ce qui a été généré, y compris non retenu |

**Convention `<Nom>`** : id dino Capitalisé = clé `png` de `site/js/dinos-data.js` sans extension (ex. `Tyrannosaurus`, `Smilodon`). Toujours résoudre depuis dinos-data.js, jamais deviner.

---

## 📦 Collections DÉPLOYÉES (`site/img/dinos/`, lues par le produit)

### paleoart/ — le cœur (fiche dino)
- **Contenu** : par dino, 7 assets : `<Nom>.jpg` (hero) · `_headshot` · `_manger` · `_ecosysteme` · `_paris` (échelle bus RATP) · `_funfact` (.jpg) · `_coloriage.webp`. Cas spécial : `Amargasaurus_hypothese-piques/voile.jpg` (2 planches incertitude scientifique).
- **Consommé par** : `site/dev-dinos.html` (galerie fiche, pellicule, sections).
- **Régénérer** : skill `dino-paleoart` (ChatGPT projet Dinosaure via Brave ; Grok plan B). Batch série = `batch-dino-series.mjs` (5 scènes, table MORPHO en tête) · ciblé = `gpt-gen-dino.mjs`. Coloriage = `batch-dino-coloriage.mjs` → webp.
- **Règles** : MORPHO obligatoire pour dino que le modèle rate (leçons L-D-38..42) · échelle _paris chiffrée au ratio bus · zéro texte incrusté (sauf repère "1m") · validation visuelle avant rangement.

### ombres/ — silhouettes noires
- **Contenu** : `<Nom>_ombre.png`, noir plein sur fond transparent.
- **Consommé par** : vignettes rondes (grilles familles/régimes/chrono/dico, inversées blanc en CSS) + fallback hero.
- **Régénérer** : dérivées du paleoart (seuil + alpha). ⚠️ 3 zones silhouettes coexistent — STOP fusion, voir `assets/silhouettes/_STOP-3-ZONES.md`.

### sprites/ — détourés transparents ingame (2026-07-18)
- **Contenu** : top 15 dinos × 2 : `<Nom>_sprite.png` (entier profil) + `<Nom>_tete.png` (buste ¾). PNG alpha, max 800 px, quantizés.
- **Consommé par** : rien encore — réserve pour mini-jeux dino.
- **Régénérer** : générer sur **fond gris uni** (prompts sprite dans les scripts de scratch/skill) → détourer : `python studio/dino/content/scripts/images-grok/detoure_sprite.py <in> <out.png> [tol=45]` (flood-fill bords + color-key global + anti-alias). Museau/pelage très clair → baisser tol à ~26. Toujours valider sur damier.

### traces/ — empreintes pictogramme (2026-07-18)
- **Contenu** : top 15 dinos, `<Nom>_trace.png` = empreinte de pas stylisée (icône plate 1 couleur, transparente). Pied typé (théropode griffu / raptor 2 doigts / sauropode rond / sabot / félin / nageoire mosasaure).
- **Consommé par** : rien encore — réserve pour un jeu « à qui est cette trace ? ».
- **Régénérer** : Grok fond uni (prompt pied par type) → `detoure_sprite.py` → optimiser (64c). Remplace l'ancien `paws/` (photos scrapées, purgé).

### grok/ + wiki/ — galeries fiche
- **Contenu** : grok/ = images IA filtrées (revue agents) · wiki/ = Wikimedia CC (crédits conservés).
- **Consommé par** : `dinos-images-grok.js` / `dinos-images-local.js` (**générés** par `content/scripts/export/`, ne jamais éditer à la main).
- **Statut** : gelées — on n'ajoute plus, le paleoart a pris le relais.

---

## 🏭 Collections AUTORING (`studio/dino/content/`, non déployées)

| Collection | Rôle | Pointeur |
|---|---|---|
| `lunii/` | Emblèmes familles + images voyage pour la conteuse (fond noir natif, BMP 16 gris in fine) | [`lunii/INDEX.md`](lunii/INDEX.md) · skill `dino-images-lunii` |
| `assets/silhouettes/` | Silhouettes côté autoring | [`assets/silhouettes/_INDEX.md`](assets/silhouettes/_INDEX.md) (⚠️ `_STOP-3-ZONES.md`) |
| `sources/images/` | Sources/notes images · `refs-echelle/` (photos réf. enfant vs dino) · `_grok-test/` (finaux seuls) · `_paleoart-prod-notes/` (tracker prod) | dossier |
| `sources/megafaune/_refs-visuelles/` | ~30 réfs visuelles mégafaune Cénozoïque (mammouth, smilodon…) — matière prompts/fact-check | dossier |
| `scripts/images-grok/` | Outils : `detoure_sprite.py`, scripts Grok | dossier |

---

## 🗃️ STAGING local (gitignoré, jamais référencé par le code)

`_new-xxl/` (sorties brutes paleoart, y c. non retenues — mine d'idées) · `_new-sprites/` (bruts sprites + `_cut`) · `_new-headshots/` · `_new-ombre/` · `_new-coloriage/` · `_new-traces/` (bruts traces, générés 2026-07-18 avec la collection `traces/`).
**Cycle** : générer → juger visuellement → convertir/ranger dans la collection PROD → le staging reste comme historique local. Purgeable si besoin de place (regénérable).

---

---

_Créé 2026-07-18 (session sprites). Toute nouvelle collection d'images → ajouter une section ici + pointer depuis `content/INDEX.md`. Counts par dino : voir `_ETAT-DINOS.md` (généré) — pas de chiffres en dur ici (DEC-GED-001)._
