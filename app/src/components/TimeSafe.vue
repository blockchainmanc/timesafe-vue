<template>
  <div class="time-safe">

    <header>
      <h1>Time Safe</h1>
    </header>

    <section class="content">
      <div class="columns">

        <main class="main">
          <locked-until></locked-until>
        </main>

        <aside class="sidebar-second">
          <my-account></my-account>

          <deposit-form></deposit-form>

          <withdrawal-form></withdrawal-form>
        </aside>

        <aside class="sidebar-first">
          <time-safe-total></time-safe-total>

          <div>
            Transactions:
            <ul id="deposit-events">
              <li v-for="depositEvent in depositEvents">
                + {{ depositEvent.account }}: {{ depositEvent.amount }} ETH
              </li>
            </ul>
            <ul id="withdrawal-events">
              <li v-for="withdrawalEvent in withdrawalEvents">
                - {{ withdrawalEvent.args._from }}: {{ withdrawalEvent.args._value }} ETH
              </li>
            </ul>
          </div>
        </aside>

      </div>
    </section>

    <div id="status">{{ status }}</div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../store/mutation-types'
  import { TimeSafe } from '../contracts'
  import LockedUntil from './LockedUntil'
  import MyAccount from './MyAccount'
  import DepositForm from './DepositForm'
  import TimeSafeTotal from './TimeSafeTotal'
  import WithdrawalForm from './WithdrawalForm'

  export default {
    components: {
      WithdrawalForm,
      TimeSafeTotal,
      DepositForm,
      MyAccount,
      LockedUntil
    },
    name: 'time-safe',
    data () {
      return {
        lockCheckInterval: null
      }
    },
    computed: {
      ...mapGetters([
        'locked',
        'status',
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
    },
    beforeDestroy () {
      clearInterval(this.lockCheckInterval)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .content {
    display: -webkit-flex;
    -webkit-justify-content: center;
    display: flex;
    justify-content: center;
    flex: 1;
    flex-direction: column;
    color: #000;
  }

  .columns {
    display: flex;
    flex: 1;
  }

  .main {
    flex: 1;
    order: 2;
  }

  .sidebar-first {
    width: 30%;
    order: 1;
  }

  .sidebar-second {
    width: 30%;
    order: 3;
  }

  #status {
    color: #7f7f7f;
    text-align: center;
    margin: 2em;
  }
</style>
