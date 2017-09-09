<template>
  <div class="time-safe">

    <header>
      <img src="../assets/logo.png" class="logo"/>
      <h1>TimeSafe</h1>
    </header>


    <section>
      <div id="wrapper-top">
        <div>Locked until: <span>{{ lockedUntil }}</span></div>
      </div>
    </section>

    <section>
      <div id="wrapper-middle">
        <div>Total Ether: <span id="total" :class="{green: totalDeposits !== '0'}">{{ totalDeposits }} ETH</span></div>
      </div>
    </section>

    <footer></footer>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  //  import * as types from '../store/mutation-types'

  export default {
    name: 'time-safe',
    computed: {
      ...mapGetters([
        'lockedUntil',
        'totalDeposits'
      ])
    },
    mounted () {
      this.$store.dispatch('getContractConstants')
      this.$store.dispatch('getContractReadOnlyData')
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #wrapper-top {
    display: -webkit-flex;
    -webkit-justify-content: center;

    display: flex;
    justify-content: center;

    font-size: 32px;
  }

  #wrapper-top div {
    -webkit-flex: 1;
    flex: 1;
  }

  #wrapper-middle {
    display: -webkit-flex;
    -webkit-justify-content: center;

    display: flex;
    justify-content: center;

    font-size: 24px;
  }

  #wrapper-middle div {
    -webkit-flex: 1;
    flex: 1;
  }

  #wrapper-bottom {
    display: -webkit-flex;
    -webkit-justify-content: center;

    display: flex;
    justify-content: center;

    font-size: 18px;
    color: darkgray;
  }

  #wrapper-bottom div {
    -webkit-flex: 1;
    flex: 1;
  }

  #total.green {
    color: #006600;
    font-weight: bold;
  }

  .bold {
    font-weight: bold;
  }
</style>
