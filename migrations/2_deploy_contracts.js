/* global artifacts:true */
const TimeSafe = artifacts.require('./TimeSafe.sol')

// const FirstJan2100 = 4102444800
module.exports = function (deployer) {
  deployer.deploy(TimeSafe, 60 * 5)
}
