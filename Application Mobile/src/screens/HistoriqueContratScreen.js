import * as React from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Web3 from 'web3';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import { ABIAppareil } from '../../abiAppareil';
import { ScrollView } from 'react-native-gesture-handler';
import { DarkTheme } from '@react-navigation/native';

export default class HistoriqueContratScreen extends React.Component 
{
  componentWillMount()
  {
    this.loadWeb3()
  }

  async loadWeb3() {

    //Déclaration des listes
    var events = new Array();
    var arrayEvents = new Array();

    //instanciation de Web3
    const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/4f7a55e037c7427f8d3b48d3899f10a4')); //const web3 = new Web3(Web3.givenProvider);
    const network = await web3.eth.net.getNetworkType();
    console.log("network : ", network);

    //Instanciation du contract solidity
    const loadContract = new web3.eth.Contract(ABIAppareil, "0x18d4611ccD3675B24F18315ce9476952bBdc07eA");
    this.setState({ loadContract });
    
    //Récupération de tous les événements du contrat
    events = await loadContract.getPastEvents("allEvents", 
    {
        fromBlock: 0, toBlock: 'latest'
    });
    
    //Alimentation de la liste d'événement
    for (let i=0; i < events.length; i++)
    {
        //console.log("Liste : ", events[i].returnValues);
        if (events[i].event == "interventionEvent" | events[i].event == "changeOfStatusEvent")
        {
            const blockN = (await web3.eth.getTransaction(events[i].transactionHash)).blockNumber;
            if (events[i].event == "interventionEvent")
            {
                switch (events[i].returnValues.work_or_reason) {
                    case "Maintenance":
                    case "Réparation":
                    case "Installation":
                        arrayEvents.push(
                        {
                            txhash: events[i].transactionHash,
                            blockn: blockN,
                            time_date: (new Date((await web3.eth.getBlock(blockN)).timestamp * 1000)).toLocaleString(),
                            type: events[i].returnValues.work_or_reason,
                            commentaire: ""
                        });
                        break;
                    default:
                        arrayEvents.push(
                        {
                            txhash: events[i].transactionHash,
                            blockn: blockN,
                            time_date: (new Date((await web3.eth.getBlock(blockN)).timestamp * 1000)).toLocaleString(),
                            type: "",
                            commentaire: events[i].returnValues.work_or_reason
                        });
                }
            }
            else if(events[i].event == "changeOfStatusEvent" )
            {
                //console.log("new statut : ", events[i].returnValues.newStatus);
                switch (events[i].returnValues.newStatus)
                {
                    case "0":
                        arrayEvents.push(
                            {
                                txhash: events[i].transactionHash,
                                blockn: blockN,
                                time_date: (new Date((await web3.eth.getBlock(blockN)).timestamp * 1000)).toLocaleString(),
                                type: "Demande d'intervention",
                                commentaire: "Passage du statut à : "+events[i].returnValues.newStatus
                            }
                        );
                        break;
                    case "1":
                        arrayEvents.push(
                            {
                                txhash: events[i].transactionHash,
                                blockn: blockN,
                                time_date: (new Date((await web3.eth.getBlock(blockN)).timestamp * 1000)).toLocaleString(),
                                type: "",
                                commentaire: "Réparé, passage du statut à : "+events[i].returnValues.newStatus 
                            }
                        );
                        break;
                    default:
                        arrayEvents.push(
                            {
                                txhash: events[i].transactionHash,
                                blockn: blockN,
                                time_date: (new Date((await web3.eth.getBlock(blockN)).timestamp * 1000)).toLocaleString(),
                                type: "",
                                commentaire: "Appareil irréparable, passage du statut à : "+events[i].returnValues.newStatus 
                            }
                        );
                }
            }
        }
    }

    //Suppression des doublons
    if(arrayEvents != null)
    {
        console.log("Passage dans la méthode unique");
        var uniqueEvents = new Array();
        for(let i=0;i<arrayEvents.length;i++){
            if(uniqueEvents.length == 0 ){
                uniqueEvents.push(arrayEvents[i]);
            }
            //else if(arrayEvents[i].txhash != uniqueEvents[uniqueEvents.length-1].txhash){
            else if(uniqueEvents.map(function(evt) { return evt.txhash; }).indexOf(arrayEvents[i].txhash) == -1){
                uniqueEvents.push(arrayEvents[i]);
            }
            else{ //Event avec le même transactionHash
                if(uniqueEvents[uniqueEvents.map(function(evt) { return evt.txhash; }).indexOf(arrayEvents[i].txhash)].commentaire !=""){
                    uniqueEvents[uniqueEvents.map(function(evt) { return evt.txhash; }).indexOf(arrayEvents[i].txhash)].commentaire = 
                        uniqueEvents[uniqueEvents.map(function(evt) { return evt.txhash; }).indexOf(arrayEvents[i].txhash)].commentaire
                        .concat("\n" + arrayEvents[i].commentaire); //Concatène le commentaire dans celui de la 1ère occurence
                }
                else{
                    uniqueEvents[uniqueEvents.map(function(evt) { return evt.txhash; }).indexOf(arrayEvents[i].txhash)].commentaire = 
                    arrayEvents[i].commentaire;
                }
            }
        } 
        
        this.setState({tableData: uniqueEvents})
    }
    
  }  

  constructor(props)
  {
    super(props)
    this.state = {
      account: '',
      contractAddress: '',
      tableHead: ['Date', 'Intervention', 'Commentaires'],
      tableData: [],
      widthArr: [115, 115, 132]
    }
  }

  render() {
    const tableEvent = this.state.tableData.map(record=>([record.time_date, record.type, record.commentaire]));
   
      return (
        <View>
          <ScrollView horizontal={true}>
            <View style={styles.container}>
              <Table borderStyle={{borderColor: '#FFFFFF'}}>
                <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles.header} textStyle={styles.textHead}/>
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                  {
                    tableEvent.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={this.state.widthArr}
                        textStyle={styles.text}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, marginTop : 20, marginLeft : 25},
    header: { height: 50, backgroundColor: '#000000'},
    textHead: { textAlign: 'center', fontWeight: '100', fontWeight: "bold", color:"white" },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1, borderWidth: 1, borderColor: '#C1C0B9'},
    row: { height: 40}
  });
