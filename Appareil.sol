pragma experimental ABIEncoderV2;
pragma solidity ^0.6.12;

import "./Whitelist.sol";
import "./Ownable.sol";

contract Appareil is Whitelist{
    
    struct Appareil{
        string categorie;
        string a_type;
        string marque;
        string ref;
        string nb_serie;
        int statut; // 1 = en marche, 0 = HS , -1 = définitivement HS
    }
    
    
    Appareil public appareil ;
    event interventionEvent(string work_or_reason);
    event changeOfStatusEvent(int newStatus);
    string rep = "Réparation";
    string mtn = "Maintenance" ;
    string inst = "Installation : ";

    
    
    function setAppareil (string memory cat, string memory a_type, string memory marque, string memory ref, string memory nb_serie) public onlyTechnicians {
        appareil = Appareil(cat, a_type, marque, ref, nb_serie, 1);
        emit interventionEvent(inst);
    }
    
    function askIntervention() public onlyClient {
        if(appareil.statut == 1){
            appareil.statut = 0;
            emit changeOfStatusEvent(appareil.statut);
        }
    }
    
    function logIntervention (int newStatus, string[] memory work_or_reason) public onlyTechnicians {
        if (newStatus <= 1 && newStatus >= -1){
            if (appareil.statut == 0)
                emit interventionEvent(rep);
            else if (appareil.statut == 1)
                emit interventionEvent(mtn);
                
            if(appareil.statut != newStatus){
                appareil.statut = newStatus;
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

