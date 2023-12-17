// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    uint256 public sipMonthlyAmount;
    uint256 public lastSipTimestamp;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event SipInvestment(uint256 amount);
    event WithdrawSipFunds(uint256 amount);

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }

    function setSipMonthlyAmount(uint256 _amount) external {
        require(msg.sender == owner, "You are not the owner of this account");
        sipMonthlyAmount = _amount;
    }

    function investSip() external {
        require(msg.sender == owner, "You are not the owner of this account");
        require(sipMonthlyAmount > 0, "SIP amount not set");

        // Check if a month has passed since the last SIP investment
        require(block.timestamp >= lastSipTimestamp + 30 days, "Wait for the next SIP cycle");

        // Perform SIP investment
        balance += sipMonthlyAmount;

        // Update last SIP timestamp
        lastSipTimestamp = block.timestamp;

        // Emit the event
        emit SipInvestment(sipMonthlyAmount);
    }

    function withdrawSipFunds() external {
        require(msg.sender == owner, "You are not the owner of this account");
        require(sipMonthlyAmount > 0, "SIP amount not set");

        // Withdraw SIP funds
        balance -= sipMonthlyAmount;

        // Emit the event
        emit WithdrawSipFunds(sipMonthlyAmount);
    }
}
