<template>
  <div class="ui-empty">
    <img class="ui-empty-pic" :src="pic"/>
    <p class="c9">{{content}}</p>
  </div>  
</template> 

<script type="text/javascript">

  import config from '@/config/index'

  export default {  
    props: {
      pic: {
        type: String,
        default: config.staticPath + '/static/images/ui-empty-basic.png'
      },
      content: {
        type: String,
        default: '暂时没有任何数据呢'
      }
    }
  }
</script> 

<style lang="scss">
  .ui-empty-wrapper{
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    z-index:100;
  }
  .ui-empty{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ui-empty{
    display: flex;
    flex-direction: column;
    align-items: center;
    .ui-empty-pic{
      width: 2.98rem;
      height: 2.4rem;
    }
    p{
      padding-top: .16rem;
    }
  }
</style>