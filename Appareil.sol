pragma experimental ABIEncoderV2;
pragma solidity ^0.6.12;

import "./Whitelist.sol";
import "./Ownable.sol";

contract Appareil is Whitelist{
    
    //Model an equipment 
    string categorie;
    string a_type;
    string brand;
    string refer;
    string serial_n;
    int statut; // 1 = en marche, 0 = HS , -1 = définitivement HS
    
    
    //Intervention event
    event interventionEvent(string work_or_reason);
    //Change of equipment status event
    event changeOfStatusEvent(int newStatus);
    
    //Contant strings for event use 
    string rep = "Réparation";
    string mtn = "Maintenance" ;
    string inst = "Installation";

    
    /**
   * @dev set the device/equipment key informations and status to working (=1)
   * @param cat category of the equipment (ex :cold / hot / AC)
   * @param ap_type type of the equipment (ex: oven, refrigerator , microwave)
   * @param marque brand of the equipment
   * @param ref reference of the equipment
   * @param nb_serie serial number 
   */
    function setAppareil (string memory cat, string memory ap_type, string memory marque, string memory ref, string memory nb_serie) public onlyTechnicians {
        categorie = cat;
        a_type = ap_type;
        brand = marque;
        refer = ref;
        serial_n = nb_serie;
        statut = 1;
        emit interventionEvent(inst);
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
