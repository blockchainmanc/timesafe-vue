# Time Safe

Allows people to lock cryptocurrency in a smart contract until a predefined moment in time.

## Tech stack

### Tech glossary

* [Ethereum](https://www.ethereum.org/): Blockchain implementation. A decentralized platform that can run smart contracts.
* [Solidity](https://solidity.readthedocs.io/en/develop/): Solidity is a contract-oriented, high-level language designed to target the Ethereum Virtual Machine (EVM)
* Dapp: a DApp is an abbreviated form for decentralized application
* [Web3Js](https://github.com/ethereum/wiki/wiki/JavaScript-API): a javascript lib designed to connect and work with the blockchain
* [Truffle](http://truffleframework.com/): Truffle is a popular development framework for Ethereum
* [testrpc](https://github.com/ethereumjs/testrpc): testrpc is a Node.js based Ethereum client for testing and development
* [MetaMask](https://metamask.io/): Chrome extension that allows management of Ethereum accounts in the browser

### Tech overview

A smart contract that implements a "Time Safe" in code complemented with a Dapp for working with the contract on [Ethereum](https://www.ethereum.org/) compatible blockchains.

The smart contract is developed in [Solidity](https://solidity.readthedocs.io/en/develop/) programming language.

The [Truffle](http://truffleframework.com/) framework is used to manage, migrate, and test the smart contract.

The project Dapp (think blockchain webapp) interacts with the smart contract via [Web3Js](https://github.com/ethereum/wiki/wiki/JavaScript-API). The Dapp utilises the [VueJs](https://vuejs.org/) Javascript framework for building the Dapp's single page structure.

[Webpack](https://webpack.js.org/) is used to bundle assets for development and production. This tool is also utilised for running the local development server.

## Local development dependencies

* truffle > 3.x (install globally)
* node > 6.x (install globally)
* testrpc > 3.x
* metamask chrome extension

## Running the Dapp

### testrpc and metamask

Create a metmask account. Note down the 12 word seed mnemonic.

Metamask will inject [Web3Js](https://github.com/ethereum/wiki/wiki/JavaScript-API) into the browser and then you can easily switch accounts and confirm transactions with metamask.

For more on why using metamask is generally a good idea see the introduction video at https://metamask.io/

When you stop/restart the testrpc chain you will need to re-migrate the contracts.

``` bash
# start test rpc with meta-mask seed (and unlock first 3 account)
# this ensure the accounts on the chain are the ones exposed in meta mask
# -u unlocks individual accounts
testrpc -m "<your 12 word seed mnemonic>" -u 0 -u 1 -u 2

# in a new terminal/tab
# dapp delivered from this folder
cd app

# install dependencies
npm install

# add contract to the running blockchain (see Truffle docs for more explanation)
truffle migrate

# serve with hot reload at localhost:8080
# hop into a browser and give it a go
npm run dev

##################
Other useful commands
##################

# reset contract on the running blockchain (see Truffle docs for more explanation)
truffle migrate --reset

# webpack build for production with minification
npm run build
```

More details on the VueJs/Webpack setup: [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
