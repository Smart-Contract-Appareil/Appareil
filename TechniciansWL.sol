pragma solidity ^0.6.12;
import "./Ownable.sol";
pragma experimental ABIEncoderV2;
//SPDX-License-Identifier: MIT

/**
 * @title Whitelist
 * @dev The Whitelist contract has 2 whitelists of addresses (technicians and client) and provides basic authorization control functions.
 * @dev This simplifies the implementation of "user permissions".
 */
contract TechniciansWL is Ownable {
    
    struct technician{
        string nom;
        string prenom;
    }
    
  //Store the technicians addresses
  mapping(address => bool) public technicians;
  mapping(address => technician) public techniciansInfo;
  address[] public techniciansAdresses ;//Stocks technicians addresses in order to get it back and iterate through mapping 
  //Technician address added to technicians whitelist event 
  event TechnicianAddressAdded(address addr);
  //Technician address removed to technicians whitelist event 
  event TechnicianAddressRemoved(address addr);


    
 /**
   * @dev Throws if called by any account that's not a technician's.
   
  modifier onlyTechnicians() {
    require(technicians[msg.sender]);
    _;
  }
*/
  
  function isTechnician(address addr) public returns(bool){
      if(technicians[addr]){
          return true;
      }
      else {
          return false;
      }
  }
  
  /**
   * @dev add an address to the chosen whitelist
   * @param addr address
   * @param _nom name
   * @param _prenom surname
   * @return success true if the address was added to the chosen whitelist, false if the address was already in the whitelist
   */
  function addAddressToWhitelist(address addr, string memory _nom , string memory _prenom) onlyOwner public returns(bool success) {
        if (!technicians[addr]) {
            technicians[addr] = true;
            emit TechnicianAddressAdded(addr);
            techniciansInfo[addr].nom = _nom;
            techniciansInfo[addr].prenom = _prenom;
            techniciansAdresses.push(addr);
            success = true;
        }    
  }


  /**
   * @dev add addresses to the chosen whitelist
   * @param addrs addresses
   * @param _noms names
   * @param _prenoms surnames
   * @return success true if at least one address was added to the chosen whitelist,
   * false if all addresses were already in the whitelist
   */
  function addAddressesToWhitelist(address[] memory addrs, string[] memory _noms , string[] memory _prenoms) onlyOwner public returns(bool success) {
    for (uint256 i = 0; i < addrs.length; i++) {
      if (addAddressToWhitelist(addrs[i], _noms[i], _prenoms[i])) {
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
            delete techniciansInfo[addr];
            success = true;
            for(uint256 i =0 ; i < techniciansAdresses.length ; i++){
                if(techniciansAdresses[i] == addr){
                    delete techniciansAdresses[i];
                    break;
                }
            }
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
  
  function getTechnicians() view public returns(address[] memory) {
        return techniciansAdresses;
  }

  
}
