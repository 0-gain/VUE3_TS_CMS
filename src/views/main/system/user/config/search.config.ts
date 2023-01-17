export const searchFormConfig = {
  formItems: [
    {
      filed: 'name',
      type: 'input',
      label: '用户名',
      placeHolder: '请输入用户名'
    },
    {
      filed: 'realname',
      type: 'input',
      label: '真实姓名',
      placeHolder: '请输入真实姓名'
    },
    {
      filed: 'cellphone',
      type: 'input',
      label: '手机号码',
      placeHolder: '请输入手机号码'
    },
    {
      filed: 'enable',
      type: 'selection',
      label: '状态',
      placeHolder: '请选择状态',
      options: [
        { name: '启用', value: 1 },
        { name: '禁用', value: 0 }
      ]
    },
    {
      filed: 'createAt',
      type: 'dataPicker',
      label: '创建时间'
    }
  ]
}
