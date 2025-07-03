<template>
  <div>
    <div
      v-for="order in orderCocktails"
      :key="order.order_id"
      class="order-card"
      @click="goToOrderDetails(order.order_id)"
      style="cursor: pointer"
    >
      <p>Commande n°{{ order.order_id }} - {{ order.order_status }}</p>
      <p>Date : {{ order.order_date }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

interface OrderCocktail {
  order_id: number;
  order_date: string;
  order_status: string;
  customer_id: string;
}

const orderCocktails = ref<OrderCocktail[]>([]);
const error = ref<string | null>(null);
const router = useRouter();

const fetchOrderCocktails = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<OrderCocktail[]>(
      "http://localhost:8080/ordercocktail",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    orderCocktails.value = response.data;
  } catch (err) {
    error.value = "Erreur lors du chargement des commandes.";
    console.error(err);
  }
};

const goToOrderDetails = (id: number) => {
  router.push({ name: "OrderDetails", params: { id } });
};

onMounted(fetchOrderCocktails);
</script>

<style scoped>
.order-card {
  background: #f7e7d7;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(80, 50, 20, 0.08);
  padding: 18px 22px;
  margin: 18px auto;
  max-width: 420px;
  color: #231915;
  font-family: "Segoe UI", Arial, sans-serif;
  transition: box-shadow 0.2s, transform 0.2s;
  border-left: 6px solid #ff7a2f;
}

.order-card:hover {
  box-shadow: 0 6px 24px rgba(80, 50, 20, 0.18);
  transform: translateY(-2px) scale(1.02);
}

.order-card p {
  margin: 0 0 8px 0;
  font-size: 1.08rem;
}

.order-card p:first-child {
  font-weight: 600;
  color: #ff7a2f;
  margin-bottom: 6px;
}

.order-card p:last-child {
  color: #7a5c3a;
  font-size: 0.98rem;
}

@media (max-width: 600px) {
  .order-card {
    padding: 14px 8vw;
    max-width: 98vw;
  }
}
</style>
