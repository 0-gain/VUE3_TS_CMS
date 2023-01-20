<template>
  <el-card class="box-card" :header="header">
    <slot></slot>
  </el-card>
</template>

<script lang="ts" setup>
interface IProps {
  header: string
}
defineProps<IProps>()
</script>
<style scoped lang="less"></style>
