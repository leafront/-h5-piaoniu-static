<template>
  <div id="searchGoodsList" class="search_goods_wrapper" v-show="!showSearch && !showkeyword">
    <LazyLoad :list="productList" :options="{ele:'pic-lazyLoad',scrollEle: 'searchGoodsList'}">
      <div class="search_list_goods" v-if="showRows == 1">
        <div class="search_goods_item" @click="routerAction(`/detail.html?itemId=${item.mpId}`)" :key="item.mpId" v-for="item in productList">
          <div class="pic-lazyLoad search_goods_pic" :data-src="item['url300x300']"></div>
          <p class="ui-ellipsis font c3">{{item.name}}</p>
          <div class="search_goods_tag" v-if="item.promotionInfo && item.promotionInfo[0].promotions">
            <span :key="child.promotionId" :class="{'week-sell': item.isWeekSell == 1}" v-for="child in item.promotionInfo[0].promotions">{{child.iconText}}
            </span>
          </div>  
          <div class="search_goods_pirce" v-if="searchPrice[item.mpId] && searchPrice[item.mpId].promotionPrice">
            <span class="ff6900">¥{{searchPrice[item.mpId].promotionPrice | price}}</span>
            <strong class="c9">¥{{searchPrice[item.mpId].price | price}}</strong>
          </div>  
          <div class="search_goods_pirce" v-if="searchPrice[item.mpId] && !searchPrice[item.mpId].promotionPrice">
            <span class="ff6900">¥{{searchPrice[item.mpId].price | price}}</span>
          </div>  
          <div class="search_comment" v-if="item.commentInfo && item.commentInfo.commentNum > 0">
            <strong class="ff6900">{{item.commentInfo.commentNum}}</strong>
            <span>条评论 好评</span>
            <strong class="search_percent ff6900">{{item.commentInfo.goodRate}}%</strong>
          </div>  
          <div class="search_comment" v-else>
            <strong class="c9">暂无评论</strong>
          </div> 
          <div class="search_cart_icon" @click="addBuyListCart($event,item)">
            <i></i>
          </div>  
        </div>
      </div> 
      <div class="search_list_goods2" v-if="showRows == 2">
        <div class="search_goods_item2 ui-bottom-line" @click="routerAction(`/detail.html?itemId=${item.mpId}`)" :key="item.mpId" v-for="item in productList">
          <div class="pic-lazyLoad search_goods_pic" :data-src="item['url300x300']"></div>
          <div class="search_goods_item2_info">
            <p class="font c3">{{item.name}}</p>
            <div class="search_item2_tag" v-if="item.promotionInfo && item.promotionInfo[0].promotions">
              <span :key="child.promotionId" v-for="child in item.promotionInfo[0].promotions">{{child.iconText}}
              </span>
            </div> 
            <div class="search_goods_pirce2" v-if="searchPrice[item.mpId] && searchPrice[item.mpId].promotionPrice">
              <span class="ff6900">¥{{searchPrice[item.mpId].promotionPrice | price}}</span>
              <strong class="c9">¥{{searchPrice[item.mpId].price | price}}</strong>
            </div>  
            <div class="search_goods_pirce2" v-if="searchPrice[item.mpId] && !searchPrice[item.mpId].promotionPrice">
              <span class="ff6900">¥{{searchPrice[item.mpId].price | price}}</span>
            </div>  
            <div class="search_comment2" v-if="item.commentInfo && item.commentInfo.commentNum > 0">
              <strong class="ff6900">{{item.commentInfo.commentNum}}</strong>
              <span>条评论 好评</span>
              <strong class="search_percent ff6900">{{item.commentInfo.goodRate}}%</strong>
            </div>  
            <div class="search_comment2" v-else>
              <strong class="ff6900">暂无评论</strong>
            </div> 
            <div class="search_cart_icon search_cart_icon2" @click="addBuyListCart($event,item)">
              <i></i>
            </div>  
          </div>  
        </div>  
      </div>   
    </LazyLoad>  
    <PageLoading :showLoading="showLoading"></PageLoading>
  </div>  
</template>  

<script type="text/javascript">

  import LazyLoad from '@/components/widget/lazyLoad'
  import PageLoading from '@/components/common/pageLoading'

  export default {
    props: {
      showRows: {
        type: Number,
        default: 1
      },
      productList: {
        type: Array,
        default: []
      },
      searchPrice: {
        type: Object,
        default: {}
      },
      showLoading: {
        type: Boolean,
        default: false
      },
      showkeyword: {
        type: Boolean,
        default: false
      },
      showSearch: {
        type: Boolean,
        default: false
      }
    },
    components: {
      LazyLoad,
      PageLoading
    },
    methods: {
     /**
       * 添加购物车
      */
      addBuyListCart ($event,item) {
        this.$emit('addBuyListCart', $event, item)
      },
      routerAction (url) {
        location.href = url
      }
    }
  }

</script>  

<style lang="scss">
.search_list_goods2{
  margin-top: 1.12rem;
  background: #fff;
  padding-left: .24rem;
}
.search_goods_pirce2{
  display: flex;
  padding-top: .1rem;
  font-family: 'Microsoft Yahei', 'PingFangSC-Regular';
  span{
    font-size: .4rem;
  }
  strong{
    padding-top: .15rem;
    padding-left: .1rem;
    text-decoration: line-through;
  }
}
.search_goods_item2_info{
  flex: 1;
  p{
    margin-top: .1rem;
    line-height: .54rem;
  }
}
.search_item2_tag{
  display: flex;
  span{
    padding: .02rem .06rem;
    color: #fff;
    background: #ff3939;
    border-radius: .08rem;
    margin-right: .2rem;
  }
}
.search_goods_item2{
  padding: .24rem .24rem .24rem 0;
  display: flex;
  position: relative;
  &:last-child{
    border-bottom: 0;
  }
  .search_goods_pic{
    margin-right: .24rem;
    width: 2rem;
    height: 2rem;
  }
}

.search_comment,.search_comment2{
  display: flex;
  padding-top: .1rem;
  height: .4rem;
  align-items: center;
  strong{
    padding-right: .05rem;
  }
  .search_percent{
    padding-left: .05rem;
  }
}

.search_goods_pirce{
  display: flex;
  padding-top: .1rem;
  font-family: 'Microsoft Yahei', 'PingFangSC-Regular';
  span{
    font-size: .4rem;
  }
  strong{
    padding-top: .15rem;
    padding-left: .1rem;
    text-decoration: line-through;
  }
}
.search_list_goods{
  margin-top: .88rem;
  padding: .24rem .3rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.search_goods_item{
  padding: .12rem;
  width: 3.36rem;
  background: #fff;
  margin-bottom: .18rem;
  position: relative;
  .search_goods_pic{
    width: 3.12rem;
    height: 3.12rem;
  }
  p{
    padding-top: .1rem;
  }
  .search_goods_tag{
    padding-top: .1rem;
    display: flex;
    span{
      padding: .02rem .06rem;
      color: #fff;
      background: #ff3939;
      border-radius: .08rem;
      margin-right: .2rem;
    }
    .week-sell {
      background: #0BB20C !important;
    }
  }
}
.search_cart_icon{
  padding: .3rem .2rem .1rem .3rem;
  position: absolute;
  right: 0;
  bottom: 0;
  i{
    width: .46rem;
    height: .42rem;
    display: block;
    background: url('/static/images/cart_icon.png') no-repeat;
    background-size: .46rem auto;
  }
}

.search_cart_icon2{
  padding-bottom: .2rem;
}
</style>  
