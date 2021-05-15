import Home from "./pages/Home.vue";
import Profile from "./pages/Profile.vue";
import Login from "./pages/Login.vue";
import Messages from "./pages/Messages.vue";
import Message from "./pages/Message.vue";
import Layout from "./pages/Layout.vue";
import Admins from "./pages/Admins.vue";
import Admin from "./pages/Admin.vue";
import NewAdmin from "./pages/NewAdmin.vue";
import Roles from "./pages/Roles.vue";
import NewRoles from "./pages/NewRole.vue";


import store from "./store/index";

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
                path: "admin/message",
                component: Messages
            },
            {
                path: "admin/message/:id",
                component: Message
            },
            {
                path: "admin/profile",
                component: Profile
            },
            {
                path: "admin/admin",
                component: Admins
            },
            {
                path: "admin/admin/new",
                component: NewAdmin
            },
            {
                path: "admin/admin/:id",
                component: Admin
            },
            {
                path: "admin/role",
                component: Roles
            },
            {
                path: "admin/role/new",
                component: NewRoles
            },
        ]
    },
    {
        path: "/admin/login",
        component: Login
        //beforeEnter: ifNotAuth
    }
];
