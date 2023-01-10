import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    }
  ]
})
export default router
