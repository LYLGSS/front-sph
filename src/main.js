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
// 全部引入接口 api 文件夹里面全部请求函数
import * as API from '@/api/index.js'
import { Button, MessageBox } from 'element-ui'
Vue.use(Button)

Vue.config.productionTip = false
// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// Element-UI 注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

new Vue({
  router,
  store,
  beforeCreate() {
    // 全局事件总线 $bus 配置
    Vue.prototype.$bus = this
    // 挂载全部请求函数到原型上【方便在组件中直接调用函数发起请求】
    Vue.prototype.$API = API
  },
  render: h => h(App)
}).$mount('#app')
