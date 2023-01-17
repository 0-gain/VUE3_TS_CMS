import { defineStore } from 'pinia'
import { reqDepartmentList, reqRoleList } from '@/service/main'

interface IMainState {
  entireDepartments: any[]
  entireRoles: any[]
}
export const useMainStore = defineStore('main', {
  state: (): IMainState => {
    return {
      entireDepartments: [],
      entireRoles: []
    }
  },
  actions: {
    async getEntireData() {
      const departmentRes = await reqDepartmentList({ offset: 0, size: 100 })
      const roleRes = await reqRoleList({ offset: 0, size: 100 })
      this.entireDepartments = departmentRes.data.list
      this.entireRoles = roleRes.data.list
    }
  },
  getters: {}
})
