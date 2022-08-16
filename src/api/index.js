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
