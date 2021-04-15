<template>
  <div class="modal" v-if="$store.state.modalView">
    <article class="modal--content">
      <figure class="modal-bg">
        <span @click="emitHideModal"
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
        <span v-for="typeName in $store.state.modalData.types" :key="typeName">
          {{ ` ${typeName} ` }}
        </span>
      </p>

      <div class="share-button">
        <p
          class="notification-copy"
          :class="{ active: $store.state.copyAlert }"
        >
          Pokemon Data copied to Clipboard
        </p>
        <input type="text" v-model="copiedText" />
        <button @click="emitCopyText" class="btn btn-primary">
          Share to my friends
        </button>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: { name: String },

  data() {
    return {
      copiedText: `
Name:  ${this.$store.state.modalData.name}
Weight: ${this.$store.state.modalData.weight}
Height: ${this.$store.state.modalData.height}
types: ${this.copiedTypes}`,
    };
  },

  methods: {
    emitCopyText() {
      this.$emit("copy-text");
    },
    emitHideModal() {
      this.$emit("hide-modal");
    },
    addFavorite(pokemonName) {
      return this.$store.state.isFavorite.includes(pokemonName)
        ? this.$store.state.isFavorite.pop(pokemonName)
        : this.$store.state.isFavorite.push(pokemonName);
    },
  },
};
</script>
