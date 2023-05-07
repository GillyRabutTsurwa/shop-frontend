<template>
  <header class="hero">
    <!-- <div class="banner">
      <h1 class="banner-title">furniture collection</h1>
      <button class="banner-btn">shop now</button>
    </div> -->
    <div class="hero__images">
      <!-- NOTE: using test images -->
      <figure class="hero__images--image">
        <img
          src="https://images.unsplash.com/photo-1634316164679-dabb68a88a3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="">
      </figure>
      <figure class="hero__images--image">
        <img
          src="https://images.unsplash.com/photo-1583338917451-face2751d8d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="">
      </figure>
      <figure class="hero__images--image">
        <img
          src="https://images.unsplash.com/photo-1505066827145-34bcde228211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=670&q=80"
          alt="">
      </figure>
      <figure class="hero__images--image">
        <img
          src="https://images.unsplash.com/photo-1525845859779-54d477ff291f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="">
      </figure>
    </div>
  </header>
</template>

<style>
.hero {
  width: 100%;
}

.hero__images {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  object-fit: cover;
}

.hero__images--image {
  width: 100%;
  height: 100%;
}

.hero__images--image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
