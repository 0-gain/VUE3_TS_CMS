<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <template v-for="(item, index) in breadcrumbs" :key="index">
      <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/store/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menu'
const route = useRoute()
const loginStore = useLoginStore()
const breadcrumbs = computed(() => {
  const breadcrumbs = mapPathToBreadcrumbs(loginStore.roleMenu, route.path)
  return breadcrumbs
})
</script>
<style scoped lang="less"></style>
