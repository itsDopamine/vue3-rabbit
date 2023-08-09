// 管理用户相关数据
import { loginAPI } from "@/apis/user"
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 1. 定义管理用户数据的state
  const userInfo = ref({})

  // 2.1 定义获取接口数据的action函数
  const getUserInfo = async ({ account, password }) => {
    const { result } = await loginAPI({ account, password })
    userInfo.value = result
  }

  // 2.2 定义删除用户数据的action函数
  const delUserInfo = () => {
    userInfo.value = {}
  }

  // 3. 以对象的格式把state和action return
  return {
    userInfo,
    getUserInfo,
    delUserInfo
  }
}, { persist: true, })

