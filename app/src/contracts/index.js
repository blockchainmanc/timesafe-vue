/* global web3:true */

import contract from 'truffle-contract'

// import artifacts
import timeSafeArtifacts from '../../../build/contracts/TimeSafe.json'

// create contracts
const TimeSafe = contract(timeSafeArtifacts)
TimeSafe.setProvider(web3.currentProvider)

export {
  TimeSafe
}
