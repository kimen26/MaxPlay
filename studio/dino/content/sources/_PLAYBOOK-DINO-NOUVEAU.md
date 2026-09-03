# Playbook — Intégrer un Nouveau Dino

> **But** : schéma complet du cycle de vie « entrée data → déploiement Max ». Réponse à « quand un dino arrive, comment voir ce qui reste ? »
> 
> **Outil de suivi** : [`_ETAT-DINOS.md`](../../memory/_ETAT-DINOS.md) généré (lit dinos-data.js, sonde disque 8 axes, identifie incomplets). Branchement PMO-audit.

---

## 7 Phases du cycle

### Phase 1 : Fact-check paléontologique

**But** : valider la source (Grokipedia/Wikipedia, date/taille/poids/régime/prédation/écologie).

**Responsable** : dino-conseiller.

**Livrables** :
- ✅ Source citée (Grokipedia/Wikipedia URL)
- ✅ Verdict 43 ✅ / 6 ⚠️ / 4 🔴 (incident 2026-06-15 : fact-check paléo = **passe DISTINCTE** du fact-check chiffres data, un fait peut être daté/réfuté même si chiffre dans data)
- ✅ Corrections appliquées (Papa Yann valide)

**Durée estimée** : 30–60 min.

---

### Phase 2 : Entrée data `dinos-data.js`

**But** : créer la ligne data avec tous les champs: `id`, `sci`, `label`, `famille`, `periode`, `regime`, `taille_m`, `poids_kg`, `png`, `dico`, `color`, etc.

**Responsable** : dino-conseiller (validation) + PMO (intégration technique).

**Livrables** :
- ✅ Ligne complète dans `site/js/dinos-data.js` (vérifier `node --check` valid JSON)
- ✅ `id` minuscule stable (ex `tyrannosaurus`, `mammuthus`)
- ✅ `png` Majuscule exact (ex `Tyrannosaurus`, `Mammuthus`) correspondant disque image
- ✅ Fonctions `_compLong`/`_compHaut`/`_compPoids` appelées et sorties contrôlées (tolérance 10% vs référentiel)
- ✅ Count INVARIANTS.md MAJ
- ✅ Vérif disque : `node site/js/dinos-data.js` charge propre + `DINOS.length === N` confirmé

**Durée estimée** : 20–40 min.

**Conseil** : ne **JAMAIS** éditer dinos-data.js à la main pour les comparaisons (taille/poids) — utiliser les fonctions canoniques `_compXXX`.

---

### Phase 3 : Dialogues audio V3 (4 blocs + recap)

**But** : écrire le récit narrateur_h/Wex (11 min narré, 4 segments JSON < 2000 car chacun).

**Responsable** : dino-conseiller (écriture) + narration-audio-writer (polish oral).

**Livrables** :
- ✅ Fichier `studio/dino/content/scripts-audio/V3/<nom>-dino.md` (ex `_tricératops-dino.md`) — 4 blocs narratif
- ✅ Bloc A : étymologie (« tri = trois, cératops = cornes »)
- ✅ Bloc B : tailles comparées (sortie exacte `_compXXX`)
- ✅ Bloc C : vie/groupe/prédation (honnête, jamais gore)
- ✅ Bloc D : truc fou paléo (surprise, frivolité bienveillante)
- ✅ **4 segments JSON générés** `V3/json/_seg-<id>-A/B/C/D.json` (format MCP text-to-dialogue)
- ✅ **Grep-interdits PASSÉ** : 0 max/doudou/peluche/bus hors-échelle (règle L-D05)
- ✅ Vocabulaire 4 ans (pas de jargon savant non expliqué)
- ✅ Tritri si applicable (Tricératops + 1-2 croisant Tricé) : 2-3 touches légères via Wex

**Durée estimée** : 90–120 min (4 blocs + révision + segments JSON).

**Conseil** : Bloc B = sortie EXACTE des fonctions canoniques `_compLong/_compHaut/_compPoids` de dinos-data.js — jamais inventée.

---

### Phase 4 : Paléoart (5 scènes PNG)

**But** : générer via skill `dino-paleoart` : hero headshot (vignette) + 4 scènes (manger, paris/écosystème, funfact, écosystème — idem paris rebrand).

**Responsable** : skill `dino-paleoart` (ChatGPT/Grok projet), PMO (câblage disque/code).

**Livrables** :
- ✅ 5 images PNG déployées `site/img/dinos/paleoart/` : `{Id}_taille.jpg`, `{Id}_manger.jpg`, `{Id}_paris.jpg`, `{Id}_ecosysteme.jpg`, `{Id}_funfact.jpg`
- ✅ 1 vignette racine `site/img/dinos/{Id}.jpg` (hero, utilisé menu/dico/chrono)
- ✅ Format JPEG q85 (paléoart), WebP q90 (coloriages futur)
- ✅ Casse EXACTE des fichiers (Windows FS insensible, Linux GitHub Pages sensible — vérifier sur GitHub Pages)
- ✅ Entrée `DINO_EXTRAS` dans dev-dinos.html mise à jour si besoin
- ✅ Pas de 404 sur GitHub Pages (vérif curl `https://pages.github.io/MaxPlay/img/dinos/paleoart/{Id}_*.jpg`)

**Durée estimée** : 30–120 min (dépend quota crédit ChatGPT/Grok).

**Conseil** : échelle = absolue, enfant 1 m reference. Jamais "très grand" ni "immense" — donner hauteur exacte et calculer ratio.

---

### Phase 5 : Pack Lunii (optionnel, futur)

**But** : créer pack Lunii « famille + récit » (couverture 320×240 + audio concat + médailles progress).

**Responsable** : skill `dino-images-lunii` (ChatGPT fond noir natif) + lunii-pack-builder.

**Livrables** :
- ✅ Emblème famille `studio/dino/content/lunii/familles/{fam}.png` (320×240, 16 gris, fond noir natif)
- ✅ Pack Lunii `.zip` compilé via STUdio (transfert USB Lunii Max)
- ✅ Audio concat via `loudnorm` (1 pass, cohérence volume)

**Durée estimée** : 60–90 min (après audio V3 complet).

**Conseil** : Lunii = **voix réelle ElevenLabs uniquement** (jamais TTS navigateur). Audio source = MP3 V3 existants concaténés.

---

### Phase 6 : PMO (tickets + leçons + INVARIANTS)

**But** : logger la tâche, créer ticket suivi, graver leçon si nouveau pattern, MAJ counts.

**Responsable** : dino-pmo.

**Livrables** :
- ✅ Entrée backlog.md : ticket EP-D-XX (si chantier > 1 session) OU juste loggé sprint-log si autonome
- ✅ INVARIANTS.md counts maj (dinos, familles, périodes, régimes)
- ✅ Leçon L-D-NN si pattern nouveau gravé
- ✅ Décision datée dans decisions.md si arbitrage
- ✅ Figée maj si règle validée Papa Yann

**Durée estimée** : 20–40 min.

---

### Phase 7 : Git (commit + push + GitHub Pages)

**But** : persistance (disque GitHub Pages = vérité Max).

**Responsable** : assistant/PMO.

**Livrables** :
- ✅ `git add <fichiers exacts par chemin>` (jamais `-A` staging concurrent)
- ✅ `git commit -m "feat(dino): <nouveau dino + phases faites>"`
- ✅ `git push origin master`
- ✅ Test GitHub Pages : image + audio chargent, 0 erreur console
- ✅ Max voit le nouveau dino (refresh app PWA)

**Durée estimée** : 10–20 min.

**Conseil** : Toujours tester sur GitHub Pages après push (FS casse-sensible Linux ≠ Windows). Vérifier `DINOS.length` en console.

---

## Checklist Dino Complet (8 axes)

Chaque dino **fini** doit avoir :

- [ ] **Hero** : vignette racine `site/img/dinos/{Id}.jpg`
- [ ] **5 scènes paléoart** : `{Id}_taille`, `{Id}_manger`, `{Id}_paris`, `{Id}_ecosysteme`, `{Id}_funfact`
- [ ] **Coloriage** : `{Id}_coloriage.webp` (optionnel v1, futur)
- [ ] **5 segments audio** : `site/audio/dinos/{id}-nom.mp3`, `-taille.mp3`, `-regime.mp3`, `-funfact.mp3`, `-recap.mp3`
- [ ] **Silhouette** : `content/assets/silhouettes/<fam>/<fam>-sNNrRcC.png` (banque visuelle)
- [ ] **Fiche fact-checkée+relue-péda** : récit V3 fact-check appliqué + dino-conseiller + narration-conseiller OK
- [ ] **Étymo** : entrée `data/racines.json` générée (via `_etymo2racines.cjs`)
- [ ] **Mesures** : data dinos-data.js complet (taille, poids, régime, comparaisons)

**Suivi** : outil _ETAT-DINOS.md affiche complet/incomplet par axe.

---

## Workflow Optimisé (par type tâche)

### Nouveau dino unique (60e exemple)
1. Fact-check 30 min (dino-conseiller)
2. Data 20 min (PMO insertion + vérif node)
3. Dialogues 90 min (dino-conseiller + narration-audio-writer)
4. Paléoart 60+ min (skill dino-paleoart, chatgpt/grok)
5. PMO 20 min (INVARIANTS, sprint-log)
6. Git 10 min (commit + push)
**Total** : 230–240 min (~4h) pour un dino solo en fast-path.

### Batch 8–9 dinos (Cénozoïque 2026-07-03)
1. Fact-check batch (dino-conseiller) : 2–3h
2. Data batch (PMO) : 30 min
3. Dialogues batch (dino-conseiller) : 5h
4. Paléoart batch (skill) : 3–8h (crédit GPT/Grok bottleneck)
5. PMO consolidé (dino-pmo) : 1h (tickets + INVARIANTS groupe)
6. Git batch : 20 min
**Total** : 12–18h (~1.5 jours) pour 8–9 dinos.

---

## Anti-patterns (à éviter)

- ❌ **Écrire dialogues sans fact-check paléo** → récits contredisent la source
- ❌ **Inventer comparaisons taille** → mensonges quasi garantis, L-D08 gravée
- ❌ **Copier dialogues d'un autre dino** → grief pédago, chaque bête = unique
- ❌ **Oublier `grep-interdits` avant audio** → incident « doudou de Max », L-D05 gravée
- ❌ **Lancer audio sans validations phases 1–3** → gaspille quota EL, audio invalide
- ❌ **Éditer dinos-data.js à la main** → divergence vs scripts canoniques, L-D06 gravée
- ❌ **Commit sans tester GitHub Pages casse-sensible** → 404 silencieux Max, L-D17 gravée
- ❌ **Stager sans commiter vite** → staging concurrent emporte fichiers (L-D16), jamais se fier au message commit solo

---

## Documents de référence

- [`INVARIANTS.md`](../../memory/INVARIANTS.md) — source vérité chiffres clés + checklist 8 axes
- [`_ETAT-DINOS.md`](../../memory/_ETAT-DINOS.md) — audit généré (incomplets d'abord)
- [`figees/encyclopedie.md`](../../figees/encyclopedie.md) — règles verrouillées (Tritri, audio, UI, prédation)
- [`DECISIONS.md`](../../memory/DECISIONS.md) — arbitrages Papa Yann (Q-DINO-xx)
- [`_ETYMO-COMPLET-60.md`](../sources/etymo/_ETYMO-COMPLET-60.md) — racines greco-lat (source étymo)
- [`RECITS-EPOQUES.md`](../sources/recits/RECITS-EPOQUES.md) — 8 récits voyage (canon nommé, versionning par archive)

---

## Contacts spécialistes

- **dino-conseiller** : contenu sémantique, fact-check, écriture dialogues, péda 4 ans
- **narration-audio-writer** : polish oral, fluidité, voix enfant, Kimi CLI
- **dino-paleoart** skill : génération images paléoart ChatGPT/Grok
- **dino-pmo** : persistance gouvernance (INVARIANTS, decisions, sprint-log, backlog)
- **dino-pmo** (unifié 2026-07-19) : structure, refs, orphelins disque

---

**Version** : playbook gravé 2026-07-03 post DEC-GED-001. Révisable si découverte nouvelle phase, jamais à la légère.
