import { createSSRApp } from 'vue'
import App from './App.vue'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import tabbar from './components/tabbar/index.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.component('Tabbar', tabbar)
  return {
    app,
  }
}
