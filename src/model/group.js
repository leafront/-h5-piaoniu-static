
import request from '@/widget/request'

export const getGoodsList = (data) => request('/page/module/getModuleRefList',data)

export const getModuleList = (data) => request('/cms/page/getModuleListById',data)

