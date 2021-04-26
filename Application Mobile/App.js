import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import* as React from 'react';
import './global';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import MainTabScreen from './src/screens/MainTabScreen';


const Drawer = createDrawerNavigator();

const App = () => {
  return (
      <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen name="Home" component={MainTabScreen}/>
          </Drawer.Navigator>
      </NavigationContainer>
  );
}
export default App;






  
