// 封装 轮播图业务 相关代码

import { getBannerAPI } from '@/apis/home';
import { onMounted, ref } from 'vue';

export function useBanner () {
  const bannerList = ref([])

  const getBannerList = async () => {
    const { result } = await getBannerAPI({ distributionSite: '2' })
    // console.log(result);
    bannerList.value = result
  }

  onMounted(() => getBannerList())

  return bannerList
}