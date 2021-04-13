<template>
  <article>
    <ul>
      <li v-for="(pokemon, index) in ultimateFilter" :key="index">
        <p @click="showModal(index, pokemon.id++)" class="pokemon-name">
          {{ pokemon.name }}
        </p>

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
              <img
                :src="$store.state.modalData.sprite"
                alt=""
                class="pokemon-picture"
              />
              <img src="../assets/img/modal-bg.svg" alt="" />
            </figure>
            <p><strong>Name: </strong> {{ $store.state.modalData.name }}</p>
            <p><strong>Weight:</strong> {{ $store.state.modalData.weight }}</p>
            <p><strong>Height:</strong> {{ $store.state.modalData.height }}</p>
            <p>
              <strong>Types:</strong>
              <span
                v-for="typeName in $store.state.modalData.types"
                :key="typeName"
              >
                {{ ` ${typeName} ` }}
              </span>
            </p>

            <div class="share-button">
              <div
                class="notification-copy"
                :class="{ active: $store.state.copyAlert }"
              >
                Pokemon Data copied to Clipboard
              </div>
              <input type="text" v-model="copiedText" />
              <button @click="copyText" class="btn btn-primary">
                Share to my friends
              </button>

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
  data() {
    return {
      copiedText: `
Name:  ${this.$store.state.modalData.name}
Weight: ${this.$store.state.modalData.weight}
Height: ${this.$store.state.modalData.height}
types: ${this.copiedTypes}`,
    };
  },
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

      console.log(this.$store.state.copyAlert);
      if (this.$store.state.copyAlert === null) {
        setTimeout(() => {
          return this.$store.state.copyAlert;
        }, 500);
      } else {
        return !this.$store.state.copyAlert;
      }
      console.log(this.$store.state.copyAlert);
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
      return this.$store.state.isFavorite.includes(pokemonName)
        ? this.$store.state.isFavorite.pop(pokemonName)
        : this.$store.state.isFavorite.push(pokemonName);
    },
  },
};
</script>
