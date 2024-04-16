import React from 'react';
import { View, Text, SafeAreaView, Pressable, ImageBackground, StyleSheet, Dimensions } from 'react-native';
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

const windowWidth = Dimensions.get('window').width;

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
    paddingHorizontal: windowWidth * 0.1,
    alignItems: 'center',
  },
  largeText: {
    fontWeight: 'bold',
    fontSize: windowWidth * 0.09, 
    lineHeight: windowWidth * 0.09, 
    color: '#000000',
    marginBottom: windowWidth * 0.03, 
    textAlign: 'center',
  },
  smallText: {
    fontSize: windowWidth * 0.04, 
    color: '#000000',
    fontWeight: '500',
    marginBottom: windowWidth * 0.07, 
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#29222E',
    borderRadius: windowWidth * 0.05, 
    height: windowWidth * 0.12, 
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: windowWidth * 0.03, 
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: windowWidth * 0.05, 
    color: '#FFFFFF',
  },
});

export default FirstScreen;
