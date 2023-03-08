import { createSSRApp } from 'vue'
import App from './App.vue'
// import 'virtual:windi-components.css'
// import 'virtual:windi-utilities.css'
import tabbar from './components/tabbar/index.vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { store } from './store'
import './styles/index.scss'
import './styles/page.scss'
export function createApp() {
  const app = createSSRApp(App)
  dayjs.locale('zh-cn')
  app.component('Tabbar', tabbar)
  app.use(store)
  return {
    app,
  }
}
