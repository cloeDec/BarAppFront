<template>
  <div v-for="order in orderCocktails" :key="order.order_id" class="order-card">
    <p>Commande n°{{ order.order_id }} - {{ order.order_status }}</p>
    <p>Date : {{ order.order_date }}</p>
    <!-- Ajoute d'autres champs si besoin -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orderCocktails: [],
      error: null,
    };
  },
  methods: {
    async fetchOrderCocktails() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/ordercocktail",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        this.orderCocktails = response.data;
      } catch (error) {
        this.error = "Erreur lors du chargement des commandes.";
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchOrderCocktails();
  },
};
</script>

<style>
/* No changes to style section */
</style>
