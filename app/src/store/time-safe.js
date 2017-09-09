import createLogger from 'vuex/dist/logger'
import * as types from './mutation-types'
import { TimeSafe } from '../contracts'
/* global web3:true */

const debug = process.env.NODE_ENV !== 'production'

const timeSafe = {
  state: {
    lockedUntil: 0,
    totalDeposits: 0
  },
  getters: {
    lockedUntil: state => state.lockedUntil,
    totalDeposits: state => web3.fromWei(state.totalDeposits, 'ether')
  },
  actions: {
    getContractConstants ({commit, state, rootState}) {
      TimeSafe.deployed()
        .then(instance => instance.lockedUntil.call({from: rootState.common.account}))
        .then((lockedUntil) => commit(types.TIMESAFE_CONSTANTS, lockedUntil.valueOf()))
        .catch((err) => {
          console.error(err)
          commit(types.UPDATE_STATUS, 'Error getting contract constants; see log.')
        })
    },
    getContractReadOnlyData ({commit, state}) {
      commit(types.TIMESAFE_READONLY, 100000000000000)
    }
  },
  mutations: {
    [types.TIMESAFE_CONSTANTS] (state, constants) {
      state.lockedUntil = constants
    },
    [types.TIMESAFE_READONLY] (state, readOnly) {
      state.totalDeposits = readOnly
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
}

export default timeSafe
