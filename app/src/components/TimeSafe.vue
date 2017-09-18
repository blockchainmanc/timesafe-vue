<template>
  <div class="time-safe">

    <header>
      <h1>Time Safe</h1>
    </header>

    <section class="content">
      <div class="columns">

        <main class="main">
          <div id="lock">
            <icon name="lock" label="locked" scale="8" v-if="locked" class="locked"></icon>
            <icon name="unlock" label="unlocked" scale="8" v-if="!locked" class="unlocked"></icon>
            <div id="locked-until-timestamp">Until: {{ lockedUntil }}</div>
            <div id="last-block-timestamp">Last: {{ blockTimestamp }}</div>
          </div>
        </main>

        <aside class="sidebar-second">
          <div>My Account: {{ account }}</div>
          <div>My balance: {{ accountBalance }} ETH</div>
        </aside>

        <aside class="sidebar-first">
          <div><span id="total" v-bind:class="{ green: totalDeposits !== '0' }">{{ totalDeposits }} ETH</span></div>
          <div>Deposits count: <span>{{ depositsCount }}</span></div>
          <div>Withdrawals count: <span>{{ withdrawalsCount }}</span></div>
        </aside>

      </div>
    </section>

    <section class="content">
      <div class="columns">

        <main class="main">
        </main>

        <aside class="sidebar-second">
          <form @submit.prevent="depositHandler" v-if="locked" id="deposit">
            <label for="depositAmount">Deposit amount in ETH: </label>
            <input type="number" id="depositAmount" placeholder="" v-bind:value="depositAmount" @input="updateDepositAmount" min="0"/>
            <button type="submit">Deposit</button>
          </form>

          <form @submit.prevent="withdrawalHandler" v-if="!locked" id="withdrawal">
            <button type="submit">Withdrawal</button>
          </form>
        </aside>

        <aside class="sidebar-first">
          Deposits:
          <ul id="deposit-events">
            <li v-for="de in depositEvents">
              {{ de.account }}: {{ de.amount }} ETH
            </li>
          </ul>
          <br/>
          Withdrawals:
          <ul id="withdrawal-events">
            <li v-for="we in withdrawalEvents">
              {{ we.args._from }}:  {{ we.args._value }}
            </li>
          </ul>
        </aside>

      </div>
    </section>

    <div class="muted">{{ status }}</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../store/mutation-types'
  import { TimeSafe } from '../contracts'

  export default {
    name: 'time-safe',
    data () {
      return {
        lockCheckInterval: null
      }
    },
    computed: {
      ...mapGetters([
        'lockedUntil',
        'totalDeposits',
        'depositsCount',
        'withdrawalsCount',
        'locked',
        'blockTimestamp',
        'status',
        'depositAmount',
        'account',
        'accountBalance',
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
    methods: {
      depositHandler () {
        if (isNaN(this.depositAmount) || this.depositAmount === '0' || this.depositAmount === '') {
          this.$store.commit(types.UPDATE_STATUS, `Deposit invalid`)
          return
        }

        this.$store.dispatch('deposit')
      },
      withdrawalHandler () {
        this.$store.dispatch('withdrawal')
      },
      updateDepositAmount (e) {
        this.$store.commit(types.TIMESAFE_DEPOSIT_AMOUNT, e.target.value)
      }
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

  main .locked {
    color: darkred;
  }

  main .unlocked {
    color: #006600;
  }

  .muted {
    color: #7f7f7f;
  }

  #lock {
    text-align: center;
  }

  #locked-until-timestamp {
    font-size: 2em;
  }

  #last-block-timestamp {
    font-size: 0.75em;
    color: #7f7f7f;
  }

  #total {
    font-size: 3em;
    color: #7f7f7f;
    font-weight: bold;
  }

  #total.green {
    color: #006600;
  }

  #withdrawal button {
    background-color: darkorange;
  }
</style>
