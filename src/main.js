import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store.js";
import { api } from "./ynab.js";
import storage from "@/storage.js";

Vue.config.productionTip = false;

Vue.prototype.$api = api;
Vue.prototype.$storage = storage;

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    store.dispatch("fetchBudgets");
    // fetch the budget id before trying any other request - budget id is required
    store.dispatch("fetchActiveBudgetId").then(() => {
      if (this.$store.getters.hasBudgetId) {
        store.dispatch("fetchPayees");
        store.dispatch("fetchCategories");
        store.dispatch("fetchAccounts");
      }
    });
  },
}).$mount("#app");
