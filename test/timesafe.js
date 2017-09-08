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
  // const oneEther = 1000000000000000000

  // TimeSafe is deployed with this date - see migrations
  const FirstJan2100 = 4102444800

  it('should expose locked until timestamp', () => {
    return TimeSafe.deployed()
      .then(instance => {
        return instance.lockedUntil.call()
      })
      .then(result => assert.equal(result.valueOf(), FirstJan2100))
  })

  it('should be locked initially', () => {
    return TimeSafe.deployed()
      .then(instance => {
        return instance.locked.call()
      })
      .then(result => assert.equal(result.valueOf(), true))
  })

  it('should have no deposits initially', () => {
    return TimeSafe.deployed()
      .then(instance => {
        return instance.depositsCount.call()
      })
      .then(result => assert.equal(result.valueOf(), 0))
  })

  it('should have no withdrawals initially', () => {
    return TimeSafe.deployed()
      .then(instance => {
        return instance.withdrawalsCount.call()
      })
      .then(result => assert.equal(result.valueOf(), 0))
  })

  it('should have deposit total of zero initially', () => {
    return TimeSafe.deployed()
      .then(instance => {
        return instance.totalDeposits.call()
      })
      .then(result => assert.equal(result.valueOf(), 0))
  })

  it('should have no balance if not deposits for account', () => {
    return TimeSafe.deployed()
      .then(instance => {
        return instance.balances.call(accounts[0])
      })
      .then(result => assert.equal(result.valueOf(), 0))
  })
})
