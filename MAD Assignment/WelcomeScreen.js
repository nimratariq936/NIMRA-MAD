import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';

export default function WelcomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [savedUser, setSavedUser] = useState('');

  // useEffect with empty dependency array - runs once when component mounts
  useEffect(() => {
    console.log('WelcomeScreen mounted - This runs only once');
    checkSavedUser();
  }, []); // Empty array means run only once

  // useEffect with dependency - runs when savedUser changes
  useEffect(() => {
    console.log('savedUser changed to:', savedUser);
  }, [savedUser]);

  const checkSavedUser = async () => {
    try {
      const user = await AsyncStorage.getItem('username');
      if (user) {
        setSavedUser(user);
        // Using setTimeout for async operation (from lecture)
        setTimeout(() => {
          navigation.navigate('Home', { username: user });
        }, 2000);
      }
    } catch (error) {
      console.log('Error reading user:', error);
    }
  };

  const saveUser = async () => {
    if (username.trim()) {
      try {
        // Using AsyncStorage (from lecture)
        await AsyncStorage.setItem('username', username);
        Alert.alert('Success!', `Welcome to Sociafyy, ${username}!`);
        setSavedUser(username);
        
        // Using callback after async operation
        setTimeout(() => {
          navigation.navigate('Home', { username: username });
        }, 1500);
      } catch (error) {
        console.log('Error saving user:', error);
        Alert.alert('Error', 'Failed to save username');
      }
    } else {
      Alert.alert('Oops!', 'Please enter a username');
    }
  };

  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem('username');
      setSavedUser('');
      Alert.alert('Cleared', 'User data removed successfully');
    } catch (error) {
      console.log('Error clearing user:', error);
    }
  };

  return (
    <View style={[globalStyles.container, { 
      justifyContent: 'center', 
      alignItems: 'center',
      paddingHorizontal: 30, 
    }]}>
      
      {/* Big Beautiful Sociafyy Title */}
      <View style={{ marginBottom: 50, alignItems: 'center' }}>
        <Text style={{
          fontSize: 42,
          fontWeight: 'bold',
          color: '#E1306C',
          textAlign: 'center',
          fontStyle: 'italic',
          letterSpacing: -1,
          textShadowColor: 'rgba(0, 0, 0, 0.1)',
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 5,
          marginBottom: 4,
        }}>
          Sociafyy
        </Text>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center',
          marginTop: 5 
        }}>
          <View style={{ 
            width: 30, 
            height: 3, 
            backgroundColor: '#2b67e8ff',
            marginRight: 5 
          }} />
          <Text style={{ 
            color: '#666', 
            fontSize: 16,
            fontWeight: '600'
          }}>
            Your Social World
          </Text>
          <View style={{ 
            width: 30, 
            height: 3, 
            backgroundColor: '#2b67e8ff',
            marginLeft: 5 
          }} />
        </View>
      </View>

      {/* Welcome Icon */}
      <View style={{
        backgroundColor: '#f8f8f8',
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#E1306C'
      }}>
        <Feather name="camera" size={35} color="#E1306C" />
      </View>

      {/* Username Input */}
      <View style={{ width: '100%', marginBottom: 25 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#262626',
          marginBottom: 5,
          textAlign: 'center'
        }}>
          Choose Your Username
        </Text>
        <TextInput
          style={[globalStyles.input, {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '500'
          }]}
          placeholder="Enter your username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      
      {/* Action Buttons */}
      <View style={{ width: '100%' }}>
        <TouchableOpacity 
          style={[globalStyles.button, {
            backgroundColor: '#E1306C',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }]} 
          onPress={saveUser}
        >
          <Feather name="user-plus" size={20} color="white" style={{ marginRight: 10 }} />
          <Text style={globalStyles.buttonText}>Start Socializing</Text>
        </TouchableOpacity>
        
        {savedUser && (
          <TouchableOpacity 
            style={[globalStyles.button, { 
              backgroundColor: '#666',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }]} 
            onPress={clearUser}
          >
            <Feather name="user-x" size={20} color="white" style={{ marginRight: 10 }} />
            <Text style={globalStyles.buttonText}>Clear User Data</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Welcome Back Message */}
      {savedUser ? (
        <View style={{ 
          marginTop: 30, 
          padding: 15,
          backgroundColor: '#f0f8f0',
          borderRadius: 10,
          alignItems: 'center',
          width: '100%'
        }}>
          <Feather name="check-circle" size={24} color="green" />
          <Text style={{ 
            marginTop: 10, 
            textAlign: 'center', 
            color: 'green',
            fontWeight: '600'
          }}>
            Welcome back, {savedUser}!
          </Text>
          <Text style={{ 
            textAlign: 'center', 
            color: 'green',
            marginTop: 5
          }}>
            Redirecting you to your feed...
          </Text>
        </View>
      ) : (
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <Text style={{ 
            color: '#666', 
            textAlign: 'center',
            lineHeight: 20
          }}>
            Join millions sharing their stories{'\n'}
            and connecting with friends
          </Text>
        </View>
      )}
    </View>
  );
}