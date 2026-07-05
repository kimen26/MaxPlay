# Décisions — Pôle DINO

> Décisions datées (raison + impact). Les décisions **verrouillées** (jamais régresser) vivent dans [`../figees/encyclopedie.md`](../figees/encyclopedie.md).

## 2026-07-05 — DEC-EP-D25-CLÔTURE-001 : Audit visuel final 60 dinos + épuration chantier images

**Contexte** : grand chantier images du pôle DINO (EP-D25 + EP-D18 + EP-D19 + mégafaune + audit) arrive à clôture. Journée d'audit visuel complet (100 % couverture 60 dinos, ~408 images déployées). Validation anatomique + épuration produit.

**Décision PMO (2026-07-05)** :
- ✅ **60 dinos AUDIT FINAL CLÔTURÉ** : 100 % dinos auditées visuellement, 39 irréprochables, ~57 findings mineurs notés, 8 fausses regénérées + validées.
- ✅ **EP-D25 = CLÔTURÉ** (audit complet, pas nouvelle regénération jusqu'à ChatGPT reset pour finesse 2 rangées épines Amargasaurus + géants échelle).
- ✅ **Leçon L-D21 gravée** : silhouette maîtresse EN TÊTE du prompt = clé fondamentale batch images. Skill batch-dino-series.mjs maj (5 MORPHO, silhouette en tête). Pattern réutilisable toute génération batch images futures.
- ✅ **Reste pour backlog futur** : (1) Amargasaurus 2 rangées épines (finesse ChatGPT). (2) Géants échelle (Patagotitan/T-Rex/Giga/Brachio). (3) Ceratosaurus coloriage 1 corne. Déclencheurs : ChatGPT reset, backlog saisonnalité.

**Impact** :
- **Grand chantier images finalisé** : 60 dinos × 5 scènes + coloriage + ombres + héros = production complète déployée + validée.
- **Doctrine GED (DEC-GED-001) renforcée** : silhouette/étymo/chiffres = preuves vivantes qualité donnée. Outil audit `_ETAT-DINOS.md` (futur) complètera la suite.
- **Frontière autoring/produit VALIDÉE** : L-D22 (GITIGNORE) + assets nommés `id` stable = contrat avec mini-jeux.

---

## 2026-07-05 (clôture) — DEC-SILHOUETTES-SUPPRESSION-001 : Nettoyage zones orphelines

**Contexte** : Papa Yann donne l'ordre « les anciennes SUPPRIME-LES, je ne veux plus les voir !! » après validation canon `site/img/dinos/ombres/` (60 PNG, seule zone consommée mj-24..33).

**Décision + exécution (commit 234dee4b, déployé Pages)** :
- ✅ **Zone `site/img/dinos/silhouettes/`** (208 PNG par-famille) : **SUPPRIMÉE**. Aucune consommation code (recherche grep : 0 ref).
- ✅ **Zone `studio/dino/content/assets/silhouettes/`** (banque source, _sources, manifest) : **SUPPRIMÉE**. Archive historique.
- ✅ **Fichiers orphelines** : `site/js/dino-silhouettes.js` + `dev-silhouettes.html` : **SUPPRIMÉS**.
- ✅ **Git historique** : conservé (0 perte, branches/commits restent intacts).
- ✅ **Prod vérif** : 18/18 URLs prod HTTP 200 (mj-24..33 pointent `site/img/dinos/ombres/`, 0 404).

**Raison** : ces deux zones étaient des reliquats de l'expérimentation canals ombres 2026-07-03. Canon unique = `site/img/dinos/ombres/` (TRACKÉE, consommée, vivante). Nettoyage de la dette technique.

**Impact** :
- Code + asset footprint réduit.
- Zéro ambiguïté sur la source d'ombres production.
- Pattern gravé : DEC-GED-001 Règle 3 (FRONTIÈRE autoring/produit = assets TRACKÉS + consommés uniquement).

**Décision stockée** : figée dans le processus ; aucune régénération d'ombres avant nouvelle décision Papa Yann.

---

## 2026-07-05 (suite 2) — DEC-GIT-TRACKING-001 : Frontière autoring/produit inclut GITIGNORE

**Contexte** : bug prod critique — jeux mj-28/30/31/33 référençaient assets gitignorés (`_new-ombre/`, `_new-xxl/`). OK en local (Windows FS insensible), cassé prod (GitHub Pages Linux FS sensible). 60 ombres + 11 héros = 404.

**Cause racine** : DEC-GED-001 Règle 3 (FRONTIÈRE autoring/produit) est INCOMPLÈTE. Elle dit « une feature ne lit QUE site/ » mais n'inclut PAS « et ces assets DOIVENT ÊTRE TRACKÉS par Git ».

**Décision + fix appliqué (commit 941faa30)** :
- ✅ Promotion 60 ombres : `_new-ombre/` (staging gitignore) → `site/img/dinos/ombres/` (TRACKÉE)
- ✅ Promotion 11 héros : `_new-xxl/{Nom}.png` → `site/img/dinos/{Nom}.jpg` (TRACKÉS)
- ✅ Mise à jour jeux mj-28/30/31/33 chemins
- ✅ **Leçon L-D22 gravée** : « TRACKING GIT = part de la frontière. Zone `_new-*` = staging, jamais produit. Vérif `git check-ignore <asset>`. »

**Impact** :
- **Règle 3 DEC-GED-001 à affiner** : ajouter « tous les assets référencés par une feature DOIVENT être trackés sous `site/` » + « `git check-ignore` = diagnostic rapide ».
- **EP-D-Image-11-sans-hero RÉSOLU** (2026-07-05 suite 2)
- **Q-DINO-Voyage-Silhouettes aiguillée** : zone `ombres/` est canon maintenant.

---

## 2026-07-05 — DEC-PALEOART-REGEN-001 : Processus de régénération d'espèces fausses (silhouette maîtresse OBLIGATOIRE)

**Contexte** : audit visuel complet 60 dinos révèle 8 espèces avec anatomie grossièrement fausse (Ceratosaurus nu/sans corne, Utahraptor écailles/sans plumes, Patagotitan hadrosaure/sauropode mal formé, etc.). Cause racine identifiée : la skill batch-dino-series.mjs ne poussait AUCUNE silhouette de référence au GPT quand la fiche Grokipedia n'était pas captée (heuristique ratée). Le modèle inventait donc une forme → mauvaise espèce systématique.

**Décision papa Yann (2026-07-05)** :
- ✅ **Régénérer les 8 fausses espèces** avec silhouette maîtresse EN TÊTE du prompt (trait unique anatomique en MAJUSCULES → modèle force-correct).
- ✅ **Ajouter 5 entrées MORPHO au skill** (ceratosaurus/utahraptor/patagotitan/pachycephalosaurus/carcharodontosaurus) avec signature ⭐ unique.
- ✅ **Nouvelle règle figée gravée** : tout nouveau dino ajouté DOIT avoir soit fiche Grokipedia complète, soit entrée MORPHO — sinon silhouette sera fausse. Vérification : `node batch-dino-series.mjs <id> --preview | grep Silhouette`.

**Impact** :
- **Leçon L-D21** : silhouette maîtresse = clé foundational en prompting batch images.
- **Skill batch-dino-series.mjs maj** (silhouette EN TÊTE) appliquée → futures regénérations au reset ChatGPT.
- **Pattern générationnel** : prompts doivent TOUJOURS commencer par « Voici l'anatomie de [espèce] : [TRAIT UNIQUE EN MAJUSCULES] », avant même les détails.

**Observé** : Grok (canal backup) capture bien l'anatomie quand prompt structuré (anatomie ok sur 4 espèces ciblées), MAIS perd la finesse (épines Amargasaurus 1 rangée vs 2, géants moins écrasants). À re-tester ChatGPT dès reset.

---

## 2026-07-03 — DEC-GED-001 : Doctrine d'architecture GED du pôle (audit sénior)

**Contexte** : Papa Yann a challengé le « c'est OK » du PMO/archiviste sur le rangement (images, mp3, histoires, data, dialogues, familles). Audit sénior multi-perspective (4 experts indépendants + relecteurs + directeur technique, 2026-07-03). **Verdict : le rangement physique est correct, mais la GED n'a aucune notion de « présent » ni de « complétude par dino ».** Preuves vivantes : 10 heros cassés en prod non détectés · 3 comptes de dinos différents (dinos-data.js « 48 », INDEX « 50 », réalité 60) · `_REPRISE.md` cru perdu alors qu'il était juste enterré.

**Diagnostic tranché (dette réelle, pas cosmétique — elle compose à chaque dino ajouté)** :
- 🔴 **C1** — aucune vue « par dino » : impossible de voir ce qui reste à faire sans fouiller 9 endroits. Cause racine.
- 🔴 **C2** — 10 heros cassés en prod (9 Cénozoïque + Edmontonia, `png:` pointe dans le vide). Bug produit, à réparer.
- 🟠 **M1** — versionnite non désignée (récits V3/V4/V5/BRUT/FOND, étymo 50/60, 2 systèmes de dialogues) : rien ne dit lequel fait foi → un agent régénère depuis le mauvais.
- 🟠 **M2** — la doctrine dérive (chiffres écrits à la main mentent).
- 🟠 **M3** — dinos-data.js pas prêt pour les mini-jeux (assets nommés par nom d'affichage, pas par `id`).

**Doctrine décidée (la CIBLE — 3 axes : rangement OK + canonicité + complétude, les 2 nouveaux se recalculent seuls depuis le disque)** :

1. 🔒 **CANON SANS NUMÉRO** — le fichier qui fait foi porte un nom stable sans version (`RECITS-EPOQUES.md`, `ETYMO.md`). L'historique descend dans un `_archive/` local daté. **On DÉSIGNE le canon, on ne SUPPRIME jamais** (respecte l'invariant « jamais jeter de matière narrative » [[feedback_narration_info_loss]]).
2. 🔒 **ZÉRO CHIFFRE EN DUR dans la doctrine** — aucun INDEX/README/CLAUDE.md ne cite un count (nb de dinos, familles, silhouettes). On écrit « compte réel = `site/js/dinos-data.js` » et on pointe. Un chiffre recopié à la main **va** mentir.
3. 🔒 **FRONTIÈRE AUTORING / PRODUIT** — un mini-jeu (ou toute feature du site) ne lit QUE `site/js/dinos-data.js` + les assets `site/img/dinos/` référencés. Donnée manquante → elle descend dans dinos-data.js via un script d'export. **Jamais** une feature ne monte lire dans `studio/` (non déployé). Assets nommés par `id` stable (`tyrannosaurus_headshot.jpg`), pas par nom d'affichage.
4. 🔒 **CHECKLIST « DINO COMPLET »** (8 axes) — `hero · 5 scènes paléoart (headshot/manger/paris/ecosysteme/funfact) · coloriage · 5 segments audio · silhouette · fiche fact-checkée · étymo · mesures`.
5. 🔒 **OUTIL DE SUIVI GÉNÉRÉ, JAMAIS TENU À LA MAIN** — un script lecture-seule lit dinos-data.js, sonde le disque, écrit `_ETAT-DINOS.md` (synthèse en tête + détail « le plus incomplet d'abord » + section orphelins/staging). Branché dans l'agent `dino-archiviste`. « Où en sont les dinos ? » → il régénère. (Livrable à produire — voir backlog EP.)
6. 🟡 **STOP silhouettes 3 zones** — `content/assets/silhouettes/` (par famille) · `site/img/dinos/silhouettes/` (par famille) · `_new-ombre/` (par dino). Décision de fusion **reportée au démarrage du 1er mini-jeu qui les consomme**. Ne PAS relancer de génération d'ombres avant (sinon on refait ce qui existe).

**Ce qu'on NE fait PAS (anti-sur-ingénierie, l'avocat du minimalisme a raison)** : pas de grande réorg des 6 zones d'images · pas de fusion fact-check/mesures/étymo (archives de recherche) · pas de matrice par-dino à la main · pas de hook de vérif des chiffres (inutile si zéro chiffre en dur) · pas de bloc `assets:{}` littéral dans dinos-data.js · pas de structuration étymo/frise tant qu'aucun jeu ne les consomme.

**Rapport complet** : audit sénior archivé (artifact 2026-07-03). **Impact** : refonte gouvernance (ce fichier + INVARIANTS + INDEX + rules + CLAUDE.md pôle), archivage récits, dé-chiffrage INDEX, pose STOP silhouettes.

## 2026-07-03 — Cénozoïque : catégories Mammifère + Oiseau (TAXO honnête)

**Décision Papa Yann** : nouvelle collection Cénozoïque mégafaune scindée en **2 catégories distinctes** (pas 1 seule « Mammifères ») :
- **Mammifères** (`mammiferes`, 7 dinos) : Mammuthus, Smilodon, Megatherium, Paraceratherium, Glyptodon, **Aenocyon** (loup terrible), **Coelodonta** (rhino laineux).
- **Oiseaux** (`oiseaux`, 1 dino) : Titanis (seul non-mammifère du lot, oiseau-terreur).

**Raison** : honnêteté taxonomique. Les terror birds (Titanis) sont des oiseaux, les mammouths/loups/rhinos sont des mammifères — les mélanger sous une seule étiquette donne une fausse impression phylogénétique.

> ⚠️ **Corrigé 2026-07-03 (DEC-GED-001, dé-mensonge à la source)** : la version initiale de cette décision rangeait Aenocyon + Coelodonta dans « Oiseaux » (erreur). La data et l'INVARIANTS disent bien `famille: 'mammiferes'` pour les deux (répartition vérifiée `node` : mammiferes=7, oiseaux=1). Décompte corrigé 5+3 → **7+1**.

**Impact** :
- Code : `dinos-data.js` 2 entrées famille (`mammiferes`, `oiseaux`). INVARIANTS maj (9→11 familles).
- UI onglet Familles : 11 carrés au lieu de 9, Mammifères + Oiseaux (label + accroche audio futur).
- Aucun changement audio/voyage (8 récits historiques dinosaures = Triassic/Jurassic/Crétacé, Cénozoïque EN ATTENTE décision episode bonus).

## 2026-07-03 — Cénozoïque structure : fiches individuelles onglet Familles (PAS 9e épisode Voyage)

**Décision Papa Yann** : Cénozoïque mégafaune = **8 fiches dinos individuelles dans le même produit**, rangées sous onglet **Familles** (Mammifères + Oiseaux), PAS un 9e récit d'époque dans le Voyage.

**Raison** : Le Voyage raconte les 8 grandes périodes = archi-décidé + mécanique historique (chronologie > 50 Ma chacune). Cénozoïque = récent (66 Ma → today) et micro-diversité (pas 1 époque unifiée comme le Crétacé final). Pédago 4 ans : épisode supplémentaire sur-charge, fiches indiv = plus simple.

**Impact** :
- Cénozoïque = section onglet « Familles » (même UI que Théropodes, Sauropodes, etc.), PAS section onglet « Voyage ».
- 8 récits voyage = inchangé.
- Audio : 51 dinos V3 (51 fiches × 5 MP3 bloc) + 8 Cénozoïque futurs = 59 fiches × 5 MP3 (79 MP3 supplémentaires post-reset EL).

## 2026-07-03 — Titanis hauteur corrigée : 1,9 m (pas 2,5 m inbox)

**Factcheck Wikipedia** : Titanis walleri oiseau terrifiant (extinct ~2 Ma Pliocène Floride). Inbox image donnait 2,5 m (probable confusion avec d'autres terror birds), Wikipedia sourced = **1,9 m**.

**Correction appliquée** : dinos-data.js entrée `titanis` → `hauteur_m: 1.9` (pas 2.5). Impact mineur : comparaison _compHaut() ≈ « porte 1,9 m » (vs hypothétique 2,5 m = fausse). Dialogue V3 regénéré pour cohérence.

---

## 2026-06-03 — Création du pôle DINO
Le contenu dino devient un **pôle pair** de game/ et narration/ (transverse jeu+audio). Code déployé reste dans `site/`, lié par `.claude/rules/dino.md`. **Raison** : domaine assez gros + cross-cutting pour mériter sa gouvernance (PMO/archiviste/conseiller). Déclencheur : incident « doudou de Max » (gouvernance contenu manquante).

## 2026-06-03 — Tritri : running gag sans méta
Tritri = dino préféré de Wex (Tricératops), running gag. **JAMAIS** « Max », « doudou », « peluche ». **Raison** : casser le 4e mur sort de l'histoire. Verrouillé. Impact : `recit-intro` régénéré, 8 récits relus.

## 2026-06-03 — « Volants & Marins » scindé
→ **Ptérosaures** (Ptéranodon, Quetzalcoatlus) + **« Pas des dinosaures ! »** (Mosasaure, Dimétrodon). Archaeoptéryx → Dromæosaures. **Raison** : « Volants & Marins » n'était pas un nom scientifique et mélangeait 4 clades. Honnêteté taxo.

## 2026-06-03 — « Ce qu'il mange » = alimentaire pur
Retrait de la catégorie morphologique « Volants & Marins » des régimes. Les animaux reclassés dans leur vrai régime. **Raison** : un onglet « ce qu'il mange » ne contient que des régimes alimentaires.

## 2026-06-17 (suite) — Inversion charte images Lunii → Vraie charte FOND NOIR NATIF (DÉCISION Papa Yann)

**Contexte** : après production + relecture Papa Yann des 9 emblèmes + couverture Lunii, dérivation brute « fond gris clair + inversion post-production » révèle un problème : une inversion simple n'est pas réellement « belle ». Les images ne sont pas conçues pour un fond noir.

**Décision Papa Yann (2026-06-17)** :
- ❌ **Ne PAS utiliser l'inversion** (fond clair généré, puis invermis après coup) — c'est un pis-aller visuel, pas un vrai rendu.
- ✅ **Régénérer NATIVEMENT sur fond noir** : composer les images dès la conception pour écran Lunii sombre. Sujet blanc/gris clair brille naturellement sur le noir.
- **Processus** : re-dériver prompts GPT avec brief « fond noir d'emblée, pas fond clair à inverser » → ChatGPT génère composition pensée sombre → PNG 320×240 16 gris directement bon.

**Raison** :
- Le rendu Lunii (écran derrière plastique, 16 gris vieille tech) bénéficie énormément du contraste noir/blanc.
- Sujet blanc sur noir « brille » et ressort bien. Fond noir = plus logique (le vide devient noir, pas gris clair dégueulasse).
- Composition pensée sombre >> composition pensée claire + inversée après.

**Impact** :
- **Ticket EP-D17 créé** : régénérer 10 images (couverture + 9 emblèmes) en fond noir natif (pas inversion post).
- **Règle figée mise à jour** : `figees/encyclopedie.md` § IMAGES LUNII → clarifier « fond noir natif dès la conception » (les images actuelles sont à refaire).
- **Charte INDEX.md mise à jour** : `studio/dino/content/lunii/INDEX.md` ligne 9 correction « gris clair » → « noir natif ».
- **À faire aussi** : 51 images dinos (quand elles arrivent) suivront la même règle « fond noir natif ».

**Source vérité** : `content/sources/fiches/_FICHES-DINOS-GROKIPEDIA.md` (specs style/concept par famille).

## 2026-06-17 — Skill global « Dino Images Lunii » créé + charte visuelle figée

**Fait** : création skill global `~/.claude/skills/dino-images-lunii/` (pipeline prouvé ChatGPT/Brave/Playwright CDP → ffmpeg Lunii). 9 emblèmes familles + 1 couverture produits et validés Papa Yann. **Décision** : 2 règles images figées gravées dans `figees/encyclopedie.md` (charte style C + griffures prédateurs uniquement). Source specs vérité : `content/sources/fiches/_FICHES-DINOS-GROKIPEDIA.md`. **Raison** : images Lunii sont atome visuelle réutilisable (packs Lunii, future vignettes site). **Impact** : packs Lunii complets peuvent débuter (images + 51 MP3 V3 bloc).

## 2026-06-12 — Vague Armure & Cornes : textes figés + 3 questions Papa Yann
**Fait** : 5 dialogues audio V2 écrits + validés (Euoplocéphale, Kéntrosaure, Torosaure, Protocératops, Pachycéphalosaure). Livrable [`studio/dino/content/scripts-audio/_VAGUE-armure-cornes.md`](../content/scripts-audio/_VAGUE-armure-cornes.md). **Raison** : production de masse, validation dino-conseiller complète (étymologie, comparaisons sources dinos-data.js, grep-interdits ✅). **3 points à trancher Papa Yann** : (Q-DINO-4) Pachycéphalo crâne 25 cm vs 22 cm → impacts dinos-data.js ; (Q-DINO-5) Torosaure=Tricératops débat non résolu → nuance 4 ans OK ? ; (Q-DINO-6) Euoplocéphale ~1571 → étoffer ou OK ? Reste : générer audio dès validation, câbler page.

## 2026-06-03 — Voix réelle dans les menus
Menus en voix ElevenLabs (narrateur_h + narrateur_f pour le voyage), accroches **2-7 s**. Fallback `speechSynthesis` conservé. **Raison** : la voix robotique navigateur sur les gros libellés gênait.

## 2026-06-08 — Réorganisation `studio/dino/content/` en 5 dossiers thématiques
**Fait** : passage d'une racine en vrac (25 fichiers) à structure par rôle : `sources/` (📚 vérité prose fact-checkée, 6 fichiers) · `data/` (🎯 générée, 4 JSON + `racines.json` nouveau) · `scripts/` (🛠️ outils, 7 scripts — audio/images-grok/export) · `scripts-audio/` (dialogues 22 groupes, inchangé) · `inbox/` (brut, inchangé). **Correctifs** : `__dirname` dans scripts (pointaient `dino/content/…` post-migration 2026-06-03 = cassés) → réparés. Validation : régen-diff `json-top.cjs` et `dinos-images-grok.js` = sorties identiques (non-régression prouvée). **INDEX refondus** : hub `content/INDEX.md` + sous-INDEX sources/data/scripts. Refs MAJ dans `studio/dino/INDEX.md`, `studio/dino/CLAUDE.md`, rule `.claude/rules/dino.md`. **Raison** : clarté navigabilité pôle, préparation features futures (duel, dico latin/grec, quiz). **Chiffres invariants** : inchangés (50 dinos/9 familles/4 régimes/22 audios/8 récits/4 accroches).

### Flags relevés (décisions ouvertes)

- **Flag A** : `sources/mesures/_BLOC-B-CANONIQUE.md` **PÉRIMÉ vs `dinos-data.js`** (57 lignes diffèrent : chiffres/comparaisons dérivés corrections data récentes, ex T-Rex « 12 m » → « 13 m »). Générateur réparé mais canon non régénéré (= décision narration/figée explicite). **Questions** : régénérer le canon pour re-synchroniser ? (Affecte récits onglet « Voyage ».)
- **Flag B** : `scripts-audio/001-trex-brachiosaure-velociraptor.md` (brouillon early non consumé par pipeline `_md2json`, qui ne lit que `groupe-*`) : à confirmer supression ?

---

## Décision 2026-06-15 — Relecture V3 CLÔTURÉE : corrections avant prod audio obligatoires

**Fait** : relecture multi-agents V3 complète (dino-conseiller + narration-conseiller + panel lecteurs/dyades, 8 livrables). **Décision** : corpus V3 contient 4 bloquants + 4 priorités hautes avant production audio. Tous les tickets sont gravés backlog.md + sprint-log.md.

**Bloquants à corriger AVANT audio** (affect écoute Max direct) :
1. Tritri running gag totalement absent (même Tricératops pas "Tritri") → alerte figée
2. Typos audio bloquantes (« alone », « un torpille », accents)
3. Shonisaure 2 m comparé « panier basket 3,05 m » (52 % erreur) → doit dire « porte »
4. 3 dinos absents dinos-data.js (Titanosaure/Centrosaure/Ichtyosaure) → trou source

**Priorités hautes (avant audio)** :
- Poids Tricé/Torosaure divergence (scripts ≠ _compPoids)
- 5+ fiches "bus de Paris" pour 10 m (dépasse tolérance 10 %)
- "dino-bus" Edmontosaure = bus hors échelle, contredit figée
- 3 passages sensibilité enfant (os miettes T-Rex, Mosasaure saut, Tarbosaure corde) → intonation parent

**Raison** : audiobook V3 = livrable à Max (pas simulation). Bloquants = non-lisibilité ou scientifiquement malhonnête. Durée correction estimée : 4-6h (typos + mesures + data).

**Impact** : tous les scripts V3 = EN ATTENTE jeu vert Papa Yann. Production audio MCP `studio_audiobook_from_segments_v2_dialogue` démarrée seulement après OK corrections.

---

## 2026-06-19 — Production images paléoart XXL (5 scènes/dino)

**Fait** : démarrage production massivement d'images paléoart pour fiches dino app (site/img/dinos/_new-xxl/). **Scope** : 5 scènes par dino (PNG enfant-échelle + alimentation + écosystème + Paris + fun-fact). **Source pilotage** : **Projet ChatGPT** (g-p-6a2c67ebc22c8191971eecf695ec5fec-dinosaure/project, prompt système paléoart) — **PAS** GPTs custom (qui donnait images sans direction artistique). **État** : 18 dinos ✅ complets, 3 partiels (1 scène manquante), 2 bloqués modération (Carcho/Dilo crus), ~28 à faire. **Limites atteintes** : quota images ChatGPT. Reprise documentée dans `site/img/dinos/_new-xxl/_REPRISE.md`. **Décision gravée** : projet ChatGPT authoritative (pas GPTs), pas inversion post-production (on génère direct les 5 scènes bonnes).

## 2026-07-03 — Format images paléoart FIGÉ : JPEG q85 + WebP q90 (DÉCISION Papa Yann)

**Contexte** : 255 images paléoart PNG générées 2026-06-19/07-01. Fini = **808 Mo PNG** en tout, repo massif. Papa Yann valide compression.

**Décision Papa Yann (2026-07-03)** :
- **Photos paléoart** (hero + 5 scènes : taille/manger/paris/écosystème/funfact) = **JPEG q85** (ffmpeg `-q:v 4`). Raison : compat universelle, Papa Yann veut zéro question de compatibilité navigateur enfant.
- **Coloriages** (dessins au trait N&B + transparence) = **WebP q90**. Raison : préserve traits nets + transparence (JPEG détruirait la transparence et baverait les contours).
- Résultat : **paleoart 771 Mo → 108 Mo (-86%)**. Repo **~113 Mo images** au lieu de 1,6 Go.
- Les refs code (`dinos-data.js` champ `png:`, `dev-dinos.html` EXTRAS) **passées de .png à .jpg**.

**Raison** :
- App dino déployée GitHub Pages (bande passante limitée).
- Enfant 4 ans sur tablette = batterie + data.
- JPEG compat universel (tous navigateurs 2010+).
- WebP gain optimal transparence (coloriages ne cassent pas).

**Impact** :
- **308 JPEG + 51 WebP déployés** dans `site/img/dinos/paleoart/`.
- **0 PNG** en production (bruts HD archivés `_new-xxl/` gitignore).
- Zones staging `_new-coloriage/`, `_new-headshots/`, `_new-ombre/`, `coloriage-test/` gitignorées (retouches locales, pas déploiement).
- **EP-D18 clôturé**, chantier images terminé.

**Figée** : prochaines images dinos (si regénération) = même format (JPEG paléoart, WebP coloriages). Pas de PNG en production.

---

## 2026-07-03 — 7 cératopsiens orphelins REJETÉS : anchiceratops, chasmosaurus, diabloceratops, einiosaurus, kosmoceratops, pachyrhinosaurus, utahceratops (DÉCISION Papa Yann)

**Contexte** : 7 cératopsiens n'ont JAMAIS été intégrés à `dinos-data.js`, bien que des contenus orphelins existent : 5 MP3 chacun (35 fichiers total dans `site/audio/dinos/`) + 10 images grok (`site/img/dinos/grok/`) produits par une session passée. Signalé dans audit archiviste comme surplus "audio 58-60 vs 51 dinos".

**Décision Papa Yann (2026-07-03)** :
- ❌ **Ne PAS ajouter ces 7 cératopsiens** à l'encyclopédie dino. Ils restent hors-scope.
- ✅ **Suppression des orphelins** : 35 MP3 (`site/audio/dinos/`) + 10 images grok (`site/img/dinos/grok/`) purgés.
- ✅ **Régénération nettoyée** : `site/js/dinos-images-grok.js` régénéré via `_gen-grok.cjs` (32 dinos, 138 images, 0 ref résiduelle aux 7).

**Raison** :
- Encyclopédie = **51 dinos figés** (Tritri + 50 autres). Intégrer ces 7 changerait l'envergure pédagogique et la charge audio (51 × 5 blocs = 255 MP3 déjà massif).
- Orphelins jamais validés péda/fact-checké par relecture externe.

**Impact** :
- **INVARIANTS inchangés** : 51 dinos, 255 MP3 audio (51 × 5 blocs).
- **Audit critique résolu** : surplus "audio 58-60 vs 51" expliqué = ces orphelins. Compte audio dino = **51 par bloc** (figé).
- **WARN « 25 menu-*.mp3 vs 17 attendus »** reste ouvert en backlog (non traité cette session, hors périmètre).
- **Anti-glissement** : si future session retrouve ces cératopsiens dans une vieille trace (prompts, scripts), NE PAS les régénérer sans décision explicite Papa Yann.

**Figée** : liste fermée 51 dinos. Hors-scope = hors-scope. Pas d'ajout sans decision produit explicite.

---

## 2026-07-05 (clôture) — DÉCISION SILHOUETTES TRANCHÉE : zone ombres canonique figée

**Contexte** : audit final + validation Papa Yann. Zone `site/img/dinos/ombres/` (60 PNG, TRACKÉE) est le canon produit. Les 2 autres zones existent mais ne sont pas des doublons à fusionner (archives source).

**Décision Papa Yann (2026-07-05)** :
- ✅ **Zone `site/img/dinos/ombres/` = CANON PRODUIT** (60 PNG). Mini-jeux mj-28/33 pointent vers elle. Pas de réorg.
- ✅ **Zone `content/assets/silhouettes/` (source autoring par FAMILLE)** = gardée comme archive, aucun jeu ne la consomme.
- ✅ **Zone `site/img/dinos/silhouettes/` (par FAMILLE, reste)** = gardée comme archive, aucun jeu ne la consomme.
- ✅ **Aucun changement de chemins** : jeux finalisés pointent `ombres/`, c'est bon.

**Impact** :
- **Règle figée ajoutée** : `figees/encyclopedie.md` § IMAGES SILHOUETTES — zone ombres dino = canon, pas de nouvelle génération sans décision explicite.
- **L-D22 (frontière autoring/produit) complétée** : les 3 zones existent, le CANON = zone trackée sous `site/`.
- **Question Q-DINO-Voyage-Silhouettes RÉSOLU** (ticket clôturé, backlog).

---

## 2026-07-05 (clôture nuit) — DEC-TEMPS-PROFOND-001 + DEC-AUDIO-COMPLET-001 : 2 caps figés

**Contexte** : fin de session : validation Papa Yann mj-31 « Voyage » + gravures audio des 3 pépites.

**DEC-TEMPS-PROFOND-001 (cap figé)** :
- ✅ **Encyclopédie dino = temps profond honnête** (double registre). Contenu narré = vrais chiffres (66 Ma T-Rex, 150 Ma Stégosaure). UI affiche calculs dérivés (« 85 Ma d'écart ») tant que fidèles dinos-data.js. Pattern : sourcer TOUS les chiffres temps depuis `dates_ma` par dino, jamais inventer.
- **Impact** : toute feature complexe-temps (timeline, quiz chrono, frise) hérite du pattern. Gravure : L-D-24 backlog.md.

**DEC-AUDIO-COMPLET-001 (cap figé mj-31)** :
- ✅ **Encyclopédie dino = audio 100 % ElevenLabs** (0 TTS navigateur). Dernière phase : 60 MP3 récit-époque (3-5 sec). Livrable post-quota EL (~9-12 juillet), puis **figé** (audio complète, identité sonore MaxPlay univers).
- **Impact** : EP-D-Audio-Recap-Par-Dino prioritaire immédiat après reset quota. Blocage temporaire, déclencheur clairement daté.
- **Gravure** : L-D-25 backlog.md + ticket backlog existant `EP-D-Audio-Recap-Par-Dino` (priorité moyenne → 🔴 HAUTE après 9 juillet).

**Raison** : clôture logique — deux axes encyclopédie (temps + son) valident et figent patterns durables. Aucune régression.

---

## Questions ouvertes
- **Q-DINO-12** (2026-06-19) : **UI galerie paléoart** — faut-il implémenter galerie 5 scènes (enfant/manger/écosys/paris/fun-fact) dans la fiche dino, ou garder 1 seule vignette ? (Décision produit à trancher Papa Yann.)
- **Q-DINO-1** : faut-il faire apparaître « Ptérosaures » de façon encore plus visible (ex sous-titre dans la fiche des 2 ptérosaures) ? (soulevé 2026-06-03)
- **Q-DINO-7** (2026-06-15) : **Tritri running gag** — **TRANCHÉ OUI 2026-06-15** : 3 touches légères injectées au Crétacé (Tricératops bloc A/C, Torosaure bloc A), toutes via Wex, fluides. Gravure figée : L-D10 `backlog.md` + section Tritri `figees/encyclopedie.md`.
- **Q-DINO-8** (2026-06-15) : **3 dinos source manquants** — **TRANCHÉ/RÉSOLU 2026-06-15** : 3 entrées créées dinos-data.js (Patagotitan id patagotitan · Centrosaure id centrosaurus · Ichthyosaurus communis id ichthyosaurus), chiffres vérifiés Grokipedia, JS validé, count DINOS → 48→**51**, INVARIANTS MAJ.
- **Q-DINO-9** (2026-06-15) : **Passage sensibilité enfant** (Mosasaure « Ptéranodon gobé », T-Rex « os miettes ») — **RÉSOLU dans EP-D15** : passages rescindés en intonation « père-mère » neutre/factuelle, pas de sur-dramatisation. Détail dans textes source.
- **Q-DINO-10** (2026-06-15) : **5+ « bus de Paris » pour 10 m** — **TRANCHÉ/RÉSOLU 2026-06-15** : tous corrigés en comparaisons honnêtes via _compLong/_compHaut (camion/rue 2 voies/grand 4×4/porte selon cas). Tolérance 10 % respectée. Chiffres sources dinos-data.js authoritative.
- **Q-DINO-11** (2026-06-15, fact-check paléo) : **Liopleurodon poids 5 t en data + script vs Wikipedia ~1,8 t** — **TRANCHÉ 2026-06-15 (suite 3)** : Papa Yann « on garde 5 t, on s'en tape ». Débat scientifique accepté (1,8-5 t selon méthode), valeur haute documentée. Comparaison script « 2 hippos » inchangée. Production V3 audio poursuite normale.
- ~~**Q-DINO-2** : count réel = 50 dinos~~ → **TRANCHÉ 2026-06-03** : count autoritatif = **50** (`DINOS.length`). Le « 60 » était périmé. Confirmé par audit FORME + vérité terrain (le PMO avait halluciné « 59 » en grep-comptant dinos+familles+catégories).
- **Q-DINO-3** : les ~28 dinos sans audio complet → génération progressive ou TTS navigateur acceptable ? (quota EL)
- **Q-DINO-4** (vague Armure-Cornes 2026-06-12) : Pachycéphalosaure crâne — **25 cm (dinos-data.js)** ou **22 cm (Grokipedia)** ? Retenu 25 pour cohérence fiche encyclopédie. Si correction → aussi maj dinos-data.js.
- **Q-DINO-5** (vague Armure-Cornes 2026-06-12) : Torosaure = Tricératops adulte (théorie Scanella & Horner 2010) ? Présenté débat non résolu. Papa Yann valide ce niveau de nuance 4 ans ?
- **Q-DINO-6** (vague Armure-Cornes 2026-06-12) : Euoplocéphale ~1571 chars (juste sous 1600, léger). Étoffer (Gorgosaure, lien hoplites/armure) ou OK tel quel ?
