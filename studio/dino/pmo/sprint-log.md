# Sprint-log — Pôle DINO

> Journal des sessions (plus récent en haut). Tenu par `dino-pmo`.

## 2026-06-08 — Réorg `studio/dino/content/` + features backlog

**Fait :**
- **Réorg content/** : 5 dossiers thématiques (sources/ data/ scripts/ scripts-audio/ inbox/), clarté par rôle. `__dirname` corrigés dans scripts. Régen-diff = non-régression prouvée.
- **Nouveau `data/racines.json`** : 69 racines grec/latin (généré depuis `sources/etymo/_ETYMO-RACINES-50.md` par `scripts/export/_etymo2racines.cjs`), réutilisable 3 features (Dico, Quiz, compares).
- **INDEX refondus** : hub `content/INDEX.md` + sous-INDEX sources/data/scripts. Refs MAJ studio/dino/INDEX.md + CLAUDE.md + rule dino.md.
- **Features backlog** : 5 tickets EP (Duel, Forces/faiblesses, Dico Latin/Grec, Quiz, Mini-jeu tri) — voir backlog.md.

**Décidé :** DEC-2026-06-08 réorg + flags A/B ouverts (canon périmé, brouillon 001-trex à confirmer suppression).

**État au reboot :** `studio/dino/content/` restructuré, clair et maintenable. Code non affecté (GitHub Pages identique). Prêt pour nouvelles features (data+racines.json disponibles pour consommation).

## 2026-06-03 — Refonte UI + audio + création du pôle

**Fait :**
- **UI dev-dinos** : familles en liste verticale (titres = noms scientifiques + surnom + origine grecque dite en entrant) ; intro familles courte (impact) ; onglet « Où il vivait » retiré ; « Ce qu'il mange » = 4 régimes alimentaires purs ; bouton audio fiche masqué si pas d'audio ; voyage = vignettes décoratives + indicateur d'avancement (reset session) ; ordre onglets : Familles (défaut) / Ce qu'il mange / Le voyage.
- **Familles** : « Volants & Marins » scindé → Ptérosaures + « Pas des dinosaures ! » ; Archaeoptéryx → Dromæosaures. 9 familles.
- **Audio** : 4 accroches menu en voix réelle (2-7 s) ; `recit-intro` régénéré sans « Max/doudou » ; Mosasaure « ptérosaure »→« reptile volant comme le Ptéranodon » + « bus géant »→« deux voitures ».
- **Process** : figée `encyclopedie.md` créée (Tritri, audio, UI) + hook figeage étendu (dev-dinos/dinos-data/audio/dino) + process militaire grep-interdits avant audio.
- **Pôle DINO** : créé (transverse). Contenu `game/docs/jeux/dino-encyclopedie/` → `dino/content/` ; figée → `dino/figees/encyclopedie.md`. Gouvernance pmo/ + 3 agents + rule path-scoped.

**Décidé :** voir `decisions.md` (pôle, Tritri, scission familles, régimes alimentaires, voix menus).

**État au reboot :** pôle DINO opérationnel. Code dans site/ (déployé). 50 dinos / 9 familles / 4 régimes. Tout commité + poussé (GitHub Pages).
