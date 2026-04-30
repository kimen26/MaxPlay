# Comment on écrit une histoire MaxPlay

> Guide humain. Pas de jargon agent. Juste le déroulé, les étapes, et ce que tu dois valider.
> Dernière mise à jour : 2026-04-29

---

## En résumé (30 secondes)

```
Ton idée → Pitch validé → Plan d'Histoire → 4 versions → Lecteurs témoins →
Tu choisis → Rewrite → GateKeeper (checklist) → Version finale
```

**Toi, tu interviens à 3 moments :**
1. **Au début** — tu pitches l'idée et tu valides le pitch avec le Conseiller
2. **Au milieu** — tu valides la décision du Directeur (quelle version on garde)
3. **À la fin** — tu valides la version finale avant canonisation

Le reste, l'équipe le fait.

---

## Qui fait quoi

### Toi (l'auteur)
- Tu pitches une idée brute (dump dans `INBOX.md`)
- Tu discutes avec le Conseiller pour affûter le pitch
- **Tu valides** le pitch final
- **Tu valides** la décision du Directeur (quelle version on garde, quels éléments on récupère)
- **Tu valides** la version finale
- Tu tranches si l'équipe bloque

### Le Conseiller Narratif
- **Ton vrai binôme.** Il ne dit pas OK, il construit avec toi.
- Il pose les questions que tu n'as pas encore pensé à te poser :
  - « Les logements de l'univers — on sait à quoi ils ressemblent ? »
  - « Y'a des grands frères ou soeurs ? Ils apparaissent où ? »
  - « Les parents apparaissent dans cet arc narratif ? »
  - « Wex est dans combien d'histoires d'affilée ? Qui n'a pas eu la sienne ? »
- Il **pull les data** avant chaque session (mémoires, histoires précédentes, feedback lecteurs, univers).
- Il challenge avec des arguments, pas des opinions.
- Il maintient la **carte narrative** : arcs, casting, patterns, trous de l'univers.
- Il génère les **pitches** quand tu n'as pas d'idée.
- **Mémoire :** `memoire-conseiller.md`

### L'Architecte
- Prend le pitch validé et en fait un **Plan d'Histoire**.
- Le Plan dit : les 4 temps (Ki-Sho-Ten-Ketsu), qui est là, où, quoi, contraintes.
- **Tu ne valides pas le Plan** — il est technique. Mais tu peux le lire et dire si ça te chante pas.
- **Mémoire :** `memoire-architecte.md`

### Le Directeur Éditorial
- **Le trancheur.** Il ne brainstorme pas, il choisit.
- Il envoie le Plan aux 4 writers.
- Il reçoit les 4 versions + les réactions des lecteurs témoins.
- Il écrit `decision.md` : quelle version on garde, pourquoi, et le brief de rewrite.
- **Tu valides sa décision.**
- Il pilote le rewrite (1 cycle max).
- **Mémoire :** `memoire-dir.md`

### Les 4 Writers
- Écrivent chacun une **version complète** (400-700 mots) en parallèle.
- Chacun a un angle différent : Sobre, Sensoriel, Dynamique (dialogues), Instinct (libre).
- Chacun ajoute une **note d'intention créative** (pourquoi il a fait ces choix).
- Ils ne se parlent pas. Ils ne lisent pas les autres versions.
- **Pas de mémoire** entre les histoires (stateless).

### Les Lecteurs Témoins
- **2 enfants seuls** + **2 dyades parent-enfant**.
- Ils lisent les 4 versions et donnent un **retour texte libre**.
- Ce qu'ils aiment, ce qu'ils ont pas compris, ce qu'ils retiennent.
- **Pas de grille, pas de note sur 10.** Réaction humaine pure.

### Le GateKeeper
- **Validation technique à la toute fin.**
- Checklist rapide : prénoms corrects ? longueur OK ? dialogues présents ? pas de morale explicite ?
- **Ne réécrit pas.** Il dit PASS ou il liste 2-3 corrections rapides (5 min max).
- **Mémoire :** `memoire-gatekeeper.md`

### Le PMO
- Gère la paperasse : crée les dossiers, tient le backlog, archive les sessions.
- Génère les index (`stories/INDEX.md`, `_index/`).
- Tu ne le vois presque jamais, mais il s'assure que rien ne se perd.

---

## Le déroulé pas à pas

### Avant même l'histoire — L'Atelier Univers (régulier)
**Qui :** Toi + Conseiller
**Action :** Ce n'est pas lié à une histoire. C'est votre moment de construction narrative.
**Ce que vous faites :**
- Définir les zones floues de l'univers (logements, école, parents, grands frères/soeurs, nuit...)
- Choisir les pays pour la localisation
- Cartographier les liens familiaux
- Décider qui apparaît dans quel arc narratif
- Creuser les questions que vous n'avez pas encore tranchées
**Résultat :** Des décisions notées dans `memoire-conseiller.md` + éventuellement des tickets dans le kanban global (type "Univers").

### Étape 1 — L'idée
**Qui :** Toi
**Action :** Tu écris une idée brute dans `INBOX.md (sous une section datée)`
**Format :** Du brut. Des phrases, des mots-clés, une image. Pas besoin que ce soit propre.
**Résultat :** Un fichier dans `INBOX.md`

### Étape 2 — Le pitch
**Qui :** Toi + Conseiller (binôme)
**Action :** Le Conseiller lit ton idée. Il discute avec toi. Il challenge, affûte, propose des rebonds.
**Ce que tu dois valider :** La phrase du pitch. Exemple : *"Wex et Mimi construisent un abri pour une pie blessée."*
**Résultat :** `workshop/mon-titre/pitch.md`
**Script :** `node scripts/new-story.js "mon-titre"` (crée le dossier workshop)

### Étape 3 — Le Plan d'Histoire
**Qui :** Architecte
**Action :** L'Architecte lit le pitch + les mémoires + les histoires précédentes. Il écrit le Plan.
**Ce que tu reçois :** `workshop/mon-titre/plan-histoire.md`
- Les 4 temps détaillés
- Les personnages présents
- Les contraintes (longueur, dialogues, etc.)
**Ce que tu dois valider :** Rien d'officiel. Mais tu peux dire "j'aime pas le lieu" ou "le Ten est trop faible".

### Étape 4 — Les 4 versions
**Qui :** Les 4 Writers (parallèles)
**Action :** Le Directeur envoie le Plan à 4 writers. Chacun écrit sa version.
**Ce que tu reçois :**
- `version-a.md` (Sobre)
- `version-b.md` (Sensoriel)
- `version-c.md` (Dynamique)
- `version-d.md` (Instinct)
- Chaque fichier contient le texte complet + une note d'intention créative
**Durée :** Instantanée (ce sont des LLM)

### Étape 5 — Les lecteurs témoins
**Qui :** 2 enfants seuls + 2 dyades parent-enfant (simulés)
**Action :** Le Directeur envoie les 4 versions aux lecteurs. Ils lisent et réagissent.
**Ce que tu reçois :**
- `reactions-enfant-1.md`
- `reactions-enfant-2.md`
- `reactions-dyade-1.md`
- `reactions-dyade-2.md`
**Format :** Texte libre. "J'ai aimé le bus bleu", "J'ai pas compris pourquoi il pleure", etc.

### Étape 6 — La sélection
**Qui :** Directeur + Toi
**Action :** Le Directeur lit les 4 versions + les réactions. Il écrit `decision.md`.
**Contenu de `decision.md` :**
- Version choisie comme base (et pourquoi)
- Éléments à récupérer des autres versions
- Réactions des lecteurs à prendre en compte
- Brief de réécriture
**Ce que tu dois valider :** La décision. Tu peux dire "OK" ou "Non, je préfère la version B" ou "Récupère aussi le détail du papier plié de la version A".

### Étape 7 — Le rewrite
**Qui :** Directeur (ou writer gagnant)
**Action :** Une seule réécriture. Pas de rewrite sur rewrite.
**Ce que tu reçois :** `workshop/mon-titre/rewrite.md`
**Si ça te plaît pas :** Retour en Étape 6 (nouvelle décision).

### Étape 8 — La validation technique (GateKeeper)
**Qui :** GateKeeper
**Action :** Checklist rapide.
**Résultat :** `gatekeeper-verdict.md`
- ✅ PASS → Étape 9
- ❌ CORRECTIONS → Le Directeur applique les corrections (5 min max)

### Étape 9 — La version finale + clôture
**Qui :** Directeur + PMO
**Action :**
1. Le Directeur écrit le texte final dans `stories/<NNN-slug>/texte.md`
2. Le PMO canonise (`node scripts/archive-story.js mon-titre`)
3. Les index sont régénérés
4. Les mémoires sont mises à jour
5. Le ticket est fermé
**Ce que tu dois valider :** La version finale. C'est le dernier mot.

---

## Les fichiers générés à chaque étape

| Étape | Fichier créé | Par qui |
|-------|-------------|---------|
| 1. Idée | `INBOX.md (section datée)` | Toi |
| 2. Pitch | `workshop/<titre>/pitch.md` | Conseiller |
| 3. Plan | `workshop/<titre>/plan-histoire.md` | Architecte |
| 4. Versions | `version-{a,b,c,d}.md` | Writers |
| 5. Lecteurs | `reactions-{enfant,dyade}-{1,2}.md` | Lecteurs Témoins |
| 6. Sélection | `decision.md` | Directeur |
| 7. Rewrite | `rewrite.md` | Directeur |
| 8. GateKeeper | `gatekeeper-verdict.md` | GateKeeper |
| 9. Finale | `stories/<NNN-slug>/texte.md` | Directeur |

---

## Les règles d'or

1. **Tu as le dernier mot** — sur le pitch, sur la décision du Directeur, sur la version finale.
2. **Les lecteurs témoins ont le dernier mot sur l'émotion** — si l'enfant n'a pas accroché, on change.
3. **Pas plus d'1 rewrite** — si ça marche pas après 1 rewrite, on retourne à la sélection.
4. **Le GateKeeper ne change pas l'histoire** — il vérifie juste que les règles sont respectées.
5. **Tout reste dans `workshop/`** jusqu'à la canonisation. Rien ne traîne.

---

## Glossaire simple

| Terme | Ça veut dire quoi ? |
|-------|---------------------|
| **Pitch** | L'idée en 1 phrase. Le cœur de l'histoire. |
| **Plan d'Histoire** | Le squelette : les 4 temps, les persos, le lieu, les contraintes. |
| **Version** | Un texte complet écrit par un writer (400-700 mots). |
| **Note d'intention** | Ce que le writer a voulu faire, pourquoi (pas technique, créatif). |
| **Dyade** | Un parent qui lit à voix haute à un enfant. |
| **GateKeeper** | Le contrôleur technique à la fin (prénoms, longueur, règles). |
| **Canoniser** | Mettre l'histoire dans `stories/` — c'est officiel. |
| **Stateless** | Les writers n'ont pas de mémoire entre les histoires. Ils repartent de zéro. |
