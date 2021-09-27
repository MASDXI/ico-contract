// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import from node_modules @openzeppelin/contracts v4.0
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/** 
  *@title Initial Coin Offerring(ICO) contract
*/
contract ICO is ERC20, Ownable {

    // constructor() public ERC20("_name", "_symbol") {
    //  // mint to `msg.sender` 
    //  _mint(msg.sender, _amount*(10**uint256(decimals())));
    //  // mint to `_address`
    //  _mint(_address, _amount*(10**uint256(decimals())));
    // }
    
    // Sample constructor
    constructor() public ERC20("BasicCoin", "BSC") {
      _mint(msg.sender, 1000000*(10**uint256(decimals())));
    }
    /**
      * @param account (type address) address of recipient
      * @param amount (type uint256) amount of token
      * @dev function use to mint token
    */
    function decimals() public returns (uint8) {
      return _decimals;
    }
    
    /**
      * @param account (type address) address of recipient
      * @param amount (type uint256) amount of token
      * @dev function use to mint token
    */
    function mint(address account, uint256 amount) public onlyOwner returns (bool sucess) {
      require(account != address(0) && amount != uint256(0), "ERC20: function mint invalid input");
      _mint(account, amount);
      return true;
    }

    /** 
      * @param account (type address) address of recipient
      * @param amount (type uint256) amount of token
      * @dev function use to burn token
    */
    function burn(address account, uint256 amount) public onlyOwner returns (bool success) {
      require(account != address(0) && amount != uint256(0), "ERC20: function burn invalid input");
      _burn(account, amount);
      return true;
    }

    /** 
      * @dev function to buy token with ether
    */
    function buy() public payable returns(bool sucess) {
      require(msg.sender.balance >= msg.value && msg.value != 0 ether, "ICO: function buy invalid input");
      uint256 amount = msg.value * 1000;
      _transfer(owner(), _msgSender(), amount);
      return true;
    }

    /** 
      * @param amount (type uint256) amount of ether
      * @dev function use to withdraw ether from contract
    */
    function withdrawEth(uint256 amount) public onlyOwner returns (bool success) {
      require(amount <= address(this).balance, "ICO: function withdraw invalid input");
      payable(_msgSender()).transfer(amount);
      return true;
    }
}
