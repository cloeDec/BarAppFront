import { defineStore } from "pinia";

export interface Cocktail {
  cocktail_id: number;
  cocktail_name: string;
  description: string;
  image_url: string;
}

interface PanierState {
  cocktails: Cocktail[];
}

export const usePanierStore = defineStore("panier", {
  state: (): PanierState => ({
    cocktails: JSON.parse(localStorage.getItem("panier") || "[]"),
  }),
  actions: {
    ajouterCocktail(cocktail: Cocktail) {
      this.cocktails.push(cocktail);
      localStorage.setItem("panier", JSON.stringify(this.cocktails));
    },
    retirerCocktail(index: number) {
      this.cocktails.splice(index, 1);
      localStorage.setItem("panier", JSON.stringify(this.cocktails));
    },
    viderPanier() {
      this.cocktails = [];
      localStorage.removeItem("panier");
    },
    chargerDepuisLocalStorage() {
      this.cocktails = JSON.parse(localStorage.getItem("panier") || "[]");
    },
  },
});
