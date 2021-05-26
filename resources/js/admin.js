require("./bootstrap");

import Vue from "vue";
import Swal from "sweetalert2";

import DataServices from "./admin/shared/DataServices";
import Alert from "./admin/shared/Alert";
import Loading from "./admin/shared/Loading";
window.Vue = require("vue");

import VueRouter from "vue-router";
Vue.use(VueRouter);
import { routes } from "./admin/routes";


import Vuex from 'vuex'
Vue.use(Vuex)
import storeData from "./admin/store/index.js"
import axios from "axios";

Vue.prototype.$http = DataServices;
Vue.prototype.$alert = Alert;
Vue.prototype.$loading = Loading;

const store = new Vuex.Store(
    storeData
 )

const router = new VueRouter({
    routes,
    mode: "history",
});





// Shared Components
Vue.component('side-menu', require('./admin/components/Layout/side-menu.vue').default);
Vue.component('header-bar', require('./admin/components/Layout/header-bar.vue').default);
Vue.component('empty-box', require('./admin/components/Layout/empty-box.vue').default);
Vue.component('loading-box', require('./admin/components/Layout/loading-box.vue').default);




window.root = new Vue({
    el: "#app",
    router,
    store,
    beforeCreate: function () {
    },
    methods:{
    }
});



