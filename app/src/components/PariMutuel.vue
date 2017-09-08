<template>
  <div class="pari-mutuel">

    <header>

    </header>

    <section>
      <div id="wrapper-top">
        <div>Mayweather</div>
        <div>vs</div>
        <div>McGregor</div>
      </div>
    </section>

    <section>
      <div id="wrapper-middle">
        <div>
          Wagered:<br/><span class="bold">{{ totalWageredForOutcomes[0] }} ETH</span>
          <br/>{{ (totalWageredForOutcomes[0] / totalWagered  * 100).toFixed(2) }}%
        </div>
        <div>Total wagered:<br/><span id="total" :class="{green: totalWagered !== '0'}">{{ totalWagered }} ETH</span></div>
        <div>
          Wagered:<br/><span class="bold">{{ totalWageredForOutcomes[1] }} ETH</span>
          <br/>{{ (totalWageredForOutcomes[1] / totalWagered  * 100).toFixed(2) }}%
        </div>
      </div>
    </section>

    <section>
      <div>
        Contract: <a href="https://etherscan.io/address/0x7a2770fc68c659b0255d6d80bed82c7b0f163d6b">0x7a2770fc68c659b0255d6d80bed82c7b0f163d6b</a>
      </div>
    </section>

    <section style="display: none">
      <form @submit.prevent="sendHandler">

        <div id="outcomes">
          <div class="outcome">
            <label for="betOutcomeOne">
              <input id="betOutcomeOne" type="radio" name="betOutcome" :value="0" :checked="betOutcome === '0'" @change="updateBetOutcome"/> Mayweather
              Odds:
            </label>
          </div>

          <div class="outcome">
            <label for="betOutcomeTwo">
              <input id="betOutcomeTwo" type="radio" name="betOutcome" :value="1" :checked="betOutcome === '1'" @change="updateBetOutcome"/> McGregor
              Odds:
            </label>
          </div>
        </div>

        <label for="betAmount">Bet amount in ETH: </label>
        <input type="number" id="betAmount" placeholder="1" :value="betAmount" @input="updateBetAmount"/>

        <button id="send" type="submit">Bet</button>
      </form>
      <p id="status">{{ status }}</p>
    </section>

    <section>
      <div id="wrapper-bottom">
        <div>State: {{ contractState }}</div>
        <div>Rake: {{ percentRake }}%</div>
        <div>Min bet: {{ minBetAmount }} ETH</div>
      </div>
    </section>

    <footer>

    </footer>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../store/mutation-types'

  export default {
    name: 'pari-mutuel',
    computed: {
      ...mapGetters([
        'account',
        'accountDataUrl',
        'status',
        'betAmount',
        'betOutcome',
        'totalWagered',
        'totalWageredForOutcomes',
        'contractState',
        'percentRake',
        'minBetAmount',
        'numberOfOutcomes'
      ])
    },
    methods: {
      sendHandler () {
        if (isNaN(this.betAmount) || this.betAmount === '0' || this.betAmount === '') {
          alert('invalid amount: ' + this.betAmount)
          return
        }

        this.$store.dispatch('bet')
      },
      updateBetAmount (e) {
        this.$store.commit(types.UPDATE_BET_AMOUNT, e.target.value)
      },
      updateBetOutcome (e) {
        this.$store.commit(types.UPDATE_BET_OUTCOME, e.target.value)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #wrapper-top {
    display: -webkit-flex;
    -webkit-justify-content: center;

    display: flex;
    justify-content: center;

    font-size: 32px;
  }

  #wrapper-top div {
    -webkit-flex: 1;
    flex: 1;
  }

  #wrapper-middle {
    display: -webkit-flex;
    -webkit-justify-content: center;

    display: flex;
    justify-content: center;

    font-size: 24px;
  }

  #wrapper-middle div {
    -webkit-flex: 1;
    flex: 1;
  }

  #wrapper-bottom {
    display: -webkit-flex;
    -webkit-justify-content: center;

    display: flex;
    justify-content: center;

    font-size: 18px;
    color: darkgray;
  }

  #wrapper-bottom div {
    -webkit-flex: 1;
    flex: 1;
  }

  #total.green {
    color: #006600;
    font-weight: bold;
  }

  .bold {
    font-weight: bold;
  }
</style>
