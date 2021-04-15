<template>
  <footer class="lower-menu">
    <div class="btns">
      <button
        @click="emitWatchAllPage"
        :class="{ active: $store.state.allPage }"
        class="btn btn-secondary"
      >
        <img src="../assets/img/list.svg" alt="list Icon" />
        <p>All</p>
      </button>

      <button
        @click="emitWatchFavoritePage"
        :class="{ active: $store.state.favoritePage }"
        class="btn btn-secondary"
      >
        <img src="../assets/img/white-star.svg" alt="list Icon" />
        <p>Favorites</p>
      </button>
    </div>
  </footer>
</template>

<script>
export default {
  emits: ["emit-page", "emit-fav-page"],

  methods: {
    emitWatchAllPage() {
      this.$emit("emit-page");
    },
    emitWatchFavoritePage() {
      this.$emit("emit-fav-page");
    },
  },
};
</script>
