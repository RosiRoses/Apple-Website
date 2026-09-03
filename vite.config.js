import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  base: '/Apple-Website/',

  plugins: [
    react(),
    sentryVitePlugin({
      org: "jsm-k5p",
      project: "iphone-web"
    })
  ],

  build: {
    sourcemap: true
  }
})
