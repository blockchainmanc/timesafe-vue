import createLogger from 'vuex/dist/logger'
import * as types from './mutation-types'

const debug = process.env.NODE_ENV !== 'production'

const common = {
  state: {
    account: '',
    status: ''
  },
  getters: {
    account: state => state.account,
    status: state => state.status
  },
  actions: {
    // action is dispatched when account is first set
    // this is where you can put your initialization calls
    setAccount ({commit, dispatch, state}, account) {
      commit(types.UPDATE_ACCOUNT, account)
    },
    // action is dispatched when/if the account is updated
    // use this action to refresh the app with the new account's data
    updateAccount ({commit, dispatch, state}, account) {
      commit(types.UPDATE_ACCOUNT, account)
    }
  },
  mutations: {
    // this mutatation is called when the route changes
    [types.ROUTE_CHANGED] (state, {to, from}) {
      console.log('route changed from', from.name, 'to', to.name)
    },
    [types.UPDATE_ACCOUNT] (state, account) {
      state.account = account
    },
    [types.UPDATE_STATUS] (state, status) {
      state.status = status
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
}

export default common
