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

          <transactions></transactions>
        </aside>

      </div>
    </section>

    <div id="status">{{ status }}</div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import LockedUntil from './LockedUntil'
  import MyAccount from './MyAccount'
  import DepositForm from './DepositForm'
  import TimeSafeTotal from './TimeSafeTotal'
  import WithdrawalForm from './WithdrawalForm'
  import Transactions from './Transactions'

  export default {
    components: {
      Transactions,
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
        'status'
      ])
    },
    mounted () {
      this.$store.dispatch('getContractConstants')
      this.$store.dispatch('getContractReadOnlyData')

      this.lockCheckInterval = setInterval(() => {
        this.$store.dispatch('getContractReadOnlyData')
      }, 1000)
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
