import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      loadAuth:false,
      auth:false,
      user:{
          name:"",
          token:""
      }
  },
  mutations: {

  },
  actions: {

  },
  getters : {

  }
})