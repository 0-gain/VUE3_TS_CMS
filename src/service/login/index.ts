import request from '@/service'

// 用户登录
export const reqUserLogin = (name: string, password: string) =>
  request.post({ url: '/login', data: { name, password } })

// 查询角色菜单树
export const reqRoleMenu = (id: number) =>
  request.get({ url: `/role/${id}/menu` })
