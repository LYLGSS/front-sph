import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'
import Register from '@/views/Register/index.vue'
import Search from '@/views/Search/index.vue'

Vue.use(VueRouter)

// 1、先把VueRouter原型对象的push，保存一份
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 2、重写push|replace
// 第一个参数：告诉原来的push，跳转的目标位置和传递了哪些参数
/*
call || apply 的区别
  相同点：都可以调用函数一次，都可以篡改函数的上下文一次
  不同点：call 与 apply 传递参数：call 传递参数用逗号隔开 ，apply 方法传递数组
*/
VueRouter.prototype.push = function(location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = (location, resolve, reject) => {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

const routes = [
  {
    path: '/',
    redirect: '/home'
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
    meta: { showFooter: true },
    props: true
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

const router = new VueRouter({
  routes
})

export default router
