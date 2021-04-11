import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";

import homeApp from "./components/homeApp.vue";
import listView from "./components/list.vue";
import listViewFavorite from "./components/listViewSuccess.vue";
import favoriteView from "./components/listFavoriteView.vue";
import modalView from "./components/modal-pokemon.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: homeApp },
        { path: "/list", component: listView },
        { path: "/list", component: listViewFavorite },
        { path: "/modal", component: modalView },
        { path: "/list/favorite", component: favoriteView },
    ],
});

const store = createStore({
    state() {
        return {
            isLoaded: false,
            isFavorite: [],
            pokemons: [],
            favoritePokemons: [],
        };
    },
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");