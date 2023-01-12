import { localCache } from '@/utils/cache'
import { firstRoute } from '@/utils/map-menu'
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue'),
      children: []
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    }
  ]
})

router.beforeEach((to) => {
  // 如果没有token，则不准进入main
  const token = localCache.getCache('token')
  if (!token && to.path.startsWith('/main')) {
    return '/login'
  }
  if (to.name === 'main') {
    return firstRoute.path
  }
})
export default router
