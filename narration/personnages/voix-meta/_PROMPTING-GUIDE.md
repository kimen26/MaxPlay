# Voice Design — Guide de prompting MaxPlay

> Patterns spécifiques MaxPlay. Pour les best practices génériques ElevenLabs, voir skill global `~/.claude/skills/elevenlabs-voice-design/SKILL.md` (auto-déclenché sur mots-clés ElevenLabs).

---

## Workflow officiel MaxPlay (v2 création → v3 production)

Source : skill `elevenlabs-voice-design` §10. **Décision auteur 2026-05-11.**

```
┌─────────────────────────────────────────────────────────────────┐
│ ① VOICE DESIGN — création voice_id (UI ElevenLabs, eleven_multilingual_v2)
│
│   Paramètres visibles dans l'UI :
│   - Prompt (770-1000 chars, structure fixe — voir fiches perso)
│   - Loudness  →  ~50% (milieu) par défaut
│   - Guidance Scale  →  30-40% (priorité fidélité prompt, timbre stable)
│   - Generate Preview Text  →  ON
│   - Preview text  →  phrase complète FR (voir "Phrases types" en bas de chaque fiche)
│
│   Procédure :
│   1. Coller prompt → régler Loudness + Guidance
│   2. Générer 3 previews (chaque génération diffère)
│   3. Garder la meilleure → sauvegarder
│   4. Noter le voice_id dans le frontmatter de la fiche perso
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ ② TTS GENERATION — utilisation voice_id (API, eleven_v3 recommandé)
│
│   Paramètres réglés via MCP `mcp__llm-copains__tts_elevenlabs` :
│   - Stability / Similarity Boost / Style / Speaker Boost
│   - (valeurs spécifiques par perso — voir "Paramètres TTS Generation"
│     dans chaque fiche)
│
│   Le voice_id est INDÉPENDANT du moteur : créé en v2, exploité en v3.
└─────────────────────────────────────────────────────────────────┘
```

**Pourquoi v2 → v3 :**
- v2 = stable et reproductible pour Voice Design (timbre, signature)
- v3 = expressif via **audio tags inline** dans le texte (`[whispers]`, `[softly]`, etc.)
- Le voice_id sert dans les deux

---

## Audio tags v3 — mapping didascalies FR → tags

Les writers écrivent en français italique. La conversion en tags v3 se fait au moment de la production audio (par l'agent `voice-director`, EP-026 / VOIX-001 backlog).

| Didascalie writer FR | Tag v3 ElevenLabs |
|---------------------|-------------------|
| `*(en chuchotant)*` | `[whispers]` |
| `*(doucement)*` `*(tout doux)*` | `[softly]` |
| `*(fort)*` `*(en criant)*` | `[shouts]` |
| `*(en riant)*` `*(rire)*` | `[laughs]` |
| `*(petit rire)*` `*(rire amusé)*` | `[chuckles]` |
| `*(rire enfantin)*` | `[giggles]` |
| `*(soupir)*` `*(en soupirant)*` | `[sighs]` |
| `*(surpris)*` `*(hoquet)*` | `[gasps]` |
| `*(hésitant)*` `*(hésitation)*` | `[hesitant]` |
| `*(en colère)*` | `[angry]` |
| `*(triste)*` | `[sad]` |
| `*(curieux)*` | `[curious]` |
| `*(joyeux)*` `*(joyeusement)*` | `[happily]` |
| `*(excité)*` | `[excited]` |
| `*(calme)*` | `[calm]` |
| `*(sarcastique)*` `*(ironique)*` | `[sarcastic]` |
| `*(sérieux)*` | `[serious]` |
| `*(lentement)*` | `[slowly]` |
| `*(rapidement)*` `*(vite)*` | `[quickly]` |
| `*(...)*` ou `*(pause)*` | `[pauses]` |

**Limites** :
- Tags **voice-dependent** : certains marchent moins sur voix enfants — tester
- **Max 2-3 tags par phrase** sinon voix instable et peu naturelle
- v3 est en **alpha** — la liste évolue

---

## Anatomie d'une fiche voix MaxPlay (perso ou narrateur)

```
1. Frontmatter YAML (role, genre, voice_id_elevenlabs, modele_creation, modele_production)
2. Titre + intro
3. Signature vocale (4 couches : Articulation / Prosodie / Rythme / Phonation)
4. ① Voice Design — paramètres UI création (Loudness, Guidance Scale, Preview text)
5. ② TTS Generation — paramètres API utilisation (Stability/Similarity/Style/SpeakerBoost)
6. Workflow v2 → v3 + audio tags (cf. ce guide)
7. Prompt ElevenLabs (F + M variants pour persos, M seul pour Wex/Narr-H, F seul pour Narr-F)
8. Phrases types (pour preview text + référence writers)
```

---

## Cas multi-culture (à venir)

Pour décliner une voix MaxPlay sur une autre langue (jp / br / he / sw…) :

1. **Garder la signature stable** — les 4 couches sont des patterns physiologiques universels, ne pas les modifier
2. **Changer uniquement la 1ère ligne du prompt** : `Native French` → `Native <Target>` (voir liste 70+ langues dans skill §7)
3. **Ajouter tip phonétique** si pertinent (skill §6 : `clean Japanese ra/ri/ru flap` pour jp, `Brazilian Portuguese nasal vowels` pour br, etc.)
4. **Preview text traduit** dans la langue cible (pas littéral)
5. **Sauvegarder** comme nouveau voice_id `<Perso>_<lang>_v1` → noter dans `cross-culture/castings-nationaux/<pays>/voix.md`

→ Voir gabarit `cross-culture/castings-nationaux/_gabarit/voix.md`.

---

## Liens

- Skill global ElevenLabs : `~/.claude/skills/elevenlabs-voice-design/SKILL.md`
- Voix persos MaxPlay : [`../type-NN/voix.md`](../) + [`../wex/voix.md`](../wex/voix.md)
- Voix narrateurs : [`narrateur-h.md`](narrateur-h.md) + [`narrateur-f.md`](narrateur-f.md)
- Cheatsheet writers didascalies FR : [`_CHEATSHEET-WRITERS.md`](_CHEATSHEET-WRITERS.md)
- Backlog audio : `narration/pmo/backlog.md` (VOIX-001, VOIX-002, VOIX-003)
- Agent audio : `.claude/agents/narration-audio.md`
- Doc officielle ElevenLabs : https://elevenlabs.io/docs/eleven-creative/voices/voice-design#prompting-guide
