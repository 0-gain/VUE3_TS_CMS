<template>
  <div class="rose-chart">
    <base-chart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import baseChart from '../base-chart/base-chart.vue'
import type { EChartsOption } from 'echarts'
import type { IRoseEchartsData } from './types'
interface IProps {
  roseData: IRoseEchartsData[]
}
const props = defineProps<IProps>()
const options = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        // 内半径/外半径的大小
        radius: [10, 160],
        // 设置区域的位置
        center: ['50%', '50%'],
        data: props.roseData,
        itemStyle: {
          borderRadius: 8
        },
        roseType: 'area',
        label: {
          show: false
        }
      }
    ]
  }
})
</script>
<style scoped lang="less"></style>
