<template>
  <div class="footer_wrapper" id="footer_wrapper">
    <div class="footer">
      <div class="footer-item" :class="{'active': index == 0}" @click="pageAction('/index.html')">
        <i class="icon1"></i>
        <span>首页</span>
      </div>
      <div class="footer-item" :class="{'active': index == 1}" @click="pageAction('/webapp/category')">
        <i class="icon2"></i>
        <span>分类</span>
      </div>
      <div class="footer-item" :class="{'active': index == 2}" @click="pageAction('/view/h5/30.html')">
        <i class="icon3"></i>
        <span>全球尖货</span>
      </div>
      <div class="footer-item" :class="{'active': index == 3}" @click="pageAction('/cart.html')">
        <i class="icon4"></i>
        <span>购物车</span>
        <strong v-if="cartCount > 0">{{cartCount}}</strong>
      </div>
      <div class="footer-item" @click="pageAction('/my/index')" :class="{'active': index == 4}">
        <i class="icon5"></i>
        <span>我</span>
      </div>
    </div>
    <div class="safe-area-inset"></div>
    <div class="safe-area-inset"></div>
  </div>
</template>

<script type="text/javascript">

  import utils from '@/widget/utils'
  import request from '@/widget/request'

  export default {
    data () {
      return {
        cartCount: 0,
        index: -1
      }
    },
    methods: {
      pageAction (url) {
        if (url == location.pathname) {
          return
        }
        location.href = url
      },
      setFooterActive () {
        const routerList = ['/index.html','/webapp/category','/view/h5/30.html','/cart.html','/my/index']
        const index = routerList.indexOf(location.pathname)
        if (index > -1) {
          this.index = index
        }
      }
    },
    created () {
      const sessionId = utils.getSessionId()
      const params = {
        sessionId
      }    
      this.setFooterActive()
      request('/api/cart/count', {
        type: 'GET',
        data: params
      }).then((result) => {
        const data = result.data
        if (result.code == 0) {
          this.cartCount = data
        }
      })
    }
  }

</script>

<style lang="scss">
 .footer{
   height: 1rem;
   border-top: .01rem solid #ddd;
   display: flex;
 }
 .footer_wrapper{
   width: 100%;
   background: #fff;
   position: fixed;
   left:0;
   bottom:0;
 }
  .footer-item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    &.active {
      .icon5 {
        background-position: -2.15rem -.46rem;
      }
      .icon2{
        background-position: -.56rem -.46rem;
      }
    }
    i{
      width: .5rem;
      height: .5rem;
      background: url('/static/images/footer_icon.png') no-repeat;
      background-size: 2.6rem auto;
      display: block;
      margin-top: .1rem;
    }
    strong{
      position: absolute;
      right: .3rem;
      top: 0;
      width: .38rem;
      height: .38rem;
      border-radius: 50%;
      display: block;
      background: #ff6900;
      line-height: .38rem;
      text-align: center;
      color: #fff;
    }
    .icon1 {
      background-position: .01rem -.01rem;
    }
    .icon2 {
      background-position: -.55rem -.01rem;
    }
    .icon3 {
      background-position: -1.12rem -.03rem;
    }
    .icon4 {
      background-position: -1.66rem -.02rem;
    }
    .icon5 {
      background-position: -2.13rem 0;
    }
    span{
      color: #333;
      margin-top: .02rem;
      display: block;
    }
  }
</style>
