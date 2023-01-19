<template>
  <div class="menu">
    <page-content :config="contentConfig" />
  </div>
</template>

<script lang="ts" setup>
import pageContent from '@/components/page-content/index.vue'
import { contentConfig } from './config/content.config'
</script>
<style scoped lang="less">
.menu {
  background-color: #fff;
  border-radius: 10px;
}
</style>
