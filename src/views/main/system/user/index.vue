<template>
  <div class="user">
    <div class="page-search">
      <page-search />
    </div>
    <div class="page-content">
      <el-container class="content-table">
        <el-header>
          <div class="title">用户列表</div>
          <div class="handler">
            <el-button type="primary" @click="handleCreateUser"
              >新建数据</el-button
            >
          </div>
        </el-header>
        <page-table @on-editor-user="handleEditorUser"></page-table>
        <el-footer>
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :disabled="isDisable"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-footer>
      </el-container>
    </div>
  </div>

  <el-dialog
    :title="isEditor ? '编辑用户' : '新建用户'"
    width="30%"
    v-model="dialogVisible"
  >
    <el-form
      label-width="100px"
      size="large"
      ref="formRef"
      :model="newUserData"
      :rules="rules"
    >
      <el-form-item label="用户名" prop="name">
        <el-input
          v-model="newUserData.name"
          type="text"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input
          v-model="newUserData.realname"
          type="text"
          placeholder="请输入真实姓名"
        />
      </el-form-item>
      <el-form-item
        label="密码"
        :prop="isEditor ? '' : 'password'"
        v-show="!isEditor"
      >
        <el-input
          v-model="newUserData.password"
          type="password"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>
      <el-form-item label="电话号码" prop="cellphone">
        <el-input
          v-model="newUserData.cellphone"
          type="text"
          placeholder="请输入电话号码"
        />
      </el-form-item>
      <el-form-item label="选择角色" prop="roleId">
        <el-select
          v-model="newUserData.roleId"
          class="m-2"
          placeholder="请选择角色"
          size="large"
        >
          <el-option
            v-for="(item, index) in roleList"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择部门" prop="departmentId">
        <el-select
          v-model="newUserData.departmentId"
          class="m-2"
          placeholder="请选择部门"
          size="large"
        >
          <el-option
            v-for="(item, index) in departmentList"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hidden">取消</el-button>
        <el-button
          type="primary"
          @click="confirmDialog(formRef)"
          :loading="isLoading"
        >
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import pageTable from './cpns/page-table.vue'
import pageSearch from './cpns/page-search.vue'
import { useSystemStore } from '@/store/main/system'
import { ElMessage } from 'element-plus'
import type { INewUserData } from './types'
import type { FormInstance, FormRules } from 'element-plus'

// 分页器数据
const currentPage = ref(1)
const pageSize = ref(10)
const isDisable = ref(false)
const total = computed(() => systemStore.usersListData.totalCount)
const offset = computed(() => (currentPage.value - 1) * pageSize.value)
const handleSizeChange = () => {
  systemStore.getUsersList({ offset: offset.value, size: pageSize.value })
}
const handleCurrentChange = () => {
  systemStore.getUsersList({ offset: offset.value, size: pageSize.value })
}
// dialog
const dialogVisible = ref(false)
const show = () => {
  dialogVisible.value = true
}
const hidden = () => {
  dialogVisible.value = false
  // 重置内容
  resetForm(formRef.value)
}
const toggle = () => {
  if (dialogVisible.value) {
    hidden()
  } else {
    show()
  }
}

const formRef = ref<FormInstance>()
const isLoading = ref(false)
const isEditor = ref(false)
// 新用户数据
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  realname: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  cellphone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '手机号格式不正确',
      trigger: 'blur'
    }
  ],
  departmentId: [{ required: true, message: '请选择部门', trigger: 'blur' }],
  roleId: [{ required: true, message: '请选择角色', trigger: 'blur' }]
})
const newUserData: INewUserData = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: undefined,
  departmentId: undefined,
  roleId: undefined
})
// 创建新用户
const handleCreateUser = () => {
  isEditor.value = false
  toggle()
}
// 重置数据
const resetForm = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  formRef.resetFields()
  newUserData.name = ''
  newUserData.realname = ''
  newUserData.password = ''
  newUserData.cellphone = undefined
  newUserData.departmentId = undefined
  newUserData.roleId = undefined
}
const systemStore = useSystemStore()
// 部门列表
systemStore.getDepartmentList({ offset: 0, size: 100 })
const departmentList = computed(() => systemStore.departmentListData.list)
// 角色列表
systemStore.getRoleList({ offset: 0, size: 100 })
const roleList = computed(() => systemStore.roleListData.list)

const confirmDialog = async (formRef: FormInstance | undefined) => {
  if (!formRef) return
  isLoading.value = true
  await formRef.validate((valid, fields) => {
    if (valid) {
      if (!isEditor.value) {
        // 创建新用户
        systemStore
          .getCreateUser(newUserData)
          .then(() => {
            ElMessage.success('创建新用户成功~')
            hidden()
            // 重新获取用户列表
            systemStore.getUsersList({ offset: 0, size: 10 })
            isLoading.value = false
          })
          .catch((error) => {
            ElMessage.error('创建新用户失败')
            console.log(error)
            isLoading.value = false
          })
      } else {
        systemStore
          .getUpdateUser(newUserData, userId.value)
          .then(() => {
            ElMessage.success('编辑用户成功~')
            hidden()
            // 重新获取用户列表
            systemStore.getUsersList({ offset: 0, size: 10 })
            isLoading.value = false
          })
          .catch((error) => {
            ElMessage.error('编辑用户失败~')
            hidden()
            console.log(error)
            isLoading.value = false
          })
      }
    } else {
      console.log(fields)
      isLoading.value = false
    }
  })
}

// 编辑用户
const userId = ref(0)
const handleEditorUser = (id: number) => {
  userId.value = id
  isEditor.value = true
  // 删除password校验规则
  delete newUserData.password
  systemStore.getSearchOneUser(id).then(() => {
    const currentUserInfo = systemStore.currentUserInfo
    newUserData.name = currentUserInfo.name
    newUserData.realname = currentUserInfo.realname
    newUserData.cellphone = currentUserInfo.cellphone
    newUserData.roleId = currentUserInfo.role.id
    newUserData.departmentId = currentUserInfo.department.id
    toggle()
  })
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
