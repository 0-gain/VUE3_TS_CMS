export const contentConfig = {
  name: 'users',
  header: { title: '用户列表', btnText: '新建用户' },
  tableItems: [
    { type: 'selection', width: 60 },
    { type: 'index', label: '序号', width: 80 },

    { type: 'normal', label: '用户名', prop: 'name', width: 140 },
    { type: 'normal', label: '真实姓名', prop: 'realname', width: 140 },
    { type: 'normal', label: '手机号码', prop: 'cellphone', width: 140 },
    { type: 'normal', label: '状态', prop: 'enable', width: 140 },
    { type: 'time', label: '操作时间', prop: 'createAt' },
    { type: 'time', label: '更新时间', prop: 'updateAt' },
    { type: 'handle', label: '操作' }
  ]
}
