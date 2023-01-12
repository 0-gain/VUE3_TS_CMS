import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'

// 获取所有的路由
export function allRoute() {
  // 1.加载所有的模块
  const modules: Record<string, any> = import.meta.glob(
    '@/router/main/**/*.ts',
    { eager: true }
  )
  // 2.获取路由
  const routes: RouteRecordRaw[] = []
  for (const key in modules) {
    const route = modules[key].default
    routes.push(route)
  }
  return routes
}

export let firstRoute: RouteRecordRaw
// 根据菜单动态注册路由
export function menuToRoute(menus: any) {
  const routes = allRoute()
  for (const menu of menus) {
    for (const submenu of menu.children) {
      const route = routes.find((item) => item.path === submenu.url)
      if (route) {
        router.addRoute('main', route)
      }
      if (route && !firstRoute) firstRoute = route
    }
  }
}

export function mapPathToMenu(menus: any, path: string) {
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}
