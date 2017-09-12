<template>
  <div class="time-safe">

    <header>
      <h1>Time Safe</h1>
    </header>

    <section class="content">
      <div class="columns">

        <main class="main">
          <div>
            <icon name="lock" label="locked" scale="8" v-if="locked" class="locked"></icon>
            <icon name="unlock" label="unlocked" scale="8" v-if="!locked" class="unlocked"></icon>
            <div id="locked-until-timestamp">{{ lockedUntil }}</div>
          </div>
          <div class="muted">Last block: {{ blockTimestamp }}</div>
        </main>

        <aside class="sidebar-first">
          <div id="total-ether"><span id="total" v-bind:class="{ green: totalDeposits !== '0' }">{{ totalDeposits }} ETH</span></div>
          <div>Deposits count: <span>{{ depositsCount }}</span></div>
          <div>Withdrawals count: <span>{{ withdrawalsCount }}</span></div>
          <div class="muted">{{ status }}</div>
        </aside>

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

      </div>
    </section>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../store/mutation-types'

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
        'depositAmount'
      ])
    },
    mounted () {
      this.$store.dispatch('getContractConstants')
      this.$store.dispatch('getContractReadOnlyData')

      this.lockCheckInterval = setInterval(() => {
        this.$store.dispatch('getContractReadOnlyData')
      }, 1000)
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

  #total-ether {
    font-size: 3em;
  }

  #locked-until-timestamp {
    font-size: 2em;
  }

  #total.green {
    color: #006600;
    font-weight: bold;
  }

  #withdrawal button {
    background-color: darkorange;
  }
</style>
