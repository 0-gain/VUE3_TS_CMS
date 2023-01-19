export const contentConfig = {
  name: 'department',
  header: { title: '部门列表', btnText: '新建部门' },
  tableItems: [
    { type: 'selection', width: 60 },
    { type: 'index', label: '序号', width: 80 },

    { type: 'normal', label: '部门名称', prop: 'name', width: 140 },
    { type: 'normal', label: '部门领导', prop: 'leader', width: 140 },
    { type: 'normal', label: '上级部门', prop: 'parentId', width: 140 },
    { type: 'time', label: '创建时间', prop: 'createAt' },
    { type: 'time', label: '更新时间', prop: 'updateAt' },
    { type: 'handle', label: '操作' }
  ]
}
