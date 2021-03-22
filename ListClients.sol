pragma experimental ABIEncoderV2;
pragma solidity ^0.6.12;


import "./Ownable.sol";
import "./TechniciansWL.sol";
import "./ContratsClient.sol";


contract ListClients is Ownable {
    
    struct Client{
      string nom;
      string adressePostale;
      string tel;
      string mail;
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
   
    mapping(address => Client) public clients;  // mapping type of deployed ContratsClient contract
    address[] public arrayClients;   // store deployed contracts
    

    function addClient(address _contract, string memory _nom, string memory _adressePostale, string memory _tel, string memory _mail) public onlyTechnicians{
        updateClient(_contract,_nom,_adressePostale,_tel,_mail);
        arrayClients.push(_contract);
    }
    
    function updateClient(address _contract,string memory _nom, string memory _adressePostale, string memory _tel, string memory _mail) public onlyTechnicians{
        clients[_contract].nom = _nom;
        clients[_contract].adressePostale = _adressePostale;
        clients[_contract].tel = _tel;
        clients[_contract].mail = _mail;
    }
    
    
    function getClients() view public returns(address[] memory) {
        return arrayClients;
    }

}
