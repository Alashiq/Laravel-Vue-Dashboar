require("./bootstrap");

import Vue from "vue";
import Swal from "sweetalert2";

window.Vue = require("vue");

import VueRouter from "vue-router";
Vue.use(VueRouter);
import { routes } from "./admin/routes";


import Vuex from 'vuex'
Vue.use(Vuex)
import storeData from "./admin/store/index.js"
const store = new Vuex.Store(
    storeData
 )

const router = new VueRouter({
    routes,
    mode: "history",
});





// Shared Components
Vue.component('side-menu', require('./admin/components/shared/side-menu.vue').default);
Vue.component('header-bar', require('./admin/components/shared/header-bar.vue').default);
Vue.component('empty-box', require('./admin/components/shared/empty-box.vue').default);




const app = new Vue({
    el: "#app",
    router,
    store,
    beforeCreate: function () {
    },
});




