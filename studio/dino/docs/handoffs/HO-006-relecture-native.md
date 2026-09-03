# HO-006 — Relecture native croisee (en, es-es, pt-br)

**Statut :** pret (attend HO-003/004/005)
**Depend de :** les 3 briefs de traduction

## Objectif

Faire juger chaque traduction par un OEIL NEUF natif, qui n'a pas ecrit le texte,
et remonter les corrections. Exigence PY : « une grosse qualite et du natif dans
chacune des langues ».

## Pourquoi Kimi

Le traducteur ne peut pas etre son propre relecteur : il relit son intention, pas son
texte. Kimi apporte un modele different, donc des reflexes de langue differents.
Un desaccord entre le traducteur et Kimi est un signal, pas un verdict : c'est
l'orchestrateur qui tranche.

## Contrainte technique FIGEE (verifiee 2026-09-03)

`mcp__llm-copains__ask_kimi` n'accepte **que `temperature: 1`**. Toute autre valeur
renvoie `400 invalid temperature: only 1 is allowed for this model`.
**Un 400/403 sur Kimi n'est pas un probleme de credit** — lire le message d'erreur
avant de conclure au quota (hypothese credit dementie par PY le 2026-09-03).

## Methode

1. Echantillonner **par lots de 10 dinos** (pas les 71 d'un coup : la relecture perd en
   acuite sur un gros bloc, et une reponse tronquee passe inapercue).
2. Pour chaque lot, soumettre a Kimi le texte traduit SEUL d'abord (juger la langue sans
   l'influence du FR), puis le FR en regard pour verifier le sens et l'echelle.
3. Kimi rend par entree : VERDICT (OK / A CORRIGER), le probleme precis, la reecriture.
4. L'orchestrateur arbitre chaque correction proposee, applique celles qu'il retient,
   et consigne les refus motives.

## Grille de relecture (a passer a Kimi)

- Est-ce qu'un parent natif lit ca a voix haute sans buter une seule fois ?
- Y a-t-il un calque syntaxique du francais ?
- Un mot hors de portee d'un enfant de 4 ans ?
- Un repere de comparaison non localise, ou un ordre de grandeur qui a bouge ?
- Un faux-enfantin, une mievrerie ajoutee, une exclamation en plus ?

## Portes de verification

```bash
node studio/dino/content/scripts/export/_check-traduction.cjs <lang>
```
Rejoue par l'ORCHESTRATEUR apres application des corrections, jamais sur parole d'agent.

## Rapport attendu

- Par langue : nombre d'entrees vues, corrections proposees, corrections retenues.
- Les desaccords traducteur/Kimi et l'arbitrage rendu.
