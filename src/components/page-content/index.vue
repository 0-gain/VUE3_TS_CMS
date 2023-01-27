<template>
  <div class="page-content">
    <el-container class="content-table">
      <el-header>
        <div class="title">{{ config.header.title }}</div>
        <div class="handler" v-if="isCanCreate">
          <el-button type="primary" @click="handleCreateData">{{
            config.header.btnText
          }}</el-button>
        </div>
      </el-header>
      <el-table
        border
        :data="pageListData.list"
        style="width: 100%"
        v-bind="config.childrenProps"
      >
        <template v-for="item in config.tableItems" :key="item.prop">
          <template v-if="item.type === 'time'">
            <el-table-column
              align="center"
              :label="item.label"
              :width="item.width"
              :prop="item.prop"
            >
              <template #default="scope">
                {{ formatUTCToLocalTime(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'handle'">
            <el-table-column
              align="center"
              :label="item.label"
              :width="item.width"
            >
              <template #default="scope">
                <el-button
                  v-if="isCanUpdate"
                  :icon="EditPen"
                  type="primary"
                  link
                  @click="handleEditorUser(scope.row)"
                  >编辑</el-button
                >
                <el-popconfirm
                  title="真的要删除当前用户吗?"
                  @confirm="handleConfirm(scope.row.id)"
                  v-if="isCanDelete"
                >
                  <template #reference>
                    <el-button :icon="Delete" type="danger" link
                      >删除</el-button
                    >
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" :props="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
      <el-footer>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageListData.totalCount"
        />
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { formatUTCToLocalTime } from '@/utils/format'
import { useSystemStore } from '@/store/main/system'
import { storeToRefs } from 'pinia'
import { EditPen, Delete } from '@element-plus/icons-vue'
import { localCache } from '@/utils/cache'
interface IContent {
  config: {
    name: string
    header: {
      title: string
      btnText: string
    }
    tableItems: any[]
    childrenProps?: any
  }
}
const props = defineProps<IContent>()
const emit = defineEmits(['on-create', 'on-editor'])

const permission = localCache.getCache('permission')
console.log(permission)
// const isCanQuery = permission.find(
//   (item: any) => item === `system:${props.config.name}:query`
// )
const isCanUpdate = permission.find(
  (item: any) => item === `system:${props.config.name}:update`
)
const isCanDelete = permission.find(
  (item: any) => item === `system:${props.config.name}:delete`
)
const isCanCreate = permission.find(
  (item: any) => item === `system:${props.config.name}:create`
)

const systemStore = useSystemStore()
// 分页数据
const currentPage = ref(1)
const pageSize = ref(10)
const fetchListData = (searchForm: any = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  systemStore.getPageListData(props.config.name, {
    offset,
    size,
    ...searchForm
  })
}
fetchListData()
const { pageListData } = storeToRefs(systemStore)

watch(currentPage, () => {
  fetchListData()
})
watch(pageSize, () => {
  fetchListData()
})

// 编辑用户
const handleEditorUser = (data: any) => {
  emit('on-editor', data)
}

// 创建新数据
const handleCreateData = () => {
  emit('on-create')
}
// 删除数据
const handleConfirm = (id: number) => {
  systemStore.getPageDeleteData(props.config.name, id).then(() => {
    fetchListData()
  })
}
defineExpose({
  fetchListData
})
</script>
<style scoped lang="less">
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
    :deep(.el-table .el-table__cell) {
      padding: 12px 0;
      .cell {
        white-space: nowrap;
      }
    }
  }
}
.el-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
