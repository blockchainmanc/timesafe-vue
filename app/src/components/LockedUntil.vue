<template>
  <div id="locked-until">
    <icon name="lock" label="locked" scale="8" v-if="locked" class="locked"></icon>
    <icon name="unlock" label="unlocked" scale="8" v-if="!locked" class="unlocked"></icon>
    <div id="locked-until-timestamp">Until: {{ lockedUntil }}</div>
    <div id="last-block-timestamp">Last: {{ blockTimestamp }}</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'locked-until',
    computed: {
      ...mapGetters([
        'lockedUntil',
        'locked',
        'blockTimestamp'
      ])
    }
  }
</script>

<style scoped>
  .locked {
    color: darkred;
  }

  .unlocked {
    color: #006600;
  }

  #lock {
    text-align: center;
  }

  #locked-until-timestamp {
    font-size: 2em;
  }

  #last-block-timestamp {
    font-size: 0.75em;
    color: #7f7f7f;
  }
</style>
