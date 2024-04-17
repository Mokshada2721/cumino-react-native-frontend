import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, Dimensions, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = 'http://10.24.71.85:5000/api';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      if (response.status === 200) {
        navigation.navigate('Home');
        console.log("Login successful");
        console.log("Username:", response.data.username);
        console.log("Email: ", response.data.useremail);
        storeUsername(response.data.username, response.data.useremail);
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'An error occurred while logging in');
    }
  };  
  
  const storeUsername = async (username, useremail) => {
    try {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("useremail", useremail);
    } catch (error) {
      console.error('Error storing username:', error);
      Alert.alert('Error', 'An error occurred while saving username');
    }
  };  

  return (
    <ImageBackground source={require('../../assets/SplashScreen(Log-Reg).png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
        />
        <Pressable style={styles.logButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'absolute', 
    width: '100%', 
    height: '100%',
  },
  heading: {
    fontSize: windowWidth * 0.1,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF', 
  },
  textInput: {
    marginBottom: 15,
    padding: 10,
    fontSize: windowWidth * 0.04,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    width: '80%', 
  },
  logButtonContainer: {
    width: '80%', 
  },
  logButton: {
    backgroundColor: '#29222E',
    borderRadius: windowWidth * 0.05, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10, 
  },
  buttonText: {
    color: '#fff',
    fontSize: windowWidth * 0.05,
    textAlign: 'center',
  },
});

export default LoginScreen;
