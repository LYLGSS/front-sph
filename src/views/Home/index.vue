<template>
  <div>
    <!-- 全局的三级菜单 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- Floor这个组件：自己在组件内部是没有发请求的，数据是父组件给的 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
    <Brand />
  </div>
</template>

<script>
import ListContainer from './ListContainer/index.vue'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Brand from './Brand/index.vue'
import Floor from './Floor/index.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Brand,
    Floor
  },
  created() {
    this.$store.dispatch('home/getFloorList')
  },
  computed: {
    ...mapState('home', ['floorList'])
  }
}
</script>
