const { expect } = require("chai");

describe("Initial Coin Offering (ICO) contract", function() {

  let token;
  let accounts;
  const amount = ethers.utils.parseEther("1")

  before(async () => {
    const contract = await ethers.getContractFactory("ICO");
    token = await contract.deploy();
    accounts = await ethers.getSigners();
    await token.deployed();
  });

  it("Assigns initial balance", async function() {
    const totalSupply = await token.totalSupply();
    expect(await token.balanceOf(accounts[0].address)).to.equal(totalSupply);
  });

  it("Do not have permission to minting token", async function(){
    const tokenFromOtherWallet = token.connect(accounts[2]);
    await expect(tokenFromOtherWallet.mint(accounts[2].address,amount)).to.be.reverted
  });

  it("Do not have permission to burning token", async function(){
    const tokenFromOtherWallet = token.connect(accounts[2]);
    await expect(tokenFromOtherWallet.burn(accounts[2].address,amount)).to.be.reverted
  });

  it("Buy token with ether", async function(){
    const tokenFromOtherWallet = token.connect(accounts[2]);
    const option = {value: amount};
    const wei = ethers.BigNumber.from(option.value)
    const weiToToken = wei.mul(1000) // 1000 is declare in smart-contract 1 ether * 1000
    await tokenFromOtherWallet.buy(option);
    expect(await tokenFromOtherWallet.balanceOf(accounts[2].address)).to.equal(weiToToken);
  });

  it("Do not have permission to withdraw ether from contract", async function(){
    const tokenFromOtherWallet = token.connect(accounts[2]);
    await expect(tokenFromOtherWallet.withdraw(amount)).to.be.reverted;
  });

  it("Transfer adds amount to destination account", async function() {
    await token.transfer(accounts[1].address,amount);
    expect(await token.balanceOf(accounts[1].address)).to.equal(amount);
  });

  it("Transfer emits event", async () => {
    await expect(token.transfer(accounts[1].address, amount))
      .to.emit(token, "Transfer")
      .withArgs(accounts[0].address, accounts[1].address, amount);
  });

  it("Can not transfer above the amount", async () => {
    const tokenFromOtherWallet = token.connect(accounts[3]);
    await expect(tokenFromOtherWallet.transfer(accounts[1].address, 1)).to.be.reverted;
  });

  it("Can not transfer from empty account", async () => {
    const tokenFromOtherWallet = token.connect(accounts[3]);
    await expect(tokenFromOtherWallet.transfer(accounts[0].address, 1)).to.be.reverted;
  });
  
  it("Minting token", async function() {
    const before_mint = await token.balanceOf(accounts[0].address);
    await token.mint(accounts[0].address,amount);
    const after_burn = await token.balanceOf(accounts[0].address);
    expect(after_burn).to.equal((before_mint.add(amount)));
  });

  it("Burning token", async function() {
    const before_burn = await token.balanceOf(accounts[0].address);
    await token.burn(accounts[0].address,amount);
    const after_burn = await token.balanceOf(accounts[0].address);
    expect(after_burn).to.equal((before_burn.sub(amount)));
  });
  
  //######################## TODO ########################

  it("Do not have have enough ether to buy token", async function(){
    // TODO
    const test = ethers.BigNumber.from("999999999999999999999")
    console.log("🚀 ~ file: script-test.js ~ line 92 ~ it ~ amount", amount.toString())
    console.log("🚀 ~ file: script-test.js ~ line 91 ~ it ~ test", test.toString())
  });

  it("Withdraw ether from contract", async function(){
    // TODO
  });

  1000000000000000000000
  1000000000000000000
});
