<script setup>
import { onBeforeMount } from 'vue';
import { useProductsStore } from '../stores/products';

import Product from './shared/Product.vue';

const store = useProductsStore();
store.fetchProducts();
</script>

<template>
    <section class="products">
        <h2 class="section-title">Our Products</h2>
        <div class="products-centre">
            <Product v-for="(currentProduct, index) in store.products" :key="index" :productObj="currentProduct" />
        </div>
    </section>
</template>


<style scoped>
.products {
    padding: 4rem 0;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 5rem;
    text-transform: capitalize;
    letter-spacing: var(--mainSpacing);
}

.products-centre {
    width: 90vw;
    margin: 0 auto;
    max-width: 117rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));

    grid-row-gap: 2rem;
    grid-column-gap: 1.5rem;
}
</style>
