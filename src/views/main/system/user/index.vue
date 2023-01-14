<template>
  <div class="user">
    <div class="page-search">
      <el-form label-width="100px" size="large">
        <el-row :gutter="20">
          <el-col :span="8"
            ><el-form-item label="用户名">
              <el-input placeholder="请输入用户名" /> </el-form-item
          ></el-col>
          <el-col :span="8"
            ><el-form-item label="真实姓名">
              <el-input placeholder="请输入真实姓名" /> </el-form-item
          ></el-col>
          <el-col :span="8"
            ><el-form-item label="手机号码">
              <el-input placeholder="请输入手机号码" /> </el-form-item
          ></el-col>
          <el-col :span="8"
            ><el-form-item label="状态">
              <el-input placeholder="请选择状态" /> </el-form-item
          ></el-col>
          <el-col :span="8"
            ><el-form-item label="创建时间">
              <div class="block">
                <el-date-picker
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                /></div></el-form-item
          ></el-col>
        </el-row>
      </el-form>
      <div class="btns">
        <el-button :icon="Refresh">重置</el-button>
        <el-button type="primary" :icon="Search">查询</el-button>
      </div>
    </div>
    <div class="page-content">
      <el-container class="content-table">
        <el-header>
          <div class="title">用户列表</div>
          <div class="handler">
            <el-button type="primary" @click="toggle">新建数据</el-button>
          </div>
        </el-header>
        <page-table></page-table>
        <el-footer>Footer</el-footer>
      </el-container>
    </div>
  </div>

  <el-dialog title="新建用户" width="30%" v-model="dialogVisible">
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
      <el-form-item label="密码" prop="password">
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
import { useSystemStore } from '@/store/main/system'
import { Search, Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { INewUserData } from './types'
import type { FormInstance } from 'element-plus'

// dialog
const dialogVisible = ref(false)
const show = () => {
  dialogVisible.value = true
}
const hidden = () => {
  dialogVisible.value = false
}
const toggle = () => {
  if (dialogVisible.value) {
    hidden()
  } else {
    show()
  }
  // 重置内容
  newUserData = {
    name: '',
    realname: '',
    password: '',
    cellphone: undefined,
    departmentId: undefined,
    roleId: undefined
  }
}

const formRef = ref<FormInstance>()
const isLoading = ref(false)
// 新用户数据
const rules = {
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  realname: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
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
}
let newUserData: INewUserData = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: undefined,
  departmentId: undefined,
  roleId: undefined
})

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
  await formRef.validate((valid) => {
    if (valid) {
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
      isLoading.value = false
    }
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
  .el-form-item {
    padding: 20px 40px;
    margin-bottom: 0;
    :deep(.block) {
      .el-date-editor {
        width: 100%;
        box-sizing: border-box;
      }
    }
  }
  .btns {
    text-align: right;
    padding: 0 50px 20px 0;
    .el-button {
      min-height: 36px;
      padding: 10px 20px;
    }
  }
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
</style>
