<template>
  <div id="time-safe-totals">
    <div><span id="total" v-bind:class="{ green: totalDeposits !== '0' }">{{ totalDeposits }} ETH</span></div>
    <div>
      Deposits: <span>{{ depositsCount }}</span>
      Withdrawals: <span>{{ withdrawalsCount }}</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'time-safe-total',
    computed: {
      ...mapGetters([
        'totalDeposits',
        'depositsCount',
        'withdrawalsCount'
      ])
    }
  }
</script>

<style scoped>
  #total {
    font-size: 3em;
    color: #7f7f7f;
    font-weight: bold;
  }

  #total.green {
    color: #006600;
  }
</style>
