# Time Safe

Allows people to lock cryptocurrency in a smart contract until a predefined moment in time.

## Tech stack

A smart contract and Dapp for [Ethereum](https://www.ethereum.org/) compatible blockchains.

The smart contract is developed in [Solidity](https://solidity.readthedocs.io/en/develop/) programming language.

The [Truffle](http://truffleframework.com/) framework is used to manage, migrate, and test the smart contract.

The project also contains a Dapp (think blockchain webapp) that interacts with the smart contract via [Web3Js](https://github.com/ethereum/wiki/wiki/JavaScript-API). The Dapp utilises the [VueJs](https://vuejs.org/) Javascript framework for building the Dapp's single page structure.

[Webpack](https://webpack.js.org/) is used to bundle assets. This tool is also utilised for running the local development server. See the Dapp's README for specifics on the running the Dapp with [Truffle](http://truffleframework.com/)

#### Tech glossary

* [Solidity](https://solidity.readthedocs.io/en/develop/): Solidity is a contract-oriented, high-level language designed to target the Ethereum Virtual Machine (EVM)
* Dapp: a DApp is an abbreviated form for decentralized application
* [Web3Js](https://github.com/ethereum/wiki/wiki/JavaScript-API): a javascript lib designed to connect and work with the blockchain
* [Truffle](http://truffleframework.com/): Truffle is a popular development framework for Ethereum

## Local development dependencies

* truffle > 3.x
* node > 6.x
* testrpc
* metamask
