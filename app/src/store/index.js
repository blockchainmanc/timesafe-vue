import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import timeSafe from './time-safe'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common: common,
    timeSafe: timeSafe
  }
})
