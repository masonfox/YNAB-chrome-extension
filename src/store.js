import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/ynab.js";
import storage from "@/storage.js";
import { isEmpty } from "@/utilities.js";
import { budgets, payees, accounts, categories } from "@/data.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null,
    activeBudgetId: null,
    budgets,
    accounts,
    payees,
    categories,
    slideouts: {
      information: false,
      settings: false,
    },
  },
  getters: {
    currentPayees(state) {
      // YNAB has a "deleted" key that can be true or false for payees
      return state.payees.filter((payee) => {
        return payee.deleted == false;
      });
    },
    currentCategories(state) {
      // YNAB has a "deleted" and "hidden" key that can be true or false for categories
      return state.categories.filter((category) => {
        return category.deleted == false && category.hidden == false;
      });
    },
    getPayeeById: (state) => (id) => {
      return state.payees.find((payee) => payee.id == id);
    },
    getAccountById: (state) => (id) => {
      return state.accounts.find((account) => account.id == id);
    },
    getCategoryById: (state) => (id) => {
      return state.categories.find((category) => category.id == id);
    },
  },
  mutations: {
    setActiveBudget(state, id) {
      state.activeBudgetId = id;
      storage.set({ activeBudgetId: id });
    },
    setBudgets(state, payload) {
      state.budgets = payload;
    },
    setAccounts(state, payload) {
      state.accounts = payload;
    },
    setCategories(state, payload) {
      state.categories = payload;
    },
    setPayees(state, payload) {
      state.payees = payload;
    },
    toggleSlideout(state, key) {
      state.slideouts[key] = !state.slideouts[key];
    },
  },
  actions: {
    async fetchToken() {
      return;
    },
    async fetchBudgets() {
      const response = await api.budgets.getBudgets();
      console.log(response);
      // commit("setBudgets", response.data.budgets);
      // storage.set({ budgets: response.data.budgets })
    },
    async fetchActiveBudgetId({ commit }) {
      const response = await storage.get("activeBudgetId");
      if (!isEmpty(response)) {
        console.info(
          `Active Budget ID: %c${response.activeBudgetId}`,
          "background-color: blue"
        );
        commit("setActiveBudget", response.activeBudgetId);
      } else {
        console.warn("NO ACTIVE BUDGET ID");
      }
    },
    async fetchAccounts({ commit, state }) {
      const response = await api.accounts.getAccounts(state.activeBudgetId);
      commit("setAccounts", response.data.accounts);
    },
    async fetchCategories({ commit, state }) {
      const response = await api.categories.getCategories(state.activeBudgetId);
      commit("setCategories", response.data.categories);
    },
    async fetchPayees({ commit, state }) {
      const response = await api.payees.getPayees(state.activeBudgetId);
      commit("setPayees", response.data.payees);
    },
  },
});
