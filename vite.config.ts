import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import viteCompression from 'vite-plugin-compression'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), viteCompression()],
})
