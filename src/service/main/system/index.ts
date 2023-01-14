import request from '@/service/index'
import type { IUsersList, IList } from '@/store/main/system/types'
import type { INewUserData } from '@/views/main/system/user/types'

/**
 *查询用户列表
 * @params  {offset: number,size: number,name?: string,cellphone?: number} data
 * @returns
 */

export const reqUsersList = (data: IUsersList) =>
  request.post({ url: '/users/list', data })

/**
 *获取部门列表
 * @param data
 * @returns
 */
export const reqDepartmentList = (data: IList) =>
  request.post({ url: '/department/list', data })

/**
 *获取角色列表
 * @param data
 * @returns
 */
export const reqRoleList = (data: IList) =>
  request.post({ url: '/role/list', data })

export const reqCreateUser = (data: INewUserData) =>
  request.post({ url: '/users', data })
