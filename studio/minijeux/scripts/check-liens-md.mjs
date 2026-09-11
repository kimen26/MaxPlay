// check-liens-md.mjs — porte : tous les liens markdown relatifs d'un dossier pointent-ils
// vers un fichier qui existe reellement ?
//
// Ignore : liens http(s)/mailto (externes), ancres pures (#xxx), et liens dont le fragment
// #xxx est retire avant verification (on ne verifie que l'existence du FICHIER, pas de l'ancre).
//
// Usage : node studio/minijeux/scripts/check-liens-md.mjs <dossier>
// Sortie : liste des liens morts (chemin du .md source -> lien casse), exit 1 si au moins un.
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';

const root = process.argv[2];
if (!root) {
  console.error('Usage : node check-liens-md.mjs <dossier>');
  process.exit(2);
}

function listMdFiles(dir) {
  let out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (entry === 'node_modules' || entry === '.git') continue;
      out = out.concat(listMdFiles(p));
    } else if (entry.endsWith('.md')) {
      out.push(p);
    }
  }
  return out;
}

const LINK_RX = /\]\(([^)]+)\)/g;
let dead = 0;

for (const file of listMdFiles(resolve(root))) {
  const txt = readFileSync(file, 'utf8');
  const base = dirname(file);
  let m;
  while ((m = LINK_RX.exec(txt))) {
    let link = m[1].trim();
    if (!link || link.startsWith('http://') || link.startsWith('https://') || link.startsWith('mailto:')) continue;
    if (link.startsWith('#')) continue; // ancre pure, pas un fichier
    link = link.split('#')[0].split(' ')[0]; // retire ancre + titre optionnel "url "titre""
    if (!link) continue;
    const target = resolve(base, link);
    if (!existsSync(target)) {
      console.log(`${file} -> ${m[1]}`);
      dead++;
    }
  }
}

console.log(dead === 0 ? '\n0 lien mort.' : `\n${dead} lien(s) mort(s).`);
process.exit(dead === 0 ? 0 : 1);
