<template>
  <div>
    <div class="ui-mask" @click="cancelSex(false)" :class="{'active': sexPopup}"></div>
    <div class="ui-sex" :class="{'active': sexPopup}">
      <p @click="checkedSex(0)">男</p>
      <p @click="checkedSex(1)">女</p>
      <p @click="cancelSex(false)">取消</p>
    </div>
  </div>
</template>

<script type="text/javascript">

  export default {
    props: {
      sexPopup: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      cancelSex (val) {
        this.$emit('toggleSex',false)
      },
      checkedSex (val) {
        this.$emit('toggleSex',false)
        this.$emit('checkedSex',val)
      }
    }
  }

</script>

<style lang="scss">
  .ui-sex{
    width:100%;
    height: 3rem;
    background: #fff;
    position: fixed;
    z-index:999;
    left:0;
    bottom:0;
    transform: translateY(100%);
    transition: all .5s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    text-align: center;
    &.active{
      transform: translateY(0);
    }
    p{
      line-height: 1rem;
      font-size: .36rem;
      color: #000;
      &:first-child{
        border-bottom: .01rem solid #ddd;
      }
    }
  }
</style>

