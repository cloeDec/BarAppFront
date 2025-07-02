// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CustomerList from "../components/CustomerList.vue";
import CocktailList from "../components/CocktailList.vue";
import Connection from "@/Page/Connection.vue";
import Login from "@/components/Login.vue";
import OrderCocktail from "@/components/OrderCocktail.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/customers",
    component: CustomerList,
  },
  {
    path: "/cocktails",
    name: "CocktailList",
    component: CocktailList,
  },
  {
    path: "/ordercocktail",
    name: "OrderCocktail",
    component: OrderCocktail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
