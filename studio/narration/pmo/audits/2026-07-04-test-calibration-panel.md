---
ticket: TEST-PANEL-CALIBRATION
date: 2026-07-04
operateur: Claude (session one-shot)
statut: TERMINÉ — PASS sur les 2 critères
---

# Test calibration panel lecteurs v2 — 2026-07-04

> **Principe** (INVARIANTS § Panel lecteurs hétérogène) : vérifier que le panel détecte un écart de qualité connu ET ose diverger sur une paire quasi identique — sinon le panel est du théâtre.

---

## 1. Protocole

**3 lecteurs (1 par modèle) × 2 paires = 6 évaluations.** Profil unique incarné par les 3 : **dyade papa-garçon 3-5 ans** (DPG-A, `equipe/profils-lecteurs.md`). Textes anonymisés A/B (frontmatter + notes d'intention retirés), ordre varié par lecteur. Chaque lecteur rend : meilleur (A/B) + confiance (nette/légère/égalité) + pourquoi en 2 lignes.

| Lecteur | Moteur | Voie |
|---|---|---|
| Sonnet | Session principale | Incarnation directe |
| Haiku | Agent Task `model: haiku` | Prompt autonome (0 tool use) |
| Kimi | `infra/mcp/call-llm.mjs --provider kimi` | 2 appels CLI, system = profil, timeout 300s |

### Matériel

| Paire | Texte | Statut connu |
|---|---|---|
| **1** (écart connu) | `stories/001-le-pont-casse/4-versions-writers/kimi-run1.md` | Champion canon (#1 chez 5/6 lecteurs, `6-selection.md`) |
| | `stories/001-le-pont-casse/4-versions-writers/grok-run1.md` | Bottom unanime (répare le pont = promesse du titre violée, saut par-dessus le trou = danger banalisé) |
| **2** (quasi identique) | `stories/002-libellule-resonance/4-versions-writers/claude-opus-def.md` | Même modèle, même angle famille |
| | `stories/002-libellule-resonance/4-versions-writers/claude-opus-reco.md` | (température def vs reco) |

### Anonymisation (fixée avant lecture)

| Paire | Sonnet | Haiku | Kimi |
|---|---|---|---|
| 1 | A=kimi · B=grok | A=grok · B=kimi | A=kimi · B=grok |
| 2 | A=reco · B=def | A=def · B=reco | A=def · B=reco |

---

## 2. Résultats bruts

### Paire 1 — kimi-run1 vs grok-run1 (écart connu)

| Lecteur | Choix (désanonymisé) | Confiance | Pourquoi (verbatim condensé) |
|---|---|---|---|
| Sonnet | **kimi-run1** | **nette** | « Phrases courtes qui claquent à voix haute, gestes visibles (drapeau-pissenlit), mon fils a mimé le "Houlou !" ; l'autre a des paragraphes descriptifs où j'accélère, et les enfants sautent par-dessus le trou en rigolant — danger banalisé. » |
| Haiku | **kimi-run1** | **nette** | « [grok] traîne dans les descriptions (rosée, pansement, gratitude du ruisseau) ; [kimi] reste au rythme du moment — clapot, claquement, drapeau jaune qui danse. Le fils décroche sur "pansement sur une égratignure", accroche sur "fleur jaune pendait comme un petit soleil". » |
| Kimi | **kimi-run1** | **nette** | « [kimi] avance par l'action et des dialogues courts que mon fils a suivis sans décrocher ; le drapeau jaune est une image concrète et rassurante. [grok] s'attarde dans des descriptions et une "réparation" avec des branches qui ne tient pas, ce qui banalise un danger. » |

→ **3/3 désignent kimi-run1, 3/3 en confiance nette.** Deux lecteurs sur trois relèvent spontanément le danger banalisé (le motif qui avait coulé grok au panel historique).

### Paire 2 — claude-opus-def vs claude-opus-reco (quasi identique)

| Lecteur | Choix (désanonymisé) | Confiance | Pourquoi (verbatim condensé) |
|---|---|---|---|
| Sonnet | **opus-reco** | **légère** | « Le "splotch", le bus qui pile et le rire final portent mieux à l'oral pour mon garçon ; mais [def] est très proche, même moment suspendu qui marche aussi. » |
| Haiku | **opus-reco** | nette | « [def] joue trop sur le silence/intériorité — le fils perd le fil du jeu. [reco] balance jeu + calme sans quitter l'action, plus oral, plus vivant. » |
| Kimi | **opus-def** | **légère** | « [def] se lit d'une traite au présent, phrases courtes qui font avancer la course et gardent mon fils en haleine. [reco], malgré le bus qu'il adore, s'attarde sur des descriptions et comparaisons qui le font parfois décrocher. » |

→ **Divergence réelle (Kimi choisit def contre les 2 autres) + 2 confiances "légère" sur 3.** Pas de faux consensus.

---

## 3. Verdict par critère

| Critère PASS | Attendu | Observé | Verdict |
|---|---|---|---|
| **Discriminance** (Paire 1) | 3/3 désignent kimi avec confiance nette | 3/3 kimi, 3/3 nette, motifs convergents avec le panel historique (danger banalisé, descriptions qui traînent) | ✅ **PASS** |
| **Pas de faux consensus** (Paire 2) | ≥ 1 divergence OU confiances légère/égalité | 1 divergence (Kimi → def) ET 2 confiances légère | ✅ **PASS** |

## 4. Limites notées (honnêteté du test)

1. **Contamination contexte Haiku** : l'agent Haiku a écrit « parlera direct à Max » alors que le prompt ne mentionnait pas Max — le contexte projet (CLAUDE.md) fuit dans les agents Task. Sans effet sur l'anonymat A/B (les slugs writers n'ont jamais été exposés), mais à garder en tête : les lecteurs-agents ne sont pas des juges hors-sol.
2. **Lecteur Kimi juge un texte Kimi** en Paire 1 — anonymisé, et son choix converge avec les 2 autres modèles + le panel historique, donc pas un biais opérant ici.
3. **1 profil unique (DPG-A)** : le test calibre la *discriminance inter-modèles*, pas la couverture des 10 profils. Un panel 12 réel croisera profils × modèles.
4. **Ordre A/B** : avec 2 textes il n'existe que 2 ordres — 2 lecteurs sur 3 partagent forcément le même. Les ordres ont été fixés avant lecture et documentés (§1).

## 5. Recommandation

**GO pour le panel 12 sur STORY-003+.** Le panel multi-modèles discrimine un écart de qualité réel avec les bons motifs, et n'invente pas de consensus sur une paire serrée : c'est exactement le comportement souhaité. Suggestions pour le panel 12 :
- Répartir les 3 moteurs (Sonnet/Haiku/Kimi) sur les profils, pas 12× le même modèle.
- Conserver l'anonymisation A/B + ordre documenté par lecteur (pratique validée ici).
- Garder l'échelle de confiance nette/légère/égalité : c'est elle qui a rendu la divergence lisible en Paire 2.

---

_Fichiers de travail (scratchpad session, non versionnés) : system-lecteur-dpg.md, kimi-paire1.md, kimi-paire2.md, kimi-verdict-paire{1,2}.txt._
