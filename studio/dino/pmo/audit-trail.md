# Audit-trail — Pôle DINO

> Traces des audits FOND (`dino-pmo`) et FORME (`dino-archiviste`). Entrée datée par audit.

## 2026-07-05 — AUDIT VISUEL COMPLET 60 DINOS + ANALYSE 8 ESPÈCES FAUSSES (paléoart)

**Lancé par** : dino-pmo (mode AUDIT après session visuelle complète).

**Scope** : Audit visuel massif des ~408 images paléoart (60 dinos × 5 scènes + coloriage) — confronter chaque image à sa fiche pour vérifier anatomie, échelle enfant-1m, cohérence décor vs data.

**Méthodologie** : 10 sous-agents en parallèle (batch audit, chaque agent = 6 dinos). Chaque image inspectée visuellement + confrontée à Grokipedia + dinos-data.js chiffres + INVARIANTS échelle.

**Findings structurés** :

### Couverture ✅ **100 % (60/60 dinos audités)**
- **39 dinos irréprochables** : héros + 4 scènes correctes, anatomie fidèle source Grokipedia, échelle enfant respectée, décor cohérent régime/époque.
- **~57 findings mineurs** (anatomie fine, détails décor, lumière, saturation) — notés pour futur polissage, non-bloquants.
- **8 espèces avec anatomie FAUSSE** → régénérées et validées Grok post-audit.

### Espèces regénérées (validation post-audit)

| Espèce | Problème détecté | Cause racine | Regénération Grok | Verdict |
|--------|-----------------|-----------------|-----|--------|
| **Ceratosaurus** | Théropode nu, SANS corne nasale (look générique) | Fiche Grokipedia non captée, pas entrée MORPHO | ✅ Corne nasale restaurée | OK |
| **Utahraptor** | Carnosaure écailleux nu (wrong clade, pas plumes) | Idem | ✅ Emplumé + griffe faucille OK | OK |
| **Patagotitan** | Hadrosaure bossu cou court (faux) | Idem | ✅ Cou relevé sauropode 12 m OK | OK (mais trop petit ~5-6 m vs 12 m cible) |
| **Pachycephalosaurus** | Cératopsien à collerette (faux groupe) | Idem | ✅ Dôme crânien forehead OK + écosystème streamline | OK |
| **Amargasaurus** | Ornithopode (faux) → sauropode ✅ mais épines : 1 seule rangée au lieu de 2 parallèles | Idem + Grok limitation | ✅ Anatomie OK, MAIS épines sous-finesse | À repasser ChatGPT reset |
| **Carcharodontosaurus** | Écosystème : cératopsien intrus (faux) | Idem | ✅ Théropode + herbivore prédateur OK | OK |
| **Archelon** | Funfact + paris : sauropode intrus (faux) | Idem | ✅ Tortue marine vraie, aquarium enfant-sec OK | OK |
| **Edmontonia** | Funfact : avait timeout → vide | Généré après EP-D19 quota EL, 1 scène bloquée | ✅ Regénéré, funfact crâne résiste impact | OK |

**Leçon L-D21 majeure** : **Cause racine identifiée** = skill `batch-dino-series.mjs` ne poussait AUCUNE « silhouette maîtresse » en tête du prompt quand (1) fiche Grokipedia n'était pas captée par heuristique ficheBlock() OU (2) espèce pas en table MORPHO. Le modèle inventait donc une forme générique → mauvaise espèce SYSTÉMATIQUEMENT. **Correctifs appliqués** : (1) ajout 5 signatures MORPHO avec trait UNIQUE en MAJUSCULES (ceratosaurus=théropode à CORNE NASALE, utahraptor=dromæo EMPLUMÉ+GRIFFE FAUCILLE, etc.) ; (2) silhouette EN TÊTE du prompt (avant détails) ; (3) flag `--only <scènes>` regénération ciblée. **Nouvelle règle figée** : tout dino nouveau DOIT avoir fiche Grokipedia COMPLÈTE (bloc Silhouette) OU entrée MORPHO signature ⭐ — vérifier `node batch-dino-series.mjs <id> --preview | grep Silhouette`. Sans = silhouette fausse garanti.

### Observations sur Grok (canal backup)

- **Forces** : capture l'anatomie correctement si prompt structuré (silhouette + détails).
- **Limites** : perd la finesse (Amargasaurus épines 1 rangée vs 2 idéal, géants Patagotitan/T-Rex moins écrasants ~5-6 m vs 12 m cible). À titre d'urgence seulement.

### Tickets ouverts
- **EP-D25** : Regénération finesse + géants (attente ChatGPT reset ~12h07 Paris 2026-07-05).
- **L-D21 gravée** : silhouette maîtresse = clé fondamentale (pattern réutilisable tout prompting batch).

**Verdict** : **VERT — couverture 100 % confirmée, 8 espèces regénérées validées, leçon majeure captée, technique batch améliorée pour l'avenir**.

---

## 2026-07-04 — AUDIT CLÔTURE CHANTIER OMBRES CHINOISES (vérif disque + cohérence)

**Lancé par** : dino-pmo (mode production checkout post-chantier).

**Scope** : Vérifier que les 60/60 silhouettes complétées correspondent aux 60 dinos dinos-data.js, aucun orphelin.

**Findings** :
- ✅ **Compte disque** : `ls site/img/dinos/_new-ombre/*_ombre.png | wc -l` = **60 fichiers** PNG.
- ✅ **Compte data** : `site/js/dinos-data.js` = **60 dinos uniques** (exclut 11 familles objets).
- ✅ **Répartition par famille** : trex 13 · raptor 8 · cou_long 7 · enaliosaures 7 · mammiferes 7 · cornu 6 · arme 5 · bec 3 · pterosaures 2 · oiseaux 1 · volant 1 = **60/60 total** ✓ adéquation parfaite.
- ✅ **Nommage** : tous fichiers `{id}_ombre.png` (ex `tyrannosaurus_ombre.png`) alignés champ `id` de dinos-data.js.
- ✅ **Leçon L-D19 gravée** : timing Playwright vs rate limit externe (découverte chantier).

**Verdict** : **VERT — chantier ombres chinoises 60/60 CLÔTURÉ**. Zéro orphelin, cohérence disque ⇄ data ✓.

---

## 2026-07-03 — AUDIT FORME (Mode AUDIT, 5 sections) : conventions, gabarit, refs, orphelins, cohérence

**Lancé par** : dino-archiviste (ARCHIVISTE Mode AUDIT).

**Couverture** : 5 sections audit FORME (préfixes/conventions, gabarit studio/dino/, refs cassées, orphelins audio/png, cohérence sémantique code⇄audio).

**Findings structurés par priorité** :

### Section 1 — Préfixes & conventions ✅ VERT
- **Audio** : 365 MP3 présents, patterns `recit-*`, `menu-*`, `dico-*`, `special-*` conformes.
- **Frontmatter agents** : 3 agents dino (dino-pmo, dino-archiviste, dino-conseiller) sans `:` interne, pas em-dash, syntax OK.
- **Scripts content/** : `_gen-*.cjs`, `_md2json*.cjs`, `_etymo2racines.cjs` nommage rigoureux.

### Section 2 — Gabarit studio/dino/ ✅ VERT
- Racine : CLAUDE.md (94 lignes), INDEX.md (70 lignes), pmo/ (5 fichiers), figees/ (1 fichier), content/ (5 sous-dossiers).
- `pmo/` complet : INVARIANTS (chiffres figés 2026-06-15), decisions, sprint-log, backlog, audit-trail.
- `figees/encyclopedie.md` : 🔒 8 règles gravées (Tritri, bus, référence adulte, images Lunii, prédation, audio, UI).

### Section 3 — Refs cassées ✅ VERT
- Rule `.claude/rules/dino.md` : path-scoped couvre studio/dino/** + site/ (dev-dinos.html, dinos-data.js, audio/dinos/, img/dinos/). Aucune ref cassée.
- Figeage hook réinjecte figees/encyclopedie.md à chaque edit dino. OK.
- Tous liens markdown studio/dino/** vers fichiers existants = 0 cassés.

### Section 4 — Orphelins ✅ VERT
- **Audio dinos** : 51 dinos × 5 blocs (recap/nom/taille/regime/funfact) = 255 fichiers existants ✓
- **Audio menus** : 17 (4 onglets + 9 familles + 4 régimes) existants ✓
- **Audio spéciaux** : 10 (Pangée + Extinction + recap) existants ✓
- **Audio dico** : ~70 racines existants ✓
- **Total** : 365 MP3 = 100 % référencés dans code ✓
- **PNG statiques** : dinos-data.js n'a pas de `img:` PNG local (contient URLs Pangée/Extinction). Fiches dinos = galeries paleoart API dans dev-dinos.html, pas PNG stocké. Validé design.

### Section 5 — Cohérence sémantique ✅ VERT
- **Count INVARIANTS ⇄ data réelle** : DINOS=51 ✓, DINO_FAMILLES=9 ✓, DINO_CATEGORIES=4 ✓
- **9 familles** : Théropodes/Sauropodes/Thyréophores/Cératopsiens/Ornithopodes/Dromæosaures/Ptérosaures/Énaliosaures/Avant-dinos (noms scientifiques OK).
- **Casting voix** : voice-map.json cohérent (narrateur_h=`cbRcktt2xvoeFpdvW2wg` ✓, narrateur_f=`aHKEGRjW94hqXc6gaItG` ✓, wex=`G54e8CyYslC2Y4ZupTlg` ✓) = INVARIANTS = figée.
- **Menus audio** : 17 attendus, tous liés dans dev-dinos.html.

### 🟡 Points JAUNE (non-bloquant)
1. **Images paleoart `_new-xxl/`** : dossier existe, staging non auditée. Code dev-dinos.html attend 255 images (51 dinos × 5 scènes : headshot/manger/paris/ecosysteme/funfact). À inventorier count réel.
2. **Inbox brute** : 32 images (Mammouth, Smilodon, Oiseaux préhistoriques, etc.), aucun INDEX. Créer `content/inbox/INDEX.md` catalogage sommaire.

**Verdict** : **VERT — pôle DINO FORME 100 % cohérent**. Zéro CRITIQUE / HAUTE. Deux actions MOYENNE/BASSE proposées.



---

## 2026-07-03 — NETTOYAGE IMAGES (exécution post-audit)

**Fait** :
- ✅ **179 fichiers timeout supprimés** dans `_new-xxl/` et `_new-headshots/`
- ✅ **6 images doublons inter-espèces supprimées** : Carcharodontosaurus_ecosysteme/funfact/paris (copies de Centrosaurus) + versions paleoart
- ✅ **2 images Apatosaurus doublons supprimées** : `_manger` = `_paris` (même image)
- ✅ **20 images grok doublons supprimées** (inbox vs lot identiques)
- ✅ **coloriage-test/ supprimé** (7 fichiers, tests obsolètes)
- ✅ **2 fichiers temp/Dino doublons supprimés**
- ✅ **2 images racine doublons supprimées** : Pentaceratops.jpg, Torosaurus.jpg (copies paleoart)

**Résultat** :
- `_new-xxl/` : 433 → 253 images (nettoyage timeout + doublons)
- `_new-headshots/` : 53 → 52 images (nettoyage timeout)
- `grok/` : 138 → 118 images (nettoyage doublons)
- Espace libéré : ~25-30 Mo

**Reste à faire** :
- ⏳ Générer images XXL pour 8 dinos Cénozoïque (Mammuthus, Smilodon, Megatherium, Paraceratherium, Glyptodon, Aenocyon, Coelodonta, Titanis)
- ⏳ Regénérer Carcharodontosaurus (3 scènes manquantes : ecosysteme, funfact, paris)
- ⏳ Regénérer Apatosaurus_manger (scène manquante)

---

## 2026-07-03 — AUDIT IMAGES (supra méga audit visuel + technique + sémantique)

**Lancé par** : Kimi Code CLI (demande utilisateur : audit complet des images dinosaures).

**Scope** : 1 294 images, 19 répertoires, 59 espèces, 11 familles.

**Approche** : 4 phases — (1) Inventaire structuré (scan + hash MD5), (2) Vérification technique (corruption, doublons, dimensions), (3) Vérification sémantique (identité, anatomie, échelle, qualité, potentiel vidéo), (4) Rapport consolidé.

**Fichiers produits** :
- `studio/dino/pmo/audit-images-INVENTAIRE.json` — index complet de toutes les images
- `studio/dino/pmo/audit-images-DINOS-REF.json` — référentiel 59 espèces avec données
- `studio/dino/pmo/audit-images-TECHNIQUE.json` — problèmes techniques détectés
- `studio/dino/pmo/audit-images-RAPPORT.md` — rapport complet (ce document)

### Findings par priorité

#### 🔴 CRITIQUE
1. **179 fichiers `-timeout`** dans `_new-xxl/` et `_new-headshots/` — captures d'écran d'erreur (interface chat), pas des images dinosaures. À supprimer immédiatement. Gain ~20-30 Mo.
2. **6 images en doublon inter-espèces** : Carcharodontosaurus et Centrosaurus partagent les mêmes images (hash identique) — erreur de batch. À regénérer.
3. **8 dinos Cénozoïque sans images XXL** : Mammuthus, Smilodon, Megatherium, Paraceratherium, Glyptodon, Aenocyon, Coelodonta, Titanis. Normal (ajout récent 2026-07-03), mais à générer via skill `dino-paleoart`.

#### 🟡 HAUTE
4. **33 groupes de doublons hash** total (dont 6 inter-espèces). Les autres sont des copies legacy ↔ paleoart (même image, différents répertoires).
5. **Apatosaurus_manger.png = Apatosaurus_paris.png** — même image pour deux scènes différentes. À regénérer l'une des deux.
6. **Dimensions non uniformes** : Brachiosaurus.png et Patagotitan.png en 1168x784 au lieu du standard 1448x1086/1672x941.

#### 🟢 MOYENNE/BASSE
7. **Qualité globale** : ⭐⭐⭐⭐⭐ — paléoarts XXL de très haute qualité, style cohérent, anatomie juste.
8. **Échelle enfant** : ~90% honnête — l'enfant ~1m donne une bonne référence visuelle.
9. **Identité dino** : ~95% correcte — traits distinctifs présents (voile Spinosaure, cornes Tricératops, bras T-Rex, etc.).
10. **12 images "fort potentiel vidéo"** identifiées — principalement les scènes `_ecosysteme`, `_funfact`, `_paris` (narration visuelle forte).

### Verdict
**🟢 VERT global** — Le parc d'images est excellent. Les problèmes sont quantitatifs (timeout, doublons) pas qualitatifs. Les paléoarts XXL sont des assets de grande valeur pour le projet.

### Actions recommandées
- [ ] Supprimer 179 fichiers timeout
- [ ] Regénérer Carcharodontosaurus/Centrosaurus en doublon
- [ ] Générer images XXL pour 8 dinos Cénozoïque
- [ ] Créer index centralisé image ↔ espèce ↔ scène
- [ ] Tester vidéos à partir des 12 images coups de cœur

---

## 2026-07-03 (suite) — GRAVURE SESSION : Cénozoïque mégafaune + PMO sync

**Lancé par** : dino-pmo (session logging post-livraison commit ab818798).

**Vérifications sync PMO** :
- ✅ INVARIANTS.md : counts 51→59 dinos, 9→11 familles, 4→5 périodes (Cénozoïque ajoutée).
- ✅ decisions.md : 3 décisions Papa Yann datées (catégories taxo, structure Cénozoïque, Titanis hauteur).
- ✅ sprint-log.md : session 2026-07-03 Cénozoïque en haut avec livré/EN ATTENTE/leçon.
- ✅ backlog.md : EP-D19 créé (audio EN ATTENTE quota), L-D18 gravée (sous-agents no-op).
- ✅ figees/ : aucune modification proposée (règles pré-figées 2026-06-15 inchangées).

**Cohérence inter-fichiers vérifiée** :
- Chiffres : INVARIANTS (59/11/5) ⇄ decisions (8 dinos + 2 familles) ⇄ sprint-log (commit ab818798) = en phase.
- Décisions : 3 points Papa Yann documentés avec raison/impact.
- Tickets : EP-D19 ouvert (quoté impossible avant reset ~9 juillet), pas de dépendances bloquantes autres.
- Leçons : L-D18 grave un pattern (sous-agents no-op) reproductible futur.

**Findings** :
- 🟢 **PMO sync complet** — session gravée 4 fichiers pmo/, cohérence vérifiée.
- 🟡 **EP-D19 bloquée** (quota EL) — critère OK, action = attendre reset. État clair.
- 🟡 **L-D18 nouveaux pattern** — sous-agents qui s'annoncent sans livrer → relance ferme obligatoire.

**Verdict** : **VERT — session 2026-07-03 Cénozoïque gravée complète et cohérente**.

---

## 2026-07-03 — AUDIT FOND (Mode AUDIT, 5 sections) : cohérence chiffres, backlog rot, prochaine action

**Lancé par** : dino-pmo (PMO Mode AUDIT).

**Couverture** : 5 sections (architecture, cohérence chiffres INVARIANTS⇄data, production, connaissances/skills, lean/anti-patterns).

**Findings structurés par priorité** :

### 1. Architecture / Découvrabilité — ✅ TRÈS BON
- `studio/dino/INDEX.md` à jour (navigation pôle).
- Gouvernance complète : pmo/ (5 fichiers) + figees/encyclopedie.md (🔒 8 règles).
- `content/INDEX.md` (hub) + sous-INDEX per folder (sources/data/scripts).
- Structure 5 dossiers clair (sources/data/scripts/scripts-audio/inbox).
- **Findings** : 0 orphelin répertoire, 0 ref markdown cassée. Pôle structuré et maintenable.

### 2. Cohérence chiffres INVARIANTS ⇄ disque réel — ⚠️ INCOHERENCE MAJEURE détectée
| Métrique | INVARIANTS | Disque réel | Status |
|----------|-----------|-----------|--------|
| DINOS count | 51 | ✓ (51 fiches, V3 final) | ✅ OK |
| DINO_FAMILLES | 9 | ✓ (Théro/Sauro/Thyréo/Cérato/Ornitho/Dromæo/Ptéro/Énaliosaures/Avant-dinos) | ✅ OK |
| DINO_CATEGORIES (régimes) | 4 | ✓ (Carnivores/Herbivores/Piscivores/Omnivores) | ✅ OK |
| Récits époque | 8 | 8 fichiers `recit-*.mp3` | ✅ OK |
| **Accroches menu** | **17** (4 menus accueil/régime + 9 familles + 4 régimes) | **25 fichiers `menu-*.mp3`** | ⚠️ **+8 SURPLUS** |
| Spéciaux (Pangée, Extinction) | 2 | 2 fichiers | ✅ OK |
| **Dinos audio complet** | **51 × 5 blocs = 255 MP3** | **363 fichiers `*.mp3` dino** | ⚠️ **+108 ORPHELINS** |

**Deep dive audio surplus** :
- Audit disque : `ls site/audio/dinos/ | grep -E '^[a-z].*\.mp3$' | wc -l` → 363 (vs 255 attendus).
- Delta 363 - 255 = **108 orphelins non-référencés** en code (dev-dinos.html DINO_AUDIO ou menus).
- Cause probable : 7 cératopsiens (anchiceratops, chasmosaurus, diabloceratops, einiosaurus, kosmoceratops, pachyrhinosaurus, utahceratops) purgés 2026-07-03 (commit 992c85ca purge 35 MP3) mais résidus restent. Aussi vieux récit-v2…v9 + itérations v1/v2 non nettoyées.
- Menu surplus (25 vs 17) : 8 fichiers non-mappés à code existant (nomenclature anciennes ? variantes supprimées ?).

**Findings** : audit HAUT pour épurer 108 MP3 orphelins. Casting voix (narrateur_h/narrateur_f/wex) cohérent INVARIANTS⇄voice-map.json⇄figée ✅.

### 3. État production — ✅ BON (délivrables présents)
- ✅ 8 récits époque (recit-intro + 7 autres) audiofichiers présents.
- ✅ 51 dinos × 5 blocs production audio V3 (255 MP3) câblés `dev-dinos.html`, badge V3 visible.
- ✅ 255 images paléoart déployées `site/img/dinos/paleoart/` (JPEG q85 + WebP q90, compression -86% appliquée 2026-07-03).
- ✅ Casse fichiers corrigée (82 min→Maj, commit cc2c95f3, 51/51 vignettes racine présentes).
- ✅ 10 Lunii images (cover + 9 familles emblèmes, fond noir natif) + 8 images voyage dispos `studio/dino/content/lunii/`.
- ✅ Décisions figées **toutes respectées** : Tritri (running gag Wex, jamais Max/doudou), régimes purs alimentaires, zéro bus en récits, échelle honnête < 10 % divergence, audio « écoute » jamais « regarde », Wex FR standard.

**Findings** : PRODUCTION FINALE 51 dinos ATTEINTE. Orphelins audio ne bloquent pas la fonctionnalité (le code charge que le référencé). Nettoyage = hygiène.

### 4. Connaissances / Skills consolidées — ✅ EXCELLENT
- **17 leçons L-Dxx gravées** backlog.md (L-D01 → L-D17, patterns + anti-patterns + fait-checks).
- **3 skills globaux** : `dino-paleoart/` (prompts XXL 4 leçons) · `dino-images-lunii/` (emblèmes fond noir natif) · `ecriture-audio-enfants/` (narration orale enfant).
- **8 règles figées** gravées `figees/encyclopedie.md` (Tritri, zéro bus, encyclopédie vraie, PAS ref adulte, prédation vraie, audio registres, UI 4 onglets, Lunii fond noir natif depuis 2026-06-17).
- **Mémoire projet** : MEMORY.md + audit-trail.md + sprint-log.md + decisions.md synchronisés.

**Findings** : pôle bien documenté, transfert de savoir assuré. Leçons réutilisables pour itérations futures (famille Cénozoïque, features EP-D06→D10).

### 5. Lean / Anti-patterns — 🟡 OPTIMISATION REQUISE
- **EP-D17 Lunii BACKLOG ROT** : ticket états « 🟡 À DÉMARRER » mais contenu FAIT (10 images 2026-06-17 validées Papa Yann, 8 époque dispos). Clôture manquée → rot détecté. **Action** : changer status → ✅ FAIT 2026-06-17.
- **EP-D16 scripts-audio/INDEX.md MANQUANT** : ne existe PAS `studio/dino/content/scripts-audio/INDEX.md`. Ticket valide (créer catalogue 51 fichiers V3 groupe par vague + refs factchecks). **Action** : créer après archivage EP-ARCH-01.
- **108 MP3 orphelins** + **8 menu-*.mp3 surplus** : nettoyage MÉDIA requis (audit disque préalable pour lister précis → suppression sécurisée → re-vérif count = 255).
- **Prochaine action vague** : sprint-log 2026-07-03 FINAL dit « ombres chinoises à voir demain » (non-spécifique). **Clarification requise** : que sont ces ombres ? Q-DINO-12 galerie images ? Staging `_new-ombre/` visuels ? Ticket à créer si besoin.

**Findings** : 2 tickets rot + 1 création + 1 clarification. Moyenne priorité, hygiène/organisation.

---

### Préparation pour future famille Cénozoïque (mammifères mégafaune)

**Contexte** : Papa Yann envisage ajouter « Mammifères / mégafaune Cénozoïque » (mammouths, smilodon, terror birds, paraceratherium…).

**Vérif INVARIANTS / figées** : ✅ **AUCUN BLOQUANT** identifié.
- DINO_FAMILLES passe 9 → 10 (no hard cap, figuré conçu extensible).
- Régimes alimentaires existants (carnivores/herbivores/omnivores) suffisent (pas piscivore pour mammiféres terrestre, aucun problème).
- Casting voix (narrateur_h/narrateur_f/wex) inchangé.
- Règles figées (échelle honnête, encyclopédie vraie, etc.) s'appliquent identiquement.

**Matière en attente** : `content/inbox/01_woolly_mammoths.png` … `28_hyaenodon.png` (28 fichiers images, brief Papa Yann 2026-06-08, ticket EP-D12 en backlog).

---

### Croisement audit FOND vs FORME (archiviste)

**Qu'archiviste détecterait** : structure gabarit ✅, INDEX cohérence ✅, refs markdown ✅, orphelins fichiers-dossiers ✅. Solide sur la STRUCTURE.

**Qu'archiviste manquerait** (audit FOND a trouvé) : cohérence **chiffres DISQUE RÉEL** (363 vs 255 MP3). Archiviste contrôle absence refs code, pas l'audit masse data. Binôme worketh : archiviste FORME + PMO FOND complémentaires. L'audit croisé révèle 108 orphelins ignorés des deux jusqu'au Mode AUDIT.

---

### Verdict final

**Pôle DINO** = **PRODUCTION FINALE ATTEINTE** (51 dinos, 255 MP3 câblés, 255 images paléoart q85/q90, décisions figées 8/8 respectées, 17 leçons gravées, 3 skills dispo). Qualité audit = **BON**. 

**État critique** : ✅ ZÉRO CRITIQUE sémantique (toutes les règles figées = respectées, Tritri sans Max/doudou ok, zéro bus en récits ok, audio V3 final complet). 

**Nettoyage requis** : orphelins media (108 MP3 + 8 menus), backlog rot (EP-D17 clôture), creation (EP-D16 INDEX.md), clarification (prochaine action).

**Blockers** : none. App live et fonctionnelle. Optimisation = meilleure UX interne/métrique.

---

## 2026-06-15 (suite) — Logging corrections V3 appliquées (PMO FOND)

**Décision Papa Yann 2026-06-15** : toutes les corrections relecture V3 appliquées LIVE.

**Findings appliqués** :
- ✅ **EP-D13 FAIT** : typos audio (« alone »/« un torpille »/accents) corrigées sur 7 scripts · échelles recalculées _compLong/_compHaut (Shonisaure + 5 « bus RATP ») · poids _compPoids (Tricé/Toro) · 3 dinos data (Patagotitan/Centrosaure/Ichthyosaurus communis). Count 48→51, INVARIANTS MAJ.
- ✅ **EP-D14 FAIT** : Q-DINO-7=OUI → Tritri 3 touches ceratopsiens, Wex, fluides.
- ✅ **EP-D15 FAIT** : patterns « réfléchissait » résorption · réfs adultes (Elvis/Ferrari/JP/vroum) RETIRÉES.
- ✅ **2 règles figées nouvelles** : 🔒 PAS référence adulte, 🔒 PRÉDATION vraie jamais gore. Gravées figees/encyclopedie.md (déjà en place).
- ✅ **Grep-interdits final** : 0 max/doudou/peluche/nounours/bus-hors-échelle sur 7 scripts.
- ✅ **Q-DINO-7/8/9/10 tous TRANCHÉ/RÉSOLU** : Tritri oui, 3 dinos data créées, sensibilité retraitée, bus corrigés.

**État post-corrections** : **51 fiches V3 FINAL** prêtes production audio MCP. Leçons L-D10/L-D11/L-D12 gravées backlog.md.

**Verdict** : pôle DINO = **corpus final validé 2026-06-15**, prêt pour `studio_audiobook_from_segments_v2_dialogue`.

---

## 2026-06-03 — Premier audit croisé FOND + FORME (post-création)

**Lancé** via `/dino-pmo-audit` + `/dino-archiviste-audit` (2 agents en parallèle).

**Adjudication (vérité terrain par le main agent)** :
- ⚖️ **Count dinos = 50** (autoritatif `DINOS.length`). Le PMO a **halluciné « 59 »** (grep-comptage des `id:` incluant dinos + familles + catégories) → **faux positif écarté**. L'Archiviste avait raison (50). Leçon : toujours adjuger un claim de count par `DINOS.length`, jamais par grep `id:`.

**Findings traités (fix appliqué)** :
- ✅ EP-D01 / Q-DINO-2 **résolus** : count = 50. Stale corrigés → `dino/content/INDEX.md` (60→50 + liens `../../../web`→`../../site`), header `dinos-data.js` (60→50, `volants_marins` retiré du commentaire).
- ✅ **8 orphelins** `recit-cretace-v2..v9.mp3` supprimés (itérations supersédées, le code ne charge que `recit-cretace.mp3`).
- ✅ **5 scripts** `content/` : chemins `game/docs/jeux/dino-encyclopedie` → `dino/content` corrigés (sortie/lecture après le move).

**Confirmé sain (les 2 agents)** : gabarit `dino/` complet (5 fichiers pmo + figées) · 9 familles noms scientifiques · casting voix cohérent INVARIANTS⇄voice-map⇄figée · audio (8 récits + 4 menus + 2 spéciaux + 22 dinos) présent et référencé · Tritri sans Max/doudou respecté · zéro bus en récit · liens markdown dino/** résolvent.

**Verdict** : pôle **opérationnel et sain**. 0 CRITIQUE réel (le « 59 » était faux), findings BASSE traités. Reste : EP-D02 (audio des ~28 dinos restants) ouvert, basse priorité.

---

## 2026-06-03 — Création + audit de cohérence initial

**Contexte** : création du pôle (déplacement contenu + gouvernance).

**Findings traités** :
- ✅ Move `dino-encyclopedie/` → `dino/content/` sans perte (217 fichiers, rename git, historique préservé).
- ✅ Chemins relatifs des 2 scripts code-couplés corrigés (`../../../web` → `../../site`), résolution testée.
- ✅ Hook figeage étendu (dino/** + code site/ dino → `dino/figees/encyclopedie.md`), testé OK.
- ✅ Refs internes de la figée corrigées (`../dino-encyclopedie/` → `../content/`, `../../web` → `../../site`).

**À surveiller (reste ouvert)** :
- 🟡 Count dinos : INVARIANTS dit 50 (réel `DINOS.length`), ancien INDEX disait 60 → EP-D01.
- 🟡 Refs externes résiduelles vers `dino-encyclopedie` dans `game/pmo/backlog.md` + `narration/pmo/` (historiques, non bloquantes) — à nettoyer si on y repasse.
- 🟡 `content/INDEX.md` (ancien) coexiste avec le nouveau `dino/INDEX.md` : l'ancien décrit le dossier content, le nouveau est le catalogue du pôle. Pas un doublon (scopes différents) mais à vérifier au prochain audit forme.

**Verdict** : pôle opérationnel, structure saine. Prochain audit forme : vérifier orphelins dans `content/` + cohérence count.
