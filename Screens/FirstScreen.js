import React from 'react';
import { View, Text, SafeAreaView, Pressable, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 

const FirstScreen = () => {
  const navigation = useNavigation(); 

  const handleNavigation = async (screen) => {
    try {
      await AsyncStorage.setItem('FirstScreenCompleted', 'true');
      navigation.navigate(screen); 
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/SplashScreen2.jpg')} style={styles.backgroundImage}>
        <View style={styles.content}>
          <Text style={styles.largeText}>Cumin{'\n'} A Project Planning Tool</Text>
          <Text style={styles.smallText}>
          The project management app {'\n'} built for Gen Z. {'\n'} Stay on top of your game, without the stress.
          </Text>
          <Pressable style={styles.button} onPress={() => handleNavigation('Login')}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: '#A5A294' }]} onPress={() => handleNavigation('Register')}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  largeText: {
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 32,
    color: '#000000',
    marginBottom: 15,
    textAlign: 'center',
  },
  smallText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#29222E',
    borderRadius: 7,
    height: 45,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default FirstScreen;
