<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入Swiper
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    list: {
      // 必须第一次就监听，因为 list 这个数据从来没有发生变化(数据是父组件给的，给的时候就是一个对象，对象里面该有的数据是有的，所以监听不到)
      immediate: true,
      handler() {
        // 如果执行了 handler 方法，代表 bannerList 属性的值已经有了【数组：四个元素】
        // 当前这个函数执行：只能保证 bannerList 数据已经有了，但是没有办法保证 v-for 已经执行结束了
        // v-for 执行完毕，才有结构【现在仅仅在 watch 中是没法保证的】
        // 因此要使用 $nextTick 等待 v-for 执行完，即 DOM 结构根据新数据更新完毕
        // $nextTick:在下次 DOM 更新，循环结束之后，执行延迟回调。在修改数据之后，立即使用此方法，获取更新后的 DOM

        this.$nextTick(() => {
          const mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
      }
    }
  }
}
</script>

<style scoped></style>
