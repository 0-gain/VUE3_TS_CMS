<template>
  <div class="content">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import locale from 'element-plus/lib/locale/lang/zh-cn'
</script>
<style scoped lang="less">
.content {
  height: 100vw;
  height: 100vh;
}
</style>
