#!/usr/bin/env python3
"""
Générateur de segments audio (JSON text-to-dialogue) pour 10 dinos.
Produit 60 fichiers JSON (10 dinos × 6 blocs) + 10 fichiers .md récap.
Données sources : site/js/dinos-data.js
Template : Tricératops V0 validé 2026-05-16.
"""

import json
import os
from pathlib import Path

# Voix (gravées, ne pas inventer)
NAR_H_VOICE = 'cbRcktt2xvoeFpdvW2wg'  # Narrateur H
WEX_VOICE = 'G54e8CyYslC2Y4ZupTlg'    # Wex v24 figé 2026-05-11

# Données 10 dinos (extraites dinos-data.js)
DINOS = {
    'tyrannosaurus': {
        'name': 'T-Rex',
        'full': 'Tyrannosaurus Rex',
        'nom_etym': 'Son nom veut dire «lézard tyran» en grec — c\'est le lézard qui commande tout le monde !',
        'regime': 'Carnivore',
        'superpower': 'La morsure la plus puissante de tous les dinos terrestres !',
        'chasseurs': 'Personne n\'osait l\'attaquer... il était le roi !',
        'proies': 'Triceratops, Edmontosaurus, Ankylosaure',
        'fait': 'Ses dents mesuraient 20 cm — plus longues que ta main ! Et il en avait 60 !',
        'taille_m': 12, 'hauteur_m': 4.0, 'poids_t': 8,
    },
    'spinosaurus': {
        'name': 'Spinosaure',
        'full': 'Spinosaurus aegyptiacus',
        'nom_etym': 'Son nom veut dire «lézard à épines» en latin — il avait une grande voile sur le dos !',
        'regime': 'Piscivore (mange du poisson !)',
        'superpower': 'Nager comme un crocodile géant ! Il adorait l\'eau.',
        'chasseurs': 'Personne n\'osait s\'y frotter',
        'proies': 'Gros poissons, requins préhistoriques',
        'fait': 'La voile sur son dos pouvait faire 2 mètres de haut — comme une porte d\'entrée !',
        'taille_m': 15, 'hauteur_m': 4.5, 'poids_t': 9,
    },
    'giganotosaurus': {
        'name': 'Giganotosaure',
        'full': 'Giganotosaurus carolinii',
        'nom_etym': 'Son nom veut dire «lézard géant du sud» en grec — il vivait très loin au sud !',
        'regime': 'Carnivore',
        'superpower': 'Chassait en groupe pour attaquer les ÉNORMES sauropodes !',
        'chasseurs': 'Aucun prédateur ne l\'attaquait',
        'proies': 'Argentinosaurus (le plus grand dino !)',
        'fait': 'C\'est le plus grand carnivore d\'Amérique du Sud ! Plus grand encore que le T-Rex !',
        'taille_m': 13, 'hauteur_m': 4.0, 'poids_t': 8,
    },
    'allosaurus': {
        'name': 'Allosaure',
        'full': 'Allosaurus fragilis',
        'nom_etym': 'Son nom veut dire «lézard différent» en grec — ses os étaient différents de tous les autres !',
        'regime': 'Carnivore',
        'superpower': 'Ouvrait sa gueule TRÈS grande comme une hache pour frapper !',
        'chasseurs': 'Aucun de son époque n\'osait l\'affronter seul',
        'proies': 'Stégosaure, Camarasaure, jeunes sauropodes',
        'fait': 'Le T-Rex du Jurassique ! On a trouvé des centaines de ses os dans un seul endroit !',
        'taille_m': 10, 'hauteur_m': 3.5, 'poids_t': 2.5,
    },
    'carnotaurus': {
        'name': 'Carnotaure',
        'full': 'Carnotaurus sastrei',
        'nom_etym': 'Son nom veut dire «taureau qui mange de la viande» en latin — un taureau carnivore !',
        'regime': 'Carnivore',
        'superpower': 'Le chasseur le PLUS RAPIDE parmi les grands carnivores — jusqu\'à 56 km/h !',
        'chasseurs': 'Aucun dans son territoire',
        'proies': 'Hadrosaures, dinosaures moyens',
        'fait': 'Il avait DE VRAIES CORNES au-dessus des yeux — comme un taureau ! Et il était ultra-rapide !',
        'taille_m': 8, 'hauteur_m': 3.0, 'poids_t': 1.5,
    },
    'brachiosaurus': {
        'name': 'Brachiosaure',
        'full': 'Brachiosaurus altithorax',
        'nom_etym': 'Son nom veut dire «lézard aux bras» en grec — ses pattes avant étaient plus longues que ses pattes arrière !',
        'regime': 'Herbivore',
        'superpower': 'Mangeait les feuilles tout en haut des arbres que les autres ne pouvaient pas atteindre !',
        'chasseurs': 'Seulement les très grands carnivores osaient attaquer les jeunes',
        'proies': 'Mange des plantes',
        'fait': 'Sa tête était à 13 mètres de haut — aussi haut qu\'une maison ! Pour avaler, il avalait des pierres pour broyer sa nourriture dans son estomac.',
        'taille_m': 26, 'hauteur_m': 9.0, 'poids_t': 60,
    },
    'diplodocus': {
        'name': 'Diplodocus',
        'full': 'Diplodocus longus',
        'nom_etym': 'Son nom veut dire «double poutre» en grec — à cause de ses os de queue tout spéciaux !',
        'regime': 'Herbivore',
        'superpower': 'Sa queue claquait comme un fouet — BOOM ! — pour faire peur aux chasseurs !',
        'chasseurs': 'Allosaure, Ceratosaure pour les jeunes',
        'proies': 'Mange des plantes',
        'fait': 'Sa queue faisait un BOOM supersonique en claquant ! Plus fort qu\'une explosion !',
        'taille_m': 27, 'hauteur_m': 4.5, 'poids_t': 15,
    },
    'ankylosaurus': {
        'name': 'Ankylosaure',
        'full': 'Ankylosaurus magniventris',
        'nom_etym': 'Son nom veut dire «lézard rigide» en grec — tout son dos était couvert d\'une armure dure !',
        'regime': 'Herbivore',
        'superpower': 'Son dos était une armure de plaques osseuses + une queue-massue pour casser les os du T-Rex !',
        'chasseurs': 'T-Rex essayait ! Mais c\'était très dur...',
        'proies': 'Mange des plantes',
        'fait': 'Sa queue-massue pouvait briser les os du T-Rex ! Même l\'os le plus solide !',
        'taille_m': 10, 'hauteur_m': 1.8, 'poids_t': 8,
    },
    'stegosaurus': {
        'name': 'Stégosaure',
        'full': 'Stegosaurus ungulatus',
        'nom_etym': 'Son nom veut dire «lézard à toit» en grec — ses grandes plaques ressemblaient à des tuiles de maison !',
        'regime': 'Herbivore',
        'superpower': 'Les grandes plaques sur son dos régulaient sa température comme un radiateur !',
        'chasseurs': 'Allosaure — mais attention à la queue !',
        'proies': 'Mange des plantes',
        'fait': 'Son cerveau était de la taille d\'une noix ! Mais sa queue avec 4 piques pouvait percer l\'Allosaure !',
        'taille_m': 9, 'hauteur_m': 2.8, 'poids_t': 4,
    },
    'velociraptor': {
        'name': 'Vélociraptor',
        'full': 'Velociraptor mongoliensis',
        'nom_etym': 'Son nom veut dire «voleur rapide» en latin — il courait très vite pour attraper sa nourriture !',
        'regime': 'Carnivore',
        'superpower': 'Ultra-malin, chassait en équipe, et avait une grande griffe rétractable !',
        'chasseurs': 'Grands carnivores',
        'proies': 'Protocératops, petits dinos',
        'fait': 'Le vrai Vélociraptor était de la taille d\'un dindon ! Et il avait DES PLUMES ! Rien à voir avec Jurassic Park !',
        'taille_m': 1.8, 'hauteur_m': 0.5, 'poids_t': 0.015,
    },
}

def format_size(d):
    """Formatte les dimensions pour dialogue."""
    long = d['taille_m']
    haut = d['hauteur_m']
    poids = d['poids_t']

    # Comparaisons (simplifiées, inspirées _compLong, _compHaut, _compPoids)
    if long >= 24: comp_long = f"plus de deux bus en une seule file !"
    elif long >= 13: comp_long = f"un bus et demi !"
    elif long >= 10: comp_long = f"un bus !"
    else: comp_long = f"plusieurs voitures !"

    if haut >= 9: comp_haut = f"un immeuble de trois étages !"
    elif haut >= 3: comp_haut = f"deux Papas l'un sur l'autre !"
    else: comp_haut = f"plus bas qu'un Papa debout !"

    if poids >= 50: comp_poids = f"plus de dix éléphants !"
    elif poids >= 15: comp_poids = f"trois éléphants !"
    elif poids >= 8: comp_poids = f"deux éléphants !"
    else: comp_poids = f"un animal gros !"

    return comp_long, comp_haut, comp_poids

def create_json_segment(texts_nar_wex):
    """Crée un payload JSON text-to-dialogue (2 narrateurs alternés)."""
    inputs = []
    voice_toggle = [NAR_H_VOICE, WEX_VOICE, NAR_H_VOICE, WEX_VOICE]

    for i, text in enumerate(texts_nar_wex[:4]):
        inputs.append({
            'voice_id': voice_toggle[i],
            'text': text,
        })

    return {
        'inputs': inputs,
        'model_id': 'eleven_v3',
        'output_format': 'mp3_44100_128',
        'pronunciation_dictionary_locators': [],
        'settings': {},
        'language_code': 'fr',
        'seed': None,
        'apply_text_normalization': 'auto',
    }

def main():
    base_dir = Path(__file__).parent / 'assets' / 'audio'
    base_dir.mkdir(parents=True, exist_ok=True)

    json_count = 0
    md_count = 0

    for dino_id, dino in DINOS.items():
        comp_long, comp_haut, comp_poids = format_size(dino)

        # Bloc 1 — NOM
        block_nom = [
            f"[happily] Voici le {dino['name']} ! Son grand nom de savant, c'est {dino['full']}.",
            f"[curious] {dino['name'].upper()[:3]}… Ça veut dire quoi ?",
            f"[softly] {dino['nom_etym']}",
            f"[gasps] Quel nom ! C'est impressionnant !",
        ]
        json_file = base_dir / f"_seg-{dino_id}-nom.json"
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(create_json_segment(block_nom), f, ensure_ascii=False, indent=2)
        json_count += 1

        # Bloc 2 — TAILLE
        block_taille = [
            f"[happily] Le {dino['name']} mesurait {int(dino['taille_m'])} mètres de long — {comp_long}",
            f"[excited] {comp_long}!",
            f"[serious] Debout, il faisait {dino['hauteur_m']} mètres de haut — {comp_haut} Et il pesait {int(dino['poids_t']) if dino['poids_t'] >= 1 else int(dino['poids_t']*1000)} {'mille kilos' if dino['poids_t'] >= 1 else 'kilos'}.",
            f"[gasps] Tellement lourd ! {comp_poids}",
        ]
        json_file = base_dir / f"_seg-{dino_id}-taille.json"
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(create_json_segment(block_taille), f, ensure_ascii=False, indent=2)
        json_count += 1

        # Bloc 3 — RÉGIME
        regime_food = dino['proies'].split(',')[0] if ',' in dino['proies'] else dino['proies']
        block_regime = [
            f"[happily] Le {dino['name']} mangeait {('du poisson' if 'poisson' in dino['regime'].lower() else 'des plantes' if 'herbivore' in dino['regime'].lower() else 'de la viande')}.",
            f"[curious] Quoi exactement ?",
            f"[softly] {dino['superpower']}",
            f"[excited] Incroyable !",
        ]
        json_file = base_dir / f"_seg-{dino_id}-regime.json"
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(create_json_segment(block_regime), f, ensure_ascii=False, indent=2)
        json_count += 1

        # Bloc 4 — SUPERPOWER
        block_super = [
            f"[confident] Son super-pouvoir : {dino['superpower']}",
            f"[gasps] Quel pouvoir !",
            f"[serious] C'était une vraie arme pour sa survie.",
            f"[excited] Le plus fort !",
        ]
        json_file = base_dir / f"_seg-{dino_id}-superpower.json"
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(create_json_segment(block_super), f, ensure_ascii=False, indent=2)
        json_count += 1

        # Bloc 5 — ENNEMIS
        block_ennemis = [
            f"[serious] {dino['chasseurs']}",
            f"[curious] C'était dangereux ?",
            f"[confident] Oui et non. Il devait rester prudent.",
            f"[excited] Une vie d'aventures !",
        ]
        json_file = base_dir / f"_seg-{dino_id}-ennemis.json"
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(create_json_segment(block_ennemis), f, ensure_ascii=False, indent=2)
        json_count += 1

        # Bloc 6 — FUNFACT
        block_fun = [
            f"[happily] Le sais-tu ? {dino['fait']}",
            f"[gasps] Ouh là là !",
            f"[softly] C'était un dinosaure vraiment spécial et unique.",
            f"[chuckles] Un vrai dinosaure !",
        ]
        json_file = base_dir / f"_seg-{dino_id}-funfact.json"
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(create_json_segment(block_fun), f, ensure_ascii=False, indent=2)
        json_count += 1

        # Fichier .md récap
        md_file = Path(__file__).parent / 'scripts-audio' / f"{dino_id}-V1.md"
        md_file.parent.mkdir(parents=True, exist_ok=True)

        md_content = f"""# Script audio V1 — {dino['name']} · Duo Narrateur H + Wex

> **STATUT : V1 TEXTE INDUSTRIALISÉ EP-039 2026-05-16. Prêt pour production ElevenLabs.**
> Structure figée : **6 blocs × 4 répliques** = 24 inputs.

## Bloc 1 — Le nom (bouton 🔊 sur le nom)

**NARRATEUR** `[happily]`
> Voici le {dino['name']} ! Son grand nom de savant, c'est {dino['full']}.

**WEX** `[curious]`
> Ça veut dire quoi ?

**NARRATEUR** `[softly]`
> {dino['nom_etym']}

**WEX** `[gasps]`
> Quel nom !

## Bloc 2 — La taille (bouton 🔊 sur les stats)

**NARRATEUR**
> Le {dino['name']} mesurait {int(dino['taille_m'])} mètres de long — {comp_long}

**WEX** `[excited]`
> Énorme !

**NARRATEUR** `[serious]`
> Debout, il faisait {dino['hauteur_m']} mètres de haut — {comp_haut} Et il pesait {int(dino['poids_t']) if dino['poids_t'] >= 1 else int(dino['poids_t']*1000)} {'mille kilos' if dino['poids_t'] >= 1 else 'kilos'}.

**WEX** `[gasps]`
> Tellement lourd !

## Bloc 3 — Ce qu'il mange (bouton 🔊 sur le régime)

**NARRATEUR** `[happily]`
> Le {dino['name']} mangeait {('du poisson' if 'poisson' in dino['regime'].lower() else 'des plantes' if 'herbivore' in dino['regime'].lower() else 'de la viande')}.

**WEX** `[curious]`
> Quoi exactement ?

**NARRATEUR**
> {dino['superpower']}

**WEX** `[excited]`
> Incroyable !

## Bloc 4 — Son super-pouvoir (bouton 🔊)

**NARRATEUR** `[confident]`
> Son super-pouvoir : {dino['superpower']}

**WEX** `[curious]`
> C'était vraiment puissant ?

**NARRATEUR** `[serious]`
> Oui ! C'était sa meilleure arme.

**WEX** `[excited]`
> Le plus fort !

## Bloc 5 — Qui le chasse (bouton 🔊 sur ennemis)

**NARRATEUR** `[serious]`
> {dino['chasseurs']}

**WEX** `[curious]`
> C'était dangereux ?

**NARRATEUR** `[confident]`
> Oui. Il devait rester prudent.

**WEX** `[excited]`
> Une vie d'aventures !

## Bloc 6 — Le sais-tu ? (bouton 🔊 fun fact)

**NARRATEUR** `[happily]`
> Le sais-tu ? {dino['fait']}

**WEX** `[gasps]`
> Ouh là là !

**NARRATEUR** `[softly]`
> Absolument ! Unique en son genre.

**WEX** `[chuckles]`
> Un vrai dinosaure !

---

_V1 générée 2026-05-16 (EP-039 industrialisation). Sources : dinos-data.js. Voix : Narrateur H (cbRcktt2xvoeFpdvW2wg) + Wex v24 (G54e8CyYslC2Y4ZupTlg). Model eleven_v3._
"""
        with open(md_file, 'w', encoding='utf-8') as f:
            f.write(md_content)
        md_count += 1

    print(f"✅ Généré {json_count} fichiers JSON (60 attendus)")
    print(f"✅ Généré {md_count} fichiers .md récap (10 attendus)")
    print(f"Répertoire : {base_dir}")

if __name__ == '__main__':
    main()
