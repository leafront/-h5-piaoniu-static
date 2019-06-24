<template>
  <div class="pageView">
    <SearchFilter
      :showkeyword="showkeyword"
      :showSearch="showSearch"
      :filterName="filterName"
      :checkedIndex="checkedIndex"
      :showRows="showRows"
      @togglePopup="togglePopup"
      @checkedSale="checkedSale"
      @showRowsWay="showRowsWay">  
    </SearchFilter>
    <SearchRank 
      :sortByList="sortByList" 
      :sortType="sortType"
      :isPopup="isPopup"
      @togglePopup="togglePopup"
      @selectSort="selectSort">   
      </SearchRank>
    <SearchPrice
      :isPopup="isPopup"
      @selectRangePrice="selectRangePrice"
      @togglePopup="togglePopup">
    </SearchPrice>
    <UIHeaderNav></UIHeaderNav>
    <SearchList
      :showSearch="showSearch"
      :showkeyword="showkeyword"
      :searchList="searchList"
      @searchAction="searchAction">
    </SearchList>
    <div class="search_header">
      <div class="ui-header-back" @click="backAction">
        <span class="ui-header-back_btn"></span>  
      </div> 
      <from class="search_header_input" @click="clickSearchAuto">
        <i></i>
        <input type="text" class="font c6 search_heade_txt" @input="getSearchAuto" v-model.trim="keyword" :placeholder="searchword" maxlength="20" />
        <div class="search_close_icon" v-show="keyword && showSearch" @click="clearKeyword">
          <span></span>
        </div>  
      </from>
      <div class="search_header_submit" v-show="showSearch" @click="searchAction(keyword)"> 
        <span class="font">搜索</span>
      </div> 
      <div class="search-header-right-icon" @click="toggleMenu" v-show="!showSearch">
        <i :class="{'active': headerMenu}"></i>
      </div>  
    </div>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView, 'scroll_view_hidden': isPopup == 1 || isPopup == 3 || fixedView == 1}">
      <SearchHistory 
        :categoryId="categoryId"
        :hotword="hotword"
        :showkeyword="showkeyword"
        @searchAction="searchAction">
      </SearchHistory>
      <SearchLoveGoods
        :categoryId="categoryId"
        :showkeyword="showkeyword"
        @addBuyListCart="addBuyListCart">
      </SearchLoveGoods>  
      <SearchEmpty
        :showEmpty="showEmpty"
        :showSearch="showSearch"
        :showkeyword="showkeyword"
        :hotword="hotword"
        :productList="productList"
        @searchAction="searchAction">  
      </SearchEmpty>
      <SearchGoods 
        :showkeyword="showkeyword"
        :showSearch="showSearch"
        :productList="productList"
        :searchPrice="searchPrice"
        :showRows="showRows"
        :showLoading="showLoading"
        @addBuyListCart="addBuyListCart">
      </SearchGoods>
      <div class="search_cart" v-show="!showSearch && !showkeyword" @click="cartAction">
        <i v-if="cartCount > 0">{{cartCount}}</i>
      </div>
    </div>  
  </div>
</template>

<script type="text/javascript">

  import * as Model from '@/model/search'
  import common from '@/widget/common'
  import UIHeaderNav from '@/components/common/header_nav'
  import SearchRank from '@/components/search/rank'
  import SearchPrice from '@/components/search/price'
  import SearchList from '@/components/search/list'
  import SearchHistory from '@/components/search/history'
  import SearchGoods from '@/components/search/goods'
  import SearchFilter from '@/components/search/filter'
  import SearchLoveGoods from '@/components/search/loveGoods'
  import SearchEmpty from '@/components/search/empty'
  import utils from '@/widget/utils'
  import store from '@/widget/store'
  import {mapGetters, mapActions} from 'vuex'
  import { sendTracker } from '@/widget/tracker'

  export default {
    data () {
      return {
        title: '搜索',
        pageView: false,
        hotword: [],
        searchHistoryList: [],
        currentPage: 1,
        showLoading: false,
        isScrollLoad: false,
        totalPage: 0,
        timer: null,
        productList: [],
        searchPrice: {},
        sortByList: [],
        keyword: '',
        sortType: 10,
        filterType: '',
        isPopup: -1,
        filterName: '综合',
        salesName: '销量优先',
        checkedIndex: 1,
        showRows: 1,
        cartCount: 0,
        minPrice: '',
        maxPrice: '',
        priceRange: '',
        categoryId: '',
        searchList: [],
        showSearch: false,
        merchantId: '',
        promotionId: '',
        trackerConfig: { pid: 'search', ppid: '2', cid: '', sk: '' },  //埋点配置
        showEmpty: false,
        fixedView: 0
      }
    },
    components: {
      UIHeaderNav,
      SearchRank,
      SearchPrice,
      SearchList,
      SearchHistory,
      SearchGoods,
      SearchFilter,
      SearchLoveGoods,
      SearchEmpty
    },
    computed: {
      ...mapGetters({
        'headerMenu': 'getHeaderMenu'
      }),
      showkeyword () {
        if (this.keyword == '' && this.categoryId == '') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      ...mapActions([
        'updateHeaderMenu',
        'updateShareMenu'
      ]),
      clearKeyword () {
        this.keyword = ''
      },
      /**
       * 获取热门搜索列表
       */
      getHotSearchList () {

        Model.getHotSearchList({
          type: 'GET',
          ignoreLogin: true,
          data: {
            pageCode: 'H5_HOME',
            adCode: 'searchword,hotword',
            areaCode: common.getAreaCode().areaCode
          }
        }).then((result) => {
          const data = result.data
          if (!this.categoryId) {
            this.$hideLoading()
          }
          this.pageView = true
          if (result.code == 0 && data) {
            const {
              hotword,
              searchword
            } = data
            if (hotword && hotword.length) {
              this.hotword = hotword
            }
            if (searchword && searchword.length) {
              this.searchword = searchword[0].content
            }
          } 
        })
      },
      clickSearchAuto () {
        const appView = document.getElementById('app')
        if (!appView.classList.contains('app_fixed')){
          appView.classList.add('app_fixed')
        } 
        setTimeout(() => {
          document.body.scrollTop = document.documentElement.scrollTop = 0
        },500)
        this.fixedView = 1
        const {
          keyword
        } = this
        if (!this.showSearch) {
          this.showSearch = true
        }
        if (this.headerMenu) {
          this.updateHeaderMenu(false)
        }
        Model.getSearchAuto({
          type: 'GET',
          data: {
            keyword
          }
        }).then((result) => {

          const data = result.data
          if (result.code == 0 && data) {
            if (data && data.length) {
              this.searchList = data
            }
          } else {
            this.$toast(result.message)
          }
        })
      },
      /**
      * 根据输入自动搜索关键字商品名称
      */
      getSearchAuto: utils.throttle(function () {
        this.clickSearchAuto()
      },1000),
      /**
       * 选择价格搜索商品列表
       * @param  {String} minPrice  最小价格区间
       * @param  {String} maxPrice  最大价格区间
       */
      selectRangePrice (minPrice, maxPrice) {
        this.minPrice = parseFloat(minPrice)
        this.maxPrice = parseFloat(maxPrice)
        if (minPrice != '' && minPrice != '') {
          this.priceRange = minPrice + ',' + maxPrice
        } else {
          this.priceRange = ''
        }
        this.$showLoading()
        this.currentPage = 1
        this.getSearchList()
      },
      /**
       * 根据关键字进行搜索商品
       * @param  {String} keyword 搜索关键字
       */
      searchAction (keyword) {
        keyword = keyword || this.searchword
        const query = utils.query()
        const categoryId = utils.query('categoryId')
        if (categoryId) {
          delete query.categoryId
        }
        query.keyword = keyword
        const queryStr = utils.queryStringify(query)
        const url = this.$route.path + '?' + queryStr
        this.showSearch = false
        this.keyword = keyword
        this.categoryId = ''
        this.currentPage = 1
        this.$showLoading()
        this.getSearchList()
        this.$router.replace(url)
        this.trackerConfig.sk = keyword
        this.trackerConfig.cid = ''
        sendTracker(this.trackerConfig)
      },
      /**
       * 购物车跳转链接
       */
      cartAction () {
        if (utils.isApp()) {
          location.href = 'lyf://shoppingCar'
        } else {
          location.href = '/cart.html'
        }
      },
      /**
       * 显示切换一行或者两行显示的商品
       */
      showRowsWay () {
        if (this.showRows == 1) {
          this.showRows = 2
        } else {
          this.showRows = 1
        }
      },
      toggleMenu () {
        if (this.headerMenu) {
          this.updateHeaderMenu(false)
        } else {
          this.updateHeaderMenu(true)
        }
      },
      /**
       * 切换综合选项搜索商品
       * @param  {Number} val 
       */
      checkedSale (val) {
        if (this.sortType !== 'volume4sale_desc') {
          this.sortType = val
          this.getSearchList()
        } 
        this.checkedIndex = 2
        this.sortType = val
        this.isPopup = -1
      },
      /**
       * 排序选项选中，切换商品
       * @param  {String} name
       * @param  {Number} val
       */
      selectSort (name,val) {
        this.sortType = val
        this.filterName = name
        this.getSearchList()
      },
      /**
       * 
       * @param  {Number} val1 弹层显示
       * @param  {Number} val2 筛选选项选中
       */
      togglePopup (val1, val2) {
        if (val1 == -1) {
          document.getElementById('app').classList.remove('app_fixed')
        } else {
          document.getElementById('app').classList.add('app_fixed')
        }
        this.isPopup = val1
        this.checkedIndex = val2
      },
      backAction () {
        this.$router.back()
      },
      /**
       * @param  {String} url 
       */
      pageAction (url) {
        this.$router.push(url)
      },
      /**
       * 获取搜索商品实时价格
       * @param  {String} mpIds
       */
      getPriceStockList (mpIds) {
        if (!mpIds) {
          return
        }
        mpIds = mpIds.join(',')
        Model.getPriceStockList({
          type: 'GET',
          data: {
            promotionId: '',
            mpIds
          }
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            const plist = data.plist
            if (plist && plist.length) {
              const searchPrice = {}
              plist.forEach((item) => {
                searchPrice[item.mpId] = {
                  promotionPrice: item.promotionPrice,
                  price: item.price
                }
              })
              this.searchPrice = searchPrice
            }
          }
        })
      },
      /**
       * 根据条件搜索或者过滤商品列表
       * @param  {Number} type 
       */
      getSearchList (type) {
        const {
          currentPage,
          sortType,
          filterType,
          keyword,
          priceRange,
          categoryId,
          merchantId,
          promotionId
        } = this
        if (!categoryId && keyword == '') {
          return 
        }
        Model.getSearchList({
          type: 'GET',
          data: {
            merchantId,
            shoppingGuideJson: JSON.stringify({"attributeJson":[]}),
            brandIds: '',
            promotionIds: promotionId,
            coverProvinceIds: '',
            sortType,
            filterType,
            priceRange,
            pageNo: currentPage,
            pageSize: 20,
            keyword,
            areaCode: common.getAreaCode().areaCode,
            navCategoryIds: categoryId
          }
        }).then((result) => {

          const data = result.data
          const mpIds = []
          if (!this.pageView) {
            this.pageView = true
          }
          this.showEmpty = true
          if (result.code == 0 && data) {
            this.$hideLoading()
            const {
              productList,
              sortByList,
              totalCount
            } = data
            if (currentPage > 1) {
              setTimeout(() => {
                this.showLoading = false
                this.isScrollLoad = false
              }, 1000)
            }
            this.totalPage = data.totalCount
            this.sortByList = sortByList || []
            if (type == 1) {
              this.productList = this.productList.concat(productList || [])
            } else {
              this.productList = productList || []
            }
            if (productList && productList.length) {
              productList.forEach((item) => {
                mpIds.push(item.mpId)
              })
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
          return mpIds

        }).then((mpIds) => {
          if (mpIds && mpIds.length) {
            this.getPriceStockList(mpIds)
          }
        })
      },
      /**
       * 滚动加载列表
       */
      scrollLoadList () {
        const appView = document.getElementById('app')
        if (appView.classList.contains('app_fixed')){
          appView.classList.remove('app_fixed')
        } 
        this.fixedView = 0
        const pageViewHeight = window.innerHeight
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const pageHeight = document.querySelector('.scroll-view-wrapper').offsetHeight
        const realFunc = () => {
          if (pageViewHeight + scrollTop >= pageHeight && this.productList.length < this.totalPage) {
            this.showLoading = true
            this.currentPage += 1
            this.getSearchList(1)
          }
          this.isScrollLoad = false
        }
        if (!this.isScrollLoad) {
          this.isScrollLoad = true
          this.timer = requestAnimationFrame(realFunc)
        }
      },
      /**
       * 获取购物车数量
       */
      getCartNum () {
        const sessionId = utils.getSessionId()
        Model.getCartNum({
          type: 'GET',
          ignoreLogin: true,
          data: {
            sessionId
          }
        }).then((result) => {
          const data = result.data

          if (result.code == 0) {
            this.cartCount = data
          }
        })
      },
      /**
       * add shopcart
       * @param  {Object} $event element event
       * @param  {Object} item  goods list object
       */
      addBuyListCart ($event,item) {
        $event.stopPropagation()
        this.$showPageLoading()
        const sessionId = utils.getSessionId()
        Model.addBuyListCart({
          type: 'POST',
          data: {
            sessionId,
            num: 1,
            mpId: item.mpId
          }
        }).then((result) => {
          const data = result.data
          this.$hidePageLoading()
          if (result.code == 0 && data) {
            this.cartCount += 1
            this.$toast('添加购物车成功')
          } else {
            this.$toast(result.message)
          }
        })
      },
      /**
       * 设置query带参数的keyword,sortType,merchantId,promotionId
       */
      setQueryItem () {
        const queryObj = utils.query()
        Object.keys(queryObj).forEach(key => {
          if (queryObj[key]) {
            this[key] = queryObj[key]
          }
        })
      }
    },
    created () {
      this.$showLoading()
      this.setQueryItem()
      this.getSearchList()
      this.getCartNum()
      this.getHotSearchList()
      this.trackerConfig.cid = this.categoryId
      this.trackerConfig.sk = this.keyword
      this.trackerConfig.referrer = this.$route.meta.trackerConfig.referrer
      sendTracker(this.trackerConfig)
      window.addEventListener('touchmove',this.scrollLoadList,utils.isPassive() ? {passive: true} : false)
    },
    beforeDestroy () {
      cancelAnimationFrame(this.timer)
      window.removeEventListener('touchmove', this.scrollLoadList,utils.isPassive() ? {passive: true} : false)
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
    background: url(../../../images/search_sprite.png) no-repeat;
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

.search_header_submit{
  padding: 0 .2rem;
  span{
    display: flex;
    justify-content: center;
    align-items: center;
    width: .8rem;
    height: .54rem;
    background: #ff6900;
    color: #fff;
    border-radius: .08rem;
  }
}

.search_cart{
  position: fixed;
  right: .2rem;
  bottom: 1.76rem;
  width: .82rem;
  height: .82rem;
  z-index: 90;
  background: url(../../../images/search_sprite.png) no-repeat -.04rem -.36rem;
  background-size: 1.4rem auto;
  i{
    padding: 0 .1rem;
    min-width: .14rem;
    height: .38rem;
    border-radius: 50%;
    background: #ff6900;
    display: block;
    position: absolute;
    top: -.12rem;
    right: -.1rem;
    color: #fff;
    line-height: .38rem;
    text-align: center;
  }
}

.search-header-right-icon{
  display: flex;
  align-items: center;
  height: .88rem;
  width: .9rem;
  justify-content: center;
  i{
    width: .42rem;
    height: .11rem;
    background: url(/static/images/share_sprite.png) no-repeat -.05rem -.1rem;
    background-size: 1.65rem auto;
    transition: transform .4s linear;
    &.active{
      transform: rotate(90deg);
    }
  }
}
.search_header + .scroll-view-wrapper{
  padding-top: .88rem;
}
.search_header {
  display: flex;
  background: #fff;
  align-items: center;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  height: .88rem;
  z-index: 1000;
}
.search_header_input{
  display: flex;
  flex: 1;
  height: .6rem;
  background: #f5f5f5;
  border-radius: .08rem;
  display: flex;
  align-items: center;
  padding: 0 .2rem;
  color: #232326;
  border: .01rem solid #ddd;
  position: relative;
  i{
    width: .3rem;
    height: .3rem;
    margin-top: .05rem;
    background: url(../../../images/search_sprite.png) no-repeat -1.02rem -.04rem;
    background-size: 1.4rem auto;
  }
  .search_heade_txt{
    padding: .02rem 0;
    height: 100%;
    width: 100%;
    margin-left: .2rem;
  }
}
.search_close_icon{
  position: absolute;
  right:0;
  height: 100%;
  width: .7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  span{
    width: .3rem;
    height: .3rem;
    background: rgba(0,0,0,.5);
    position: relative;
    border-radius: 50%;
    display: block;
    &:before,&:after{
      content: '';
      display: block;
      position: absolute;
      left:50%;
      top:50%;
      width: .15rem;
      height: .02rem;
      background: #fff;
    }
    &:before{
      transform: translateX(-50%) rotate(45deg);
    }
    &:after{
      transform: translateX(-50%) rotate(-45deg);
    }
  }
}
.ui-header-back{
  height: .88rem;
  padding: 0 .3rem 0 .3rem;
  display: flex;
  align-items: center;
}
.ui-header-back_btn{
  position:relative;
  width: .26rem;
  height: .44rem;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAsCAMAAABMt1hMAAAAS1BMVEUAAAD/aQD/awD/Zwr/eQn/hgb/agD/aQD/aQD/bAD/cQb/aQD/bAD/agD/bAD/agD/YAD/aQD/Zgb/aQD/aQD/YwD/cQD/bQD/aQCzIa9cAAAAGHRSTlMA9IREFAyz6+N3NNm/opJsUiokzcZjV6ujvjAmAAAAmUlEQVQ4y63QSRaEIAxFUUQaARUbtLL/lVYy/5FjnXrTO0m++VuuUcXiT6KIpRFRgDKznB5REHGaFCgLy6TLgWRliTsSyzLokpEkkRFJJQ7KJbIhuUVuJJvIhWQUqVAGloQkY5EKizWwARzXeUmqD5bASL1pJduz/N7WjsX9vS1ih26TYp8HC2JOt6LYrJsXa0Y3o1gga37tC5M/D6HaFNTnAAAAAElFTkSuQmCC) no-repeat;
  background-size: .26rem auto;
}
</style>

