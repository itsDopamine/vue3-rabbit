// axios 基础封装
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { ElMessage } from 'element-plus'
import router from "@/router";

// 1. 创建axios实例
const httpInst = axios.create({
  // 基地址
  baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
  // 响应超时
  timeout: 5000
})

// 2. 拦截器

// 2.1 请求拦截器
httpInst.interceptors.request.use(config => {
  const { userInfo } = useUserStore()
  // 携带token
  if (userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 2.2 响应拦截器
httpInst.interceptors.response.use(response => {
  return response.data
}, error => {
  const { delUserInfo } = useUserStore()
  if (error.response) {
    // 提示
    ElMessage({
      message: error.response.data.message,
      type: 'error',
    })
    // 验证token(有效性)
    if (error.response.status === 401) {
      delUserInfo()
      router.replace({ path: '/login' })
      // console.log(error.response.status);
    }
  }

  return Promise.reject(error)
})

// 导出实例
export default httpInst
