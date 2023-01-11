<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <span class="title" v-show="!isFold">VUE3_TS_CMS</span>
    </div>
    <el-menu
      :default-active="currentId"
      class="el-menu-vertical-demo"
      :collapse="isFold"
    >
      <el-sub-menu
        :index="item.id + ''"
        v-for="(item, index) in roleMenu"
        :key="index"
      >
        <template #title>
          <el-icon>
            <component :is="item.icon?.split('-icon-')[1]"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          :index="c.id + ''"
          v-for="(c, i) in item.children"
          :key="i"
          @click="handleRouter(c)"
          >{{ c.name }}</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useLoginStore } from '@/store/login'
defineProps({
  isFold: Boolean
})
const currentId = ref<string>('2')
const store = useLoginStore()

const roleMenu = computed(() => store.roleMenu)
const handleRouter = (target: {}) => {
  currentId.value = target.id + ''
}
</script>
<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: rgb(12, 33, 53);
  .logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 28px;
    padding: 12px 10px 8px 10px;
    color: #fff;
    background-color: #001529;
    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-weight: bold;
    }
  }
  :deep(.el-menu) {
    background-color: #001529;
    border: none;
    .el-sub-menu__title,
    .el-menu-item {
      color: rgb(183, 189, 195);
    }
    .el-sub-menu__title,
    .el-menu-item:hover {
      background-color: transparent;
    }
    .el-menu-item:hover {
      color: #fff;
    }
    .el-menu-item.is-active {
      color: #fff;
      background-color: #0a60bd;
    }
    .el-sub-menu {
      .el-sub-menu__title {
        border: none;
      }
      .el-menu {
        background-color: rgb(12, 33, 53);
      }
    }
  }
}
</style>
