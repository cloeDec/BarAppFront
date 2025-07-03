<template>
  <div v-if="order">
    <h2>Détail de la commande n°{{ order.order_id }}</h2>
    <p>Date : {{ order.order_date }}</p>
    <p>Status : {{ order.order_status }}</p>
    <p>Client : {{ order.customer_id }}</p>

    <div v-if="order.orderLines && order.orderLines.length">
      <h3>Lignes de commande :</h3>
      <ul>
        <li
          v-for="line in order.orderLines"
          :key="line.order_line_id"
          class="order-line"
        >
          <strong>{{ line.cocktail_name }}</strong> : (Quantité :
          {{ line.quantity }}, Statut : {{ line.line_cocktail_status }})
          <ul v-if="line.ingredients && line.ingredients.length">
            <li
              v-for="ing in line.ingredients"
              :key="ing.ingredient_id"
              class="ingredient"
            >
              - {{ ing.ingredient_name }} ({{ ing.quantity }})
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <p>Chargement...</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

interface Cocktail {
  cocktail_id: number;
  cocktail_name: string;
  description: string;
  image_url: string;
}

interface Ingredient {
  ingredient_id: string;
  ingredient_name: string;
  quantity: string;
}

interface OrderLine {
  order_line_id: number;
  quantity: string;
  line_cocktail_status: string;
  price_size_id: string;
  order_id: string;
  cocktail_id: number;
  cocktail_name: string;
  ingredients: Ingredient[];
}

interface OrderDetails {
  order_id: number;
  order_date: string;
  order_status: string;
  customer_id: string;
  orderLines: OrderLine[];
}

const route = useRoute();
const order = ref<OrderDetails | null>(null);
const orderLines = ref<OrderLine[]>([]);
const cocktails = ref<Cocktail[]>([]);

const fetchOrder = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<OrderDetails>(
      `http://localhost:8080/ordercocktail/${route.params.id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    order.value = response.data;
  } catch (err) {
    order.value = null;
  }
};

const fetchOrderLines = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<OrderLine[]>(
      `http://localhost:8080/orderline?order_id=${route.params.id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    orderLines.value = response.data;
  } catch (err) {
    orderLines.value = [];
  }
};

const fetchCocktails = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<Cocktail[]>(
      "http://localhost:8080/cocktails",
      { headers: { Authorization: "Bearer " + token } }
    );
    cocktails.value = response.data;
  } catch (err) {
    cocktails.value = [];
  }
};

const getCocktailName = (cocktail_id: number) => {
  const cocktail = cocktails.value.find((c) => c.cocktail_id === cocktail_id);
  return cocktail ? cocktail.cocktail_name : "Inconnu";
};

onMounted(() => {
  fetchOrder();
  fetchOrderLines();
  fetchCocktails();
});
</script>

<style scoped>
.cocktail-to-prepare {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.cocktail-img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 12px;
  background: #231915;
}
.order-line {
  margin-bottom: 12px;
}
.ingredient {
  margin-left: 18px;
  color: #7a5c3a;
  font-size: 0.98rem;
}
</style>
