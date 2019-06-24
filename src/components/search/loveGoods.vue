<template>
  <div class="search_goods" id="searchList" v-show="showkeyword">
    <div class="search_love_title" v-if="list && list.length">
      <i class="love_icon"></i>
      <span class="c3 font-b">看过的商品</span>
    </div>
    <LazyLoad :list="list" :options="{ele:'pic-lazyLoad',scrollEle: 'searchList'}">
      <div class="search_goods_list">
        <div class="search_goods_item" @click="routerAction(`/detail.html?itemId=${item.mpId}`)" :key="item.mpId" v-for="item in list">
          <div class="pic-lazyLoad search_goods_pic" :data-src="item.url300x300"></div>  
          <p class="ui-ellipsis font c3 mb20">{{item.name}}</p>
          <div class="search_goods_price">
            <span class="ff6900">¥ {{item.price | price}}</span>
            <div class="cart_icon" @click="addBuyListCart($event,item)">
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

  import PageLoading from '@/components/common/pageLoading'
  import LazyLoad from '@/components/widget/lazyLoad'
  import utils from '@/widget/utils'
  import * as Model from '@/model/search'

  export default {
    data () {
      return {
        showLoading: false,
        isScrollLoad: false,
        timer: null,
        currentPage: 1,
        list: []
      }
    },
    props: {
      showkeyword: {
        type: Boolean,
        default: false
      },
      categoryId: {
        type: String,
        default: ''
      }
    },
    components: {
      PageLoading,
      LazyLoad
    },
    methods: {
      routerAction (url) {
        location.href = url
      },
      /**
       * 添加购物车
      */
      addBuyListCart ($event,item) {
        this.$emit('addBuyListCart', $event, item)
      },
      /**
       * 获取看过的商品列表
       */
      getLookGoodsList (type) {
        const {
          currentPage
        } = this
        Model.getLookGoodsList({
          type: 'GET',
          ignoreLogin: true,
          data: {
            pageNo: currentPage,
            pageSize: 10
          }
        }).then((result) => {
          const data = result.data 

          if (result.code == 0 && data) {
            if (currentPage > 1) {
              setTimeout(() => {
                this.showLoading = false
                this.isScrollLoad = false
              }, 1000)
            }
            this.totalPage = data.totalCount
            const dataList = data.data
            const goodsList = []
            if (dataList && dataList.length) {
              dataList.forEach((item) => {
                item.values.forEach((child) => {
                  goodsList.push(child)
                })
              })
            } 
            if (type == 1) {
              this.list = this.list.concat(goodsList || [])
            } else {
              this.list = goodsList || []
            }
          } else {
            if (currentPage > 1) {
              setTimeout(() => {
                this.isScrollLoad = false
              }, 1000)
            }
            if (result.code != 99) {
              this.$toast(result.message)
            }
          }
        })
      },
      /**
       * 滚动加载团列表
       */
      scrollLoadList () {
        const pageViewHeight = window.innerHeight
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const pageHeight = document.querySelector('.scroll-view-wrapper').offsetHeight
        const realFunc = () => {
          if (pageViewHeight + scrollTop >= pageHeight && this.list.length < this.totalPage) {
            this.showLoading = true
            this.currentPage += 1
            this.getLookGoodsList(1)
          }
          this.isScrollLoad = false
          if (scrollTop > pageViewHeight) {
            if (!this.showCart) {
              this.showCart = true
            }
          } else {
            this.showCart = false
          }
        }
        if (!this.isScrollLoad) {
          this.isScrollLoad = true
          this.timer = requestAnimationFrame(realFunc)
        }
      },
    },
    created () {
      if (this.categoryId) {
        return
      }
      this.getLookGoodsList()
      window.addEventListener('touchmove',this.scrollLoadList,utils.isPassive() ? {passive: true} : false)
    },
    beforeDestroy () {
      cancelAnimationFrame(this.timer)
      window.removeEventListener('touchmove', this.scrollLoadList,utils.isPassive() ? {passive: true} : false)
    }
  }

</script>  

<style lang="scss" scoped="scoped">
.search_goods{
  padding: 0 .3rem;
}
.search_goods_list{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.search_goods_item{
  width: 3.35rem;
  padding: .12rem;
  background: #fff;
  margin-bottom: .2rem;
  .search_goods_pic{
    width: 3.11rem;
    height: 3.11rem;
  }
  p{
    padding-top: .1rem;
    width: 100%;
  }
}
.search_goods_price{
  display: flex;
  justify-content: space-between;
  align-items: center;
  span{
    font-size: .4rem;
    font-family: "Micrsofot Yahei";
  }
  .cart_icon{
    padding: .1rem .1rem .1rem .3rem;
    background-size: 1.4rem auto;
    display: flex;
    i{
      width: .46rem;
      height: .42rem;
      background: url('/static/images/cart_icon.png') no-repeat;
      background-size: 100% auto;
    }
  }
}
.search_love_title{
  height: .8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:before{
    content: '';
    width: 2rem;
    height: .01rem;
    background: #ddd;
    margin-right: .3rem;
  }
  &:after{
    content: '';
    width: 2rem;
    height: .01rem;
    background: #ddd;
    margin-left: .3rem;
  }
  .love_icon{
    width: .34rem;
    height: .32rem;
    background: url(../../images/search_sprite.png) no-repeat -1.01rem -.35rem;
    background-size: 1.4rem auto;
  }
  span{
    padding-left: .1rem;
  }
}
</style>

