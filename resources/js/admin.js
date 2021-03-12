require("./bootstrap");

import Vue from "vue";

window.Vue = require("vue");

import VueRouter from "vue-router";
Vue.use(VueRouter);
import { routes } from "./routes";


import Vuex from 'vuex'
Vue.use(Vuex)
import storeData from "./store/admin.js"
const store = new Vuex.Store(
    storeData
 )

const router = new VueRouter({
    routes,
    mode: "history",
});

const app = new Vue({
    el: "#app",
    router,
    store,
    beforeCreate: function () {
        alert("hello");
    },
});
