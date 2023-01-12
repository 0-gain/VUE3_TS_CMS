import type { App } from 'vue'

import { createPinia } from 'pinia'
import { useLoginStore } from './login'

const pinia = createPinia()

const registerPinia = (app: App<Element>) => {
  app.use(pinia)
  const loginStore = useLoginStore()
  loginStore.loadLocalDataAction()
}

export default registerPinia
