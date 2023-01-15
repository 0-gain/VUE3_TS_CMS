<template>
  <el-form label-width="100px" size="large" :model="searchForm" ref="formRef">
    <el-row :gutter="20">
      <el-col :span="8"
        ><el-form-item label="用户名" prop="name">
          <el-input
            placeholder="请输入用户名"
            v-model="searchForm.name"
          /> </el-form-item
      ></el-col>
      <el-col :span="8"
        ><el-form-item label="真实姓名" prop="realname">
          <el-input
            placeholder="请输入真实姓名"
            v-model="searchForm.realname"
          /> </el-form-item
      ></el-col>
      <el-col :span="8"
        ><el-form-item label="手机号码" prop="cellphone">
          <el-input
            placeholder="请输入手机号码"
            v-model="searchForm.cellphone"
          /> </el-form-item
      ></el-col>
      <el-col :span="8"
        ><el-form-item label="状态" prop="enable">
          <el-select
            v-model="searchForm.enable"
            class="m-2"
            placeholder="请选择状态"
            size="large"
          >
            <el-option
              v-for="item in enableData"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select> </el-form-item
      ></el-col>
      <el-col :span="8"
        ><el-form-item label="创建时间" prop="createAt">
          <div class="block">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            /></div></el-form-item
      ></el-col>
    </el-row>
  </el-form>
  <div class="btns">
    <el-button :icon="Refresh" @click="handleReset(formRef)">重置</el-button>
    <el-button type="primary" :icon="Search" @click="handleSearch"
      >查询</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useSystemStore } from '@/store/main/system'
import { Search, Refresh } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
const formRef = ref<FormInstance>()
const searchForm = reactive({
  name: '',
  cellphone: undefined,
  createAt: '',
  enable: undefined,
  realname: '',
  offset: 0,
  size: 10
})
const enableData = reactive([
  { name: '启用', value: 1 },
  { name: '禁用', value: 2 }
])
const systemStore = useSystemStore()

const handleSearch = () => {
  systemStore.getUsersList(searchForm)
}
// 重置
const handleReset = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  console.log('重置')

  formRef.resetFields()
}
</script>
<style scoped lang="less">
.el-form-item {
  padding: 20px 40px;
  margin-bottom: 0;
  :deep(.block) {
    .el-date-editor {
      width: 100%;
      box-sizing: border-box;
    }
  }
}
.btns {
  text-align: right;
  padding: 0 50px 20px 0;
  .el-button {
    min-height: 36px;
    padding: 10px 20px;
  }
}
</style>
