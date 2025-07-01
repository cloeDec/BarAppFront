<template>
  <div>
    <h1>Customerlist</h1>
    <ul>
      <li v-for="customer in customers" :key="customer.customer_id">
        <p>{{ customer.first_name }}</p>
        <p>{{ customer.name }}</p>
        <p>{{ customer.role }}</p>
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
      customers: [],
      error: null,
    };
  },

  methods: {
    async fetchCustomers() {
      try {
        const response = await axios.get("http://localhost:8080/customers");
        this.customers = response.data;
      } catch (error) {
        this.error = "Erreur lors du chargement des clients.";
        console.error(error);
      }
    },
  },

  mounted() {
    this.fetchCustomers();
  },
};
</script>

<style>

</style>
