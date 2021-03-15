pragma solidity ^0.6.12;
import "./Ownable.sol";


contract Clients is WhiteList {

  struct client{
      string entreprise;
      string adressePostale;
      string mail;
      string tel;
      address addrClient;
      //address addrContratsClient;
  }
  
  mapping(address => client) public contratsclients;   
  address[] public deployed;

  function addContract(address _contract, string _type) public {
    contracts[_contract]= _type;
    deployed.push(_contract);
  }

  function getContracts() view public returns(address[]) {
    return deployed;
  }
}
 
