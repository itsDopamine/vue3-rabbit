// 引入初始化样式文件
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { testCategoryAPI } from '@/apis/testAPI'

const app = createApp(App)


// 测试接口函数
testCategoryAPI().then(res => {
  console.log(res);
})

app.use(createPinia())
app.use(router)

app.mount('#app')
