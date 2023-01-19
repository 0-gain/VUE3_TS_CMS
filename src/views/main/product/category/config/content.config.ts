export const contentConfig = {
  name: 'category',
  header: { title: '类别列表', btnText: '新建列表' },
  tableItems: [
    { type: 'selection', width: 60 },
    { type: 'index', label: '序号', width: 80 },

    { type: 'normal', label: '角色名称', prop: 'name', width: 140 },
    { type: 'time', label: '创建时间', prop: 'createAt' },
    { type: 'time', label: '更新时间', prop: 'updateAt' },
    { type: 'handle', label: '操作' }
  ]
}
