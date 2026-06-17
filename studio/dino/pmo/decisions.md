# Décisions — Pôle DINO

> Décisions datées (raison + impact). Les décisions **verrouillées** (jamais régresser) vivent dans [`../figees/encyclopedie.md`](../figees/encyclopedie.md).

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

## Questions ouvertes

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
