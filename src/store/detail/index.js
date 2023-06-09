import { reqAddOrUpdateShopCart, reqGoodsInfo } from '@/api'
// 引入游客身份模块 uuid ---> 生成一个随机字符串（存储在本地localStorage，不可改变）
import { getUUID } from '@/utils/uuid_token.js'

const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}
const actions = {
  // 获取产品信息的 action
  async getGoodInfo(context, goodId) {
    const res = await reqGoodsInfo(goodId)
    if (res.code === 200) {
      context.commit('GETGOODINFO', res.data)
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart(context, { skuId, skuNum }) {
    // 此处服务器只返回了成功还是失败，并没有返回可用的数据，因此不用 commit，也不用存储该请求返回的数据
    // 注意：async 函数执行返回的结果一定是一个 promise【要么成功，要么失败】
    const res = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (res.code === 200) {
      // 返回成功的标记
      return 'ok'
    } else {
      // 返回失败的标记
      return Promise.reject(new Error('falie'))
    }
  }
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const getters = {
  // 简化商品详情中导航路径区域的数据
  categoryView(state) {
    // 当数据还没有回来的时候，返回 undefined 会报错，因此应该至少返回一个空对象
    // 因为 actions 去进行异步操作时 getters 要依赖 actions 请求回来的数据，在数据没有返回之前，getters是undefined，所以要 ||{}
    return state.goodInfo.categoryView || {}
  },
  // 简化商品详情中右侧选择区域的数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  // 简化 Zoom 组件中产品售卖属性的数据
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
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
