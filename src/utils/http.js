// axios 基础封装

import axios from "axios";

// 1. 创建axios实例
const httpInst = axios.create({
  // 基地址
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  // 响应超时
  timeout: 5000
})

// 2. 拦截器

// 2.1 请求拦截器
httpInst.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 2.2 响应拦截器
httpInst.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

// 导出实例
export default httpInst
