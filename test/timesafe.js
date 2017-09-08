// globals loaded by truffle test framework
/* global artifacts:true */
/* global contract:true */
/* global it:true */
/* global assert:true */
const TimeSafe = artifacts.require('./TimeSafe.sol')

/**
 * Note these are ran in order and currently re-use the deployed contract
 */
contract('TimeSafe', accounts => {
  // const andy = accounts[0]
  // const kevin = accounts[1]
  // const oneEther = 1000000000000000000

  // TimeSafe is deployed with this date - see migrations
  const FirstJan2100 = 4102444800

  it('should read locked until timestamp', () => {
    let timeSafeInstance
    return TimeSafe.deployed()
      .then(instance => {
        timeSafeInstance = instance
        return timeSafeInstance.lockedUntil.call()
      })
      .then(time => assert.equal(time.valueOf(), FirstJan2100))
  })

  it('should be locked', () => {
    let timeSafeInstance
    return TimeSafe.deployed()
      .then(instance => {
        timeSafeInstance = instance
        return timeSafeInstance.unlocked.call()
      })
      .then(result => assert.equal(result.valueOf(), false))
  })
})
