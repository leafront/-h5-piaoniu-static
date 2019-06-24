<template>
  <div class="search_list" id="search-list" v-show="showSearch && !showkeyword">
    <div class="search_list_item" v-for="item in searchList" @click="searchAction(item.keyword)">
      <p class="font">{{item.keyword}}</p>
    </div>  
  </div>    
</template> 

<script type="text/javascript">

  import utils from '@/widget/utils'

  export default {
    props: {
      searchList: {
        type: Array,
        default: []
      },
      showSearch: {
        type: Boolean,
        default: false
      },
      showkeyword: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      searchAction (keyword) {
        this.$emit('searchAction', keyword)
      }
    },
    mounted () {
      document.getElementById('search-list').addEventListener('touchmove',(event) => {
        if (!utils.isPassive()) {
          event.preventDefault()
        }
        event.stopPropagation()
      }, utils.isPassive() ? {passive: true} : false)
    }
  }
</script>

<style lang="scss">
  .search_list{
    position: fixed;
    left: 0;
    top: .88rem;
    width: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    z-index: 1400;
    background: #fff;
  }
  .search_list_item{
    padding-left: .3rem;
    height: .88rem;
    display: flex;
    align-items: center;
    border-top: .01rem solid #e0e0e0;
  }
</style>
