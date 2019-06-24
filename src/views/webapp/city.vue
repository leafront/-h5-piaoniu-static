<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder"></AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">   
      <div class="city_list" id="letter-#">
        <div class="city_title">
          <p>当前定位地址</p>
        </div>  
        <div class="city_list--item" @click="setAreaInfo">
          <p class="c3 font">{{areaInfo}}</p>
        </div>    
      </div>  
      <div class="city_list" v-for="item in provinceList" :id="'letter-'+item.key">
        <div class="city_title">
          <p>{{item.key}}</p>
        </div>  
        <div class="city_list--item c3 font" v-for="child in item.list" @click="getCityList(child)">
          <p>{{child.areaName}}</p>
        </div>    
      </div>
    </div>  
    <div class="city_letter" v-if="childEleId"><span>{{childEleId}}</span></div>
    <CityArea 
      :list="cityList" 
      :isCityArea="isCityArea" 
      :curLocation="curLocation"
      @showCityArea="showCityArea" 
      @setCurLocation="setCurLocation">
    </CityArea>
    <LetterNav 
      :list="letterNav" 
      :childEleId="childEleId" 
      @changeLetterId="changeLetterId">
    </LetterNav>
  </div>  
</template>

<script type="text/javascript">
  
  import AppHeader from '@/components/common/header.vue'
  import LetterNav from '@/components/common/letterNav.vue'
  import CityArea from '@/components/city/area.vue'
  import request from '@/widget/request'
  import utils from '@/widget/utils'
  import * as Model from '@/model/city'
  import store from '@/widget/store'
  import common from '@/widget/common'

  export default {
    data () {
      return {
        isBorder: true,
        pageView: false,
        title: '定位',
        provinceList: [],
        cityList: [],
        areaInfo: "",
        letterNav: [],
        showTop: 0,
        childEleId: '',
        isCityArea: false,
        curLocation: {
          province: {},
          city: {},
          region: {}
        }
      }
    },
    components: {
      AppHeader,
      LetterNav,
      CityArea
    },
    methods: {
      setCurLocation (val) {
        this.curLocation = val
      },
      showCityArea (val) {
        this.isCityArea = val
      },
      /**
       * 
       * @param  {Number} provinceId 
       */
      getCityList ({areaCode,areaName}) {
        if (!areaCode) {
          return
        }
        const curLocation = this.curLocation
        curLocation.province = {
          code: areaCode,
          name: areaName
        }
        request(`/api/location/list/${areaCode}`, {
          type: 'GET'
        }).then((result) => {
          const data = result.data
          if (result.code == 0 && data) {
            this.cityList = data
            this.showCityArea(true)
          }
        })
      },
      /**
       * 改变字母导航
       * @param  {String} val 
       */
      changeLetterId (val) {
        this.childEleId = val
      },
      getProvincelist () {
        Model.getProvincelist({
          type: 'GET',
          cache: true,
          expires: 7 * 24 * 60 * 60 * 1000,
          data: {
            areaLevel: 1
          }
        }).then((result) => {
          const data = result.data
          this.$hideLoading()
          this.pageView = true
          if (result.code == 0 && data) {
            this.provinceList = data
            this.setLetterNav(data)
          } else {
            this.$toast(result.message)
          }
        })
      },
      setLetterNav (data) {
        let letterNav = ['#']
        data.forEach((item) => {
          letterNav.push(item.key)
        })
        this.letterNav = letterNav
      },
      /**
       * 获取用户定位信息
       */
      getCurrentAreaInfo () {
        const areaInfo = store.get('curLocation', 'local')
        if (areaInfo) {
          this.areaInfo = areaInfo.province.name + ' ' + areaInfo.city.name + ' ' + areaInfo.region.name
        } else {
          common.getAreaInfo().then((result) => {
            const {
              provinceName,
              provinceCode,
              cityName,
              cityCode,
              regionName,
              regionCode
            } = result
            const setAreaInfo = {
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
            this.areaInfo = provinceName + ' ' + cityName + ' ' + regionName
            store.set('curLocation', setAreaInfo, 'local')
          })
        }
      },
      setAreaInfo () {
        const areaInfo = store.get('curLocation', 'local')
        store.set('areaInfo', areaInfo, 'local')
        this.$router.back()
      }
    },
    created () {
      this.$showLoading()
      this.getProvincelist()
      this.getCurrentAreaInfo()
    }
  }
</script> 

<style lang="scss">
  .city_letter{
    background:rgba(0,0,0,.6);
    width: 1.4rem;
    height: 1rem;
    border-radius: .1rem;
    position: fixed;
    left: 50%;
    top: 50%;
    color: #fff;
    font-size: .6rem;
    transform: translate(-50%,-50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .city_list_wrapper{
    padding-top: .88rem;
  }
  .city_title{
    padding-left: .3rem;
    height: .72rem;
    display: flex;
    align-items: center;
    background: #f5f5f5;
  }
  .city_list{
    background: #fff;
    &--item{
      margin: 0 .3rem;
      height: .88rem;
      display: flex;
      align-items: center;
      border-bottom: .01rem solid #ddd;
      &:last-child{
        border-bottom: 0;
      }
    }
  }
</style>


