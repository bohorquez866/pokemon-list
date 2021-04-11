<template>
  <article v-if="!$store.state.loaded" class="loading">
    <img
      src="../assets/img/loading-ball.svg"
      alt="Loading screen rotating Pokeball"
    />
  </article>

  <div v-else class="list">
    <searchbar />
    <all-page
      v-if="filterPokemon && $store.state.allPage"
      class="list--success"
    />

    <favorite-page
      v-else-if="$store.state.favoritePage"
      class="list--success"
    />

    <empty-search-view v-if="filterTest <= 0" />

    <footer class="lower-menu">
      <div class="btns">
        <button
          @click="watchAllPage"
          :class="{ active: $store.state.allPage }"
          class="btn btn-secondary"
        >
          <img src="../assets/img/list.svg" alt="list Icon" />
          <p>All</p>
        </button>

        <button
          @click="watchFavoritePage"
          :class="{ active: $store.state.favoritePage }"
          class="btn btn-secondary"
        >
          <img src="../assets/img/white-star.svg" alt="list Icon" />
          <p>Favorites</p>
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
import emptySearchView from "./listViewEmpty";
import allPage from "./listViewSuccess";
import favoritePage from "./listFavoriteView";
import searchbar from "./searchbar.vue";
export default {
  components: {
    allPage,
    emptySearchView,
    favoritePage,
    searchbar,
  },

  data() {
    return {
      url: ` https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`,
      nextURL: "",
      pokemons: [],

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
        return poke.name.match(this.$store.state.search);
      });
    },
  },

  methods: {
    watchFavoritePage() {
      this.$store.state.favoritePage = true;
      this.$store.state.allPage = false;
    },
    watchAllPage() {
      this.$store.state.favoritePage = false;
      this.$store.state.allPage = true;
    },
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
            this.$store.state.loaded = true;
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
