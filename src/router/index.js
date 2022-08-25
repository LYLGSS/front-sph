import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由的配置模块
import routes from '@/router/routes.js'
// 引入 store
import store from '@/store/index.js'

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

const router = new VueRouter({
  routes,
  // 路由跳转后滚动条的滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})
// 全局前置守卫
router.beforeEach(async(to, from, next) => {
  // 用户登录了，才会有 token，未登录一定不会有
  // 获取仓库中的token-----可以确定用户是登录了
  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  // 用户已经登陆
  if (token) {
    // 用户已经登陆，禁止前往 login 界面【停留在 home 首页】
    if (to.path === '/login') {
      next('/home')
    } else {
      // 登陆了，去的不是 login【去的是 home|search|detail|shopcart】
      // 如果用户名已有
      if (name) {
        next()
      } else {
        // 没有用户信息，派发 action 让仓库存储用户信息再跳转【为了让页面左上角显示登录的用户名】
        try {
          // 获取用户信息成功，放行
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          // 由于 token 失效，获取不到用户信息，需要重新登录
          // 清除失效的 token
          await store.dispatch('user/userLogout')
          // 回到登录页
          next('/login')
        }
      }
    }
  } else {
    // 未登录，不能去交易相关界面、不能去支付相关界面【pay|paysuccess】、不能去个人中心查看我的订单
    // 将未登录不能去的路由合并为一个数组
    const toPathArr = ['/trade', '/pay', '/paysuccess', '/center/myorder', '/center/grouporder']
    if (toPathArr.includes(to.path)) {
      // 把未登录的时候想去而没有去成的路由信息，存储到地址栏中【路由】
      next(`/login?redirect=${to.path}`)
    } else {
      next()
    }
  }
})

export default router
