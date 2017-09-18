<template>
  <div id="locked-until">
    <locked-icon isLocked="locked"></locked-icon>
    <div id="locked-until-timestamp">Until: {{ lockedUntil }}</div>
    <div id="last-block-timestamp">Last: {{ blockTimestamp }}</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import LockedIcon from './LockedIcon'

  export default {
    components: {LockedIcon},
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
  #locked-until {
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
