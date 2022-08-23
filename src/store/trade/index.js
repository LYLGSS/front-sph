import { reqAddressInfo, reqOrderInfo } from '@/api'

// 交易界面的信息
const state = {
  addressInfo: [],
  orderInfo: {}
}
const actions = {
  // 获取用户地址信息
  async getUserAddress(context) {
    const res = await reqAddressInfo()
    if (res.code === 200) {
      context.commit('GETUSERADDRESS', res.data)
    }
  },
  // 获取商品清单数据
  async getOrderInfo(context) {
    const res = await reqOrderInfo()
    if (res.code === 200) {
      context.commit('GETORDERINFO', res.data)
    }
  }
}
const mutations = {
  GETUSERADDRESS(state, addressInfo) {
    state.addressInfo = addressInfo
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
