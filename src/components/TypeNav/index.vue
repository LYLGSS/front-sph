<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click.prevent="goSearch">
              <div class="item" v-for="(c1, index) in categroyList" :key="c1.categoryId" @mouseenter="changeIndex(index)" :class="{ cur: currentIndex === index }">
                <h3>
                  <a href="#" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!-- 二级、三级分类 -->
                <div class="item-list clearfix" :style="{ display: currentIndex === index ? 'block' : 'none' }">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a href="#" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a href="#" :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入 lodash 中的节流函数
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      show: true
    }
  },
  beforeMount() {
    // 组件挂载之前，如果不是 Home 组件，就将 TypeNav 隐藏
    // 注意：若此时将生命周期函数写成 mounted，则会出现点击一级菜单中的 a 标签时，跳转到 Search 组件后，一级菜单出现频闪
    // 原因是：在 TypeNav 组件挂载完成后再将一级菜单进行隐藏，由于对一级菜单设置了出场动画，鼠标在一级菜单上频繁移入与移出，导致一级菜单在隐藏与显示中频繁切换，所以会出现频闪现象
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState('home', ['categroyList'])
  },
  methods: {
    changeIndex: throttle(function (index) {
      /*
        index:鼠标移上某一个一级分类的元素的索引值
        正常情况（用户慢慢的移动鼠标）：鼠标移入，每一个一级分类 h3，都会触发鼠标进入的事件
        非正常情况（用户移动鼠标很快）：本身全部的一级分类都应该触发鼠标进入的事件，但是经过测试，只有部分 h3 触发了
        就是由于用户行为过快，导致浏览器反应不过来。如果当前回调函数中有一些大量的业务，有可能出现卡顿现象
        因此使用 lodash 中的 throttle函数 进行节流（节流类似于王者荣耀中英雄的技能cd，防抖类似于回城）
      */
      this.currentIndex = index
    }, 50),

    // 当鼠标移入的时候，让商品分类列表进行隐藏
    enterShow() {
      if (this.$route.path !== '/home') {
        this.show = true
      }
    },

    // 在 Search 组件中当鼠标离开 “全部商品分类” 的时候，让商品分类列表进行隐藏
    leaveIndex() {
      this.currentIndex = -1
      // 判断如果是 Search 路由组件的时候才会执行
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },

    goSearch(event) {
      const { categoryname, category1id, category2id, category3id } = event.target.dataset
      if (categoryname) {
        // 整理路由跳转的参数
        const location = { name: 'search' }
        const query = { categoryName: categoryname }
        // 一级分类，二级分类，三级分类的 a 标签
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // 整合参数
        const goal = { ...location, query }
        // 若有 params 参数，则进行合并
        if (this.$route.params) {
          goal.params = this.$route.params
        }
        // 路由跳转并传递参数
        this.$router.push(goal)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: rgb(217, 217, 217);
        }
      }
    }

    // 进入的起点、离开的终点
    // .sort-enter,.sort-leave-to{
    //   height: 0px;
    // }
    // // 进入的终点、离开的起点
    // .sort-enter-to,.sort-leave{
    //   height: 461px;
    // }
    // 启用动画
    .sort-enter-active {
      animation: showList 0.3s linear;
      // transition: height 0.3s linear;
      overflow: hidden;
    }
    // 动画
    @keyframes showList {
      from {
        height: 0px;
      }
      to {
        height: 416px;
      }
    }
  }
}
</style>
