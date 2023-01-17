<template>
  <div class="department">
    <page-search :data="searchForm"></page-search>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import pageSearch from '@/components/page-search/index.vue'
// 搜索表单数据
const searchForm = reactive([
  { label: '部门名称', placeholder: '请输入部门名称', value: '', type: 'name' },
  {
    label: '部门领导',
    placeholder: '请输入部门领导',
    value: '',
    type: 'leader'
  },
  {
    label: '创建时间',
    value: '',
    type: 'createAt'
  }
])
</script>
<style scoped lang="less">
.department {
  background-color: #fff;
  border-radius: 10px;
}
</style>
