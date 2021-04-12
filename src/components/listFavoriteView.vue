<template>
  <article class="list--success">
    <ul>
      <li v-for="(pokemon, index) in ultimateFilter" :key="index">
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

        <modal>
          <template v-slot:name> </template>
        </modal>
      </li>
    </ul>
  </article>
</template>

<script>
import modal from "./modalPokemon.vue";
export default {
  components: {
    modal,
  },
  computed: {
    showModal() {
      return this.$store.getters.showModals;
    },
    ultimateFilter() {
      if (this.$store.state.allPage) {
        return this.filterPokemon;
      } else {
        return this.filterfavPokemon;
      }
    },
    filterPokemon() {
      return this.$store.state.pokemons.filter((poke) => {
        return poke.name.match(this.$store.state.search);
      });
    },

    filterfavPokemon() {
      return this.$store.state.favoritePokemons.filter((poke) => {
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
