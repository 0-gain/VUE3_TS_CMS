<template>
  <div class="nav-info">
    <div class="operation">
      <el-icon :size="20"><Bell /></el-icon>
      <el-icon :size="20"><ChatDotRound /></el-icon>
      <el-icon class="card" :size="20"><Postcard /></el-icon>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="30" :src="defaultAvatar" />
          <span class="name">coderwhy</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="loginOutAction">
              <el-icon><CircleClose /></el-icon>
              退出系统
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              个人信息
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import defaultAvatar from '@/assets/img/default-avatar.jpg'
import { localCache } from '@/utils/cache'

const router = useRouter()
// 退出登录
const loginOutAction = () => {
  localCache.deleteCache('token')
  router.push('/login')
}
</script>
<style scoped lang="less">
.nav-info {
  display: flex;
  align-items: center;
  .operation {
    margin-right: 20px;
    .el-icon {
      width: 40px;
      height: 35px;
      line-height: 35px;
      cursor: pointer;
      &:hover {
        background: #f2f2f2;
      }
    }
    .el-icon.card::after {
      position: absolute;
      content: '';
      right: 3px;
      top: 5px;
      width: 5px;
      height: 5px;
      background-color: red;
      border-radius: 50%;
    }
  }

  .info {
    .el-dropdown {
      cursor: pointer;
      .el-dropdown-link {
        display: flex;
        align-items: center;
        .name {
          margin-left: 8px;
        }
      }
    }
    :global(.el-dropdown-menu__item) {
      line-height: 36px !important;
      padding: 6px 22px;
    }
    :global(.el-dropdown-menu__item:hover) {
      color: #333 !important;
      background-color: transparent !important;
    }
  }
}
</style>
