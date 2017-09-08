import createLogger from 'vuex/dist/logger'
import * as types from './mutation-types'
import axios from 'axios'
/* global web3:true */

axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'api.etherest.io:8080'
export const EtherScan = axios.create({
  baseURL: `https://api.etherest.io:8080/v1/main/0x7a2770fC68c659B0255D6D80bed82c7b0F163d6b/`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

const debug = process.env.NODE_ENV !== 'production'

const CONTRACT_STATES = ['Pre-Fight', 'DuringEvent', 'PostEvent', 'Refunding']
// const OUTCOMES = ['Mayweather', 'McGregor']

const pariMutuel = {
  state: {
    totalWagered: '',
    totalWageredForOutcomes: [],
    betAmount: '',
    betOutcome: '',
    contractState: '',
    percentRake: '',
    minBetAmount: '',
    numberOfOutcomes: ''
  },
  getters: {
    totalWagered: state => state.totalWagered,
    totalWageredForOutcomes: state => state.totalWageredForOutcomes,
    betAmount: state => state.betAmount,
    betOutcome: state => state.betOutcome,
    contractState: state => state.contractState,
    percentRake: state => state.percentRake,
    minBetAmount: state => state.minBetAmount,
    numberOfOutcomes: state => state.numberOfOutcomes
  },
  actions: {
    // getConstants ({commit, state, rootState}) {
    //   PariMutuel.deployed().then(instance => Promise.all([
    //     instance.state.call({from: rootState.common.account}),
    //     instance.percentRake.call({from: rootState.common.account}),
    //     instance.minBetAmount.call({from: rootState.common.account}),
    //     instance.numberOfOutcomes.call({from: rootState.common.account})
    //   ]))
    //     .then((constants) => commit(types.UPDATE_CONSTANTS, constants))
    //     .catch((err) => {
    //       console.error(err)
    //       commit(types.UPDATE_STATUS, 'Error getting contract constants; see log.')
    //     })
    // },
    getTotalWagered ({commit, state}) {
      EtherScan.get(`totalWagered`)
        .then(response => commit(types.UPDATE_TOTAL_WAGERED, response))
        .catch(e => console.error(`${e}`))
    },
    getTotalWageredForOutcomes ({commit, state}) {
      Promise.all([EtherScan.get(`totalWageredForOutcome/0/`), EtherScan.get(`totalWageredForOutcome/1/`)])
        .then(response => commit(types.UPDATE_TOTAL_WAGERED_FOR_OUTCOMES, response))
        .catch(e => console.error(`${e}`))
    },
    bet ({commit, dispatch, state, rootState}) {
      commit(types.UPDATE_STATUS, `Initiating PM bet transaction sending... ${state.betAmount}`)
      // PariMutuel.deployed().then(instance => instance.bet(
      //   state.betOutcome,
      //   {
      //     from: rootState.common.account,
      //     value: web3.toWei(state.betAmount, 'ether')
      //   }))
      //   .then(() => {
      //     dispatch('getTotalWagered')
      //     commit(types.UPDATE_STATUS, 'PM bet transaction complete!')
      //   })
      //   .catch((err) => {
      //     console.error(err)
      //     commit(types.UPDATE_STATUS, 'Error sending to PM; see log.')
      //   })
    }
  },
  mutations: {
    [types.UPDATE_TOTAL_WAGERED] (state, totalWagered) {
      state.totalWagered = web3.fromWei(totalWagered.data.response, 'ether')
    },
    [types.UPDATE_TOTAL_WAGERED_FOR_OUTCOMES] (state, totalWageredForOutcomes) {
      state.totalWageredForOutcomes = totalWageredForOutcomes.map(response => web3.fromWei(response.data.response, 'ether'))
    },
    [types.UPDATE_BET_AMOUNT] (state, betAmount) {
      state.betAmount = betAmount
    },
    [types.UPDATE_BET_OUTCOME] (state, betOutcome) {
      state.betOutcome = betOutcome
    },
    [types.UPDATE_CONSTANTS] (state, constants) {
      state.contractState = CONTRACT_STATES[constants[0].toString(10)]
      state.percentRake = constants[1].toString(10)
      state.minBetAmount = constants[2].toString(10)
      state.numberOfOutcomes = constants[3].toString(10)
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
}

export default pariMutuel
