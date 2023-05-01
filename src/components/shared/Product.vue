<script setup>
import { client } from "../../../sanity";
import { useProductsStore } from "../../stores/products";
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)
const store = useProductsStore();


const props = defineProps({
    productObj: {
        type: Object,
        required: true
    }
})

console.log(props.productObj);

const urlFor = (source) => {
    return builder.image(source)
}

const addItemToCart = () => {
    /** NOTE:
     * i should get a warning about mutating props, but it should work nevertheless
     * i actually get no warning
     */
    store.$patch((state) => {
        console.log(props.productObj);
        state.productsInCart = [props.productObj, ...state.productsInCart];
    });
};
</script>

<template>
    <article class="product">
        <div class="img-container">
            <img :src="urlFor(props.productObj.mainImage.asset._ref)" class="product-image" alt="product 1" />
            <button @click="addItemToCart" class="bag-btn" data-id="1">
                <i class="fas fa-shopping-cart" aria-hidden="true" />
                Add To Bag
            </button>
        </div>
        <h3>{{ props.productObj.name }}</h3>
        <h4>${{ props.productObj.price }}</h4>
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
