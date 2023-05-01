<script setup>
import { useProductsStore } from "../../stores/products";
const store = useProductsStore();

const props = defineProps({
    productObj: {
        type: Object,
        required: true
    }
})

const addItemToCart = () => {
    // productsInCart.update((currentProducts) => {
    //   productObj.sys.id = Math.random(); // replacing ids from the json file with my own ids
    //   // console.log(productObj); // useful log mais je vais le decommenter pour le momment
    //   return [productObj, ...currentProducts];
    // });
    // // console.log($productsInCart); // le même pour celui-ci

    // NOTE: i should get a warning about mutating props, but it should work nevertheless
    store.$patch((state) => {
        props.productObj.sys.id = Math.random();
        console.log(props.productObj);
        state.productsInCart = [props.productObj, ...state.productsInCart];
    })
};
</script>

<template>
    <article class="product">
        <div class="img-container">
            <img :src="productObj.fields.image.src" class="product-image" alt="product 1" />
            <button @click="addItemToCart" class="bag-btn" data-id="1">
                <i class="fas fa-shopping-cart" aria-hidden="true" />
                Add To Bag
            </button>
        </div>
        <h3>{{ productObj.fields.title }}</h3>
        <h4>${{ productObj.fields.price }}</h4>
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
}

.bag-btn:hover {
    color: var(--mainWhite);
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
