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

export let firstRoute: RouteRecordRaw | undefined = undefined
// 根据菜单动态注册路由
export function menuToRoute(menus: any) {
  const routes = allRoute()
  let children = []
  for (const menu of menus) {
    for (const submenu of menu.children) {
      const route = routes.find((item) => item.path === submenu.url)
      if (route) {
        router.addRoute('main', route)
        children.push(route)
      }
      if (route && !firstRoute) firstRoute = route
    }
    if (children.length) {
      router.addRoute({ path: menu.url, redirect: children[0].path })
      children = []
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

export function mapPathToBreadcrumbs(menus: any[], path: string) {
  const breadcrumbs: any[] = []
  // 1.两层遍历
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
