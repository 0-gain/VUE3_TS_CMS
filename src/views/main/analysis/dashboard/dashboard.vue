<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in amountList" :key="index">
        <cardCount v-bind="item" />
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="7">
        <chartCard header="分类商品数量(饼图)">
          <pie-chart :pieData="categoryList" />
        </chartCard>
      </el-col>
      <el-col :span="10">
        <chartCard header="不同城市商品销量">
          <mapEcharts :mapData="cityGoodsSale" />
        </chartCard>
      </el-col>
      <el-col :span="7">
        <chart-card header="分类商品数量(玫瑰图)">
          <rose-chart :roseData="saleRankData" />
        </chart-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <chart-card header="分类商品的销量">
          <line-chart
            :labels="categorySale.labels"
            :values="categorySale.values"
          />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card header="分类商品的收藏">
          <bar-chart
            :labels="categoryFavor.labels"
            :values="categoryFavor.values"
          />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAnalysisStore } from '@/store/main/analysis'
import chartCard from '@/components/chart-card/chart-card.vue'
import PieChart from '@/components/page-echarts/cpns/pie-chart.vue'
import roseChart from '@/components/page-echarts/cpns/rose-chart.vue'
import lineChart from '@/components/page-echarts/cpns/line-chart.vue'
import mapEcharts from '@/components/page-echarts/cpns/map-echarts.vue'
import cardCount from '@/components/card-count/card-count.vue'
const analysisStore = useAnalysisStore()
analysisStore.getGoodsAmountList()
analysisStore.getGoodsCategoryCount()
analysisStore.getGoodsSaleRank()
analysisStore.getGoodsCategorySale()
analysisStore.getGoodsCategoryFavor()
analysisStore.getCityGoodsSale()
const amountList = computed(() => analysisStore.amountList)

const categoryList = computed(() => {
  return analysisStore.categoryData.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})

const saleRankData = computed(() => {
  return analysisStore.saleRankData.map((item) => {
    return { name: item.name, value: item.saleCount }
  })
})

const categorySale = computed(() => {
  const labels = analysisStore.categorySaleData.map((item) => item.name)
  const values = analysisStore.categorySaleData.map((item) => item.goodsCount)
  return { labels, values }
})
const categoryFavor = computed(() => {
  const labels = analysisStore.categoryFavorData.map((item) => item.name)
  const values = analysisStore.categoryFavorData.map((item) => item.goodsFavor)
  return { labels, values }
})

const cityGoodsSale = computed(() => {
  return analysisStore.cityGoodsSale.map((item) => {
    return { name: item.address, value: item.count }
  })
})
</script>
<style scoped lang="less">
.content {
  display: flex;
  color: rgba(0, 0, 0, 0.85);
  font-size: 26px;
}
.footer {
  display: flex;
  align-items: center;
  height: 38px;
  font-size: 14px;
  letter-spacing: 1px;
  border-top: 1px solid #f0f0f0;
}
.box-card {
  text-align: left;
}
.el-row {
  margin-bottom: 20px;
}
</style>
