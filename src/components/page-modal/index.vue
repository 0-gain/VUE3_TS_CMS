<template>
  <el-dialog
    width="30%"
    v-model="dialogVisible"
    :title="(isEditor ? '编辑' : '新建') + config.title"
  >
    <el-form label-width="100px" size="large" ref="formRef" :model="createData">
      <template v-for="item in config.formItems" :key="item.prop">
        <el-form-item
          :label="item.label"
          :prop="item.prop"
          v-if="!(isEditor && item.type === 'password')"
        >
          <el-select
            v-if="item.type === 'select'"
            v-model="createData[item.prop]"
            class="m-2"
            :placeholder="item.placeHolder"
            style="width: 100%"
          >
            <el-option
              v-for="option in item.options"
              :key="option.id"
              :label="option.name"
              :value="option.id"
            />
          </el-select>
          <el-input
            v-if="item.type === 'input'"
            v-model="createData[item.prop]"
            type="text"
            :placeholder="item.label"
            :show-password="item.type === 'password'"
          />
          <el-input
            v-if="item.type === 'password'"
            v-model="createData[item.prop]"
            :type="item.type"
            :placeholder="item.label"
            show-password
          />
          <template v-if="item.type === 'custom'">
            <slot :name="item.slotName"></slot>
          </template>
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hidden">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useSystemStore } from '@/store/main/system'
interface IModel {
  config: {
    name: string
    title: string
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IModel>()
const emit = defineEmits(['on-confirm'])
const systemStore = useSystemStore()
const dialogVisible = ref(false)
const createData: any = reactive({})
const isEditor = ref(false)
const rowId = ref(0)
const show = (data?: any, flag: boolean = false) => {
  if (flag) {
    // 代表编辑状态
    for (const item of props.config.formItems) {
      createData[item.prop] = data[item.prop]
    }
    rowId.value = data.id
    delete createData.password
  } else {
    for (const key in createData) {
      createData[key] = ''
    }
  }

  dialogVisible.value = true
  isEditor.value = flag
}
const hidden = () => {
  dialogVisible.value = false
}

const handleConfirm = () => {
  let data = { ...createData }
  if (props.otherInfo) {
    data = { ...createData, ...props.otherInfo }
  }
  if (isEditor.value) {
    systemStore
      .getPageUpdateData(props.config.name, data, rowId.value)
      .then(() => {
        emit('on-confirm')
      })
  } else {
    systemStore.getPageCreateData(props.config.name, data).then(() => {
      emit('on-confirm')
    })
  }

  hidden()
}
defineExpose({ show })
</script>
<style scoped lang="less"></style>
