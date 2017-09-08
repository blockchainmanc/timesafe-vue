import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import pariMutuel from './pari-mutuel'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common: common,
    pariMutuel: pariMutuel
  }
})
