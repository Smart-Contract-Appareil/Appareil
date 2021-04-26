import React from 'react';
import Web3 from 'web3';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ABIContratsClient } from '../../abiContratsClient';


export default class InfoPersoScreen extends React.Component {

    
    componentWillMount()
    {
      this.loadWeb3()
    }
  
    async loadWeb3() {
  
      // const provider = await detectEthereumProvider()
      // if (provider) {
      //   console.log('Ethereum successfully detected!')
      //   const chainId = await provider.request({
      //   method: 'eth_chainId'
      // })
      // } else {
      //   console.error('Please install MetaMask!', error)
      // }
  
      //instanciation de Web3
      //const web3 = new Web3(Web3.givenProvider);
      const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/4f7a55e037c7427f8d3b48d3899f10a4'));
      console.log("web3", web3);
      const network = await web3.eth.net.getNetworkType();
      console.log("network : ", network);
  
      //Instanciation du contract solidity
      const loadContract = new web3.eth.Contract(ABIContratsClient, "0xDb6b1d7F47D495c11061D4D61d29671ADca1c3f4");
      this.setState({ loadContract });
      console.log("loadContract : ", loadContract);
  
      //Fetch account
      const accounts = await web3.eth.getAccounts();
      this.setState({account: accounts[0]});
      console.log("account : ", accounts[0]);
  
      //read data de l'appareil
      const nom = await loadContract.methods.nom().call();
      const adressePostale = await loadContract.methods.adressePostale().call();
      const codePostal = await loadContract.methods.codePostal().call();
      const ville = await loadContract.methods.ville().call();
      const tel = await loadContract.methods.tel().call();
      const mail = await loadContract.methods.mail().call();
      this.setState({ nom, adressePostale, codePostal, ville, tel, mail });
  
    }
      constructor(props)
      {
          super(props)
          this.state = {
          account: '',
          nom: '', adressePostale: '', codePostal: '', ville: '', tel: '', mail: '',
          }
      } 
    render(){
      return (
        <ScrollView>
          <View style={styles.container}>
            <Icon name="person" style={styles.icon} size={35} />
            <Text style={styles.titre}>Mes informations</Text>
            <Text style={styles.text}>Nom entreprise : {this.state.nom}</Text>
            <Text style={styles.text}>Adresse postale : {this.state.adressePostale}</Text>
            <Text style={styles.text}>Code postal : {this.state.codePostal}</Text>
            <Text style={styles.text}>Ville : {this.state.ville}</Text>
            <Text style={styles.text}>Email : {this.state.mail}</Text>
            <Text style={styles.text}>Numéro de téléphone : {this.state.tel}</Text>
          </View>
        </ScrollView>
        );
      }
}


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