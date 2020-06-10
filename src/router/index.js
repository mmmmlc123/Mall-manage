import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/common/login/Login.vue'
import { Message } from 'element-ui';

const Home = () => import('@/view/home/Home.vue')
const User = () => import('@/view/user/User.vue')
const Right = () => import('@/view/rights/Right.vue')
const Role = () => import('@/view/rights/Role.vue')
const GoodsList = () => import('@/view/goods/GoodsList.vue')
const GoodsAdd = () => import('@/view/goods/GoodsAdd.vue')

Vue.use(Router)

const router =  new Router({
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
          path: 'users',
          name: 'Users',
          component: User
        },
        {
          path: 'rights',
          name: 'rights',
          component: Right
        },
        {
          path: 'roles',
          name: 'roles',
          component: Role
        },
        {
          path: 'goods',
          name: 'goods',
          component: GoodsList,
        },
        {
          path: 'goods/add',
          name: 'add',
          component: GoodsAdd,
        }
      ]
    },
  ],
  
})

//在路由配置生效之前统一判断token
//路由守卫在导航生效之前
//路由/导航守卫
router.beforeEach((to, from , next) => {
  if(to.path === '/login'){
      next()
  } else {
    //获取token
    const token  = localStorage.getItem('token')
    //有token，继续渲染组件
    //console.log(token)
    if (!token) {
        router.push({name:'login'})
        Message.error('请登录')
        return  //跳过
    } 
    //无token， 登录
    next()
  }
})

export default router