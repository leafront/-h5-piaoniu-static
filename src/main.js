import Vue from 'vue'
import App from './pages/index.vue'
import store from './store'
import filter from '@/filter'

Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
