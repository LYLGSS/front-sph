// 对 axios 进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// start:进度条开始  done:进度条结束
// 在当前模块中引入store，来获取游客临时身份 uuid
import store from '@/store'

// 利用 axios 对象的方法 create ，去创建一个 axios 实例
// request 就是 axios，只不过稍微配置一下
const requests = axios.create({
  // 基础路径
  baseURL: '/api',
  // 代表请求超时的时间5s
  timeout: 5000
})

// 请求拦截器，在发请求之前，请求拦截器可以检测到，可以在请求发出去整之前做一些事情
requests.interceptors.request.use((config) => {
  // config 配置对象里面有一个属性很重要：headers 请求头
  if (store.state.detail.uuid_token) {
    // 向请求头中添加一个字段（userTempId）:和后端老师商量好的，不可更改
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 进度条开始
  nprogress.start()
  return config
})

requests.interceptors.response.use((res) => {
  // 进度条结束
  nprogress.done()
  return res.data
}, (err) => {
  if (err) {
    return Promise.reject(new Error('failed'))
  }
})

export default requests
