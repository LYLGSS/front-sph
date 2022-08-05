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
  }
}
</script>

<style></style>
