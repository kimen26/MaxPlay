// dino-ui.js — dictionnaire UI de l'encyclopedie dino (chassis : menus, onglets,
// libelles de fiche, phrases TTS construites). Le CONTENU des dinos passe par
// dinos-i18n.js ; ici c'est tout ce qui est ecrit en dur dans la page.
//
// Ordre de chargement : lang.js -> dino-ui.js -> (le reste)
// Une langue sans traduction retombe sur le FR, champ par champ : jamais de trou.
(function (global) {
  'use strict';

  // FR = source. Toute autre langue surcharge par-dessus (window.DINO_UI_STRINGS).
  var FR = {
    page_titre: 'Dinos — MaxPlay',
    header_titre_menu: 'Les Dinosaures',
    lien_compte: 'Compte',

    onglet_familles: 'Les familles',
    onglet_regime: "Ce qu'il mange",
    onglet_voyage: 'Le voyage',
    onglet_epoques: 'Les époques',
    onglet_dico: 'Le dico',

    menu_famille_intro: 'Chaque famille a un nom rigolo de savant. Touche une carte pour découvrir le sien !',
    menu_famille_legende_oeuf: "Dans les jeux, l'œuf de cette couleur vient de cette famille !",
    menu_epoque_intro: "Les dinos n'ont pas tous vécu en même temps ! On les range par époque, de la plus ancienne à aujourd'hui.",
    menu_dico_intro: "Les noms des dinos sont faits de petits mots de savants ! Touche un mot pour l'écouter.",
    menu_dico_indisponible: 'Le dico arrive bientôt !',

    compteur_dinos_un: '{n} dino',
    compteur_dinos_plusieurs: '{n} dinos',

    grid_accroche_suffixe: 'Tape sur un dino pour tout savoir !',

    fiche_aussi_appele: 'aussi appelé {alias}',
    fiche_bouton_histoire_complete: "Écoute toute l'histoire de {nom}",
    fiche_titre_histoire: 'Son histoire',
    fiche_titre_taille: 'Sa taille',
    fiche_titre_vie: 'Sa vie de dino',
    fiche_titre_truc_fou: 'Le truc fou',
    fiche_stat_ailes: 'Ailes',
    fiche_stat_long: 'Long',
    fiche_stat_haut: 'Haut',
    fiche_stat_poids: 'Poids',
    fiche_label_copains: 'Ses copains :',
    fiche_label_ennemis: 'Ses ennemis :',
    fiche_label_superpouvoir: 'Super-pouvoir :',
    fiche_galerie_titre: "Plus d'images",
    fiche_video_titre_defaut: 'Vidéo',

    unite_kg: 'kg',
    unite_metres: 'mètres',
    unite_kilos: 'kilos',
    unite_mille_kilos: 'mille kilos',

    badge_titre_audio: 'Histoire à écouter',
    badge_titre_images: 'Photos et images',

    extra_label_gros_plan: 'Gros plan',
    extra_label_mange_m: "Ce qu'il mange",
    extra_label_mange_f: "Ce qu'elle mange",
    extra_label_paris: 'Dans Paris !',
    extra_label_ecosysteme: 'Son monde',
    extra_label_funfact: 'Le savais-tu ?',

    journey_intro: "Le voyage dans le temps, raconté. Appuie sur ▶ pour écouter chaque époque, de la première vie jusqu'à aujourd'hui. La flèche 👉 montre où continuer.",
    journey_bouton_ecoute: 'Écoute {episode}',
    pangee_bouton_ecoute: "Écoute l'histoire de la Pangée",
    pangee_sous_desc: 'Avant et pendant les dinos !',
    extinction_bouton_ecoute: "Écoute l'histoire de la Grande Extinction",
    extinction_sous_desc: 'Pourquoi les dinos ont-ils disparu ?',

    continent_amerique_nord: 'Amérique du Nord',
    continent_amerique_sud: 'Amérique du Sud',
    continent_europe: 'Europe',
    continent_afrique: 'Afrique',
    continent_asie: 'Asie',
    continent_antarctique: 'Antarctique',
    continent_oceanie: 'Océanie',
    continent_ameriques: 'Amériques',
    continent_eurasie: 'Eurasie',
    continent_marin_defaut: 'Dans les mers du monde entier',

    tts_fallback_regime: 'Les dinosaures ne mangeaient pas tous la même chose. Les carnivores mangeaient de la viande. Les herbivores mangeaient des plantes.',
    tts_fallback_famille: 'Les grandes familles de dinosaures !',
    tts_fallback_periode: "Le grand voyage dans le temps ! On remonte très loin, de la première vie jusqu'à aujourd'hui.",
    tts_fallback_epoque: 'Range les dinosaures par époque ! Du Permien, avant les dinosaures, jusqu\'à aujourd\'hui.',
    tts_fallback_dico: "Les noms des dinos sont faits de petits mots de savants ! Touche un mot pour l'écouter.",
    tts_fallback_generique: 'Les dinosaures !',

    dico_phrase_tts: '{mot}, en {langue}, ça veut dire : {sens}.',
    dico_phrase_tts_sans_langue: '{mot} ça veut dire : {sens}.',

    fiche_tts_nom_fallback: "Son vrai nom c'est {nom_savant}",
    fiche_tts_regime: '{nom} est {regime}. Il mange {proies}. {chasseurs}. {amis}',
    fiche_tts_funfact: 'Son super-pouvoir ! {superpouvoir} Le savais-tu ? {fait}',

    stats_longueur: 'Il mesurait {n} mètres de long — {comparaison}',
    stats_envergure: "Il avait des ailes de {n} mètres d'un bout à l'autre — {comparaison}",
    stats_hauteur: 'Debout, il faisait {n} mètres de haut — {comparaison}',
    stats_poids: 'Et il pesait {poids} — {comparaison}'
  };

  // Lecture PARESSEUSE : le fichier de langue (dino-ui-strings.<lang>.js) se charge
  // apres ce module. Figer `over` ici donnerait toujours {} et rien ne serait traduit.
  function over() { return global.DINO_UI_STRINGS || {}; }

  // T(cle, vars) : rend le libelle traduit, variables {x} remplacees.
  // Cle inconnue -> on retourne la cle elle-meme (visible en test, jamais un blanc).
  function T(cle, vars) {
    var o = over();
    var txt = Object.prototype.hasOwnProperty.call(o, cle) ? o[cle] : FR[cle];
    if (typeof txt !== 'string') return cle;
    if (!vars) return txt;
    return txt.replace(/\{(\w+)\}/g, function (tout, nom) {
      return Object.prototype.hasOwnProperty.call(vars, nom) ? String(vars[nom]) : tout;
    });
  }

  // Pluriel : les langues distinguent 1 / plusieurs differemment, le code appelle
  // toujours pareil et c'est le dictionnaire qui decide.
  function Tn(base, n, vars) {
    var cle = base + (Math.abs(n) === 1 ? '_un' : '_plusieurs');
    var v = vars || {};
    v.n = n;
    return T(cle, v);
  }

  global.DinoUI = { T: T, Tn: Tn, _fr: FR, _over: over };
  global.DINO_UI_CLES = Object.keys(FR);   // sert a la porte de verification
  global.T = T;   // raccourcis, la page les appelle des dizaines de fois
  global.Tn = Tn;
})(window);
