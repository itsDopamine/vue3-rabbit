// 引入初始化样式文件
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useIntersectionObserver } from '@vueuse/core'
// import { testCategoryAPI } from '@/apis/testAPI'

const app = createApp(App)


// 测试接口函数
// testCategoryAPI().then(res => {
//   console.log(res);
// })



app.use(createPinia())
app.use(router)

app.mount('#app')

// 2. 实现自定义全局指令
app.directive('img-lazy', {
  // 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用，等价于Vue2的Inserted
  mounted (el, binding) {
    // el：指令绑定到的元素
    // binding：对象，包含指令值...
    // console.log(el);
    // console.log(binding.value);
    // 3. 使用VueUse监听视口变化
    useIntersectionObserver(
      el, // 监听对象
      ([{ isIntersecting }]) => {
        // isIntersecting：是否进入视口区域
        if (isIntersecting) {
          el.src = binding.value
          console.log(binding.value);
        }
      },
    )
  }
})