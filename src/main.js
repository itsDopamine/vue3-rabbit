// 引入初始化样式文件
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { lazyPlugin } from './directives' // 4. 引入懒加载指令插件
import App from './App.vue'
import router from './router'


const app = createApp(App)

// 5. 注册插件
app.use(lazyPlugin)

app.use(createPinia())
app.use(router)

app.mount('#app')

