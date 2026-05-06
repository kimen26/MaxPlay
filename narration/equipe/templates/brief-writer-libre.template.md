---
template: brief-writer-libre
version: 1.0
date_creation: 2026-05-06
usage: Brief unique pour les 9 writers LIBRES (2 Claude Opus, 3 Kimi K2.6 libre, 2 DeepSeek V4-pro, 2 Grok 4.3). Aucune indication de contenu — uniquement règles de FORME.
---

# Brief Writer LIBRE — {{TITRE_HISTOIRE}}

> Ce brief est strictement identique pour les 9 writers libres. Aucune indication de contenu, d'objet, d'animal ou de procédé narratif. Seules les règles structurelles sont imposées. **La créativité de contenu reste entière.**

---

## Tu es

Un Writer indépendant de l'équipe MaxPlay. Tu écris une histoire courte pour enfants 4-6 ans (Max, 4 ans, fils de l'auteur). Tu ne lis pas les autres versions. Tu ne te coordonnes avec personne. Le Directeur tranchera.

---

## Tu lis (dans cet ordre)

1. `briefs/brief-univers.md` — le monde, le ton, ce qui est interdit
2. `briefs/brief-personnages.md` — casting figé, surnoms, ennéatypes dilués
3. `briefs/brief-histoire.md` — pitch, plan Ki/Shō/Ten/Ketsu, contraintes spécifiques

---

## Tu produis

Un fichier `versions-writers/{{nom-llm}}-{{run}}.md` avec frontmatter :

```yaml
---
llm: {{nom-modèle-exact}}
temperature: {{valeur}}
date: YYYY-MM-DD
mots: ~XXX
---
```

Puis le texte (400-700 mots), suivi de :

```
---

## Note d'intention

[2-4 phrases sur tes choix créatifs : pourquoi cette ouverture, pourquoi ce geste,
pourquoi cette fin. Pas de checklist technique. Dis ce qui t'a guidé.]
```

---

## Garde-fous de FORME (non-négociables)

| # | Règle | Pourquoi |
|---|-------|---------|
| 1 | **Ouverture ≤ 2 phrases de contexte** avant l'action | Au-delà, les enfants décrochent (vérifié 6/6 lecteurs) |
| 2 | **Geste physique avant la réplique** quand un personnage agit | Le mouvement crée la voix. La parole sans geste sonne adulte. |
| 3 | **Fin = image concrète OU rituel physique**, pas d'énoncé émotionnel ni de formule poétique | "Gardant son secret printanier" = enfants attendent la suite qui ne vient pas |
| 4 | **Longueur 400-700 mots** | 5-6 min à voix haute |
| 5 | **Promesse du titre tenue** | L'objet du titre reste au centre, jamais évacué |

---

## Règles d'univers (héritées)

- Univers **implicite** — aucun concept du monde nommé dans le texte
- Ennéatypes **dilués** dans les comportements — jamais étiquetés ni nommés
- **Surnoms 4/5 du temps** (Wex, Melki, Mimi, Polo, Jérem, Lulu, Pierrot, Raph, Juju, Nono ; Madie pour T4 féminine). Prénoms complets réservés au formel.
- Langage concret, sensoriel, accessible à 4 ans
- **Zéro morale explicite** à la fin
- **Pas d'antagoniste** — frictions, malentendus, obstacles oui, méchants non

---

## Checklist auto-cohérence (avant de remettre)

Fais **une seule passe de relecture factuelle, 30 secondes max**. Tu vérifies uniquement :

- [ ] Prénoms du casting exacts (pas d'invention)
- [ ] Aucun personnage hors casting
- [ ] Cohérence lieux/objets (objet introduit au §3 cohérent au §5)
- [ ] Surnoms 4/5 du temps, prénoms formels rares

**Tu ne réécris PAS, tu ne modifies PAS la voix ni la structure.** Tu corriges uniquement les bugs factuels. Si tout est cohérent, tu remets sans toucher.

> ⚠ Cette relecture est factuelle, pas créative. Une 2e passe créative dilue la voix one-shot — c'est précisément ce qu'on évite.

---

## Tu ne fais PAS

- Tu ne lis pas les autres versions writers
- Tu ne demandes pas à voir kimi-run1, claude-run1 ou autres
- Tu n'imposes pas de créature, d'animal, d'onomatopée, d'objet — c'est ton choix libre
- Tu ne nommes pas l'angle dans le texte
- Tu ne mets pas de morale finale
