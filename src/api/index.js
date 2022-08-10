// 当前这个模块对 API 进行统一管理
import $http from './request.js'
import mockRequest from './mockRequest.js'

export const reqCategoryList = () => $http.get('/product/getBaseCategoryList')

export const reqGetBannerList = () => mockRequest.get('/banner')

export const reqGetFloorList = () => mockRequest.get('/floor')
