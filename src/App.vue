<template>
  <div id="app">
    <NavCustomer v-if="isLoggedIn && !isLoginPage" />
    <CocktailList v-if="userRole === 'CLIENT'" />
    <OrderCocktail v-else-if="userRole === 'BARMAKER'" />
    <router-view v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavCustomer from "./components/NavCustomer.vue";
import CocktailList from "./components/CocktailList.vue";
import OrderCocktail from "./components/OrderCocktail.vue";
import { useRoute } from "vue-router";

function getRoleFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return null;
  }
}

export default defineComponent({
  name: "App",
  components: { NavCustomer, CocktailList, OrderCocktail },
  setup() {
    const route = useRoute();
    return { route };
  },
  computed: {
    isLoggedIn(): boolean {
      return !!localStorage.getItem("token");
    },
    isLoginPage(): boolean {
      // Adapte selon le nom de ta route de connexion
      return this.route.path === "/" || this.route.path === "/login";
    },
    userRole() {
      return getRoleFromToken();
    },
  },
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  color: rgba(255, 255, 255, 1);
  background: rgba(31, 23, 20, 1);
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
