<template>
  <form @submit.prevent="depositHandler" v-if="locked" id="deposit">
    <label for="depositAmount">Deposit amount in ETH: </label>
    <input type="number" id="depositAmount" placeholder="" v-bind:value="depositAmount" @input="updateDepositAmount" min="0"/>
    <button type="submit">Deposit</button>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../store/mutation-types'

  export default {
    name: 'deposit-form',
    computed: {
      ...mapGetters([
        'locked',
        'depositAmount'
      ])
    },
    methods: {
      depositHandler () {
        if (isNaN(this.depositAmount) || this.depositAmount === '0' || this.depositAmount === '') {
          this.$store.commit(types.UPDATE_STATUS, `Deposit invalid`)
          return
        }

        this.$store.dispatch('deposit')
      },
      updateDepositAmount (e) {
        this.$store.commit(types.TIMESAFE_DEPOSIT_AMOUNT, e.target.value)
      }
    }
  }
</script>

<style scoped>
  form {
    padding-top: 2em;
  }
</style>
