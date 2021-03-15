pragma experimental ABIEncoderV2;
pragma solidity ^0.6.12;

import "./Whitelist.sol";
import "./Ownable.sol";


// is Traceability au lieu de is Whitelist à mettre pour en faire " la classe mère "
// Penser au multi client de la white list du coup 
contract Appareil is Whitelist {
    
    //Model an equipment 
    string  public categorie;
    string  public a_type;
    string  public brand;
    string  public refer;
    string  public serial_n;
    int  public statut; // 1 = en marche, 0 = HS , -1 = définitivement HS
    
    
    //Intervention event
    event interventionEvent(string work_or_reason);
    //Change of equipment status event
    event changeOfStatusEvent(int newStatus);
    //Changement de d'informations de l'appareil
    event changeInfoEvent(string field, string oldvalue ,string arrow, string newvalue);
    
    
    
    //Constant strings for event use 
    string rep = "Réparation";
    string mtn = "Maintenance" ;
    string inst = "Installation";
    string edit = "Modification";
    
    string arrow = " --> ";
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
    function setAppareil (string memory cat, string memory ap_type, string memory marque, string memory ref, string memory nb_serie) public onlyTechnicians {
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
        
    }
    
    function editAppareil (string memory cat, string memory ap_type, string memory marque, string memory ref, string memory nb_serie) public onlyTechnicians {
        emit interventionEvent(edit);
        if(keccak256(abi.encodePacked(categorie)) != keccak256(abi.encodePacked(cat))){emit changeInfoEvent(cat_str,categorie,arrow,cat);}
        if(keccak256(abi.encodePacked(a_type)) != keccak256(abi.encodePacked((ap_type)))){emit changeInfoEvent(ap_type_str,a_type,arrow,ap_type);}
        if(keccak256(abi.encodePacked(brand)) != keccak256(abi.encodePacked((marque)))){emit changeInfoEvent(marque_str,brand,arrow,marque);}
        if(keccak256(abi.encodePacked(refer)) != keccak256(abi.encodePacked((ref)))){emit changeInfoEvent(ref_str,refer,arrow,ref);}
        if(keccak256(abi.encodePacked(serial_n)) != keccak256(abi.encodePacked((nb_serie)))){emit changeInfoEvent(nb_serie_str,serial_n,arrow,nb_serie);}
        categorie = cat;
        a_type = ap_type;
        brand = marque;
        refer = ref;
        serial_n = nb_serie;
    }
    
    /**
   * @dev set the equipment status to 0 to ask for an intervention
   */
    function askIntervention() public onlyClient {
        if(statut == 1){
            statut = 0;
            emit changeOfStatusEvent(statut);
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
    function logIntervention (int newStatus, string[] memory work_or_reason) public onlyTechnicians {
        if (newStatus <= 1 && newStatus >= -1){
            if (statut == 0)
                emit interventionEvent(rep);
            else if (statut == 1)
                emit interventionEvent(mtn);
                
            if(statut != newStatus){
                statut = newStatus;
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
}
