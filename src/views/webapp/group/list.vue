<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
      <div class="ui-header-right-icon" @click="toggleMenu">
        <i :class="{'active': headerMenu}"></i>
      </div>
    </AppHeader>
    <div class="scroll-view-wrapper" id="activity-group-scroll" :class="{'visibility': pageView}">
      <Banner :bannerList="bannerList"></Banner>
      <UIHeaderNav></UIHeaderNav>
      <div class="group-share-title">
        <div class="group-title">
          <div class="group-title-txt"><strong>今日</strong><i>必拼</i><span>HOT</span></div>
          <p>每日必逛</p>
        </div>
      </div>
      <div class="group-hot">
        <div class="group-hot-item" v-for="item in goodsHot" @click="pageAction(item.link.data)">
          <img class="group-hot-pic pic-lazyLoad" :src="item.imgUrl"/>
        </div>
      </div>
      <LazyLoad :list="goodsList" :options="{ele:'pic-lazyLoad', scrollEle: 'activity-group-scroll'}">
        <div class="group-shop">
          <ul class="group-shop-list">
            <li v-for="item in goodsList" @click="pageAction(item.h5Link)">
              <div class="goods_pic pic-lazyLoad" :data-src="item.pic"></div>
              <div class="group-shop-item">
                <span class="group-shop-name">{{item.mpName}}</span>
                <p>已拼{{item.volume4sale}}件</p>
                <div class="group-shop-tag">
                  <span>{{item.iconTexts[0]}}</span>
                  <span>{{item.groupMembers}}人团</span>
                </div>
                <div class="group-shop-des">
                  <p>￥{{item.grouponPrice | price}}<strong class="c9">￥{{item.salePrice | price}}</strong></p>
                  <div class="group-info-button">
                    <span>去拼团</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </LazyLoad>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'
  import utils from '@/widget/utils'
  import app from '@/widget/app'
  import Banner from '@/components/common/banner'
  import UIShare from '@/components/widget/ui-share'
  import UIHeaderNav from '@/components/common/header_nav'
  import LazyLoad from '@/components/widget/lazyLoad'
  import * as Model from '@/model/group'
  import config from '@/config/index'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data () {
     return {
       title: '伊起拼',
       isBorder: true,
       pageView: false,
       bannerList: [],
       goodsList: [],
       goodsHot: [],
       shareConfig: null
     }
    },
    components: {
      AppHeader,
      Banner,
      UIHeaderNav,
      UIShare,
      LazyLoad
    },
    computed: {
      ...mapGetters({
        'headerMenu': 'getHeaderMenu'
      })
    },
    methods: {
      ...mapActions([
        'updateHeaderMenu',
        'updateShareMenu'
      ]),
      backAction () {
        if (utils.isApp()) {
          location.href = 'lyf://home'
        } else {
          location.href = '/index.html'
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
       * 获取商品列表
       */
      getGoodsList (moduleId) {

        return Model.getGoodsList({
          type: 'GET',
          cache: true,
          data: {
            pageNo: 1,
            pageSize: 50,
            moduleId
          }
        }).then((result) => {

          const data = result.data
          if (result.code == 0 && data) {

            if (data.obj && data.obj.refDataList) {
              const goodsList = data.obj.refDataList
              this.goodsList = goodsList
            }
          } else {
            this.$toast(result.message)
          }
          return result

        })
      },
      getModuleList () {

        return Model.getModuleList({
          type: 'GET',
          cache: true,
          data: {
            pageId: config.pageId
          }
        }).then((result) => {

          const data = result.data

          if (result.code == 0 && data) {
            let listId = ''
            data.dataList.forEach((item) => {

              if (item.templateCode == 'slider') {
                if (item.staticData && item.staticData.images) {
                  const bannerList = item.staticData.images
                  bannerList.forEach((child) => {
                    child.imageUrl = child.src
                    child.linkUrl = child.url
                  })
                  this.bannerList = bannerList
                }
              }
              if (item.templateCode == 'cube') {
                if (item.staticData.cdata && item.staticData.cdata.children)
                  this.goodsHot = item.staticData.cdata.children
              }

              if (item.templateCode == 'pintuan') {

                listId = item.moduleId
              }
            })
            this.setShareInfo(data.pageInfo)
            if (listId) {
              this.getGoodsModules(listId)
            }
          } else {
            this.$toast(result.message)
          }
          return result
        })
      },
      getGoodsModules (listId) {
        Promise.all([
          this.getGoodsList(listId)
        ]).then((result) => {
          if (result) {
            let isSendSuccess = result.every((item) => {
              return item.code == 0
            })
            if (isSendSuccess) {
              this.pageView = true
              this.$hideLoading()
            }
          }
        })
      },
      pageAction (url) {
        location.href = url
      },
      setShareInfo (config) {
        const link = location.href
        this.shareConfig = {
          link: link,
          url: link,
          title: config.shareTitle,
          desc: config.shareDesc,
          description: config.shareDesc,
          imgUrl: config.shareImg,
          pic: config.shareImg
        }
      }
    },
    created ()  {
      this.$showLoading()
      this.getModuleList()
    }
  }

</script>


<style lang="scss">
  .group-hot {
    display: flex;
    background: #fff;
  }
  .group-hot-item{
    flex:1;
    .group-hot-pic{
      width:100%;
      height:5.12rem;
    }
  }
  .group-shop {
    padding: 0.16rem 0.3rem 0;
    background: #fff;
  }
  .group-shop-list {
    li {
      display: flex;
      align-items: center;
      border-bottom: 0.01rem solid #ddd;
      padding: 0.32rem 0;
      &:last-child {
        border-bottom: 0;
      }
      &:first-child {
        padding-top: 0;
      }
      .goods_pic {
        width: 2.3rem;
        height: 2.3rem;
        background-size: 2.3rem auto;
      }
    }
  }
  .group-shop-item {
    padding-left: 0.48rem;
    flex: 1;
    .group-shop-name {
      font-size: 0.28rem;
      color: #333;
      line-height: 0.45rem;
    }
    p {
      color: #999;
      line-height: .45rem;
    }
  }
  .group-shop-des {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: .1rem;
    p {
      font-size: 0.36rem;
      color: #ff7c00;
    }
    strong {
      text-decoration: line-through;
      padding-left: 0.1rem;
      font-size: .24rem;
    }
    .group-shop-tag {
      padding-top: .1rem;
      display: flex;
      span {
        margin: 0.14rem 0;
        padding: 0 0.07rem;
        text-align: center;
        border: 1px solid #ff7200;
        height: 0.26rem;
        font-size: 0.2rem;
        line-height: 0.26rem;
        color: #ff7200;
        &:first-child {
          margin-right: 0.15rem;
        }
      }
    }
    .group-info-button {
      position: absolute;
      right: 0;
      bottom: 0;
      height: 0.56rem;
      padding: 0 0.22rem;
      display: flex;
      align-items: center;
      background: linear-gradient(to right, #ffaa2b, #ff6a22);
      border-radius: 0.3rem;
      margin-left: 0.2rem;
      justify-content: center;
      span {
        font-size: 0.28rem;
        color: #fff;
      }
    }
  }

  .group-share-title{
    display:flex;
    background: #fff;
  }

  .group-title{
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: .76rem;
    align-items: center;
    padding: 0 .3rem;
    P{
      color:#999;
    }
  }
  .group-title-txt{
    font-size: .32rem;
    strong{
      color: #333;
    }
    i {
      color:#FF6D00;
    }
    span{
      color:#999;
      padding-left: .1rem;
    }
  }

</style>
