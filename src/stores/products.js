import { defineStore } from "pinia";
const URL = "http://localhost:3000/items";

export const useProductsStore = defineStore("products", {
    state: () => {
        return {
            products: [],
            productsInCart: [],
        };
    },
    actions: {
        async fetchProducts() {
            try {
                const response = await fetch(URL);
                if (!response.ok) throw new Error("can't find prods");
                const productsArr = await response.json();
                this.products = productsArr;
            } catch (error) {
                console.error(error.message);
            }
        },
    },
});
