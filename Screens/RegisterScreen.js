import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.32.166:5000/api';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRegister = async () => {
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
      <Button title="Register" onPress={handleRegister} color="#29222E" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F4EFDB',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#29222E',
  },
  textInput: {
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
});

export default RegisterScreen;