<template>
  <div class="time-safe">

    <header>
      <h1>Time Safe</h1>
    </header>

    <section id="locked-until">
      <icon name="lock" label="locked" scale="8" v-if="locked" class="locked"></icon>
      <icon name="unlock" label="unlocked" scale="8" v-if="!locked" class="unlocked"></icon>

      <span id="locked-until-timstamp">
        <icon name="clock-o" label="clock" scale="2" v-bind:class="{locked: locked, unlocked: !locked}"></icon> {{ lockedUntil }}
      </span>

    </section>

    <section id="status">
      <span>{{ status }}</span>
    </section>

    <section id="accounting">
      <div id="total-ether"><span id="total" v-bind:class="{ green: totalDeposits !== '0' }">{{ totalDeposits }} ETH</span></div>
      <div>Deposits count: <span>{{ depositsCount }}</span></div>
      <div>Withdrawals count: <span>{{ withdrawalsCount }}</span></div>
    </section>
    
    <section v-if="locked" id="deposit">
      <form @submit.prevent="depositHandler">

        <label for="depositAmount">Deposit amount in ETH: </label>
        <input type="number" id="depositAmount" placeholder="1" v-bind:value="depositAmount" @input="updateDepositAmount"/>

        <button type="submit">Deposit</button>
      </form>
    </section>

    <section v-if="!locked" id="withdrawal">
      <form @submit.prevent="withdrawalHandler">
        <button type="submit">Withdrawal</button>
      </form>
    </section>

    <section>
      <span>Last block timestamp: {{ blockTimestamp }}</span>
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
  #locked-until {
    display: -webkit-flex;
    -webkit-justify-content: center;

    display: flex;
    justify-content: center;
  }

  #locked-until div {
    -webkit-flex: 1;
    flex: 1;
  }

  #locked-until .locked {
    color: darkred;
  }

  #locked-until .unlocked {
    color: #006600;
  }

  #total-ether {
    font-size: 3em;
  }

  #locked-until-timstamp {
    font-size: 2em;
    margin: 1em;
  }

  #total.green {
    color: #006600;
    font-weight: bold;
  }

  #status {
    color: #7f7f7f;
  }

  #withdrawal button {
    background-color: darkorange;
  }
</style>
