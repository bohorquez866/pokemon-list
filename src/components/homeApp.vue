<template>
  <div class="home">
    <div>
      <img src="../assets/img/home-pikachu.svg" alt="" />
      <h1>Welcome to Pokédex</h1>
      <p>
        The digital encyclopedia created by Professor Oak is an invaluable tool
        to Trainers in the Pokémon world.
      </p>
      <!-- -->
      <router-link to="/list"
        ><button class="btn btn-primary">Get started</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {},
};
</script>

<style scoped lang="scss"></style>
