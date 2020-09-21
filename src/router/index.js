import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import Login from '../components/Login'
import AdminIndex from '../components/admin/AdminIndex'
import MemberRegister from '../components/mobile/MemberRegister'
import UserProfile from '../components/admin/user/UserProfile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Admin',
      redirect: '/admin',
      component: AdminIndex,
      meta: { requireAuth: true, title: '管理中心' },
    },
    // 下面都是固定的写法
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { title: '管理中心' },
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminIndex,
      meta: { title: '管理中心' },
    },
    {
      path: '/member/register',
      name: 'MemberRegister',
      component: MemberRegister,
      meta: { title: '会员注册' },
    },
  ],
})

// 用于创建默认路由
export const createRouter = (routes) =>
  new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Admin',
        redirect: '/admin',
        component: AdminIndex,
        meta: { requireAuth: true, title: '管理中心' },
      },
      // 下面都是固定的写法
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { title: '管理中心' },
      },
      {
        path: '/admin',
        name: 'Admin',
        component: AdminIndex,
        meta: { title: '管理中心' },
      },
      {
        path: '/member/register',
        name: 'MemberRegister',
        component: MemberRegister,
        meta: { title: '会员注册' },
      },
    ],
  })
