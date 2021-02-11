const { expect } = require("chai");
const { BigNumber } = require("ethers");

describe("SampleToken", function() {

  const Alice = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  const Bob = "0xfE69C9C2291e2b44409DFc65937FBED340A2F827"

  it("check balanceOf Alice", async function() {
    const contract = await ethers.getContractFactory("ERC20FixedSupply");
    const Token = await contract.deploy();
    const totalSupply = await Token.totalSupply();
    
    await Token.deployed();
    expect(await Token.balanceOf(Alice)).to.equal(totalSupply);
  });

  it("transfer to Bob 10 Token", async function() {
    const contract = await ethers.getContractFactory("ERC20FixedSupply");
    const Token = await contract.deploy();
    // TODO:
    // human readable unit decimals 
    // Hint(large number, bigNumber)
  
    await Token.deployed();
    await Token.transfer(Bob,amount)
    expect((await Token.balanceOf(Bob)).toString()).to.equal(amount);

  });
});
