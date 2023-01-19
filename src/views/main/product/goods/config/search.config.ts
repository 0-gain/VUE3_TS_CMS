export const searchConfig = {
  formItems: [
    {
      filed: 'name',
      type: 'input',
      label: '商品名称',
      placeHolder: '请输入商品名称'
    },
    {
      filed: 'address',
      type: 'input',
      label: '商品地址',
      placeHolder: '请输入商品地址'
    },
    {
      filed: 'status',
      type: 'selection',
      label: '状态',
      placeHolder: '请选择状态',
      options: [
        { name: '上架', value: 1 },
        { name: '下架', value: 0 }
      ]
    },
    {
      filed: 'createAt',
      type: 'dataPicker',
      label: '创建时间'
    }
  ]
}
