pragma experimental ABIEncoderV2;
pragma solidity ^0.6.12;


import "./Ownable.sol";
import "./TechniciansWL.sol";
import "./ContratsClient.sol";


contract ListClients is Ownable {
    //Allow to check technicians address from technicians whitelist contract
    address techniciansWLAddr = 0xbd854dE55A8Abf854f7d3e6aF7635C0Cc4c8627E;
    TechniciansWL techniciansWL = TechniciansWL(techniciansWLAddr);
  
   /**
   * @dev Throws if called by any account that's not a technician's.
   */
    modifier onlyTechnicians() {
        require(techniciansWL.isTechnician(msg.sender));
        _;
    }
    
    /**
   * @dev Change technicians whitelist address if this one was redeployed
   * @param addr new address of the technician whitelist
   */
    function updateTechniciansWLAddress(address addr) onlyOwner public {
        techniciansWL = TechniciansWL(addr);
    }
    
    
    
    mapping(address => Client) public clients;  // mapping type of deployed ContratsClient contract
    address[] public arrayClients;   // store deployed contracts
    
    struct Client{
      string nom;
      string adressePostale;
      string codePostal;
      string ville;
      string tel;
      string mail;
    }

    function getClientsAddresses() view public returns(address[] memory) {
        return arrayClients;
    }
    
    function addClient(address _contract, string memory _nom, string memory _adressePostale, string memory _codePostal, string memory _ville, string memory _tel, string memory _mail) public onlyTechnicians{
        updateClient(_contract,_nom,_adressePostale, _codePostal, _ville, _tel,_mail);
        arrayClients.push(_contract);
    }
    
    function updateClient(address _contract,string memory _nom, string memory _adressePostale, string memory _codePostal, string memory _ville, string memory _tel, string memory _mail) public onlyTechnicians{
        clients[_contract].nom = _nom;
        clients[_contract].adressePostale = _adressePostale;
        clients[_contract].codePostal = _codePostal;
        clients[_contract].ville = _ville;
        clients[_contract].tel = _tel;
        clients[_contract].mail = _mail;
    }
    

    function removeClient(address _contract) public onlyOwner{
        for(uint256 i = 0; i< arrayClients.length ; i++){
            if(arrayClients[i]== _contract){
                delete arrayClients[i];
                break;
            }
        }
    }

}
