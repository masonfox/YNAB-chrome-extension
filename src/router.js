import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Add Transaction',
    component: () => import('@/views/AddTransactionView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
