import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/ynab.js";
import storage from "@/storage.js";
import { isEmpty } from "@/utilities.js";
// import { budgets, payees, accounts } from "@/data.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null,
    activeBudgetId: null,
    accountId: null,
    accounts: [],
    payees: [],
    categoryGroups: [],
    categories: [],
    slideouts: {
      information: false,
      settings: false,
    },
  },
  getters: {
    hasBudgetId(state) {
      return state.activeBudgetId !== null;
    },
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
    getCategoryById: (state) => (id) => {
      return state.categories.find((category) => category.id == id);
    },
    getCategoryGroupById: (state) => (id) => {
      return state.categoryGroups.find(
        (categoryGroup) => categoryGroup.id == id
      );
    },
    getPayeeById: (state) => (id) => {
      return state.payees.find((payee) => payee.id == id);
    },
    getAccountById: (state) => (id) => {
      return state.accounts.find((account) => account.id == id);
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
      console.log("payload", payload);
      let categoryGroups = [];
      let categories = [];

      // always remove "first" category group
      // payload.shift()

      // flatten the payload
      payload.forEach((categoryGroup) => {
        if (!categoryGroup.hidden && !categoryGroup.deleted) {
          categories = categories.concat(categoryGroup.categories);
          delete categoryGroup.categories;
          categoryGroups.push(categoryGroup);
        }
      });

      console.log("category groups", categoryGroups);
      console.log("categories", categories);
      state.categoryGroups = categoryGroups;
      state.categories = categories;
    },
    setPayees(state, payload) {
      state.payees = payload;
    },
    toggleSlideout(state, key) {
      state.slideouts[key] = !state.slideouts[key];
    },
    setAccountId(state, val) {
      state.accountId = val;
    },
  },
  actions: {
    async fetchToken() {
      return;
    },
    async fetchBudgets({ commit }) {
      const response = await api.budgets.getBudgets();
      commit("setBudgets", response.data.budgets);
      storage.set({ budgets: response.data.budgets });
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

      // override the "Internal Master Category" and hide it
      response.data.category_groups[0]["hidden"] = true;

      commit("setCategories", response.data.category_groups);
    },
    async fetchPayees({ commit, state }) {
      const response = await api.payees.getPayees(state.activeBudgetId);
      commit("setPayees", response.data.payees);
    },
  },
});
