export const contentConfig = {
  name: 'goods',
  header: { title: '商品列表', btnText: '新建商品' },
  tableItems: [
    { type: 'selection', width: 60 },
    { type: 'index', label: '序号', width: 80 },

    { type: 'normal', label: '商品名称', prop: 'name', width: 140 },
    { type: 'normal', label: '原价格', prop: 'oldPrice', width: 80 },
    { type: 'normal', label: '新价格', prop: 'newPrice', width: 80 },
    { type: 'normal', label: '商品描述', prop: 'desc', width: 140 },
    { type: 'normal', label: '状态', prop: 'status', width: 80 },
    {
      type: 'custom',
      label: '图片',
      prop: 'imgUrl',
      slotName: 'img'
    },
    { type: 'normal', label: '库存', prop: 'inventoryCount', width: 140 },
    { type: 'normal', label: '销量', prop: 'saleCount', width: 140 },
    { type: 'normal', label: '收藏', prop: 'favorCount', width: 140 },
    { type: 'normal', label: '地址', prop: 'address', width: 140 },
    { type: 'time', label: '创建时间', prop: 'createAt', width: 180 },
    { type: 'time', label: '更新时间', prop: 'updateAt', width: 180 },
    { type: 'handle', label: '操作', width: 160 }
  ]
}
