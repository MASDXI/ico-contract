# Initial Coin Offering (ICO) contract ภาษาไทย

ตัวอย่าง Smart contract การทำ Initial Coin Offering (ICO) โดยใช้เครื่องมือ Hardhat(Buidler) สำหรับ compile, deploy และการทำ unit tests ตัว smart contract ที่เขียนด้วยภาษา Solidity

อ่านในภาษาอื่นๆ: [English](README.md), [ไทย](README.th.md)

สำหรับการ `run` ตัวอย่าง `project` นี้เราจำเป็นต้อง Install เครื่องมือดังนี้

- [nodejs](https://nodejs.org/en/)

- [nvm](https://github.com/nvm-sh/nvm)

```bash
$ npm install
```


ในการ `compile` smart contract เพื่อเอา ABI และ artifact ของ smart contract ใช้คำสั่ง

```bash
$ npm run compile
```

สำหรับการ `test` ใช้คำสั่ง

```
$ npm run test
```
ผลลัพธ์จากการ `test` ไฟล์ `sample-test.js`.
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
หลังจากที่ทำการ `test` แล้วนั้นหากต้องการ `deploy` smart contract ใช้คำสั่ง

```bash
# คำสั่งสำหรับสร้าง local network 
$ npm run test-rpc
# ใช้ในหน้าต่าง terminal ใหม่
$ npm run deploy-local

# ผลลัพธ์ใน terminal ทื่สร้าง local network
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

# ผลลัพธ์ใน terminal ที่ deploy smart contract
Initial Coin Offering (ICO) contract deployed to:: 0x5Fb...aa3

```
เราสามารถแก้ไข endpoint ที่จะ deploy ไปยัง network ที่ไฟล์ `hardhat.config.js`.

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