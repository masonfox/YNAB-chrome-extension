import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import api from './api.js'
import storage from '@/storage.js'

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.$storage = storage

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    store.dispatch('fetchBudgets')
  }
}).$mount('#app')
