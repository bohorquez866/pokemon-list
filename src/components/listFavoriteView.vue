<template>
  <article class="list--success">
    <ul>
      <li
        v-for="(pokemon, index) in $store.state.favoritePokemons"
        :key="index"
      >
        {{ pokemon.name }}

        <figure @click="addFavorite(pokemon.name)" class="rate-star">
          <img
            v-if="!$store.state.isFavorite.includes(pokemon.name)"
            src="../assets/img/grey-star.svg"
            alt="grey start"
          />
          <img
            v-else
            src="../assets/img/gold-star.svg"
            alt="favorite yellow star"
          />
        </figure>
      </li>
    </ul>

    <footer class="lower-menu">
      <div class="btns">
        <button class="btn btn-secondary active">
          <img src="../assets/img/list.svg" alt="list Icon" />
          <p>All</p>
        </button>

        <button class="btn btn-secondary">
          <img src="../assets/img/white-star.svg" alt="list Icon" />
          <p>Favorites</p>
        </button>
      </div>
    </footer>
  </article>
</template>

<script>
export default {
  methods: {
    addFavorite(pokemonName) {
      this.$store.state.isFavorite.includes(pokemonName)
        ? this.$store.state.isFavorite.pop(pokemonName)
        : this.$store.state.isFavorite.push(pokemonName);
      console.log(this.$store.state.isFavorite);
    },
    filterFavoritePokemon() {
      this.$store.state.pokemons.forEach((favoritePokemon) => {
        if (this.$store.state.isFavorite.includes(favoritePokemon.name)) {
          this.$store.state.favoritePokemons.push(favoritePokemon);
        }
      });
    },
  },
  mounted() {
    this.filterFavoritePokemon();
  },
};
</script>
