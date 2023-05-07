import { defineStore } from "pinia";

const isProduction = import.meta.env.PROD;

const devServerURL = import.meta.env.VITE_DEV_SERVER_URL;
const prodServerURL = import.meta.env.VITE_PROD_SERVER_URL;

const serverURL = isProduction ? prodServerURL : devServerURL;

const URL = `${serverURL}/products`;
console.log(URL);

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

// TODO let us see if this works in case the other one fails
