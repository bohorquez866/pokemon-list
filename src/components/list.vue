<template>
  <list-success>
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
  </list-success>
</template>

<script>
import listSuccess from "./listViewSuccess.vue";
export default {
  components: {
    listSuccess,
  },
  data() {
    return {};
  },

  methods: {},
  mounted() {},
};
</script>
