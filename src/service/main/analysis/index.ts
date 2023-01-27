import request from '@/service'

/**
 * 商品数据统计数量
 * @returns
 */
export const reqGoodsAmountList = () =>
  request.get({ url: '/goods/amount/list' })

/**
 * 每个分类商品的个数
 * @returns
 */
export const reqGoodsCategoryCount = () =>
  request.get({ url: '/goods/category/count' })

/**
 * 销量前10的商品的数量
 * @returns
 */
export const reqGoodsSaleRank = () => request.get({ url: '/goods/sale/top10' })

/**
 * 每个分类商品的销量
 * @returns
 */
export const reqGoodsCategorySale = () =>
  request.get({ url: '/goods/category/sale' })

export const reqGoodsCategoryFavor = () =>
  request.get({ url: '/goods/category/favor' })

/**
 * 不同城市的销售数量
 * @returns
 */
export const reqCityGoodsSale = () =>
  request.get({ url: '/goods/address/sale' })
