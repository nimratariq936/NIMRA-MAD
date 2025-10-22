import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
// REMOVED the unused Sociafylogo import

export default function WelcomeScreen({ navigation }) {
  const handleContinue = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#082223'}]}>
      {/* Logo and App Name */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/Sociafylogo.png')} 
          style={styles.logoImage}
        />
        <Text style={styles.appName}>Sociafy</Text>
        <Text style={styles.tagline}>Connect with friends and the world</Text>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    justifyContent: 'space-between',
    paddingVertical: 50,
    backgroundColor: '#082223',
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  tagline: {
    fontSize: 16,
    color: '#ccc',
  },
  buttonContainer: {
    paddingHorizontal: 25,
  },
  continueButton: {
    backgroundColor: '#015F69',  // CHANGED to blue
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#015F69',      // CHANGED to match button color
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
};