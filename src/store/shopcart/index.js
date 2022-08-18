// 购物车列表的小仓库
import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'

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
  },
  // 删除购物车某一个产品
  async deleteCartListBySkuId(context, cartSkuId) {
    const res = await reqDeleteCartById(cartSkuId)
    if (res.code === 200) {
      // 返回成功的标记
      return 'ok'
    } else {
      // 返回失败的标记
      return Promise.reject(new Error('falie'))
    }
  },
  // 修改购物车某一个产品的选中状态
  async updateCheckedById(context, { skuId, isChecked }) {
    const res = await reqUpdateCheckedById(skuId, isChecked)
    if (res.code === 200) {
      // 返回成功的标记
      return 'ok'
    } else {
      // 返回失败的标记
      return Promise.reject(new Error('falie'))
    }
  },
  // 删除全部勾选的产品
  // 从 context 中解构出 dispatch 和 getters
  deleteAllCheckedCart({ dispatch, getters }) {
    const promiseAll = []
    getters.cartList.cartInfoList
      .filter(item => item.isChecked === 1)
      .forEach(item => {
        // 将每一次的返回的 Promise 添加到数组中
        const promise = dispatch('deleteCartListBySkuId', item.skuId)
        promiseAll.push(promise)
      })
    // 只要全部的p1、p2...都成功，返回结果即为成功，有一个失败，返回结果为失败
    return Promise.all(promiseAll)
  },
  // 修改全部商品的勾选状态
  updateAllCartChecked({ dispatch, state }, isChecked) {
    const promiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      const promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
      promiseAll.push(promise)
    })
    // 最终返回结果为 promise
    return Promise.all(promiseAll)
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
