import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // This is the build output directory
    assetsDir: 'assets', // Directory for assets inside outDir
    emptyOutDir: true, // Empty the output directory before building
  },
  base: './',
  server: {
    mimeTypes: {
      js: 'application/javascript',
    },
    proxy: {
      '/api': {
        target: 'https://aitechs-sas-garbage-solution-backend.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res, options) => {
            proxyReq.setHeader('X-Original-Host', req.headers.host);
          });
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      

    },
    define: {
      "process.env": {},
    },
  },
})

