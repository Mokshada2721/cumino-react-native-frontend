import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [user, setUser] = useState("");
  
  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      if (username !== null) {
        setUser(username);
      }
    } catch (error) {
      console.error("Error retrieving current user:", error);
    } 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Hello {user}</Text>
        <Text style={styles.subtitle}>These are your project tasks</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A5A294', 
  },
  content: {
    flex: 1,
    justifyContent: 'top',
    marginTop: '5%' ,
    marginLeft: '5%',
    alignItems: 'left'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666', 
  },
});

export default HomeScreen;
