import { ref } from 'vue'
import type PageModal from '@/components/page-modal/index.vue'

type callbackType = (item?: any) => void
const usePageModal = (
  createCallback?: callbackType | null,
  editCallback?: callbackType
) => {
  const ModalRef = ref<InstanceType<typeof PageModal>>()
  // 创建新数据
  const handleCreate = () => {
    ModalRef.value?.show()
    if (createCallback) createCallback()
  }
  // 编辑数据
  const handleEditor = (data: any) => {
    ModalRef.value?.show(data, true)
    if (editCallback) editCallback(data)
  }
  return {
    ModalRef,
    handleCreate,
    handleEditor
  }
}
export default usePageModal
