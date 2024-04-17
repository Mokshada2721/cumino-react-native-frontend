import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Dimensions } from 'react-native';

import FirstScreen from './Screens/FirstScreen';
import RegisterScreen from './Screens/SignUp-In/RegisterScreen';
import LoginScreen from './Screens/SignUp-In/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import SideBar from './Components/SideBar';
import TodoScreen from './Screens/Todo/TodoScreen';
import List from './Screens/Todo/List';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <SideBar {...props} />}>
        <Drawer.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="Home" component={HomeScreen} 
        options={{
          headerTitle: 'Home',
          headerStyle: styles.header,
          headerTintColor: 'white',
          headerTitleStyle: styles.title,
        }} />
        {/* <Drawer.Screen name="Chat" component={ChatScreen} 
        options={{
          headerTitle: 'Chat',
          headerStyle: styles.header,
          headerTintColor: 'white',
          headerTitleStyle: styles.title,
        }}/> */}
        <Drawer.Screen name="Personal Goals" component={TodoScreen} 
        options={{
          headerTitle: 'Personal Goals',
          headerStyle: styles.header,
          headerTintColor: 'white',
          headerTitleStyle: styles.title,
        }}/>
        <Drawer.Screen name='List' component={List} options={{ headerShown: false }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  header: {
    backgroundColor: '#29222E'
  },
  title: {
    color: 'white',
    fontSize: windowWidth * 0.09
  }
})

export default App;
