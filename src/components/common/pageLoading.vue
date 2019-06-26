<template>
  <div class="ui-pageLoading"  v-show="showLoading">
    <i></i><span class="font-s c9">努力加载中</span>
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
