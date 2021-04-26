import * as React from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Web3 from 'web3';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import { ABIAppareil } from '../../abiAppareil';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


export default class HistoriquePJScreen extends React.Component 
{
  componentWillMount()
  {
    this.loadWeb3()
  }

  async loadWeb3() {

    const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/4f7a55e037c7427f8d3b48d3899f10a4'));
    console.log("web3", web3);
    const network = await web3.eth.net.getNetworkType();
    console.log("network : ", network);

    //Instanciation du contract solidity
    const loadContract = new web3.eth.Contract(ABIAppareil, "0x18d4611ccD3675B24F18315ce9476952bBdc07eA");
    this.setState({ loadContract });
    console.log("loadContract : ", loadContract);

    //read data : number of PJ
    const Nb_Pj = await loadContract.methods.pjCount().call();
    this.setState({ Nb_Pj });
    console.log("Compteur : ",  Nb_Pj);

    var listPj = new Array();
    for (let counter = 0; counter < Nb_Pj; counter++)
    {
        const donnee_PJ = await loadContract.methods.dataPJ(counter+1).call(); 
        listPj.push(
          {
              id: donnee_PJ.id,
              document: donnee_PJ.type_doc + " du " + (new Date(donnee_PJ.date * 1000)).toLocaleString(),
              intervenant: donnee_PJ.intervenant,
              prix_tot: donnee_PJ.prix_tot += "€"
          }
         );
    }
    this.setState({tableData: listPj})
    console.log("ma nouvelle liste : ", listPj);
  }  

  constructor(props)
  {
    super(props)
    this.state = {
      account: '',
      Nb_Pj: 0,
      tableHead: ['Id', 'Document', 'Intervenant', 'Prix total'],
      tableData: [],
      widthArr: [30, 160, 90, 80]
    }
  }

    render(){
        const tableData2 = this.state.tableData.map(record=>([record.id, record.document, record.intervenant, record.prix_tot]));
        const state = this.state;

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
                        tableData2.map((rowData, index) => (
                        
                            <Row key={index} 
                                 data={rowData} 
                                 widthArr={this.state.widthArr} 
                                 textStyle={styles.text} 
                                 onPress={() => this.props.navigation.navigate('Détails pièces jointes',
                                 {
                                     identifiant: rowData[0]
                                 })}/>      
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
    container: { flex: 1, marginTop : 20, marginLeft : 25 },
    header: { height: 50, backgroundColor: '#000000'},
    textHead: { textAlign: 'center', fontWeight: '100', fontWeight: "bold", color:"white" },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1, borderWidth: 1, borderColor: '#C1C0B9'},
    row: { height: 40}
  });






