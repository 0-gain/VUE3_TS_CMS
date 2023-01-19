export const modalConfig = {
  name: 'role',
  title: '角色',
  formItems: [
    {
      prop: 'name',
      type: 'input',
      label: '角色名称',
      placeHolder: '请输入角色名称'
    },
    {
      prop: 'intro',
      type: 'input',
      label: '角色描述',
      placeHolder: '请输入角色描述'
    },
    {
      prop: 'menuList',
      type: 'custom',
      slotName: 'menulist'
    }
  ]
}
