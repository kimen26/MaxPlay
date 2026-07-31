# Writer package — STORY-NNN <slug>

> **Fichier autoporteur** inliné dans le prompt envoyé aux writers MCP externes (Kimi/DeepSeek/Grok) qui sont stateless et n'ont pas accès au filesystem.
> Aucune référence `cf fichier X` ici — tout est intégré.
> Les writers Claude lisent les 3 briefs séparés via Read tool, pas ce fichier.

---

## 1. SUJET

**Objet titre** : <description courte de l'objet centre de gravité>
**Saison** : <printemps/été/automne/hiver — précision>
**Lieu** : <description, déjà connu de univers/>
**Arc** : <arc-1-objet-decor / arc-2-parole / arc-3-univers-specifique / arc-4-pouvoirs-wex>

---

## 2. TRIO (Wex + 2 autres)

### <perso A> (sexe)
<Ennéatype dilué (jamais nommé), 2-3 lignes sur son essence + ce qu'il apporte au groupe dans cette histoire.>

### <perso B> (sexe)
<idem>

### Wex (catalyseur)
Hors-système. Témoin lumineux. Trace ce qui se passe. Présent mais non acteur central. Peut avoir 2-3 répliques courtes.

**Surnoms 4/5 du temps** : <prénoms surnoms>. Prénoms complets <Prénom complet, Prénom complet> uniquement en moment solennel.
**Casting phonétique** : 3 prénoms phonétiquement distincts (consonnes / rythmes différents).

---

## 3. STRUCTURE — Kishōtenketsu (plan léger)

> Invariants ci-dessous. Le détail phrase par phrase est à toi.

- **Ki** : <pose la situation, ouverture>
- **Sho** : <on s'y installe, déploiement>
- **Ten — bascule passant par <perso>** : <par où elle passe (sans décrire le geste précis)>
- **Ketsu** : <ça se referme, image/rituel sans parole>

---

## 4. PROMESSE DU TITRE

<Par quoi elle se tient du début à la fin.>

---

## 5. RÈGLES DURES (saison 1)

1. Univers implicite. Aucun concept d'univers nommé.
2. Aucun adulte en scène. Enfants seuls.
3. Aucune morale dite. La découverte se vit, jamais énoncée.
4. Promesse du titre tenue.
5. Ennéatype dilué. Jamais nommer les types ou noms ennéagrammiques.
6. Sensibilités présentes mais jamais énoncées (cf. brief-personnages.md pour détail).
7. Pas d'antagoniste. Friction douce ou complémentarité, pas conflit.
8. Zéro jugement narratif. Caractères des persos = neutres toujours.

---

## 6. CONTRAINTES TECHNIQUES

- **Longueur :** 400-700 mots (texte seul)
- **Dialogues :** ≥ 2 répliques par perso, ≥ 1 échange de 3+ répliques
- **Ten silencieux** ou < 10 mots
- **Ketsu image ou rituel**, pas explication

---

## 7. CHECKLIST AUTO-COHÉRENCE (30 secondes avant remise)

- Prénoms exacts du casting (Wex + Melki, Mimi, Dadou, Madie, Lulu, Pierrot, Raph, Juju, Nono). Casting V1 figé 2026-04-24.
- Aucun personnage hors casting
- Surnoms 4/5 du temps
- Pas de "Type N" / "Challenger" / "Pacificateur" / "Performeur" / etc. dans le texte
- Pas de "j'ai compris" / "j'ai appris" / "maintenant on sait"
- Pas d'adulte en scène
- Cible 400-700 mots

Ne change PAS la voix ni la structure — corrige seulement les bugs.

---

## 8. LIVRABLE

Un fichier `4-versions-writers/<ton-id>.md` (ex: `kimi-1.md`, `deepseek-2.md`).

Frontmatter minimal :
```yaml
---
llm: <nom modèle>
role: libre (ou guidé)
temperature: <valeur>
date: YYYY-MM-DD
---
```

**Note d'intention** en fin de fichier (3-8 lignes, après séparateur `---`) : pourquoi ce choix d'ouverture / sensorialité / rythme / fermeture ?

---

**Date :** YYYY-MM-DD
**Statut :** ⏳ DRAFT / ✅ writer-package autoporteur finalisé
