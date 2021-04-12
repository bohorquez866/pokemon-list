<template>
  <article>
    <ul>
      <li
        @click="showModal(index, pokemon.id)"
        v-for="(pokemon, index) in ultimateFilter"
        :key="index"
      >
        <p>{{ pokemon.name }}</p>

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

        <div class="modal" v-if="$store.state.modalView">
          <article class="modal--content">
            <div class="close"></div>
            <figure class="modal-bg">
              <span @click="hideModal"
                ><img src="../assets/img/close.svg" alt=""
              /></span>
              <img src="../assets/img/modal-bg.svg" alt="" />
            </figure>
            <p><strong>Name: </strong> {{ $store.state.modalData.name }}</p>
            <p><strong>Weight:</strong> {{}}</p>
            <p><strong>Height:</strong> {{}}</p>
            <p><strong>Types:</strong> {{}}</p>
            <div class="share-button">
              <button class="btn btn-primary">Share to my friends</button>
              <figure class="rate-star">
                <img
                  v-if="!$store.state.isFavorite"
                  src="../assets/img/grey-star.svg"
                  alt="grey start"
                />
                <img
                  v-else
                  src="../assets/img/gold-star.svg"
                  alt="favorite yellow star"
                />
              </figure>
            </div>
          </article>
        </div>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  components: {},
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
  },

  methods: {
    fetchModal(urlName) {
      let url = `https://pokeapi.co/api/v2/pokemon/${urlName}`;
      fetch(url)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          this.$store.state.modalData.push({
            name: data.id,
            weight: data.weight,
            height: data.height,
            types: data.types,
          });
          console.log(`Single Pokemon Data:`, data);
          console.log(this.$store.state.modalData);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    hideModal() {
      if (this.$store.state.modalView) this.$store.state.modalView = false;
    },
    showModal(id) {
      this.fetchModal(id);
      this.$store.state.modalView = true;
      this.$store.state.modalId = id;
      console.log(id);
    },

    addFavorite(pokemonName) {
      return this.$store.state.isFavorite.includes(pokemonName)
        ? this.$store.state.isFavorite.pop(pokemonName)
        : this.$store.state.isFavorite.push(pokemonName);
    },
  },
};
</script>
