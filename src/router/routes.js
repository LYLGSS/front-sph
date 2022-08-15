// 路由的配置模块
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'
import Register from '@/views/Register/index.vue'
import Search from '@/views/Search/index.vue'
import Detail from '@/views/Detail/index.vue'

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/detail/:goodId',
    component: Detail,
    meta: { showDetail: true }
  },
  {
    path: '/home',
    component: Home,
    meta: { showFooter: true }
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    meta: { showFooter: true }
  },
  {
    path: '/login',
    component: Login,
    meta: { showFooter: false }
  },
  {
    path: '/register',
    component: Register,
    meta: { showFooter: false }
  }
]
