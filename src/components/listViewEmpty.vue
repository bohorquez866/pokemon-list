<template>
  <article class="list--error">
    <div class="">
      <h1>Uh-oh!</h1>
      <p>You look lost on your journey!</p>
      <router-link to="/" @click="goBack" class="btn btn-primary"
        >Go back home</router-link
      >
    </div>
  </article>
</template>

<script>
export default {
  methods: {
    goBack() {},
  },
};
</script>
