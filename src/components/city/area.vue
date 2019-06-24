<template>
  <div>
    <div class="ui-mask area-mask" @click="showCityArea(false)" :class="{'active': isCityArea}"></div>  
    <div class="city_area" @touchmove="touchmoveCity($event)" :class="{'active': isCityArea}">
      <div class="city_area_title">
        <div class="city_area_close" @click="showCityArea(false)">
          <i class="ff6900 ">×</i>
        </div>
        <p class="font-b c6">选择定位城市</p>
      </div>
      <div class="city_area_list" :style="{'maxHeight': scrollHeight}">
        <div class="city_area_item" :key="item.id" v-for="(item,index) in list">
          <div class="city_area_txt" @click="getRegionList(index,item)">
            <p class="font c3">{{item.name}}</p>
            <i class="city_area_arrow" :class="{'active': isShowRegion == index}"></i>
          </div>
          <div class="city_origin_list" :class="{'active': isShowRegion == index}">
            <div class="city_origin_item" :key="child.id" v-for="child in regionList" @click="setRegion(child)">
              <p class="font c3">{{child.name}}</p>
            </div>  
          </div>    
        </div>
      </div>  
    </div>
  </div>  
</template> 


<script type="text/javascript">

 import * as Model from '@/model/city'
 import store from '@/widget/store'
 import utils from '@/widget/utils'

 export default {
  data () {
    return {
      regionList: [],
      isShowRegion: false,
      regionId: 0,
      scrollHeight: '1200px',
      isShowRegion: -1
    }
  },
  props: {
    list: {
      type: Array,
      default: []
    },
    isCityArea: {
      type: Boolean,
      default: false
    },
    curLocation: {
      type: Object,
      default: {
        provice: {},
        city: {},
        region: {}
      }
    }
  },
  methods: {
    touchmoveCity (event) {
      event.stoppropagation()
    },
    showCityArea (val) {
      this.$emit('showCityArea', val)
      this.regionId = 0
      this.isShowRegion = -1
    },
    setRegion ({ code, name }) {
      const from = utils.query('from')
      const curLocation = Object.assign({}, this.curLocation)
      curLocation.region = { code, name }
      this.$emit('setCurLocation', curLocation)
      store.set('areaInfo', curLocation, 'local')
      this.showCityArea(false)
      if (from) {
        this.$router.push(from)
      } else {
        this.$router.push('/webapp/category')
      }
    },
    getRegionList (index,{code,name}) {
      if (this.isShowRegion == index) {
        this.isShowRegion = -1
      } else {
        this.isShowRegion = index
      }
      if (code == this.regionId) {
        return
      }
      this.regionId = code
      const curLocation = Object.assign({},this.curLocation)
      curLocation.city = {code,name}
      this.$emit('setCurLocation', curLocation)
      Model.getRegionList(code, {
        type: 'GET'
      }).then((result) => {
        const data = result.data
        if (result.code == 0 && data) {
          this.regionList = data
        }
      })
    }
  },
  created () {
    const headerHeight = Math.ceil(parseFloat(document.documentElement.style.fontSize) * .88)
    const scrollHeight = window.innerHeight - headerHeight
    this.scrollHeight = scrollHeight + 'px'
  }
 }
</script> 

<style lang="scss">
  .area-mask{
    z-index: 1000;
  }
  .city_area_txt{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: .3rem;
    .city_area_arrow{
      right: .3rem;
      width: .25rem;
      height: .16rem;
      background: url('/static/images/arrow_down.png') no-repeat;
      background-size: .25rem auto;
      &.active{
        transform: rotate(180deg);
      }
    }
  }
  .city_area_list{
    padding-left: .3rem;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    background: #fff;
  }
  .city_area_item,.city_origin_item{
    line-height: .88rem;
    border-bottom: .01rem solid #ddd;
    &:last-child{
      border-bottom: 0;
    }
  }
  .city_origin_list{
    padding-left: .3rem;
    display: none;
    &.active{
      display: block;
    }
  }
  .city_area{
    position: fixed;
    width: 85%;
    top: 0;
    right: 0;
    height: 100%;
    background: #f5f5f5;
    transform: translateX(100%);
    transition: all .5s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    z-index: 1100;
    &.active{
      transform: translateX(0);
    }
  }
  .city_area_title{
    height: .88rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-bottom: .01rem solid #ddd;
    .city_area_close{
      height: 100%;
      display: flex;
      align-items: center;
      font-size: .52rem;
      position: absolute;
      left: 0;
      top: -.05rem;
      padding: 0 .3rem;
    }
  }
</style>
