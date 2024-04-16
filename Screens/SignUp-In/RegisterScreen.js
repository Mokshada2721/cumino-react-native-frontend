import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, Dimensions, Pressable } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.180.166:5000/api';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Password and confirm password do not match');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users/signup`, { username, email, password });
      if (response.status === 201) {
        // Navigate to the login screen or perform any other actions
        navigation.navigate('Login');
      } else {
        Alert.alert('Registration Failed', 'Unable to register user');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Error', 'An error occurred while registering user');
    }
  };


  return (
    <ImageBackground source={require('../../assets/SplashScreen(Log-Reg).png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>Register</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.textInput}
        />
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
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.textInput}
        />
        <Pressable style={styles.logButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>REGISTER</Text>
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

export default RegisterScreen;
