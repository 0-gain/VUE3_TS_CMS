<template>
  <div class="page-search">
    <el-form label-width="100px" size="large" :model="searchData" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in config.formItems" :key="item">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.filed">
              <el-select
                v-model="searchData[item.filed]"
                :placeholder="item.placeHolder"
                v-if="item.type === 'selection'"
                style="width: 100%"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.name"
                  :value="option.value"
                />
              </el-select>
              <div class="block" v-else-if="item.type === 'dataPicker'">
                <el-date-picker
                  v-model="searchData[item.filed]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </div>
              <el-input
                :placeholder="item.placeHolder"
                v-model="searchData[item.filed]"
                v-else
              />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button :icon="Refresh" @click="handleResetForm(formRef)"
        >重置</el-button
      >
      <el-button type="primary" :icon="Search" @click="handleSearch"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
interface ISearch {
  config: {
    formItems: any[]
  }
}
const props = defineProps<ISearch>()
const emit = defineEmits(['on-search', 'on-reset'])

const formRef = ref<FormInstance>()
// 动态生成searchData数据
const obj: any = {}
for (const item of props.config.formItems) {
  obj[item.filed] = ''
}
const searchData: any = reactive({
  ...obj
})

const handleSearch = () => {
  emit('on-search', searchData)
}
// 重置
const handleResetForm = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  formRef.resetFields()
  emit('on-reset')
}
</script>
<style scoped lang="less">
.page-search {
  padding: 20px;
}
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
