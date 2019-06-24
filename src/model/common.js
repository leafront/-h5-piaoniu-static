import request from '@/widget/request'

export const getAreaInfo = (data) => request('/api/commondata/getConfig',data)

export const getAreaCode = (data) => request('/api/location/getCompleteAreaInfo',data)