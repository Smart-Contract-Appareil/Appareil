import * as React from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Web3 from 'web3';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import { ABIContratsClient } from '../../abiContratsClient';
import { ScrollView } from 'react-native-gesture-handler';

// const TabContratsScreen = ({navigation}) => {
//     return (
//       <View style={styles.container}>
//         <Text>Tableau contrats</Text>
//         <Button
//             title="Informations contrat 1"
//             onPress={() => navigation.navigate("Informations contrat")}
//         />
//       </View>
//     );
// };

// export default TabContratsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     alignItems: 'center', 
//     justifyContent: 'center'
//   },
// });

export default class TabContratsScreen extends React.Component 
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
    const loadContract = new web3.eth.Contract(ABIContratsClient, "0xDb6b1d7F47D495c11061D4D61d29671ADca1c3f4");
    this.setState({ loadContract });
    console.log("loadContract : ", loadContract);


    const listContractCli = await loadContract.methods.getContracts().call();
    console.log("liste des contracts : ", listContractCli.length);

    //alimentation du tableau en appelant une autre fonction
    var listContract = new Array();
    for (let i=0; i<listContractCli.length; i++){
        if (listContractCli[i] != "0x0000000000000000000000000000000000000000")
        {
            const item = await loadContract.methods.contracts(listContractCli[i]).call();
            console.log("item : ", item);
            listContract.push(
            {
                adresse: listContractCli[i],
                categorie: item.categorie,
                type: item.a_type,
                marque: item.brand,
                ref: item.refer,
                num_serie: item.serial_n,
                statut: item.statut
            });
        }
    }
    this.setState({tableData: listContract})
    console.log("liste pour tableau : ", listContract);
  }  

  constructor(props)
  {
    super(props)
    this.state = {
      account: '',
      tableHead: ['Adresse contrat', 'Type', 'Marque', 'Référence'],
      tableData: [],
      widthArr: [128, 85, 80, 87]
    }
  }

    render() {
        const listContractCli = this.state.tableData.map(record=>([record.adresse, record.type, record.marque, record.ref]));
        const state = this.state;
        const styles = StyleSheet.create({
            container: { flex: 1, padding: 16, paddingTop: 30 },
            header: { height: 50, backgroundColor: '#000000'},
            textHead: { textAlign: 'center', fontWeight: '100', fontWeight: "bold", color:"white" },
            text: { textAlign: 'center', fontWeight: '100' },
            dataWrapper: { marginTop: -1, borderWidth: 1, borderColor: '#C1C0B9'},
            row: { height: 40}
          });

      return (
        <ScrollView>
        <View style={styles.container}>
        <Text>Cliquer sur une cellule du tableau pour plus de détails</Text>
        <Text></Text>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{borderColor: '#FFFFFF'}}>
                <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles.header} textStyle={styles.textHead}/>
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                  {
                    listContractCli.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={this.state.widthArr}
                        textStyle={styles.text}
                        onPress={() => this.props.navigation.navigate('Informations contrat',
                        {
                          contractAddress: rowData[0]
                        })}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
        </ScrollView>

      )

    }
}

