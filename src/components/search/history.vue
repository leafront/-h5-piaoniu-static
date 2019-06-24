<template>
  <div class="search_hot_wrapper" v-show="showkeyword">
    <div class="search_hot" v-if="hotword.length">
      <div class="search_title">
        <i class="hot_icon"></i>
        <p class="font">热门搜索</p>
      </div> 
      <div class="search_tag"> 
        <ul class="search_tag_list font-s clearfix">
          <li v-for="item in hotword" @click="searchAction(item.content)"><span>{{item.content}}</span></li>
        </ul>  
      </div>  
    </div>  
    <div class="search_hot" v-if="searchHistoryList.length">
      <div class="search_title">
        <i class="history_icon"></i>
        <p class="font">历史搜索</p>
      </div> 
      <div class="search_tag"> 
        <ul class="search_tag_list font-s clearfix">
          <li v-for="item in searchHistoryList" @click="searchAction(item.keyword)"><span>{{item.keyword}}</span></li>
        </ul>  
      </div>  
      <div class="search_tag_delete" @click="clearSearchHistoryList">
        <div class="search_tag_del_btn">
          <i class="del_icon"></i>
          <span class="font">清空搜索历史</span>
        </div>  
      </div>  
    </div> 
  </div> 
</template>

<script type="text/javascript">

  import * as Model from '@/model/search'
  import common from '@/widget/common'
  import store from '@/widget/store'

  export default {
    props: {
      showkeyword: {
        type: Boolean,
        defalut: false
      },
      hotword: {
        type: Array,
        defalut: []
      },
      categoryId: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        searchHistoryList: []
      }
    },
    methods: {
      searchAction (keyword) {
        this.$emit('searchAction', keyword)
      },
      /**
       * 清空历史数据
       */
      clearSearchHistoryList () {
        this.$showModal({
          content: '清空历史数据？',
          cancelText: '取消',
          confirmText: '确认',
          success: () => {
            Model.clearSearchHistoryList({
              type: 'POST'
            }).then((result) => {

              if (result.code == 0) {
                this.$toast('清除历史数据成功')
                this.searchHistoryList = []
              } else {
                this.$toast(result.message)
              }
            })
          }
        })
      },
      /**
       * 获取搜索历史列表
       */
      getSearchHistoryList () {
        Model.getSearchHistoryList({
          type: 'GET',
          ignoreLogin: true,
          data: {
            count: 10
          }
        }).then((result) => {
          const data = result.data
          this.$hideLoading()
          if (result.code == 0 && data) {
            const {
              searchHistoryList
            } = data
            if (searchHistoryList) {
              this.searchHistoryList = searchHistoryList 
            }
          } 
        })
      }
    },
    created () {
      if (this.categoryId) {
        return
      }
      this.getSearchHistoryList()
    }
  }

</script>

<style lang="scss">
.search_title{
  height: .9rem;
  display: flex;
  align-items: center;
  padding: 0 .3rem;
  i{
    background: url(../../images/search_sprite.png) no-repeat;
    background-size: 1.4rem auto;
    &.hot_icon{
      width: .25rem;
      height: .3rem;
      background-position: -.07rem 0;
    }
    &.history_icon{
      width: .3rem;
      height: .3rem;
      background-position: -.37rem -.03rem;
    }
  }
  p{
    padding-left: .15rem;
  }
}
.search_tag_delete{
  display: flex;
  justify-content: center;
  padding: .12rem 0 .2rem 0;
}
.search_tag_del_btn{
  display: flex;
  width: 2.4rem;
  height: .6rem;
  justify-content: center;
  align-items: center;
  border: .02rem solid #E5E5E5;
  border-radius: .08rem;
  .del_icon{
    width: .23rem;
    height: .27rem;
    background: url(../../images/search_sprite.png) no-repeat;
    background-position: -.75rem -.04rem;
    background-size: 1.4rem auto;
  } 
  span{
    padding-left: .1rem;
  }
}
.search_hot{
  background: #fff;
  margin-top: .2rem;
}
.search_tag{
  padding: .12rem 0 0 .3rem;
  overflow: hidden;
}
.search_tag_list{
  width: 104%;
  li{
    background: #F0F0F0;
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

