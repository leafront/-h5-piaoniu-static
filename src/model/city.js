import request from '@/widget/request'

export const getProvincelist = (data) => request('/api/location/areaGroupList',data)

export const getRegionList = (code, data) => request(`/api/location/list/${code}`, data)