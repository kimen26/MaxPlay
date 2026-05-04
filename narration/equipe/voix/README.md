# Voix ElevenLabs — Signatures par type ennéagramme

> Système à 4 couches × 9 types × 2 sexes = 18 profils voix stables cross-langue.
> Chaque fichier = un type. Format : signature + prompt ElevenLabs prêt à l'emploi.

## Les 4 couches

| Couche | Ce qu'elle encode |
|--------|------------------|
| **Articulation** | Qualité des consonnes et voyelles (crisp/adouci/ancré...) |
| **Prosodie** | Cadences, fins de phrases (montantes/descendantes/plates) |
| **Rythme** | Vitesse, pauses, micro-lingerings |
| **Phonation** | Tics vocaux, signature sonore involontaire |

## Référence prompting

Les best practices ElevenLabs Voice Design (structure, do's & don'ts, déclinaison multilingue, langues supportées) sont consolidées dans le **skill global `elevenlabs-voice-design`** (`~/.claude/skills/elevenlabs-voice-design/SKILL.md`).

Auto-trigger sur : ElevenLabs · voice design · prompt voix · multilingue voix · native french/english/etc.

**Pour les writers** : voir [_CHEATSHEET-WRITERS.md](_CHEATSHEET-WRITERS.md) — didascalies FR autorisées dans les drafts d'histoires (le voice-director les convertit en tags v3 ElevenLabs au moment de la production audio).

**Rappels MaxPlay :**
- Structure : `Native <Language>. <Gender>, <Age>. <Quality>. Persona. Emotion. <Timbre/pacing>.`
- **< 1000 caractères** par prompt (UI ElevenLabs)
- Prompts rédigés en **anglais** avec `Native French` (ou autre langue cible) en première ligne
- Pour décliner sur N langues : voir §6 du skill (1 voix par langue recommandé pour production)

## Fichiers

| Fichier | Type | Perso |
|---------|------|-------|
| [type-01-melki.md](type-01-melki.md) | Perfectionniste | Melki |
| [type-02-mimi.md](type-02-mimi.md) | Aidant | Mimi |
| [type-03-polo.md](type-03-polo.md) | Performeur | Polo |
| [type-04-madie.md](type-04-madie.md) | Individualiste | Madie |
| [type-05-lulu.md](type-05-lulu.md) | Observateur | Lulu |
| [type-06-pierrot.md](type-06-pierrot.md) | Loyal | Pierrot |
| [type-07-raph.md](type-07-raph.md) | Enthousiaste | Raph |
| [type-08-juju.md](type-08-juju.md) | Challenger | Juju |
| [type-09-nono.md](type-09-nono.md) | Pacificateur | Nono |
| [wex.md](wex.md) | Hors-système | Wex |
| [narrateur-f.md](narrateur-f.md) | Narratrice (adulte) | — |
| [narrateur-h.md](narrateur-h.md) | Narrateur (adulte) | — |

## Règle cross-langue

La signature voix est **stable quelle que soit la langue** (français, japonais, swahili...).
Les 4 couches encodent des patterns physiologiques universels, pas des accents culturels.
Pour un casting d'une autre culture : même signature, prénom changé, même prompt ElevenLabs.
