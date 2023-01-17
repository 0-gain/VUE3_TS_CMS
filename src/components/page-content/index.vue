<template>
  <div class="page-content">
    <el-container class="content-table">
      <el-header>
        <div class="title">{{ config.header.title }}</div>
        <div class="handler">
          <el-button type="primary" @click="handleCreateData">{{
            config.header.btnText
          }}</el-button>
        </div>
      </el-header>
      <el-table
        class="table"
        border
        stripe
        :data="pageListData.list"
        style="width: 100%"
      >
        <template v-for="item in config.tableItems" :key="item.prop">
          <el-table-column
            v-if="item.type === 'time'"
            align="center"
            :label="item.label"
            :width="item.width"
          >
            <template #default="scope">
              {{ formatUTCToLocalTime(scope.row[item.prop]) }}
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="item.type === 'handle'"
            align="center"
            :label="item.label"
            show-overflow-tooltip
          >
            <template #default="scope">
              <el-button
                :icon="EditPen"
                type="primary"
                link
                @click="handleEditorUser(scope.row)"
                >编辑</el-button
              >
              <el-popconfirm
                title="真的要删除当前用户吗?"
                @confirm="handleConfirm(scope.row.id)"
              >
                <template #reference>
                  <el-button :icon="Delete" type="primary" link>删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>

          <el-table-column
            v-else
            align="center"
            :type="item.type"
            :width="item.width"
            :label="item.label"
            :prop="item.prop"
          />
        </template>
      </el-table>
      <el-footer>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageListData.totalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { formatUTCToLocalTime } from '@/utils/format'
import { useSystemStore } from '@/store/main/system'
import { storeToRefs } from 'pinia'
import { EditPen, Delete } from '@element-plus/icons-vue'

interface IContent {
  config: {
    name: string
    header: {
      title: string
      btnText: string
    }
    tableItems: any[]
  }
}

const props = defineProps<IContent>()
const emit = defineEmits(['on-create', 'on-editor'])
const systemStore = useSystemStore()
// 分页数据
const currentPage = ref(1)
const pageSize = ref(10)

const fetchListData = (searchForm: any = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  systemStore.getPageListData('users', { offset, size, ...searchForm })
}
fetchListData()
const { pageListData } = storeToRefs(systemStore)

const handleSizeChange = () => {
  fetchListData()
}
const handleCurrentChange = () => {
  fetchListData()
}
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
  }
}
.el-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
