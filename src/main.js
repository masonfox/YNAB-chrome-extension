import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import api from './api.js'

Vue.config.productionTip = false

Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    store.dispatch('fetchBudgets')
  }
}).$mount('#app')
