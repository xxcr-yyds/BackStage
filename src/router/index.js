import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import User from '../views/User.vue'
import Main from '../views/Main.vue'
// import Mall from '../views/Mall.vue'
// import PageOne from '../views/PageOne.vue'
// import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

// 1. 创建路由组件
// 2. 将路由与组件进行映射
// 3. 创建 router 实例，然后传 `routes` 配置


const router = new VueRouter({
  routes: [
    // 主路由
    {
      path: '/',
      component: Main,
      name: 'Main',
      // 重定向
      redirect: '/home',
      children: [
        // 子路由
        /* { path: 'home', name: 'home', component: Home }, // 首页
        { path: 'user', name: 'user', component: User }, // 用户管理
        { path: 'mall', name: 'mall', component: Mall }, // 商品管理
        { path: 'page1', name: 'page1', component: PageOne }, // 页面1
        { path: 'page2', name: 'page2', component: PageTwo }, // 页面2 */
      ]
    },
    { path: '/login', name: 'login', component: Login }

  ]
})

export default router