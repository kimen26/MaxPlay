# NORME — Bouton (i) règles par mini-jeu

> Demande Papa Yann 2026-07-07 : « au niveau des règles du jeu peut-être avoir un (i) avec une règle qui s'affiche ou explication audio si pas trop long ». Ticket EP-068.
> Statut : **norme rédigée, implémentation à valider par Papa Yann avant déploiement massif.**

## Principe

Chaque mj-XX.html porte dans son header `.hdr` un bouton **(i)** discret (à droite du titre) qui ouvre un panneau de règle :

```html
<div class="hdr">
  <a href="index.html">&#8592;</a>
  <span class="htitle">🎯 Titre</span>
  <button class="hinfo" id="btn-regle" aria-label="Règle du jeu">i</button>
</div>
```

## Contenu du panneau (modal légère, mêmes styles que les modals existantes)

1. **1 phrase de règle MAX** (l'enfant ne lit pas un paragraphe) : « Fais glisser les bus pour libérer celui de Max ! »
2. **1 pictogramme/mini-démo** : idéalement un GIF-like CSS de 2-3 étapes (geste → résultat), sinon 3 emojis séquencés.
3. **Bouton 🔊** : lit la phrase — MP3 ElevenLabs généré (voir REGISTRE-VOIX-A-GENERER.md §4), fallback TTS. JAMAIS de TTS auto au chargement (EP-033).
4. Fermeture par tap n'importe où. Ne bloque jamais le jeu (pause implicite).

## Règles d'implémentation

- Composant partagé : `site/js/regle-info.js` (à créer) — s'initialise avec `RegleInfo.init({ texte, mp3, picto })`, injecte le bouton + la modal. **1 seul composant, 40 configurations** — pas de copier-coller par jeu.
- La phrase de règle vit dans le jeu (pas dans catalog.js — elle peut évoluer avec le jeu).
- Déploiement par vagues : d'abord les 9 nouveaux (mj-34..42), puis le reste au fil des retouches.
- Chaque phrase ajoutée = 1 ligne au registre voix §4.

## Anti-patterns

- ❌ Paragraphe de règles (personne ne lit, surtout pas à 4-8 ans)
- ❌ Tutoriel bloquant au premier lancement (l'essai-erreur est le tutoriel)
- ❌ TTS au chargement de page
- ❌ Copier-coller du composant dans chaque jeu (composant partagé obligatoire)
