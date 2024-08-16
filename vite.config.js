import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [vue()],
   resolve: {
      alias: {
         '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      'process.env': {
         VITE_BASE_URL: process.env.VITE_BASE_URL || 'https://main--mybestcodeup.netlify.app',
      },
   },
   build: {
      outDir: 'dist',
   },
})
//export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//      alias: {
//         '@': fileURLToPath(new URL('./src', import.meta.url)),
//      },
//   },
//   build: {
//      outDir: 'dist',
//   },
//   base: '/codeup/',
//})
