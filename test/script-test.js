const { expect } = require("chai");

describe("SampleToken", function() {

  let token;
  let accounts;

  beforeEach("Deploy contract ",async () => {
    const contract = await ethers.getContractFactory("ERC20FixedSupply");
    token = await contract.deploy();
    accounts = await ethers.getSigners();
    await token.deployed();
  });

  it("Assigns initial balance", async function() {
    const totalSupply = await token.totalSupply();
    expect(await token.balanceOf(accounts[0].address)).to.equal(totalSupply);
  });

  it("Transfer adds amount to destination account", async function() {
    await token.transfer(accounts[1].address,10)
    expect(await token.balanceOf(accounts[1].address)).to.equal(10);
  });

  it('Transfer emits event', async () => {
    await expect(token.transfer(accounts[1].address, 10))
      .to.emit(token, 'Transfer')
      .withArgs(accounts[0].address, accounts[1].address, 10);
  });

  it('Can not transfer above the amount', async () => {
    const totalSupply = await token.totalSupply();
    await expect(token.transfer(accounts[1].address, totalSupply+1)).to.be.reverted;
  });

  it('Can not transfer from empty account', async () => {
    const tokenFromOtherWallet = token.connect(accounts[1].address);
    await expect(tokenFromOtherWallet.transfer(accounts[0].address, 1))
      .to.be.reverted;
  });
});
