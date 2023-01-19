<template>
  <div class="category">
    <page-search
      :config="searchFormConfig"
      @on-search="handleListData"
      @on-reset="handleResetForm"
    />
    <page-content
      :config="contentConfig"
      ref="contentRef"
      @on-create="handleCreate"
      @on-editor="handleEditor"
    />
  </div>
  <page-modal
    :config="modalConfig"
    ref="ModalRef"
    @on-confirm="handleListData"
  />
</template>

<script lang="ts" setup>
import pageSearch from '@/components/page-search/index.vue'
import pageContent from '@/components/page-content/index.vue'
import pageModal from '@/components/page-modal/index.vue'
import { searchFormConfig } from './config/search.config'
import { contentConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContent'

const { ModalRef, handleCreate, handleEditor } = usePageModal()

const { contentRef, handleListData, handleResetForm } = usePageContent()
</script>
<style scoped lang="less">
.category {
  background-color: #fff;
  border-radius: 10px;
}
</style>
