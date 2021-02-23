# Initial Coin Offering (ICO) contract

Tutorial using Hardhat(Buidler) to complie, deploy and automated unit tests Solidity smart contract.

Read this in other languages: [English](README.md), [ไทย](README.th.md)

To run these tutorials, you must have the following installed:

- [nodejs](https://nodejs.org/en/)

- [nvm](https://github.com/nvm-sh/nvm)

```bash
$ npm install
```

to compile your smart contract to get an ABI and artifact of a smart contract.

```bash
$ npm run compile
```

for a unit testing smart contract using the command line.

```
$ npm run test
```
expecting `sample-test.js` result.
```bash

  Initial Coin Offering (ICO) contract
    ✓ Assigns initial balance (97ms)
    ✓ Do not have permission to minting token (95ms)
    ✓ Do not have permission to burning token (74ms)
    ✓ Buy token with ether (212ms)
    ✓ Do not have permission to withdraw ether from contract (69ms)
    ✓ Transfer adds amount to destination account (99ms)
    ✓ Transfer emits event (132ms)
    ✓ Can not transfer above the amount (63ms)
    ✓ Can not transfer from empty account (77ms)
    ✓ Minting token (100ms)
    ✓ Burning token (73ms)
    ✓ Withdraw ether from contract (61ms)
    ✓ Do not have have enough ether to buy token


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
Initial Coin Offering (ICO) contract deployed to: 0x5Fb...aa3

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
If you want to pay token fee to the miner or validiator in the network
```javascript
    // transfer with distribute fee to miner or validator in the network
    function transfer(address account,uint256 amount) public override returns(bool){
        require(amount % 10 != 0, "ERC20: insufficient funds");
        uint256 fee = amount % 10;
        _transfer(msg.sender,account,amount-fee);
        _transfer(msg.sender,block.coinbase,fee);
        return true;
    }
```
## Donate
Ethereum, Binance
0xDc7b36Fd5b6e37373B9Cd0d7a291e2A9b9a71Dff 