import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'normalize.css'
import 'element-plus/es/components/message/style/css'
import './assets/css/index.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
app.use(router)

app.mount('#app')
