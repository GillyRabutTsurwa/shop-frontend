import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
    state: () => {
        return {
            products: [],
            productsInCart: [],
        };
    },
    getters: {
        getOccurence: (state) => {
            return (value) => state.productsInCart.filter((currentObj) => currentObj === value).length;
        },
    },
});
