import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/common/login/Login.vue'

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
      
    }
  ]
})
