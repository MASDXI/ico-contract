const { expect } = require("chai");

describe("SampleToken", function() {

  let token;
  let accounts;

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
    await expect(tokenFromOtherWallet.mint(accounts[2].address,'10')).to.be.reverted
  });

  it("Do not have permission to burning token", async function(){
    const tokenFromOtherWallet = token.connect(accounts[2]);
    await expect(tokenFromOtherWallet.burn(accounts[2].address,'10')).to.be.reverted
  });

  it("Buy token", async function(){
    const tokenFromOtherWallet = token.connect(accounts[2]);
    const option = {value: ethers.utils.parseEther("1")};
    const amount = '1000000000000000000000'
    await tokenFromOtherWallet.buy(option);
    expect(await tokenFromOtherWallet.balanceOf(accounts[2].address)).to.equal(amount);
  });

  it("Do not have permission to withdraw ether from contract", async function(){
    const tokenFromOtherWallet = token.connect(accounts[2]);
    const amount = ethers.utils.parseEther("1")
    await expect(tokenFromOtherWallet.withdraw(amount)).to.be.reverted;
  });

  it("Transfer adds amount to destination account", async function() {
    await token.transfer(accounts[1].address,'10');
    expect(await token.balanceOf(accounts[1].address)).to.equal('10');
  });

  it("Transfer emits event", async () => {
    await expect(token.transfer(accounts[1].address, '10'))
      .to.emit(token, "Transfer")
      .withArgs(accounts[0].address, accounts[1].address, '10');
  });

  it("Can not transfer above the amount", async () => {
    const tokenFromOtherWallet = token.connect(accounts[3]);
    await expect(tokenFromOtherWallet.transfer(accounts[1].address, 1)).to.be.reverted;
  });

  it("Can not transfer from empty account", async () => {
    const tokenFromOtherWallet = token.connect(accounts[3]);
    await expect(tokenFromOtherWallet.transfer(accounts[0].address, 1)).to.be.reverted;
  });

  //######################## Issue / bug ########################
  
  it("Minting token", async function() {
    // issue
    const before_mint = await token.balanceOf(accounts[0].address);
    const amount = '10';
    await token.mint(accounts[0].address,amount);
    const after_burn = await token.balanceOf(accounts[0].address);
    expect(after_burn).to.equal((before_mint + amount));
  });

  it("Burning token", async function() {
    // issue
    const before_mint = await token.balanceOf(accounts[0].address);
    const amount = '10';
    await token.mint(accounts[0].address,amount);
    const after_burn = await token.balanceOf(accounts[0].address);
    expect(after_burn).to.equal((before_mint + amount));
  });
  
  //######################## TODO ########################

  it("Do not have have enough ether to buy token", async function(){
    // TODO
  });

  it("Withdraw ether from contract", async function(){
    // TODO
  });

});
