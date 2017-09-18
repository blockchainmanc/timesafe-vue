<template>
  <div id="my-account">
    <div>My Account: {{ account }}</div>
    <div>My balance: {{ accountBalance }} ETH</div>
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
</style>
