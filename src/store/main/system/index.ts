import { defineStore } from 'pinia'
import {
  reqUsersList,
  reqDepartmentList,
  reqRoleList,
  reqCreateUser,
  reqSearchOneUser,
  reqUpdateUser,
  reqDeleteUser
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
  currentUserInfo: any
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
      },
      currentUserInfo: {}
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
    },
    // 查询某个用户
    async getSearchOneUser(id: number) {
      const res = await reqSearchOneUser(id)
      this.currentUserInfo = res.data
    },
    // 更新某个用户
    async getUpdateUser(data: INewUserData, id: number) {
      await reqUpdateUser(data, id)
    },
    // 删除某个用户
    async getDeleteUser(id: number) {
      await reqDeleteUser(id)
    }
  },
  getters: {}
})
