<template>
  <div class="cocktail-list-container">
    <h1>Cocktail</h1>
    <div class="card-list">
      <div
        class="cocktail-card"
        v-for="cocktail in cocktail"
        :key="cocktail.cocktail_id"
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
        </div>
      </div>
    </div>
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
      selectedCocktail: null,
      hoveredCocktail: null,
    };
  },

  methods: {
    selectCocktail(cocktail) {
      this.selectedCocktail = cocktail;
    },
    async fetchCocktail() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/cocktails", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
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

<style scoped>
.cocktail-list-container {
  padding: 24px 6px;
  min-height: 100vh;
  background: transparent;
}
.card-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  justify-items: center;
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
  width: 100%;
  padding: 12px 10px 14px 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
}
.cocktail-name {
  color: #fff;
  font-size: 1.08rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
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
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media (max-width: 600px) {
  .card-list {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .cocktail-card {
    width: 95vw;
    min-width: 0;
  }
}
</style>
