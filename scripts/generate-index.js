#!/usr/bin/env node
/**
 * generate-index.js — Régénère les index transversaux depuis les métadonnées
 * Usage : node scripts/generate-index.js
 */

const fs = require('fs');
const path = require('path');

const STORIES_DIR = path.join(__dirname, '..', 'docs', 'narration', 'stories');
const INDEX_DIR = path.join(__dirname, '..', 'docs', 'narration', '_index');

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const lines = match[1].split('\n');
  const data = {};
  let current = data;
  const stack = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const indent = line.search(/\S/);
    const keyMatch = trimmed.match(/^([\w-]+):\s*(.*)$/);
    if (keyMatch) {
      const [, key, val] = keyMatch;
      if (val === '') {
        current[key] = {};
        current = current[key];
        stack.push(current);
      } else {
        current[key] = val.replace(/^["'](.*)["']$/, '$1');
      }
    }
  }
  return data;
}

function loadStories() {
  const entries = fs.readdirSync(STORIES_DIR, { withFileTypes: true });
  const stories = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('_') || entry.name === 'INDEX.md') continue;
    const readmePath = path.join(STORIES_DIR, entry.name, 'README.md');
    if (!fs.existsSync(readmePath)) continue;
    const content = fs.readFileSync(readmePath, 'utf8');
    const fm = parseFrontmatter(content);
    stories.push({ dir: entry.name, fm });
  }
  return stories;
}

function generateByCharacter(stories) {
  const map = {};
  for (const s of stories) {
    const chars = s.fm.personnages?.liste || [];
    for (const c of chars) {
      if (!map[c]) map[c] = [];
      map[c].push({ num: s.fm.numero, titre: s.fm.titre, slug: s.fm.slug });
    }
  }
  let md = '# Index par personnage\n\n> Auto-généré. Ne pas éditer.\n\n';
  for (const [char, list] of Object.entries(map).sort()) {
    md += `## ${char}\n\n`;
    for (const item of list) {
      md += `- **${item.num}** — [${item.titre}](../stories/${item.num}-${item.slug}/README.md)\n`;
    }
    md += '\n';
  }
  return md;
}

function generateByTheme(stories) {
  const map = {};
  for (const s of stories) {
    const themes = [s.fm.themes?.principal, ...(s.fm.themes?.secondaires || [])].filter(Boolean);
    for (const t of themes) {
      if (!map[t]) map[t] = [];
      map[t].push({ num: s.fm.numero, titre: s.fm.titre, slug: s.fm.slug });
    }
  }
  let md = '# Index par thème\n\n> Auto-généré. Ne pas éditer.\n\n';
  for (const [theme, list] of Object.entries(map).sort()) {
    md += `## ${theme}\n\n`;
    for (const item of list) {
      md += `- **${item.num}** — [${item.titre}](../stories/${item.num}-${item.slug}/README.md)\n`;
    }
    md += '\n';
  }
  return md;
}

function generateByStatus(stories) {
  const map = {};
  for (const s of stories) {
    const st = s.fm.statut || 'unknown';
    if (!map[st]) map[st] = [];
    map[st].push({ num: s.fm.numero, titre: s.fm.titre, slug: s.fm.slug });
  }
  let md = '# Index par statut\n\n> Auto-généré. Ne pas éditer.\n\n';
  for (const [status, list] of Object.entries(map).sort()) {
    md += `## ${status}\n\n`;
    for (const item of list) {
      md += `- **${item.num}** — [${item.titre}](../stories/${item.num}-${item.slug}/README.md)\n`;
    }
    md += '\n';
  }
  return md;
}

function generateStats(stories) {
  const total = stories.length;
  const byStatus = {};
  const byPalier = {};
  let totalMots = 0;
  for (const s of stories) {
    const st = s.fm.statut || 'unknown';
    byStatus[st] = (byStatus[st] || 0) + 1;
    const pal = s.fm.editorial?.palier || 'unknown';
    byPalier[pal] = (byPalier[pal] || 0) + 1;
    totalMots += parseInt(s.fm.editorial?.mots || 0, 10);
  }
  let md = '# Statistiques\n\n> Auto-généré. Ne pas éditer.\n\n';
  md += `| Métrique | Valeur |\n|----------|--------|\n`;
  md += `| Total histoires | ${total} |\n`;
  md += `| Total mots | ${totalMots} |\n`;
  md += `| Mots moyens/histoire | ${total > 0 ? Math.round(totalMots / total) : 0} |\n\n`;
  md += '## Par statut\n\n';
  for (const [k, v] of Object.entries(byStatus).sort()) {
    md += `- ${k}: ${v}\n`;
  }
  md += '\n## Par palier\n\n';
  for (const [k, v] of Object.entries(byPalier).sort()) {
    md += `- ${k}: ${v}\n`;
  }
  return md;
}

function main() {
  fs.mkdirSync(INDEX_DIR, { recursive: true });
  const stories = loadStories();

  fs.writeFileSync(path.join(INDEX_DIR, 'by-character.md'), generateByCharacter(stories));
  fs.writeFileSync(path.join(INDEX_DIR, 'by-theme.md'), generateByTheme(stories));
  fs.writeFileSync(path.join(INDEX_DIR, 'by-status.md'), generateByStatus(stories));
  fs.writeFileSync(path.join(INDEX_DIR, 'stats.md'), generateStats(stories));

  // Placeholders
  fs.writeFileSync(path.join(INDEX_DIR, 'by-moral.md'), '# Index par morale/valeur\n\n> Auto-généré. Ne pas éditer.\n\n_(À implémenter quand le champ `morale_implicite` sera standardisé.)_\n');
  fs.writeFileSync(path.join(INDEX_DIR, 'by-age.md'), '# Index par palier d\'âge\n\n> Auto-généré. Ne pas éditer.\n\nVoir [stats.md](stats.md) pour le résumé par palier.\n');

  console.log(`✅ Index régénérés dans ${INDEX_DIR}/`);
  console.log(`   ${stories.length} histoire(s) indexée(s).`);
}

main();
