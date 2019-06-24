<template>
  <div class="search_list_filter" v-show="!showSearch && !showkeyword">
    <div class="search_filter_item" @click="togglePopup(1,1)">
      <span class="font c3" :class="{'active': checkedIndex == 1}">{{filterName}}</span>
      <i class="icon_arrow"></i>
    </div> 
    <div class="search_filter_item" @click="checkedSale('volume4sale_desc')">
      <span class="font c3" :class="{'active': checkedIndex == 2}">销量优先</span>
    </div>
    <div class="search_filter_item" @click="togglePopup(3,3)">
      <span class="font c3" :class="{'active': checkedIndex == 3}">筛选</span>
      <i class="icon_filter"></i>
    </div>
    <div class="search_filter_toggle" @click="showRowsWay">
      <i :class="{'active': showRows == 2}"></i>
    </div> 
  </div>
</template> 

<script type="text/javascript">

  export default {
    props: {
      showkeyword: {
        type: Boolean,
        default: false
      },
      showSearch: {
        type: Boolean,
        default: false
      },
      filterName: {
        type: String,
        default: '综合'
      },
      checkedIndex: {
        type: Number,
        default: 1
      },
      showRows: {
        type: Number,
        default: 1
      }
    },
    methods: {
      togglePopup (val1, val2) {
        this.$emit('togglePopup', val1, val2)
      },
      checkedSale (val) {
        this.$emit('checkedSale', val)
      },
      showRowsWay () {
        this.$emit('showRowsWay')
      }
    }
  }
</script> 

<style lang="scss">
.search_filter_toggle{
  display: flex;
  align-items: center;
  padding-left:.3rem;
  padding-right: .5rem;
  border-left: .02rem solid #ddd;
  i{
    width: .34rem;
    height: .34rem;
    background: url(../../images/search_list_sprite.png) -.03rem .01rem no-repeat;
    background-size: 1.5rem auto;
    &.active{
      background-position: -.8rem -.02rem;
    }
  }
}
.search_list_filter{
  width: 100%;
  height: .88rem;
  padding: .14rem 0;
  display: flex;
  background: #fff;
  border-top: .01rem solid #ddd;
  position: fixed;
  left: 0;
  top: .88rem;
  z-index: 120;
}
.search_filter_item{
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  span{
    &.active{
      color: #ff6900;
    }
  }
  .icon_arrow{
    width: .25rem;
    height: .16rem;
    background: url('/static/images/arrow_down.png') no-repeat;
    background-size: .25rem auto;
    margin-left: .1rem;
  }
  .icon_filter{
    width: .34rem;
    height: .34rem;
    background: url('../../images/search_list_sprite.png') no-repeat -.45rem -.02rem;
    background-size: 1.5rem auto;
    margin-left: .1rem;
  }
}
</style>

