// 当前这个模块对 API 进行统一管理
import $http from './request.js'

export const reqCategoryList = () => $http.get('/product/getBaseCategoryList')
