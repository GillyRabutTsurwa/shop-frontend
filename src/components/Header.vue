<template>
    <header class="hero">
        <div class="banner">
            <h1 class="banner-title">furniture collection</h1>
            <button class="banner-btn">shop now</button>
        </div>
    </header>
</template>
  
<style>
.hero {
    min-height: calc(100vh - 6rem);
    background-image: url(@/assets/img/hero-bcg.jpeg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    display: -webkit-box;

    display: -ms-flexbox;

    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.banner {
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8);
    display: inline-block;
    padding: 2rem;
}

.banner-title {
    font-size: 3.4rem;
    text-transform: uppercase;
    letter-spacing: var(--mainSpacing);
    margin-bottom: 3rem;
}

.banner-btn {
    padding: 1rem 3rem;
    text-transform: uppercase;
    letter-spacing: var(--mainSpacing);
    font-size: 1rem;
    background-color: var(--primaryColor);
    color: var(--mainBlack);
    border: 1px solid var(--primaryColor);
    -webkit-transition: var(--mainTransition);
    transition: var(--mainTransition);
    cursor: pointer;
}

.banner-btn:hover {
    background-color: transparent;
    color: var(--primaryColor);
}
</style>
  