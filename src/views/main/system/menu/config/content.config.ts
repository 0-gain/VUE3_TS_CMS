export const contentConfig = {
  name: 'menu',
  header: { title: '菜单列表', btnText: '新建菜单' },
  tableItems: [
    {
      label: '菜单名称',
      prop: 'name',
      width: 140
    },
    { label: '级别', prop: 'type', width: 140 },
    { label: '菜单URL', prop: 'url', width: 140 },
    { label: '菜单icon', prop: 'icon', width: 140 },
    { label: '排序', prop: 'sort', width: 140 },
    { type: 'time', label: '创建时间', prop: 'createAt' },
    { type: 'time', label: '更新时间', prop: 'updateAt' },
    { type: 'handle', label: '操作' }
  ],
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }
}
