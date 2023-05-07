<script setup>
import { useCartStore } from '~/stores/cart';
import { useProductsStore } from '~/stores/products';

const productsStore = useProductsStore();
const cartStore = useCartStore();

const itemsInCart = computed(() => {
  return productsStore.productsInCart.length
})
</script>
                
<template>
  <nav class="navbar">
    <div class="navbar-center">
      <figure class="nav-icon">
        <!-- <i class="fas fa-bars" /> -->
        <img src="~/assets/icons/svg/my-logo.svg" alt="logo">
      </figure>
      <h1>Gil's Shop</h1>
      <button @click=cartStore.toggleCartStatus class="cart-btn">
        <span class="nav-icon"><i class="fas fa-cart-plus" /></span>
        <div class="cart-items">{{ itemsInCart }}</div>
      </button>
    </div>
  </nav>
</template>


<style scoped>
.navbar {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  height: 8rem;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: rgb(231, 226, 221);
  /* navbar va rester au-dessûs */
  z-index: 1;
}

.navbar-center {
  width: 100%;
  max-width: 117rem;
  margin: 0 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0 1.5rem;
}

.nav-icon {
  width: 8rem;
  height: 8rem;
}

.nav-icon img {
  width: 100%;
  height: 100%;
}

.cart-btn {
  all: unset;
  /* NOTE: to get rid of all custom button properties */
  display: block;
  position: relative;
  cursor: pointer;
}

.cart-items {
  /* cette element est positione relativement a lequel ? */
  position: absolute;
  top: -1.1rem;
  right: -1.3rem;
  background-color: var(--primaryColor);
  padding: 0 0.5rem;
  border-radius: 30%;
  color: var(--mainWhite);
  font-size: 1.25rem;
}
</style>
