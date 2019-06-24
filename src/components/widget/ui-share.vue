<template>
  <div>
    <div class="ui-mask" :class="{'active': shareMenu}"></div>
    <div class="ui-share-cont" @click="updateShareMenu(false)" :class="{'active':shareMenu}">
      <div class="ui-share-arrow"></div>
      <p class="ui-share-tips">
        点击右上角<br/>
        将它分享到朋友圈<br/>
        或指定的朋友
      </p>
    </div>
  </div>
</template>

<script type="text/javascript">

  import config from '@/config/index'

  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        'shareMenu': 'getShareMenu'
      })
    },
    props:['config'],
    methods: {
      ...mapActions([
        'updateShareMenu'
      ])
    }
  }

</script>

<style lang="scss">
  .ui-cancel-button{
    width:100%;
    background:#fff;
    height: 1rem;
    font-size: .36rem;
    color:#000;
    line-height: 1rem;
    border-top: .01rem solid #e0e0e0;
  }
  .ui-share-cont{
    width:100%;
    height: 100%;
    position: fixed;
    left:0;
    bottom:0;
    display: none;
    z-index:9999;
    &.active{
      display: block;
    }
  }
  .ui-share-arrow{
    background: url('/static/images/weixin_tips.png') no-repeat;
    background-size: 1.13rem auto;
    width: 1.13rem;
    height: 1.39rem;
    position: absolute;
    right:.5rem;
  }
  .ui-share-tips{
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    font-size: .28rem;
    color: #fff;
  }
</style>
