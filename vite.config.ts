import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import fs from 'fs'

function serveFrontendVideos(): Plugin {
  return {
    name: 'serve-frontend-videos',
    configureServer(server) {
      server.middlewares.use('/videos', (req, res, next) => {
        const reqPath = decodeURIComponent((req.url || '').split('?')[0]);
        const videoDir = path.resolve(import.meta.dirname, '../frontend/public/videos');
        const filePath = path.join(videoDir, reqPath.replace(/^\//, ''));

        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const stat = fs.statSync(filePath);
          const fileSize = stat.size;
          const range = req.headers.range;

          res.setHeader('Content-Type', 'video/mp4');
          res.setHeader('Accept-Ranges', 'bytes');

          if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = end - start + 1;
            const file = fs.createReadStream(filePath, { start, end });

            res.writeHead(206, {
              'Content-Range': `bytes ${start}-${end}/${fileSize}`,
              'Content-Length': chunksize,
              'Content-Type': 'video/mp4',
            });
            file.pipe(res);
          } else {
            res.writeHead(200, {
              'Content-Length': fileSize,
              'Content-Type': 'video/mp4',
            });
            fs.createReadStream(filePath).pipe(res);
          }
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), serveFrontendVideos()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      ignored: ['**/datasets/**', '**/.pytest_cache/**', '**/backend/**', '**/.git/**'],
    },
    fs: {
      allow: ['..'],
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('recharts')) {
              return 'vendor-recharts';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor-deps';
          }
        },
      },
    },
  },
});
