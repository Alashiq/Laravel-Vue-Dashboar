require("./bootstrap");

import Vue from "vue";

window.Vue = require("vue");

Vue.component('contact-form', require('./web/components/contact/contact-form.vue').default);

const app = new Vue({
    el: "#web",
    beforeCreate:function(){
    }
});
