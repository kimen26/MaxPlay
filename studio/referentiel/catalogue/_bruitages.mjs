// ─────────────────────────────────────────────────────────────────────────────
// _bruitages.mjs — sons sans texte, HORS LANGUE
//
// Type `bruitage` : pas de texte, pas de voix, rien à traduire — un klaxon reste
// un klaxon dans les vingt langues. C'est pour ça que ce fichier est à la racine
// du catalogue et non sous une langue.
//
// Mais un bruitage a quand même une SOURCE à tracer : le prompt anglais qui l'a
// produit (`text_to_sound_effects` attend de l'anglais, cf. _BANQUE-SONS.md § 3).
// Sans lui, un bruitage n'est pas plus reproductible qu'une voix dont on aurait
// perdu le texte.
//
// ⚠️ prompt_verifie: false PARTOUT — les prompts d'origine n'ont pas été
// conservés. Ceux ci-dessous sont RECONSTRUITS depuis le nom du fichier, son
// rôle documenté et (pour les cris de bébés) la fiche de la banque. Ils
// deviendront vrais à la première régénération faite depuis ce fichier.
// ─────────────────────────────────────────────────────────────────────────────

const bruitage = (id, prompt_en, fichier, extra) => ({
  cle: `sfx.${id}`,
  type: 'bruitage',
  i18n: 'invariant',
  prompt_en,
  prompt_verifie: false,
  fichier,
  production: { moteur: 'text_to_sound_effects', traitement: ['padding-250ms'] },
  ...(typeof extra === 'string' ? { note: extra } : extra || {}),
});

// ── Identité sonore du hub (sounds/ui/, 10) ─────────────────────────────────
const UI = [
  bruitage('moteur-bus', 'friendly city bus engine starting, warm and soft, cartoon style, short',
    'sounds/ui/moteur-bus.mp3', "Identité sonore du hub « Ligne de Max »."),
  bruitage('klaxon', 'short friendly bus horn, warm, cartoon, not aggressive',
    'sounds/ui/klaxon.mp3'),
  bruitage('porte-bus', 'city bus doors opening with a soft pneumatic hiss, short',
    'sounds/ui/porte-bus.mp3'),
  bruitage('tap', 'soft rounded UI tap, gentle, child friendly, very short',
    'sounds/ui/tap.mp3'),
  bruitage('fanfare-victoire', 'short cheerful fanfare, bright, playful, child friendly',
    'sounds/ui/fanfare-victoire.mp3'),
  bruitage('etoile', 'magical twinkling star chime, bright and short',
    'sounds/ui/etoile.mp3'),
  bruitage('deblocage', 'positive unlock chime, ascending, rewarding, short',
    'sounds/ui/deblocage.mp3'),
  bruitage('voyage-temps', 'time travel whoosh, dreamy, soft, not scary',
    'sounds/ui/voyage-temps.mp3', "Onglet Voyage de l'encyclopédie."),
  bruitage('veilleuse', 'very soft night light hum, calm, reassuring, loopable',
    'sounds/ui/veilleuse.mp3'),
  bruitage('ambiance-nuit', 'calm night ambience, soft crickets, reassuring, seamless loop',
    'sounds/ui/ambiance-nuit.mp3', 'Boucle — vérifier le raccord avant/après.'),
];

// ── Cris de bébés dinos par famille (11) — banque § 4 bis ───────────────────
// Structure de prompt documentée : « Cute baby <type> : <caractéristique>,
// short, adorable, not scary. Single call, no music. » La banque annonce les
// prompts exacts « en commentaire du présent tableau » — ce commentaire est
// ABSENT du fichier : seule la caractéristique (colonne 3, traduction FR fidèle
// du prompt) survit. La reformulation EN ci-dessous est donc reconstruite.
const NOTE_BEBE = 'Banque §4 bis (nid-ui.js → playBabyCry). Structure de prompt documentée, '
  + 'formulation EN exacte non conservée (le commentaire annoncé dans la banque est introuvable).';
const CONSO_BEBE = ['nid-ui.js (playBabyCry, runHatchSequence)'];

const criBebe = (famille, prompt) => bruitage(`cri-bebe-${famille.replace(/_/g, '-')}`, prompt,
  `sounds/fx/cri-bebe-${famille}.mp3`, { note: NOTE_BEBE, consommee_par: CONSO_BEBE });

const CRIS_BEBES = [
  criBebe('trex', 'Cute baby T-Rex: high-pitched raspy chirp with just a hint of growl, a predator chick not a movie roar, short, adorable, not scary. Single call, no music.'),
  criBebe('cou_long', 'Cute baby sauropod: soft deep rumble with a small rising finish, baby elephant style, short, adorable, not scary. Single call, no music.'),
  criBebe('arme', 'Cute baby ankylosaur: deep short bleat or snort, goat kid style, short, adorable, not scary. Single call, no music.'),
  criBebe('cornu', 'Cute baby ceratopsian: very short raspy grunt ending in a little chirp, short, adorable, not scary. Single call, no music.'),
  criBebe('bec', 'Cute baby hadrosaur: small melodic nasal horn, two rising notes, short, adorable, not scary. Single call, no music.'),
  criBebe('raptor', 'Cute baby raptor: fast high-pitched chirps, three in a row, little chick style, short, adorable, not scary. Single call, no music.'),
  criBebe('pterosaures', 'Cute baby pterosaur: small shrill thin squeak, seabird chick style, short, adorable, not scary. Single call, no music.'),
  criBebe('enaliosaures', 'Cute baby marine reptile: high-pitched dolphin-like whistle with a water bubble, short, adorable, not scary. Single call, no music.'),
  criBebe('volant', 'Cute baby synapsid: soft slightly raspy mewl, not a reptile cry, short, adorable, not scary. Single call, no music.'),
  criBebe('mammiferes', 'Cute baby mammoth: warm short mini trumpet, tiny version of a mammoth call, short, adorable, not scary. Single call, no music.'),
  criBebe('oiseaux', 'Cute baby terror bird: two chirps and a light beak clack, big-beaked nestling, short, adorable, not scary. Single call, no music.'),
];

// ── Dinos génériques (9) ────────────────────────────────────────────────────
const DINO = [
  bruitage('dino-bebe', 'cute generic baby dinosaur chirp, short, adorable, not scary',
    'sounds/fx/dino-bebe.mp3', { note: 'Repli générique du nid (famille inconnue) + mj-46.', consommee_par: ['nid-ui.js (fallback)', 'mj-46'] }),
  bruitage('dino-bebe-2', 'cute generic baby dinosaur chirp, variation, short, adorable, not scary',
    'sounds/fx/dino-bebe-2.mp3', { note: 'Repli générique du nid + mj-46.', consommee_par: ['nid-ui.js (fallback)', 'mj-46'] }),
  bruitage('dino-bebe-3', 'cute generic baby dinosaur chirp, second variation, short, adorable, not scary',
    'sounds/fx/dino-bebe-3.mp3', { note: 'Repli générique du nid + mj-46.', consommee_par: ['nid-ui.js (fallback)', 'mj-46'] }),
  bruitage('dino-mange', 'cartoon munching and chomping, playful, short',
    'sounds/fx/dino-mange.mp3'),
  bruitage('dino-oeuf-eclot', 'eggshell cracking open, gentle, cute, short',
    'sounds/fx/dino-oeuf-eclot.mp3'),
  bruitage('dino-pas', 'heavy soft dinosaur footsteps, slow, gentle, not scary',
    'sounds/fx/dino-pas.mp3'),
  bruitage('dino-raptor', 'small cartoon raptor dinosaur screech, not scary, short',
    'sounds/fx/dino-raptor.mp3'),
  bruitage('dino-sauropode', 'deep gentle sauropod call, warm, soft, short',
    'sounds/fx/dino-sauropode.mp3'),
  bruitage('dino-trex', 'friendly cartoon T-Rex roar, soft, not scary, short',
    'sounds/fx/dino-trex.mp3'),
  bruitage('dino-tricera', 'gentle cartoon triceratops grunt, short',
    'sounds/fx/dino-tricera.mp3'),
];

// ── Animaux de la ferme et compagnie (8) ────────────────────────────────────
const ANIMAUX = [
  bruitage('canard', 'friendly duck quack, cartoon, short', 'sounds/fx/canard.mp3'),
  bruitage('chat', 'soft cute cat meow, short', 'sounds/fx/chat.mp3'),
  bruitage('cheval', 'gentle warm horse neigh, short', 'sounds/fx/cheval.mp3'),
  bruitage('chien', 'friendly happy small dog bark, short', 'sounds/fx/chien.mp3'),
  bruitage('elephant', 'friendly elephant trumpet, short', 'sounds/fx/elephant.mp3'),
  bruitage('loup', 'distant soft wolf howl, dreamy, not scary, short', 'sounds/fx/loup.mp3'),
  bruitage('oiseau', 'cheerful little bird chirping, soft, short', 'sounds/fx/oiseau.mp3'),
  bruitage('vache', 'friendly warm cow moo, short', 'sounds/fx/vache.mp3'),
];

// ── Véhicules (5) ───────────────────────────────────────────────────────────
const VEHICULES = [
  bruitage('bip-recul', 'soft vehicle reverse beeping, cartoon, not aggressive, short',
    'sounds/fx/bip-recul.mp3'),
  bruitage('decollage-fusee', 'cartoon rocket takeoff, soft rumble and whoosh, not scary',
    'sounds/fx/decollage-fusee.mp3'),
  bruitage('demarrage-bus', 'city bus engine starting, warm and soft, short',
    'sounds/fx/demarrage-bus.mp3'),
  bruitage('frein-bus', 'bus brakes soft gentle squeal, short', 'sounds/fx/frein-bus.mp3'),
  bruitage('voiture-vroom', 'playful cartoon car engine vroom, short',
    'sounds/fx/voiture-vroom.mp3'),
];

// ── Pools de victoire-sounds.js (23) ────────────────────────────────────────
const pool = (nom) => ({ consommee_par: [`victory-sounds.js (pool « ${nom} »)`] });
const POOLS = [
  bruitage('victoire-grande', 'big cheerful victory fanfare, playful, child friendly',
    'sounds/fx/victoire-grande.mp3', pool('victory')),
  bruitage('tada', 'bright cheerful ta-da, child friendly, short',
    'sounds/fx/tada.mp3', pool('victory')),
  bruitage('trophee', 'triumphant trophy jingle, bright, rewarding, short',
    'sounds/fx/trophee.mp3', pool('victory')),
  bruitage('applaudissements', 'small cheerful crowd applause, warm, short',
    'sounds/fx/applaudissements.mp3', pool('victory')),
  bruitage('trompette-fanfare', 'bright playful trumpet fanfare, short',
    'sounds/fx/trompette-fanfare.mp3', pool('victory')),
  bruitage('trombone-oups', 'comedic gentle sad trombone, not mocking, short',
    'sounds/fx/trombone-oups.mp3', pool('error / end-doux')),
  bruitage('oups-doux', 'soft comedic oops sound, gentle, not harsh, short',
    'sounds/fx/oups-doux.mp3', pool('error / end-doux')),
  bruitage('sifflet-glissant', 'comedic slide whistle descending, cartoon, short',
    'sounds/fx/sifflet-glissant.mp3', pool('error')),
  bruitage('bonne-reponse', 'bright positive correct-answer ding, child friendly, short',
    'sounds/fx/bonne-reponse.mp3', pool('success')),
  bruitage('victoire-petite', 'small cheerful success jingle, bright, short',
    'sounds/fx/victoire-petite.mp3', pool('success')),
  bruitage('piece', 'bright coin pickup chime, short',
    'sounds/fx/piece.mp3', pool('success / collecte')),
  bruitage('clochette', 'small bright bell jingle, short',
    'sounds/fx/clochette.mp3', pool('success')),
  bruitage('xylophone-monte', 'rising xylophone scale, bright, playful, short',
    'sounds/fx/xylophone-monte.mp3', pool('success')),
  bruitage('magie', 'magical sparkle shimmer, bright, short',
    'sounds/fx/magie.mp3', pool('success / collecte')),
  bruitage('pop-apparition', 'soft playful pop appear sound, very short',
    'sounds/fx/pop-apparition.mp3', pool('apparition')),
  bruitage('bulle-pop', 'soft playful bubble pop, very short',
    'sounds/fx/bulle-pop.mp3', pool('apparition')),
  bruitage('boing', 'playful cartoon boing spring bounce, short',
    'sounds/fx/boing.mp3', pool('apparition')),
  bruitage('whoosh', 'soft quick whoosh swoosh, gentle, short',
    'sounds/fx/whoosh.mp3', pool('apparition')),
  bruitage('pluie-pieces', 'sparkling shower of coins cascade, short',
    'sounds/fx/pluie-pieces.mp3', pool('collecte')),
  bruitage('roulement-tambour', 'playful drum roll build-up, short',
    'sounds/fx/roulement-tambour.mp3', pool('deblocage')),
  bruitage('waouh', 'warm amazed wow reaction, soft, child friendly, short',
    'sounds/fx/waouh.mp3', pool('deblocage')),
];

// ── Rigolo (3) ──────────────────────────────────────────────────────────────
const RIGOLO = [
  bruitage('prout-long', 'long comedic fart sound, silly, cartoon', 'sounds/fx/prout-long.mp3'),
  bruitage('prout-petit', 'short comedic fart sound, silly, cartoon', 'sounds/fx/prout-petit.mp3'),
  bruitage('ronflement', 'soft funny cartoon snoring, gentle', 'sounds/fx/ronflement.mp3'),
];

// ── Espace (3) ──────────────────────────────────────────────────────────────
const ESPACE = [
  bruitage('alien-coucou', 'cute friendly cartoon alien saying hi, little creature vocal, short',
    'sounds/fx/alien-coucou.mp3'),
  bruitage('ambiance-planete', 'calm dreamy space ambience, soft sci-fi pad, seamless loop',
    'sounds/fx/ambiance-planete.mp3', 'Boucle — vérifier le raccord avant/après.'),
  bruitage('teleportation', 'soft dreamy sci-fi teleport shimmer, short',
    'sounds/fx/teleportation.mp3'),
];

// ── Divers (6) — aucun consommateur relevé à l'enrôlement, à rattacher si un
// jeu s'en sert ──────────────────────────────────────────────────────────────
const DIVERS = [
  bruitage('cloche-recre', 'cheerful school recess bell, short', 'sounds/fx/cloche-recre.mp3'),
  bruitage('indice', 'soft curious hint chime, short', 'sounds/fx/indice.mp3'),
  bruitage('photo', 'bright camera shutter click, short', 'sounds/fx/photo.mp3'),
  bruitage('scanner', 'soft sci-fi scanner beep sweep, short', 'sounds/fx/scanner.mp3'),
  bruitage('splash', 'playful water splash, short', 'sounds/fx/splash.mp3'),
  bruitage('tic-tac', 'gentle calm clock tick-tock, loopable', 'sounds/fx/tic-tac.mp3'),
];

export const BRUITAGES = [
  ...UI,
  ...CRIS_BEBES,
  ...DINO,
  ...ANIMAUX,
  ...VEHICULES,
  ...POOLS,
  ...RIGOLO,
  ...ESPACE,
  ...DIVERS,
];
