import { ref } from 'vue'
import type pageContent from '@/components/page-content/index.vue'

const usePageContent = () => {
  const contentRef = ref<InstanceType<typeof pageContent>>()
  // 获取列表数据
  const handleListData = (searchForm?: any) => {
    contentRef?.value?.fetchListData(searchForm)
  }
  // 重置
  const handleResetForm = () => {
    contentRef?.value?.fetchListData()
  }
  return {
    contentRef,
    handleListData,
    handleResetForm
  }
}
export default usePageContent
