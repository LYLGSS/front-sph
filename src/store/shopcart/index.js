// 购物车列表的小仓库
import { reqCartList } from '@/api'

const state = {
  cartList: []
}
const actions = {
  // 获取购物车列表的数据
  async getCartList(context) {
    const res = await reqCartList()
    if (res.code === 200) {
      context.commit('GETCARTLIST', res.data)
    }
  }
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  // 开启命名空间
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
