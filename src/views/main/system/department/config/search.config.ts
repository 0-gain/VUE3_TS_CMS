export const searchFormConfig = {
  name: 'department',
  title: '部门',
  formItems: [
    {
      filed: 'name',
      type: 'input',
      label: '部门名称',
      placeHolder: '请输入部门名称'
    },
    {
      filed: 'leader',
      type: 'input',
      label: '部门领导',
      placeHolder: '请输入部门领导'
    },
    {
      filed: 'createAt',
      type: 'dataPicker',
      label: '创建时间'
    }
  ]
}
