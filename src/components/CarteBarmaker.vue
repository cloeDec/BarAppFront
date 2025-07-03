<template>
  <div class="cocktail-list-container">
    <button class="btn-add-cocktail" @click="showAddModal = true">
      + Ajouter un cocktail
    </button>
    <div v-if="showAddModal" class="modal-backdrop">
      <div class="modal-content">
        <h2>Ajouter un Cocktail</h2>
        <form @submit.prevent="submitCocktail">
          <input
            v-model="newCocktail.name"
            type="text"
            placeholder="Nom du Cocktail"
            class="modal-input"
            required
          />
          <textarea
            v-model="newCocktail.description"
            placeholder="Description"
            class="modal-input"
            rows="3"
          ></textarea>
          <input
            v-model="newCocktail.image_url"
            type="text"
            placeholder="URL de l'image (optionnel)"
            class="modal-input"
          />
          <div class="modal-ingredients">
            <label class="modal-label">Ingrédients</label>
            <div
              v-for="ingredient in ingredientsList"
              :key="ingredient.ingredient_id"
              class="ingredient-row"
            >
              <input
                type="checkbox"
                :id="'ing-' + ingredient.ingredient_id"
                :value="ingredient.ingredient_id"
                v-model="newCocktail.selectedIngredients"
              />
              <label :for="'ing-' + ingredient.ingredient_id">{{
                ingredient.ingredient_name
              }}</label>
              <input
                v-if="
                  newCocktail.selectedIngredients.includes(
                    ingredient.ingredient_id
                  )
                "
                type="number"
                min="0.1"
                step="0.1"
                class="ingredient-qty"
                v-model.number="
                  newCocktail.ingredientQuantities[ingredient.ingredient_id]
                "
                placeholder="Qté"
              />
            </div>
          </div>
          <select v-model="newCocktail.size" class="modal-input" required>
            <option disabled value="">Taille</option>
            <option value="Petit">Petit</option>
            <option value="Normal">Normal</option>
            <option value="Grand">Grand</option>
          </select>
          <input
            v-model="newCocktail.price"
            type="number"
            step="0.01"
            placeholder="Prix"
            class="modal-input"
            required
          />
          <button type="submit" class="modal-submit">
            Ajouter un cocktail
          </button>
        </form>
        <button class="modal-close" @click="showAddModal = false">×</button>
        <div v-if="successMessage" class="modal-success">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="modal-error">{{ errorMessage }}</div>
      </div>
    </div>
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
        </div>
      </div>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from "vue";
import axios from "axios";

interface Ingredient {
  ingredient_id: number;
  ingredient_name: string;
}

interface Cocktail {
  cocktail_id: number;
  cocktail_name: string;
  description: string;
  image_url: string;
}

const cocktailList = ref<Cocktail[]>([]);
const error = ref<string | null>(null);
const animatingIndexes = ref<number[]>([]);
const showAddModal = ref(false);
const ingredientsList = ref<Ingredient[]>([]);
const successMessage = ref("");
const errorMessage = ref("");

const newCocktail = reactive({
  name: "",
  description: "",
  image_url: "",
  selectedIngredients: [] as number[],
  ingredientQuantities: {} as Record<number, number>,
  size: "",
  price: "",
});

watch(
  () => newCocktail.selectedIngredients,
  (newVal) => {
    for (const id in newCocktail.ingredientQuantities) {
      if (!newVal.includes(Number(id))) {
        newCocktail.ingredientQuantities[id] = undefined as any;
      }
    }
  }
);

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

const fetchIngredients = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<Ingredient[]>(
      "http://localhost:8080/ingredient",
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    ingredientsList.value = response.data;
  } catch (err) {
    console.error(err);
  }
};

const submitCocktail = async () => {
  successMessage.value = "";
  errorMessage.value = "";
  try {
    const token = localStorage.getItem("token");
    const cocktailRes = await axios.post(
      "http://localhost:8080/cocktails",
      {
        cocktail_name: newCocktail.name,
        description: newCocktail.description,
        image_url: newCocktail.image_url,
      },
      { headers: { Authorization: "Bearer " + token } }
    );
    const cocktailId = cocktailRes.data.cocktail_id;

    await axios.post(
      "http://localhost:8080/cocktail-prices",
      {
        size: newCocktail.size,
        price: newCocktail.price,
        cocktail_id: cocktailId,
      },
      { headers: { Authorization: "Bearer " + token } }
    );

    for (const ingredientId of newCocktail.selectedIngredients) {
      const qty = newCocktail.ingredientQuantities[ingredientId] || 1;
      await axios.post(
        "http://localhost:8080/composed-of",
        {
          cocktail_id: cocktailId,
          ingredient_id: ingredientId,
          quantity: qty,
        },
        { headers: { Authorization: "Bearer " + token } }
      );
    }

    // Reset et fermeture
    successMessage.value = "Cocktail ajouté avec succès !";
    showAddModal.value = false;
    Object.assign(newCocktail, {
      name: "",
      description: "",
      image_url: "",
      selectedIngredients: [],
      ingredientQuantities: {},
      size: "",
      price: "",
    });
    fetchCocktail();
    setTimeout(() => {
      successMessage.value = "";
    }, 2500);
  } catch (err) {
    console.error(err);
    errorMessage.value = "Erreur lors de l'ajout du cocktail";
    setTimeout(() => {
      errorMessage.value = "";
    }, 2500);
  }
};

onMounted(() => {
  fetchCocktail();
  fetchIngredients();
});
</script>

<style scoped>
.btn-add-cocktail {
  position: absolute;
  top: 24px;
  right: 24px;
  background: #eac3b2;
  color: #231915;
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: background 0.2s;
  z-index: 20;
}
.btn-add-cocktail:hover {
  background: #e0b49e;
}
.cocktail-list-container {
  position: relative;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(20, 12, 8, 0.92);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
.modal-content {
  background: #2d1c14;
  width: 95vw;
  max-width: 320px;
  min-height: 100vh;
  padding: 32px 18px 24px 18px;
  box-shadow: -2px 0 16px rgba(0, 0, 0, 0.18);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 100vh;
}
.modal-content h2 {
  color: #fff;
  font-size: 1.25rem;
  margin-bottom: 18px;
  font-weight: 700;
}
.modal-input {
  width: 100%;
  background: #4a3226;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  padding: 12px 14px;
  margin-bottom: 16px;
  outline: none;
  font-family: inherit;
}
.modal-input::placeholder {
  color: #bfa89e;
  opacity: 1;
}
.modal-label {
  color: #fff;
  font-size: 1rem;
  margin-bottom: 6px;
  display: block;
  font-weight: 500;
}
.modal-ingredients {
  margin-bottom: 16px;
}
.ingredient-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
}
.ingredient-row label {
  color: #fff;
  font-size: 0.98rem;
  margin-right: 6px;
}
.ingredient-qty {
  width: 60px;
  background: #4a3226;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 0.95rem;
  padding: 6px 8px;
  margin-left: 4px;
}
.modal-submit {
  width: 90%;
  margin: 0 auto;
  display: block;
  background: #ff7a2f;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 18px;
  transition: background 0.2s;
}
.modal-submit:hover {
  background: #e06a1e;
}
.modal-close {
  position: absolute;
  top: 12px;
  right: 18px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
}
.modal-success {
  color: #4caf50;
  background: #fff;
  border-radius: 8px;
  padding: 10px 16px;
  margin-top: 18px;
  text-align: center;
  font-weight: 600;
}
.modal-error {
  color: #fff;
  background: #c0392b;
  border-radius: 8px;
  padding: 10px 16px;
  margin-top: 18px;
  text-align: center;
  font-weight: 600;
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
  .modal-content {
    width: 95vw;
    max-width: 95vw;
    min-width: 0;
    padding: 18px 6vw 18px 6vw;
  }
}
@media (min-width: 601px) and (max-width: 900px) {
  .modal-content {
    width: 400px;
    max-width: 95vw;
    min-width: 0;
    padding: 28px 24px 24px 24px;
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
