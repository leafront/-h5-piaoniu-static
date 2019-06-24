<template>
  <div class="search_empty" v-show="!showSearch && !showkeyword && showEmpty && !productList.length">
    <div class="search_empty_pic">
      <img src="./images/search_empty.png"/>
      <p class="c9">没有找到相关商品~</p>
    </div>  
    <div class="search_empty_tag">
      <h4 class="font">为您推荐了热门搜索词</h4>
      <div class="font-s search_empty_tag_info">
        <span v-for="item in hotword" @click="searchAction(item.content)">{{item.content}}</span>
      </div>  
    </div>    
  </div>    
</template>

<script type="text/javascript">

  export default {
    props: {
      hotword: {
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
      },
      productList: {
        type: Array,
        default: []
      },
      showEmpty: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      searchAction (val) {
        this.$emit('searchAction', val)
      }
    }
  }
</script>

<style lang="scss">
  .search_empty{
    margin-top: .88rem;
    overflow-x: hidden;
  }
  .search_empty_pic{
    padding: 1.2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 1.7rem;
      height: 1.35rem;
    }
  }
  .search_empty_tag{
    padding: 0 .3rem;
    h4{
      color: #808080;
    }
  }
  .search_empty_tag_info{
    width: 104%;
    margin-top: .4rem;
    span{
      background: #e1e1e1;
      float: left;
      margin-bottom: .24rem;
      height: .56rem;
      line-height: .56rem;
      padding: 0 .2rem;
      margin-right: .2rem;
      border-radius: .08rem;
    }
  }
</style>
