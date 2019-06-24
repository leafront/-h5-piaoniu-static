<template>
  <div>
    <div class="ui-mask" @click="toggleContactPopup(false)" :class="{'active': contactPopup}"></div>
    <div class="ui-contact" :class="{'active': contactPopup}">
      <h5>客服工作时间：每日8:00-21:00</h5>
      <p class="ff6900" @click="callPhone">400-8819777</p>
      <p>取消</p>
    </div>
  </div>
</template>

<script type="text/javascript">

  export default {
    props: {
      contactPopup: {
        type: Boolean,
        value: false
      }
    },
    methods: {
      callPhone () {
        location.href = 'tel:400-8819777'
      },
      toggleContactPopup (val) {
        this.$emit('toggleContactPopup', val)
      }
    }
  }

</script>

<style lang="scss">
  .ui-contact{
    width:100%;
    height: 3.2rem;
    background: #fff;
    position: fixed;
    z-index:999;
    left:0;
    bottom:0;
    transform: translateY(100%);
    transition: all .5s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    text-align: center;
    font-size: .36rem;
    h5{
      line-height: 1.2rem;
      color: grey;
      border-bottom: .01rem solid #ddd;
    }
    &.active{
      transform: translateY(0);
    }
    p{
      line-height: 1rem;
      &:nth-child(3) {
        color: #000;
      }
    }
  }
</style>
