<template>
  <div class="pageLoading" v-show="showLoading">
    <div class="ui-showPageLoading-gif"></div>
  </div>

</template>

<script type="text/javascript">

  export default {
    props: {
      showLoading: {
        type: Boolean,
        default: false
      }
    }
  }

</script>

<style lang="scss">

  .pageLoading {
    background: #fff;
    padding-bottom: .2rem;
    .ui-showPageLoading-gif{
      background:url('/static/images/showPageLoading.png') no-repeat;
      width: 2.5rem;
      margin: 0 auto;
      height: 1.13rem;
      background-size: 2.5rem auto;
    }
  }
</style>
