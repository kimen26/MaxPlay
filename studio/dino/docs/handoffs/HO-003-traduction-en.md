# HO-003 — Traduction Anglais (en)

**Statut :** pret
**Depend de :** HO-002 (corpus extrait) — FAIT

## Objectif

Produire `studio/dino/content/i18n/en/strings.json` : les 71 fiches dino et les
11 familles ecrites en Anglais natif (Etats-Unis / Royaume-Uni), pour un enfant de 4 ans, destinees a etre ENTENDUES.

## Fichiers autorises

- `studio/dino/content/i18n/en/strings.json` (a creer)
- `studio/dino/content/i18n/en/NOTES.md` (choix de traduction non evidents)

## Hors perimetre (gele)

- `site/js/dinos-data.js` — le FR est le canon, on n'y touche pas.
- `site/js/i18n/` — la generation des bundles produit est HO-007.
- Tout dossier d'une autre langue.
- Toute generation audio (invariant DEC-I18N-INVARIANT-001 : lexique AVANT audio).

## Methode

1. Lire `studio/dino/content/i18n/_CHARTE-TRADUCTION.md` EN ENTIER. Elle prime sur tout.
2. Source : `studio/dino/content/i18n/_corpus/corpus-fr.json` (ou les 8 `lot-NN.json`).
3. Travailler **par lots de 10 dinos**, pas 71 d'un coup. Apres chaque lot, se relire
   a voix haute : une phrase qui ne se dit pas se reecrit.
4. Ne pas traduire mot a mot. Ecrire ce qu'un auteur natif aurait ecrit.
   Les reperes de comparaison se localisent (l'ordre de grandeur, lui, ne bouge jamais).
5. Consigner dans NOTES.md tout choix non evident (nom vernaculaire retenu, repere
   culturel remplace, etymologie adaptee).

## Format de sortie

```json
{
  "_meta": { "lang": "en", "base": "corpus-fr.json", "date": "2026-09-03" },
  "familles": { "<id>": { "<champ>": "<texte>" } },
  "dinos":    { "<id>": { "<champ>": "<texte>" } }
}
```

Memes ids et memes champs que le corpus. Aucun champ en plus, aucun en moins.

## Portes de verification (a jouer avant de rendre)

```bash
node -e "JSON.parse(require('fs').readFileSync('studio/dino/content/i18n/en/strings.json','utf8'))"
node studio/dino/content/scripts/export/_check-traduction.cjs en
```

Le check doit sortir **0 erreur**. Les avertissements se justifient un par un dans le
rapport (un chiffre qui change ou une exclamation en plus doit avoir une raison ecrite).

## Rapport attendu

- La sortie brute des deux commandes ci-dessus.
- Le nombre de dinos et de familles traduits.
- Les 5 choix de traduction les plus discutables, avec leur justification.
- Tout endroit ou le FR canon semble fautif (NE PAS corriger : signaler a l'orchestrateur).
