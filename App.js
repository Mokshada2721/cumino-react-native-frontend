import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import FirstScreen from './Screens/FirstScreen';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import ChatScreen from './Screens/ChatScreen';
import SideBar from './Components/SideBar';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <SideBar {...props} />}>
        <Drawer.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Chat" component={ChatScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
