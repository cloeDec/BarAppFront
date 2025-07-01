// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CustomerList from "../components/CustomerList.vue";
import CocktailList from "../components/CocktailList.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: CustomerList,
  },
  {
    path: "/customers",
    component: CustomerList,
  },
  {
    path: "/cocktails",
    component: CocktailList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
