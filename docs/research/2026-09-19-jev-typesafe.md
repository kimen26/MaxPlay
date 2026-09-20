# Jev (TypeSafe AI) × MaxPlay — dossier de veille et propositions

> Recherche du 2026-09-19 à la demande de Papa Yann (« j'aimerais inclure Jev dès que c'est dispo »). Sources : docs officielles `docs.typesafe.ai` (lues page par page via curl, WebFetch bloqué), TechCrunch 2026-09-18, The Register 2026-09-16, site `typesafe.ai`. Le skill officiel est copié dans [`.claude/skills/typesafe-ai/SKILL.md`](../../.claude/skills/typesafe-ai/SKILL.md) (MIT, upstream `typesafe-ai/skills`).

## 1. Qu'est-ce que Jev

Jev est le premier « System One model » de TypeSafe AI (fondateur Diogo Almeida, ex-OpenAI, co-inventeur de RLHF). Ce n'est **pas** un LLM : il ne génère pas de texte. On lui envoie un **état** (texte, objet JSON ou tableau) et une carte de **questions typées** ; il renvoie une réponse structurée par question, avec des probabilités calibrées. Entraîné par « Reinforcement Learning for Calibrated Decisions » (RLCD), données 100 % synthétiques. Toutes les questions sont évaluées en parallèle contre le même état en une passe : ajouter des questions ne change presque pas la latence.

Trois primitives :

| Type | Question | Retour |
|---|---|---|
| `choice` | choisir une option parmi une liste avec rubrique | `choice`, `probabilities` par option, `confidence` |
| `score` | noter l'état sur une échelle de niveaux ordonnés décrits | `score` (pondéré), `probabilities` par niveau, `confidence` |
| `noul` | « cette affirmation est-elle vraie ? » | `noul` = probabilité de oui (0-1) |

Doctrine d'usage : questions atomiques, une seule chose bien cadrée par question (« le jugement qu'un expert ferait en quelques secondes »), et la combinaison se fait dans le code. Le `confidence` sert à router : agir si haut, demander confirmation si moyen, ne pas agir si bas.

## 2. Disponibilité aujourd'hui

- **Accès** : clé API depuis le dashboard `console.typesafe.ai`. Le site affiche encore « Join Waitlist » et les docs disent que les limites « changent sans préavis pendant qu'on laisse entrer plus d'utilisateurs ». L'API a été brièvement saturée au lancement. À faire par Papa Yann : créer un compte et voir si la clé est immédiate ou en liste d'attente. Playground dans la console pour tester sans code.
- **Modèle** : `jev-1.13.0`, alias `jev-latest` (et `jev-preview`, identique aujourd'hui).
- **Prix** : 0,042 $ par million de tokens d'entrée, **sortie gratuite**. Pour MaxPlay c'est virtuellement gratuit : 10 000 appels de 500 tokens = 0,21 $.
- **Limites** : 250 000 tokens/s et 1 200 requêtes/min ; contexte 64k par requête (32k pour l'état + la plus longue question). Erreur 429 au-delà, les SDK retentent.
- **Entrée : texte seulement.** Pas d'image, pas d'audio, pas de vidéo. Tout non-texte doit être transcrit avant.
- **Langue : l'anglais est la langue principale et la plus précise.** Les autres langues « sont gérées mais pas au même niveau ». Nos états seront en français : à mesurer, et instructions/rubriques à écrire en anglais.
- **Latence** : 70-500 ms annoncés, 114 ms sur la démo.
- **Données** : engagement de ne pas entraîner sur les données client, DPA disponible, zéro rétention réservée à l'entreprise. Pas de mention spécifique aux mineurs : ne jamais envoyer de donnée nominative de Max (prénom, voix, photo) ; on n'envoie que du contenu éditorial ou des traces anonymisées.
- **Pas de fine-tuning** : on façonne les réponses par l'état, les instructions et les rubriques.

## 3. API, concrètement

```http
POST https://api.typesafe.ai/v1/systemone
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

```json
{
  "state": "Le Tricératops avait trois cornes et une grande collerette. Il mangeait des plantes.",
  "model": "jev-latest",
  "questions": {
    "regime": {
      "type": "choice",
      "instructions": "What is this dinosaur's diet according to the text?",
      "criteria": { "herbivore": "eats plants", "carnivore": "eats meat", "omnivore": "eats both", "unknown": "text does not say" }
    },
    "mentions_forbidden": {
      "type": "noul",
      "instructions": "Does the text mention a child by name, a plush toy, or a bus (outside a size comparison)?"
    },
    "age_fit": {
      "type": "score",
      "instructions": "How suitable is this text to be read aloud to a 4-year-old?",
      "criteria": ["Too abstract or too long", "Understandable with help", "Perfectly clear for a 4-year-old"]
    }
  }
}
```

Réponse : une entrée par clé, par exemple `regime.choice = "herbivore"` avec `probabilities` et `confidence`, `mentions_forbidden.noul = 0.02`, `age_fit.score ≈ 1.8`.

SDK JavaScript : `npm install @typesafe-ai/sdk` (Node 20+), `new TypeSafeClient()` lit `TYPESAFE_API_KEY`, `client.systemOne({ state, questions: { x: choice("...", { a: null, b: null }) } })`. SDK Python : `pip install typesafe-sdk`. Retries avec backoff inclus.

**Contrainte d'architecture MaxPlay** : la clé ne doit jamais aller dans `site/` (PWA publique sur GitHub Pages, règle « jamais de secret en dur »). Tout appel depuis le jeu passe par une **Supabase Edge Function** (infra déjà en place, `infra/supabase/`), qui garde la clé et applique un quota. Les usages hors ligne (le jeu tourne sans réseau) restent impossibles : Jev n'entre dans le jeu que pour des décisions non bloquantes, quand le réseau est là.

## 4. Où Jev sert vraiment à MaxPlay

Le bon réflexe : Jev remplace du code fragile (regex, listes de mots, parsing de sortie LLM) ou des appels LLM coûteux qui ne servent qu'à **juger**. Il ne remplace ni les writers, ni le fact-check Grokipedia, ni la voix.

### 4.1 Pipeline de contenu (le plus rentable, tout de suite)

| Usage | Aujourd'hui | Avec Jev | Primitive |
|---|---|---|---|
| **Grep interdits avant génération audio** (`max|doudou|peluche|bus`) | Regex : rate « le petit garçon », laisse passer « Maxence », bloque le bus d'échelle à la main | Noul « le texte nomme l'enfant, une peluche, ou un bus hors comparaison de taille ? », seuil 0,3 = STOP | `noul` |
| **Échelle honnête** (< 10 % de mensonge) | Relecture humaine | Noul par comparaison « cette comparaison de taille est-elle cohérente avec les mètres donnés ? » sur l'état {texte, longueur, référentiel INVARIANTS} | `noul` |
| **Violence juste** (prédation vraie, jamais sang/agonie) | Mémoire du writer | Score 3 niveaux « prédation absente / prédation factuelle / sang, torture, agonie » sur chaque récit | `score` |
| **Anti nian-nian, âge 4 ans, dialogue naturel** | Panel lecteurs (agents LLM, lents et chers) | Scores composites : abstraction, longueur de phrase, surjeu, tics de Wex écrits. Le panel LLM ne passe plus que sur les cas moyens | `score` |
| **Dérive texte/audio** (`audio-verif` : STT puis diff mot à mot) | Diff textuel qui hurle sur chaque liaison ou chiffre en lettres | Noul « la transcription dit la même chose que le script ? » : tolère « 66 millions » vs « soixante-six millions » | `noul` |
| **Taxonomie / régime / époque** extraits d'une fiche source | Lecture manuelle | Choice par champ, confiance basse = contrôle humain | `choice` |
| **Référentiel de contenu** : « quel texte est lu où » | Scripts de correspondance par nom de fichier | Choice « ce segment appartient à quelle fiche / quel bloc ? » | `choice` |

Coût : nul. Gain : ces contrôles deviennent des portes de vérification (`npm run check`) au lieu de rappels dans les CLAUDE.md.

### 4.2 Bot Telegram et INBOX

Le bot maison (`infra/bot/`) reçoit les idées de Papa Yann. Aujourd'hui elles tombent dans `INBOX.md` et un PMO les trie sous 48 h. Jev en une requête : Choice **pôle** (JEU / DINO / NARRATION / LUNII / TRANSVERSE / ?), Choice **nature** (idée, bug, décision, question), Noul **contient une décision figée** (alerte rouge obligatoire), Noul **doublon probable avec un ticket existant** (état = message + titres du TODO du pôle). Confiance basse = le bot demande « c'est pour le jeu, les dinos ou les histoires ? », exactement la règle du CLAUDE.md racine. Gain : capture immédiate sans réveiller un agent.

### 4.3 Retours et annotations (Supabase)

Les commentaires dictés par le parent dans le jeu (`comments.js`) arrivent en base. Jev : Choice jeu visé, Choice type (bug / trop dur / trop facile / idée / bravo), Score urgence. Ça alimente le cycle de vie des annotations sans lecture manuelle.

### 4.4 Routage des LLM copains

`llm-copains` (MCP) appelle Kimi, Grok, DeepSeek. Jev peut choisir le copain et le mode (gratuit / payant, réservé à 2 writers) selon la demande : c'est le cas d'usage « model routing » que TypeSafe met en avant, et il verrouille la règle « ask_kimi_payant interdit hors writers » par du code plutôt que par une mémoire.

### 4.5 Dans le jeu, avec prudence

Le jeu est hors ligne, l'enfant ne produit pas de texte, et Jev n'entend rien. Les usages in-game sont donc peu nombreux et jamais bloquants :

- **Prochain jeu suggéré** (« La suite » de l'écran de fin) : état = traces anonymisées (étoiles par jeu, compétences travaillées, durée), Choice parmi les jeux ouverts. Aujourd'hui `MJKit.chain` est une liste fixe. Décision prise en arrière-plan quand le réseau est là, sinon liste fixe. Zéro latence perçue.
- **Montée de niveau par compétence** (EP-112) : Score « prêt pour le niveau suivant ? » sur l'historique des parties, plus honnête qu'un seuil dur.
- **Tolérance à la voix, un jour** : si l'on fait du mode miroir (dossier brainstorm, C), Web Speech ou ElevenLabs STT rendent une transcription bruitée (« tri sera top »). Jev Noul « cette transcription est-elle une tentative plausible de dire Tricératops ? » absorbe les erreurs de reconnaissance sans jamais noter l'enfant. C'est la seule voie par laquelle la prononciation pourrait entrer sans pénalité invisible. Pas avant 5 ans, et jamais avec la voix brute envoyée à un tiers.

### 4.6 Ce que Jev ne fera pas

- Écrire, traduire, raconter : ce n'est pas un générateur.
- Fact-checker seul : il juge la cohérence interne d'un état, il ne connaît pas la vérité paléontologique. Grokipedia reste la première source ; Jev peut au mieux vérifier qu'un texte respecte une fiche source qu'on lui donne dans l'état.
- Voir une image ou entendre un son : les captures de recette et les MP3 restent hors de portée, sauf transcription préalable.
- Remplacer la recette avec Max.

## 5. Risques et inconnues

- **Liste d'attente / limites mouvantes** : ne rien mettre en chemin critique tant que la clé n'est pas obtenue et les quotas stables.
- **Français** : précision non documentée hors anglais. Premier chantier = un banc de 50 cas connus (textes déjà validés ou rejetés par Papa Yann) pour mesurer avant d'adopter.
- **Jaggedness** : la doc a une page « model jaggedness » (précision qui varie avec la taille de l'état). Garder les états courts : un récit, pas les 70.
- **Calibration** : le `confidence` est une statistique de la distribution ; les seuils se règlent par usage et se figent par version de modèle (`jev-1.13.0`, pas l'alias) une fois réglés.
- **Données enfant** : rien de nominatif, jamais. Traces de jeu anonymisées uniquement, et seulement via l'Edge Function.
- **Dépendance** : startup de deux ans, 40 M$ levés, un seul modèle. Tout usage doit avoir un repli (regex actuelle, liste fixe, panel LLM).

## 6. Plan proposé

1. **Papa Yann** : compte sur `console.typesafe.ai`, clé dans `settings.json` env (`TYPESAFE_API_KEY`), jamais dans le repo. Dire si liste d'attente.
2. **Banc de mesure** (S) : script Node dans `studio/referentiel/` qui rejoue 50 textes connus sur les 4 portes de contenu (interdits, échelle, violence, âge) et compare aux verdicts humains. Verdict chiffré en français avant toute adoption.
3. **Porte 1 en prod** (S) : remplacer le grep interdits par Jev + repli regex, branché dans le process audio militaire.
4. **Bot Telegram** (M) : classification pôle / nature / figée / doublon, confiance basse = question texte.
5. **Edge Function** `jev-proxy` (M) : clé côté serveur, quota par jour, pour les usages in-game.
6. **Suggestion « La suite »** (M) : seulement après la recette du nid et l'écran de fin normé.
7. **Voix en mode miroir** : pas avant 5 ans, dossier séparé le moment venu.

## Sources

- Docs : https://docs.typesafe.ai/introduction · /introduction/quickstart · /api · /models · /confidence · /sdk/javascript · /agent-skill · /concepts/use-case-map · /legal
- TechCrunch, 2026-09-18 : https://techcrunch.com/2026/09/18/a-new-kind-of-ai-model-from-a-chatgpt-inventor-is-thrilling-developers/
- The Register, 2026-09-16 : https://www.theregister.com/ai-and-ml/2026/09/16/typesafe-ai-debuts-model-for-machines-that-plays-doom/5296711
- Skill officiel : https://github.com/typesafe-ai/skills/blob/main/skills/typesafe-ai/SKILL.md
