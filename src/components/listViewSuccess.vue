<template>
  <article v-if="!loaded" class="loading">
    <img
      src="../assets/img/loading-ball.svg"
      alt="Loading screen rotating Pokeball"
    />
  </article>

  <div v-else class="list">
    <form class="searchbar">
      <div class="search-wrap">
        <img src="../assets/img/search.svg" alt="search icon" />

        <input
          v-model="search"
          type="search"
          id="input-seach"
          class="search-input"
          placeholder="Search"
        />
      </div>
    </form>

    <article @loadstart="fetchData" v-if="filterPokemon" class="list--success">
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

      <footer class="lower-menu">
        <div class="btns">
          <button class="btn btn-secondary active">
            <img src="../assets/img/list.svg" alt="list Icon" />
            <p>All</p>
          </button>

          <router-link to="/list/favorite" class="btn btn-secondary">
            <img src="../assets/img/white-star.svg" alt="list Icon" />
            <p>Favorites</p>
          </router-link>
        </div>
      </footer>
    </article>

    <empty-search-view v-if="filterTest <= 0" />
  </div>
</template>

<script>
import emptySearchView from "./listViewEmpty";
export default {
  components: {
    emptySearchView,
  },

  data() {
    return {
      url: ` https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`,
      nextURL: "",
      pokemons: [],
      search: "",
      loaded: false,
      empty: false,
    };
  },

  computed: {
    filterTest() {
      return this.filterPokemon.length;
    },
    validateFavorite() {
      return this.$store.state.pokemons.forEach((poke) => {
        this.$store.state.isFavorite.includes(poke.name);
      });
    },
    filterPokemon() {
      return this.$store.state.pokemons.filter((poke) => {
        return poke.name.match(this.search);
      });
    },
  },

  watch: {
    filterError() {
      this.filterPokemon.length <= 0 ? true : false;
    },
  },

  methods: {
    addFavorite(pokemonName) {
      this.$store.state.isFavorite.includes(pokemonName)
        ? this.$store.state.isFavorite.pop(pokemonName)
        : this.$store.state.isFavorite.push(pokemonName);
      console.log(this.$store.state.isFavorite);
    },

    fetchData() {
      let req = this.url;
      fetch(req)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          data.results.forEach((pokemon) =>
            this.$store.state.pokemons.push(pokemon)
          );
          setTimeout(() => {
            this.loaded = true;
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>
