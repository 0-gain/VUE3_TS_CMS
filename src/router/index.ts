import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/main',
      component: () => import('@/views/main/main.vue'),
      children: [
        {
          path: '/main/analysis',
          component: () => import('@/views/main/analysis/index.vue')
        },
        {
          path: '/main/system',
          component: () => import('@/views/main/system/index.vue')
        },
        {
          path: '/main/store',
          component: () => import('@/views/main/store/index.vue')
        },
        {
          path: '/main/product',
          component: () => import('@/views/main/product/index.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    }
  ]
})
export default router
