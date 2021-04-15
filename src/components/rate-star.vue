<template>
  <figure @click="emitAddFavorite" class="rate-star">
    <img
      v-if="!$store.state.isFavorite.includes(pokemonName)"
      src="../assets/img/grey-star.svg"
      alt="grey start"
    />
    <img v-else src="../assets/img/gold-star.svg" alt="favorite yellow star" />
  </figure>
</template>

<script>
export default {
  props: {
    pokemonName: { type: String, required: true },
  },
  methods: {
    emitAddFavorite() {
      this.$emit("add-favorite");
    },
  },
};
</script>
