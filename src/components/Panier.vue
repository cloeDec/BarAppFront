<template>
  <div class="panier-container">
    <h1>Mon Panier</h1>
    <div v-if="panierStore.cocktails.length === 0">Votre panier est vide.</div>
    <ul v-else>
      <li
        v-for="(cocktail, idx) in panierStore.cocktails"
        :key="cocktail.cocktail_id"
        class="panier-item"
      >
        <img
          :src="cocktail.image_url"
          alt="Image du cocktail"
          class="panier-img"
        />
        <div class="panier-info">
          <span class="panier-name">{{ cocktail.cocktail_name }}</span>
          <p class="panier-desc">{{ cocktail.description }}</p>
        </div>
        <button class="btn-retirer" @click="panierStore.retirerCocktail(idx)">
          Retirer
        </button>
      </li>
    </ul>
    <button
      v-if="panierStore.cocktails.length"
      class="btn-vider"
      @click="panierStore.viderPanier()"
    >
      Vider le panier
    </button>
  </div>
</template>

<script lang="ts" setup>
import { usePanierStore } from "./panier";
import { storeToRefs } from "pinia";

const panierStore = usePanierStore();
const { cocktails } = storeToRefs(panierStore);
</script>

<style scoped>
.panier-container {
  padding: 24px 12px;
  min-height: 100vh;
}
.panier-item {
  display: flex;
  align-items: center;
  background: #3a2b25;
  border-radius: 14px;
  margin-bottom: 16px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.panier-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 16px;
  background: #231915;
}
.panier-info {
  flex: 1;
}
.panier-name {
  color: #fff;
  font-weight: 600;
  font-size: 1.05rem;
}
.panier-desc {
  color: #eac3b2;
  font-size: 0.95rem;
  margin: 0;
}
.btn-retirer {
  background: #c0392b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  margin-left: 12px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-retirer:hover {
  background: #a93226;
}
.btn-vider {
  margin-top: 18px;
  background: #b9770e;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.btn-vider:hover {
  background: #a67c52;
}
</style>
