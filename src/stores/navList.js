/* 请求 navList 数据 */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useNavListStore = defineStore('navList', () => {

  /* 0.定义数据 */
  const navList = ref([])

  /* 1.封装API接口到函数：方便请求接口前后的其他处理业务 */
  const getNavList = async () => {
    const data = await getCategoryAPI()
    navList.value = data.result
  }

  return {
    navList,
    getNavList
  }

})