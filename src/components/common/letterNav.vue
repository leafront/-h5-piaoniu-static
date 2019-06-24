<template>
  <div class="letterNav" @touchstart="tocuhstartNav($event)" @touchmove="touchmoveNav($event)" @touchend="touchendNav">
    <span class="font" v-for="item in list">{{item}}</span>   
  </div>    
</template> 
<script type="text/javascript">

  import utils from '@/widget/utils'

  export default {
    data () {
      return {
        showTop: 0,
        timer: null,
        ticking: false
      }
    },
    props: {
      list: {
        type: Array,
        default: []
      },
      childEleId: {
        type: String,
        default: ''
      }
    },
    methods: {
      tocuhstartNav (event) {
        event.preventDefault()
      },
      touchmoveNav (event) {
        this.scrollList(event)
      },
      touchendNav (event) {
        this.scrollList(event)
        setTimeout(() => {
          this.$emit('changeLetterId', '')
        },1200)
      },
      scrollList (event) {
        const realFunc = () => {
          this.scrollIntoView(event)
          this.ticking = false
        }
        if(!this.ticking) {
          this.timer = requestAnimationFrame(realFunc)
          this.ticking = true
        }
      },
      scrollIntoView (event) {
        const childEleHeight = document.querySelector('.letterNav span').offsetHeight
        const eleRectTop = document.querySelector('.letterNav').getBoundingClientRect().top
        const pointTop = event.changedTouches[0].clientY - eleRectTop
        const pointOffetHeight = pointTop % childEleHeight
        const index = Math.floor(pointTop / childEleHeight)
        const childEleId = this.list[index]
        if (this.childEleId !== childEleId && index >= 0 && pointOffetHeight > childEleHeight / 6 && pointTop <= window.innerHeight - eleRectTop){
          if (childEleId) {
            this.$emit('changeLetterId', childEleId)
            this.clickToView(childEleId)
          }
        }
      },
      clickToView (childEleId) {
        const uiHeader = document.querySelector('.ui-header')
        let uiHeaderHeight = 0
        if (uiHeader) {
          uiHeaderHeight = uiHeader.offsetHeight
        }
        const offsetTop = document.getElementById('letter-'+childEleId).getBoundingClientRect().top
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        document.documentElement.scrollTop = document.body.scrollTop = offsetTop + scrollTop - uiHeaderHeight
      }
    }
  }
</script> 

<style lang="scss">
  .letterNav{
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    padding-left: .3rem;
    span{
      width: .7rem;
      height: .5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #808080;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
</style>  