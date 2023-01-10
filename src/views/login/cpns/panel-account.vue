<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      style="max-width: 460px"
      ref="ruleFormRef"
      :rules="rules"
      :model="ruleForm"
      status-icon
    >
      <el-form-item label="帐号" prop="account">
        <el-input v-model="ruleForm.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
// import { useLoginStore } from '@/store/login'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { login } from '@/service/login'
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  account: '',
  password: ''
})
const rules = {
  account: [
    { required: true, message: '帐号不能为空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z]\w{2,15}$/,
      message: '字母、数字、下划线组成，字母开头，3-16位',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{3,16}$/,
      message: '由数字、字母组成，长度在3-16个字符之间',
      trigger: 'blur'
    }
  ]
}

const loginAction = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      const { account, password } = ruleForm
      console.log(account, password)
      login(account, password).then((res) => {
        console.log(res)
      })
    } else {
      ElMessage.error('帐号或密码错误')
    }
  })
}
defineExpose({ loginAction })
</script>
<style scoped lang="less"></style>
