<template>
  <div>
    <div class="ui-mask search-mask" id="search-mask" @click="togglePopup(-1)" :class="{'active': isPopup == 3}"></div> 
    <div class="search_price" id="search-price" :class="{'active': isPopup == 3}">
      <div class="search_price_title">
        <p class="font">价格区间</p>  
      </div>
      <div class="search_section">
        <input type="tel" v-model.trim="minPrice" placeholder="最低区间" maxlength="8">
        <i></i>
        <input type="tel" v-model.trim="maxPrice" placeholder="最高区间" maxlength="8">
      </div>
      <div class="search_pirce_submit">
        <span class="c6" @click="resetRangePrice">重置</span>
        <strong class="cfff" @click="confirm(-1)">确定</strong>
      </div>    
    </div>
  </div>    
</template> 

<script type="text/javascript">

  import validate from '@/widget/validate'
  import utils from '@/widget/utils'

  export default {
    props: {
      isPopup: {
        type: Number,
        default: -1
      },
      minPrice: {
        type: Number,
        default: ''
      },
      maxPrice: {
        type: Number,
        default: ''
      }
    },
    watch: {
      isPopup (newVal, oldVal) {
        if (newVal) {
          document.getElementById('search-mask').addEventListener('touchmove',(event) => {
            if (!utils.isPassive()) {
              event.preventDefault()
            }
            event.stopPropagation()
          }, utils.isPassive() ? {passive: true} : false)
          document.getElementById('search-price').addEventListener('touchmove',(event) => {
            if (!utils.isPassive()) {
              event.preventDefault()
            }
            event.stopPropagation()
          }, utils.isPassive() ? {passive: true} : false)
        }
      }
    },
    methods: {
      togglePopup (val) {
        this.$emit('togglePopup', val, 3)
      },
      resetRangePrice () {
        this.minPrice = ''
        this.maxPrice = ''
        this.$emit('togglePopup', -1, 1)
        this.$emit('selectRangePrice', '', '')
        this.$emit('getSearchList')
      },
      confirm (val) {
        const {
          minPrice,
          maxPrice
        } = this
        if (minPrice == '') {
          this.$toast('请输入最低区间')
          return
        }
        if (!validate.checkNumber(minPrice)) {
          this.$toast('请输入正确的最低区间')
          return
        }
        if (maxPrice == '') {
          this.$toast('请输入最高区间')
          return
        }
        if (!validate.checkNumber(maxPrice)) {
          this.$toast('请输入正确的最低区间')
          return
        }
        this.$emit('togglePopup', val, 3)
        this.$emit('selectRangePrice', minPrice, maxPrice)
      }
    }
  }

</script> 

<style lang="scss">
 .search-mask{
   z-index: 1200;
 }
 .search_pirce_submit{
   position: fixed;
   right: 0;
   bottom: 0;
   width: 90%;
   display: flex;
   font-size: .36rem;
   border-top: .01rem solid #e0e0e0;
   span,strong{
    height: .9rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
   }
   strong{
    background: linear-gradient(to bottom,#ff7c20,#ff7900);
   }
 }
 .search_price{
    position: fixed;
    width: 90%;
    height: 100%;
    right: 0;
    top: 0;
    z-index: 1300;
    background: #fff;
    display: none;
    &.active{
      display: block;
    }
  }
  .search_price_title{
    height: .88rem;
    display: flex;
    align-items: center;
    padding-left: .3rem;
  }
  .search_section{
    padding-top: .1rem;
    padding-left: .3rem;
    display: flex;
    align-items: center;
    input {
      text-align: center;
      width: 1.6rem;
      height: .7rem;
      background: #eee;
      font-size: .28rem;
    }
    i{
      width: .2rem;
      height: .02rem;
      background: #ddd;
      margin: 0 .2rem;
    }
  }
</style>
