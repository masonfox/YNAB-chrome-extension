import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Add Transaction",
    component: () => import("@/views/AddTransactionView.vue"),
  },
  {
    path: "/budget/select",
    name: "Select Budget",
    component: () => import("@/views/SelectBudgetView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // TODO: auth route
  // has active budget
  store.dispatch("fetchActiveBudgetId").then(() => {
    if (to.name !== "Select Budget" && store.state.activeBudgetId == null) {
      next({ name: "Select Budget" });
    } else {
      next();
    }
  });
});

export default router;
