# Pipeline Réalité vs Pipeline Idéal

> **Document de travail interne.** À mettre à jour quand le pipeline évolue techniquement.
> Dernière mise à jour : 2026-04-28 (après constat auteur sur STORY-003)

---

## Pipeline IDÉAL (documenté dans ORGANIGRAMME.md)

```
Auteur
  ↓
Directeur (Opus) — briefs
  ↓
8 Writers PARALLÈLES (Kimi/DeepSeek/Grok/Claude agents)
  ↓
Directeur — synthèse
  ↓
Relecteurs (Kimi + Claude agents)
  ↓
Lecteurs Témoins (Claude agent + profils)
  ↓
Showrunner (si série)
  ↓
Keeper (Haiku agent) — PASS/FAIL
  ↓
Canon
```

**Nécessite :**
- MCP Kimi/DeepSeek/Grok opérationnels
- Claude Code pour invoquer les agents `.claude/agents/`
- Connexion internet stable pour les APIs externes

---

## Pipeline RÉEL (2026-04-28)

```
Auteur
  ↓
Directeur (Kimi Code CLI) — briefs + lectures + écriture de tout
  ↓
0 writer externe appelé
  ↓
version-finale.md produite par le Directeur seul
  ↓
Relecture simulée par le Directeur
  ↓
Keeper simulé par le Directeur
  ↓
Canon (si auteur valide)
```

**Ce qui fonctionne VRAIMENT :**
- ✅ Les briefs sont de qualité (templates éprouvés)
- ✅ Les mémoires sont lues et enrichies
- ✅ Les patterns de série sont respectés
- ✅ Le texte produit est littérairement correct

**Ce qui ne fonctionne PAS :**
- ❌ MCP Kimi HS depuis 2026-04-28
- ❌ Pas d'accès aux agents `.claude/agents/` depuis Kimi Code CLI
- ❌ DeepSeek/Grok jamais testés en production
- ❌ Aucun writer externe n'a jamais VRAIMENT écrit une histoire
- ❌ Relecture et Keeper jamais invoqués comme agents séparés
- ❌ Pas de comité de lecture systématique

---

## Matrice de vérité — Qui fait quoi vraiment ?

| Rôle | Agent déclaré | Qui le fait vraiment | Comment | Fréquence |
|------|--------------|----------------------|---------|-----------|
| Directeur | `narration` (Opus) | Kimi Code CLI | Lecture fichiers + rédaction | Systématique |
| PMO | `narration-pmo` (Haiku) | Kimi Code CLI | Mise à jour backlog/sprint-log | Systématique |
| Writers × 4 | Kimi/DeepSeek/Grok/Claude | **SIMULÉS par Directeur** | WriteFile simultanés | Jamais réel |
| Lecteurs Témoins | Enfant ×2 + Dyade ×2 | **SIMULÉS par Directeur** | Réactions texte libre | Jamais réel |
| GateKeeper | `narration-gatekeeper` (Haiku) | **SIMULÉ par Directeur** | Checklist manuelle | Jamais réel |
| Archiviste | `narration-archiviste` (Haiku) | Scripts Node.js | generate-index.js | Systématique |
| Audio | `narration-audio` (Sonnet) | **JAMAIS INVOQUÉ** | — | Jamais |
| Localisation | `narration-localisation` (Sonnet) | **JAMAIS INVOQUÉ** | — | Jamais |
| Lecteur Dyade | `narration-lecteur-dyade` (Sonnet) | **JAMAIS INVOQUÉ** | — | Jamais |

---

## Comment rendre le pipeline VRAIMENT segmenté

### Option A — Réparer MCP + utiliser Claude Code (Recommandé)

| Étape | Action | Qui |
|-------|--------|-----|
| 1 | Tester MCP Kimi/DeepSeek/Grok | Dev (toi) |
| 2 | Si MCP OK, invoquer writers externes depuis Claude Code | Directeur (Claude Code) |
| 3 | Invoquer agents Claude (Libre, Dialogue, Ancré) via Claude Code | Directeur (Claude Code) |
| 4 | Invoquer Keeper, Showrunner, Relecteurs comme agents séparés | Directeur (Claude Code) |
| 5 | Lire les outputs des agents dans les fichiers workshop | Directeur (Claude Code) |

**Avantage :** Vraie variance, vraie segmentation, mémoires agent séparées.  
**Inconvénient :** Nécessite Claude Code + MCP opérationnels. Plus lent (8 appels séquentiels ou parallèles).

### Option B — Hybride manuel + simulé (Court terme)

| Étape | Action | Qui |
|-------|--------|-----|
| 1 | Directeur écrit les briefs | Directeur (Kimi CLI ou Claude Code) |
| 2 | Copier-coller des briefs dans Kimi web / DeepSeek web / Grok web | Auteur (toi) |
| 3 | Récupérer les outputs, les coller dans workshop/ | Auteur (toi) |
| 4 | Directeur synthétise | Directeur |
| 5 | Auteur lit à voix haute à Max = comité de lecture | Auteur + Max |
| 6 | Keeper = checklist manuelle par Directeur | Directeur |

**Avantage :** Fonctionne tout de suite. Vraie variance si tu copies les briefs à la main.  
**Inconvénient :** Plus de travail manuel pour toi. Pas d'automatisation.

### Option C — Pipeline simplifié 3 writers (Urgence)

Si les outils externes ne sont pas réparables rapidement :
- 1 writer : Directeur en mode "Sobre" (structure Kishōtenketsu)
- 1 writer : Directeur en mode "Sensoriel" (textures, atmosphère)
- 1 writer : Directeur en mode "Dialogue" (échanges rapides)
- Pas de variance externe — mais au moins 3 angles réels, pas 8 simulés

**Avantage :** Réaliste, traçable, moins de faux-semblant.  
**Inconvénient :** Moins de variance que le pipeline idéal.

---

## Décision à prendre

**Question pour l'auteur :** Quel pipeline veux-tu vraiment utiliser pour STORY-004 ?

- **Option A** : Je répare MCP Kimi et on bascule sur Claude Code pour les agents
- **Option B** : Tu copies les briefs à la main dans Kimi/DeepSeek/Grok, je fais la synthèse
- **Option C** : On abandonne le pipe 8 writers, on passe à 3 angles simulés mais HONNÊTES

---

*Document créé après constat auteur sur manque de traçabilité et de segmentation réelle.*
