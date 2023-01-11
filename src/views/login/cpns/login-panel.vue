<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <!-- 登录页面 -->
    <el-tabs type="border-card" stretch>
      <el-tab-pane label="帐号登陆">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span class="text">帐号登陆</span>
          </span>
        </template>
        <panel-account ref="accountRef"></panel-account>
      </el-tab-pane>
      <el-tab-pane label="手机登录">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span class="text">手机登录</span>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="operation">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" @click="handleLoginAction">立即登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PanelAccount from './panel-account.vue'

// 是否记住密码
const isRemPwd = ref<boolean>(false)

const accountRef = ref<InstanceType<typeof PanelAccount>>()
// 点击登录
const handleLoginAction = () => {
  accountRef.value?.loginAction(isRemPwd.value)
}
</script>
<style scoped lang="less">
.login-panel {
  width: 330px;
  text-align: center;
  .el-tabs--border-card {
    width: 330px;
  }
  .operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :deep(.el-checkbox) {
      .el-checkbox__label {
        color: var(--el-color-primary);
      }
    }
  }
  .el-button {
    width: 100%;
  }
  .custom-tabs-label {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 5px;
    }
  }
}
</style>
