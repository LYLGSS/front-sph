<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a href="javascript:;">{{ userName }}</a>
            <a href="javascript:;" class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="javascript:;" @click="myorder">我的订单</a>
          <a href="javascript:;" @click="myShopcart">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" @keyup.enter="toSearch" @keyup.esc="keyword = ''" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MyHeader',
  data() {
    return {
      keyword: ''
    }
  },
  created() {
    // 通过全局事件总线清除关键字
    this.$bus.$on('clearKeyword', () => {
      this.keyword = ''
    })
  },
  methods: {
    toSearch() {
      const location = { name: 'search', params: { keyword: this.keyword || undefined } }
      // 若有 query 参数，则进行合并
      if (this.$route.query) {
        location.query = this.$route.query
      }
      this.$router.push(location)
    },
    // 退出登录
    logout() {
      try {
        // 退出成功，跳转到首页（可以游客进行操作）
        this.$store.dispatch('user/userLogout')
        this.$router.push('/home')
      } catch (error) {
        alert(error.message)
      }
    },
    // 跳转到购物车
    myShopcart() {
      this.$router.push('/shopcart')
    },
    // 跳转到我的订单界面
    myorder() {
      this.$router.push('/center')
    }
  },
  computed: {
    userName() {
      return this.$store.state.user.userInfo.name
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }
}
</style>
