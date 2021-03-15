require("./bootstrap");

import Vue from "vue";
import Swal from "sweetalert2";

window.Vue = require("vue");

import VueRouter from "vue-router";
Vue.use(VueRouter);
import { routes } from "./dash/routes";


import Vuex from 'vuex'
Vue.use(Vuex)
import storeData from "./dash/store/admin.js"
const store = new Vuex.Store(
    storeData
 )

const router = new VueRouter({
    routes,
    mode: "history",
});





// Shared Components
Vue.component('side-menu', require('./dash/components/shared/side-menu.vue').default);




const app = new Vue({
    el: "#app",
    router,
    store,
    beforeCreate: function () {
    },
});




