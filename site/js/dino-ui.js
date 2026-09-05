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

    plantes_titre_section: 'Les plantes de cette époque',
    compteur_plantes_un: '{n} plante',
    compteur_plantes_plusieurs: '{n} plantes',
    plantes_titre_pousse: 'Où elle pousse',
    plantes_titre_taille: 'Sa taille',
    plantes_titre_feuille: 'Sa feuille et ses graines',
    plantes_titre_mangee: 'Qui la mangeait',
    plantes_titre_truc_fou: 'Le truc fou',
    plantes_label_graines: 'Ses graines :',
    plantes_label_mangeurs: 'Ceux qui la mangeaient :',
    plantes_tts_pousse: '{nom} poussait {environnement}. On la trouvait en {region}.',
    plantes_tts_taille: '{nom} ! Elle mesurait {hauteur} de haut — {comparaison}',
    plantes_tts_feuille: 'Sa feuille : {feuille} Ses graines : {graines}',
    plantes_tts_mangee: '{comment}',
    plantes_tts_truc_fou: 'Son super-pouvoir ! {superpower} Le savais-tu ? {fait}',

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
    'journey_ep_naissance-terre_label': "La naissance de la Terre",
    'journey_ep_naissance-terre_date': "il y a 4 milliards et demi d'années",
    'journey_ep_vie-dans-eau_label': "La vie commence dans l'eau",
    'journey_ep_vie-dans-eau_date': "il y a 3 milliards et demi d'années",
    'journey_ep_sortie-eau_label': "Des poissons sortent de l'eau",
    'journey_ep_sortie-eau_date': "il y a 375 millions d'années",
    'journey_ep_reptiles-permien_label': "Les premiers vrais reptiles",
    'journey_ep_reptiles-permien_date': "il y a 300 millions d'années",
    journey_ep_intro_label: 'Le grand voyage',
    journey_ep_intro_date: "le début de l'aventure",
    'journey_ep_grande-mort_label': 'La Grande Mort',
    'journey_ep_grande-mort_date': "il y a 252 millions d'années",
    journey_ep_trias_label: 'Le Trias',
    journey_ep_trias_date: "il y a 250 millions d'années",
    journey_ep_jurassique_label: 'Le Jurassique',
    journey_ep_jurassique_date: "il y a 150 millions d'années",
    journey_ep_cretace_label: 'Le Crétacé',
    journey_ep_cretace_date: "il y a 100 millions d'années",
    journey_ep_extinction_label: 'La Grande Extinction',
    journey_ep_extinction_date: "il y a 66 millions d'années",
    journey_ep_mammiferes_label: 'L’ère des mammifères',
    journey_ep_mammiferes_date: 'après les dinos',
    'journey_ep_glace-mammouth_label': 'L’âge de glace & le mammouth',
    'journey_ep_glace-mammouth_date': "l'époque du froid",
    journey_ep_paleo_label: 'La paléontologie',
    journey_ep_paleo_date: 'aujourd’hui',
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
    // Les donnees (dinos-racines.js) stockent la langue en FR : on la traduit ici.
    langue_grec: 'grec',
    langue_latin: 'latin',

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

  // ── Mesures ────────────────────────────────────────────────────────────────
  // Les DONNEES sont en metres et en tonnes (canon FR, jamais touche). Les langues
  // qui n'utilisent pas le metrique doivent voir la valeur CONVERTIE, sinon on
  // afficherait "22 feet" pour un dino de 22 metres. Arrondi toujours : un chiffre
  // a decimale trahit la conversion et casse la lecture a voix haute.
  function imperial() { return T('unite_metres') === 'feet'; }

  // Longueur : metres -> pieds si la langue est imperiale.
  function longueur(m) {
    if (m == null) return null;
    return imperial() ? Math.round(m * 3.28084) : m;
  }
  // Masse : tonnes -> livres si imperiale, kilos sinon.
  // Arrondi a un chiffre ROND (charte) : "103 617 lbs" trahit la conversion et ne
  // se lit pas a voix haute. On arrondit a la centaine, ou au millier au-dela de 10 000.
  function masse(t) {
    if (t == null) return null;
    var v = imperial() ? t * 2204.62 : t * 1000;
    if (v >= 10000) return Math.round(v / 1000) * 1000;
    if (v >= 1000) return Math.round(v / 100) * 100;
    return Math.round(v);
  }
  // Libelle complet "22 m" / "72 feet", unite prise au dictionnaire.
  function longueurTxt(m) {
    if (m == null) return '?';
    var v = longueur(m);
    return imperial() ? v + ' ' + T('unite_metres') : v + ' m';
  }
  function masseTxt(t) {
    if (t == null) return '?';
    var v = masse(t);
    var loc = global.Lang ? global.Lang.bcp47() : 'fr-FR';
    return v.toLocaleString(loc) + ' ' + T('unite_kg');
  }

  global.DinoUI = {
    T: T, Tn: Tn, _fr: FR, _over: over,
    imperial: imperial, longueur: longueur, masse: masse,
    longueurTxt: longueurTxt, masseTxt: masseTxt
  };
  global.DINO_UI_CLES = Object.keys(FR);   // sert a la porte de verification
  global.T = T;   // raccourcis, la page les appelle des dizaines de fois
  global.Tn = Tn;
})(window);
