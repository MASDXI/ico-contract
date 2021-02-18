// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/** 
  *@author AIS NEXT BlockChain Development
  *@title Initial Coin Offerring(ICO) contract
*/
contract ICO is ERC20, Ownable {
    constructor() public ERC20("BasicCoin", "BSC") {
      _mint(msg.sender,  1000000 * (10 ** uint256(decimals())));
    }
    
    /**
      * @param account (type address) address of recipient
      * @param amount (type uint256) amount of token
      * @dev function use to mint token
    */
    function mint(address account, uint256 amount) public onlyOwner returns(bool sucess){
      require(account != address(0) && amount != uint256(0), "ERC20: function mint invalid input");
      _mint(account, amount);
      return true;
    }

    /** 
      * @param account (type address) address of recipient
      * @param amount (type uint256) amount of token
      * @dev function use to burn token
    */
    function burn(address account, uint256 amount) public onlyOwner returns(bool success){
      require(account != address(0) && amount != uint256(0), "ERC20: function burn invalid input");
      _burn(account, amount);
      return true;
    }

    /** 
      * @dev function to buy token with ether
    */
    function buy() public payable returns(bool sucess){
      require(msg.sender.balance >= msg.value && msg.value != 0 ether , "ICO: function buy invalid input");
      uint256 amount = msg.value * 1000;
      _transfer(owner(), msg.sender, amount);
      return true;
    }

    /** 
      * @param amount (type uint256) amount of ether
      * @dev function use to withdraw ether from contract
    */
    function withdraw(uint256 amount) public onlyOwner returns(bool) {
      require(amount <= address(this).balance, "ICO: function withdraw invalid input");
      payable(msg.sender).transfer(amount);
      return true;
    }
}