import Vue from 'vue'
import VueRouter from 'vue-router'
import utils from '@/widget/utils'

Vue.use(VueRouter)

export default new VueRouter({
  mode:'history',
  scrollBehavior(to,from,savePosition){ 
    if (savePosition) {
      return savePosition
    } else{
      return {x:0,y:0}
    }
  },
  routes: [
    {
      path: '*',
      name: 'PageError',
      component: () => import('@/views/error/404.vue'),
      meta: {
        title: '找不到页面',
        bgColor: '#61b8ff'
      }
    }, {
      path: '/',
      name: 'Home',
      component: () => import('@/views/index.vue'),
      meta: {
        title: '北京演唱会,话剧，体育赛事【订票】-票牛网'
      }
    }
  ]
})
