<template>
  <div class="time-safe">

    <header>
      <h1>Time Safe</h1>
    </header>


    <section id="locked-until-section">
      <icon name="lock" label="locked" scale="10" v-if="locked" class="locked"></icon>
      <icon name="unlock" label="unlocked" scale="10" v-if="!locked" class="unlocked"></icon>
      <div id="locked-until">
        <icon name="clock-o" label="clock" scale="4" v-bind:class="{locked: locked}"></icon>
        <br/>
        {{ lockedUntil }}
      </div>
    </section>


    <section>
      <div id="total-ether"><span id="total" v-bind:class="{ green: totalDeposits !== '0' }">{{ totalDeposits }} ETH</span></div>
      <div>Deposits count: <span>{{ depositsCount }}</span></div>
      <div>Withdrawals count: <span>{{ withdrawalsCount }}</span></div>
    </section>

    <section>
      <form @submit.prevent="sendHandler">

        <label for="depositAmount">Deposit amount in ETH: </label>
        <input type="number" id="depositAmount" placeholder="1" v-bind:value="depositAmount" @input="updateDepositAmount"/>

        <button type="submit">Deposit</button>
      </form>

      <p id="status">{{ status }}</p>
    </section>

    <footer>
      Last block timestamp: {{ blockTimestamp }}
    </footer>

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
      }, 3000)
    },
    methods: {
      sendHandler () {
        if (isNaN(this.depositAmount) || this.depositAmount === '0' || this.depositAmount === '') {
          alert('invalid amount: ' + this.depositAmount)
          return
        }

        this.$store.dispatch('deposit')
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
  #locked-until-section {
    display: -webkit-flex;
    -webkit-justify-content: center;

    display: flex;
    justify-content: center;
  }

  #locked-until-section div {
    -webkit-flex: 1;
    flex: 1;
  }

  #locked-until-section .locked {
    color: darkred;
  }

  #locked-until-section .unlocked {
    color: #006600;
  }

  #total-ether {
    font-size: 3em;
  }

  #locked-until {
    font-size: 2em;
    margin: 1em;
  }

  #total.green {
    color: #006600;
    font-weight: bold;
  }

  #status {
    color: #7f7f7f;
    padding-top: 1em;
  }
</style>
