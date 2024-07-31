import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/clova': {
        target: 'https://naveropenapi.apigw.ntruss.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/clova/, ''),
      },
    },
  },
})
