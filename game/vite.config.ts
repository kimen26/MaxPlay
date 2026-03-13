import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  base: process.env.CI ? '/MaxPlay/mj-07/' : './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    {
      // Dev only: sert game-html/ sous /game-html/* pour la navigation locale
      name: 'serve-game-html',
      configureServer(server) {
        const gameHtmlDir = path.resolve(process.cwd(), '../game-html');
        server.middlewares.use((req, res, next) => {
          if (!req.url?.startsWith('/game-html/')) return next();
          const filePath = path.join(gameHtmlDir, req.url.slice('/game-html/'.length));
          if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) return next();
          const ext = path.extname(filePath).slice(1);
          const mime: Record<string, string> = {
            html: 'text/html; charset=utf-8',
            css: 'text/css',
            js: 'application/javascript',
            png: 'image/png',
            svg: 'image/svg+xml',
          };
          res.setHeader('Content-Type', mime[ext] ?? 'application/octet-stream');
          res.end(fs.readFileSync(filePath));
        });
      },
    },
  ],
});
