import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";
import homeApp from "./components/homeApp.vue";
import listView from "./components/list.vue";
import listViewFavorite from "./components/listViewSuccess.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: homeApp },
        { path: "/list", component: listView },
        { path: "/list", component: listViewFavorite },
    ],
});

const store = createStore({
    state() {
        return {
            isLoaded: false,
        };
    },
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");