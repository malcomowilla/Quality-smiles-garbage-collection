import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import { VitePWA } from 'vite-plugin-pwa'
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "zogo.aitechs.com",
//     port: 8000,
//   },
// });
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    
    VitePWA({
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      // strategies: "injectManifest",
       mode: 'injectManifest',
      srcDir: "src",
      filename: "sw.js",
      injectManifest: {
        // swDest: "dist/sw.js",
        // maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // Increase to 4 MiB or any size you prefer
          globPatterns: ['**/*.{js,css,html}'],
    globDirectory: 'dist',
    globIgnores: ['node_modules/**/*', 'sw.js']
      },
      manifest: {
        name: 'Aitechs',
        short_name: 'Aitechs',
        theme_color: '#ffffff', 
        background_color: '#ffffff',
        start_url: "/signin",
        orientation: "portrait",
        display: "standalone",
        icons: [
          {
            "src": "/images/logo/pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "/images/logo/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/images/logo/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "/images/logo/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist', // This is the build output directory
    assetsDir: 'assets', // Directory for assets inside outDir
    emptyOutDir: true, // Empty the output directory before building
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: ['react-lottie'],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  base: './',
  server: {
    // host: 'zogo.aitechs.com',
    mimeTypes: {
      js: 'application/javascript'
    },
    proxy: {
      '/api': {
        // target: 'http://192.168.1.69:4000',
        // target: 'http://localhost:4000',
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res, options) => {
            proxyReq.setHeader('X-Original-Host', req.headers.host);
          });
        },

          target: (req) => {
          const host = req.headers.host; // Get the request hostname
      
          // Check if the host is "aitechs.co.ke" or any subdomain of it
          if (host.endsWith('.aitechs.co.ke')) {
            return `https://${host}`; // Proxy dynamically based on the request domain
          }
          return 'http://0.0.0.0:3000'; // Default target if not matching
        },
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),

      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web'
    },
    define: {
      "process.env": {},
      __DEV__: JSON.stringify(true),
      process: {
        env: {}
      }
    }
  },
  
})











