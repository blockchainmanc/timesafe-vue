/* global artifacts:true */
const TimeSafe = artifacts.require('./TimeSafe.sol')

module.exports = function (deployer) {
  deployer.deploy(TimeSafe, 60 * 30)
}
