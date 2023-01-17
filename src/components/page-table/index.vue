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
      <template #default="scope">
        <el-button
          :icon="EditPen"
          type="primary"
          link
          @click="editorUserAction(scope.row.id)"
          >编辑</el-button
        >
        <el-popconfirm
          title="真的要删除当前用户吗?"
          @confirm="onConfirm(scope.row.id)"
          @cancel="onCancel"
        >
          <template #reference>
            <el-button :icon="Delete" type="primary" link>删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useSystemStore } from '@/store/main/system'
import { formatUTCToLocalTime } from '@/utils/format'
import { EditPen, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
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
const emit = defineEmits(['on-editor-user'])
const systemStore = useSystemStore()
systemStore.getUsersList({ offset: 0, size: 10 })
const tableData = computed<User[]>(() => systemStore.usersListData.list)

// 编辑用户
const editorUserAction = (id: number) => {
  emit('on-editor-user', id)
}

// 删除用户
const onConfirm = (id: number) => {
  console.log(id)
  systemStore
    .getDeleteUser(id)
    .then(() => {
      ElMessage.success('删除成功！')
      systemStore.getUsersList({ offset: 0, size: 10 })
    })
    .catch((error) => {
      console.log(error)
      ElMessage.success('删除失败')
    })
}
// 取消删除
const onCancel = () => {
  ElMessage.error('已取消删除')
}
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
