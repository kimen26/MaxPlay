# Décisions — Pôle DINO

> Décisions datées (raison + impact). Les décisions **verrouillées** (jamais régresser) vivent dans [`../figees/encyclopedie.md`](../figees/encyclopedie.md).

## 2026-06-03 — Création du pôle DINO
Le contenu dino devient un **pôle pair** de game/ et narration/ (transverse jeu+audio). Code déployé reste dans `site/`, lié par `.claude/rules/dino.md`. **Raison** : domaine assez gros + cross-cutting pour mériter sa gouvernance (PMO/archiviste/conseiller). Déclencheur : incident « doudou de Max » (gouvernance contenu manquante).

## 2026-06-03 — Tritri : running gag sans méta
Tritri = dino préféré de Wex (Tricératops), running gag. **JAMAIS** « Max », « doudou », « peluche ». **Raison** : casser le 4e mur sort de l'histoire. Verrouillé. Impact : `recit-intro` régénéré, 8 récits relus.

## 2026-06-03 — « Volants & Marins » scindé
→ **Ptérosaures** (Ptéranodon, Quetzalcoatlus) + **« Pas des dinosaures ! »** (Mosasaure, Dimétrodon). Archaeoptéryx → Dromæosaures. **Raison** : « Volants & Marins » n'était pas un nom scientifique et mélangeait 4 clades. Honnêteté taxo.

## 2026-06-03 — « Ce qu'il mange » = alimentaire pur
Retrait de la catégorie morphologique « Volants & Marins » des régimes. Les animaux reclassés dans leur vrai régime. **Raison** : un onglet « ce qu'il mange » ne contient que des régimes alimentaires.

## 2026-06-03 — Voix réelle dans les menus
Menus en voix ElevenLabs (narrateur_h + narrateur_f pour le voyage), accroches **2-7 s**. Fallback `speechSynthesis` conservé. **Raison** : la voix robotique navigateur sur les gros libellés gênait.

---

## Questions ouvertes

- **Q-DINO-1** : faut-il faire apparaître « Ptérosaures » de façon encore plus visible (ex sous-titre dans la fiche des 2 ptérosaures) ? (soulevé 2026-06-03)
- ~~**Q-DINO-2** : count réel = 50 dinos~~ → **TRANCHÉ 2026-06-03** : count autoritatif = **50** (`DINOS.length`). Le « 60 » était périmé. Confirmé par audit FORME + vérité terrain (le PMO avait halluciné « 59 » en grep-comptant dinos+familles+catégories).
- **Q-DINO-3** : les ~28 dinos sans audio complet → génération progressive ou TTS navigateur acceptable ? (quota EL)
