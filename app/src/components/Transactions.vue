<template>
  <div id="transactions">
    <h3>Transactions</h3>
    <ul id="deposit-events">
      <li v-for="depositEvent in depositEvents">
        <icon name="plus-circle"></icon>
        {{ depositEvent.account }}: {{ depositEvent.amount }} ETH
      </li>
    </ul>
    <ul id="withdrawal-events">
      <li v-for="withdrawalEvent in withdrawalEvents">
        <icon name="minus-circle"></icon>
        {{ withdrawalEvent.args._from }}: {{ withdrawalEvent.args._value }} ETH
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Icon from '../../node_modules/vue-awesome/components/Icon'
  import { TimeSafe } from '../contracts'
  import * as types from '../store/mutation-types'

  export default {
    components: {Icon},
    name: 'transactions',
    computed: {
      ...mapGetters([
        'depositEvents',
        'withdrawalEvents'
      ])
    },
    mounted () {
      this.$store.dispatch('getContractConstants')
      this.$store.dispatch('getContractReadOnlyData')

      this.lockCheckInterval = setInterval(() => {
        this.$store.dispatch('getContractReadOnlyData')
      }, 1000)

      TimeSafe.deployed().then(instance => {
        const deposits = instance.Deposit({fromBlock: 0, toBlock: 'latest'})
        const withdrawals = instance.Withdrawal({fromBlock: 0, toBlock: 'latest'})
        deposits.watch((error, result) => {
          if (error !== null) {
            this.$store.commit(types.UPDATE_STATUS, 'Error watching events!')
            return
          }

          this.$store.commit(types.TIMESAFE_DEPOSIT_EVENT, result)
        })
        withdrawals.watch((error, result) => {
          if (error !== null) {
            this.$store.commit(types.UPDATE_STATUS, 'Error watching events!')
            return
          }

          this.$store.commit(types.TIMESAFE_WITHDRAWAL_EVENT, result)
        })
      })
    }
  }
</script>

<style scoped>
  #transactions {
    padding-top: 2em;
  }
</style>
