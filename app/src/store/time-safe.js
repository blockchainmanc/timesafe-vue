import createLogger from 'vuex/dist/logger'
import * as types from './mutation-types'
import { TimeSafe } from '../contracts'
/* global web3:true */

const debug = process.env.NODE_ENV !== 'production'

const timeSafe = {
  state: {
    lockedUntil: '',
    totalDeposits: 0,
    depositsCount: 0,
    withdrawalsCount: 0,
    locked: true,
    blockTimestamp: '',
    depositAmount: 0,
    accountBalance: 0,
    depositEvents: []
  },
  getters: {
    lockedUntil: state => new Date(state.lockedUntil * 1000).toLocaleString(),
    totalDeposits: state => web3.fromWei(state.totalDeposits, 'ether'),
    depositsCount: state => state.depositsCount,
    withdrawalsCount: state => state.withdrawalsCount,
    locked: state => state.locked,
    blockTimestamp: state => new Date(state.blockTimestamp * 1000).toLocaleString(),
    depositAmount: state => state.depositAmount,
    accountBalance: state => web3.fromWei(state.accountBalance, 'ether'),
    depositEvents: state => state.depositEvents
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
        instance.locked.call({from: rootState.common.account}),
        instance.blockTimestamp.call({from: rootState.common.account}),
        instance.balances.call(rootState.common.account, {from: rootState.common.account})
      ]))
        .then((constants) => commit(types.TIMESAFE_READONLY, constants))
        .catch((err) => {
          console.error(err)
          commit(types.UPDATE_STATUS, 'Error getContractReadOnlyData; see log.')
        })
    },
    deposit ({commit, dispatch, state, rootState}) {
      commit(types.UPDATE_STATUS, `Depositing ${state.depositAmount} ETH from ${rootState.common.account}`)
      TimeSafe.deployed().then(instance => instance.deposit({
        from: rootState.common.account,
        value: web3.toWei(state.depositAmount, 'ether')
      }))
        .then(() => {
          dispatch('getContractReadOnlyData')
          commit(types.UPDATE_STATUS, `Completed depositing ${state.depositAmount} ETH from ${rootState.common.account}`)
          commit(types.TIMESAFE_DEPOSIT_AMOUNT, '')
        })
        .catch((err) => {
          console.error(err)
          commit(types.UPDATE_STATUS, 'Error sending to PM; see log.')
        })
    },
    withdrawal ({commit, dispatch, state, rootState}) {
      commit(types.UPDATE_STATUS, `Withdrawal for ${rootState.common.account}`)
      TimeSafe.deployed().then(instance => instance.withdrawal({from: rootState.common.account}))
        .then(() => {
          dispatch('getContractReadOnlyData')
          commit(types.UPDATE_STATUS, `Completed Withdrawal for ${rootState.common.account}`)
        })
        .catch((err) => {
          console.error(err)
          commit(types.UPDATE_STATUS, 'Error sending to PM; see log.')
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
      state.blockTimestamp = constants[4].toString(10)
      state.accountBalance = constants[5].toString(10)
    },
    [types.TIMESAFE_DEPOSIT_AMOUNT] (state, depositAmount) {
      state.depositAmount = depositAmount
    },
    [types.TIMESAFE_DEPOSIT_EVENT] (state, event) {
      state.depositEvents.push(event)
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
}

export default timeSafe
