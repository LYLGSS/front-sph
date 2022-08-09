<template>
  <div class="outer">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'

export default {
  name: 'MyApp',
  components: {
    Header,
    Footer
  },
  created() {
    // 通知 Vuex 发 ajax 请求，获取数据，存储在仓库中
    this.$store.dispatch('home/categroyList')
  }
}
</script>

<style></style>
