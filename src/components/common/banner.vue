<template>
  <swiper :list="list" :preventDefault="preventDefault" :index="index" :itemWidth="wrapperWidth" @toggleIndex="toggleIndex" :style="{'height':itemHeight}">
    <ul slot="banner" class="slideshow-item" :style="{'height':itemHeight}">
      <li v-for="item in list" :style="{'width':itemWidth}" @click="pageAction(item.url)">
        <img :src="item.poster" :style="{'width':itemWidth, 'height':itemHeight}">
      </li>
    </ul>
    <ul slot="dot" class="slideshow-dots">
      <li v-for="(item,$index) in bannerList" :class="{'active':$index == index-1}"></li>
    </ul>
  </swiper>
</template>
<script>

  import swiper from '@/components/widget/swiper.vue'
  const itemWidth = document.documentElement.clientWidth * .92

  export default {
    data () {
      return {
        index: 1,
        wrapperWidth: itemWidth ,
        itemWidth: itemWidth + 'px',
        itemHeight: '2.08rem',
      }
    },
    props: {
      bannerList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components:{
      swiper
    },
    computed: {
      list () {
        const list = Object.assign([],this.bannerList)
        if (list && list.length) {
          const len = list.length
          const firstEl = list[len - 1]
          const lastEl = list[0]
          list.unshift(lastEl)
          list.push(firstEl)
        }
        return list
      }
    },
    methods: {
      pageAction (url) {
        if (url) {
          location.href = url
        }
      },
      toggleIndex (val) {
        this.index = val
      }
    }
  }
</script>



