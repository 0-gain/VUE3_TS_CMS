<template>
  <div class="goods">
    <page-search :config="searchConfig" />
    <page-content :config="contentConfig">
      <template #img="{ props }">
        <div style="display: flex; align-items: center">
          <el-image
            style="width: 50px; height: 50px"
            :src="props.row.imgUrl"
            :zoom-rate="1"
            hide-on-click-modal
            preview-teleported
            :preview-src-list="[props.row.imgUrl]"
            fit="fill"
          />
        </div>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts" setup>
import pageSearch from '@/components/page-search/index.vue'
import pageContent from '@/components/page-content/index.vue'
import { searchConfig } from './config/search.config'
import { contentConfig } from './config/content.config'
</script>
<style scoped lang="less">
.goods {
  background-color: #fff;
  border-radius: 10px;
}
</style>
