<template>
  <div id="app">
    <router-view></router-view>


    <section>
      <hr/>
      <span id="account">
      Account: {{ account }}
    </span>
    </section>
  </div>
</template>

<script>
  /* global web3:true */

  import Web3 from 'web3'
  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    data () {
      return {
        accountInterval: null
      }
    },
    computed: {
      ...mapGetters(['account'])
    },
    mounted () {
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 === 'undefined') {
        console.error('No web3 detected...')
        return
      }

      if (web3) {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider)

        // keep account updated if user decides to switch
        this.$store.dispatch('setAccount', web3.eth.accounts[0])
        this.accountInterval = setInterval(() => {
          const account = web3.eth.accounts[0]
          if (account !== this.account) {
            this.$store.dispatch('updateAccount', account)
          }
        }, 1000)
      }
    },
    beforeDestroy () {
      clearInterval(this.accountInterval)
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 60px auto;
    max-width: 700px;
    padding: 0em 1em;
  }

  section, footer {
    margin-top: 4em;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.25em;
  }

  input {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    width: 100%;
    padding: 0.5em;
    font-size: 1em;
    border: 1px solid #ccc;
    margin-bottom: 1em;
  }

  button {
    padding: 0.5em 1em;
    background-color: #006600;
    font-size: 1em;
    color: white;
    cursor: pointer;
    border: 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: block;
    margin: 10px;
  }

  a {
    color: #006600;
  }

  .muted {
    color: #7f7f7f;
  }

  .alert {
    color: darkred;
  }

  .logo {
    float: left;
    width: 75px;
  }

  #account {
    color: #7f7f7f;
    float: right;
    font-size: 0.75em;
  }
</style>
