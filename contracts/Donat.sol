//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Donat is Ownable{

    address[] public donators;
    
    mapping(address => uint256) donated; 

    event DonatEvent(address _account ,uint256 _value);
    event withdrawDonationEvent(address _account ,uint256 _value);

    function donate() public payable { 
        donators.push(msg.sender);
        donated[msg.sender] += msg.value;
        emit DonatEvent(msg.sender, msg.value);
    }

    function withdrawDonation(address payable _to, uint256 _amount) public onlyOwner returns(bool){
        require(_to != address(0), "withdraw to the zero address");
        require(_amount <= address(this).balance);
        _to.transfer(address(this).balance);
        emit DonatEvent(_to, _amount);
        return true;
    }

     function getBalance(address account) public view returns(uint256){
        return donated[account];
    }
    
     function getDonators() public returns(address[] memory) {
         uint index = 0;
         address[] storage newArray = donators;
         for (uint i = index; i<newArray.length-1; i++){
            newArray[i] = newArray[i+1];
         }
         newArray.pop();
         return newArray;
    }
}
