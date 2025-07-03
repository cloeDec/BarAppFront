<template>
  <div>
    <h1>Liste des clients</h1>
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

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";

interface Customer {
  customer_id: number;
  first_name: string;
  name: string;
  role: string;
}

const customers = ref<Customer[]>([]);
const error = ref<string | null>(null);

const fetchCustomers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<Customer[]>(
      "http://localhost:8080/customers",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    customers.value = response.data;
  } catch (err) {
    error.value = "Erreur lors du chargement des clients.";
    console.error(err);
  }
};

onMounted(fetchCustomers);
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  background: #f7e7d7;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(80, 50, 20, 0.08);
  padding: 14px 18px;
  margin: 14px auto;
  max-width: 420px;
  color: #231915;
  font-family: "Segoe UI", Arial, sans-serif;
  margin-bottom: 12px;
}
li p {
  margin: 0 0 6px 0;
  font-size: 1.08rem;
}
li p:last-child {
  color: #7a5c3a;
  font-size: 0.98rem;
}
h1 {
  text-align: center;
  margin-bottom: 18px;
  color: #231915;
}
</style>
