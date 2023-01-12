<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">{{
      breadcrumb.split('-')[0]
    }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ breadcrumb.split('-')[1] }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/store/login'
const route = useRoute()
const loginStore = useLoginStore()
const menus = loginStore.roleMenu

// 面包屑
const crumbName = () => {
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (submenu.url === route.path) {
        return menu.name + '-' + submenu.name
      }
    }
  }
}
let defaultName = crumbName()
const breadcrumb = ref(defaultName) as Ref<string>
watch(route, () => {
  defaultName = crumbName()
})
</script>
<style scoped lang="less"></style>
