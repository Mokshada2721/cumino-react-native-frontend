import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const SideBar = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          label="Chat"
          onPress={() => props.navigation.navigate('Chat')}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SideBar;
