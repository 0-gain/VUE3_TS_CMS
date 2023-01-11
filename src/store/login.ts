import { defineStore } from 'pinia'
import { reqUserLogin, reqRoleMenu } from '@/service/login'
import { localCache } from '@/utils/cache'
const TOKEN_VALUE = 'token'
const ROLE_MENU = 'roleMenu'
export const useLoginStore = defineStore('login', {
  state: () => ({
    token: localCache.getCache(TOKEN_VALUE) ?? '',
    roleMenu: localCache.getCache(ROLE_MENU) ?? []
  }),
  getters: {},
  actions: {
    // 用户登录
    async getUserLogin(name: string, password: string) {
      const res = await reqUserLogin(name, password)
      // 存储token
      localCache.setCache(TOKEN_VALUE, res.data.token)
      this.token = res.data.token
      this.getRoleMenu(res.data.id)
    },
    // 获取用户角色菜单树
    async getRoleMenu(id: number) {
      const res = await reqRoleMenu(id)
      // 本地存储
      localCache.setCache(ROLE_MENU, res.data)
      this.roleMenu = res.data
    }
  }
})
