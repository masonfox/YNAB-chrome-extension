import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
    budgets: [],
    accounts: {},
    payees: {},
    categories: []
  },
  getters: {

  },
  mutations: {
    setBudgets (state, payload) {
      state.budgets = payload
    },
    setAccounts (state, payload) {
      state.accounts = payload
    },
    setPayees (state, payload) {
      state.payees = payload;
      console.log(state)
    }
  },
  actions: {
    async fetchBudgets ({ dispatch, commit }) {
        const response = await api.budgets.getBudgets()
        commit('setBudgets', response.data.budgets)
        // now that we have budgets, fetch all of the accounts
        dispatch('fetchAccounts')
        dispatch('fetchPayees')
    },
    async fetchAccounts ({ commit, state }) {
      let accounts = {}
      state.budgets.forEach(async budget => {
        const response = await api.accounts.getAccounts(budget.id)
        accounts[budget.id] = response.data.accounts
      })
      commit('setAccounts', accounts)
    },
    async fetchPayees ({ commit, state }) {
      let payees = {}
      state.budgets.forEach(async budget => {
        const response = await api.payees.getPayees(budget.id)
        payees[budget.id] = response.data.payees
      })
      commit('setPayees', payees)
    }
  }
})
