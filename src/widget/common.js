import * as Model from '@/model/common'
import store from '@/widget/store'
import utils from '@/widget/utils'

const common = {
  /**
   * 获取用户地址区域信息
   */
  getAreaInfo () {
    return Model.getAreaInfo({
      type: 'GET'
    }).then((areaInfo) => {

      if (areaInfo.code == 0 && areaInfo.data) {
        return areaInfo.data
      }
    }).then((result) => {

      return Model.getAreaCode({
        type: 'GET',
        data: {
          regionCode: result.defaultAreaCode
        }})
        .then((codeInfo) => {

          if (codeInfo.code == 0 && codeInfo.data) {
            return codeInfo.data
          } else {
            return null
          }
      })
    })
  },
  /**
   *
   * 获取区域信息保存storage
   * @return {Object}
   */
  getAreaCode () {

    const getAreaInfo = store.get('lyf_areaInfo','local')

    let pName = ''
    let aCode = ''

    if (getAreaInfo && getAreaInfo.times > new Date().getTime() && utils.isLocalStorageSupported() ) {
      pName = getAreaInfo.results.province.name
      aCode = getAreaInfo.results.region.code
    } else {
      if (getAreaInfo) {
        store.remove('lyf_areaInfo', 'local')
      }
      this.getAreaInfo().then((result) => {
        const {
          provinceName,
          provinceCode,
          cityName,
          cityCode,
          regionName,
          regionCode
        } = result
        const setAreaInfo = {
          times: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
          results: {
            province: {
              name: provinceName,
              code: provinceCode
            },
            city: {
              name: cityName,
              code: cityCode
            },
            region: {
              name: regionName,
              code: regionCode
            }
          }
        }
        store.set('lyf_areaInfo',setAreaInfo,'local')
        pName = provinceName
        aCode = regionCode
      })
    }

    return {
      provinceName: pName,
      areaCode:aCode
    }
  }
}

export default common
