<template>
  <div>
    <div class="ui-mask" id="search-rank-mask" :class="{'active': isPopup == 1}" @click="togglePopup"></div>
    <div class="search_rank font" id="search-rank" :class="{'active': isPopup == 1}">
      <p v-for="item in sortByList" @click="selectSort(item.sortTypeShort,item.sortTypeCode)"><span>{{item.sortTypeDesc}}</span><i v-if="sortType == item.sortTypeCode"></i></p>
    </div>
  </div>  
</template>

<script type="text/javascript">

  import utils from '@/widget/utils'

  export default {
    props: {
      sortByList: {
        type: Array,
        default: []
      },
      sortType: {
        type: Number,
        default: 10
      },
      isPopup: {
        type: Number,
        default: -1
      }
    },
    watch: {
      isPopup (newVal, oldVal) {
        if (newVal) {
          document.getElementById('search-rank-mask').addEventListener('touchmove',(event) => {
            if (!utils.isPassive()) {
              event.preventDefault()
            }
            event.stopPropagation()
          }, utils.isPassive() ? {passive: true} : false)

          document.getElementById('search-rank').addEventListener('touchmove',(event) => {
            if (!utils.isPassive()) {
              event.preventDefault()
            }
            event.stopPropagation()
          }, utils.isPassive() ? {passive: true} : false)
        }
      }
    },
    methods: {
      selectSort (sortTypeDesc,sortTypeCode) {
        this.$emit('selectSort', sortTypeDesc, parseInt(sortTypeCode))
        this.$emit('togglePopup', -1, 1)
      },
      togglePopup () {
        this.$emit('togglePopup', -1, 1)
      }
    }
  }

</script>

<style lang="scss">
  .search_rank{
    width: 100%;
    padding: 0 .4rem;
    position: fixed;
    width: 100%;
    top: 1.75rem;
    left: 0;
    background: #fff;
    display: none;
    z-index: 120;
    &.active{
      display: block;
    }
    p{
      height: .9rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      i{
        width: .34rem;
        height: .23rem;
        background: url(../../images/search_list_sprite.png) -1.16rem -.07rem no-repeat;
        background-size: 1.5rem auto;
      }
    }
  }
</style>
