export const searchFormConfig = {
  name: 'role',
  title: '角色',
  formItems: [
    {
      filed: 'name',
      type: 'input',
      label: '角色名称',
      placeHolder: '请输入角色名称'
    },
    {
      filed: 'intro',
      type: 'input',
      label: '权限介绍',
      placeHolder: '请输入权限介绍'
    },
    {
      filed: 'createAt',
      type: 'dataPicker',
      label: '创建时间'
    }
  ]
}
