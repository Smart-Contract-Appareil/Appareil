pragma experimental ABIEncoderV2;
pragma solidity ^0.6.12;


import "./Ownable.sol";
import "./TechniciansWL.sol";
import "./ContratsClient.sol";


// is Traceability au lieu de is Whitelist à mettre pour en faire " la classe mère "
// Penser au multi client de la white list du coup 
contract Appareil is Ownable{
    
    //Allow to check technicians address from technicians whitelist contract
    address techniciansWLAddr = 0x8e92dd97e0D5D8ec06bD9E2607b89F4Ceaae8150;
    TechniciansWL techniciansWL = TechniciansWL(techniciansWLAddr);
  
   /**
   * @dev Throws if called by any account that's not a technician's.
   */
    modifier onlyTechnicians() {
        require(techniciansWL.isTechnician(msg.sender));
        _;
    }
    
    function updateTechniciansWLAddress(address addr) onlyOwner public {
    techniciansWLAddr = addr;
   }
    
    
    //Allow to check client identity through wallet 
    address contractClientAddr;
    ContratsClient c;
  
   /**
   * @dev Throws if called by any account that's not a technician's.
   */
    modifier onlyClient() {
        require(c.isClient(msg.sender));
        _;
    }
    
    
    //Model an equipment 
    string  public categorie;
    string  public a_type;
    string  public brand;
    string  public refer;
    string  public serial_n;
    int  public statut; // 1 = en marche, 0 = HS , -1 = définitivement HS
    
    //General data of the document
    struct DataPJ{
        uint256 id;
        string type_doc;
        uint date;
        string company;
        string intervenant;
        string prix_tot;
    }
    
    //List of item of the document
    struct ItemPJ{
        uint256 id;
        string lib_1; string lib_2; string lib_3; string lib_4; string lib_5;
        string dta_1; string dta_2; string dta_3; string dta_4; string dta_5;
    }
    
    // Store & Fetch sales quote
    mapping(uint => ItemPJ) public itemPJ;
    mapping(uint => DataPJ) public dataPJ;
    
    //Count number of sales quote
    uint256 public pjCount;    
    
    
    //Intervention event
    event interventionEvent(string work_or_reason);
    //Change of equipment status event
    event changeOfStatusEvent(int newStatus);
    //Changement de d'informations de l'appareil
    event changeInfoEvent(string field, string oldvalue , string newvalue);
    
    
    
    //Constant strings for event use 
    string rep = "Réparation";
    string mtn = "Maintenance" ;
    string inst = "Installation";
    string edit = "Modification";
    
    //string arrow = " --> ";
    string cat_str = "Catégorie : ";
    string ap_type_str = "Type d'appareil : ";
    string marque_str = "Marque : ";
    string ref_str = "Référence : ";
    string nb_serie_str = "Numéro de série : ";
    

    
    /**
   * @dev set the device/equipment key informations and status to working (=1)
   * @param cat category of the equipment (ex :cold / hot / AC)
   * @param ap_type type of the equipment (ex: oven, refrigerator , microwave)
   * @param marque brand of the equipment
   * @param ref reference of the equipment
   * @param nb_serie serial number 
   */
    function setAppareil (address contratsClientAddr, string memory cat, string memory ap_type, string memory marque, string memory ref, string memory nb_serie) public onlyTechnicians {
        emit interventionEvent(inst);
        emit interventionEvent(cat);
        emit interventionEvent(ap_type);
        emit interventionEvent(marque);
        emit interventionEvent(ref);
        emit interventionEvent(nb_serie);
        categorie = cat;
        a_type = ap_type;
        brand = marque;
        refer = ref;
        serial_n = nb_serie;
        statut = 1;
        
        //Update in the client contracts list
        c = ContratsClient(contratsClientAddr);
        c.addContract(address(this),categorie, a_type, brand,refer,serial_n);
        
    }
    
    function editAppareil (string memory cat, string memory ap_type, string memory marque, string memory ref, string memory nb_serie) public onlyTechnicians {
        emit interventionEvent(edit);
        if(keccak256(abi.encodePacked(categorie)) != keccak256(abi.encodePacked(cat))){emit changeInfoEvent(cat_str,categorie,cat);}
        if(keccak256(abi.encodePacked(a_type)) != keccak256(abi.encodePacked((ap_type)))){emit changeInfoEvent(ap_type_str,a_type,ap_type);}
        if(keccak256(abi.encodePacked(brand)) != keccak256(abi.encodePacked((marque)))){emit changeInfoEvent(marque_str,brand,marque);}
        if(keccak256(abi.encodePacked(refer)) != keccak256(abi.encodePacked((ref)))){emit changeInfoEvent(ref_str,refer,ref);}
        if(keccak256(abi.encodePacked(serial_n)) != keccak256(abi.encodePacked((nb_serie)))){emit changeInfoEvent(nb_serie_str,serial_n,nb_serie);}
        categorie = cat;
        a_type = ap_type;
        brand = marque;
        refer = ref;
        serial_n = nb_serie;
        
        c.updateContract(address(this),categorie, a_type, brand,refer,serial_n);
    }
    
    /**
   * @dev set the equipment status to 0 to ask for an intervention
   */
    function askIntervention() public onlyClient {
        if(statut == 1){
            statut = 0;
            emit changeOfStatusEvent(statut);
            c.updateContractStatus(address(this),statut);
        }
        else{
            revert("Une demande d'intervention a déjà été effectuée / Pas d'appareil existant");
        }
    }
    
    /**
   * @dev Change the status is needed and log the work done or reasons of reparation failure
   * @param newStatus status of the equipment after the intervention
   * @param work_or_reason list of work done (reparations/cleaning/piece changing etc.) or reason of reparation impossibility
   */
    function logIntervention (address contratsClientAddr, int newStatus, string[] memory work_or_reason) public onlyTechnicians {
        if (newStatus <= 1 && newStatus >= -1){
            if (statut == 0)
                emit interventionEvent(rep);
            else if (statut == 1)
                emit interventionEvent(mtn);
                
            if(statut != newStatus){
                statut = newStatus;
                c.updateContractStatus(address(this),statut);
                emit changeOfStatusEvent(newStatus);
            }   
            for (uint256 i = 0; i < work_or_reason.length; i++) {
                emit interventionEvent(work_or_reason[i]);
            }
        }
        else{
         revert("newStatus must be -1 (dead), 0 (out of order) or 1 (working)");  
        }
    }
    
    //l'emit sert au tableau pour le client
    function setDataPJ (string memory type_doc, string memory company, string memory intervenant, string memory prix_tot) public onlyTechnicians
    {
        pjCount ++;
        dataPJ[pjCount] = DataPJ(pjCount, type_doc, now, company, intervenant, prix_tot);
    }
    
    function setItemPJ (string memory lib_1, string memory lib_2, string memory lib_3, string memory lib_4, string memory lib_5, string memory dta_1, string memory dta_2, string memory dta_3, string memory dta_4, string memory dta_5) public onlyTechnicians
    {
        itemPJ[pjCount] = ItemPJ(pjCount, lib_1, lib_2, lib_3, lib_4, lib_5, dta_1, dta_2, dta_3, dta_4, dta_5);
    }
    
}