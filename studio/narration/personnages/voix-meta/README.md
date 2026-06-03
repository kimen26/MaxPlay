# Voix méta — Index

> **Sous-pilier de [`personnages/`](../INDEX.md).** Voix qui ne sont **pas des persos**, mais qui participent à la production audio :
> - les **narrateurs** (H/F adultes qui racontent l'histoire AUX enfants)
> - la **cheatsheet didascalies** (vocabulaire FR autorisé dans les drafts writers)
> - le **guide de prompting** (rappels ElevenLabs Voice Design)
> - l'**étude vocale par type** (18 prompts F+M × 9 + analyse 4 couches)
>
> Les voix **des persos** vivent dans [`../type-NN/voix.md`](../type-01/voix.md) et [`../wex/voix.md`](../wex/voix.md).

---

## Fichiers

| Fichier | Rôle | Public/Cible |
|---------|------|--------------|
| [`narrateur-h.md`](narrateur-h.md) | **Narrateur (H adulte)** — père conteur, raconte aux enfants 3-9 ans | Texte narratif hors dialogues |
| [`narrateur-f.md`](narrateur-f.md) | **Narratrice (F adulte)** — bibliothécaire bienveillante | Texte narratif hors dialogues |
| [`_CHEATSHEET-WRITERS.md`](_CHEATSHEET-WRITERS.md) | **Didascalies FR** que les writers peuvent insérer dans leurs drafts (chuchote, rit, soupire, etc.) | Writers (étape 4 PROCESS) |
| [`_PROMPTING-GUIDE.md`](_PROMPTING-GUIDE.md) | Guide ElevenLabs Voice Design MaxPlay — workflow v2→v3 + audio tags + mapping FR→v3 + multi-culture | Auteur (création voice_id) + voice-director (production) |
| [`_PREVIEW-TEXTS.md`](_PREVIEW-TEXTS.md) | **Preview texts à coller dans Voice Design** au moment de créer chaque voice_id (12 entrées : 2 narrateurs + 11 persos, avec tags v3 + tic vocal contextuel) | Auteur (création voice_id) |
| [`_VOICE-IDS-CASTING.md`](_VOICE-IDS-CASTING.md) | **🆕 Source de vérité voice_id** + méthodologie unifiée garçons v24 (mai 2026) + état du casting + Lulu bloqué filtre EL + TODO post-création | Auteur + voice-director |
| [`_SESSION-2026-05-11-RETOUR-EXP.md`](_SESSION-2026-05-11-RETOUR-EXP.md) | **🆕 Retour d'expérience session intensive Voice Design** — règles d'or zéro négation, filtre Prohibited Use Policy cumulatif, compteur CRLF, méthodo unifiée gravée | Référence apprentissage |
| [`_ALIAS-TAGS-CATALOG.md`](_ALIAS-TAGS-CATALOG.md) | **🆕 Catalogue alias tags par perso — Étage 2 (génération TTS)**. Le Voice Design ignore les tics phonétiques (anti-pattern #6 confirmé empiriquement 2026-05-11) → tous les `huit→ouitte`, `je→ze`, `stylo→é-stylo` etc. sont injectés ICI au moment de produire les MP3 | Voice-director (EP-026) |
| [`etude-vocale-par-type.md`](etude-vocale-par-type.md) | Étude vocale 4 couches × 9 types × 2 sexes = 18 profils stables cross-langue | Référence Audio + Conseiller |

---

## Rôle éditorial du narrateur

Le narrateur n'est pas lié à un ennéatype. Il est la **voix qui porte l'histoire** entre les dialogues des persos. Toujours **adulte** car il raconte AUX enfants (3-9 ans cibles).

Choix H/F : à trancher par story selon le ton (gravité tranquille → H ; curiosité bienveillante → F). Par défaut H pour les histoires de jour, F pour les histoires de soir/intime — règle non figée.

---

## Voix-overrides cross-culture

Le prompt narrateur précise `Native French` (ligne 39 actuelle). Pour porter vers une autre culture :
- Casting JP → `Native Japanese`
- Casting BR → `Native Brazilian Portuguese`
- etc.

Ces overrides vivent dans [`../../cross-culture/castings-nationaux/<pays>/voix-narrateur.md`](../../cross-culture/castings-nationaux/) (à créer lors du lancement d'un casting non-FR).

---

## Liens

- Pilier Personnages : [`../INDEX.md`](../INDEX.md)
- Voix incarnées (10 + Wex) : [`../type-01/voix.md`](../type-01/voix.md) … [`../wex/voix.md`](../wex/voix.md)
- Agent audio : [`.claude/agents/narration-audio.md`](../../../../.claude/agents/narration-audio.md)
- MCP TTS : `mcp__llm-copains__tts_elevenlabs`
- 🎙️ **Skills globaux ElevenLabs** (auto-trigger sur mots-clés audio/voix) :
  - `~/.claude/skills/elevenlabs-voice-design/SKILL.md` — **CRÉATION** d'une voix (prompts Voice Design, multilingue)
  - `~/.claude/skills/audio-direction-elevenlabs/SKILL.md` — **PRODUCTION** multi-voix (text-to-dialogue API, tags v3 catalogués, tricks de graphie, pronunciation dicts, voice settings, 14 anti-patterns confirmés, 12 cultures préparées). Skill PARENT + 8 sous-fichiers indexés.
