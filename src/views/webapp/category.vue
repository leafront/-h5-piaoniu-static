<template>
  <div class="pageView">
    <div class="category_header" id="category_header">
      <div class="category_location" @click="areaAction" v-if="areaInfo">
        <span class="font-s ui-ellipsis">{{areaInfo}}</span>
        <i></i>
      </div>  
      <div class="category_form" @click="searchAction()">
        <i></i>
        <span>搜索来伊份</span>
      </div>
      <div class="category_message" @click="loggedInAction('/message/message-center.html')">
        <i></i>
      </div>  
    </div>  
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="category_cont">
        <div id="category_tab" class="category_tab_wrapper" :style="{'height': scrollHeight + 'px'}">
          <div class="category_tab">
            <div class="category_tab--item" :class="{'active': categoryId == 0}" @click="selectCategory(0,0)">
              <i></i>
              <span class="c3 font-s">伊仔推荐</span>
            </div>  
            <div class="category_tab--item" :class="{'active': categoryId == item.categoryId}" @click="selectCategory(index + 1,item.categoryId)" v-for="(item,index) in hosList">
              <img :src="item.pictureUrl">
              <span class="c3 font-s">{{item.categoryName}}</span>
            </div>  
          </div>  
        </div>
          <div class="category_shop_wrapper" id="category_shop" :style="{'height': scrollHeight + 'px'}">
            <div class="category_shop" v-if="categoryId == 0">
              <div class="category_shop--title">
                <span class="c3 font">{{title_hot_product}}</span>
              </div>  
              <div class="category_shop--wrapper">
                <div class="category_shop--item" v-for="item in hot_product">
                  <div class="category_img__wrapper" @click="pageAction(item.linkUrl)">
                    <div :style="{'backgroundImage':'url('+item.imageUrl+')','backgroundRepeat': 'no-repeat','backgroundSize': '100% auto'}" class="category_shop_img successImg pic-lazyLoad">
                    </div>
                  </div>  
                  <p>{{item.name}}</p>
                </div>
              </div>    
              <div class="category_shop--title category_shop--noPadd">
                <span class="c3 font">{{title_common_product}}</span>
              </div> 
              <div class="category_shop--wrapper">
                <div class="category_shop--item" :key="item.id" v-for="item in common_product">
                  <div class="category_img__wrapper" @click="pageAction(item.linkUrl)">
                    <div :style="{'backgroundImage':'url('+item.imageUrl+')','backgroundRepeat': 'no-repeat','backgroundSize': '100% auto'}" class="category_shop_img successImg pic-lazyLoad">
                    </div>
                  </div>  
                  <p>{{item.name}}</p>
                </div>
              </div>
            </div> 
            <div class="category_shop" id="categroy-scroll" v-else>
              <LazyLoad :list="goodsList" :options="{ele:'pic-lazyLoad',scrollEle: 'categroy-scroll'}">
                <div class="category_shop_list" :key="item.categoryId" v-for="(item,index) in goodsList">
                  <div class="category_shop--title" :class="{'category_shop--noPadd': index !== 0}">
                    <span class="c3 font">{{item.categoryName}}</span>
                  </div>  
                  <div class="category_shop--wrapper">
                    <div class="category_shop--item" v-for="child in item.children">
                      <div class="category_img__wrapper" @click="searchAction(child.categoryId)">
                        <div :data-src="child.pictureUrl | httpsImg" class="category_shop_img pic-lazyLoad"></div>
                      </div> 
                      <p>{{child.categoryName}}</p>
                    </div>
                  </div>  
                </div>    
               </LazyLoad>          
            </div>
          </div>  
      </div>  
    </div> 
    <AppFooter></AppFooter> 
  </div>
</template>

<script type="text/javascript">
  
  import AppHeader from '@/components/common/header'
  import AppFooter from '@/components/common/footer'
  import * as Model from '@/model/category'
  import common from '@/widget/common'
  import utils from '@/widget/utils'
  import IScroll from 'better-scroll'
  import store from '@/widget/store'
  import app from '@/widget/app'
  import LazyLoad from '@/components/widget/lazyLoad'

  export default {
    data () {
      return {
        pageView: false,
        hosList: [],
        hot_product: [],
        common_product: [],
        title_common_product: '',
        title_hot_product: '',
        goodsList: [],
        categoryId: 0,
        scrollHeight: 1100,
        categoryItemHeight: 0,
        scroll: null,
        areaInfo: ''
      }
    },
    components: {
      AppHeader,
      AppFooter,
      LazyLoad
    },
    watch: {
      hosList (val) {
        const iscroll = new IScroll('#category_tab', {
          scrollX: false,
          probeType: 1,
          click: true
        })

      }
    },
    methods: {
      areaAction () {
        const from = window.encodeURIComponent('/webapp/category')
        this.$router.push(`/webapp/city?from=${from}`)
      },
      searchAction (categoryId) {
        let url = '/webapp/search'
        if (categoryId) {
          url += `?categoryId=${categoryId}`
        }
        this.$router.push(url)
      },
      pageAction (url) {
        if (url) {
          location.href = url
        }
      },
      /**
       * 获取用户定位信息
       */
      getCurrentAreaInfo () {
        const areaInfo = store.get('areaInfo', 'local')
        if (areaInfo) {
          this.areaInfo = areaInfo.province.name
        } else {
          common.getAreaInfo().then((result) => {
            const {
              provinceName,
              provinceCode,
              cityName,
              cityCode,
              regionName,
              regionCode
            } = result
            const setAreaInfo = {
              province: {
                name: provinceName,
                code: provinceCode
              },
              city: {
                name: cityName,
                code: cityCode
              },
              region: {
                name: regionName,
                code: regionCode
              }
            }
            this.areaInfo = provinceName
            store.set('areaInfo', setAreaInfo, 'local')
          })
        }
      },
      loggedInAction (url) {
        app.loggedInAction(url)
      },
      /**
       * 根据分类id查询列表
       * @param  {Number} index    
       * @param  {Number} categoryId 
       */
      selectCategory (index, categoryId) {
        if (categoryId !== this.categoryId) {
          if (this.iscroll) {
            this.iscroll.refresh()
          }
          if (categoryId == 0) {
            this.$router.replace('/webapp/category')
            this.getCategoryGoodsHot()
          } else {
            this.$router.replace(`/webapp/category?id=${categoryId}`)
            this.getCategroyGoods(categoryId)
          }
        }
        this.categoryId = categoryId
      },
      initScrollView () {
        const iscroll = new IScroll('#category_shop', {
          scrollX: false,
          probeType: 1,
          click: true
        })
        this.iscroll = iscroll
        iscroll.on('scrollEnd', () => {
          iscroll.refresh()
        })
      },
      /**
       * 获取分类列表
       */
      getCategoryList () {
        Model.getCategoryList({
          type: 'GET',
          cache: true,
          data: {
            parentId: 0,
            level: 1
          }
        }).then((result) => {
          const data = result.data
          if (result.code == 0 && data) {
            const {
              categorys
            } = data
            if (categorys && categorys.length) {
              this.hosList = categorys
            }
          } 
        })
      },
      /**
       *  获取推荐商品列表
       * @return {[type]} [description]
       */
      getCategoryGoodsHot () {
        Model.getCategoryGoods({
          type: 'GET',
          cache: true,
          data: {
            pageCode: 'H5_CATEGORY_PAGE',
            adCode: 'title_hot_product,hot_product,title_common_product,common_product',
            areaCode: common.getAreaCode().areaCode
          }
        }).then((result) => {
          const data = result.data
          this.$hideLoading()
          if (result.code == 0 && data) {
            this.pageView = true
            const {
              title_common_product,
              title_hot_product,
              common_product,
              hot_product
            } = data
            if (title_common_product && title_common_product.length) {
              this.title_common_product = title_common_product[0].title
            }
            if (title_hot_product && title_hot_product.length) {
              this.title_hot_product = title_hot_product[0].title
            }
            if (common_product && common_product.length) {
              this.common_product = common_product
            }
            if (hot_product && hot_product.length) {
              this.hot_product = hot_product
            }
            this.initScrollView()
          }
        })
      },
      /**
       * 获取分类商品列表
       * @param  {Number} categoryId
       */
      getCategroyGoods (categoryId) {
        Model.getCategoryList({
          type: 'GET',
          data: {
            parentId: categoryId,
            level: 2
          }
        }).then((result) => {
          const data = result.data
          this.$hideLoading()
          if (result.code == 0 && data) {
            this.pageView = true
            const {
              categorys
            } = data
            if (categorys && categorys.length) {
              this.goodsList = categorys
              this.initScrollView()
            }
          } else {
            this.$toast(result.message)
          }
        })
      }
    },
    created () {
      const id = utils.query('id')
      if (id) {
        this.categoryId = id
        this.getCategroyGoods(id)
      } else {
        this.getCategoryGoodsHot()
      }
      this.$showLoading()
      this.getCategoryList()
      this.getCurrentAreaInfo()
    },
    mounted () {
      this.$nextTick(() => {
        const categoryHeader = document.getElementById('category_header').offsetHeight
        const footerWrapper = document.getElementById('footer_wrapper').offsetHeight
        const scrollHeight = window.innerHeight - categoryHeader - footerWrapper
        this.scrollHeight = scrollHeight
      })
    }
  }

</script>


<style lang="scss">
.category_cont{
  height: 100%;
  border-top: .01rem solid #e0e0e0;
  margin-top: .88rem;
}
.category_shop_wrapper{
  overflow-y: hidden;
  margin-left: 1.8rem;
}
.category_tab_wrapper{
  overflow-y: hidden;
  width: 1.8rem;
  float: left;
  background: #fff;
}
.category_tab{
  &--item{
    padding: .16rem 0;
    position: relative;
    border-bottom: .01rem solid #e0e0e0;
    &:last-child{
      border-bottom: 0;
    }
    i{
      width: .32rem;
      height: .32rem;
      background: url(./images/category_sprite.png) no-repeat -.79rem -.03rem;
      background-size: 1.14rem auto;
      display: block;
      margin: 0 auto;
    }
    img{
      width: .32rem;
      height: .32rem;
      background-size: 100% auto;
      background-color: #fff;
      display: block;
      margin: 0 auto;
    }
    span{
      padding-top: .15rem;
      text-align: center;
      display: block;
    }
    &.active{
      background: #fafafa;
      &:before{
        content: '';
        width: .04rem;
        height: 100%;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        background: #ff6900;
      }
      span{
        color: #ff6900;
      }
    }
  }
}
.category_img__wrapper{
  padding: .2rem .2rem .2rem;
  background: #fff;
  .category_shop_img{
    width: 100%;
    padding-top: 100%;
   }
}
.category_shop{
  width: 100%;
  padding-right: .2rem;
  &--wrapper{
    overflow: hidden;
  }
  &--item{
    float: left;
    width: 33.3%;
    padding-left: .2rem;
    padding-bottom: .2rem;
    p{
      background: #fff;
      text-align: center;
      padding-bottom: .2rem;
    }
  }
  &--noPadd{
    margin-top: -.2rem;
  }
  &--title{
    padding-left: .2rem;
    height: .8rem;
    display: flex;
    align-items: center;
    font-weight: bold;
  }
}
.category_header{
  width: 100%;
  height: .88rem;
  display: flex;
  align-items: center;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.category_message{
  padding: 0 .2rem;
  display: flex;
  height: .88rem;
  align-items: center;
  i{
    width: .4rem;
    height: .4rem;
    background: url(./images/category_sprite.png) no-repeat -.02rem 0;
    background-size: 1.14rem auto;
  }
}
.category_form{
  display: flex;
  flex: 1;
  background: #f5f5f5;
  border-radius: .08rem;
  width: 2.6rem;
  height: .6rem;
  align-items: center;
  padding-left: .2rem;
  i{
    width: .3rem;
    height: .3rem;
    background: url(./images/category_sprite.png) no-repeat -.45rem -.04rem;
    background-size: 1.14rem auto;

  }
  span{
    padding-left: .1rem;
  }
}
.category_location{
  padding: 0 .25rem;
  height: .88rem;
  display: flex;
  align-items: center;
  justify-content: center;
  span{
    max-width: .8rem;
  }
  i{
    display: block;
    width: .12rem;
    height: .12rem;
    border-left: .02rem solid #666;
    border-bottom: .02rem solid #666;
    transform: rotate(-45deg);
    transform-origin: center center;
    position: relative;
    top: -.03rem;
    margin-left: .1rem;
  }
}
</style>


