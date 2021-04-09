import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import './global';
import Web3 from 'web3';
import { ABI, CONTRACT_ADDRESS } from './src/Config';
import detectEthereumProvider from '@metamask/detect-provider';

class App extends React.Component 
{
  componentWillMount()
  {
    this.loadWeb3()
  }

  async loadWeb3() {

    const provider = await detectEthereumProvider()
    if (provider) {
      console.log('Ethereum successfully detected!')
      const chainId = await provider.request({
      method: 'eth_chainId'
    })
    } else {
      console.error('Please install MetaMask!', error)
    }

    //instanciation de Web3
    const web3 = new Web3(Web3.givenProvider);
    console.log("web3", web3);
    const network = await web3.eth.net.getNetworkType();
    console.log("network : ", network);

    //Instanciation du contract solidity
    const loadContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    this.setState({ loadContract });
    console.log("loadContract : ", loadContract);

    //Fetch account
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    console.log("account : ", accounts[0]);

    //read data : number of PJ
    const Nb_Pj = await loadContract.methods.pjCount().call();
    this.setState({ Nb_Pj });
    console.log("Compteur : ",  Nb_Pj);

  }  

  constructor(props)
  {
    super(props)
    this.state = {
      account: '',
      Nb_Pj: 0,
    }
  }

    render() {
        return (
            <View style={{ marginTop: 20 }}>
                <Text>Le nombre de PJ : </Text>
                <Text>{this.state.Nb_Pj}</Text>
            </View>
        )
    }
}

export default App