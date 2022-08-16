<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in skuImageList" :key="slide.id">
        <img :src="slide.imgUrl" :class="{ active: currentIndex === index }" @click="changeCurrentIndex(index)" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'ImageList',
  props: ['skuImageList'],
  data() {
    return {
      currentIndex: 0
    }
  },
  watch: {
    // 监听数据：可以保证数据已经回来，但是不能保证 v-for 遍历渲染 DOM 结构是否完成，还要加上 $nextTick
    skuImageList() {
      this.$nextTick(() => {
        const mySwiper = new Swiper('.swiper-container', {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          // 设置显示的图片个数
          slidesPerView: 3,
          // 每一次切换图片的个数
          slidesPerGroup: 1
        })
      })
    }
  },
  methods: {
    changeCurrentIndex(index) {
      this.currentIndex = index
      // 向兄弟组件 Zoom 传递当前点击的图片的索引值
      this.$bus.$emit('getIndex', this.currentIndex)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;
      cursor: pointer;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
