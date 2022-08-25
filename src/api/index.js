// 当前这个模块对 API 进行统一管理
import $http from './request.js'
import mockRequest from './mockRequest.js'

export const reqCategoryList = () => $http.get('/product/getBaseCategoryList')

export const reqGetBannerList = () => mockRequest.get('/banner')

export const reqGetFloorList = () => mockRequest.get('/floor')

// 获取搜索模块的数据 地址：/api/list   请求方式：post   参数：需要带参数
/*
参数格式：
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象，否则请求失败】
export const reqGetSearchInfo = (params) => $http({ url: '/list', method: 'post', data: params })

// 获取产品详情信息的接口 URL: /api/item/{skuId}  请求方式：get
export const reqGoodsInfo = (skuId) => $http({ url: `/item/${skuId}`, method: 'get' })

// 将产品添加到购物车中（或者更新某一个产品的个数）
// 请求地址：/api/cart/addToCart/{ skuId }/{ skuNum }     请求方式：post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => $http({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表数据
// URL：/api/cart/cartList      请求方式：get
export const reqCartList = () => $http({ url: '/cart/cartList', method: 'get' })

// 删除购物车产品的接口
// URL:/api/cart/deleteCart/{skuId}   method:delete
export const reqDeleteCartById = (skuId) => $http({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 修改购物车中商品的选中状态
// URL:/api/cart/checkCart/{skuID}/{isChecked}    method：get
export const reqUpdateCheckedById = (skuId, isChecked) => $http({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 获取验证码
// URL：/api/user/passport/sendCode/{phone}   method:get
export const reqGetCode = (phone) => $http({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// 注册
// URL:/api/user/passport/register   method:post   参数：phone  code  password
export const reqUserRegister = (data) => $http({ url: '/user/passport/register', data, method: 'post' })

// 登录
// URL:/api/user/passport/login     method:post     参数：phone,password
export const reqUserLogin = (data) => $http({ url: '/user/passport/login', data, method: 'post' })

// 获取用户信息【需要带着用户的 token 向服务器要用户的信息】
// URL:http://182.92.128.115/api/user/passport/auth/getUserInfo    method:get
// 这里接口前的数字代表 token，由于已经在请求拦截器中将 token 添加到请求头中，所以这里不用再写
export const reqUserInfo = () => $http({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录
// URL:/api/user/passport/logout    method:get
export const reqLogout = () => $http({ url: '/user/passport/logout', method: 'get' })

// 获取用户地址信息
// URL:/api/user/userAddress/auth/findUserAddressList     method:get
// export const reqAddressInfo = () => $http({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
// -----
// mock 用户地址信息【这个接口只给老师的账号返回数据，老师的账号用的人太多，数据一直在变化，因此 mock 数据】
export const reqAddressInfo = () => mockRequest.get('/userAdress')

// 获取商品清单
// URL:/api/order/auth/trade       method:get
export const reqOrderInfo = () => $http({ url: '/order/auth/trade', method: 'get' })

// 提交订单的接口
// URL:/api/order/auth/submitOrder?tradeNo={tradeNo}   method:post
export const reqSubmitOrder = (tradeNo, data) => $http({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

// 获取支付信息
// URL:/api/payment/weixin/createNative/{orderId}     method:get
export const reqPayInfo = (orderId) => $http({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

// 获取支付订单状态
// URL:/api/payment/weixin/queryPayStatus/{orderId}     method:get
export const reqPayStatus = (orderId) => $http({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// 获取我的订单列表
// URL:/api/order/auth/{page}/{limit}   method:get
export const reqMyOrderList = (page, limit) => $http({ url: `/order/auth/${page}/${limit}`, method: 'get' })
