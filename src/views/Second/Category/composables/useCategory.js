// 封装 分类数据业务 相关代码
import { getCategoryDataAPI } from '@/apis/category';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

export function useCategory () {
  const routeData = useRoute()
  const categoryData = ref({})

  // 初次进入页面使用本路由参数 routeData.params.id
  // 路由切换时，则使用传入的路由参数 routeData.params.id
  const getCategoryData = async (id = routeData.params.id) => {
    const { result } = await getCategoryDataAPI(id)
    categoryData.value = result
  }
  onMounted(() => getCategoryData())

  /* 3. 使用路由导航守卫更新路由切换时的页面数据 */
  onBeforeRouteUpdate((to) => {
    // 路由参数发生变化，将变化的参数传入接口重新请求数据
    getCategoryData(to.params.id)
  })

  return categoryData
}