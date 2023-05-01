<script setup>
import { onMounted } from "vue";
import { useProductsStore } from "../../stores/products";

const store = useProductsStore();

const props = defineProps({
    cartItemProp: {
        type: Object,
        required: true
    }
});

// TESTING:
function getOccurrence(array, value) {
    console.log(value.sys.id);
    return array.filter((currentObj) => currentObj === value).length;
}

function incrementItem() {
    // productsInCart.update((currentValue) => {
    //     return [...currentValue, props.cartItemProp]; // wow it worked.très bien
    // });

    //translation of above
    store.$patch((state) => {
        state.productsInCart = [...state.productsInCart, props.cartItemProp]
    })
}

function decrementItem() {
    console.log("decrementItem function executed");
    // thanks to this stackoverflow link:
    // https://stackoverflow.com/questions/53534721/find-and-remove-first-matching-element-in-an-array-of-javascript-objects/53534899
    // productsInCart.update((currentValue) => {
    //     const index = currentValue.indexOf(props.cartItemProp);
    //     if (index > -1) {
    //         currentValue.splice(index, 1);
    //     }
    //     return currentValue;
    // });

    // translation of above
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

onMounted(() => {
    props.cartItemProp.sys.id = Math.random(); // replacing ids from the json file with my own ids. same items not sure if i want it this way or the way i have it in Product.svelte where every single item in the cart has unnique id
    console.log(props.cartItemProp);
})
</script>

<template>
    <div class="cart-item">
        <img :src="cartItemProp.fields.image.src" alt="product 1" />
        <div>
            <h4>{{ cartItemProp.fields.title }}</h4>
            <h5>{{ cartItemProp.fields.price }}</h5>
            <span @click="removeItem" class="remove-item">Remove</span>
        </div>
        <div>
            <i @click="incrementItem" class="fas fa-chevron-up" />
            <p class="item-amount">{{ getOccurrence(store.productsInCart, cartItemProp) }}</p>
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
