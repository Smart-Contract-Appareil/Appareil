pragma experimental ABIEncoderV2;
pragma solidity ^0.6.12;

import "./Whitelist.sol";
import "./Ownable.sol";


contract ContratsClient is Whitelist {
    
    //Store the client addresses (if many account in the same company)
    mapping(address => bool) public client;
    
    mapping(address => string) public contracts;   // mapping type of deployed contracts
    address[] public deployed;   // store deployed contracts
    
    //Client address added to client whitelist event
    event ClientAddressAdded(address addr);
    //Client address removed to client whitelist event
    event ClientAddressRemoved(address addr);

    /**
    * @dev Throws if called by any account that's not the client.
    */
    modifier onlyClient() {
        require(client[msg.sender]);
        _;
    }

    /**
    * @dev add an address to Client
    * @param addr address
    * @return success true if the address was added to the chosen whitelist, false if the address was already in the whitelist
    */
    function addAddressToClient(address addr) onlyOwner public returns(bool success) {
        if (!client[addr]) {
            client[addr] = true;
            emit ClientAddressAdded(addr);
            success = true;
        } 
    }

    /**
    * @dev add addresses to Client
    * @param addrs addresses
    * @return success true if at least one address was added to Client,
    * false if all addresses were already in the whitelist
    */
    function addAddressesToClient(address[] memory addrs) onlyOwner public returns(bool success) {
        for (uint256 i = 0; i < addrs.length; i++) {
            if (addAddressToClient(addrs[i])) {
                success = true;
            }
        }
    }

    /**
    * @dev remove an address from Client
    * @param addr address
    * @return success true if the address was removed from Client,
    * false if the address wasn't in Client in the first place
    */
    function removeAddressFromClient(address addr) onlyOwner public returns(bool success) {
        if (client[addr]) {
            client[addr] = false;
            emit ClientAddressRemoved(addr);
            success = true;
        }
    }

    /**
    * @dev remove addresses from Client
    * @param addrs addresses
    * @return success true if at least one address was removed from the chosen whitelist,
    * false if all addresses weren't in the whitelist in the first place
    */
    function removeAddressesFromClient(address[] memory addrs) onlyOwner public returns(bool success) {
        for (uint256 i = 0; i < addrs.length; i++) {
            if (removeAddressFromClient(addrs[i])) {
                success = true;
            }
        }
    }

    function addContract(address _contract, string memory _serialn) public onlyTechnicians{
        contracts[_contract]= _serialn;
        deployed.push(_contract);
    }
    
    /*
    function getContracts() view public returns(address[]) {
        return deployed;
    }*/
}