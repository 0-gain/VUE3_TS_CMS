<template>
  <div class="department">
    <page-search
      :config="searchFormConfig"
      @on-reset="handleResetForm"
      @on-search="handleListData"
    ></page-search>
    <page-content
      ref="contentRef"
      :config="contentConfig"
      @on-create="handleCreate"
      @on-editor="handleEditor"
    />
  </div>
  <page-modal
    :config="modalConfigRef"
    ref="ModalRef"
    @on-confirm="handleListData"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import pageSearch from '@/components/page-search/index.vue'
import pageContent from '@/components/page-content/index.vue'
import pageModal from '@/components/page-modal/index.vue'
import { useMainStore } from '@/store/main'
import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContent'
const mainStore = useMainStore()
const modalConfigRef = computed(() => {
  for (const item of modalConfig.formItems) {
    if (item.prop === 'parentId') {
      item.options = mainStore.entireDepartments as any
    }
  }
  return modalConfig
})
mainStore.getEntireData()

const { contentRef, handleListData, handleResetForm } = usePageContent()
const { ModalRef, handleCreate, handleEditor } = usePageModal()
</script>
<style scoped lang="less">
.department {
  background-color: #fff;
  border-radius: 10px;
}
</style>
