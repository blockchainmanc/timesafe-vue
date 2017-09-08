pragma solidity ^0.4.11;

contract TimeSafe {

    modifier onlyAfter(uint _time) {
        require(block.timestamp >= _time);
        _;
    }

    modifier onlyBefore(uint _time) {
        require(block.timestamp < _time);
        _;
    }

    modifier hasValue() {
        require(msg.value > 0);
        _;
    }

    uint public lockedUntil;
    uint public depositsCount;
    uint public withdrawalsCount;
    uint public totalDeposits;

    mapping (address => uint) public balances;

    event Deposit(address _from, uint _value);
    event Withdrawal(address _from, uint _value);

    function TimeSafe(uint _lockedUntil) {
        lockedUntil = _lockedUntil;
    }

    function unlocked() external returns (bool) {
        return block.timestamp > lockedUntil;
    }

    function deposit() public payable onlyBefore(lockedUntil) hasValue returns (uint depositValue) {
        balances[msg.sender] += msg.value;

        depositsCount += 1;
        totalDeposits += msg.value;

        Deposit(msg.sender, msg.value);

        return msg.value;
    }

    function withdrawal() onlyAfter(lockedUntil) external returns (uint withdrawalValue) {
        uint256 balance = balances[msg.sender];
        require(balance > 0);

        balances[msg.sender] -= balance;
        totalDeposits -= balance;
        withdrawalsCount += 1;

        msg.sender.transfer(balance);

        Withdrawal(msg.sender, balance);

        return balance;
    }

    function () {
        // if ether is sent to this address, send it back.
        revert();
    }
}