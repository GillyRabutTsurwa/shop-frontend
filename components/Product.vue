<script setup>
import { useProductsStore } from "~/stores/products";
const { data } = await useFetch("/api/products");
const store = useProductsStore();


const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

store.products = data.value.products;
console.log(props.product);

const addItemToCart = () => {
  /** NOTE:
   * i should get a warning about mutating props, but it should work nevertheless
   * i actually get no warning
   */
  store.$patch((state) => {
    console.log(props.product);
    state.productsInCart = [props.product, ...state.productsInCart];
  });
};
</script>

<template>
  <article class="product">
    <div class="img-container">
      <SanityImage :asset-id="props.product.mainImage.asset._ref" class="product-image" auto="format" />
      <button @click="addItemToCart" class="bag-btn" data-id="1">
        <i class="fas fa-shopping-cart" aria-hidden="true" />
        Add To Bag
      </button>
    </div>
    <h3>{{ props.product.name }}</h3>
    <h4>${{ (props.product.price / 100).toFixed(2) }}</h4>
  </article>
</template>

<style scoped>
.img-container {
  position: relative;
  overflow: hidden;
}

.img-container:hover .bag-btn {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.img-container:hover .product-image {
  opacity: 0.5;
}

.product-image {
  display: block;
  /* IMPORTANT: sans celui-ci, l'image sera trop grande */
  width: 100%;
  min-height: 18rem;
  -webkit-transition: var(--mainTransition);
  transition: var(--mainTransition);
}

.bag-btn {
  position: absolute;
  top: 70%;
  right: 0;
  background-color: var(--primaryColor);
  border: none;
  text-transform: uppercase;
  padding: 0.5rem 0.75rem;
  letter-spacing: var(--mainSpacing);
  font-weight: bold;
  -webkit-transition: var(--mainTransition);
  transition: var(--mainTransition);
  -webkit-transform: translateX(101%);
  transform: translateX(101%);
  /*POURQUOI 101%?*/
  cursor: pointer;
  color: var(--mainGrey)
}

.bag-btn:hover {
  background-color: var(--mainWhite);
  color: var(--primaryColor);
}

.fa-shopping-cart {
  margin-right: 0.5rem;
}

.product h3 {
  text-transform: capitalize;
  font-size: 1.1rem;
  margin-top: 1rem;
  letter-spacing: var(--mainSpacing);
  text-align: center;
}

.product h4 {
  margin-top: 0.7rem;
  letter-spacing: var(--mainSpacing);
  color: var(--primaryColor);
  text-align: center;
}
</style>