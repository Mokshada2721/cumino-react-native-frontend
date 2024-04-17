import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'; 

const BASE_URL = 'http://10.24.71.85:5000/api'; 

const HomeScreen = () => {
  const [email, setEmail] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    retrieveEmail();
  }, []);

  const retrieveEmail = async () => {
    try {
      const email = await AsyncStorage.getItem("email");
      if (email !== null) {
        setEmail(email);
        fetchProjects(email);
      }
    } catch (error) {
      console.error("Error retrieving current email:", error);
    } 
  };

  const fetchProjects = async (email) => {
    try {
      // Make GET request to fetch projects by user's email
      const response = await axios.get(`${BASE_URL}/project/getprojects?email=${email}`);
      setProjects(response.data.projects); 
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Hello {email}</Text>
        <Text style={styles.subtitle}>These are your project tasks</Text>
        {/* Render projects */}
        {projects.map((project, index) => (
          <Text key={index}>{project.name}</Text> // Render project name or relevant data
        ))}
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
    marginTop: '5%',
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
