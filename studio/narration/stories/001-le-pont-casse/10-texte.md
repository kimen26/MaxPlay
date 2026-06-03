---
numero: "001"
slug: le-pont-casse
titre: Le Pont Cassé
statut: canon
version_active: v1
date_creation: 2026-05-02
date_canonisation: 2026-05-08
date_tokenisation: 2026-05-11
gatekeeper_passed: true

editorial:
  structure: Kishotenketsu
  antagoniste: false
  mots: 540
  palier: P2
  duree_lecture: 5min
  patte: B+D+C

personnages:
  liste: [wex, titi_7, titi_6]    # tokens (résolus via personnages/lookup.yml)
  enneatypes: [7, 6]
  enneatype_heros: null

themes:
  principal: promesse-du-titre-tenue
  secondaires: [soin-collectif, signalisation-douce, traversee-attentive]

univers:
  magic_level: none
  saison: printemps
  meteo: ensoleille
  moment: matinee

arc:
  rattachement: arc-1-objet-decor
  fiche: saisons/saison-1/arc-1-objet-decor/fiche.md

writer_top1: kimi-k2.6
rewrite_phase: comite-editorial (2 intégrations sur 5 idées)

tokens:
  format: "Jinja-style — {{ wex }} (invariant) + {{ titi_N }} pour le diminutif, résolu via personnages/lookup.yml + casting_default"
  resolution_casting: fr   # par défaut résolu en Wex/Raph/Pierrot. Override : voir variantes-culturelles/<pays>/
  variantes_disponibles: [fr]
---

# Le pont cassé

> **⚠️ Texte canon tokenisé** (depuis 2026-05-11). Pour la version française résolue, voir [`variantes-culturelles/fr/texte.md`](variantes-culturelles/fr/texte.md). Le texte ci-dessous contient des tokens `{{ wex }}`, `{{ titi_7 }}`, `{{ titi_6 }}` à résoudre via `personnages/lookup.yml`.

---

Le printemps avait mis de la mousse tendre sur les pierres du sentier. {{ wex }} courait devant. Ses baskets claquaient contre les cailloux. Clac. Clac. Clac. Derrière, {{ titi_7 }} comptait les pissenlits en sautillant. {{ titi_6 }} fermait la marche. Il regardait où il posait ses chaussures.

Le pont apparaissait après le gros chêne. C'était un pont en bois avec une barrière des deux côtés. En dessous, le ruisseau chantait tout seul sur les galets.

{{ wex }} posa le pied sur la première planche. Il s'arrêta net. Il pointa le doigt.

— Regardez. Il y a un trou.

La deuxième planche après le milieu du pont était cassée. Un morceau de bois manquait, comme si on avait enlevé une pièce de puzzle. On voyait l'eau couler en dessous, rapide et claire.

{{ titi_7 }} arriva en courant. Elle se pencha par-dessus la barrière.

— Une fenêtre ! On dirait une fenêtre sur le ruisseau ! Est-ce qu'on voit des poissons ? Moi je veux voir des poissons ! Et si on appelait par le trou ?

Elle mit ses mains en porte-voix.

— Houlou !

{{ titi_6 }} posa sa main autour du poignet de {{ titi_7 }}. Il ne serrait pas fort. Il serrait comme un bracelet.

— Pas trop penchée. Si tu glisses, le bois est mouillé.

Il s'agenouilla à son tour. Il toucha le bord de la planche cassée. Un morceau de bois pointait vers le haut comme une petite dent.

{{ wex }} se mit à plat ventre. Il approcha son œil de l'ouverture.

— L'eau est toute froide. Je vois des cailloux blancs. Il y en a un qui brille.

— Moi je veux briller ! dit {{ titi_7 }}.

— Faut pas marcher dessus, dit {{ titi_6 }}. Même pas une fois. Faut dire aux autres.

{{ wex }} se releva. Il prit une grande inspiration.

— On met un panneau.

— Avec du papier ? demanda {{ titi_7 }}.

— La pluie l'abîmerait, dit {{ titi_6 }}.

{{ titi_7 }} tourna sur elle-même en cherchant.

— Un bâton ! Un gros bâton planté comme un drapeau ! Pour que tout le monde voie avant d'arriver !

Elle courut jusqu'au bord du ruisseau. {{ wex }} la suivit. Ils choisirent ensemble une branche de saule cassée par le vent, longue comme le bras de {{ titi_6 }}. {{ titi_7 }} arracha une fleur jaune, une grosse fleur de pissenlit toute ronde.

{{ titi_6 }} tenait la branche bien droite. {{ wex }} enfonça la branche entre deux planches, juste avant le trou. La branche se tenait debout toute seule. {{ titi_7 }} glissa la tige de la fleur dans l'écorce de la branche. La fleur jaune pendait comme un petit soleil.

— Même les tout petits verront, dit {{ titi_6 }}.

— Ceux qui courent vite aussi, dit {{ wex }}.

Les trois enfants firent un pas en arrière. Le pont avait maintenant un drapeau jaune au-dessus de la planche cassée. Le vent souffla. La fleur dansait de gauche à droite.

{{ wex }} passa le premier. Il marcha sur la planche de gauche, en évitant le trou. Ses pas faisaient un bruit sec et joyeux. {{ titi_7 }} passa sur la droite en faisant des bruits de cheval. {{ titi_6 }} passa derrière. Il posa une main sur la barrière. De l'autre côté, ils s'arrêtèrent. Le ruisseau continuait son bruit sous le pont. Le drapeau jaune ondulait doucement dans l'air du printemps.

— Il est là pour longtemps ? demanda {{ titi_7 }}.

— Tant qu'il fait beau, dit {{ titi_6 }}.

— On peut en remettre une autre demain, dit {{ wex }}. Si le vent l'emporte.

Ils reprirent le sentier. Derrière eux, le pont restait en bois, avec sa barrière, sa mousse, et sa fleur jaune qui disait attention.

---

## Notes de tokenisation (2026-05-11)

**Tokens utilisés dans ce texte :**
- `{{ wex }}` → résolu en `Wex` (invariant cross-culture)
- `{{ titi_7 }}` → résolu en `Raph` (fr) / autre prénom selon casting cible (voir `personnages/lookup.yml`)
- `{{ titi_6 }}` → résolu en `Pierrot` (fr) / autre prénom selon casting cible

**Pour lire la version française** : voir [`variantes-culturelles/fr/texte.md`](variantes-culturelles/fr/texte.md) (texte canon résolu).

**Pour générer une autre variante** : créer `variantes-culturelles/<pays>/texte.md` en substituant les tokens depuis `personnages/lookup.yml` + adapter les décors locaux (pont → équivalent local) via `cross-culture/lieux-locaux/`.

**Note décors non-tokenisés** : le décor (pont de bois, ruisseau, planche cassée, branche de saule, fleur de pissenlit) reste **en clair** dans ce texte canon. Pour le porter vers une culture où le « pont de bois sur ruisseau » n'a pas de sens (ex : Inuit, désert), une **substitution sémantique** par l'agent `narration-localisation` est nécessaire — pas une simple substitution de token. Voir [`../../cross-culture/lieux-locaux/INDEX.md`](../../cross-culture/lieux-locaux/INDEX.md) (à peupler).
