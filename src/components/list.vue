<template>
  <article v-if="!$store.state.loaded" class="loading">
    <img
      src="../assets/img/loading-ball.svg"
      alt="Loading screen rotating Pokeball"
    />
  </article>

  <div v-else class="list">
    <searchbar />
    <all-page v-if="$store.state.allPage" class="list--success" />
    <favorite-page v-else-if="$store.state.favoritePage" />
    <empty-search-view v-if="filterTest <= 0" />
    <footer-btn @emit-page="watchAllPage" @emit-fav-page="watchFavoritePage" />
  </div>
</template>

<script>
import footerBtn from "./footer-btn";
import emptySearchView from "./listViewEmpty";
import allPage from "./listViewSuccess";
import favoritePage from "./listFavoriteView";
import searchbar from "./searchbar.vue";
export default {
  components: {
    footerBtn,
    allPage,
    emptySearchView,
    favoritePage,
    searchbar,
  },

  data() {
    return {
      i: 0,
      url: `https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`,
      empty: false,
    };
  },

  computed: {
    filterTest() {
      return this.filterPokemon.length;
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
