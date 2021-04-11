<template>
  <div class="modal">
    <article class="modal--content">
      <div class="close"></div>
      <figure class="modal-bg">
        <img src="../assets/img/modal-bg.svg" alt="" />
      </figure>
      <p><strong>Name: </strong> {{}}</p>
      <p><strong>Weight:</strong> {{}}</p>
      <p><strong>Height:</strong> {{}}</p>
      <p><strong>Types:</strong> {{}}</p>
      <div class="share-button">
        <button class="btn btn-primary">Share to my friends</button>
        <figure class="rate-star">
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
      </div>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
