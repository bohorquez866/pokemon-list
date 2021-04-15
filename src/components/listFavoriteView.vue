<template>
  <article class="list--success">
    <ul>
      <li v-for="(pokemon, index) in ultimateFilter" :key="index">
        <p @click="showModal(index, pokemon.id++)" class="pokemon-name">
          {{ pokemon.name }}
        </p>

        <favorite-star
          @add-favorite="addFavorite(pokemon.name)"
          :pokemon-name="pokemon.name"
        />
        <modal-view
          @copy-text="copyText"
          @hide-modal="hideModal"
          :name="pokemon.name"
        />
      </li>
    </ul>
  </article>
</template>

<script>
import modalView from "./modalPokemon.vue";
import favoriteStar from "./rate-star";
export default {
  components: { modalView, favoriteStar },
  computed: {
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
    copiedTypes() {
      return this.$store.state.modalData.types.forEach((type) => {
        return type.name;
      });
    },
  },

  methods: {
    copyText() {
      navigator.clipboard.writeText(`
Name:  ${this.$store.state.modalData.name}
Weight: ${this.$store.state.modalData.weight}
Height: ${this.$store.state.modalData.height}
types: ${Array.from(this.$store.state.modalData.types)}`);
      setTimeout(() => {
        this.$store.state.copyAlert = true;
      }, 1000);
    },
    fetchModal(urlName) {
      let url = `https://pokeapi.co/api/v2/pokemon/${urlName}`;
      fetch(url)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          let typesData = [];
          let spriteImg = data.sprites.other.dream_world.front_default;

          data.types.forEach((type) => {
            typesData.push(type.type.name);
          });

          this.$store.state.modalData = {
            id: data.id,
            name: data.name,
            weight: data.weight,
            height: data.height,
            types: typesData,
            sprite: spriteImg,
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },

    hideModal() {
      if (this.$store.state.modalView) this.$store.state.modalView = false;
    },
    showModal(id) {
      this.fetchModal(id + 1);
      this.$store.state.modalView = true;
      this.$store.state.modalId = id;
    },
    addFavorite(pokemonName) {
      this.$store.state.isFavorite.includes(pokemonName)
        ? this.$store.state.isFavorite.pop(pokemonName)
        : this.$store.state.isFavorite.push(pokemonName);
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
