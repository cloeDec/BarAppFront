<template>
  <div>
    <h1>Coktail list</h1>
    <ul>
      <li v-for="cocktail in cocktail" :key="cocktail.cocktail_id">
        <p>{{ cocktail.cocktail_name }}</p>
        <p>{{ cocktail.description }}</p>
      </li>
    </ul>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cocktail: [],
      error: null,
    };
  },

  methods: {
    async fetchCocktail() {
      try {
        const response = await axios.get("http://localhost:8080/cocktails");
        this.cocktail = response.data;
      } catch (error) {
        this.error = "Erreur lors du chargement des cocktail.";
        console.error(error);
      }
    },
  },

  mounted() {
    this.fetchCocktail();
  },
};
</script>

<style>

</style>
