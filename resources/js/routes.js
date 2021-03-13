import Home from "./Pages/Home.vue";
import Login from "./Pages/Login.vue";

import store from "./store/admin";

const ifAuth = (to, from, next) => {
    if (store.state.auth == true) {
        next();
        return;
    }
    next("/admin/login");
};

const ifNotAuth = (to, from, next) => {
    if (store.state.auth != true) {
        next();
        return;
    }
    next("/admin");
};

export const routes = [
    {
        path: "/admin",
        component: Home
    },
    {
        path: "/admin/profile",
        component: Home,
        beforeEnter: ifAuth
    },
    {
        path: "/admin/login",
        component: Login,
        beforeEnter: ifNotAuth
    }
];
