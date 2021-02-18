# Initial Coin Offering (ICO) contract

Tutorial using Hardhat(Buidler) to complie, deploy and automated unit tests Solidity smart contract.

To run these tutorials, you must have the following installed:
Read this in other languages: [English](README.md), [ไทย](README.th.md)

- [nodejs](https://nodejs.org/en/)

- [nvm](https://github.com/nvm-sh/nvm)

```bash
$ npm install
```

to compile your smart contract to get an ABI and artifact of a smart contract for unit test using the command.

```bash
$ npm run compile
```

for a unit testing smart contract using the command line.

```
$ npm run test
```
expecting `sample-test.js` result.
```bash

  SampleToken
    ✓ Assigns initial balance (81ms)
    ✓ Minting token
    ✓ Burning token
    ✓ Do not have permission to minting token
    ✓ Do not have permission to burning token
    ✓ Buy token
    ✓ Do not have have enough ether to buy token
    ✓ Withdraw ether from contract
    ✓ Do not have permission to withdraw ether from contract
    ✓ Transfer adds amount to destination account (74ms)
    ✓ Transfer emits event (47ms)
    ✓ Can not transfer above the amount (38ms)
    ✓ Can not transfer from empty account (39ms)


  13 passing (2s)

```

after testing if you want to deploy the contract using the command line.

```bash

$ npm run test-rpc
# Open another Terminal
$ npm run deploy-local

# result in npx hardhat node Terminal
web3_clientVersion
eth_chainId
eth_accounts
eth_chainId
eth_estimateGas
eth_gasPrice
eth_sendTransaction
  Contract deployment: <UnrecognizedContract>
  Contract address:    0x5fb...aa3
  Transaction:         0x4d8...945
  From:                0xf39...266
  Value:               0 ETH
  Gas used:            323170 of 323170
  Block #1:            0xee6...85d

eth_chainId
eth_getTransactionByHash
eth_blockNumber
eth_chainId (2)
eth_getTransactionReceipt

# result in npx hardhat run Terminal
SampleToken deployed to: 0x5Fb...aa3

```
your can edit deploy network endpoint at `hardhat.config.js`.

```javascript
module.exports = {
  networks: {
        {
        localhost: {
          url: "http://127.0.0.1:8545"
        },
        hardhat: {
          // See its defaults
        }
  }
};

```