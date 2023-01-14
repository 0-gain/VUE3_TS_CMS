<template>
  <el-table class="table" border stripe :data="tableData" style="width: 100%">
    <el-table-column align="center" type="selection" width="55" />
    <el-table-column align="center" label="序号" width="120" type="index" />
    <el-table-column
      align="center"
      property="name"
      label="用户名"
      width="120"
    />
    <el-table-column
      align="center"
      property="realname"
      label="真实姓名"
      width="120"
    />
    <el-table-column
      align="center"
      property="cellphone"
      label="手机号码"
      width="120"
    />
    <el-table-column
      align="center"
      property="enable"
      label="状态"
      width="120"
    />
    <el-table-column align="center" label="操作时间">
      <template #default="scope">
        {{ formatUTCToLocalTime(scope.row.createAt) }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="更新时间">
      <template #default="scope">
        {{ formatUTCToLocalTime(scope.row.updateAt) }}
      </template>
    </el-table-column>

    <el-table-column align="center" label="操作" show-overflow-tooltip>
      <template #default>
        <el-button :icon="EditPen" type="primary" link>编辑</el-button>
        <el-button :icon="Delete" type="primary" link>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useSystemStore } from '@/store/main/system'
import { formatUTCToLocalTime } from '@/utils/format'
import { EditPen, Delete } from '@element-plus/icons-vue'
interface User {
  cellphone: number
  departmentId: number
  enable: number
  id: number
  realname: string
  roleId: number
  createAt: string
  updateAt: string
}
const systemStore = useSystemStore()
systemStore.getUsersList({ offset: 0, size: 10 })
const tableData = computed<User[]>(() => systemStore.usersListData.list)
</script>
<style scoped lang="less">
.table {
  :deep(.el-button.is-link:not(.is-disabled):hover) {
    // color: var(--el-color-primary);
    border-radius: 0;
    border-bottom: 1px solid;
  }
}
</style>
