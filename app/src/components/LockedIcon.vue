<template>
  <div id="locked-icon">
    <icon name="lock" label="locked" scale="8" v-if="isLocked" class="locked"></icon>
    <icon name="unlock" label="unlocked" scale="8" v-if="!isLocked" class="unlocked"></icon>
  </div>
</template>

<script>
  export default {
    name: 'locked-icon',
    props: {
      isLocked: {
        type: Boolean,
        required: true
      }
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
</style>
