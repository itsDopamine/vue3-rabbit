// createRouter：创建roter实例对象
// createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Register from '@/views/Login/register.vue'
import Home from '@/views/Second/Home/index.vue'
import Category from '@/views/Second/Category/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component的对应关系
  routes: [
    /* 配置方式1 */
    // { path: '/', redirect: '/layout' },
    // { path: '/login', component: Login },
    // { path: '/register', component: Register },
    // {
    //   path: '/layout',
    //   component: Layout,
    //   children: [
    //     { path: '', redirect: '/home' }, // path路径为空,会作为默认页一部分最开始渲染
    //     { path: '/home', component: Home },
    //     { path: '/category', component: Category },
    //   ]
    // },

    /* 配置方式2 */
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', component: Home }, // path路径为空,会作为默认页一部分最开始渲染
        { path: 'category', component: Category },
      ]
    },
    { path: '/login', component: Login },
    { path: '/register', component: Register },

  ]
})

export default router
