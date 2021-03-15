pragma solidity ^0.6.12;
import "./Ownable.sol";

/**
 * @title Whitelist
 * @dev The Whitelist contract has 2 whitelists of addresses (technicians and client) and provides basic authorization control functions.
 * @dev This simplifies the implementation of "user permissions".
 */
contract Whitelist is Ownable {
  //Store the technicians addresses
  mapping(address => bool) public technicians;
  //Store the client addresses (if many account in the same company)
  mapping(address => bool) public client;

  //Technician address added to technicians whitelist event 
  event TechnicianAddressAdded(address addr);
  //Technician address removed to technicians whitelist event 
  event TechnicianAddressRemoved(address addr);

  //Client address added to client whitelist event
  event ClientAddressAdded(address addr);
  //Client address removed to client whitelist event
  event ClientAddressRemoved(address addr);



  /**
   * @dev Throws if called by any account that's not a technician's.
   */
  modifier onlyTechnicians() {
    require(technicians[msg.sender]);
    _;
  }

  /**
   * @dev Throws if called by any account that's not the client.
   */
  modifier onlyClient() {
    require(client[msg.sender]);
    _;
  }


  /**
   * @dev add an address to the chosen whitelist
   * @param addr address
   * @param whitelistName list to which we want to add an address
   * @return success true if the address was added to the chosen whitelist, false if the address was already in the whitelist
   */
  function addAddressToWhitelist(address addr, string memory whitelistName) onlyOwner public returns(bool success) {
    if(keccak256(abi.encodePacked((whitelistName))) == keccak256(abi.encodePacked(("technicians")))){
        if (!technicians[addr]) {
            technicians[addr] = true;
            emit TechnicianAddressAdded(addr);
            success = true;
        }    
    }
    else if(keccak256(abi.encodePacked((whitelistName))) == keccak256(abi.encodePacked(("client")))){
        if (!client[addr]) {
            client[addr] = true;
            emit ClientAddressAdded(addr);
            success = true;
        } 
    }
  }


  /**
   * @dev add addresses to the chosen whitelist
   * @param addrs addresses
   * @param whitelistName list to which we want to add addresses
   * @return success true if at least one address was added to the chosen whitelist,
   * false if all addresses were already in the whitelist
   */
  function addAddressesToWhitelist(address[] memory addrs, string memory whitelistName) onlyOwner public returns(bool success) {
    for (uint256 i = 0; i < addrs.length; i++) {
      if (addAddressToWhitelist(addrs[i], whitelistName)) {
        success = true;
      }
    }
  }


  /**
   * @dev remove an address from the chosen whitelist
   * @param addr address
   * @param whitelistName list from which we want to remove an address
   * @return success true if the address was removed from the chosen whitelist,
   * false if the address wasn't in the whitelist in the first place
   */
  function removeAddressFromWhitelist(address addr, string memory whitelistName) onlyOwner public returns(bool success) {
    if(keccak256(abi.encodePacked((whitelistName))) == keccak256(abi.encodePacked(("technicians")))){
        if(technicians[addr]) {
            technicians[addr] = false;
            emit TechnicianAddressRemoved(addr);
            success = true;
        }
    }
    else if(keccak256(abi.encodePacked((whitelistName))) == keccak256(abi.encodePacked(("client")))){
        if (client[addr]) {
            client[addr] = false;
            emit ClientAddressRemoved(addr);
            success = true;
        }
    }
    else 
        success = false;
  }


  /**
   * @dev remove addresses from the chosen whitelist
   * @param addrs addresses
   * @param whitelistName list from which we want to remove addresses
   * @return success true if at least one address was removed from the chosen whitelist,
   * false if all addresses weren't in the whitelist in the first place
   */
  function removeAddressesFromWhitelist(address[] memory addrs, string memory whitelistName) onlyOwner public returns(bool success) {
    for (uint256 i = 0; i < addrs.length; i++) {
      if (removeAddressFromWhitelist(addrs[i], whitelistName)) {
        success = true;
      }
    }
  }


}