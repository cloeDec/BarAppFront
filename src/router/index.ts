// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CustomerList from "../components/CustomerList.vue";
import CocktailList from "../components/CocktailList.vue";
import Connection from "@/Page/Connection.vue";
import Login from "@/components/Login.vue";
import OrderCocktail from "@/components/OrderCocktail.vue";
import Panier from "@/components/Panier.vue";
import CarteBarmaker from "@/components/CarteBarmaker.vue";
import OrderDetails from "../components/OrderDetails.vue";

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
  {
    path: "/panier",
    name: "Panier",
    component: Panier,
  },
  {
    path: "/carte",
    name: "Carte",
    component: CarteBarmaker,
  },
  {
    path: "/ordercocktail/:id",
    name: "OrderDetails",
    component: OrderDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
