# Overrides voix — casting <Nom pays>

> **Optionnel.** À créer uniquement si la culture cible impose des ajustements de prompt ElevenLabs au-delà de la simple substitution `{native_language}`.

---

## Substitution standard (sans override)

Pour la plupart des cultures, **la signature vocale invariante** (voir [`../../../personnages/type-NN/voix.md`](../../../personnages/)) suffit. Le voice-director substitue simplement :

```
{native_language: <Brazilian Portuguese | Japanese | Swahili | ...>}
```

Dans tous les prompts (10 persos + Wex + 2 narrateurs).

---

## Overrides spécifiques à <pays>

> À remplir uniquement si nécessaire. Exemples de cas d'override :
> - Une langue à tons (chinois, vietnamien) peut imposer un ajustement de la couche prosodie
> - Une langue gutturale (arabe, hébreu) peut imposer un ajustement de la couche articulation
> - Un casting voix « plus pleureur » vs « plus tranchant » selon la sensibilité culturelle

| Perso | Champ ajusté | Valeur override | Pourquoi |
|-------|--------------|-----------------|----------|
| Type N — <prénom> | <ex: Prosody> | <valeur> | <justification culturelle> |

---

## Narrateurs (H/F)

Voir [`../../../personnages/voix-meta/narrateur-h.md`](../../../personnages/voix-meta/narrateur-h.md) et [`narrateur-f.md`](../../../personnages/voix-meta/narrateur-f.md). Override langue native suffit dans 95% des cas.

---

## Liens

- Voix invariantes des persos : [`../../../personnages/type-NN/voix.md`](../../../personnages/)
- Voix méta (narrateurs + cheatsheet) : [`../../../personnages/voix-meta/`](../../../personnages/voix-meta/README.md)
- Skill ElevenLabs global : `~/.claude/skills/elevenlabs-voice-design/SKILL.md`
