// 路由的配置模块

/*
路由懒加载：
  component: () => import('@/pages/Search')
  1. import(modulePath): 动态import引入模块, 被引入的模块会被单独打包
  2. 组件配置的是一个函数, 函数中通过import动态加载模块并返回,
      初始时函数不会执行, 第一次访问对应的路由才会执行, 也就是说只有一次请求对应的路由路径才会请求加载单独打包的js
  作用: 用于提高首屏的加载速度

  例：
    // 将
    // import UserDetails from './views/UserDetails'
    // 替换成
    const UserDetails = () => import('./views/UserDetails')

    const router = createRouter({
      // ...
      routes: [{ path: '/users/:id', component: UserDetails }],
    })
*/

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/center',
    redirect: '/center/myorder',
    component: () => import('@/views/Center'),
    meta: { showDetail: true },
    children: [
      { path: 'myorder', component: () => import('@/views/Center/myOrder') },
      { path: 'grouporder', component: () => import('@/views/Center/groupOrder') }
    ]
  },
  {
    path: '/paysuccess',
    component: () => import('@/views/PaySuccess'),
    meta: { showDetail: true }
  },
  {
    path: '/pay',
    component: () => import('@/views/Pay'),
    meta: { showDetail: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade' || from.path === '/') {
        // 从提交订单页来才放行
        next()
      } else {
        // 从其他组件来，停留在原地
        next(false)
      }
    }
  },
  {
    path: '/trade',
    component: () => import('@/views/Trade'),
    meta: { showDetail: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopcart' || from.path === '/') {
        // 从购物车来才放行
        next()
      } else {
        // 从其他组件来，停留在原地
        next(false)
      }
    }
  },
  {
    path: '/shopcart',
    component: () => import('@/views/ShopCart'),
    meta: { showDetail: true }
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/views/AddCartSuccess'),
    meta: { showDetail: true }
  },
  {
    path: '/detail/:goodId',
    component: () => import('@/views/Detail'),
    meta: { showDetail: true }
  },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    meta: { showFooter: true }
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: () => import('@/views/Search'),
    meta: { showFooter: true }
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
    meta: { showFooter: false }
  },
  {
    path: '/register',
    component: () => import('@/views/Register'),
    meta: { showFooter: false }
  }
]
