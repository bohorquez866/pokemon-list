<template>
  <article>
    <ul>
      <li v-for="pokemon in filterPokemon" :key="pokemon">
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
  </article>
</template>

<script>
export default {
  computed: {
    filterPokemon() {
      return this.$store.state.pokemons.filter((poke) => {
        return poke.name.match(this.$store.state.search);
      });
    },
  },
  methods: {
    addFavorite(pokemonName) {
      this.$store.state.isFavorite.includes(pokemonName)
        ? this.$store.state.isFavorite.pop(pokemonName)
        : this.$store.state.isFavorite.push(pokemonName);
      console.log(this.$store.state.isFavorite);
    },
  },
};
</script>
