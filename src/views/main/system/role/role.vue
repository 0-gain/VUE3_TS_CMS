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
    :config="modalConfig"
    :other-info="otherInfo"
    ref="ModalRef"
    @on-confirm="handleListData"
  >
    <template #menulist>
      <el-tree
        ref="treeRef"
        :data="entireMenu"
        show-checkbox
        node-key="id"
        highlight-current
        :props="{
          children: 'children',
          label: 'name'
        }"
        @check="handleMenuCheckChange"
      />
    </template>
  </page-modal>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import pageSearch from '@/components/page-search/index.vue'
import pageContent from '@/components/page-content/index.vue'
import pageModal from '@/components/page-modal/index.vue'
import { useMainStore } from '@/store/main'
import { storeToRefs } from 'pinia'
import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContent'
import { mapMenuToIds } from '@/utils/map-menu'
import type { ElTree } from 'element-plus'

// 菜单展示
const mainStore = useMainStore()
const { entireMenu } = storeToRefs(mainStore)
const otherInfo = ref()
const handleMenuCheckChange = (data1: any, data2: any) => {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
const treeRef = ref<InstanceType<typeof ElTree>>()
const createCallback = () => {
  treeRef.value?.setCheckedKeys([])
}
const editCallback = (data: any) => {
  const { menuList } = data
  nextTick(() => {
    const list = mapMenuToIds(menuList)
    treeRef.value?.setCheckedKeys(list)
  })
}

const { contentRef, handleListData, handleResetForm } = usePageContent()
const { ModalRef, handleCreate, handleEditor } = usePageModal(
  createCallback,
  editCallback
)
</script>
<style scoped lang="less">
.department {
  background-color: #fff;
  border-radius: 10px;
}
</style>
