<template>
  <div id="my-account">
    <h2>My Account</h2>
    <div>{{ account }}</div>
    <div id="my-total" v-bind:class="{ green: accountBalance !== '0' }">{{ accountBalance }} ETH</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'my-account',
    computed: {
      ...mapGetters([
        'account',
        'accountBalance'
      ])
    }
  }
</script>

<style scoped>
  #my-total {
    font-size: 2em;
    color: #7f7f7f;
    font-weight: bold;
  }

  #my-total.green {
    color: #006600;
  }

  #transactions {
    padding-top: 2em;
  }
</style>
