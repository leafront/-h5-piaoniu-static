import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import filter from '@/filter'

Vue.use(ShowModal)
Vue.use(Toast)
Vue.use(Loading)
Vue.use(DownloadApp)

Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

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
  render: h => h(App)
}).$mount('#app')
