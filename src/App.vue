<template>
  <div id="app">
    <NavCustomer v-if="isLoggedIn && !isLoginPage && userRole === 'CLIENT'" />
    <NavBarmaker v-if="isLoggedIn && !isLoginPage && userRole === 'BARMAKER'" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavCustomer from "./components/NavCustomer.vue";
import NavBarmaker from "./components/NavBarmaker.vue";
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
  components: { NavCustomer, NavBarmaker },
  setup() {
    const route = useRoute();
    return { route };
  },
  computed: {
    isLoggedIn(): boolean {
      return !!localStorage.getItem("token");
    },
    isLoginPage(): boolean {
      return this.route.path === "/";
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
