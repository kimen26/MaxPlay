// Audit exhaustif assets fiches dino — 2026-08-02 — usage: node studio/dino/content/scripts/export/_audit-fiches-complet.cjs (depuis la racine du repo)
const fs = require('fs'), path = require('path');
const R = path.resolve(__dirname, '../../../../..'); // racine repo (script dans studio/dino/content/scripts/export/)
const rd = p => { try { return fs.readdirSync(path.join(R, p)); } catch { return []; } }; // tolère les dossiers absents (ex _new-* purgés)

// 1. DINOS + familles
const src = fs.readFileSync(path.join(R, 'site/js/dinos-data.js'), 'utf8');
const mod = { exports: {} };
new Function('module', 'exports', src + '; module.exports={DINOS, DINO_FAMILLES};')(mod, mod.exports);
const DINOS = mod.exports.DINOS, FAMS = mod.exports.DINO_FAMILLES;
const cap = d => d.png.replace(/\.jpg$/, ''); // ex Tyrannosaurus

// 2. Inventaires disque
const paleo = rd('site/img/dinos/paleoart');
const ombres = new Set(rd('site/img/dinos/ombres'));
const sprites = new Set(rd('site/img/dinos/sprites'));
const traces = new Set(rd('site/img/dinos/traces'));
const grok = rd('site/img/dinos/grok');
const wiki = rd('site/img/dinos/wiki');
const famEmblems = new Set(rd('site/img/dinos/familles').map(f => f.replace('.png', '')));
const newDirs = {};
for (const d of ['_new-coloriage', '_new-headshots', '_new-ombre', '_new-xxl'])
  newDirs[d] = rd('site/img/dinos/' + d).filter(f => !f.startsWith('_'));
const audio = new Set(rd('site/audio/dinos/fr').filter(f => f.endsWith('.mp3')));
const audioNoms = new Set(rd('site/audio/dinos/fr/noms'));

// 3. Sources textuelles (fichiers consolidés)
const fichesMd = fs.readFileSync(path.join(R, 'studio/dino/content/sources/fiches/_FICHES-DINOS-GROKIPEDIA.md'), 'utf8');
const etymoMd = ['_ETYMO-COMPLET-60.md', '_ETYMO-RACINES-50.md'].map(f => fs.readFileSync(path.join(R, 'studio/dino/content/sources/etymo/' + f), 'utf8')).join('\n');
const mesuresMd = fs.readFileSync(path.join(R, 'studio/dino/content/sources/mesures/_DINOS-MESURES-CONSOLIDE.md'), 'utf8');
const has = (md, d) => md.toLowerCase().includes(d.id) || md.toLowerCase().includes(cap(d).toLowerCase());

// 4. Tableau par dino
const BLOCS = ['nom', 'taille', 'regime', 'funfact', 'recap'];
const TOP15 = [...traces].map(f => f.replace('_trace.png', ''));
const rows = DINOS.map(d => {
  const C = cap(d);
  const p = suff => paleo.includes(`${C}${suff}`);
  const r = {
    id: d.id, nom: d.name, C,
    fiche: has(fichesMd, d), etymo: has(etymoMd, d), mesures: has(mesuresMd, d),
    audio: BLOCS.map(b => audio.has(`${d.id}-${b}.mp3`)),
    nomVocal: audioNoms.has(`${d.id}.mp3`),
    hero: p('.jpg'), headshot: p('_headshot.jpg'), manger: p('_manger.jpg'),
    paris: p('_paris.jpg'), ecosys: p('_ecosysteme.jpg'), funfact: p('_funfact.jpg'),
    coloriage: p('_coloriage.webp'),
    ombre: ombres.has(`${C}_ombre.png`),
    sprite: sprites.has(`${C}_sprite.png`), tete: sprites.has(`${C}_tete.png`),
    trace: traces.has(`${C}_trace.png`) ? 'OUI' : 'non',
  };
  r.gaps = [];
  if (!r.fiche) r.gaps.push('fiche-src');
  if (!r.etymo) r.gaps.push('etymo-src');
  if (!r.mesures) r.gaps.push('mesures-src');
  r.audio.forEach((a, i) => { if (!a) r.gaps.push('audio-' + BLOCS[i]); });
  if (!r.nomVocal) r.gaps.push('nom-vocal');
  for (const k of ['hero', 'headshot', 'manger', 'paris', 'ecosys', 'funfact', 'coloriage', 'ombre', 'sprite', 'tete'])
    if (!r[k]) r.gaps.push(k);
  return r;
});

const ok = b => b ? '✅' : '❌';
let md = [];
md.push(`# Audit exhaustif des fiches dino — assets croisés`, ``);
md.push(`**Date : ${new Date().toISOString().slice(0,10)}** · 70 dinos (DINOS de \`site/js/dinos-data.js\`) · croisement disque \`site/img/dinos/\`, \`site/audio/dinos/fr/\`, sources \`studio/dino/content/sources/\`.`, ``);
md.push(`> Régénéré par \`node studio/dino/temp/audit-fiches.cjs\`. État PMO de référence : \`_ETAT-DINOS.md\` (régénéré le même jour : **70 dinos · 70 complets · 0 incomplets** sur ses 8 axes).`, ``);

// Synthèse chiffrée
const complets = rows.filter(r => r.gaps.length === 0);
md.push(`## Synthèse`, ``);
md.push(`- **Dinos 100% complets (hors trace, réservée au top 15) : ${complets.length}/70**`);
md.push(`- Fiches src (Grokipédia consolidé) : ${rows.filter(r => r.fiche).length}/70 · étymo : ${rows.filter(r => r.etymo).length}/70 · mesures : ${rows.filter(r => r.mesures).length}/70`);
md.push(`- Audio fiche 5 blocs : ${rows.filter(r => r.audio.every(a => a)).length}/70 · nom vocal (noms/) : ${rows.filter(r => r.nomVocal).length}/70`);
for (const k of ['hero', 'headshot', 'manger', 'paris', 'ecosys', 'funfact', 'coloriage', 'ombre', 'sprite', 'tete'])
  md.push(`- ${k} : ${rows.filter(r => r[k]).length}/70`);
md.push(`- trace : ${TOP15.length}/70 (top 15 : ${TOP15.join(', ')})`);
md.push(``);

// Tableau
md.push(`## Tableau par dino (70)`, ``);
md.push(`Colonnes : src = fiche/étymo/mesures sources · A5 = 5 blocs audio fiche · NV = nom vocal · img = hero/head/mang/paris/eco/fun/col · ombre · spr/tete · trace (⚪ = hors top 15).`, ``);
md.push(`| # | id | nom | fiche | étymo | mes. | A5 | NV | hero | head | mang | paris | éco | fun | col | ombre | spr | tête | trace |`);
md.push(`|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|`);
rows.forEach((r, i) => {
  md.push(`| ${i + 1} | ${r.id} | ${r.nom} | ${ok(r.fiche)} | ${ok(r.etymo)} | ${ok(r.mesures)} | ${ok(r.audio.every(a => a))} | ${ok(r.nomVocal)} | ${ok(r.hero)} | ${ok(r.headshot)} | ${ok(r.manger)} | ${ok(r.paris)} | ${ok(r.ecosys)} | ${ok(r.funfact)} | ${ok(r.coloriage)} | ${ok(r.ombre)} | ${ok(r.sprite)} | ${ok(r.tete)} | ${r.trace === 'OUI' ? '✅' : '⚪'} |`);
});
md.push(``);

// (a) dinos avec gaps
md.push(`## (a) Dinos avec au moins un ❌ (hors traces)`, ``);
const gapped = rows.filter(r => r.gaps.length);
if (!gapped.length) md.push(`Aucun — les 70 dinos ont tous leurs assets.`);
else gapped.forEach(r => md.push(`- **${r.id}** (${r.nom}) : ${r.gaps.join(', ')}`));
md.push(``);

// (b) _new-*
md.push(`## (b) Staging \`_new-*\` — contenu et action recommandée`, ``);
for (const [dir, files] of Object.entries(newDirs)) {
  md.push(`### ${dir} (${files.length})`, ``);
  for (const f of files) {
    const base = f.replace(/\.\w+$/, '');
    const m = base.match(/^([A-Z][a-z]+)(?:_(.+))?$/);
    const dino = rows.find(r => r.C === (m && m[1]));
    let equiv = '—';
    if (dino) {
      const C = dino.C;
      if (dir === '_new-coloriage') equiv = paleo.includes(`${C}_coloriage.webp`) ? `existe déjà : paleoart/${C}_coloriage.webp` : 'absent de paleoart';
      else if (dir === '_new-headshots') equiv = paleo.includes(`${C}_headshot.jpg`) ? `existe déjà : paleoart/${C}_headshot.jpg` : 'absent de paleoart';
      else if (dir === '_new-ombre') equiv = ombres.has(`${C}_ombre.png`) ? `existe déjà : ombres/${C}_ombre.png` : 'absent des ombres';
      else equiv = `à qualifier (xxl)`;
    }
    md.push(`- \`${f}\` → dino : ${dino ? dino.id : '❌ INCONNU'} · ${equiv}`);
  }
  md.push(``);
}

// (c) orphelins
md.push(`## (c) Fichiers orphelins (id ne matchant aucun dino)`, ``);
const caps = new Set(rows.map(r => r.C));
const ids = new Set(rows.map(r => r.id));
const orphanCheck = (files, stripRe) => files.filter(f => {
  const base = f.replace(/\.\w+$/, '').replace(stripRe, '');
  return !caps.has(base) && !ids.has(base.toLowerCase());
});
const oPaleo = orphanCheck(paleo, /_(headshot|manger|paris|ecosysteme|funfact|coloriage)$/).filter(f => !f.startsWith('Amargasaurus_hypo-')); // hypo-* = slides fiche référencées dev-dinos.html (carousel hypothèses), pas des orphelins
const oOmbres = orphanCheck([...ombres], /_ombre$/);
const oSprites = orphanCheck([...sprites], /_(sprite|tete)$/);
const oTraces = orphanCheck([...traces], /_trace$/);
const oAudio = [...audio].filter(f => {
  if (/^(menu|recit|dico|special)-/.test(f)) return false;
  const m = f.match(/^([a-z]+)-(nom|taille|regime|funfact|recap)\.mp3$/);
  return m && !ids.has(m[1]);
});
const oNoms = [...audioNoms].filter(f => !ids.has(f.replace('.mp3', '')));
const oGrok = grok.filter(f => { const b = f.replace(/\.\w+$/, ''); const c = b.charAt(0).toUpperCase() + b.slice(1).split(/[-_]/)[0]; return ![...caps].some(C => b.toLowerCase().startsWith(C.toLowerCase())); });
md.push(`- paleoart : ${oPaleo.length ? oPaleo.map(f => '`' + f + '`').join(', ') : 'aucun'}`);
md.push(`- ombres : ${oOmbres.length ? oOmbres.join(', ') : 'aucun'}`);
md.push(`- sprites : ${oSprites.length ? oSprites.join(', ') : 'aucun'}`);
md.push(`- traces : ${oTraces.length ? oTraces.join(', ') : 'aucun'}`);
md.push(`- audio fiche (5 blocs) : ${oAudio.length ? oAudio.map(f => '`' + f + '`').join(', ') : 'aucun'}`);
md.push(`- audio noms/ : ${oNoms.length ? oNoms.map(f => '`' + f + '`').join(', ') : 'aucun'}`);
md.push(`- grok/ : ${oGrok.length ? oGrok.map(f => '`' + f + '`').join(', ') : 'aucun (match par préfixe)'}`);
md.push(``);
md.push(`> NB grok/ : les 13 « orphelins » correspondent à des dinos du **dico des racines hors DINOS** (compsognathus, gorgosaurus, psittacosaurus, styracosaurus, suchomimus — présents dans \`dinos-racines.js\`) — galerie gelée, pas une erreur. Les 2 \`Amargasaurus_hypo-*\` de paleoart sont des slides de fiche RÉFÉRENCÉES (dev-dinos.html, carousel « épines vs voile ») — exclus des orphelins.`);
md.push(``);

// (d) audio
md.push(`## (d) Audio — couverture EL vs fallback TTS`, ``);
const nFiche = rows.filter(r => r.audio.every(a => a)).length;
md.push(`- Fichiers totaux audio/dinos/fr/ : ${audio.size} mp3 (+ ${audioNoms.size} dans noms/)`);
md.push(`- 5 blocs fiche : ${nFiche}/70 dinos complets → ${nFiche * 5}/350 segments`);
md.push(`- noms/ (bonus jeux, voix courte) : ${audioNoms.size}/70`);
const recits = [...audio].filter(f => f.startsWith('recit-'));
const menuFam = [...audio].filter(f => f.startsWith('menu-fam-'));
const menuEp = [...audio].filter(f => f.startsWith('menu-ep-'));
const menuAutres = [...audio].filter(f => f.startsWith('menu-') && !f.startsWith('menu-fam-') && !f.startsWith('menu-ep-'));
const dicos = [...audio].filter(f => f.startsWith('dico-'));
const specials = [...audio].filter(f => f.startsWith('special-'));
md.push(`- récits : ${recits.length}/8 ✅ (${recits.join(', ')})`);
md.push(`- menu-fam-* : ${menuFam.length}/11 → **manquants : ${FAMS.map(f => 'menu-fam-' + f.id + '.mp3').filter(f => !audio.has(f)).join(', ')}** (fallback TTS navigateur)`);
md.push(`- menu-ep-* : ${menuEp.length} (${menuEp.join(', ')})`);
md.push(`- autres menu-* : ${menuAutres.length} (${menuAutres.join(', ')})`);
md.push(`- dico-* (racines étymo) : ${dicos.length}`);
md.push(`- special-* : ${specials.length} (${specials.join(', ')})`);
// manifeste
const man = fs.readFileSync(path.join(R, 'site/js/dinos-audio-manifest.js'), 'utf8');
const manFr = (man.match(/DINO_NOM_AUDIO_BY_LANG\.fr = new Set\(\[([^\]]*)\]/) || [])[1] || '';
const manIds = [...manFr.matchAll(/"([^"]+)"/g)].map(m => m[1]);
const manFun = (man.match(/DINO_FUNFACT_AUDIO_BY_LANG\.fr = new Set\(\[([^\]]*)\]/) || [])[1] || '';
const manFunIds = [...manFun.matchAll(/"([^"]+)"/g)].map(m => m[1]);
md.push(`- manifeste DINO_NOM_AUDIO_BY_LANG.fr : ${manIds.length} ids · disque noms/ : ${audioNoms.size} · delta manifeste−disque : ${manIds.filter(i => !audioNoms.has(i + '.mp3')).join(', ') || '∅'} · delta disque−manifeste : ${[...audioNoms].map(f => f.replace('.mp3', '')).filter(i => !manIds.includes(i)).join(', ') || '∅'}`);
md.push(`- manifeste DINO_FUNFACT_AUDIO_BY_LANG.fr : ${manFunIds.length} ids · delta vs disque *-funfact.mp3 : ${manFunIds.filter(i => !audio.has(i + '-funfact.mp3')).join(', ') || '∅'}`);
// dico vs racines définies
const rac = fs.readFileSync(path.join(R, 'site/js/dinos-racines.js'), 'utf8');
const nbRacines = +(rac.match(/"nb_racines":(\d+)/) || [0, '?'])[1];
const devHtml = fs.readFileSync(path.join(R, 'site/dev-dinos.html'), 'utf8');
const dicoVoice = (devHtml.match(/const DICO_VOICE = \{([^}]*)\}/) || [])[1] || '';
const dicoMapped = [...dicoVoice.matchAll(/:"(dico-[a-z]+)"/g)].map(m => m[1]);
const dicoNoFile = dicoMapped.filter(d => !audio.has(d + '.mp3'));
const dicoUnmapped = [...audio].filter(f => f.startsWith('dico-') && !dicoMapped.includes(f.replace('.mp3', '')));
md.push(`- dico : DINO_RACINES déclare ${nbRacines} racines · DICO_VOICE (dev-dinos.html) en mappe ${dicoMapped.length} · fichiers disque ${dicos.length} · mappés sans fichier : ${dicoNoFile.join(', ') || '∅'} · fichiers non mappés : ${dicoUnmapped.join(', ') || '∅'} → **${nbRacines - dicoMapped.length} racines sans MP3 (fallback voix « dame » TTS)**`);
md.push(``);

// (e) familles
md.push(`## (e) Emblèmes familles`, ``);
md.push(`- DINO_FAMILLES : ${FAMS.length} familles · emblèmes présents : ${famEmblems.size}`);
md.push(`- **manquants : ${FAMS.filter(f => !famEmblems.has(f.id)).map(f => f.id + ' (' + f.sci + ')').join(', ') || 'aucun'}**`);
md.push(``);

// (f) écarts doc
md.push(`## (f) Écarts README/INVARIANTS vs disque`, ``);
const spritesDinos = rows.filter(r => r.sprite && r.tete).length;
md.push(`- sprites/README annonce « top 15 » → réalité : **${spritesDinos}/70 dinos ont leurs 2 sprites** (140 fichiers). Doc obsolète.`);
md.push(`- traces/ « top 15 » : confirmé, 15 fichiers (${TOP15.join(', ')}).`);
md.push(`- grok/ : ${grok.length} fichiers couvrant ${new Set(grok.map(f => { const c = f.charAt(0).toUpperCase() + f.slice(1); return [...caps].find(C => c.toLowerCase().startsWith(C.toLowerCase())); }).filter(Boolean)).size} dinos · wiki/ : ${wiki.length} fichiers couvrant ${new Set(wiki.map(f => { const c = f.charAt(0).toUpperCase() + f.slice(1); return [...caps].find(C => c.toLowerCase().startsWith(C.toLowerCase())); }).filter(Boolean)).size} dinos.`);
md.push(`- special-* : 6 fichiers sur disque (brief en attendait 2) — 5 extinction + 1 pangée.`);
md.push(`- menu-ep-* : 8 fichiers (brief en attendait 7) — inclut menu-ep-paleo.`);
md.push(`- Sous-dossiers audio : \`packets/pkt-00.mp3\` (1) et \`periodes/\` (5 mp3 : trias, jurassique, cretace, cenozoique, pangee) — hors comptage des 457.`);
md.push(``);
md.push(`## Actions recommandées`, ``);
md.push(`1. **_new-coloriage, _new-headshots, _new-ombre** : les 21 PNG staging ont TOUS leur équivalent converti en prod (paleoart .webp/.jpg, ombres .png) → **purger** (ou archiver) ; ne pas oublier les \`_PROGRESS.tsv\`.`);
md.push(`2. **_new-xxl** (13 PNG) : variantes XXL de slots déjà pourvus en paleoart (tous les dinos concernés ont déjà hero/manger/paris/ecosysteme/funfact en .jpg) + 2 inédits \`Giganotosaurus_meute_*\` (pas de slot fiche correspondant) → **décision PMO requise** : convertir en remplacement HD ou purger.`);
md.push(`3. **Audio menu-fam manquants** (mammiferes, oiseaux) : générer les 2 MP3 EL pour supprimer le fallback TTS — cohérent avec les 9 autres familles et les 2 emblèmes manquants.`);
md.push(`4. **Emblèmes familles** mammiferes + oiseaux à produire (9/11 présents).`);
md.push(`5. **Dico** : 11 racines de DINO_RACINES non mappées dans DICO_VOICE (76−65) → fallback voix « dame » ; 4 MP3 disque non mappés (alberto, edmonto, mosa, utah) → les brancher ou confirmer l'écart.`);
md.push(`6. **Sprites README** : mettre à jour « top 15 » → 70/70.`);
md.push(`7. **Sources textes** : 24 fiches Grokipédia manquantes (batch mégalofaune + marin + 6 dinos classiques), 17 étymos et 24 mesures absentes des fichiers consolidés — voir section (a).`);
md.push(``);

fs.writeFileSync(path.join(R, 'studio/dino/pmo/audit-fiches-complet.md'), md.join('\n'));
console.log('Rapport écrit. Complets:', complets.length + '/70');
console.log('Gapped:', JSON.stringify(gapped.map(r => [r.id, r.gaps])));
console.log('Orphelins audio:', oAudio, 'noms:', oNoms, 'paleo:', oPaleo, 'sprites:', oSprites);
console.log('Manquant fam emblems:', FAMS.filter(f => !famEmblems.has(f.id)).map(f => f.id));
console.log('Manquant menu-fam:', FAMS.map(f => 'menu-fam-' + f.id + '.mp3').filter(f => !audio.has(f)));
console.log('dico count:', dicos.length, 'specials:', specials.length, 'recits:', recits.length, 'menu-ep:', menuEp.length);
console.log('manifest ids:', manIds.length);
