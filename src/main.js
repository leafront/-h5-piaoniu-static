import Vue from 'vue'
import Application from './App'
import router from './router'
import store from './store'
import utils from '@/widget/utils'
import filter from '@/filters'
import Toast from '@/components/toast'
import Loading from '@/components/loading'
import PageLoading from '@/components/pageLoading'
import showModal from '@/components/showModal'
import { sendTracker } from '@/widget/tracker'

Vue.use(showModal)
Vue.use(Toast)
Vue.use(Loading)
Vue.use(PageLoading)

Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

Vue.prototype.push = (url) => {
  router.push(url)
}

Vue.prototype.replace = (url) => {
  router.replace(url)
}

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requireLogin) &&
    process.env.NODE_ENV != 'develop'
  ) {

    next()
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
  const bgColor = to.meta.bgColor
  if (bgColor) {
    document.body.style.backgroundColor = bgColor
  } else {
    document.body.style.backgroundColor = '#fff'
  }
})

new Vue({
  router,
  store,
  render: h => h(Application)
}).$mount('#app')
