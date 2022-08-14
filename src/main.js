import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 全局组件
import TypeNav from '@/components/TypeNav/index.vue'
// Vuex 仓库
import store from '@/store/index'
// 引入 mockServer.js (mock 数据流)
import '@/mock/mockServer.js'
// 引入 swiper 样式
import 'swiper/css/swiper.css'
// 引入轮播图全局组件
import Carousel from '@/components/Carousel/index.vue'
// 引入分页器全局组件
import Pagination from '@/components/Pagination/index.vue'

Vue.config.productionTip = false
// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

new Vue({
  router,
  store,
  // 全局事件总线 $bus 配置
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
