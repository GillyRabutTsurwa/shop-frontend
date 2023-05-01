<script setup>
import { ref, computed, watch } from "vue";
import CartItem from "./shared/CartItem.vue";
import { useCartStore } from "../stores/cart";
import { useProductsStore } from "../stores/products";

const cartStore = useCartStore();
const productsStore = useProductsStore();

const isCartOpen = ref(null);

const productsInCartUI = computed(() => {
    // NOTE: on fait ceci car on veut que un article qui est selectioné plusieurs fois s'affiche juste une fois sur la carte
    return [...new Set(productsStore.productsInCart)];
});

/** NOTETESTING
 * taking our computed property above
 * and extracting the id,
 * whilst generating it's respectable quantity (look at products.js store file)
 * this will give us a certain item via its id and the quantity of the selected item
 */
const test = computed(() => {
    return productsInCartUI.value.map((currentProduct) => {
        return {
            id: currentProduct.sys.id,
            quantity: productsStore.getOccurence(currentProduct)
        }
    })
})

const totalPricesArr = computed(() => {
    return productsStore.productsInCart.map((currentProduct) => currentProduct.fields.price);
});

const sum = computed(() => {
    return totalPricesArr.value.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2);
});

cartStore.$subscribe((_, state) => {
    // NOTE: not using the mutation parametre so using _, as the order and placements of the function's arguments matters
    console.log(state.cartStatus);

    isCartOpen.value = state.cartStatus;
})


const clearCart = () => {
    if (productsStore.productsInCart !== 0) productsStore.$patch({ productsInCart: [] });
    console.log("Touts les articles dans la carte supprimés")
};

watch(() => test.value, (newValue, oldValue) => {
    console.log(oldValue);
    console.log(newValue);
})
</script>

<template>
    <div class="cart-overlay">
        <div class="cart" :class="{ showCart: isCartOpen, transparentBcg: isCartOpen }">
            <span class="close-cart" @click="cartStore.toggleCartStatus">
                <i class="fas fa-window-close" />
            </span>
            <h2>Your cart</h2>
            <div class="cart-content">
                <CartItem v-for="(currentProduct, index) in productsInCartUI" :key="index" :cartItemProp="currentProduct" />
                <h5 v-if="productsInCartUI.length === 0" style="text-align:center;">Your Cart is Empty</h5>
            </div>
            <div class="cart-footer">
                <h3>Your total : $ <span class="cart-total">{{ sum }}</span></h3>
                <button @click="clearCart" class="clear-cart banner-btn">Clear cart</button>
                <button @click="clearCart" class="clear-cart banner-btn">Checkout</button>
            </div>
        </div>
    </div>
</template>

<style>
.cart-overlay {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    -webkit-transition: var(--mainTransition);
    transition: var(--mainTransition);
    /* background: transparent; */
    background-color: rgba(240, 157, 81, 0.5);
    z-index: 20;
    visibility: hidden;
}

.cart {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: scroll;
    background-color: rgb(231, 226, 221);
    /* cart needs higher z-index que son parent, cart-overlay */
    z-index: 30;
    padding: 1.5rem;
    -webkit-transition: var(--mainTransition);
    transition: var(--mainTransition);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
}

.showCart {
    -webkit-transform: translate(0);
    transform: translate(0);
}

.transparentBcg {
    visibility: visible;
}

@media screen and (min-width: 768px) {
    .cart {
        width: 30vw;
        min-width: 450px;
    }
}

.close-cart {
    font-size: 1.7rem;
    cursor: pointer;
}

.cart h2 {
    text-transform: capitalize;
    text-align: center;
    letter-spacing: var(--mainSpacing);
    margin-bottom: 2rem;
}

.cart-footer {
    margin-top: 2rem;
    letter-spacing: var(--mainSpacing);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cart-footer h3 {
    text-transform: capitalize;
    margin-bottom: 1rem;
}
</style>
