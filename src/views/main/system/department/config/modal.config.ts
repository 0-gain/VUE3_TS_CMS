export const modalConfig = {
  name: 'department',
  title: '部门',
  formItems: [
    {
      prop: 'name',
      type: 'input',
      label: '部门名称',
      placeHolder: '请输入部门名称'
    },
    {
      prop: 'parentId',
      type: 'select',
      label: '上级部门',
      options: [],
      placeHolder: '请选择上级部门'
    },
    {
      prop: 'leader',
      type: 'input',
      label: '领导名称',
      placeHolder: '请输入领导名称'
    }
  ]
}
