import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";

import homeApp from "./components/homeApp.vue";
import listView from "./components/list.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: homeApp },
        { path: "/list", component: listView },
    ],
});

const store = createStore({
    state() {
        return {
            isLoaded: false,
            isFavorite: [],
            pokemons: [],
            favoritePokemons: [],
            modalData: [],
            search: "",
            loaded: false,
            favoritePage: false,
            allPage: true,
            filterCheck: null,
            modalView: false,
            modalId: null,
            copyAlert: null,
        };
    },
});

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");