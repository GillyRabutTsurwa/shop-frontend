import { defineStore } from "pinia";

const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

const devServerURL = import.meta.env.VITE_DEV_SERVER_URL;
const prodServerURL = import.meta.env.VITE_PROD_SERVER_URL;

console.log(`Development Mode: ${isDevelopment}`);
console.log(`Production Mode: ${isProduction}`);

console.log(import.meta.env.VITE_TEST_KEY); // NOTE: will work
console.log(import.meta.env.KEY_TEST); // NOTE: will NOT work; not prepended with VITE_

const serverURL = isDevelopment ? devServerURL : prodServerURL;

const URL = `${serverURL}/products`;

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
