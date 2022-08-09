import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 全局组件
import TypeNav from '@/components/TypeNav/index.vue'
// Vuex 仓库
import store from '@/store/index'
// 引入 mockServer.js (mock 数据流)
import '@/mock/mockServer.js'

Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
