const { expect, assert  } = require("chai");

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
    const wallet = token.connect(accounts[2]);
    await expect(wallet.mint(accounts[2].address,amount)).to.be.reverted
  });

  it("Do not have permission to burning token", async function(){
    const wallet = token.connect(accounts[2]);
    await expect(wallet.burn(accounts[2].address,amount)).to.be.reverted
  });

  it("Buy token with ether", async function(){
    const wallet = token.connect(accounts[2]);
    const option = {value: amount};
    const calculate = (option.value).mul(1000) // 1000 is declare in smart-contract msg.value * 1000
    await wallet.buy(option);
    expect(await wallet.balanceOf(accounts[2].address)).to.equal(calculate);
  });

  it("Do not have permission to withdraw ether from contract", async function(){
    const wallet = token.connect(accounts[2]);
    await expect(wallet.withdraw(amount)).to.be.reverted;
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
    const wallet = token.connect(accounts[3]);
    await expect(wallet.transfer(accounts[1].address, 1)).to.be.reverted;
  });

  it("Can not transfer from empty account", async () => {
    const wallet = token.connect(accounts[3]);
    await expect(wallet.transfer(accounts[0].address, 1)).to.be.reverted;
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
  
  it("Withdraw ether from contract", async function(){
    const before_withdraw = await accounts[0].getBalance()
    await token.withdraw(amount);
    const after_withdraw = await accounts[0].getBalance()
    expect(before_withdraw.lt(after_withdraw)).to.equal(true);
  });

  it("Do not have enough ether to buy token", async function(){
    const wallet = token.connect(accounts[3]);
    const big_amount = ethers.utils.parseEther("999999")
    const option = {value: big_amount};
    let error;
    try {
      await wallet.buy(option)
    }
    catch (err) {
      error = "sender doesn't have enough funds"
    }
    expect(error).to.equal("sender doesn't have enough funds"); // maybe can refactor
  });

});
