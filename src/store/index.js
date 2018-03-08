import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


import test from './mod/test.js'

export default new Vuex.Store({
  modules:{
    test
  }
})