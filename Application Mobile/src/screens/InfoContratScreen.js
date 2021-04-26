import React from 'react';
import Web3 from 'web3';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ABIAppareil } from '../../abiAppareil';


class InfoContratScreen extends React.Component 
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

    const {route}=this.props;
    const {contractAddress} =  route.params;
    this.setState({ contractAddress });
    console.log("L'adresse du contrat : ", contractAddress);

    //Instanciation du contract solidity
    const loadContract = new web3.eth.Contract(ABIAppareil, contractAddress);
    this.setState({ loadContract });
    console.log("loadContract : ", loadContract);

    //Fetch account
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    console.log("account : ", accounts[0]);

    //read data de l'appareil
    const categorie = await loadContract.methods.categorie().call();
    const a_type = await loadContract.methods.a_type().call();
    const brand = await loadContract.methods.brand().call();
    const refer = await loadContract.methods.refer().call();
    const serial_n = await loadContract.methods.serial_n().call();
    const statut = await loadContract.methods.statut().call();
    this.setState({ categorie, a_type, brand, refer, serial_n, statut });

    }
    constructor(props)
    {
        super(props)
        this.state = {
        account: '',
        contractAddress: '',
        categorie: '', a_type: '', brand: '', refer: '', serial_n: '', statut: '',
        }
    }

    

    render() {
      return (
        <ScrollView>
          <View style={styles.container}>
            <View>
            <Icon name="book" style={styles.icon} size={35} />
            <Text style={styles.titre}>Contrat</Text>
              <Text style={styles.text}>Numéro de contrat : {this.state.contractAddress}</Text>
              <Text style={styles.text}>Statut : {this.state.statut}</Text>
            </View>
            <View style = {styles.view2}>
            <Icon name="build" style={styles.icon} size={35} /><Text style={styles.titre}>Informations de l'appareil</Text>
              <Text style={styles.text}>Catégorie : {this.state.categorie}</Text>
              <Text style={styles.text}>Type : {this.state.a_type}</Text>
              <Text style={styles.text}>Marque : {this.state.brand}</Text>
              <Text style={styles.text}>Référence : {this.state.refer}</Text>
              <Text style={styles.text}>Numéro de série : {this.state.serial_n}</Text>
            </View>
            <View>
                {/* <Button1 /> */}
                <Button 
                title="Historique de l'appareil"
                onPress={() => this.props.navigation.navigate("Historique appareil")}/>
                <Text/>
                <Button2 />
            </View>
          </View>
        </ScrollView>
      );
    }

    
}

function Button1() {
  const navigation = useNavigation();

  return (
    <Button 
      title="Historique de l'appareil"
      onPress={() => navigation.navigate("Historique appareil", {contractAddress: contractAddress})}
      
      // onPress={() => this.props.navigation.navigate('Détails pièces jointes',
      // {
      //     identifiant: rowData[0]
      // })}

    />
    
  );
}

function Button2() {
  const navigation = useNavigation();

  return (
    <Button
      title="Historique des pièces jointes"
      onPress={() => navigation.navigate("Historique pièces jointes")}
    />
    
  );
}


export default InfoContratScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding : 20,
  },
  
  view2: {
    marginTop: 25,
  },

  titre: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf :'center',
    padding : 15,
    color :'#a82541',
  },
  text: {
    fontSize: 16,
    padding : 15,
  },
  icon: {
    alignSelf :'center',
  }
});