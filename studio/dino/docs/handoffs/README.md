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

> HO-007 à HO-018 : **fait**, archivés le 2026-09-12 (HO-R03) → [`archives/2026-09/`](archives/2026-09/INDEX.md).
> ⚠️ HO-003 à HO-006 restent avec un statut interne divergent du registre (voir rapport HO-R03) :
> non archivés, à re-trancher.

## Vague 2026-09-05 — Fiches dino completes (data → scripts audio FR tagues → i18n → audio EL) + musiques + SFX

Briefs HO-009 à HO-018 : **fait**, archivés le 2026-09-12 (HO-R03) → [`archives/2026-09/`](archives/2026-09/INDEX.md).

| ID | Titre | Fichiers possedes | Statut |
|----|-------|-------------------|--------|
| HO-019 | Reprise audio au reset quota EL (FR 35 + EN integral, chiffrage 305 k, decision palier PY) | site/audio/dinos/{fr,en}/**, manifest | bloque (quota, reset 2026-09-11) |

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

## Vague 2026-09-06 — Flore du Mésozoïque (EP-D13, décision PY : sous chaque époque de l'onglet « Les époques »)

| ID | Titre | Fichiers possedes | Statut |
|----|-------|-------------------|--------|
| HO-020 | Fact-check + fiches plantes (6 axes PY) | `content/sources/flore/**` | en cours |
| HO-021 | Data `dinos-plantes.js` + UI grille époque + fiche plante | `site/dev-dinos.html`, `site/js/dinos-plantes.js`, `dinos-i18n.js`, `dino-ui.js`, ui.json x3 | en cours |
| HO-022 | Images hero plantes (enfant 1 m) | `site/img/dinos/plantes/**` | pret |
| HO-023 | i18n plantes en/es-es/pt-br | `content/i18n/**`, bundles | brouillon |

