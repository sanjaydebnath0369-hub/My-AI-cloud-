import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        ws: true,
        configure: (proxy) => {
          proxy.on('error', (err: any, _req, res) => {
            if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') {
              console.warn('[Vite Proxy] Backend initializing or reconnecting on port 3001');
            } else {
              console.warn('[Vite Proxy Warning]:', err.message);
            }
            if (res && 'writeHead' in res && !(res as any).headersSent) {
              (res as any).writeHead(503, { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
              });
              (res as any).end(JSON.stringify({ 
                status: 'STARTING',
                error: 'Backend Express server is starting or reconnecting.', 
                isUnavailable: true 
              }));
            }
          });
        }
      }
    }
  },
  optimizeDeps: {
    include: ['three', 'xrblocks', 'openai', 'axios', 'd3'],
    exclude: []
  }
});
