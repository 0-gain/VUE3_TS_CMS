import { defineStore } from 'pinia'
import { reqUserLogin, reqRoleMenu, reqUserInfo } from '@/service/login'
import { localCache } from '@/utils/cache'
import { menuToRoute, mapMenuPermission } from '@/utils/map-menu'

interface ILoginState {
  token: string
  roleMenu: any[]
  userInfo: any
  permission: string[]
}

const TOKEN_VALUE = 'token'
const ROLE_MENU = 'roleMenu'
const USER_INFO = 'userInfo'
const USER_PERMISSION = 'permission'
export const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    roleMenu: [],
    userInfo: {},
    permission: []
  }),
  getters: {},
  actions: {
    // 用户登录
    async getUserLogin(name: string, password: string) {
      const res = await reqUserLogin(name, password)
      // 存储token
      localCache.setCache(TOKEN_VALUE, res.data.token)
      this.token = res.data.token
      this.getUserInfo(res.data.id)
    },

    // 获取用户信息
    async getUserInfo(id: number) {
      const res = await reqUserInfo(id)
      this.userInfo = res.data
      localCache.setCache(USER_INFO, res.data)
      this.getRoleMenu(res.data.role.id)
    },
    // 获取用户角色菜单树
    async getRoleMenu(id: number) {
      const res = await reqRoleMenu(id)
      // 本地存储
      localCache.setCache(ROLE_MENU, res.data)
      console.log(res.data)
      this.roleMenu = res.data

      // 通过菜单注册路由
      menuToRoute(res.data)
      const permission = mapMenuPermission(this.roleMenu)
      this.permission = permission
      localCache.setCache(USER_PERMISSION, permission)
    },
    // 读取本地缓存
    loadLocalDataAction() {
      this.token = localCache.getCache(TOKEN_VALUE) ?? ''
      this.roleMenu = localCache.getCache(ROLE_MENU) ?? []
      this.userInfo = localCache.getCache(USER_INFO) ?? {}
      this.permission = localCache.getCache(USER_PERMISSION) ?? []
      if (this.token) {
        // 通过菜单注册路由
        menuToRoute(this.roleMenu)
      }
    }
  }
})
