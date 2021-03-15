import Home from "./pages/Home.vue";
import Profile from "./pages/Profile.vue";
import Login from "./pages/Login.vue";
import Layout from "./pages/Layout.vue";

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
        path: "/",
        name: "layout",
        component: Layout,
        children: [
            {
                path: "admin",
                component: Home
            },
            {
                path: "admin/profile",
                component: Profile,
            },
        ]
    },
    {
        path: "/admin/login",
        component: Login,
        //beforeEnter: ifNotAuth
    }
];
