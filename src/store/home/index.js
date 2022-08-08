// home 模块的小仓库(store)
import { reqCategoryList } from '@/api'
const state = {
  categroyList: []
}
const actions = {
  async categroyList(context) {
    const res = await reqCategoryList()
    if (res.code === 200) {
      // 这里由于多了两组数据，导致页面变形，因此删除
      context.commit('CATEGROYLIST', res.data.slice(0, -2))
    }
  }
}
const mutations = {
  CATEGROYLIST(state, value) {
    state.categroyList = value
  }
}
const getters = {}

export default {
  // 开启命名空间
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
