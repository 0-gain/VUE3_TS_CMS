<template>
  <div
    class="base-chart"
    style="width: 100%; height: 400px"
    ref="echartRef"
  ></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
interface IProps {
  options: EChartsOption
}
const props = defineProps<IProps>()
const echartRef = ref<HTMLElement>()
onMounted(() => {
  // 获取DOM节点
  const echartInstance = echarts.init(echartRef.value as HTMLElement, 'light', {
    renderer: 'canvas'
  })
  watchEffect(() => {
    echartInstance.setOption(props.options)
  })
})
</script>
<style scoped lang="less"></style>
