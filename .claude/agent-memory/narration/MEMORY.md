# Mémoire — Directeur Éditorial

> Mis à jour par `narration` après chaque décision importante.
> Format : `- YYYY-MM-DD | <décision> | <raison>`
> Déplacé verbatim depuis `studio/narration/equipe/memoire-dir.md` le 2026-09-03 (HO-G12).

## Décisions de fond

- 2026-04-24 | Univers IMPLICITE dans les histoires | Les concepts (Éveil, Totems, Gardiens...) ne sont jamais nommés dans les textes — ils infusent les comportements
- 2026-04-24 | Ennéatypes DILUÉS | Jamais étiquetés, visibles uniquement dans les actions et réactions des personnages
- 2026-04-24 | Casting V1 "Christ" FIGÉ | Wex (#7 hors-système) + 9 compagnons avec surnoms — voir personnages/INDEX.md
- 2026-04-24 | Structure préférée : Kishōtenketsu | 4 actes sans antagoniste — adapté à l'âge et à nos valeurs
- 2026-04-28 | Process éditorial 5 writers → 8 writers | Ajout des angles sobre / sensoriel / dynamique-dialogue sur les writers externes. Plus de variance, plus de dialogues.
- 2026-04-28 | Pas d'épilogue italique | À partir de 002, le texte se tient seul. Le Pont Cassé reste exception (premier texte).
- 2026-04-28 | Fourchette P2 figée | 400-700 mots pour le palier 4-6 ans. Jamais plus, rarement moins.
- 2026-04-28 | Dialogues = priorité | Les personnages sont vivants. 3-5 mots par réplique minimum, privilégier l'échange.
- 2026-05-03 | **Briefs en mode cadre seulement (arc 1)** | Le brief pose sujet + arc + style + longueur. Garde-fous délégués à la patte Papa Yann + GateKeeper étape 8. Pas de chorégraphie de gestes/répliques/silences. Le but du test multi-LLM = comparer 8 cerveaux sur le MÊME brief — un brief qui écrit l'histoire à 90% ne compare que 8 calligraphies. Recadrage Papa Yann sur briefs 003-v2 trop directifs.
- 2026-05-03 | **Règle F — pas de négations inutiles** | Quand Papa Yann dit "on n'a pas besoin de mentionner X", on n'écrit RIEN sur X. La négation crée un fantôme du sujet (un writer peut le ré-allumer en formulant l'inverse). Test : un lecteur naïf du brief évoquerait-il spontanément le sujet sans la négation ? Si non → on l'enlève. Une négation est légitime seulement quand elle écarte un risque réel et nommé spontanément (ex. "pas d'adulte en scène" en saison 1). S'applique aux briefs Directeur, plans Architecte, notes Conseiller, mémoires d'agents. Cf `equipe/patte-papa-yann.md` règle F + critère 15.
- 2026-05-03 | **Relire `pmo/decisions.md` AVANT tout brief / livrable / décision proposée** | Si la question a déjà été tranchée, l'appliquer — ne **PAS** la reposer. Cas d'origine : sur le brief 003-v2, j'ai reposé la question "Option A vs B variance writers" alors qu'elle était tranchée le 2026-04-30 (8 versions = 4 base prompt identique + 2 Claude angularisés + 2 Kimi angularisés). Perte de temps + confusion auteur.
- 2026-05-03 | **Briefs writers = autoporteurs (writer-package inliné)** | Pas de "cf fichier X" qui ne fonctionne pas pour les LLM via MCP : Kimi/DeepSeek/Grok n'ont pas Read filesystem, ils reçoivent UNIQUEMENT ce qu'on inline dans le prompt. Le `briefs/_writer-package.md` doit être lisible seul, contenir trio + arc + patte + règles d'écriture inlinées intégralement. Les briefs annexes (histoire/univers/personnages) deviennent opérationnels (tutoiement, variance, format livrable) et pointent vers le writer-package.
- 2026-05-03 | **Brief writer = règles digérées et positives, jamais notes brutes** | Un brief writer donne des règles digérées et positives, jamais un copier-coller des notes brutes ni d'exemples de bugs passés. Si une règle ne passe pas le test "un writer naïf en aurait-il besoin sans connaître l'historique ?", on la coupe ou on la reformule. Les fantômes (exemples 001 Ferretti, 002 ballon, métaphores ratées) polluent le brief sans aider le writer qui ne les a pas vus. Cas d'origine : brief 003-v2 v2 trop chargé en exemples ratés et négations gratuites — refonte v3 le 2026-05-03.
- 2026-05-03 | **Vocabulaire dur — liste explicite d'interdits + tout le reste passe s'il a un sens** | Mots interdits 4-8 ans : mort, mourir, crever, clochard, pédocriminel, pistolet, pute, enculer (et famille). Tout autre vocabulaire dur ou négatif est bienvenu **quand il sert la scène** — apporter du vocabulaire est positif. Pas de test "remplace par doux" — on nomme les interdits, le reste passe quand ça sert.
- 2026-05-03 | **Passé simple, tirets cadratins : pas de règle pour ou contre** | Affaire de style writer. S'ils servent le texte, on les utilise. Sortis du brief writer. GateKeeper attrape les usages ambigus si nécessaire.
- 2026-05-03 | **Wex peut agir, parler, résoudre** | Verbatim Papa Yann : "héros observateur, joyeux, moteur, légèrement tête en l'air, sans ennéatype. Souvent déclencheur." Pas de "silencieux / peu parlant / ne résout pas / témoin présent". Wex n'est pas handicapé. Correction d'une formulation héritée du package v2 003-v2.
- 2026-05-03 | **PMO relit les briefs writers avant étape 4 (runs)** | PMO fait une passe mécanique (grep négations + test règle F) avant que les briefs partent aux writers. Si négations gratuites → kanban étape 4 bloqué, alerte Directeur. Décharge l'auteur du travail mécanique.

## Ton et direction

- Langage sensoriel, concret, accessible 4 ans minimum
- Longueur cible : **400-700 mots** pour le palier P2 (4-6 ans) — figé
- Zéro morale explicite — la leçon émerge de la situation
- Narratif sobre : l'objet du titre au centre, le monde affleure discrètement
- **Dialogues vivants** : les personnages parlent. Le silence est actif, mais la parole est le cœur.

## Histoires validées (canon)

- "Le Pont Cassé" — Wex + Melki (Titi1) + Juju (Titi8) — V1 complète, comité de lecture fait, épilogue italique (exception)
- "Le Rire qui reste" — Wex + Nono (Titi9) + Dadou (Titi3) — V1, 489 mots, Keeper PASS, pas de comité (série "La Parole" en cours), sans épilogue

## Patterns éditoriaux notés

- **Objets porteurs de résolution** : le ballon roule seul (002), la planche trouvée (001). Les objets agissent, les enfants réagissent.
- **Ten introverti** : le tournant est silencieux (Melki recule / Nono dit "Non"). Marque de fabrique validée.
- **Dialogues courts** : 3-5 mots par réplique, rarement deux répliques consécutives du même personnage. À renforcer.
- **Boucle circulaire** : début et fin sur le même élément (terrain mouillé, pont cassé). Très efficace.

## Questions ouvertes

- Nom de l'univers : non tranché (5 finalistes dans univers/meta/nom-candidats.md)
- Compagnons animaux : forme non tranchée (onde/cristal/couleur/fluide/animal)
- Wex absent d'une histoire : quel personnage reprend le rôle d'observateur ?
