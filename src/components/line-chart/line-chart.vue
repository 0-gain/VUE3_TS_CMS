<template>
  <div class="line-chart">
    <base-chart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import baseChart from '../base-chart/base-chart.vue'
interface IProps {
  labels: string[]
  values: any[]
}
const props = defineProps<IProps>()
const options = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.labels
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '分类销量统计',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.values
      }
    ]
  }
})
</script>
<style scoped lang="less"></style>
