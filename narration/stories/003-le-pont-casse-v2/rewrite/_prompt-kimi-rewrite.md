---
type: prompt-LLM (à envoyer via MCP ask_kimi post-reboot)
date_preparation: 2026-05-08 (refondu — version minimaliste)
temperature_recommandee: 0.3 (très basse, pour préserver la voix originale au maximum)
modele: kimi-k2.6 (ou fallback kimi-for-coding)
philosophie: "auteur seul avec son texte et sa note d'intention — aucune injection externe"
---

# Prompt Kimi rewrite — version MINIMALE

> **Philosophie tranchée 2026-05-08** (John) : *« Juste on donne son texte au meilleur writer et les/ses notes d'intention aussi. »*
>
> Pas de greffes proposées. Pas de synthèse lecteurs. Pas de passages saillants des autres versions. **Aucune injection externe.** L'auteur du top 1 (Kimi) se relit seul avec sa propre vision et peaufine *si* il sent que ça mérite.
>
> Logique : kimi-run1 a été #1 chez 5/6 lecteurs **sans avoir vu les autres versions**. Lui injecter les leçons des autres = casser ce qui a fait son succès. Les leçons cross-stories vivent dans `equipe/lecons-vivantes.md` pour les writers des **futures** histoires, pas pour ce rewrite.

---

## PROMPT À ENVOYER

```
Tu es l'auteur d'une histoire courte pour enfants 4-5 ans intitulée "Le pont cassé".

Tu en avais écrit 2 versions. Ta première version (kimi-run1) a été élue **#1 sur 10 versions** par 5 lecteurs sur 6 (panel : enfants seuls + dyades parent-enfant). C'est le top 1 incontesté. **Sans avoir lu les autres writers, sans aucun conseil extérieur, ton instinct a produit la version qui résonne le mieux chez les enfants.**

On te propose maintenant un **dernier passage de relecture** sur ton propre texte. Pas de réécriture. Pas de greffe. Juste : tu te relis avec ta propre note d'intention en tête, et **si** tu sens qu'une phrase peut être un peu plus précise, un mot un peu plus juste, un rythme un peu plus tendu — tu peaufines. Sinon, tu laisses tel quel.

**Règles dures** :
- Tu ne lis aucune autre version writer.
- Tu n'as accès à aucun retour lecteur.
- Tu peaufines uniquement à l'aune de TA note d'intention.
- Cible : 535-560 mots (kimi-run1 fait 535). Si tu n'as rien à changer, le texte sort identique. C'est OK.
- **Garde l'imparfait** (« courait », « claquaient ») — c'est ta signature de conte.
- **Garde l'ouverture sensorielle** (mousse, baskets, pissenlits) — elle préfigure le drapeau-pissenlit final.

À la fin, ajoute une **Note de relecture** (3-5 phrases) :
1. Combien de modifications tu as faites
2. Pourquoi tu les as faites (ou pourquoi tu n'as rien changé)
3. Si tu sens qu'une zone aurait pu être améliorée mais que tu as choisi de ne pas y toucher

---

## TON TEXTE — kimi-run1

[INSÉRER ICI le texte complet de kimi-run1.md, sans le frontmatter]

---

## TA NOTE D'INTENTION ORIGINELLE

[INSÉRER ICI la note d'intention de kimi-run1.md (ligne 79)] :

« Ouverture en mouvement pour plonger directement dans la scène sans exposition. POV externe neutre qui glisse d'un enfant à l'autre selon qui porte l'action ou la réaction, sans jamais hiérarchiser. Le Ten opère par l'objet : la branche cassée ramassée au sol déplace le regard du trou-lacune vers le trou-signal, transformant l'obstacle en geste de soin collectif sans jamais réparer la planche. Le Ketsu honore la promesse du titre en gardant le pont cassé au centre : il est marqué, traversé avec précaution, et demeure présent dans le paysage final. Pas de morale, juste une résolution vécue qui sonne vrai pour des 4-5 ans. »

---

## SORTIE ATTENDUE

```yaml
---
llm: kimi-k2.6
role: rewrite-self (auteur top 1 se relit avec sa note d'intention)
temperature: 0.3
date: 2026-05-08
mots: ~XXX
modifications: N (nombre de phrases touchées)
---

# Le pont cassé

[ton texte peaufiné, ou identique si rien ne mérite]

---

## Note de relecture

[3-5 phrases]
```

À toi.
```

---

## NOTES POUR LE LANCEMENT

- **Temperature : 0.3** (encore plus basse que prévu — pour minimiser la dérive)
- **Modèle** : `kimi-k2.6` si auth platform.moonshot.ai marche, sinon fallback `kimi-for-coding`
- **Reboot requis** avant de lancer (server.ts repatché : Kimi sur api.kimi.com/coding/v1, DeepSeek thinking:false retiré)
- **Output attendu** : un fichier complet ~535-560 mots + Note de relecture. Sauvegardé en `rewrite/kimi-rewrite-v1.md`.

## SI KIMI NE TOUCHE QUASI RIEN

C'est un signal positif — kimi-run1 était déjà optimal selon son auteur. Plan de canonisation :

**Plan A (probable)** : kimi sort un texte quasi-identique → on canonise **kimi-run1** comme `texte.md`.

**Plan B (si kimi peaufine 5-15 phrases)** : on compare kimi-run1 brut vs kimi-rewrite-v1 au panel relecture étape 9. Le meilleur des 2 devient canon.

**Plan C (si kimi sur-réécrit)** : on garde kimi-run1 tel quel, on archive kimi-rewrite, on canonise.

## CE QUE LES LEÇONS LECTEURS DEVIENNENT

Elles ne sont **pas perdues** — elles vont dans [`equipe/lecons-vivantes.md`](../../equipe/lecons-vivantes.md) (à créer) pour alimenter :
- Le Conseiller quand il fait le pitch des futures histoires
- L'Architecte quand il fait le plan
- Les writers des **histoires suivantes** (pas celle-ci)

C'est cohérent avec la philosophie « un writer ne lit pas les retours sur son texte mais profite des patterns globaux pour le suivant ».

## VS L'ANCIEN PROMPT

L'ancien prompt (que j'avais préparé hier) injectait :
- Les 2 versions kimi (run1 + run2)
- Des passages saillants des 5 autres writers
- La synthèse des 6 lecteurs avec citations
- Un brief de rewrite avec greffes proposées

→ Trop d'injection, risque de dilution + cherry-picking par Kimi.

Le nouveau prompt injecte :
- Sa version kimi-run1 (sans run2)
- Sa note d'intention

→ Pure relecture d'auteur, pas de pollution.
