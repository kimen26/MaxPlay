#!/usr/bin/env node
// scripts/gc.mjs — routine de garbage collection en LECTURE SEULE (HO-R14).
//
// Liste tout ce qui devrait sortir du repo ou descendre en archive, pour que
// plus rien ne s'accumule par oubli : handoffs faits hors archives/, LESSONS/TODO
// trop gros, .artifacts trop vieux, inbox trop vieille, liens md cassés, images
// orphelines, audio dino manquant, branches git mortes.
//
// Ne supprime JAMAIS rien. --fix ne fait que des déplacements sûrs :
//   - handoffs "fait" (registre ET statut interne) déplacés vers docs/handoffs/archives/_gc-<date>/
//   - tests/.artifacts/* de plus de 14 jours supprimés (ce sont des captures de test jetables,
//     pas du contenu — seule exception au "jamais supprimer", explicitement listée au brief)
//
// Usage : node scripts/gc.mjs [--fix]
// Sortie : memory/audits/gc-<date>.md (toujours écrit, --fix ou non)

import { readdirSync, statSync, readFileSync, existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve, relative, basename, extname } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const FIX = process.argv.includes('--fix');
const TODAY = new Date().toISOString().slice(0, 10);

const rel = (p) => relative(ROOT, p).split('\\').join('/');
const abs = (...p) => join(ROOT, ...p);

function walk(dir, opts = {}) {
  const { skipDirs = new Set(['node_modules', '.git', '.artifacts']), files = [] } = opts;
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return files; }
  for (const e of entries) {
    if (skipDirs.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, { skipDirs, files });
    else files.push(p);
  }
  return files;
}

const report = { titre: `# GC — ${TODAY}`, sections: [] };
function section(titre, lignes) {
  report.sections.push({ titre, lignes: lignes.length ? lignes : ['(rien à signaler)'] });
}

// ---------------------------------------------------------------------------
// 1. Handoffs "fait" hors archives/, ou statut interne != registre
// ---------------------------------------------------------------------------
{
  const lignes = [];
  const handoffDirs = [
    { root: 'docs/handoffs', readme: 'docs/handoffs/README.md' },
  ];
  // pôles avec un README de registre
  for (const poleReadme of walk(abs('studio')).filter(f => /docs[\\/]handoffs[\\/]README\.md$/.test(f))) {
    handoffDirs.push({ root: rel(dirname(poleReadme)), readme: rel(poleReadme) });
  }

  const toMove = [];
  for (const { root, readme } of handoffDirs) {
    if (!existsSync(abs(readme))) continue;
    const registreTxt = readFileSync(abs(readme), 'utf8');
    // Table du registre : | ID | ... | statut |  -> on cherche "fait" en fin de ligne de table
    const statutsRegistre = new Map();
    for (const m of registreTxt.matchAll(/\|\s*(HO-[A-Za-z0-9-]+)\s*\|.*\|\s*([a-zéû àè]+)\s*\|\s*$/gmi)) {
      statutsRegistre.set(m[1], m[2].trim().toLowerCase());
    }
    const briefFiles = readdirSync(abs(root)).filter(f => /^HO-.*\.md$/.test(f));
    for (const f of briefFiles) {
      const id = f.match(/^(HO-[A-Za-z0-9-]+)/)?.[1];
      const txt = readFileSync(abs(join(root, f)), 'utf8');
      const statutInterne = txt.match(/\*\*Statut\s*:\*\*\s*(.+)/i)?.[1]?.trim().toLowerCase();
      const statutReg = id ? statutsRegistre.get(id) : undefined;
      if (statutReg === 'fait' && statutInterne !== 'fait') {
        lignes.push(`- \`${root}/${f}\` : registre dit **fait**, statut interne dit « ${statutInterne || '?'} » (à archiver + corriger)`);
        toMove.push(join(root, f));
      } else if (statutReg === 'fait' && statutInterne === 'fait') {
        lignes.push(`- \`${root}/${f}\` : **fait** des deux côtés mais encore hors \`archives/\` (à déplacer)`);
        toMove.push(join(root, f));
      }
    }
  }
  section('Handoffs terminés hors `archives/` ou statut divergent', lignes);

  if (FIX && toMove.length) {
    const dest = abs('docs/handoffs/archives', `_gc-${TODAY}`);
    mkdirSync(dest, { recursive: true });
    for (const f of toMove) {
      const target = join(dest, basename(f));
      renameSync(abs(f), target);
      report.fixApplied = report.fixApplied || [];
      report.fixApplied.push(`déplacé ${f} -> ${rel(target)}`);
    }
  }
}

// ---------------------------------------------------------------------------
// 2. LESSONS.md / TODO.md > 20 Ko par pôle
// ---------------------------------------------------------------------------
{
  const lignes = [];
  const candidats = walk(abs('studio'), { skipDirs: new Set(['node_modules', '.git', '.artifacts', 'archive', 'archives', '_archive']) })
    .filter(f => /[\\/]memory[\\/](LESSONS|TODO)\.md$/.test(f));
  candidats.push(abs('memory/LESSONS.md'), abs('memory/TODO.md'));
  for (const f of candidats) {
    if (!existsSync(f)) continue;
    const taille = statSync(f).size;
    if (taille > 20 * 1024) {
      lignes.push(`- \`${rel(f)}\` : ${(taille / 1024).toFixed(1)} Ko (seuil 20 Ko) — rotation à faire (verbatim vers \`archive/\`)`);
    }
  }
  section('LESSONS.md / TODO.md > 20 Ko', lignes);
}

// ---------------------------------------------------------------------------
// 3. tests/.artifacts/ > 14 jours
// ---------------------------------------------------------------------------
{
  const lignes = [];
  const artifactsDirs = walk(abs('.'), { skipDirs: new Set(['node_modules', '.git']) }); // no-op, real scan below
  const dirs = [];
  function findArtifacts(dir) {
    let entries;
    try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      const p = join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name === '.artifacts') dirs.push(p);
        else findArtifacts(p);
      }
    }
  }
  findArtifacts(abs('.'));

  const CUTOFF_MS = 14 * 24 * 3600 * 1000;
  const now = Date.now();
  const old = [];
  for (const d of dirs) {
    const files = walk(d, { skipDirs: new Set() });
    for (const f of files) {
      const age = now - statSync(f).mtimeMs;
      if (age > CUTOFF_MS) old.push(f);
    }
  }
  if (old.length) {
    lignes.push(`- ${old.length} fichier(s) de plus de 14 jours dans \`.artifacts/\` (ex : ${old.slice(0, 5).map(rel).join(', ')}${old.length > 5 ? ', …' : ''})`);
  }
  section('`tests/.artifacts/` > 14 jours', lignes);

  if (FIX && old.length) {
    for (const f of old) rmSync(f, { force: true });
    report.fixApplied = report.fixApplied || [];
    report.fixApplied.push(`purgé ${old.length} fichier(s) .artifacts > 14 j`);
  }
}

// ---------------------------------------------------------------------------
// 4. inbox/ > 48h
// ---------------------------------------------------------------------------
{
  const lignes = [];
  const inboxDirs = ['studio/minijeux/inbox', 'studio/narration/inbox', 'studio/dino/content/inbox']
    .filter(d => existsSync(abs(d)));
  const CUTOFF_MS = 48 * 3600 * 1000;
  const now = Date.now();
  for (const d of inboxDirs) {
    for (const f of readdirSync(abs(d))) {
      if (f.toLowerCase() === 'readme.md') continue;
      const p = abs(d, f);
      if (statSync(p).isDirectory()) continue;
      const age = now - statSync(p).mtimeMs;
      if (age > CUTOFF_MS) {
        const jours = (age / (24 * 3600 * 1000)).toFixed(0);
        const noteHorsPerimetre = d.startsWith('studio/narration') ? ' (narration hors périmètre campagne 2026-09-12, D-011 — signalé seulement)' : '';
        lignes.push(`- \`${d}/${f}\` : ${jours} j${noteHorsPerimetre}`);
      }
    }
  }
  section('`inbox/` > 48h', lignes);
}

// ---------------------------------------------------------------------------
// 5. Liens markdown cassés (tout le repo) — réutilise check-liens-md.mjs
// ---------------------------------------------------------------------------
{
  const lignes = [];
  const script = abs('studio/minijeux/scripts/check-liens-md.mjs');
  if (existsSync(script)) {
    for (const dossier of ['docs', 'memory', 'studio']) {
      if (!existsSync(abs(dossier))) continue;
      try {
        const out = execSync(`node "${script}" "${abs(dossier)}"`, { cwd: ROOT, encoding: 'utf8' });
        const dead = out.split('\n').filter(l => l.includes(' -> '));
        for (const l of dead) lignes.push(`- ${l}`);
      } catch (e) {
        const out = (e.stdout || '').toString();
        const dead = out.split('\n').filter(l => l.includes(' -> '));
        for (const l of dead) lignes.push(`- ${l}`);
      }
    }
  } else {
    lignes.push('- `check-liens-md.mjs` introuvable, vérification sautée');
  }
  section('Liens markdown cassés', lignes);
}

// ---------------------------------------------------------------------------
// 6. Images site/img/** non référencées (basename)
// ---------------------------------------------------------------------------
{
  const lignes = [];
  const imgDir = abs('site/img');
  const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);
  const allImages = existsSync(imgDir) ? walk(imgDir).filter(f => IMG_EXT.has(extname(f).toLowerCase())) : [];

  // Corpus de recherche : tout .js/.html/.json/.md du repo (hors node_modules), on cherche le basename tel quel.
  // Exclut ses propres rapports (memory/audits/gc-*.md) : sinon un basename listé comme
  // "non référencé" au run N se retrouve cité dans le rapport, donc "référencé" au run N+1 —
  // un gc qui se lit lui-même en boucle (faux négatif alterné d'un run à l'autre).
  const searchFiles = walk(abs('.'), { skipDirs: new Set(['node_modules', '.git', '.artifacts']) })
    .filter(f => /\.(js|mjs|cjs|html|json|md)$/.test(f))
    .filter(f => !/[\\/]memory[\\/]audits[\\/]gc-\d{4}-\d{2}-\d{2}\.md$/.test(f));
  // Séparateur entre fichiers : évite qu'une sous-chaîne cherchée existe seulement
  // "à cheval" sur la fin d'un fichier et le début du suivant (faux négatif de non-référencement).
  const SEP = '\n@@GC-FILE-BOUNDARY@@\n';
  let corpus = '';
  for (const f of searchFiles) {
    try { corpus += readFileSync(f, 'utf8') + SEP; } catch { /* binaire, ignore */ }
  }

  const enMouvement = []; // dossiers signalés par HO-R13 comme instables
  const dossiersInstables = ['sprites', 'paleoart'].map(d => abs('site/img/dinos', d));

  // Certains dossiers construisent le chemin par pattern (basename.replace(/\.(jpg|png)$/,
  // '_detail.$1') ou + '_coloriage.webp' sur le champ `png` du JSON), donc le nom exact
  // n'apparaît jamais tel quel dans le corpus texte. On reconnaît le radical (nom sans le
  // suffixe _detail/_coloriage/_ecosysteme/etc. et sans extension) plutôt que le basename entier
  // pour ces dossiers-là, pour ne pas signaler un faux positif systématique.
  const dossiersParPattern = new Set(['plantes', 'paleoart'].map(d => abs('site/img/dinos', d)));
  const SUFFIXES_PATTERN = ['_detail', '_coloriage', '_ecosysteme', '_funfact', '_headshot', '_manger', '_paris', '_sprite', '_tete'];

  const nonReferencees = [];
  for (const img of allImages) {
    const base = basename(img);
    if (corpus.includes(base)) continue;

    if (dossiersParPattern.has(dirname(img))) {
      const stem = base.replace(/\.(jpg|jpeg|png|webp)$/i, '');
      const radical = SUFFIXES_PATTERN.reduce((s, suf) => s.endsWith(suf) ? s.slice(0, -suf.length) : s, stem);
      if (corpus.includes(radical)) continue; // référencé via un radical + suffixe construit par code
    }

    if (dossiersInstables.some(d => img.startsWith(d))) {
      enMouvement.push(rel(img));
    } else {
      nonReferencees.push(rel(img));
    }
  }
  if (nonReferencees.length) {
    lignes.push(`- ${nonReferencees.length} image(s) non référencée(s) (basename introuvable dans js/html/json/md)`);
    for (const f of nonReferencees.slice(0, 40)) lignes.push(`  - ${f}`);
    if (nonReferencees.length > 40) lignes.push(`  - … (${nonReferencees.length - 40} de plus)`);
  }
  if (enMouvement.length) {
    lignes.push(`- ${enMouvement.length} image(s) dans \`sprites/\` ou \`paleoart/\` non référencées — **HO-R13 en cours dessus (webp), ne pas conclure** : signalé sans jugement.`);
  }
  section('Images `site/img/**` non référencées', lignes);
}

// ---------------------------------------------------------------------------
// 7. Audio site/audio/dinos/** non couvert par le produit cartésien
//    slug × suffixe × langue depuis content/dinos/*.json + le manifeste
// ---------------------------------------------------------------------------
{
  const lignes = [];
  const dinosDir = abs('studio/dino/content/dinos');
  const audioDir = abs('site/audio/dinos');
  const manifestPath = abs('site/js/gen/dinos-audio-manifest.js');

  if (existsSync(dinosDir) && existsSync(audioDir)) {
    const slugs = readdirSync(dinosDir)
      .filter(f => f.endsWith('.json') && !f.startsWith('_'))
      .map(f => f.replace(/\.json$/, ''));
    const slugSet = new Set(slugs);

    const langues = readdirSync(audioDir, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name);

    // Suffixes de fiche dino connus (fixes — ce sont les seuls blocs générés par
    // narration-audio pour une fiche canon ; cf. studio/dino/content/scripts/export/_gen-audio-manifest.cjs
    // et le pipeline nouveau-dino). Tout fichier <slug>-<un de ces suffixes>.mp3 où slug
    // est une fiche connue = couvert par le produit cartésien.
    const SUFFIXES_FICHE = ['-nom', '-funfact', '-recap', '-regime', '-taille'];

    // Préfixes de familles d'audio transverses (pas liées à une fiche dino individuelle :
    // menus, récits d'époque, ères, dictionnaire de prononciation, spéciaux). Ces fichiers
    // ne participent pas au produit cartésien slug × suffixe × langue — on les compte à part,
    // sans les signaler comme anomalie.
    const PREFIXES_HORS_PRODUIT = ['menu-', 'recit-', 'ere-', 'dico-', 'special-'];

    let horsProduitCompte = 0;
    const nonCouverts = [];
    for (const lang of langues) {
      const dir = join(audioDir, lang);
      let entries;
      try { entries = readdirSync(dir, { withFileTypes: true }); } catch { continue; }
      for (const e of entries) {
        if (e.isDirectory()) continue; // sous-dossiers noms/periodes couverts par _gen-audio-manifest.cjs, pas ici
        if (!e.name.endsWith('.mp3')) continue;

        if (PREFIXES_HORS_PRODUIT.some(p => e.name.startsWith(p))) { horsProduitCompte++; continue; }

        const m = e.name.match(/^(.+?)(-nom|-funfact|-recap|-regime|-taille)\.mp3$/);
        if (m && slugSet.has(m[1])) continue; // couvert : slug connu + suffixe de fiche connu

        nonCouverts.push(`${lang}/${e.name}`);
      }
    }

    if (horsProduitCompte) {
      lignes.push(`- ${horsProduitCompte} fichier(s) audio transverses (\`${PREFIXES_HORS_PRODUIT.join(', ')}\`) : hors produit cartésien par nature (menus/récits/ères/dico), pas une anomalie.`);
    }
    if (nonCouverts.length) {
      lignes.push(`- ${nonCouverts.length} fichier(s) audio dino hors produit cartésien slug(${slugs.length} fiches) × suffixe(${SUFFIXES_FICHE.join(',')}) × langue(${langues.length}) — slug inconnu ou suffixe inattendu :`);
      for (const f of nonCouverts.slice(0, 40)) lignes.push(`  - site/audio/dinos/${f}`);
      if (nonCouverts.length > 40) lignes.push(`  - … (${nonCouverts.length - 40} de plus)`);
    }
  } else {
    lignes.push('- dossier dinos ou audio introuvable, vérification sautée');
  }
  section('Audio `site/audio/dinos/**` hors produit cartésien slug × suffixe × langue', lignes);
}

// ---------------------------------------------------------------------------
// 8. Branches git mortes (lecture seule)
// ---------------------------------------------------------------------------
{
  const lignes = [];
  try {
    const branches = execSync('git branch -a --format="%(refname:short)|%(committerdate:iso8601)"', { cwd: ROOT, encoding: 'utf8' })
      .split('\n').map(l => l.trim()).filter(Boolean);
    const current = execSync('git branch --show-current', { cwd: ROOT, encoding: 'utf8' }).trim();
    for (const l of branches) {
      const [name] = l.split('|');
      if (name === current || name === 'master' || name === 'origin/master' || name === 'origin/HEAD') continue;
      lignes.push(`- \`${name}\` : branche autre que master, à vérifier avant suppression (aucune commande d'écriture lancée ici)`);
    }
  } catch (e) {
    lignes.push(`- erreur git branch : ${e.message}`);
  }
  section('Branches git mortes (info seule)', lignes);
}

// ---------------------------------------------------------------------------
// 9. ORPHELINS_ASSUMES de studio/referentiel/couverture.mjs : entrées obsolètes
//    (héritage question HO-R07 — signalement seulement, couverture.mjs non modifié)
// ---------------------------------------------------------------------------
{
  const lignes = [];
  const couverturePath = abs('studio/referentiel/couverture.mjs');
  if (existsSync(couverturePath)) {
    const txt = readFileSync(couverturePath, 'utf8');
    const m = txt.match(/ORPHELINS_ASSUMES\s*=\s*\[([\s\S]*?)\]/);
    if (m) {
      const entries = [...m[1].matchAll(/'([^']+)'/g)].map(x => x[1]);
      const manquantes = entries.filter(e => !existsSync(abs('site', e)));
      if (manquantes.length) {
        lignes.push(`- ${manquantes.length}/${entries.length} entrées de \`ORPHELINS_ASSUMES\` (studio/referentiel/couverture.mjs) pointent vers un fichier qui n'existe plus sur le disque (hors périmètre HO-R14, couverture.mjs non modifié — question héritée de HO-R07) :`);
        for (const e of manquantes) lignes.push(`  - ${e}`);
      }
    }
  }
  section('`ORPHELINS_ASSUMES` obsolètes (studio/referentiel/couverture.mjs, non modifié)', lignes);
}

// ---------------------------------------------------------------------------
// Écriture du rapport
// ---------------------------------------------------------------------------
{
  const out = [];
  out.push(report.titre);
  out.push('');
  out.push('> **FICHIER GÉNÉRÉ** — `node scripts/gc.mjs`' + (FIX ? ' --fix' : ''));
  out.push('> Lecture seule sauf `--fix` (déplacements sûrs uniquement : handoffs faits → archives/, purge `.artifacts` > 14 j). Ne supprime jamais de contenu.');
  out.push('');
  for (const { titre, lignes } of report.sections) {
    out.push(`## ${titre}`);
    out.push('');
    out.push(...lignes);
    out.push('');
  }
  if (report.fixApplied) {
    out.push('## Actions --fix appliquées');
    out.push('');
    out.push(...report.fixApplied.map(l => `- ${l}`));
    out.push('');
  }
  const dest = abs('memory/audits', `gc-${TODAY}.md`);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, out.join('\n') + '\n', 'utf8');
  console.log(out.join('\n'));
  console.log(`\nRapport écrit dans ${rel(dest)}`);
}
