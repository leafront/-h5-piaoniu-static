import request from '@/widget/request'

export const getHotSearchList = (data) => request('/api/dolphin/list', data)

export const getSearchHistoryList = (data) => request('/api/search/searchHistoryList', data)

export const getLookGoodsList = (data) => request('/api/my/foot/list', data)

export const clearSearchHistoryList = (data) => request('/api/search/cleanSearchHistory', data)

export const addBuyListCart = (data) => request('/api/cart/addItem', data)

export const getCartNum = (data) => request('/api/cart/count', data)

export const getSearchList = (data) => request('/api/search/searchList', data)

export const getPriceStockList = (data) => request('/api/realTime/getPriceStockList', data)

export const getSearchAuto = (data) => request('/api/search/auto', data)
