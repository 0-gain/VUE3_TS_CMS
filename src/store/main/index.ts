import { defineStore } from 'pinia'
import { reqDepartmentList, reqRoleList, reqMenuList } from '@/service/main'

interface IMainState {
  entireDepartments: any[]
  entireRoles: any[]
  entireMenu: any[]
}
export const useMainStore = defineStore('main', {
  state: (): IMainState => {
    return {
      entireDepartments: [],
      entireRoles: [],
      entireMenu: []
    }
  },
  actions: {
    async getEntireData() {
      const departmentRes = await reqDepartmentList({ offset: 0, size: 100 })
      const roleRes = await reqRoleList({ offset: 0, size: 100 })
      const menuRes = await reqMenuList()
      this.entireDepartments = departmentRes.data.list
      this.entireRoles = roleRes.data.list
      this.entireMenu = menuRes.data.list
    }
  },
  getters: {}
})
