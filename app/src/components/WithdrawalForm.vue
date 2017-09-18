<template>
  <form @submit.prevent="withdrawalHandler" v-if="!locked" id="withdrawal">
    <button type="submit">Withdrawal</button>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'withdrawal-form',
    computed: {
      ...mapGetters([
        'locked'
      ])
    },
    methods: {
      withdrawalHandler () {
        this.$store.dispatch('withdrawal')
      }
    }
  }
</script>

<style scoped>
  form {
    padding-top: 2em;
  }

  #withdrawal button {
    background-color: darkorange;
  }
</style>
