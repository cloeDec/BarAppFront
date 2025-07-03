<template>
  <div class="cocktail-list-container">
    <h1>Cocktail</h1>
    <div class="card-list">
      <div
        class="cocktail-card"
        v-for="(cocktail, idx) in cocktailList"
        :key="cocktail.cocktail_id"
        :class="{ 'fly-to-cart': animatingIndexes.includes(idx) }"
      >
        <img
          :src="cocktail.image_url"
          alt="Image du cocktail"
          class="cocktail-img"
        />
        <div class="cocktail-content">
          <span class="cocktail-name">
            {{ cocktail.cocktail_name }}
          </span>
          <p class="cocktail-desc">{{ cocktail.description }}</p>
          <button class="add-to-cart" @click="addToCart(cocktail, idx)">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";

interface Cocktail {
  cocktail_id: number;
  cocktail_name: string;
  description: string;
  image_url: string;
}

const cocktailList = ref<Cocktail[]>([]);
const error = ref<string | null>(null);
const animatingIndexes = ref<number[]>([]);

const fetchCocktail = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<Cocktail[]>(
      "http://localhost:8080/cocktails",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    cocktailList.value = response.data;
  } catch (err) {
    error.value = "Erreur lors du chargement des cocktails.";
    console.error(err);
  }
};

const addToCart = (cocktail: Cocktail, idx: number) => {
  let panier: Cocktail[] = JSON.parse(localStorage.getItem("panier") || "[]");
  panier.push(cocktail);
  localStorage.setItem("panier", JSON.stringify(panier));
  animatingIndexes.value.push(idx);
  setTimeout(() => {
    animatingIndexes.value = animatingIndexes.value.filter((i) => i !== idx);
  }, 700);
};

onMounted(fetchCocktail);
</script>

<style scoped>
.cocktail-list-container {
  padding: 24px 6px;
  min-height: 100vh;
  background: transparent;
}
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 18px;
  justify-items: center;
  width: 100%;
  box-sizing: border-box;
}
.cocktail-card {
  background: #3a2b25;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  transition: box-shadow 0.15s, transform 0.15s;
  cursor: pointer;
  border: none;
}
.cocktail-card.active,
.cocktail-card:hover {
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.18);
  transform: translateY(-2px) scale(1.03);
}
.cocktail-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 18px 18px 0 0;
  background: #231915;
}
.cocktail-content {
  width: 90%;
  padding: 18px 16px 18px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  flex: 1;
  height: 100%;
}
.cocktail-name {
  color: #fff;
  font-size: 1.08rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  padding-bottom: 6px;
  padding-top: 2px;
  padding-left: 2px;
}
.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #ff7a2f;
  border-radius: 50%;
  margin-left: 6px;
}
.cocktail-desc {
  color: #eac3b2;
  font-size: 0.98rem;
  margin: 8px 0 0 0;
  line-height: 1.3;
  word-break: break-word;
  padding: 0 2px 0 2px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media (max-width: 600px) {
  .card-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 0 2vw;
  }
  .cocktail-card {
    width: 100%;
    min-width: 0;
    max-width: 100vw;
  }
}
.add-to-cart {
  margin-top: auto;
  padding: 8px 16px;
  background: #eac3b2;
  color: #231915;
  border: none;
  border-radius: 16px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
}
.add-to-cart:hover {
  background: #e0b49e;
}
@keyframes flyToCart {
  0% {
    transform: scale(1) translate(0, 0);
    opacity: 1;
    z-index: 1;
  }
  60% {
    transform: scale(0.7) translate(120px, 200px);
    opacity: 0.8;
    z-index: 10;
  }
  100% {
    transform: scale(0.3) translate(200px, 350px);
    opacity: 0;
    z-index: 10;
  }
}
.fly-to-cart {
  animation: flyToCart 0.7s cubic-bezier(0.4, 0.8, 0.6, 1) forwards;
  pointer-events: none;
  z-index: 10;
}
</style>
