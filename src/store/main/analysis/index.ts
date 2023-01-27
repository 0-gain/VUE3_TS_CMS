import { defineStore } from 'pinia'
import {
  reqGoodsAmountList,
  reqGoodsCategoryCount,
  reqGoodsSaleRank,
  reqGoodsCategorySale,
  reqGoodsCategoryFavor,
  reqCityGoodsSale
} from '@/service/main'

interface IState {
  amountList: any[]
  categoryData: any[]
  saleRankData: any[]
  categorySaleData: any[]
  categoryFavorData: any[]
  cityGoodsSale: any[]
}
export const useAnalysisStore = defineStore('analysis', {
  state: (): IState => {
    return {
      amountList: [],
      categoryData: [],
      saleRankData: [],
      categorySaleData: [],
      categoryFavorData: [],
      cityGoodsSale: []
    }
  },
  actions: {
    async getGoodsAmountList() {
      const res = await reqGoodsAmountList()
      this.amountList = res.data
    },
    async getGoodsCategoryCount() {
      const res = await reqGoodsCategoryCount()
      this.categoryData = res.data
    },
    async getGoodsSaleRank() {
      const res = await reqGoodsSaleRank()
      this.saleRankData = res.data
    },
    async getGoodsCategorySale() {
      const res = await reqGoodsCategorySale()
      this.categorySaleData = res.data
    },
    async getGoodsCategoryFavor() {
      const res = await reqGoodsCategoryFavor()
      this.categoryFavorData = res.data
    },
    async getCityGoodsSale() {
      const res = await reqCityGoodsSale()
      this.cityGoodsSale = res.data
    }
  },
  getters: {}
})
