// 引入初始化样式文件
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { lazyPlugin } from './directives' // 4. 引入懒加载指令插件
import App from './App.vue'
import router from './router'
import { componentPlugin } from './components'


const app = createApp(App)

app.use(createPinia())
app.use(router)

// 5. 注册插件
app.use(lazyPlugin)

// 注册全局组件
app.use(componentPlugin)

app.mount('#app')

