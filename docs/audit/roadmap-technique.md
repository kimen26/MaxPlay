# Roadmap technique — MaxPlay

> Cadrage des chantiers techniques court / moyen / long terme. Décisions de scope + options évaluées.
> Références : [jeux-2026-04.md](jeux-2026-04.md) · [factorisation.md](factorisation.md) · [benchmark-kids-games.md](../research/benchmark-kids-games.md)

## 1. Cadre

- **Cible** : Max, 3.5-4 ans aujourd'hui, jouera 2-5 ans (projet long terme).
- **Contrainte forte** : simplicité d'ajout d'un jeu (1 fichier HTML dans `game-html/` + 1 carte menu).
- **Contrainte déploiement** : GitHub Pages statique (pas de backend).
- **Stack actuelle** : HTML vanilla + JS ES5/ES6 sans bundler (17 MJ) + 1 Phaser/Vite (MJ-07).
- **Budget temps** : soirs / week-ends. Tout chantier > 1 jour doit pouvoir se faire par lots.

## 2. Court terme (1-4h par item)

Priorités immédiates, faisables en une soirée.

| # | Chantier | Valeur | Effort | Dépend de |
|---|---|---|---|---|
| C1 | Appliquer **vague 1** factorisation CSS (base/ui/anim.css) sur MJ-14/15/16 pilote | Cohérence UX | 2h | — |
| C2 | Ajouter `tracker.js` à MJ-17, 13a, 13b, 13c | Stats complètes dans suivi.html | 30min | — |
| C3 | Ajouter `sounds.js` + `feedback.js` à MJ-14, 15, 16, 17 + remplacer confettis inline | Sons cohérents partout | 1h | — |
| C4 | ✅ **Fait** — mj-13-proto.html supprimé. Reste : masquer dev-lab/dev-dinos/mj-12 du menu Max | Menu propre | 20min | — |
| C6 | Mode **bac à sable MJ-17** (toggle "Village libre" sans score) | Boucle open-ended façon Toca/Sago | 2h | — |
| C7 | TTS systématique des consignes (utiliser `js/tts.js` à créer) | Accessibilité non-lecteur | 3h | Vague 3 factorisation |
| C8 | Lighthouse audit + corrections évidentes (meta viewport, alt, contraste) | A11y mesurable | 1h | — |

## 3. Moyen terme (1-3 jours par item)

| # | Chantier | Valeur | Effort | Dépend de |
|---|---|---|---|---|
| M1 | **Extraction JS** — `tts.js`, `dnd.js`, élargissement `feedback.js` (shake, sparkle) | Base saine pour la suite | 1j | C1-C3 |
| M2 | **PWA + offline** — service worker, manifest, installable sur tablet Max | Utilisable sans wifi, icône écran d'accueil | 1j | — |
| M3 | **Nouveau MJ : Mémoire (paires bus)** | Format manquant (benchmark §5) | 1j | M1 |
| M4 | **Nouveau MJ : Reconstruire un bus (puzzle)** | Proposé, fit univers (benchmark §5) | 1.5j | M1 |
| M5 | **Scinder MJ-08** en html + js externe (834l → 400+400) | Maintenabilité | 0.5j | — |
| M6 | **Mascotte Wex** en coin du menu + apparition entre rounds | Lien pôle narration | 1j | décision prénoms narration |
| M7 | **Télémétrie enrichie** — tracker.js → localStorage + export JSON pour suivi.html | Voir progrès Max sur la durée | 0.5j | C2 |

## 4. Long terme (semaines / mois)

| # | Chantier | Valeur | Effort | Risque |
|---|---|---|---|---|
| L1 | **Hub 2D Phaser exploratoire** (MJ-07 étendu) — Max conduit dans un quartier, entre dans des bâtiments pour lancer un MJ | UX premium style Tayo/Toca Life | 2-3 sem | Scope créatif |
| L2 | **Narration interactive** — fusion pôle jeu / pôle narration, 1 mini-histoire/soir avec choix | Différenciation forte, alignement avec univers post-Éveil | 2 sem | Dépend du pôle narration |
| L3 | **Mode coopératif parent/enfant** (2 taps) | Moment partagé | 1 sem | Utilité réelle ? |
| L4 | **TypeScript migration** du vanilla | Robustesse à grande échelle | 2-3 sem | Rupture avec "simplicité" |
| L5 | **Internationalisation** (PT-BR pour origines brésiliennes de Max, EN) | Max bilingue futur | 1 sem | Bundle TTS voix |
| L6 | **Gamification longue** : passeport bus, médailles cumulées, déverrouillage MJ | Engagement sur plusieurs mois | 1 sem | Risque dérive "rewards" contraire à la philo |

## 5. Décisions techniques à arbitrer

### 5.1 Garder HTML vanilla ou migrer TS/bundler ?
**Décision proposée : garder vanilla pour HTML, TS seulement côté Phaser.**  
- Vanilla = ajout d'un MJ en 1 fichier, zéro ceremony, déploiement trivial.
- TS utile quand : >20 MJ, besoin de types partagés, équipe >1 dev.
- Seuil de bascule : quand `game-html/js/` dépasse ~10 modules ou qu'on a besoin de génériques.

### 5.2 PWA oui/non ?
**Décision proposée : oui, vague 2, courant 2026.**  
Gain utilisateur direct (Max en voiture, sans wifi). Coût ~1j.

### 5.3 Phaser MJ-07 : quel avenir ?
Options :
- **A) Laisser dormir** — MJ-07 reste embryon, ne pas investir.
- **B) Refonte en Hub exploratoire** (L1) — très gros chantier mais vitrine.
- **C) Simple scène sandbox étendue** — sans ambition de hub complet.

**Reco** : C maintenant, B plus tard si Max montre de l'intérêt pour le Phaser existant.

### 5.4 Backend ou pas ?
- Pas besoin aujourd'hui (stats en localStorage, pas de multi-device).
- Si besoin un jour : Supabase/Firebase pour synchro cross-device tablet Max + autre.
- Pour l'instant : **non**.

## 6. Qualité & process

### 6.1 Tests
- **État** : 0 test automatisé sur la partie HTML vanilla.
- **Option A** : Playwright sur les MJ critiques (1 test de smoke par MJ). Effort : 1-2j.
- **Option B** : snapshot visuel (Percy, Chromatic). Moins adapté à l'interactif.
- **Reco** : Playwright smoke (lance le MJ, vérifie que le 1er bus/question apparaît) — ajouté en vague dédiée.

### 6.2 CI
- Workflow `deploy.yml` fonctionne. À enrichir avec :
  - `npm audit` (si on introduit des deps)
  - Lighthouse CI sur le menu + 3 MJ phares (seuils A11y ≥ 90)
  - Link-check sur les `.md`

### 6.3 Observabilité
- Aucun log / analytics aujourd'hui — cohérent avec "pas de pub, pas de tracking, 1 seul enfant".
- `suivi.html` = dashboard interne, lit le `localStorage`. Suffisant.

## 7. Risques transverses

| Risque | Probabilité | Mitigation |
|---|---|---|
| Max se lasse d'un MJ | Haute (normal) | Rotation des MJ mis en avant, rafraîchir visuels |
| Régression silencieuse après factorisation | Moyenne | Vagues petites + test manuel + Playwright smoke (à venir) |
| Scope narratif (pôle narration) retarde mascotte | Moyenne | Découpler : Wex confirmé donc utilisable sans attendre les autres prénoms |
| Tablet Max évolue (plus grande, autre ratio) | Basse | Layout fluid déjà, tester périodiquement |
| Perte de motivation dev (projet perso) | Basse | Backlog léger + gains visibles rapidement (short term d'abord) |

## 8. Ordre d'attaque proposé

```
1. C4 + C5  (nettoyage rapide, 35min total)
2. C2 + C3  (imports manquants, 1h30)
3. C1       (vague 1 factorisation CSS pilote MJ-14, 2h)
4. C6       (sandbox MJ-17, 2h)
5. M1       (extraction tts.js + dnd.js, 1j)
6. C7       (TTS consignes partout, 3h)
7. M2       (PWA, 1j)
8. M3 ou M4 (nouveau MJ selon envie Max, 1-1.5j)
9. M6       (mascotte Wex, 1j)
10. M7      (télémétrie enrichie, 0.5j)
```

Reste à caler long terme (L1-L6) après ces 10 jalons.

## 9. Livrables associés

- [jeux-2026-04.md](jeux-2026-04.md) — qu'est-ce qu'on a aujourd'hui
- [factorisation.md](factorisation.md) — comment nettoyer sans casser
- [benchmark-kids-games.md](../research/benchmark-kids-games.md) — d'où viennent les idées
- **Ce doc** — quand on fait quoi et pourquoi

## 10. Métadonnées

- **Date** : 2026-04-22
- **Auteur** : session Claude + validation utilisateur
- **Revue** : à refaire tous les ~3 mois ou après chaque gros jalon
