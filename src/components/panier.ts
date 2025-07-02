import { defineStore } from "pinia";

export const usePanierStore = defineStore("panier", {
  state: () => ({
    cocktails: JSON.parse(localStorage.getItem("panier") || "[]"),
  }),
  actions: {
    ajouterCocktail(cocktail: any) {
      this.cocktails.push(cocktail);
      localStorage.setItem("panier", JSON.stringify(this.cocktails));
    },
    retirerCocktail(index: number) {
      this.cocktails.splice(index, 1);
      localStorage.setItem("panier", JSON.stringify(this.cocktails));
    },
    viderPanier() {
      this.cocktails = [];
      localStorage.setItem("panier", "[]");
    },
  },
});
