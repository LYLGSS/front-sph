<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked === 1" @change="updateChecked(cart.skuId, $event.target.checked)" />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('sub', -1, cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('change', $event.target.value * 1, cart)" />
            <a href="javascript:void(0)" class="plus" @click="handler('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:void(0)" class="sindelet" @click="deleteCartById(cart.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length > 0" @change="updateAllCartChecked($event.target.checked)" :disabled="cartInfoList.length === 0" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:void(0)" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ selectedNum }}</span> 件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 引入 lodash 中的节流函数
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  created() {
    this.getData()
  },
  methods: {
    getData() {
      // 获取个人购物车列表
      this.$store.dispatch('shopcart/getCartList')
    },
    // 修改某一个产品的个数【节流】
    handler: throttle(async function (type, disNum, cart) {
      // type:为了区分用户点击的是-按钮还是+按钮，或者是修改输入框中商品的数量
      // disNum:代表要向服务器带的参数  +变化量为（1）  -变化量为（-1）  input输入框：用户输入最终的个数（并不是变化量）
      // cart:哪一个产品【为了获取该产品的id】
      switch (type) {
        // 点击加号
        case 'add':
          disNum = 1
          break
        // 点击减号
        case 'sub':
          // 判断产品的个数大于 1，才可以传递给服务器 -1
          // 如果出现产品的个数小于的等于1，传递给服务器0（代表商品个数不变）
          disNum = cart.skuNum > 1 ? -1 : 0
          break
        // 修改 input 输入框中的数据
        case 'change':
          // 用户输入非法的内容（除数字外的其他字符或负数），需要带给服务器的参数为 0
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            // 用户输入小数，带给服务器变化的量为： 用户输入的个数 - 产品起始的个数
            disNum = parseInt(disNum) - cart.skuNum
          }
          // 上边 if-else 简写形式（可读性低，不推荐）
          // disNum = isNaN(disNum) || disNum < 1 ? 0 : parseInt(disNum) - cart.skuNum
          break
      }
      // 派发 action
      try {
        // 修改成功
        await this.$store.dispatch('detail/addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        // 再一次获取服务器最新的数据进行展示
        this.getData()
      } catch (error) {
        alert('修改商品数量失败！')
      }
    }, 500),
    // 删除某一个产品
    async deleteCartById(cartSkuId) {
      try {
        // 如果删除成功再次发起请求获取新的数据进行展示
        await this.$store.dispatch('shopcart/deleteCartListBySkuId', cartSkuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改某一个产品的勾选状态
    async updateChecked(cartSkuId, checked) {
      // 带给服务器的参数 isChecked 不是布尔值，应该是0|1
      try {
        // 如果修改数据成功，再次获取服务器数据（购物车）
        const isChecked = checked ? 1 : 0
        await this.$store.dispatch('shopcart/updateCheckedById', { skuId: cartSkuId, isChecked })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除全部已勾选的产品（这个回调没办法收集到一些有用的数据）
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch('shopcart/deleteAllCheckedCart')
        // 再次发请求获取购物车列表
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改全部产品的选中状态
    async updateAllCartChecked(checked) {
      try {
        const isChecked = checked ? 1 : 0
        await this.$store.dispatch('shopcart/updateAllCartChecked', isChecked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters('shopcart', ['cartList']),
    // 购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 购买商品总价格
    totalPrice() {
      return this.cartInfoList
        .filter(item => item.isChecked === 1)
        .reduce((sum, current) => {
          return (sum += current.skuPrice * current.skuNum)
        }, 0)
    },
    // 判断底部复选框是否勾选【全部产品都选中，才勾选】
    isAllChecked() {
      // arr.every:遍历数组里的元素，只要全部元素 isChecked 属性都为1 ===> true
      // 只要一个不为1 ===> false
      return this.cartInfoList.every(item => item.isChecked === 1)
    },
    // 已选择商品个数
    selectedNum() {
      return this.cartInfoList.filter(item => item.isChecked).length
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
