const { expect } = require("chai");
describe("Sample Token", function() {

  const SAMPLE_TEXT = "Hello world";
  let contract;

  beforeEach(async () => {
    const CONTRACT = await ethers.getContractFactory("SampleToken");
    contract = await CONTRACT.deploy();
  });

  it("mint document", async function() {
    /*
     *
     *
    */
  });

  it("burn document", async function() {
    /*
     *
     *
    */
  });

  it("transfer document", async function() {
    /*
     *
     *
    */
  });

  it("transfer document", async function() {
    /*
     *
     *
    */
  });
});
