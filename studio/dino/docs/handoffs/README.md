# Handoffs i18n DINO — l'usine

> Ouverte 2026-09-03 pour la vague de traduction texte (en, es-es, pt-br).
> Protocole générique : `~/.claude/skills/nouveau-projet/references/protocole-handoffs.md`.

## Le principe

Un **orchestrateur** (session principale) conçoit, arbitre et fait la revue.
Des **exécutants** (sous-agents Sonnet) prennent UN brief chacun et ne débordent jamais
de leurs fichiers autorisés.

L'orchestrateur est le garant de la qualité : aucun brief ne passe `fait` sans que ses
portes aient été rejouées par lui.

## Registre des briefs

| ID | Titre | Fichiers possédés | Statut |
|----|-------|-------------------|--------|
| HO-001 | Fix merger i18n (const top-level) | `site/js/dinos-i18n.js` | pret |
| HO-002 | Extraction du corpus FR à traduire | `studio/dino/content/i18n/_corpus/**` | pret |
| HO-003 | Traduction EN natif | `studio/dino/content/i18n/en/**` | bloque par HO-002 |
| HO-004 | Traduction ES-ES natif | `studio/dino/content/i18n/es-es/**` | bloque par HO-002 |
| HO-005 | Traduction PT-BR natif | `studio/dino/content/i18n/pt-br/**` | bloque par HO-002 |
| HO-006 | Relecture native croisee (3 langues) | rapports dans `studio/dino/docs/handoffs/rapports/` | bloque par HO-003/4/5 |
| HO-007 | Generation des bundles produit | `site/js/i18n/dinos-strings.*.js` | fait |
| HO-008 | Memoire convergente (pmo/ → memory/) | `studio/dino/memory/**` | fait |

## Vague 2026-09-05 — Fiches dino completes (data → scripts audio FR tagues → i18n → audio EL) + musiques + SFX

| ID | Titre | Fichiers possedes | Statut |
|----|-------|-------------------|--------|
| HO-009 | Audit data 71 dinos (mesures, lieux, Texte fiche), 4 lots | `docs/handoffs/rapports/HO-009-lot-*.{md,json}` | en cours |
| HO-010 | Application corrections data (orchestrateur) | `site/js/dinos-data.js`, strings.json touches, bundles | bloque par HO-009 |
| HO-011 | Reecriture 71 Scripts audio FR, tags v3 riches, 6 lots | `scripts-audio/fr/V3/<id>.md` | bloque par HO-010 |
| HO-012 | Relecture croisee FR (porte + dino-conseiller) | `rapports/HO-012-*.md` | bloque par HO-011 |
| HO-013 | i18n Scripts audio en / es-es / pt-br + lexiques relus | `scripts-audio/<lang>/**`, `lexiques-prononciation/<lang>.md` | bloque par HO-012 |
| HO-014 | Generation EL 13 theropodes × 4 langues | `site/audio/dinos/<lang>/<id>-*.mp3`, manifest | bloque par HO-012/013 |
| HO-015 | Musiques de fond (Eleven Music) | `site/sounds/music/**` | fait |
| HO-016 | Banque SFX dinos | `site/sounds/fx/dino/**` | fait |

Porte commune des scripts audio : `node studio/dino/content/scripts/export/_verif-scripts-audio.cjs <lang> [ids]`.

## Regles non negociables

- **Ownership par fichier.** Deux briefs actifs ne partagent jamais un fichier. Les trois
  briefs de traduction tournent en parallele parce que leurs dossiers sont disjoints.
- **L'index git est partage** entre sessions : commits cibles (`git add <chemins>`),
  jamais `git add -A`, et verifier `git show --stat HEAD` apres chaque commit.
- **`site/js/dinos-data.js` est GELE** pour toute cette vague. Le FR est le canon : on ne
  le touche pas sous pretexte de traduire.
- **Invariant DEC-I18N-INVARIANT-001** : lexique AVANT audio. Cette vague est TEXTE
  uniquement. Aucune generation ElevenLabs.
- Un doute = on bloque et on demande. Jamais « je corrige au passage ».
