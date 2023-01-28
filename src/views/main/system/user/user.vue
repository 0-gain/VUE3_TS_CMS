<template>
  <div class="user">
    <page-search
      :config="searchFormConfig"
      @on-search="handleListData"
      @on-reset="handleResetForm"
    />
    <page-content
      ref="pageContentRef"
      :config="contentConfig"
      @on-create="handleCreate"
      @on-editor="handleEditor"
    />
  </div>
  <page-modal
    :config="modalConfigRef"
    ref="pageModalRef"
    @on-confirm="handleListData"
  />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import pageSearch from '@/components/page-search/index.vue'
import pageContent from '@/components/page-content/index.vue'
import pageModal from '@/components/page-modal/index.vue'
import { searchFormConfig } from './config/search.config'
import { contentConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { useMainStore } from '@/store/main'

const mainStore = useMainStore()
const modalConfigRef = computed(() => {
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'departmentId') {
      item.options = mainStore.entireDepartments as any
    }
    if (item.prop === 'roleId') {
      item.options = mainStore.entireRoles as any
    }
  })
  return modalConfig
})
mainStore.getEntireData()
const pageContentRef = ref<InstanceType<typeof pageContent>>()
const pageModalRef = ref<InstanceType<typeof pageModal>>()

// 请求搜索
const handleListData = (searchForm?: any) => {
  pageContentRef?.value?.fetchListData(searchForm)
}
// 重置
const handleResetForm = () => {
  pageContentRef?.value?.fetchListData()
}

// 创建新数据
const handleCreate = () => {
  pageModalRef?.value?.show()
}
// 编辑数据
const handleEditor = (data: any) => {
  pageModalRef?.value?.show(data, true)
}
</script>
<style scoped lang="less">
.user {
  background-color: #fff;
  border-radius: 10px;
}
.page-search {
  padding: 20px;
}
.page-content {
  border-top: 20px solid #f5f5f5;
  padding: 20px;
  .content-table {
    .el-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;
      .title {
        font-size: 20px;
        font-weight: 700;
      }
      .handler {
        .el-button {
          min-height: 36px;
          padding: 10px 20px;
        }
      }
    }
  }
}
.el-overlay {
  .el-form {
    padding: 20px 20px 0;
  }
}
.el-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
