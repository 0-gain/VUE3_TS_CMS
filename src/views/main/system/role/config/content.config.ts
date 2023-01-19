export const contentConfig = {
  name: 'role',
  header: { title: '角色列表', btnText: '新建角色' },
  tableItems: [
    { type: 'selection', width: 60 },
    { type: 'index', label: '序号', width: 80 },

    { type: 'normal', label: '人事', prop: 'name', width: 140 },
    { type: 'normal', label: '角色权限', prop: 'intro', width: 140 },
    { type: 'time', label: '创建时间', prop: 'createAt' },
    { type: 'time', label: '更新时间', prop: 'updateAt' },
    { type: 'handle', label: '操作' }
  ]
}
