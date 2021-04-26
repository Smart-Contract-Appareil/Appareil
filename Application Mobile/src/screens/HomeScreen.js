// src/screens/HomeScreen.js
import * as React from 'react';
import Web3 from 'web3';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Image, ImageBackground, StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { ABI, CONTRACT_ADDRESS } from '../../Config';

const image = { uri: "https://www.i3map.fr/351-large_default/controle-de-bon-fonctionnement-recepteur-gnss.jpg" };

const HomeScreen = ({navigation}) => {
  return (

    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.text}>Bienvenue sur BlockCare</Text>
      </ImageBackground>
    </View>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontFamily : "Cochin",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});







// export default function HomeScreen({ navigation }) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Button
//                 onPress={() => navigation.navigate('AboutScreen')}
//                 title="Afficher la page About"
//             />
//         </View>
//     );
// }

/*
const image = { uri: "https://www.i3map.fr/351-large_default/controle-de-bon-fonctionnement-recepteur-gnss.jpg" };
class HomeScreen extends React.Component 
{
    render() {
        return (
          <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
              <Text style={styles.text}>Bienvenue sur BlockCare</Text>
            </ImageBackground>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontFamily : "Cochin",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});

export default HomeScreen
*/