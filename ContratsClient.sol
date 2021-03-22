pragma experimental ABIEncoderV2;
pragma solidity ^0.6.12;


import "./Ownable.sol";
import "./TechniciansWL.sol";
import "./ListClients.sol";


contract ContratsClient is Ownable {

    //Store the client addresses (if many account in the same company)
    mapping(address => bool) public client;
    //Client address added to client whitelist event
    event ClientAddressAdded(address addr);
    //Client address removed to client whitelist event
    event ClientAddressRemoved(address addr);
    
   function isClient(address addr) public returns(bool){
      if(client[addr]){
          return true;
      }
      else {
          return false;
      }
    }
  
    string public nom;
    string public adressePostale;
    string public tel;
    string public mail;

    address listOfClientAddr = 0xA2B2E27929B3e017268Df1b9EC3D033970303b5D ;
    ListClients lc = ListClients(listOfClientAddr);

  
  function setClient(string memory _nom, string memory _adressePostale, string memory _tel, string memory _mail) onlyTechnicians public{
      nom = _nom;
      adressePostale = _adressePostale;
      tel = _tel;
      mail = _mail;
      lc.addClient(address(this),_nom,_adressePostale,_tel,_mail);
  }
  
  function updateClient(string memory _nom, string memory _adressePostale, string memory _tel, string memory _mail) onlyTechnicians public {
      nom = _nom;
      adressePostale = _adressePostale;
      tel = _tel;
      mail = _mail;
      lc.updateClient(address(this),_nom,_adressePostale,_tel,_mail);
  }
  
  
  /**
   * @dev add an address to the client whitelist
   * @param addr address
   * @return success true if the address was added to the client whitelist
   */
  function addAddressToWhitelist(address addr) onlyTechnicians public returns(bool success) {
        if (!client[addr]) {
            client[addr] = true;
            emit ClientAddressAdded(addr);
            success = true;
        }    
  }


  /**
   * @dev add addresses to the chosen whitelist
   * @param addrs addresses
   * @return success true if at least one address was added to the client whitelist,
   */
  function addAddressesToWhitelist(address[] memory addrs) onlyTechnicians public returns(bool success) {
    for (uint256 i = 0; i < addrs.length; i++) {
      if (addAddressToWhitelist(addrs[i])) {
        success = true;
      }
    }
  }


  /**
   * @dev remove an address from the client whitelist
   * @param addr address
   * @return success true if the address was removed from the chosen whitelist,
   */
  function removeAddressFromWhitelist(address addr) onlyTechnicians public returns(bool success) {
        if(client[addr]) {
            client[addr] = false;
            emit ClientAddressRemoved(addr);
            success = true;
        }
  }


  /**
   * @dev remove addresses from the client whitelist
   * @param addrs addresses
   * @return success true if at least one address was removed from the client whitelist,
   */
  function removeAddressesFromWhitelist(address[] memory addrs) onlyTechnicians public returns(bool success) {
    for (uint256 i = 0; i < addrs.length; i++) {
      if (removeAddressFromWhitelist(addrs[i])) {
        success = true;
      }
    }
  }
   
   
   //Allow to check if sender is a technician
    address techniciansWLAddr = 0x96110E5C38E1189c6e28b13C73a34F58f718b226; 
    TechniciansWL techniciansWL = TechniciansWL(techniciansWLAddr);
    
    function updateTechniciansWLAddress(address addr) onlyOwner public {
        techniciansWLAddr = addr;
   }
   
    /**
   * @dev Throws if called by any account that's not a technician's.
   */
    modifier onlyTechnicians() {
        require(techniciansWL.isTechnician(msg.sender));
        _;
    }
   
   
    //Get technicians whitelist to avoid defining them everytime
    struct contrat{
        string  categorie;
        string  a_type;
        string  brand;
        string  refer;
        string  serial_n;
        int  statut;
    }
    
    
    mapping(address => contrat) public contracts;   // mapping type of deployed contracts
    address[] public deployed;   // store deployed contracts
    


    function addContract(address _contract, string memory categorie, string memory a_type, string memory brand,string memory refer,string memory serial_n) public onlyTechnicians{
        updateContract(_contract,categorie,a_type,brand,refer,serial_n);
        contracts[_contract].statut= 1;
        
        deployed.push(_contract);
    }
    
    function updateContract(address _contract, string memory categorie, string memory a_type, string memory brand,string memory refer,string memory serial_n) public onlyTechnicians{
        contracts[_contract].categorie= categorie;
        contracts[_contract].a_type= a_type;
        contracts[_contract].brand= brand;
        contracts[_contract].refer= refer;
        contracts[_contract].serial_n= serial_n;
    }
    
    function updateContractStatus(address _contract, int statut) public onlyTechnicians{
        contracts[_contract].statut= statut;
    }
    
    
    function getContracts() view public returns(address[] memory) {
        return deployed;
    }

}
