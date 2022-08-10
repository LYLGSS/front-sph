// home 模块的小仓库(store)
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'
const state = {
  // home 仓库中存储的三级菜单的数据
  categroyList: [],
  // 轮播图的数据
  bannerList: [],
  // floor 组件的数据
  floorList: []
}
const actions = {
  async categroyList(context) {
    const res = await reqCategoryList()
    if (res.code === 200) {
      // 这里由于多了两组数据，导致页面变形，因此删除
      context.commit('CATEGROYLIST', res.data.slice(0, -2))
    }
  },
  // 获取首页轮播图的数据
  async getBannerList(context) {
    const res = await reqGetBannerList()
    if (res.code === 200) {
      context.commit('GETBANNERLIST', res.data)
    }
  },
  // 获取 floor 组件的数据
  async getFloorList(context) {
    const res = await reqGetFloorList()
    if (res.code === 200) {
      context.commit('GETFLOORLIST', res.data)
    }
  }
}
const mutations = {
  CATEGROYLIST(state, categoryList) {
    state.categroyList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
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
