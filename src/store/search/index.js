import { reqGetSearchInfo } from '@/api'
// search 模块的小仓库(store)
const state = {
  searchList: {}
}
const actions = {
  // 获取 search 模块数据
  async getSearchList(context, params = {}) {
    const res = await reqGetSearchInfo(params)
    if (res.code === 200) {
      context.commit('GETSEARCHLIST', res.data)
    }
  }
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const getters = {
  goodsList(state) {
    // 如果服务器数据回来了，这里没问题，state.searchList.goodsList 是一个数组
    // 假如网络不好，请求的数据没有返回，searchList 还是一个空对象，state.searchList.goodsList 为 undefined，则没方法进行遍历
    // 因此，这里计算新的属性的值至少返回一个数组
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList
  },
  attrsList(state) {
    return state.searchList.attrsList
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
