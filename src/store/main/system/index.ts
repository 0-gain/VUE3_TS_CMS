import { defineStore } from 'pinia'
import {
  reqUsersList,
  reqDepartmentList,
  reqRoleList,
  reqCreateUser
} from '@/service/main'
import type { IUsersList, IList } from './types'
import type { INewUserData } from '@/views/main/system/user/types'

interface IListData {
  list: any[]
  totalCount: number
}

interface IStateData {
  usersListData: IListData
  departmentListData: IListData
  roleListData: IListData
}
export const useSystemStore = defineStore('system', {
  state: (): IStateData => {
    return {
      usersListData: {
        list: [],
        totalCount: 0
      },
      departmentListData: {
        list: [],
        totalCount: 0
      },
      roleListData: {
        list: [],
        totalCount: 0
      }
    }
  },
  actions: {
    // 获取用户列表
    async getUsersList(data: IUsersList) {
      const res = await reqUsersList(data)
      this.usersListData = res.data
    },
    // 获取部门列表
    async getDepartmentList(data: IList) {
      const res = await reqDepartmentList(data)
      this.departmentListData = res.data
    },
    // 获取角色列表
    async getRoleList(data: IList) {
      const res = await reqRoleList(data)
      this.roleListData = res.data
    },
    // 创建新用户
    async getCreateUser(data: INewUserData) {
      await reqCreateUser(data)
    }
  },
  getters: {}
})
