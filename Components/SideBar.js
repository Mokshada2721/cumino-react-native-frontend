import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, PressableImage, Dimensions } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// import { FiHome, FiMessageCircle, FiCheckSquare } from 'react-icons/fi';

const SideBar = (props) => {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#29222E' }}>
      <View style={styles.container}>
        {/* Logo and App Name */}
        <View style={styles.header}>
          <Image
            source={require('../assets/app_logo.png')}
            style={styles.logo}
          />
          <Text style={styles.appName}>Cumin</Text>
        </View>
        {/* Navigation Items */}
        <View style={styles.navigationItems}>
          <DrawerItem
            label="Home"
            onPress={() => props.navigation.navigate('Home')}
            labelStyle={styles.label}
          />
          <DrawerItem
            label="Personal Goals"
            onPress={() => props.navigation.navigate('Personal Goals')}
            labelStyle={styles.label}
          />
          <DrawerItem
            label="Chat"
            onPress={() => props.navigation.navigate('Chat')}
            labelStyle={styles.label} 
          />
        </View>
        <Pressable style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '5%', 
    paddingHorizontal: '5%', 
    width: '100%',
    backgroundColor: '#29222E' 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%', // Adjust margin as needed
  },
  logo: {
    width: '30%', 
    aspectRatio: 1, // Maintain aspect ratio
    marginRight: '5%' 
  },
  appName: {
    fontSize: windowWidth * 0.1, 
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  navigationItems: {
    flex: 1,
    justifyContent: 'center', 
    marginTop: '20%',
    marginBottom: '135%' 
  },
  label: {
    color: '#FFFFFF', 
    fontSize: 20
  },
  logoutButton: {
    backgroundColor: '#97B1DF',
    paddingVertical: '3%', 
    paddingHorizontal: '5%', 
    borderRadius: 5,
    alignSelf: 'stretch',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: windowWidth * 0.05,
    textAlign: 'center',
  },
});

export default SideBar;
