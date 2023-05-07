<script setup>
import { useProductsStore } from "../../stores/products";
import { client } from "../../../sanity";
import imageUrlBuilder from '@sanity/image-url'


const store = useProductsStore();
const props = defineProps({
    cartItemProp: {
        type: Object,
        required: true
    }
});
const builder = imageUrlBuilder(client)
const urlFor = (source) => {
    return builder.image(source)
}


function incrementItem() {
    store.$patch((state) => {
        state.productsInCart = [...state.productsInCart, props.cartItemProp];
    })
}

function decrementItem() {
    console.log("decrementItem function executed");
    /**
     * NOTE:
     * thanks to this stackoverflow link:
     * https://stackoverflow.com/questions/53534721/find-and-remove-first-matching-element-in-an-array-of-javascript-objects/53534899
     */

    store.$patch((state) => {
        const index = state.productsInCart.indexOf(props.cartItemProp);
        if (index > -1) {
            state.productsInCart.splice(index, 1);
        }
        return state.productsInCart
    })
}

// remove all instances of a singular item, so if there's 10 "queen beds" this function will remove all queen beds
function removeItem() {
    // store.productsInCart.update((currentValue) => {
    //     return currentValue.filter((arrayValue) => arrayValue !== cartItemProp);
    // });
    console.log("functionality coming soo")
}
</script>

<template>
    <div class="cart-item">
        <img :src="urlFor(props.cartItemProp.mainImage.asset._ref)" :alt="props.cartItemProp._id" />
        <div>
            <h4>{{ props.cartItemProp.name }}</h4>
            <h5>{{ props.cartItemProp.price }}</h5>
            <span @click="removeItem" class="remove-item">Remove</span>
        </div>
        <div>
            <i @click="incrementItem" class="fas fa-chevron-up" />
            <p class="item-amount">{{ store.getOccurence(props.cartItemProp) }}</p>
            <i @click="decrementItem" class="fas fa-chevron-down" />
        </div>
    </div>
</template>


<style>
.cart-item {
    display: grid;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    grid-column-gap: 1.5rem;
    margin: 1.5rem 0;
}

.cart-item img {
    width: 7.5rem;
    height: 7.5rem;
}

.cart-item h4 {
    font-size: 0.85rem;
    text-transform: capitalize;
    letter-spacing: var(--mainSpacing);
}

.cart-item h5 {
    margin: 0.5rem 0;
    letter-spacing: var(--mainSpacing);
}

.item-amount {
    text-align: center;
}

.remove-item {
    color: grey;
    cursor: pointer;
}

.fa-chevron-up,
.fa-chevron-down {
    color: var(--primaryColor);
    cursor: pointer;
}
</style>
