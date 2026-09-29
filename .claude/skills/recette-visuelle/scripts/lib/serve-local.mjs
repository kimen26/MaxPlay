// Petit serveur http statique pour servir une page locale à Playwright.
// Nécessaire car le site MaxPlay fait des fetch() relatifs (manifest, data.js
// via <script src>) qui échouent en file:// — on sert donc depuis la racine
// du dossier qui contient la page demandée (généralement site/).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve, dirname } from 'node:path';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.woff2': 'font/woff2',
};

/**
 * Démarre un serveur statique racine `rootDir`, retourne { url, close() }.
 * `url` pointe vers `entryFile` relatif à `rootDir`.
 */
export async function serveLocal(entryFilePath) {
  const absEntry = resolve(entryFilePath);
  const rootDir = dirname(absEntry);
  const entryName = absEntry.slice(rootDir.length + 1);

  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      const filePath = urlPath === '/' ? join(rootDir, entryName) : join(rootDir, urlPath);
      const resolved = resolve(filePath);
      if (!resolved.startsWith(resolve(rootDir))) {
        res.writeHead(403); res.end('Forbidden'); return;
      }
      const s = await stat(resolved).catch(() => null);
      if (!s || !s.isFile()) { res.writeHead(404); res.end('Not found'); return; }
      const body = await readFile(resolved);
      res.writeHead(200, { 'Content-Type': MIME[extname(resolved)] || 'application/octet-stream' });
      res.end(body);
    } catch (err) {
      res.writeHead(500); res.end(String(err));
    }
  });

  await new Promise((resolve_) => server.listen(0, '127.0.0.1', resolve_));
  const port = server.address().port;
  const url = `http://127.0.0.1:${port}/${entryName.replace(/\\/g, '/')}`;
  return { url, close: () => new Promise((r) => server.close(r)) };
}
