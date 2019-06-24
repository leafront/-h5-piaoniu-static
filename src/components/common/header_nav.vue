<template>
  <div class="ui-header-nav" :class="{'active': headerMenu}">
    <i class="ui-header-arrow"></i>
    <ul class="ui-header-nav-list">
      <li @click="homeAction('/index.html')">
        <i class="icon icon-home"></i>
        <span class="font">首页</span>
      </li>
      <li @click="myAction('/my/index')">
        <i class="icon icon-my"></i>
        <span class="font">我&nbsp;&nbsp;</span>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">

  import {mapGetters, mapActions} from 'vuex'
  import utils from '@/widget/utils'

  export default {
    computed: {
      ...mapGetters({
        'headerMenu': 'getHeaderMenu'
      })
    },
    methods: {
      ...mapActions([
        'updateHeaderMenu',
        'updateShareMenu'
      ]),
      homeAction (url) {
        if (utils.isApp()) {
          location.href = 'lyf://home'
        } else {
          location.href = url
        }
      },
      myAction (url) {
        if (utils.isApp()) {
          location.href = 'lyf://myhome'
        } else {
          location.href = url
        }
      }
    }
  }
</script>

<style lang="scss">
  .ui-header-nav{
    position: fixed;
    width: 1.6rem;
    right: .2rem;
    top: .88rem;
    background: #3d3d3d;
    opacity: .8;
    z-index:1500;
    border-radius: .08rem;
    transform: translateX(120%);
    transition: all .5s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    &.active{
      transform: translateY(0);
    }
    .ui-header-arrow{
      position: absolute;
      top: -.1rem;
      right: .2rem;
      border-left: .1rem solid transparent;
      border-right: .1rem solid transparent;
      border-bottom: .1rem solid #3d3d3d;
    }
  }
  .ui-header-nav-list{
    border-radius: .08rem;
    li{
      display: flex;
      align-items: center;
      justify-content: center;
      height: .8rem;
      border-bottom: .01rem solid #fff;
      box-sizing: border-box;
      &:last-child{
        border-bottom: 0;
      }
      span{
        color: #fff;
        padding-left: .15rem;
      }
      .icon {
        background: url(/static/images/share_sprite.png) no-repeat;
        background-size: 1.65rem auto;
        width: .34rem;
        height: .34rem;
      }
      .icon-home{
        background-position: -.53rem 0;
      }
      .icon-share {
        width: .3rem;
        background-position: -.9rem .01rem;
      }
      .icon-my {
        height: .38rem;
        background-position: -1.22rem .01rem;
      }
    }
  }
  .ui-header-right-icon{
    position:absolute;
    right:0;
    top:0;
    display: flex;
    align-items: center;
    height: .88rem;
    width: 1.2rem;
    padding-right: .3rem;
    justify-content: flex-end;
    i{
      width: .42rem;
      height: .11rem;
      background: url(/static/images/share_sprite.png) no-repeat -.05rem -.1rem;
      background-size: 1.65rem auto;
      transition: transform .4s linear;
      &.active{
        transform: rotate(90deg);
      }
    }
  }
</style>
