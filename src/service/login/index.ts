import request from '@/service'

export const login = (name: string, password: string) =>
  request.post({ url: '/login', data: { name, password } })
