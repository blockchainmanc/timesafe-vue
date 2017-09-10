import createLogger from 'vuex/dist/logger'
import * as types from './mutation-types'
import { TimeSafe } from '../contracts'
/* global web3:true */

const debug = process.env.NODE_ENV !== 'production'

const timeSafe = {
  state: {
    lockedUntil: 0,
    totalDeposits: 0,
    depositsCount: 0,
    withdrawalsCount: 0,
    locked: ''
  },
  getters: {
    // lockedUntil: state => new Date(state.lockedUntil * 1000).toDateString(),
    lockedUntil: state => state.lockedUntil,
    totalDeposits: state => web3.fromWei(state.totalDeposits, 'ether'),
    depositsCount: state => state.depositsCount,
    withdrawalsCount: state => state.withdrawalsCount,
    locked: state => state.locked
  },
  actions: {
    getContractConstants ({commit, state, rootState}) {
      TimeSafe.deployed()
        .then(instance => instance.lockedUntil.call({from: rootState.common.account}))
        .then((lockedUntil) => commit(types.TIMESAFE_CONSTANTS, lockedUntil.valueOf()))
        .catch((err) => {
          console.error(err)
          commit(types.UPDATE_STATUS, 'Error getContractConstants; see log.')
        })
    },
    getContractReadOnlyData ({commit, state, rootState}) {
      TimeSafe.deployed().then(instance => Promise.all([
        instance.totalDeposits.call({from: rootState.common.account}),
        instance.depositsCount.call({from: rootState.common.account}),
        instance.withdrawalsCount.call({from: rootState.common.account}),
        instance.locked.call({from: rootState.common.account})
      ]))
        .then((constants) => commit(types.TIMESAFE_READONLY, constants))
        .catch((err) => {
          console.error(err)
          commit(types.UPDATE_STATUS, 'Error getContractReadOnlyData; see log.')
        })
    }
  },
  mutations: {
    [types.TIMESAFE_CONSTANTS] (state, constants) {
      state.lockedUntil = constants
    },
    [types.TIMESAFE_READONLY] (state, constants) {
      state.totalDeposits = constants[0].toString(10)
      state.depositsCount = constants[1].toString(10)
      state.withdrawalsCount = constants[2].toString(10)
      state.locked = constants[3].valueOf()
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
}

export default timeSafe
