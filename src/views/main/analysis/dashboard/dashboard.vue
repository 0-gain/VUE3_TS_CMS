<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in amountList" :key="index">
        <div class="container">
          <div class="header">
            <span>{{ item.title }}</span>
            <el-tooltip :content="item.tips" placement="top" effect="light">
              <el-icon><Warning /></el-icon>
            </el-tooltip>
          </div>
          <div class="content">
            <span>{{
              (item.amount === 'saleroom' ? '￥' : '') +
              formatCount(item.number1)
            }}</span>
          </div>
          <div class="footer">
            商品总销量&nbsp;
            <span>{{
              (item.amount === 'saleroom' ? '￥' : '') +
              formatCount(item.number2)
            }}</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="7">
        <chartCard header="分类商品数量(饼图)">
          <pie-chart :pieData="categoryList" />
        </chartCard>
      </el-col>
      <el-col :span="10"><div class="grid-content ep-bg-purple" /></el-col>
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
import { formatCount } from '@/utils/format'
import chartCard from '@/components/chart-card/chart-card.vue'
import PieChart from '@/components/pie-chart/pie-chart.vue'
import roseChart from '@/components/rose-chart/rose-chart.vue'
import lineChart from '@/components/line-chart/line-chart.vue'
const analysisStore = useAnalysisStore()
analysisStore.getGoodsAmountList()
analysisStore.getGoodsCategoryCount()
analysisStore.getGoodsSaleRank()
analysisStore.getGoodsCategorySale()
analysisStore.getGoodsCategoryFavor()
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
</script>
<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 20px;
  height: 130px;
  overflow: hidden;
  text-align: left;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 36px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  .el-icon {
    cursor: pointer;
  }
}
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
