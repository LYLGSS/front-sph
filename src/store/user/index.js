import { reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from '@/api'
import { getToken, removeToken, setToken } from '@/utils/token'

// 登录与注册的小仓库
const state = {
  code: '',
  token: getToken(),
  userInfo: {}
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
  },
  // 登录业务
  async userLogin(context, data) {
    const res = await reqUserLogin(data)
    // 服务器下发 token ，用户唯一标识符（uuid）
    // 将来经常通过带 token 找服务器要用户的信息进行展示
    if (res.code === 200) {
      context.commit('USERLOGIN', res.data.token)
      // 持久化存储 token
      setToken(res.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('falie'))
    }
  },
  // 获取用户信息
  async getUserInfo(context) {
    const res = await reqUserInfo()
    if (res.code === 200) {
      context.commit('GETUSERINFO', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('falie'))
    }
  },
  // 退出登录
  async userLogout(context) {
    const res = await reqLogout()
    if (res.code === 200) {
      context.commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除本地数据
  CLEAR(state) {
    // 清空仓库中用户的信息
    state.token = ''
    state.userInfo = {}
    // 本地存储的数据清空
    removeToken()
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
