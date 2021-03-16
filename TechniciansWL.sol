pragma solidity ^0.6.12;
import "./Ownable.sol";
//SPDX-License-Identifier: MIT

/**
 * @title Whitelist
 * @dev The Whitelist contract has 2 whitelists of addresses (technicians and client) and provides basic authorization control functions.
 * @dev This simplifies the implementation of "user permissions".
 */
contract TechniciansWL is Ownable {
  //Store the technicians addresses
  mapping(address => bool) public technicians;

  //Technician address added to technicians whitelist event 
  event TechnicianAddressAdded(address addr);
  //Technician address removed to technicians whitelist event 
  event TechnicianAddressRemoved(address addr);



  /**
   * @dev Throws if called by any account that's not a technician's.
   */
  modifier onlyTechnicians() {
    require(technicians[msg.sender]);
    _;
  }


  /**
   * @dev add an address to the chosen whitelist
   * @param addr address
   * @return success true if the address was added to the chosen whitelist, false if the address was already in the whitelist
   */
  function addAddressToWhitelist(address addr) onlyOwner public returns(bool success) {
        if (!technicians[addr]) {
            technicians[addr] = true;
            emit TechnicianAddressAdded(addr);
            success = true;
        }    
  }


  /**
   * @dev add addresses to the chosen whitelist
   * @param addrs addresses
   * @return success true if at least one address was added to the chosen whitelist,
   * false if all addresses were already in the whitelist
   */
  function addAddressesToWhitelist(address[] memory addrs) onlyOwner public returns(bool success) {
    for (uint256 i = 0; i < addrs.length; i++) {
      if (addAddressToWhitelist(addrs[i])) {
        success = true;
      }
    }
  }


  /**
   * @dev remove an address from the chosen whitelist
   * @param addr address
   * @return success true if the address was removed from the chosen whitelist,
   * false if the address wasn't in the whitelist in the first place
   */
  function removeAddressFromWhitelist(address addr) onlyOwner public returns(bool success) {
        if(technicians[addr]) {
            technicians[addr] = false;
            emit TechnicianAddressRemoved(addr);
            success = true;
        }
  }


  /**
   * @dev remove addresses from the chosen whitelist
   * @param addrs addresses
   * @return success true if at least one address was removed from the chosen whitelist,
   * false if all addresses weren't in the whitelist in the first place
   */
  function removeAddressesFromWhitelist(address[] memory addrs) onlyOwner public returns(bool success) {
    for (uint256 i = 0; i < addrs.length; i++) {
      if (removeAddressFromWhitelist(addrs[i])) {
        success = true;
      }
    }
  }


}
