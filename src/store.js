import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api.js'
import storage from '@/storage.js'
import { isEmpty } from '@/utilities.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
    activeBudgetId: null,
    budgets: [],
    accounts: [],
    payees: [],
    categories: []
  },
  getters: {

  },
  mutations: {
    setActiveBudget(state, id) {
      state.activeBudgetId = id
      storage.set({ 'activeBudgetId': id })
    },
    setBudgets (state, payload) {
      state.budgets = payload
    },
    setAccounts (state, payload) {
      state.accounts = payload
    },
    setPayees (state, payload) {
      state.payees = payload;
    }
  },
  actions: {
    async fetchBudgets ({ commit }) {
        const response = await api.budgets.getBudgets()
        console.log(response.data.budgets)
        commit('setBudgets', response.data.budgets)
        // storage.set({ budgets: response.data.budgets })
    },
    async fetchActiveBudgetId ({ commit }) {
      const response = await storage.get('activeBudgetId')
      if (!isEmpty(response)) {
        console.log(`ACTIVE BUDGET ID ${response.activeBudgetId}`)
        commit('setActiveBudget', response.activeBudgetId)
      } else {
        console.warn('NO ACTIVE BUDGET ID')
      }
    },
    async fetchAccounts ({ commit, state }) {
      const response = await api.accounts.getAccounts(state.activeBudgetId)
      commit('setAccounts', response.data.accounts)
    },
    async fetchPayees ({ commit, state }) {
      const response = await api.payees.getPayees(state.activeBudgetId)
      commit('setPayees',  response.data.payees)
    }
  }
})
