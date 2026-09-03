import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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