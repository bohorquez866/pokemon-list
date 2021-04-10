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
        <li v-for="pokemon in filterPokemon" :key="pokemon.id">
          {{ pokemon.name }}
          <figure>
            <img
              v-if="!isFavorite"
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

    <empty-search-view v-if="filterPokemon" />
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
      isFavorite: true,
      url: `https://pokeapi.co/api/v2/pokemon?offset=300&limit=160`,
      nextURL: "",
      pokemons: [],
      search: "",
      loaded: this.$store.state.isLoaded,
    };
  },

  computed: {
    filterPokemon() {
      return this.pokemons.filter((poke) => {
        return poke.name.match(this.search);
      });
    },
  },

  methods: {
    fetchData() {
      let req = this.url;
      fetch(req)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          data.results.forEach((pokemon) => this.pokemons.push(pokemon));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.fetchData();
    document.onreadystatechange = () => {
      if (document.readyState === "complete") {
        this.loaded = true;
      } else {
        this.loaded = false;
      }
    };
  },
};
</script>
