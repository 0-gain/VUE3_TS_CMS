export const modalConfig = {
  name: 'users',
  title: '用户',
  formItems: [
    {
      prop: 'name',
      type: 'input',
      label: '用户名',
      placeHolder: '请输入用户名'
    },
    {
      prop: 'realname',
      type: 'input',
      label: '真实姓名',
      placeHolder: '请输入真实姓名'
    },
    {
      prop: 'password',
      type: 'password',
      label: '密码',
      placeHolder: '请输入密码'
    },
    {
      prop: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeHolder: '请输入电话号码'
    },
    {
      prop: 'roleId',
      type: 'select',
      label: '角色',
      options: [],
      placeHolder: '请选择角色'
    },
    {
      prop: 'departmentId',
      type: 'select',
      label: '部门',
      options: [],
      placeHolder: '请选择部门'
    }
  ]
}
