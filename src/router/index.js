import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/common/login/Login.vue'

const Home = () => import('@/view/home/Home.vue')
const User = () => import('@/view/user/User.vue')
const Right = () => import('@/view/rights/Right.vue')
const Role = () => import('@/view/rights/Role.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'user',
          name: 'user',
          component: User
        },
        {
          path: 'right',
          name: 'right',
          component: Right
        },
        {
          path: 'role',
          name: 'role',
          component: Role
        },
      ]
    },
  ]
})
