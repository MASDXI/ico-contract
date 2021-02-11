// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20FixedSupply is ERC20 {
    constructor() public ERC20("SampleToken", "STK") {
        _mint(msg.sender,  1000000 * (10 ** uint256(decimals())));
    }
}