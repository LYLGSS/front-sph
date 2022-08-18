import { reqGetCode, reqUserRegister } from '@/api'

// 登录与注册的小仓库
const state = {
  code: ''
}
const actions = {
  // 获取验证码
  async getCode(context, phone) {
    // 获取验证码的这个接口：直接返回验证码【为了省钱】，但是正常情况，后台把验证码发到用户的手机上【这些接口收费】
    const res = await reqGetCode(phone)
    if (res.code === 200) {
      context.commit('GETCODE', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('falie'))
    }
  },
  // 用户注册
  async userRegister(context, user) {
    const res = await reqUserRegister(user)
    if (res.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('falie'))
    }
  }
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
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
