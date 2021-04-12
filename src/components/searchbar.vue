<template>
  <div>
    <form class="searchbar">
      <div class="search-wrap">
        <img src="../assets/img/search.svg" alt="search icon" />

        <input
          v-model="$store.state.search"
          type="search"
          id="input-seach"
          class="search-input"
          placeholder="Search"
        />
      </div>
    </form>
  </div>
</template>
