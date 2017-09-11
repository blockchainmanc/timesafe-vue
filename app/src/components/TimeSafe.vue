<template>
  <div class="time-safe">

    <header>
      <h1>Time Safe</h1>
    </header>


    <section id="locked-until-section">
      <icon name="lock" label="locked" scale="10" v-if="locked" class="locked"></icon>
      <icon name="unlock" label="unlocked" scale="10" v-if="!locked" class="unlocked"></icon>
      <div id="locked-until">
        <icon name="clock-o" label="clock" scale="4" v-bind:class="{ locked: lockedUntil > blockTimestamp, unlocked: lockedUntil < blockTimestamp}"></icon>
        <br/>
        {{ lockedUntil }}
      </div>
    </section>


    <section>
      <div id="total-ether"><span id="total" v-bind:class="{ green: totalDeposits !== '0' }">{{ totalDeposits }} ETH</span></div>
      <div>Deposits count: <span>{{ depositsCount }}</span></div>
      <div>Withdrawals count: <span>{{ withdrawalsCount }}</span></div>
    </section>

    <footer>
      Last block timestamp: {{ blockTimestamp }}
    </footer>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  //  import * as types from '../store/mutation-types'

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
        'blockTimestamp'
      ])
    },
    mounted () {
      this.$store.dispatch('getContractConstants')
      this.$store.dispatch('getContractReadOnlyData')

      this.lockCheckInterval = setInterval(() => {
        this.$store.dispatch('getContractReadOnlyData')
      }, 500)
    },
    methods: {
//      sendHandler () {
//        if (isNaN(this.betAmount) || this.betAmount === '0' || this.betAmount === '') {
//          alert('invalid amount: ' + this.betAmount)
//          return
//        }
//
//        this.$store.dispatch('bet')
//      },
//      updateBetAmount (e) {
//        this.$store.commit(types.UPDATE_BET_AMOUNT, e.target.value)
//      },
//      updateBetOutcome (e) {
//        this.$store.commit(types.UPDATE_BET_OUTCOME, e.target.value)
//      }
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
</style>
