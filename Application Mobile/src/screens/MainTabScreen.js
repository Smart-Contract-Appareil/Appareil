import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import InfoPersoScreen from './InfoPersoScreen';
import TabContratsScreen from './TabContratsScreen';
import AideScreen from './AideScreen';
import InfoContratScreen from './InfoContratScreen';
import HistoriqueContratScreen from './HistoriqueContratScreen';
import HistoriquePJScreen from './HistoriquePJScreen';
import DetailsPJScreen from './DetailsPJScreen';

const HomeStack = createStackNavigator();
const InfoPersoStack = createStackNavigator();
const TabContratsStack = createStackNavigator();
const AideStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (

    <Tab.Navigator style={{ paddingTop: Platform.OS === 'android' ? 25 : 0}}
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: 'rgb(3, 46, 90)',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Informations personnelles"
        component={InfoPersoStackScreen}
        options={{
          tabBarLabel: 'Infos perso',
          tabBarColor: 'rgb(3, 46, 90)',
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Mes contrats"
        component={TabContratsStackScreen}
        options={{
          tabBarLabel: 'Mes contrats',
          tabBarColor: 'rgb(3, 46, 90)',
          tabBarIcon: ({ color }) => (
            <Icon name="list" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Aide"
        component={AideStackScreen}
        options={{
          tabBarLabel: 'Aide',
          tabBarColor: 'rgb(3, 46, 90)',
          tabBarIcon: ({ color }) => (
            <Icon name="information-circle" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: 'rgb(3, 46, 90)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Home',
        }} />
</HomeStack.Navigator>
);

const InfoPersoStackScreen = ({navigation}) => (
  <InfoPersoStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: 'rgb(3, 46, 90)',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <InfoPersoStack.Screen name="Informations personnelles" component={InfoPersoScreen} options={{
          title:'Informations personnelles',
          }} />
  </InfoPersoStack.Navigator>
  );

  const TabContratsStackScreen = ({navigation}) => (
    <TabContratsStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: 'rgb(3, 46, 90)',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <TabContratsStack.Screen name="Mes contrats" component={TabContratsScreen} options={{
            title:'Mes contrats',
            }} />
            <TabContratsStack.Screen name="Informations contrat" component={InfoContratScreen} options={{
            title:'Informations contrat',
            }} />
            <TabContratsStack.Screen name="Historique appareil" component={HistoriqueContratScreen} options={{
            title:'Historique appareil',
            }} />
            <TabContratsStack.Screen name="Historique pièces jointes" component={HistoriquePJScreen} options={{
            title:'Historique des pièces jointes',
            }} />
            <TabContratsStack.Screen name="Détails pièces jointes" component={DetailsPJScreen} options={{
            title:'Détails de la pièce jointe',
            }} />
    </TabContratsStack.Navigator>
  );

  const AideStackScreen = ({navigation}) => (
    <AideStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: 'rgb(3, 46, 90)',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <AideStack.Screen name="Aide" component={AideScreen} options={{
            title:'Aide',
            }} />
    </AideStack.Navigator>
  );
