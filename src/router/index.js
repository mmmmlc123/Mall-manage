import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/common/login/Login.vue'

const Home = () => import('@/view/home/Home.vue')

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
      path: '/home',
      name: 'home',
      component: Home
    },
  ]
})
