import { defineStore } from 'pinia'
import {
  reqUsersList,
  reqCreateUser,
  reqUpdateUser,
  reqDeleteUser,
  reqPageList,
  reqPageCreateData,
  reqPageDeleteData,
  reqPageUpdateData
} from '@/service/main'
import type { IUsersList, IList } from './types'
import type { INewUserData } from '@/views/main/system/user/types'

interface IListData {
  list: any[]
  totalCount: number
}

interface IStateData {
  usersListData: IListData
  pageListData: IListData
}
export const useSystemStore = defineStore('system', {
  state: (): IStateData => {
    return {
      usersListData: {
        list: [],
        totalCount: 0
      },
      pageListData: {
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
    // 创建新用户
    async getCreateUser(data: INewUserData) {
      await reqCreateUser(data)
    },
    // 更新某个用户
    async getUpdateUser(data: INewUserData, id: number) {
      await reqUpdateUser(data, id)
    },
    // 删除某个用户
    async getDeleteUser(id: number) {
      await reqDeleteUser(id)
    },

    // 获取页面数据列表
    async getPageListData(pageName: string, data: IList) {
      const res = await reqPageList(pageName, data)
      this.pageListData = res.data
    },
    // 创建页面数据
    async getPageCreateData(pageName: string, data: any) {
      const res = await reqPageCreateData(pageName, data)
      console.log(res)
    },
    // 删除页面数据
    async getPageDeleteData(pageName: string, id: number) {
      const res = await reqPageDeleteData(pageName, id)
      console.log(res)
    },
    // 编辑页面数据
    async getPageUpdateData(pageName: string, data: any, id: number) {
      const res = await reqPageUpdateData(pageName, data, id)
      console.log(res)
    }
  },
  getters: {}
})
