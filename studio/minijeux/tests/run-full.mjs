// run-full.mjs — enchaîne run-all.mjs (36 mj-XX du menu) PUIS run-autonomes.mjs
// (specs autonomes / orphelines du catalogue), même si le premier échoue, et sort
// en code ≠ 0 si l'un des deux est rouge. Point d'entrée unique de `npm test`.
import { spawnSync } from 'node:child_process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));

const all = spawnSync('node', ['run-all.mjs'], { cwd: __dir, stdio: 'inherit' });
const autonomes = spawnSync('node', ['run-autonomes.mjs'], { cwd: __dir, stdio: 'inherit' });

process.exit((all.status || 0) !== 0 || (autonomes.status || 0) !== 0 ? 1 : 0);
