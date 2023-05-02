import { defineStore } from "pinia";
import config from "../../env.json"; //NOTE: name can be anything, not just config

/**NOTE:
 * even though i won't be moving forward with this solution in this project...
 * ... it's quite useful to keep in mind
 * found solution thanks to this link: https://stackoverflow.com/questions/72922941/cant-use-env-file-js
 * this link helped in the research as well: https://stackoverflow.com/questions/34944099/how-to-import-a-json-file-in-ecmascript-6
 */
const URL = `${config.development.SERVER_URL}/products`;

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
