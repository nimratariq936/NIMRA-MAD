import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in:', username);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Curved Container with Logo */}
      <View style={styles.curvedContainer}>
        <Image 
          source={require('../../assets/Sociafylogo.png')} 
          style={styles.logo}
        />
        <Text style={styles.appName}>Sociafy</Text>
      </View>

      {/* LOGIN Text - Outside both containers */}
      <Text style={styles.loginTitle}>LOGIN</Text>

      {/* Login Form Container */}
      <View style={styles.formContainer}>
        {/* Username Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g John Doe"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Password Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder=""
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Forgot Password - Moved to right side */}
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Sign Up Section */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Do you have an Account? <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  curvedContainer: {
    backgroundColor: '#082223',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    height: '40%', // Increased height
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#082223', // White color since it's on dark background
    marginTop: 10, // Space after curved container
    marginBottom: 20, // Space before form container
  },
    formContainer: {
    backgroundColor: '#D4F2F4',
    marginHorizontal: 25,
    marginBottom: 25,
    borderWidth: 2, // ← ADD BORDER WIDTH
    borderColor: '#082223', // ← ADD BORDER COLOR
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 20,
    height: '45%',
  },
  inputSection: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#082223',
    borderRadius: 10,
    padding: 10, // Reduced padding for smaller height
    fontSize: 16,
    color: '#000',
    height: 50, // Fixed smaller height
  },
  forgotPassword: {
    alignItems: 'flex-end', // Moved to right side
    marginBottom: 60,
    marginTop: 0, // Closer to password input
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#082223',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  signupContainer: {
    alignItems: 'center',
  },
  signupText: {
    color: '#000',
    fontSize: 14,
  },
  signupLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
};