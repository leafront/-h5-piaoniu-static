import request from '@/widget/request'

export const getCategoryList = (data) => request('/api/category/list',data)

export const getCategoryGoods = (data) => request('/api/dolphin/list', data)