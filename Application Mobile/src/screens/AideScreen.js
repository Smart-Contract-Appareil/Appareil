import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AideScreen = ({navigation}) => {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Icon name="information-circle" style={styles.icon} size={35} />
          <Text style={styles.titre}>Pour tout problème lié à l'application ou pour tout autre demande, veuillez nous contacter par :</Text>
            <Text style={styles.text}>email : support@blockcare.com </Text>
            <Text style={styles.text}>téléphone : +33 1 48 22 95 11</Text>
            <Text style={styles.titre2}>Notre adresse :</Text>
            <Text style={styles.text}>38 Rue Molière</Text>
            <Text style={styles.text}>94200 Ivry-sur-Seine</Text>
        </View>
      </ScrollView>

    );
};

export default AideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding : 20,
    marginTop : 30
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

  titre2: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf :'center',
    padding : 15,
  },
  text: {
    fontSize: 16,
    padding : 15,
  },
  icon: {
    alignSelf :'center',
  }
});