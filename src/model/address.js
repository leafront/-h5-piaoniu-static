import request from '@/widget/request'

export const getProvinceList = (data) => request('/api/location/list/100000',data)
